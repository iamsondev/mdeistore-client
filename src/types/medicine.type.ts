export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  viewCount: number;
  manufacturer: string;
  image: string;
  sellerId: string;
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}
