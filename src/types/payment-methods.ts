type PaymentMethod = {
 name: string; // Payment method name (e.g., "Stripe")
 status: boolean; // Whether the payment method is enabled
};

export type PaymentMethodsResponse = {
 success: number; // 1 for success
 status_code: number;
 data: PaymentMethod[];
};
