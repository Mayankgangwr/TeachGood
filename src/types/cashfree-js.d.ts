declare module "@cashfreepayments/cashfree-js" {
  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: "_self" | "_blank" | "_modal";
  }

  export interface CheckoutResult {
    error?: string;
  }

  export interface Cashfree {
    checkout(options: CheckoutOptions): Promise<CheckoutResult>;
  }

  export function load(options: { mode: "sandbox" | "production" }): Promise<Cashfree>;
}
