import { Appointment } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { getDay } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isDayDisabled = (data: Appointment, date: Date) => {
 const dayOfWeek = dayMap[getDay(date)];
 return !data.schedule?.[17]?.[dayOfWeek]?.length;
};
