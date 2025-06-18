import { useState, useEffect } from 'react';
import api from './api';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export interface SpecialDealsResponse {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const fetchSpecialDeals = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products?limit=20&offset=1');
    return response.data;
  } catch (error) {
    console.error('Error fetching special deals:', error);
    throw error;
  }
};

export const useSpecialDeals = (): SpecialDealsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpecialDeals = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSpecialDeals();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch special deals');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getSpecialDeals();
  }, []);

  return { products, isLoading, error };
}; 