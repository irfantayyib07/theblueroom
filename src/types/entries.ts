export type EntriesResponse = {
 success: boolean;
 status_code: number;
 message: string;
 data: {
  today: string;
  availability_timezone: string;
  days: {
   date: string;
   status: string; // Example: "available"
   slots: {
    status: string; // Example: "available"
    start_time: string; // Example: "7:00pm"
    booked: number | string; // Booked can be a number or string (e.g., 0 or "1")
    seats: number[]; // Array of seat IDs
   }[];
  }[];
 };
};
