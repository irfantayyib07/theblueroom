// https://tbr.otbbookings.co.za/wp-json/timetics/v1/bookings/entries?staff_id=17&meeting_id=21&start_date=2024-11-26&end_date=2024-11-26&timezone=Asia/Karachi

import { useQuery } from "react-query";
import apiClient from "./apiClient";
import { EntriesResponse } from "../types/types";

export const useEntries = (
 startDate: string,
 endDate: string,
 meetingId: number = 21,
 staffId: number = 17,
 timeZone: string = "Asia/Karachi",
) => {
 return useQuery<EntriesResponse | undefined>(
  "entries",
  async () => {
   const params = new URLSearchParams();

   if (!(startDate || endDate)) return undefined;

   if (meetingId) params.append("meeting_id", meetingId.toString());
   if (staffId) params.append("staff_id", staffId.toString());
   if (startDate) params.append("start_date", startDate.toString());
   if (endDate) params.append("end_date", endDate.toString());
   if (timeZone) params.append("timezone", timeZone.toString());

   const response = await apiClient.get<EntriesResponse>(`/bookings/entries?${params.toString()}`);
   return response.data;
  },
  {
   staleTime: 1000 * 60 * 5, // Cache for 5 minutes
   cacheTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  },
 );
};
