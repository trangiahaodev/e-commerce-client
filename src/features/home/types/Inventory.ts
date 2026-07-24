import type { ProductVariant } from "./ProductVariant";

export interface Inventory {
  inventoryId: string;
  availableQuantity: number;
  reservedQuantity: number;
  productVariant?: ProductVariant;
}
