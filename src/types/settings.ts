export type SettingsResponse = {
 default_booking_status: string; // Example: "approved"
 currency: string; // Example: "ZAR"
 primary_color: string; // Hex color code for primary color
 secondary_color: string; // Hex color code for secondary color
 availability: {
  [day: string]: {
   start: string; // Start time (e.g., "16:00")
   end: string; // End time (e.g., "23:00")
  }[];
 };
 calendar_locale: string; // Example: "en"
 locale_timezone: string; // Example: "Africa/Johannesburg"
 wc_integration: boolean; // WooCommerce integration status
 local_pay_status: boolean; // Local Pay status
 stripe_status: boolean; // Stripe status
 paypal_status: boolean; // PayPal status
 license: {
  name: string; // License holder's name
  email: string; // License holder's email
  license_key: string; // License key
  status: string; // Example: "active"
 };
 remainder_time: {
  "duration-time": string; // Duration value (e.g., "1")
  custom_duration_type: string; // Unit of duration (e.g., "hour", "min")
 }[];
 guest_enabled: boolean; // Whether guest booking is enabled
 custom_fields: {
  fieldLabel: string; // Label for the custom field
  fieldType: string; // Type of the field (e.g., "text")
  required: boolean; // Whether the field is required
  additionalText: string; // Any additional text or description
  placeholderText: string; // Placeholder text for the field
  id: string; // Unique identifier for the field
 }[];
 guest_limit: number; // Maximum number of guests
 wc_checkout_url: string; // WooCommerce checkout URL
};
