import type { Product } from "./Product";

export interface ProductState {
  products: Product[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
