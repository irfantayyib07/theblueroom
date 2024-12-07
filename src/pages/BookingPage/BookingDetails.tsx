import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, CheckCheck, DollarSign, MapPinIcon, TicketCheck, TicketIcon } from "lucide-react";
import type { BookingFormData } from "./Page";
import { Separator } from "@/components/ui/separator";
import { format, getDay } from "date-fns";
import { Appointment } from "@/types/types";
import { PRICING_DATA } from "@/data";

const BookingDetails = ({ data }: { data: Appointment }) => {
 const { watch } = useFormContext<BookingFormData>();
 const formData = watch();

 const renderDateTime = (): React.ReactNode => {
  if (!formData.date) return;

  const formattedDate = format(formData.date as Date, "dd MMMM yyyy"); // Example: "24 November 2024"

  return (
   <div className="flex flex-col gap-4">
    <div className="flex items-start space-x-3">
     <CalendarIcon className="h-5 w-5 text-blue-600 mt-0.5" />
     <div className="font-semibold">Today:</div>
    </div>
    <div>
     {formattedDate} {formData.time ? formData.time : ""}
    </div>
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
    {formData.date && renderDateTime()}

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
    <div>
     <div className="flex items-start space-x-3">
      <CheckCheck className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Selected Seats:</div>
     </div>
     <div className="mt-4 space-y-3">
      {selectedSeats.length ? (
       selectedSeats.map(seat => `${seat.ticketType}-${seat.number}`).join(", ")
      ) : (
       <span className="italic">None</span>
      )}
     </div>
    </div>

    <Separator />

    {/* Ticket Quantity Section */}
    <div>
     <div className="flex items-start space-x-3">
      <TicketCheck className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Ticket Quantity: {formData?.seats?.length}</div>
     </div>
    </div>

    <Separator />

    {/* Total Price Section */}
    <div>
     <div className="flex items-start space-x-3">
      <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Total Price:</div>
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

    {/* Location Section */}
    <div className="flex flex-col gap-4">
     <div className="flex items-start space-x-3">
      <MapPinIcon className="h-5 w-5 text-blue-600 mt-0.5" />
      <div className="font-semibold">Location:</div>
     </div>
     <div className="text-sm">{data?.locations?.[0].location}</div>
    </div>
   </CardContent>
  </Card>
 );
};

export default BookingDetails;
