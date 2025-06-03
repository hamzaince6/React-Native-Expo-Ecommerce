export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  category: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Cloud Storage',
    description: 'High-performance cloud storage solution with unlimited bandwidth',
    price: 99.99,
    discountPrice: 79.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.8,
    reviewCount: 245,
    category: 'storage',
    inStock: true,
  },
  {
    id: '2',
    name: 'Cloud Server Pro',
    description: 'Enterprise-grade cloud server with dedicated resources',
    price: 199.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.9,
    reviewCount: 189,
    category: 'servers',
    inStock: true,
  },
  {
    id: '3',
    name: 'Database Cluster',
    description: 'Scalable database solution with automatic backups',
    price: 149.99,
    discountPrice: 129.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.7,
    reviewCount: 156,
    category: 'databases',
    inStock: true,
  },
  {
    id: '4',
    name: 'AI Computing Platform',
    description: 'Advanced AI computing resources with GPU acceleration',
    price: 299.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.9,
    reviewCount: 78,
    category: 'ai',
    inStock: false,
  },
  {
    id: '5',
    name: 'Content Delivery Network',
    description: 'Global CDN with edge locations for fast content delivery',
    price: 79.99,
    discountPrice: 59.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.6,
    reviewCount: 210,
    category: 'networking',
    inStock: true,
  },
  {
    id: '6',
    name: 'Kubernetes Cluster',
    description: 'Managed Kubernetes service for container orchestration',
    price: 249.99,
    imageUrl: 'https://placehold.co/300',
    rating: 4.8,
    reviewCount: 92,
    category: 'containers',
    inStock: true,
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Storage',
    imageUrl: 'https://placehold.co/100',
  },
  {
    id: '2',
    name: 'Servers',
    imageUrl: 'https://placehold.co/100',
  },
  {
    id: '3',
    name: 'Databases',
    imageUrl: 'https://placehold.co/100',
  },
  {
    id: '4',
    name: 'AI & ML',
    imageUrl: 'https://placehold.co/100',
  },
  {
    id: '5',
    name: 'Networking',
    imageUrl: 'https://placehold.co/100',
  },
  {
    id: '6',
    name: 'Containers',
    imageUrl: 'https://placehold.co/100',
  },
]; 