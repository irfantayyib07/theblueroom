// https://tbr.otbbookings.co.za/wp-json/timetics/v1/bookings

// import { useQuery } from "react-query";
import {
 useMutation,
 // useQueryClient
} from "react-query";
import apiClient from "./apiClient";
import { BookingPayload, BookingResponse } from "../types/types";

// export const useBookings = () => {
//  return useQuery<BookingResponse[]>(
//   "bookings",
//   async () => {
//    const response = await apiClient.get<BookingResponse[]>("/bookings");
//    return response.data;
//   },
//   {
//    staleTime: 1000 * 60 * 5,
//    cacheTime: 1000 * 60 * 10,
//   },
//  );
// };

export const useCreateBooking = (settledFn: () => void) => {
 // const queryClient = useQueryClient();

 return useMutation<BookingResponse, unknown, BookingPayload>(
  async bookingPayload => {
   const response = await apiClient.post<BookingResponse>("/bookings", bookingPayload);
   return response.data;
  },
  {
   onSettled: () => {
    settledFn();
   },
  },
 );
};
