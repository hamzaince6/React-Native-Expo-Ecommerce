import { useState, useEffect } from 'react';
import api from './api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const fetchUserProfile = async (userId: number = 1): Promise<User> => {
  try {
    // We can fetch a specific user or use the users endpoint with limit=1 to get the first user
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const useUserProfile = (userId: number = 1): ProfileResponse => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserProfile(userId);
        setUser(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  return { user, isLoading, error };
}; 