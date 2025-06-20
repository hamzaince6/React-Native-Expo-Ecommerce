import { Order } from '../types/order';
import { mockOrders } from '../utils/mockData';

export const getOrders = async (): Promise<Order[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

export const getOrderById = async (orderId: string): Promise<Order | undefined> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = mockOrders.find(order => order.id === orderId);
      resolve(order);
    }, 500);
  });
}; 