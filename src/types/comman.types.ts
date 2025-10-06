export interface ISelectOptions {
  label: string;
  value: string
}

export interface ISubject {
  _id: string;
  title: string;
  description?: string;
}

export interface IModelOpen {
  isOpen: boolean;
  id: string;
}

export interface IOpenModel<T> {
  type: T;
  toggle: boolean;
  id: string;
}

export type ActionMenuItem = {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

// types.ts
import type { ReactNode } from "react";

export interface ITableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode; // custom cell renderer
}

export interface ITableAction<T> {
  icon: ReactNode;
  onClick: (row: T) => void;
  tooltip?: string;
}

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  data: T[];
  actions?: ITableAction<T>[];
}


export type CurrencyNames = "INR" | "USD";


export type ModelType = "ADD" | "EDIT" | "DELETE" | "ASSIGN_SUBJECT" | "STUDENTENROLLFROMBATCH" | "STUDENTENROLL" | null;

export type EnrollmentStatus = "PaymentPending" | "PaymentFailed" | "NotStarted" | "Active" | "Completed" | "Cancelled" | "Expired" | "Refunded";

export type EnrollmentPaymentStatus = "PENDING" | "FAILED" | "USER_DROPPED" | "Partial" | "FullPaid" | "Cancelled" | "Refunded";

export interface IFee {
    amount: number;
    currency: string;
    paid: number;
    status: EnrollmentPaymentStatus
}