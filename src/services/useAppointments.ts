// https://tbr.otbbookings.co.za/wp-json/timetics/v1/appointments/21

import { useQuery } from "react-query";
import apiClient from "./apiClient";
import { AppointmentsResponse } from "../types/types";

export const useAppointments = () => {
 return useQuery<AppointmentsResponse>(
  "appointments",
  async () => {
   const response = await apiClient.get<AppointmentsResponse>("/appointments/21");
   return response.data;
  },
  {
   staleTime: 1000 * 60 * 5, // Cache for 5 minutes
   cacheTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  },
 );
};
