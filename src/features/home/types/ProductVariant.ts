import type { Product } from "./Product";

export interface ProductVariant {
  productVariantId: string;
  sku: string;
  price: number;
  isActive: boolean;
  attributes: Record<string, any>; // Handles the dynamic JSONB map
  product?: Product;
}
