import { useState, useEffect } from 'react';
import { CategoryService } from '@/services';
import { Category } from '@/types/category';

export const useCategories = (limit: number = 5) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getAllCategories();
        // İlk 'limit' kadar kategoriyi al
        setCategories(data.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Kategoriler yüklenirken hata:', err);
        setError('Kategoriler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [limit]);

  return { categories, loading, error };
};

export default useCategories; 