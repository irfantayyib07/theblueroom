import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Seat, Slot } from "@/types/types";
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";

type CanvasProps = {
 seats: Seat[];
 slot: Slot;
 bgImage: string;
 canvasDimensions: { width: number; height: number };
 negativeSizeFactor?: number;
};

const SeatPlan: React.FC<CanvasProps> = ({
 seats = [],
 slot = {} as Slot,
 bgImage = "",
 canvasDimensions = { width: 0, height: 0 },
 negativeSizeFactor = 1.5,
}) => {
 const { setValue, getValues } = useFormContext();
 const selectedSeats = getValues("seats") || [];

 const toggleSeatSelection = (seatId: number) => {
  const updatedSeats = selectedSeats.includes(seatId)
   ? selectedSeats.filter((id: number) => id !== seatId)
   : [...selectedSeats, seatId];
  setValue("seats", updatedSeats); // Update form state
 };

 console.log(slot);

 return (
  <div
   className="relative min-h-96"
   style={{
    width: `${canvasDimensions.width / negativeSizeFactor}px`,
    height: `${canvasDimensions.height / negativeSizeFactor}px`,
   }}
  >
   {/* Background Image */}
   <img src={bgImage} alt="Seating Plan" className="absolute top-0 left-0 object-cover" />

   {/* Seats */}
   {seats.map(seat => {
    const seatTop = parseFloat(seat.positionY) / negativeSizeFactor;
    const seatLeft = parseFloat(seat.positionX) / negativeSizeFactor;
    const seatWidth = +seat.width / negativeSizeFactor;
    const seatHeight = +seat.height / negativeSizeFactor;

    return (
     <React.Fragment key={seat.id}>
      {/* Seat Circle */}
      <button
       onClick={() => toggleSeatSelection(seat.id)}
       disabled={slot?.seats?.includes(seat.id)}
       className={cn(
        "absolute rounded-full flex items-center justify-center transition-transform p-0",
        slot?.seats?.includes(seat.id) ? "cursor-auto" : "hover:scale-125",
       )}
       style={{
        top: `${seatTop}px`,
        left: `${seatLeft}px`,
        width: `${seatWidth}px`,
        height: `${seatHeight}px`,
        // transform: `scale(${seat.zoomX}, ${seat.zoomY})`,
        backgroundColor: slot?.seats?.includes(seat.id)
         ? "gray"
         : selectedSeats.includes(seat.id)
         ? "#22c55e"
         : seat.fill,
        borderColor: slot?.seats?.includes(seat.id)
         ? "gray"
         : selectedSeats.includes(seat.id)
         ? "#15803d"
         : seat.stroke,
        borderStyle: slot?.seats?.includes(seat.id)
         ? "gray"
         : selectedSeats.includes(seat.id)
         ? "none"
         : "solid",
        borderWidth: `${seat.strokeWidth}px`,
        cursor: seat.cursor,
       }}
      >
       {selectedSeats.includes(seat.id) && <Check className="text-white w-4 h-4 !border-none" />}
       <Tooltip delayDuration={200}>
        <TooltipTrigger
         className="p-0 absolute border-none outline-none hover:border-none hover:outline-none bg-transparent"
         style={{
          width: `${seatWidth}px`,
          height: `${seatHeight}px`,
          transform: `scale(${seat.zoomX}, ${seat.zoomY})`,
          borderWidth: `${seat.strokeWidth}px`,
         }}
         type="button"
        >
         <TooltipContent>
          <p>
           {seat.ticketType}-{seat.number}
          </p>
         </TooltipContent>
        </TooltipTrigger>
       </Tooltip>
      </button>

      {/* Tooltip */}
     </React.Fragment>
    );
   })}
  </div>
 );
};

export default SeatPlan;
