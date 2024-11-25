import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BookingForm from "./BookingForm";
import BookingDetails from "./BookingDetails";
import { useAppointments } from "@/services/useAppointments";
import { Appointment } from "@/types/types";

const bookingSchema = z.object({
 customerName: z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .max(50, { message: "Name must not exceed 50 characters" }),
 customerEmail: z.string().email({ message: "Please enter a valid email address" }),
 customerPhone: z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits" })
  .max(15, { message: "Phone number must not exceed 15 digits" })
  .regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number" }), // Optional: E.164 format
 description: z.string().max(400, { message: "Phone number must not exceed 400 digits" }),
 timeZone: z.string().min(1, { message: "Please select a time zone" }),
 meeting: z.string().min(1, { message: "Please select a meeting type" }),
 teamMember: z
  .string()
  .optional()
  .refine(val => val === undefined || val.length > 0, { message: "Please select a team member" }),
 location: z
  .string()
  .optional()
  .refine(val => val === undefined || val.length > 0, { message: "Please select a location" }),
 date: z.date().optional(),
 time: z.string().optional(),
 status: z.string().optional(),
 seats: z.array(z.number()).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

function BookingPage() {
 const { data } = useAppointments();
 console.log(data?.data);

 const methods = useForm<BookingFormData>({
  resolver: zodResolver(bookingSchema),
  defaultValues: {
   customerName: "",
   customerEmail: "",
   timeZone: "",
   meeting: "",
   teamMember: "",
   location: "",
   status: "",
   seats: [],
  },
 });

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
