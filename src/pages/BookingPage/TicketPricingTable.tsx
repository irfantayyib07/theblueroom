import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getDay } from "date-fns";
import { DAY_NAMES, PRICING_DATA } from "@/data";
import { BookingFormData } from "./Page";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const TicketPricingTable = ({ availableDays }: { availableDays: number[] }) => {
 const { getValues } = useFormContext<BookingFormData>();
 const date = getValues("date") || null;
 const currentDayIndex = date ? getDay(new Date(date)) : null;

 return (
  <div className="space-y-3 w-full sm:w-auto grow">
   <h2 className="text-sm font-semibold">Weekly Ticket Type Pricing</h2>
   <Card>
    <CardContent className="p-0">
     <div className="overflow-x-auto">
      <Table className="w-full">
       <TableHeader>
        <TableRow>
         <TableHead className="w-[100px]">Day</TableHead>
         <TableHead className="whitespace-nowrap text-center">Type A</TableHead>
         <TableHead className="whitespace-nowrap text-center">Type B</TableHead>
         <TableHead className="whitespace-nowrap text-center">Type C</TableHead>
        </TableRow>
       </TableHeader>
       <TableBody>
        {Object.entries(PRICING_DATA).map(([dayIndex, prices]) => (
         <TableRow
          key={dayIndex}
          className={cn(
           "hover:bg-accent hover:text-accent-foreground",
           currentDayIndex === +dayIndex && "bg-primary/10",
          )}
         >
          <TableCell className="font-medium">{DAY_NAMES[dayIndex]}</TableCell>
          <TableCell className="text-center">
           {availableDays.includes(+dayIndex) ? `$${prices.A}` : "-"}
          </TableCell>
          <TableCell className="text-center">
           {availableDays.includes(+dayIndex) ? `$${prices.B}` : "-"}
          </TableCell>
          <TableCell className="text-center">
           {availableDays.includes(+dayIndex) ? `$${prices.C}` : "-"}
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </div>
    </CardContent>
   </Card>
  </div>
 );
};

export default TicketPricingTable;
