// FormStepThree.js
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { BookingFormData } from "./Page";
import { Loader2 } from "lucide-react";

const FormStepThree = ({
 prevStep,
 isCreatingOrder,
 isBooking,
}: {
 prevStep: () => void;
 isCreatingOrder: boolean;
 isBooking: boolean;
}) => {
 const {
  control,
  formState: { errors },
 } = useFormContext<BookingFormData>();

 return (
  <>
   <FormItem>
    <FormLabel className="text-sm">
     Full name <span className="text-red-500">*</span>
    </FormLabel>
    <FormControl>
     <Input
      {...control.register("customerName")}
      placeholder="Enter your name"
      className={errors.customerName ? "border-red-500" : ""}
      disabled={isBooking || isCreatingOrder}
     />
    </FormControl>
    {errors.customerName && <FormMessage>{errors.customerName.message}</FormMessage>}
   </FormItem>

   <FormItem>
    <FormLabel className="text-sm">
     Email address <span className="text-red-500">*</span>
    </FormLabel>
    <FormControl>
     <Input
      {...control.register("customerEmail")}
      placeholder="Enter your email address"
      className={errors.customerEmail ? "border-red-500" : ""}
      disabled={isBooking || isCreatingOrder}
     />
    </FormControl>
    {errors.customerEmail && <FormMessage>{errors.customerEmail.message}</FormMessage>}
   </FormItem>

   <FormItem>
    <FormLabel className="text-sm">
     Phone number <span className="text-red-500">*</span>
    </FormLabel>
    <FormControl>
     <Input
      {...control.register("customerPhone")}
      placeholder="Enter your phone number"
      className={errors.customerPhone ? "border-red-500" : ""}
      disabled={isBooking || isCreatingOrder}
     />
    </FormControl>
    {errors.customerPhone && <FormMessage>{errors.customerPhone.message}</FormMessage>}
   </FormItem>

   <FormItem>
    <FormLabel className="text-sm">Additional notes</FormLabel>
    <FormControl>
     <Textarea
      {...control.register("description")}
      placeholder="Please share any details that will help us prepare for your reservation, such as food allergies, etc."
      className={errors.description ? "border-red-500" : ""}
      disabled={isBooking || isCreatingOrder}
     />
    </FormControl>
    {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
   </FormItem>
   <div className="ml-auto flex flex-wrap gap-4">
    <Button
     type="button"
     variant="outline"
     onClick={prevStep}
     className="px-8 py-2 font-semibold"
     disabled={isBooking || isCreatingOrder}
    >
     Go back
    </Button>
    <Button type="submit" className="px-8 py-2 font-semibold" disabled={isBooking || isCreatingOrder}>
     {isBooking ? (
      <>
       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
      </>
     ) : isCreatingOrder ? (
      <>
       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Your Order...
      </>
     ) : (
      "Create booking"
     )}
    </Button>
   </div>
  </>
 );
};

export default FormStepThree;
