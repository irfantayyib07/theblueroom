// https://tbr.otbbookings.co.za/wp-json/timetics/v1/bookings/payment_methods

import { useQuery } from "react-query";
import apiClient from "./apiClient";
import { PaymentMethodsResponse } from "../types/types";

export const usePaymentMethods = () => {
 return useQuery<PaymentMethodsResponse>(
  "paymentMethods",
  async () => {
   const response = await apiClient.get<PaymentMethodsResponse>("/bookings/payment_methods");
   return response.data;
  },
  {
   staleTime: 1000 * 60 * 5, // Cache for 5 minutes
   cacheTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  },
 );
};
