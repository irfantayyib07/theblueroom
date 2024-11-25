// https://tbr.otbbookings.co.za/wp-json/timetics/v1/settings

import { useQuery } from "react-query";
import apiClient from "./apiClient";
import { SettingsResponse } from "../types/types";

export const useSettings = () => {
 return useQuery<SettingsResponse>(
  "settings",
  async () => {
   const response = await apiClient.get<SettingsResponse>("/settings");
   return response.data;
  },
  {
   staleTime: 1000 * 60 * 5,
   cacheTime: 1000 * 60 * 10,
  },
 );
};
