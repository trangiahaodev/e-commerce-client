export interface Category {
  categoryId: string;
  categoryCode: string;
  categoryName: string;
  slug: string;
  isActive: boolean;
  parentCategory?: Category; // Recursive relationship
  subCategories?: Category[];
}
