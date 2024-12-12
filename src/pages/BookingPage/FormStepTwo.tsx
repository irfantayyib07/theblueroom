// FormStepTwo.js
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import SeatPlan from "./SeatPlan";
import { Appointment, Slot } from "@/types/types";

const FormStepTwo = ({
 nextStep,
 prevStep,
 data,
 availableTimeSlots,
}: {
 nextStep: () => void;
 prevStep: () => void;
 data: Appointment;
 availableTimeSlots: Slot[];
}) => {
 const { watch } = useFormContext();
 const formData = watch();

 return (
  <>
   <SeatPlan
    seats={data?.seat_plan}
    slot={availableTimeSlots.find(slot => slot.start_time === formData?.time) || ({} as Slot)}
    bgImage={data?.seat_plan_settings?.canvasBgImage}
    canvasDimensions={data?.seat_plan_settings?.canvasDimensions}
   />
   <div className="ml-auto flex flex-wrap gap-4">
    <Button type="button" variant="outline" onClick={prevStep} className="px-8 py-2 font-semibold">
     Go Back
    </Button>
    <Button
     type="button"
     onClick={nextStep}
     disabled={!formData.seats.length}
     className="px-8 py-2 font-semibold"
    >
     Next
    </Button>
   </div>
  </>
 );
};

export default FormStepTwo;
