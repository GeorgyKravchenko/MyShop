import { IProduct } from "./product";

export type IStatus = "pending" | "completed" | "cancelled";
export interface IOrder {
    id:          string;
    products:    IProduct[];
    status:      IStatus;
}
