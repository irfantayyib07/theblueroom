// Parent Component
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OverlayLoader from "@/components/common/overlay-loader";
import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import { useAppointments } from "@/services/useAppointments";
import { Appointment, BookingResponse, Slot } from "@/types/types";
import BookingDetails from "./BookingDetails";
import { Card, CardContent } from "@/components/ui/card";
import { format, getDay } from "date-fns";
import { getBookingCreateAt, getEndTime } from "@/lib/utils";
import { useCreateOrder } from "@/services/useOrder";
import { useCreateBooking } from "@/services/useBooking";
import { PRICING_DATA } from "@/data";
import InitialMessageDialog from "./InitialMessageDialog";

const bookingSchema = z.object({
 customerName: z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .max(50, { message: "Name must not exceed 50 characters" }),
 customerEmail: z.string().email({ message: "Please enter a valid email address" }),
 customerPhone: z
  .string()
  .regex(/^[0-9]{10,15}$/, { message: "Please enter a valid 10-15 digit phone number" }),
 description: z.string().max(400, { message: "Description must not exceed 400 characters" }),
 date: z.date({
  required_error: "Booking date is required",
  invalid_type_error: "Please provide a valid date",
 }),
 time: z.string().min(1, { message: "Time slot is required" }),
 seats: z.array(z.number()).min(1, "You must select at least one seat"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

function BookingPage() {
 const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>([]);
 const [currentStep, setCurrentStep] = useState(1);

 const methods = useForm<BookingFormData>({
  resolver: zodResolver(bookingSchema),
  defaultValues: {
   customerName: "",
   customerEmail: "",
   customerPhone: "",
   description: "",
   date: undefined,
   time: "",
   seats: [],
  },
 });

 const { data, isLoading } = useAppointments();
 const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder(() => methods.reset());
 const { mutate: createBooking, isLoading: isBooking } = useCreateBooking((data: BookingResponse) => {
  createOrder({
   customer_id: 23,
   payment_method: "payfast",
   payment_method_title: "Payfast",
   set_paid: false,
   billing: {
    first_name: data?.data?.customer?.first_name,
    last_name: data?.data?.customer?.last_name || "",
    email: data?.data?.customer?.email,
   },
   shipping: {
    first_name: data?.data?.customer?.first_name,
    last_name: data?.data?.customer?.last_name || "",
   },
   line_items: [
    {
     product_id: 25,
     quantity: 1,
     total: data?.data?.order_total,
    },
   ],
   meta_data: [
    {
     key: "custom_note",
     value: "Additional order information",
    },
   ],
  });
 });

 const onSubmit = (formData: BookingFormData) => {
  if (!data?.data) return;

  createBooking({
   first_name: formData?.customerName,
   email: formData?.customerEmail,
   custom_form_data: {
    phone_number: formData?.customerPhone,
   },
   description: formData?.description,
   timezone: "Africa/Johannesburg",
   staff: 23,
   appointment: 21,
   date: format(formData?.date, "yyyy-MM-dd"),
   start_date: format(formData?.date, "yyyy-MM-dd"),
   start_time: formData?.time,
   end_time: getEndTime(formData.time, data?.data?.duration),
   booking_createAt: getBookingCreateAt(),
   seats: formData?.seats,
   payment_method: "woocommerce",
   order_total: formData?.seats.reduce((total, seatId) => {
    const seat = data?.data?.seat_plan.find(seat => seat.id === seatId);
    return total + (seat ? PRICING_DATA[getDay(formData.date)][seat.ticketType] : 0);
   }, 0),
   location_type: data?.data?.locations?.[0]?.location_type,
   location: data?.data?.locations?.[0]?.location,
   guests: [],
  });
 };

 if (isLoading) {
  return <OverlayLoader />;
 }

 const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
 const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

 return (
  <FormProvider {...methods}>
   <main className="flex flex-col sm:flex-row gap-6 mx-auto max-w-5xl">
    <BookingDetails data={data?.data || ({} as Appointment)} currentStep={currentStep} />
    <Card className="w-full flex-[2]">
     <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CardContent className="flex flex-col pt-6 space-y-6">
       {currentStep === 1 && (
        <FormStepOne
         nextStep={nextStep}
         data={data?.data || ({} as Appointment)}
         availableTimeSlots={availableTimeSlots}
         setAvailableTimeSlots={setAvailableTimeSlots}
        />
       )}
       {currentStep === 2 && (
        <FormStepTwo
         nextStep={nextStep}
         prevStep={prevStep}
         data={data?.data || ({} as Appointment)}
         availableTimeSlots={availableTimeSlots}
        />
       )}
       {currentStep === 3 && (
        <FormStepThree prevStep={prevStep} isCreatingOrder={isCreatingOrder} isBooking={isBooking} />
       )}
      </CardContent>
     </form>
    </Card>
   </main>
   <InitialMessageDialog />
  </FormProvider>
 );
}

export default BookingPage;
