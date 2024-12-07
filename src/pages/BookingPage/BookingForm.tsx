import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format, getDay } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
 cn,
 convertTo24HourFormat,
 getAvailableDays,
 getBookingCreateAt,
 getEndTime,
 isDayDisabled,
} from "@/lib/utils";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { BookingFormData } from "./Page";
import { Appointment, BookingResponse, EntriesResponse, Slot } from "@/types/types";
import SeatPlan from "./SeatPlan";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEntries } from "@/services/useEntries";
import { useCreateBooking } from "@/services/useBooking";
import { useCreateOrder } from "@/services/useOrder";
import { PRICING_DATA } from "@/data";

const BookingForm = ({ data }: { data: Appointment }) => {
 const {
  control,
  watch,
  reset,
  setValue,
  formState: { errors },
  handleSubmit,
 } = useFormContext<BookingFormData>();
 const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>([]);

 const formData = watch();
 const dateString = formData.date ? format(formData.date as Date, "yyyy-MM-dd") : "";

 const handleEntriesSuccess = (data: EntriesResponse) => {
  const formattedSlots = data?.data?.days?.[0].slots.map(slot => {
   slot.start_time = convertTo24HourFormat(slot?.start_time);
   return slot;
  });
  setAvailableTimeSlots(formattedSlots || []);
 };

 const { isLoading } = useEntries(dateString, dateString, handleEntriesSuccess);
 const { mutate: createOrder, isLoading: isCreatingOrder } = useCreateOrder();
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
  reset();
 });

 const onSubmit = (formData: BookingFormData) => {
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
   end_time: getEndTime(formData.time, data.duration),
   booking_createAt: getBookingCreateAt(),
   seats: formData?.seats,
   payment_method: "woocommerce",
   order_total: formData?.seats.reduce((total, seatId) => {
    const seat = data?.seat_plan.find(seat => seat.id === seatId);
    return total + (seat ? PRICING_DATA[getDay(formData.date)][seat.ticketType] : 0);
   }, 0),
   location_type: data?.locations?.[0]?.location_type,
   location: data?.locations?.[0]?.location,
   guests: [],
  });
 };

 const isPending = isCreatingOrder || isBooking;

 return (
  <Card className="w-full flex-[3]">
   <form onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="pt-6 space-y-6">
     <div className="flex flex-wrap gap-4">
      <Controller
       name="date"
       control={control}
       render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className="basis-full sm:basis-[unset] sm:flex-1">
         <FormLabel className="text-sm">
          Select Date <span className="text-red-500">*</span>
         </FormLabel>
         <Popover>
          <PopoverTrigger asChild>
           <FormControl>
            <Button
             variant="outline"
             className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500",
             )}
            >
             {value ? format(value, "PPP") : <span>Pick a date</span>}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar
            mode="single"
            selected={value}
            onSelect={selectedDate => {
             onChange(selectedDate);
             setValue("time", "");
             setAvailableTimeSlots([]);
            }}
            disabled={selectedDate => isDayDisabled(data, selectedDate)}
            initialFocus
           />
          </PopoverContent>
         </Popover>
         <FormMessage>{error?.message}</FormMessage>
        </FormItem>
       )}
      />
      <Controller
       name="time"
       control={control}
       render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem className="basis-full sm:basis-[unset] sm:flex-1">
         <FormLabel className="text-sm">
          Select Time <span className="text-red-500">*</span>
         </FormLabel>
         <Select onValueChange={onChange} value={value} disabled={isLoading || !dateString}>
          <FormControl>
           <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue
             className={cn(isLoading || !dateString ? "italic" : "")}
             placeholder={
              isLoading
               ? "Getting available time slots..."
               : dateString
               ? "Select time"
               : "Please select date first"
             }
            />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           {availableTimeSlots.map(slot => (
            <SelectItem key={slot?.start_time} value={slot?.start_time}>
             {slot?.start_time} ({+data?.capacity - +slot?.booked} seats remaining)
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage>{error?.message}</FormMessage>
        </FormItem>
       )}
      />
     </div>

     {formData?.time && (
      <SeatPlan
       seats={data?.seat_plan}
       slot={availableTimeSlots.find(slot => slot.start_time === formData?.time) || ({} as Slot)}
       availableDays={getAvailableDays(data)}
       bgImage={data?.seat_plan_settings?.canvasBgImage}
       canvasDimensions={data?.seat_plan_settings?.canvasDimensions}
      />
     )}

     <FormItem>
      <FormLabel className="text-sm">
       Name <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
       <Input
        {...control.register("customerName")}
        placeholder="Enter customer name"
        className={errors.customerName ? "border-red-500" : ""}
       />
      </FormControl>
      {errors.customerName && <FormMessage>{errors.customerName.message}</FormMessage>}
     </FormItem>

     <FormItem>
      <FormLabel className="text-sm">
       Email <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
       <Input
        {...control.register("customerEmail")}
        placeholder="Enter email address"
        className={errors.customerEmail ? "border-red-500" : ""}
       />
      </FormControl>
      {errors.customerEmail && <FormMessage>{errors.customerEmail.message}</FormMessage>}
     </FormItem>

     <FormItem>
      <FormLabel className="text-sm">
       Phone <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
       <Input
        {...control.register("customerPhone")}
        placeholder="Enter phone"
        className={errors.customerPhone ? "border-red-500" : ""}
       />
      </FormControl>
      {errors.customerPhone && <FormMessage>{errors.customerPhone.message}</FormMessage>}
     </FormItem>

     <FormItem>
      <FormLabel className="text-sm">Description</FormLabel>
      <FormControl>
       <Textarea
        {...control.register("description")}
        placeholder="Enter description"
        className={errors.description ? "border-red-500" : ""}
       />
      </FormControl>
      {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
     </FormItem>
     <Button type="submit" className="w-full" disabled={isPending}>
      {isPending ? (
       <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
       </>
      ) : (
       "Create Booking"
      )}
     </Button>
    </CardContent>
   </form>
  </Card>
 );
};

export default BookingForm;
