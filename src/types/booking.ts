export type BookingPayload = {
 first_name: string; // User's first name
 email: string; // User's email address
 custom_form_data: {
  phone_number: string; // User's phone number
 };
 timezone: string; // Timezone of the booking (e.g., "Asia/Karachi")
 staff: number; // ID of the assigned staff member
 appointment: number; // ID of the appointment
 date: string; // Date of the booking (e.g., "2024-11-28")
 start_date: string; // Start date of the booking (e.g., "2024-11-28")
 start_time: string; // Start time of the booking (e.g., "20:00")
 end_time: string; // End time of the booking (e.g., "9:00 pm")
 booking_createAt: string; // Timestamp of booking creation (e.g., "November 24, 2024 6:06 PM")
 seats: number[]; // Array of seat IDs
 payment_method: string; // Payment method used (e.g., "woocommerce")
 order_total: number; // Total order amount
 location_type: string; // Type of location (e.g., "in-person-meeting")
 location: string; // Address or location details
 guests: any[]; // List of guests (if any)
};

export type BookingResponse = {
 success: number; // 1 for success
 status_code: number; // HTTP status code
 message: string; // Message describing the result (e.g., "Successfully created booking")
 data: {
  id: number; // Booking ID
  random_id: string; // Randomly generated booking identifier
  status: string; // Booking status (e.g., "approved")
  order_total: string; // Total amount for the booking
  start_date: string; // Booking start date
  end_date: string; // Booking end date
  date: string; // Date of the booking
  start_time: string; // Booking start time
  end_time: string; // Booking end time
  booking_time: string; // Time when the booking was created
  location: string; // Location of the appointment
  location_type: string; // Type of location (e.g., "in-person-meeting")
  description: string; // Booking description (empty if not provided)
  cancel_reason: string; // Reason for cancellation (empty if not canceled)
  customer: {
   id: string; // Customer ID
   full_name: string; // Full name of the customer
   first_name: string; // First name of the customer
   last_name: string | null; // Last name of the customer
   email: string; // Customer's email address
   phone: string; // Customer's phone number (empty if not provided)
  };
  appointment: {
   id: string; // Appointment ID
   name: string; // Name of the appointment
   duration: string; // Appointment duration (e.g., "1 hr")
   type: string; // Appointment type (e.g., "seat")
   price: {
    ticket_name: string; // Name of the ticket
    ticket_price: number; // Price of the ticket
    ticket_quantity: number; // Quantity of tickets available
    min_quantity?: number | null; // Minimum quantity (if applicable)
    max_quantity?: number | null; // Maximum quantity (if applicable)
   }[];
   locations: {
    location_type: string; // Type of location
    location: string; // Address of the location
   }[];
   timezone: string; // Timezone of the appointment
   permalink: string; // URL to the appointment details
  };
  staff: {
   id: string; // Staff ID
   full_name: string; // Full name of the staff member
   first_name: string; // First name of the staff member
   last_name: string | null; // Last name of the staff member
   email_name: string; // Staff member's email
   phone: string; // Staff member's phone number
   image: string; // URL of the staff member's image
  };
  seats: {
   id: number; // Seat ID
   label: string | null; // Seat label (empty if not provided)
   type: string; // Shape type (e.g., "circle")
   number: string; // Seat number
   status: string | null; // Seat status
   angle: string; // Angle of the seat
   scaleX: string; // Horizontal scaling factor
   scaleY: string; // Vertical scaling factor
   color: string | null; // Seat color (if applicable)
   positionX: string; // X-coordinate position
   positionY: string; // Y-coordinate position
   zoomX: string; // Horizontal zoom factor
   ticketType: string; // Type of ticket associated with the seat
   shapeType: string; // Shape type of the seat
   fill: string; // Fill color of the seat
   stroke: string; // Stroke color of the seat
   strokeWidth: string; // Width of the stroke
   radius: string; // Radius of the seat
   price: string; // Price of the seat
   width: string; // Width of the seat
   height: string; // Height of the seat
   zoomY: string; // Vertical zoom factor
   meeting: string | number; // Meeting ID
   text: string | null; // Additional text for the seat (if any)
   fontSize: string | null; // Font size for the text (if any)
   cursor: string; // Cursor style for the seat
   parent: number; // Parent ID (if applicable)
  }[];
  attendees: any[]; // Array of attendees (empty if none)
  custom_form_data: {
   phone_number: string; // Custom field: phone number
  };
 };
};
