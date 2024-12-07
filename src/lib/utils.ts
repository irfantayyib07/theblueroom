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

export const getAvailableDays = (data: Appointment) => {
 return dayMap.reduce<number[]>((availableIndexes, day, index) => {
  const availableSlots = data.schedule?.[23]?.[day]?.length || 0;
  if (availableSlots > 0) {
   availableIndexes.push(index);
  }
  return availableIndexes;
 }, []);
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
