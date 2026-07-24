import type { Category } from "./Category";
import type { ProductVariant } from "./ProductVariant";

export interface Product {
  productId: string;
  productCode: string;
  productName: string;
  description: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
  category?: Category;
  variants?: ProductVariant[];
  isActive: boolean;
}
