import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, isDayDisabled } from "@/lib/utils";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { BookingFormData } from "./Page";
import { Appointment, Slot } from "@/types/types";
import SeatPlan from "./SeatPlan";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEntries } from "@/services/useEntries";

const BookingForm = ({ data }: { data: Appointment }) => {
 const { control, watch, handleSubmit } = useFormContext<BookingFormData>();
 const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>([]);

 console.log(availableTimeSlots);

 const formData = watch();
 const dateString = formData.date ? format(formData.date as Date, "yyyy-MM-dd") : "";

 const { data: entriesData, refetch } = useEntries(dateString, dateString);
 console.log(entriesData);

 const onSubmit = (formData: BookingFormData) => {
  console.log("Form submitted:", formData);
 };

 return (
  <Card className="w-full min-w-[500px] max-w-7xl flex-[3]">
   <form onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="pt-6 space-y-6">
     <div className="grid grid-cols-2 gap-4">
      <Controller
       name="date"
       control={control}
       render={({ field, fieldState: { error } }) => (
        <FormItem className="flex flex-col">
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
              !field.value && "text-muted-foreground",
              error && "border-red-500",
             )}
            >
             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
           <Calendar
            mode="single"
            selected={field.value}
            onSelect={selectedDate => {
             field.onChange(selectedDate);
             setAvailableTimeSlots(entriesData?.data?.days?.[0].slots || []);
             refetch();
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
       render={({ field, fieldState: { error } }) => (
        <FormItem>
         <FormLabel className="text-sm">
          Select Time <span className="text-red-500">*</span>
         </FormLabel>
         <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
           <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Select time" />
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

     <SeatPlan
      seats={data?.seat_plan}
      slot={availableTimeSlots.find(slot => slot.start_time === formData?.time)}
      bgImage={data?.seat_plan_settings?.canvasBgImage}
      canvasDimensions={data?.seat_plan_settings?.canvasDimensions}
     />

     <Controller
      name="customerName"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Name <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input placeholder="Enter customer name" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />

     <Controller
      name="customerEmail"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Email <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input placeholder="Enter email address" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />

     <Controller
      name="customerPhone"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Phone <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input placeholder="Enter phone" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     <Controller
      name="description"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">Description</FormLabel>
        <FormControl>
         <Textarea placeholder="Enter description" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     <Button type="submit" className="w-full">
      Create Booking
     </Button>
    </CardContent>
   </form>
  </Card>
 );
};

export default BookingForm;
