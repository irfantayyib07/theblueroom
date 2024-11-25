import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { BookingFormData } from "./Page";

const timeSlots = [
 "09:00 AM",
 "09:30 AM",
 "10:00 AM",
 "10:30 AM",
 "11:00 AM",
 "11:30 AM",
 "12:00 PM",
 "12:30 PM",
 "01:00 PM",
 "01:30 PM",
 "02:00 PM",
 "02:30 PM",
 "03:00 PM",
 "03:30 PM",
 "04:00 PM",
 "04:30 PM",
 "05:00 PM",
];

const BookingForm = () => {
 const { control, watch, handleSubmit } = useFormContext<BookingFormData>();
 const watchMeeting = watch("meeting");
 const watchTeamMember = watch("teamMember");

 const onSubmit = (data: BookingFormData) => {
  console.log("Form submitted:", data);
 };

 return (
  <Card className="w-full min-w-[500px] max-w-7xl flex-[3]">
   <form onSubmit={handleSubmit(onSubmit)}>
    <CardContent className="pt-6 space-y-6">
     {/* Customer Name */}
     <Controller
      name="customerName"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Customer's Name <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input placeholder="Enter customer name" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     {/* Customer Email */}
     <Controller
      name="customerEmail"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Customer's Email <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
         <Input placeholder="Enter email address" {...field} className={error ? "border-red-500" : ""} />
        </FormControl>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     {/* Time Zone */}
     <Controller
      name="timeZone"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Client Time Zone <span className="text-red-500">*</span>
        </FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
         <FormControl>
          <SelectTrigger className={error ? "border-red-500" : ""}>
           <SelectValue placeholder="Select time zone" />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          <SelectItem value="africa/johannesburg">Africa/Johannesburg</SelectItem>
          <SelectItem value="europe/london">Europe/London</SelectItem>
          <SelectItem value="america/new_york">America/New York</SelectItem>
         </SelectContent>
        </Select>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     {/* Meeting Type */}
     <Controller
      name="meeting"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">
         Select Meeting <span className="text-red-500">*</span>
        </FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
         <FormControl>
          <SelectTrigger className={error ? "border-red-500" : ""}>
           <SelectValue placeholder="Select meeting type" />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          <SelectItem value="blue-room">Reservation At The Blue Room</SelectItem>
          <SelectItem value="conference">Conference Room</SelectItem>
          <SelectItem value="virtual">Virtual Meeting</SelectItem>
         </SelectContent>
        </Select>
        <FormMessage>{error?.message}</FormMessage>
       </FormItem>
      )}
     />
     {/* Team Member */}
     {watchMeeting && (
      <Controller
       name="teamMember"
       control={control}
       render={({ field, fieldState: { error } }) => (
        <FormItem>
         <FormLabel className="text-sm">
          Select Team Member <span className="text-red-500">*</span>
         </FormLabel>
         <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
           <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Select team member" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           <SelectItem value="member1">Team Member 1</SelectItem>
           <SelectItem value="member2">Team Member 2</SelectItem>
           <SelectItem value="member3">Team Member 3</SelectItem>
          </SelectContent>
         </Select>
         <FormMessage>{error?.message}</FormMessage>
        </FormItem>
       )}
      />
     )}
     {/* Location */}
     {watchMeeting && (
      <Controller
       name="location"
       control={control}
       render={({ field, fieldState: { error } }) => (
        <FormItem>
         <FormLabel className="text-sm">
          Select Location <span className="text-red-500">*</span>
         </FormLabel>
         <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
           <SelectTrigger className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="Select location" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           <SelectItem value="location1">Location 1</SelectItem>
           <SelectItem value="location2">Location 2</SelectItem>
           <SelectItem value="location3">Location 3</SelectItem>
          </SelectContent>
         </Select>
         <FormMessage>{error?.message}</FormMessage>
        </FormItem>
       )}
      />
     )}
     {/* Date and Time Selection */}
     {watchTeamMember && (
      <div className="grid grid-cols-2 gap-4">
       {/* Date Picker */}
       <Controller
        name="date"
        control={control}
        render={({ field, fieldState: { error } }) => (
         <FormItem className="flex flex-col">
          <FormLabel className="text-sm">Select Date</FormLabel>
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
             onSelect={field.onChange}
             disabled={date => date < new Date() || date < new Date("1900-01-01")}
             initialFocus
            />
           </PopoverContent>
          </Popover>
          <FormMessage>{error?.message}</FormMessage>
         </FormItem>
        )}
       />
       {/* Time Select */}
       <Controller
        name="time"
        control={control}
        render={({ field, fieldState: { error } }) => (
         <FormItem>
          <FormLabel className="text-sm">Select Time</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
           <FormControl>
            <SelectTrigger className={error ? "border-red-500" : ""}>
             <SelectValue placeholder="Select time" />
            </SelectTrigger>
           </FormControl>
           <SelectContent>
            {timeSlots.map(time => (
             <SelectItem key={time} value={time}>
              {time}
             </SelectItem>
            ))}
           </SelectContent>
          </Select>
          <FormMessage>{error?.message}</FormMessage>
         </FormItem>
        )}
       />
      </div>
     )}
     {/* Status */}
     <Controller
      name="status"
      control={control}
      render={({ field, fieldState: { error } }) => (
       <FormItem>
        <FormLabel className="text-sm">Status</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
         <FormControl>
          <SelectTrigger className={error ? "border-red-500" : ""}>
           <SelectValue placeholder="Select Booking status" />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
         </SelectContent>
        </Select>
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
