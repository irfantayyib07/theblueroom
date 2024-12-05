// src/hooks/useOrders.ts
import { useQuery, useMutation, useQueryClient } from "react-query";
import { wooApiClient } from "./apiClient";
import { WooOrder, WooOrderPayload, WooOrderResponse } from "@/types/types";

// Fetch Orders
export const useOrders = (params = {}) => {
 return useQuery<WooOrder[]>(
  ["woocommerce-orders", params],
  async () => {
   const response = await wooApiClient.get("orders", params);
   return response.data;
  },
  {
   staleTime: 1000 * 60 * 5, // 5 minutes
   cacheTime: 1000 * 60 * 10, // 10 minutes
  },
 );
};

// Fetch Single Order
export const useOrder = (orderId?: number) => {
 return useQuery<WooOrder>(
  ["woocommerce-order", orderId],
  async () => {
   if (!orderId) throw new Error("Order ID is required");
   const response = await wooApiClient.get(`orders/${orderId}`);
   return response.data;
  },
  {
   enabled: !!orderId,
  },
 );
};

// Create Order
export const useCreateOrder = () => {
 const queryClient = useQueryClient();

 return useMutation<WooOrderResponse, unknown, WooOrderPayload>(
  async orderPayload => {
   const response = await wooApiClient.post("orders", orderPayload);
   return response.data;
  },
  {
   onSuccess: (data: WooOrderResponse) => {
    // Invalidate and refetch orders list
    queryClient.invalidateQueries("woocommerce-orders");
    window.location.href = data?.payment_url;
   },
  },
 );
};

// Update Order
export const useUpdateOrder = () => {
 const queryClient = useQueryClient();

 return useMutation<WooOrder, unknown, { id: number; data: Partial<WooOrderPayload> }>(
  async ({ id, data }) => {
   const response = await wooApiClient.put(`orders/${id}`, data);
   return response.data;
  },
  {
   onSuccess: data => {
    // Invalidate specific order and orders list
    queryClient.invalidateQueries(["woocommerce-order", data.id]);
    queryClient.invalidateQueries("woocommerce-orders");
   },
  },
 );
};
