import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Seat, Slot } from "@/types/types";
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { BookingFormData } from "./Page";

type CanvasProps = {
 seats: Seat[];
 slot: Slot;
 bgImage: string;
 canvasDimensions: { width: number; height: number };
 negativeSizeFactor?: number;
};

const SeatPlan: React.FC<CanvasProps> = ({
 seats = [],
 slot,
 bgImage = "",
 canvasDimensions = { width: 0, height: 0 },
 negativeSizeFactor = 1.5,
}) => {
 const {
  setValue,
  getValues,
  formState: { errors },
 } = useFormContext<BookingFormData>();
 const selectedSeats = getValues("seats") || [];

 const toggleSeatSelection = (seatId: number) => {
  const updatedSeats = selectedSeats.includes(seatId)
   ? selectedSeats.filter((id: number) => id !== seatId)
   : [...selectedSeats, seatId];
  setValue("seats", updatedSeats);
 };

 return (
  <div className="space-y-2">
   <label className="text-sm">
    Select Seats <span className="text-red-500">*</span>
   </label>
   {errors.seats && errors.seats.message && (
    <p className="text-sm text-red-500 mt-2">{errors.seats.message}</p>
   )}
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
       <div
        onClick={
         Object.values(slot?.seats || {}).includes(seat.id) ? () => {} : () => toggleSeatSelection(seat.id)
        }
        className={cn(
         "absolute rounded-full flex items-center justify-center transition-transform p-0",
         Object.values(slot?.seats || {}).includes(seat.id) ? "" : "hover:scale-125",
        )}
        style={{
         top: `${seatTop}px`,
         left: `${seatLeft}px`,
         width: `${seatWidth}px`,
         height: `${seatHeight}px`,
         // transform: `scale(${seat.zoomX}, ${seat.zoomY})`,
         backgroundColor: Object.values(slot?.seats || {}).includes(seat.id)
          ? "gray"
          : selectedSeats.includes(seat.id)
          ? "#22c55e"
          : seat.fill,
         borderColor: Object.values(slot?.seats || {}).includes(seat.id)
          ? "gray"
          : selectedSeats.includes(seat.id)
          ? "#15803d"
          : seat.stroke,
         borderStyle: Object.values(slot?.seats || {}).includes(seat.id)
          ? "gray"
          : selectedSeats.includes(seat.id)
          ? "none"
          : "solid",
         borderWidth: `${seat.strokeWidth}px`,
         cursor: Object.values(slot?.seats || {}).includes(seat.id) ? "not-allowed" : seat.cursor,
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
           cursor: Object.values(slot?.seats || {}).includes(seat.id) ? "not-allowed" : "pointer",
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
       </div>
       {/* Tooltip */}
      </React.Fragment>
     );
    })}
   </div>
  </div>
 );
};

export default SeatPlan;
