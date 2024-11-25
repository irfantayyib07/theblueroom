// https://tbr.otbbookings.co.za/wp-json/timetics/v1/bookings?stopToast=true

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
//    const response = await apiClient.get<BookingResponse[]>("/bookings?stopToast=true");
//    return response.data;
//   },
//   {
//    staleTime: 1000 * 60 * 5,
//    cacheTime: 1000 * 60 * 10,
//   },
//  );
// };

export const useCreateBooking = () => {
 // const queryClient = useQueryClient();

 return useMutation<BookingResponse, unknown, BookingPayload>(
  async bookingPayload => {
   const response = await apiClient.post<BookingResponse>("/bookings?stopToast=true", bookingPayload);
   return response.data;
  },
  // {
  //  onSuccess: () => {
  //   queryClient.invalidateQueries("bookings");
  //  },
  // },
 );
};
