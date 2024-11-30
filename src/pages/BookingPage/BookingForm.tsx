import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, convertTo24HourFormat, getBookingCreateAt, getEndTime, isDayDisabled } from "@/lib/utils";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { BookingFormData } from "./Page";
import { Appointment, EntriesResponse, Slot } from "@/types/types";
import SeatPlan from "./SeatPlan";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEntries } from "@/services/useEntries";
import { useCreateBooking } from "@/services/useBooking";

const BookingForm = ({ data }: { data: Appointment }) => {
 const { control, watch, reset, setValue, handleSubmit } = useFormContext<BookingFormData>();
 const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>([]);

 const formData = watch();
 const dateString = formData.date ? format(formData.date as Date, "yyyy-MM-dd") : "";

 const handleEntriesSuccess = (data: EntriesResponse) => {
  const formattedSlots = data?.data?.days?.[0].slots.map(slot => {
   slot.start_time = convertTo24HourFormat(slot?.start_time);
   return slot;
  });
  console.log(data?.data?.days?.[0].slots, formattedSlots);
  setAvailableTimeSlots(formattedSlots || []);
 };

 const { isLoading } = useEntries(dateString, dateString, handleEntriesSuccess);
 const { mutate: createBooking, isLoading: isBooking } = useCreateBooking(() => {
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
    return total + (seat ? parseFloat(seat.price) : 0);
   }, 0),
   location_type: data?.locations?.[0]?.location_type,
   location: data?.locations?.[0]?.location,
   guests: [],
  });
 };

 return (
  <Card className="w-full min-w-[500px] max-w-7xl flex-[3]">
   <form onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="pt-6 space-y-6">
     <div className="grid grid-cols-2 gap-4">
      <Controller
       name="date"
       control={control}
       render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormItem>
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
        <FormItem>
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
       bgImage={data?.seat_plan_settings?.canvasBgImage}
       canvasDimensions={data?.seat_plan_settings?.canvasDimensions}
      />
     )}

     <Controller
      name="customerName"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Name <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input
          placeholder="Enter customer name"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
         />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />

     <Controller
      name="customerEmail"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Email <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input
          placeholder="Enter email address"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
         />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />

     <Controller
      name="customerPhone"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Phone <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input
          placeholder="Enter phone"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
         />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     <Controller
      name="description"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">Description</FormLabel>
        <FormControl>
         <Textarea
          placeholder="Enter description"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? "border-red-500" : ""}
         />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     <Button type="submit" className="w-full" disabled={isBooking}>
      {isBooking ? (
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
