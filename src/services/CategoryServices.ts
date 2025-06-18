import api from './api';
import { CategoryResponse, Category } from '@/types/category';

export class CategoryService {
  // Tüm kategorileri getir
  static async getAllCategories(): Promise<Category[]> {
    try {
      const response = await api.get<CategoryResponse[]>('/categories');
      
      // API yanıtını uygulama içinde kullanılacak formata dönüştür
      return response.data.map(category => {
        // Bazı görsel URL'leri tam URL değil, bunları düzeltiyoruz
        let imageUrl = category.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
          // Eğer tam URL değilse, placeholder görsel kullanıyoruz
          imageUrl = 'https://via.placeholder.com/150';
        }
        
        return {
          id: category.id.toString(),
          name: category.name,
          imageUrl: imageUrl
        };
      });
    } catch (error) {
      console.error('Kategoriler alınırken hata oluştu:', error);
      throw error;
    }
  }

  // Tekil kategori getir (ihtiyaç olursa)
  static async getCategoryById(id: string): Promise<Category | null> {
    try {
      const response = await api.get<CategoryResponse>(`/categories/${id}`);
      
      // Görsel URL'ini düzeltiyoruz
      let imageUrl = response.data.image;
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = 'https://via.placeholder.com/150';
      }
      
      return {
        id: response.data.id.toString(),
        name: response.data.name,
        imageUrl: imageUrl
      };
    } catch (error) {
      console.error(`ID: ${id} olan kategori alınırken hata oluştu:`, error);
      throw error;
    }
  }
}

export default CategoryService; 