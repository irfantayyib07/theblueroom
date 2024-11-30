// https://tbr.otbbookings.co.za/wp-json/timetics/v1/bookings/entries?staff_id=23&meeting_id=21&start_date=2024-11-26&end_date=2024-11-26&timezone=Asia/Karachi

import { useQuery } from "react-query";
import apiClient from "./apiClient";
import { EntriesResponse } from "../types/types";

export const useEntries = (
 startDate: string,
 endDate: string,
 successFn?: (data: EntriesResponse) => void,
 meetingId: number = 21,
 staffId: number = 23,
 timeZone: string = "Africa/Johannesburg",
) => {
 return useQuery<EntriesResponse | undefined>(
  ["entries", startDate, endDate],
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
   refetchOnWindowFocus: true,
   enabled: startDate && endDate ? true : false,
   onSuccess: data => {
    if (successFn && data) {
     successFn(data);
    }
   },
  },
 );
};
