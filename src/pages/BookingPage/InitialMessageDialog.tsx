import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function InitialMessageDialog() {
 const [isDialogOpen, setDialogOpen] = useState(false);

 useEffect(() => {
  setDialogOpen(true);
 }, []);

 const handleClose = () => {
  setDialogOpen(false);
 };

 return (
  <>
   <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle>Important Booking Information</DialogTitle>
     </DialogHeader>
     <p className="text-sm text-gray-700">
      To ensure smooth processing, please create your booking at least 2 hours before your selected time.
      Bookings made less than 2 hours in advance might not be confirmed. We appreciate your understanding and
      cooperation!
     </p>
     <DialogFooter>
      <Button onClick={handleClose}>Understood</Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </>
 );
}

export default InitialMessageDialog;
