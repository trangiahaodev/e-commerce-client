import axiosClient from "../../../utils/axiosClient";
import type { Product } from "../types/Product";

// Spring Boot Page response interface
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const productApi = {
  getTrending: () => axiosClient.get<Product[]>("/products/trending"),
  getSeasonal: () => axiosClient.get<Product[]>("/products/seasonal"),
  getRecommended: () => axiosClient.get<Product[]>("/products/recommended"),
  getTopRated: () => axiosClient.get<Product[]>("/products/top-rated"),

  searchProducts: (params: Record<string, any>) =>
    axiosClient.get<PaginatedResponse<Product>>("/products/search", { params }),
};
