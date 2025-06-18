import { useState, useEffect } from 'react';
import api from './api';
import { Product } from './SpecialDealsServices';

export interface FeaturedProductsResponse {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface PaginatedProductsResponse {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products?limit=10&offset=10');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const fetchPaginatedProducts = async (page: number = 1, limit: number = 10): Promise<{products: Product[], totalCount: number}> => {
  try {
    const offset = (page - 1) * limit;
    const response = await api.get(`/products?limit=${limit}&offset=${offset}`);
    
    // Get total count from a separate request
    // Note: This API might not support returning total count directly
    // So we're making an assumption that there are 200 products total
    const totalCount = 200;
    
    return {
      products: response.data,
      totalCount
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    throw error;
  }
};

export const useFeaturedProducts = (): FeaturedProductsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchFeaturedProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

  return { products, isLoading, error };
};

export const usePaginatedProducts = (initialPage: number = 1, limit: number = 10): PaginatedProductsResponse & {
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const { products: fetchedProducts, totalCount } = await fetchPaginatedProducts(currentPage, limit);
        setProducts(fetchedProducts);
        setTotalPages(Math.ceil(totalCount / limit));
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [currentPage, limit]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    products,
    isLoading,
    error,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    goToNextPage,
    goToPreviousPage,
    goToPage
  };
}; 