import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEntries } from "@/services/useEntries";
import { cn, convertTo24HourFormat, isDayDisabled } from "@/lib/utils";
import { Appointment, EntriesResponse, Slot } from "@/types/types";

const FormStepOne = ({
 nextStep,
 data,
 availableTimeSlots,
 setAvailableTimeSlots,
}: {
 nextStep: () => void;
 data: Appointment;
 availableTimeSlots: Slot[];
 setAvailableTimeSlots: React.Dispatch<React.SetStateAction<Slot[]>>;
}) => {
 const { control, setValue, trigger, watch } = useFormContext();

 const handleEntriesSuccess = (data: EntriesResponse) => {
  const formattedSlots = data?.data?.days?.[0].slots.slice(0, -1).map(slot => {
   slot.start_time = convertTo24HourFormat(slot?.start_time);
   return slot;
  });
  setAvailableTimeSlots(formattedSlots || []);
 };

 const formData = watch();
 const dateString = formData.date ? format(formData.date as Date, "yyyy-MM-dd") : "";

 const { isLoading } = useEntries(dateString, dateString, handleEntriesSuccess);

 const handleNextStep = async () => {
  const isDateValid = await trigger("date");
  const isTimeValid = await trigger("time");

  if (isDateValid && isTimeValid) {
   nextStep();
  }
 };

 return (
  <>
   <Controller
    name="date"
    control={control}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
     <FormItem className="basis-full">
      <FormLabel className="text-sm">
       Select Date <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
       <div className={cn("w-full", error && "border-2 border-red-500")}>
        <Calendar
         mode="single"
         selected={value}
         onSelect={selectedDate => {
          onChange(selectedDate);
          setValue("time", "");
          setAvailableTimeSlots([]);
         }}
         disabled={selectedDate => isDayDisabled(data, selectedDate)}
         className="!w-full"
        />
       </div>
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
     </FormItem>
    )}
   />
   <Controller
    name="time"
    control={control}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
     <FormItem className="basis-full">
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
   <Button
    type="button"
    onClick={handleNextStep}
    disabled={!formData.date || !formData.time}
    className="self-end px-8 py-2 font-semibold"
   >
    Next
   </Button>
  </>
 );
};

export default FormStepOne;
