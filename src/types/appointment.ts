export type AppointmentResponse = {
 status_code: number;
 message: string;
 data: {
  id: number;
  name: string;
  image: boolean | string; // Assuming `image` could be a string if not false
  description: string;
  type: string;
  locations: {
   location_type: string;
   location: string;
  }[];
  schedule: {
   [key: string]: {
    [day: string]: {
     start: string;
     end: string;
    }[];
   };
  };
  blocked_schedule: string | null;
  price: {
   ticket_name: string;
   ticket_price: number;
   ticket_quantity: number;
   min_quantity?: number | null;
   max_quantity?: number | null;
  }[];
  categories: any[]; // Assuming no type specified for categories
  staff: {
   id: number;
   full_name: string;
   first_name: string;
   last_name: string | null;
   user_name: string;
   email: string;
   phone: string;
   image: string;
   status: string;
   service: boolean | null;
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
  buffer_time: string | null;
  timezone: string;
  availability: {
   dirtySchedules: number[];
   start: string;
   end: string;
  };
  visibility: string;
  duration: string;
  notifications: {
   booking_reminder_time: string;
  };
  capacity: string | number; // Assuming capacity might be a number
  fluent_hook_overwrite: string | null;
  fleunt_crm_webhook: string | null;
  pabbly_hook_overwrite: string | null;
  pabbly_webook: string | null;
  zapier_hook_overwrite: string | null;
  zapier_webook: string | null;
  min_notice_time: string | null;
  custom_fields: any[]; // Assuming no type specified for custom fields
  permalink: string;
  guest_enabled: string | null;
  guest_limit: string | number;
  author: string | number;
  seat_plan: {
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
   ticketType: string;
   shapeType: string;
   fill: string;
   stroke: string;
   strokeWidth: string;
   radius: string;
   price: string;
   width: string;
   height: string;
   zoomY: string;
   meeting: string | number;
   text: string | null;
   fontSize: string | null;
   cursor: string;
   parent: number;
  }[];
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
};
