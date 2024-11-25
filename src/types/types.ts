// Enums
export enum BookingStatus {
 Pending = "pending",
 Confirmed = "confirmed",
 Cancelled = "cancelled",
}

export enum AppointmentType {
 Seat = "seat",
 Meeting = "meeting",
}

export enum LocationType {
 InPersonMeeting = "in-person-meeting",
 Online = "online",
}

// Reusable Types
export type TimeSlot = { start: string; end: string };

export type Slot = {
 status: string;
 start_time: string;
 booked: number | string;
 seats: number[];
};

export type Availability = { [x: number]: { [day: string]: TimeSlot[] } };

export type Location = {
 location_type: LocationType;
 location: string;
};

export type TicketPrice = {
 ticket_name: string;
 ticket_price: number;
 ticket_quantity: number;
 min_quantity?: number | null;
 max_quantity?: number | null;
};

export type CustomField = {
 fieldLabel: string;
 fieldType: string;
 required: boolean;
 additionalText: string;
 placeholderText: string;
 id: string;
};

export type License = {
 name: string;
 email: string;
 license_key: string;
 status: string;
};

export type Seat = {
 id: number;
 label: string | null;
 type: string;
 number: string;
 status: string | null;
 angle: string;
 scaleX: string;
 scaleY: string;
 color: string | null;
 positionX: string;
 positionY: string;
 zoomX: string;
 zoomY: string;
 ticketType: string;
 shapeType: string;
 fill: string;
 stroke: string;
 strokeWidth: string;
 radius: string;
 price: string;
 width: string;
 height: string;
 meeting: string | number;
 text: string | null;
 fontSize: string | null;
 cursor: string;
 parent: number;
};

export type Guest = {
 id: number;
 name: string;
 email: string;
};

export type Attendee = {
 id: number;
 name: string;
 email: string;
};

// Main Types
export type PaymentMethod = {
 name: string;
 status: boolean;
};

export type PaymentMethodsResponse = {
 success: number;
 status_code: number;
 data: PaymentMethod[];
};

export type SettingsResponse = {
 default_booking_status: BookingStatus;
 currency: string;
 primary_color: string;
 secondary_color: string;
 availability: Availability;
 calendar_locale: string;
 locale_timezone: string;
 wc_integration: boolean;
 local_pay_status: boolean;
 stripe_status: boolean;
 paypal_status: boolean;
 license: License;
 remainder_time: {
  "duration-time": string;
  custom_duration_type: string;
 }[];
 guest_enabled: boolean;
 custom_fields: CustomField[];
 guest_limit: number;
 wc_checkout_url: string;
};

export type BookingPayload = {
 first_name: string;
 email: string;
 custom_form_data: {
  phone_number: string;
 };
 timezone: string;
 staff: number;
 appointment: number;
 date: string;
 start_date: string;
 start_time: string;
 end_time: string;
 booking_createAt: string;
 seats: number[];
 payment_method: string;
 order_total: number;
 location_type: LocationType;
 location: string;
 guests: Guest[];
};

export type BookingResponse = {
 success: number;
 status_code: number;
 message: string;
 data: {
  id: number;
  random_id: string;
  status: BookingStatus;
  order_total: string;
  start_date: string;
  end_date: string;
  date: string;
  start_time: string;
  end_time: string;
  booking_time: string;
  location: string;
  location_type: LocationType;
  description: string;
  cancel_reason: string;
  customer: {
   id: string;
   full_name: string;
   first_name: string;
   last_name: string | null;
   email: string;
   phone: string;
  };
  appointment: {
   id: string;
   name: string;
   duration: string;
   type: AppointmentType;
   price: TicketPrice[];
   locations: Location[];
   timezone: string;
   permalink: string;
  };
  staff: {
   id: string;
   full_name: string;
   first_name: string;
   last_name: string | null;
   email: string;
   phone: string;
   image: string;
  };
  seats: Seat[];
  attendees: Attendee[];
  custom_form_data: {
   phone_number: string;
  };
 };
};

export type Entry = {
 date: string; // Date of the entry
 status: string; // Status of the entry (e.g., "available")
 slots: Slot[];
};

export type EntriesResponse = {
 success: number; // 1 for success
 status_code: number; // HTTP status code
 message: string; // Response message
 data: {
  today: string; // Current date
  availability_timezone: string; // Timezone for availability
  days: Entry[]; // Array of entries
 };
};

export type Appointment = {
 id: number; // Appointment ID
 name: string; // Appointment name
 image: boolean | string; // Appointment image or boolean (e.g., if not available)
 description: string; // Description of the appointment
 type: string; // Type of appointment (e.g., "seat")
 locations: {
  location_type: string;
  location: string;
 }[]; // Appointment locations
 schedule: {
  [key: string]: {
   [day: string]: {
    start: string;
    end: string;
   }[];
  };
 }; // Weekly schedule
 blocked_schedule: string; // Blocked schedule (if any)
 price: {
  ticket_name: string;
  ticket_price: number;
  ticket_quantity: number;
  min_quantity?: number | null;
  max_quantity?: number | null;
 }[]; // Appointment ticket pricing
 categories: string[]; // Categories (if any)
 staff: {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone: string;
  image: string;
  status: string; // Staff status
  service: boolean; // Service flag
  schedule: {
   key: string;
   name: string;
   status: boolean;
   schedules: {
    start: {
     value: number;
     label: string;
    };
    end: {
     value: number;
     label: string;
    };
   }[];
  }[];
 }[];
 buffer_time: string; // Buffer time between appointments
 timezone: string; // Timezone
 availability: {
  dirtySchedules: number[];
  start: string; // Start date
  end: string; // End date
 }; // Availability
 visibility: string; // Visibility (e.g., "enabled")
 duration: string; // Duration (e.g., "1 hr")
 notifications: {
  booking_reminder_time: string; // Booking reminder time
 };
 capacity: string; // Appointment capacity
 fluent_hook_overwrite: string; // Fluent CRM webhook overwrite
 fleunt_crm_webhook: string; // Fluent CRM webhook
 pabbly_hook_overwrite: string; // Pabbly webhook overwrite
 pabbly_webook: string; // Pabbly webhook
 zapier_hook_overwrite: string; // Zapier webhook overwrite
 zapier_webook: string; // Zapier webhook
 min_notice_time: string; // Minimum notice time
 custom_fields: any[]; // Custom fields
 permalink: string; // Appointment permalink
 guest_enabled: string; // Guest enabled flag
 guest_limit: string; // Guest limit
 author: string; // Author ID
 seat_plan: Seat[];
 seat_plan_settings: {
  canvasDimensions: {
   width: number;
   height: number;
  };
  selectColor: string;
  unavailableColor: string;
  canvasBgImage: string;
 };
};

export type AppointmentsResponse = {
 success: number;
 status_code: number;
 message: string;
 data: Appointment;
};
