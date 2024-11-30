import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import { useAppointments } from "@/services/useAppointments";
import { Appointment } from "@/types/types";
import OverlayLoader from "@/components/common/overlay-loader";

const bookingSchema = z.object({
 customerName: z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .max(50, { message: "Name must not exceed 50 characters" }),
 customerEmail: z.string().email({ message: "Please enter a valid email address" }),
 customerPhone: z
  .string()
  .regex(/^\+([1-9]{1,4})\d{7,14}$/, { message: "Please enter a valid phone number with country code" }),
 description: z.string().max(400, { message: "Phone number must not exceed 400 digits" }),
 date: z.date({
  required_error: "Booking date is required",
  invalid_type_error: "Please provide a valid date",
 }),
 time: z.string().min(1, { message: "Time slot is required" }),
 seats: z.array(z.number()).min(1, "You must select at least one seat"),
 // timeZone: z.string().min(1, { message: "Please select a time zone" }),
 // meeting: z.string().min(1, { message: "Please select a meeting type" }),
 // teamMember: z
 //  .string()
 //  .optional()
 //  .refine(val => val === undefined || val.length > 0, { message: "Please select a team member" }),
 // location: z
 //  .string()
 //  .optional()
 //  .refine(val => val === undefined || val.length > 0, { message: "Please select a location" }),
 // status: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

function BookingPage() {
 const { data, isLoading } = useAppointments();
 console.log(data?.data);

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
   // timeZone: "",
   // meeting: "",
   // teamMember: "",
   // location: "",
   // status: "",
  },
 });

 if (isLoading) {
  return <OverlayLoader />;
 }

 return (
  <FormProvider {...methods}>
   <main className="flex flex-wrap gap-6">
    <BookingDetails data={data?.data || ({} as Appointment)} />
    <BookingForm data={data?.data || ({} as Appointment)} />
   </main>
  </FormProvider>
 );
}

export default BookingPage;
