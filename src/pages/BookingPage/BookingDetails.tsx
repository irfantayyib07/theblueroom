import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CheckCheck, MapPinIcon, TicketCheck } from "lucide-react";
import type { BookingFormData } from "./Page";
import { Separator } from "@/components/ui/separator";
import { format, getDay } from "date-fns";
import { Appointment } from "@/types/types";
import { PRICING_DATA } from "@/data";

const BookingDetails = ({ data, currentStep }: { data: Appointment; currentStep: number }) => {
 const { watch } = useFormContext<BookingFormData>();
 const formData = watch();

 const renderDateTime = (): React.ReactNode => {
  const formattedDate = formData.date ? format(formData.date as Date, "dd MMMM yyyy") : null; // Example: "24 November 2024"

  return (
   <div className="flex flex-col gap-4">
    <div className="flex items-start space-x-3">
     <CalendarIcon className="h-5 w-5 text-blue-600 mt-0.5" />
     <div className="font-semibold">Selected date/time:</div>
    </div>
    {formData.date ? (
     <div>
      {formattedDate} {formData.time ? formData.time : ""}
     </div>
    ) : (
     <div>None</div>
    )}
   </div>
  );
 };

 const selectedSeats = data?.seat_plan?.filter(seat => formData?.seats?.includes(seat.id)) || [];

 return (
  <Card className="w-full min-w-[260px] bg-white flex-1">
   <CardHeader>
    <CardTitle className="text-xl font-bold">{data?.name}</CardTitle>
   </CardHeader>
   <CardContent className="space-y-6">
    {/* Date and Time Section */}
    {renderDateTime()}

    <Separator />

    {/* Ticket Price Section */}
    {/* <div>
     <div className="flex items-start space-x-3">
      <TicketIcon className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Ticket Price:</div>
     </div>
     <div className="mt-4 space-y-3">
      {data?.price?.map((ticket, i) => {
       return (
        <div key={ticket?.ticket_name + i}>
         {ticket?.ticket_name} : R{ticket?.ticket_price}
        </div>
       );
      })}
     </div>
    </div> */}

    {/* <Separator /> */}

    {/* Selected Seats Section */}
    {(currentStep === 2 || currentStep === 3) && (
     <>
      <div>
       <div className="flex items-start space-x-3">
        <CheckCheck className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="font-semibold">Selected seats:</div>
       </div>
       <div className="mt-4 space-y-3">
        {selectedSeats.length ? (
         selectedSeats.map(seat => `${seat.ticketType}-${seat.number}`).join(", ")
        ) : (
         <span>None</span>
        )}
       </div>
      </div>
      <Separator />
      {/* Ticket Quantity Section */}
      <div>
       <div className="flex items-start space-x-3">
        <TicketCheck className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="font-semibold">Number of guests: {formData?.seats?.length}</div>
       </div>
      </div>
      <Separator />
      {/* Total Price Section */}
      <div>
       <div className="flex items-center space-x-3">
        <svg width="20" height="20" viewBox="0 0 22 16" fill="none">
         <path
          d="M5 6v4m12-4v4M1 4.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C2.52 15 3.08 15 4.2 15h13.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 13.48 21 12.92 21 11.8V4.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 1 18.92 1 17.8 1H4.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C1 2.52 1 3.08 1 4.2M13.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
          stroke="#3161F1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
         />
        </svg>
        <div className="font-semibold">Total price:</div>
       </div>
       <div className="mt-4 space-y-3">
        R
        {selectedSeats.reduce(
         (acc, seat): number => acc + PRICING_DATA[getDay(formData.date)][seat.ticketType],
         0,
        )}
       </div>
      </div>

      <Separator />
     </>
    )}

    {/* Location Section */}
    <div className="flex flex-col gap-4">
     <div className="flex items-start space-x-3">
      <MapPinIcon className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Location:</div>
     </div>
     <div>{data?.locations?.[0].location}</div>
    </div>
   </CardContent>
  </Card>
 );
};

export default BookingDetails;
