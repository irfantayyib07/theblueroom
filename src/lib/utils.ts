import { Appointment } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { format, getDay, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isDayDisabled = (data: Appointment, date: Date) => {
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const dayOfWeek = dayMap[getDay(date)];
 return !data.schedule?.[23]?.[dayOfWeek]?.length || date < today;
};

export const convertTo24HourFormat = (time: string) => {
 const parsedTime = parse(time, "h:mma", new Date());
 return format(parsedTime, "HH:mm");
};

export function getEndTime(start_time: string, duration: string) {
 const [hours, minutes] = start_time.split(":").map(Number);

 const startDate = new Date();
 startDate.setHours(hours, minutes, 0, 0);

 const durationParts = duration.match(/(\d+)\s*(hr|min)/);
 const durationValue = parseInt(durationParts?.[1] || "0", 10);
 const durationUnit = durationParts?.[2];

 if (durationUnit === "hr") {
  startDate.setHours(startDate.getHours() + durationValue);
 } else if (durationUnit === "min") {
  startDate.setMinutes(startDate.getMinutes() + durationValue);
 }

 const endHours = startDate.getHours() % 12 || 12;
 const endMinutes = startDate.getMinutes().toString().padStart(2, "0");
 const period = startDate.getHours() >= 12 ? "pm" : "am";
 const endTime = `${endHours}:${endMinutes} ${period}`;

 return endTime;
}

export function getBookingCreateAt() {
 const now = new Date();
 const options: {
  year: "numeric";
  month: "long";
  day: "numeric";
  hour: "numeric";
  minute: "numeric";
  hour12: boolean;
 } = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
 };

 return now.toLocaleString("en-US", options).replace("at ", "");
}

// console.log({
//  first_name: formData?.customerName,
//  email: formData?.customerEmail,
//  custom_form_data: {
//   phone_number: formData?.customerPhone,
//  },
//  description: formData?.description,
//  timezone: "Asia/Karachi",
//  staff: 23,
//  appointment: 21,
//  date: format(new Date(), "yyyy-MM-dd"),
//  start_date: format(formData?.date, "yyyy-MM-dd"),
//  start_time: formData?.time,
//  end_time: getEndTime(formData.time, data.duration),
//  booking_createAt: getBookingCreateAt(),
//  seats: formData?.seats,
//  payment_method: "woocommerce",
//  order_total: formData?.seats.reduce((total, seatId) => {
//   const seat = data?.seat_plan.find(seat => seat.id === seatId);
//   return total + (seat ? parseFloat(seat.price) : 0);
//  }, 0),
//  location_type: data?.locations?.[0]?.location_type,
//  location: data?.locations?.[0]?.location,
//  guests: [],
// });
