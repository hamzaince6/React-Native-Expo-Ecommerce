import { Order } from '../types/order';

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

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    date: '2023-10-15',
    status: 'delivered',
    totalAmount: 1250.99,
    items: [
      {
        id: '1',
        productId: '101',
        name: 'Akıllı Telefon X Pro',
        price: 899.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        productId: '102',
        name: 'Kablosuz Kulaklık',
        price: 129.99,
        quantity: 2,
        imageUrl: 'https://via.placeholder.com/100',
      },
      {
        id: '3',
        productId: '103',
        name: 'Telefon Kılıfı',
        price: 29.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/100',
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-045',
    date: '2023-11-22',
    status: 'shipped',
    totalAmount: 459.98,
    items: [
      {
        id: '4',
        productId: '201',
        name: 'Akıllı Saat',
        price: 299.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/100',
      },
      {
        id: '5',
        productId: '202',
        name: 'Şarj Kablosu',
        price: 19.99,
        quantity: 2,
        imageUrl: 'https://via.placeholder.com/100',
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-078',
    date: '2023-12-05',
    status: 'processing',
    totalAmount: 1899.99,
    items: [
      {
        id: '6',
        productId: '301',
        name: 'Dizüstü Bilgisayar',
        price: 1899.99,
        quantity: 1,
        imageUrl: 'https://via.placeholder.com/100',
      }
    ]
  }
]; 