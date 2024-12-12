import React, { useState, useEffect } from "react";
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

const useWindowSize = () => {
 const [windowSize, setWindowSize] = useState({
  width: typeof window !== "undefined" ? window.innerWidth : 1200,
  height: typeof window !== "undefined" ? window.innerHeight : 800,
 });

 useEffect(() => {
  const handleResize = () => {
   setWindowSize({
    width: window.innerWidth,
    height: window.innerHeight,
   });
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
 }, []);

 return windowSize;
};

const calculateResponsiveScaling = (
 originalDimension: number,
 windowWidth: number,
 breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
 },
) => {
 if (windowWidth >= breakpoints.xl) return originalDimension * 1.1;
 if (windowWidth >= breakpoints.lg) return originalDimension * 0.9;
 if (windowWidth >= breakpoints.md) return originalDimension * 0.8;
 if (windowWidth >= breakpoints.sm) return originalDimension * 0.7;
 return originalDimension * 0.6;
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
 const windowSize = useWindowSize();

 const responsiveWidth = calculateResponsiveScaling(
  canvasDimensions.width / negativeSizeFactor,
  windowSize.width,
 );
 const responsiveHeight = calculateResponsiveScaling(
  canvasDimensions.height / negativeSizeFactor,
  windowSize.width,
 );

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
    className="relative min-h-96 w-fit rounded-lg overflow-hidden"
    style={{
     width: `${responsiveWidth}px`,
     height: `${responsiveHeight}px`,
    }}
   >
    {/* Background Image */}
    <img
     src={bgImage}
     alt="Seating Plan"
     className="absolute top-0 left-0 object-cover"
     style={{
      width: `${responsiveWidth}px`,
      height: `${responsiveHeight}px`,
     }}
    />
    {/* Seats */}
    {seats.map(seat => {
     const scaleFactor = responsiveWidth / (canvasDimensions.width / negativeSizeFactor);
     const seatTop = (parseFloat(seat.positionY) / negativeSizeFactor) * scaleFactor;
     const seatLeft = (parseFloat(seat.positionX) / negativeSizeFactor) * scaleFactor;
     const seatWidth = (+seat.width / negativeSizeFactor) * scaleFactor;
     const seatHeight = (+seat.height / negativeSizeFactor) * scaleFactor;

     return (
      <React.Fragment key={seat.id}>
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
      </React.Fragment>
     );
    })}
   </div>
  </div>
 );
};

export default SeatPlan;
