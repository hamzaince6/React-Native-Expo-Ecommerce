import { useState, useEffect } from 'react';
import api from './api';
import { User } from './ProfileScreenServices';

export interface UsersResponse {
  users: User[];
  isLoading: boolean;
  error: string | null;
  totalUsers: number;
}

export interface PaginatedUsersResponse extends UsersResponse {
  currentPage: number;
  totalPages: number;
  loadNextPage: () => Promise<void>;
  loadPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
}

// Fetch all users once to get the total count and cache it
let cachedTotalUsers = 0;
let isTotalUsersFetched = false;
let cachedAllUsers: User[] = [];

const fetchTotalUserCount = async (): Promise<number> => {
  if (isTotalUsersFetched) {
    return cachedTotalUsers;
  }
  
  try {
    // The API might not support a count endpoint, so we'll fetch all users once
    const response = await api.get('/users');
    cachedAllUsers = response.data;
    cachedTotalUsers = response.data.length;
    isTotalUsersFetched = true;
    return cachedTotalUsers;
  } catch (error) {
    console.error('Error fetching total user count:', error);
    return 0;
  }
};

export const fetchUsers = async (limit: number = 20, offset: number = 0): Promise<{ users: User[], totalUsers: number }> => {
  try {
    // Get the total count and all users first if not already cached
    if (!isTotalUsersFetched) {
      await fetchTotalUserCount();
    }
    
    // Simulate pagination client-side since the API might not support it properly
    const paginatedUsers = cachedAllUsers.slice(offset, offset + limit);
    
    // If we don't have enough users in the cache, try to fetch more from the API
    if (paginatedUsers.length < limit && offset < cachedTotalUsers) {
      try {
        const response = await api.get(`/users?limit=${limit}&offset=${offset}`);
        return { 
          users: response.data,
          totalUsers: cachedTotalUsers
        };
      } catch (e) {
        // If API doesn't support pagination, just return what we have
        return { 
          users: paginatedUsers,
          totalUsers: cachedTotalUsers
        };
      }
    }
    
    return { 
      users: paginatedUsers,
      totalUsers: cachedTotalUsers
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const useUsers = (limit: number = 20): UsersResponse => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUsers(limit);
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [limit]);

  return { users, isLoading, error, totalUsers };
};

export const usePaginatedUsers = (limit: number = 20): PaginatedUsersResponse => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadUsers = async (page: number): Promise<void> => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * limit;
      const data = await fetchUsers(limit, offset);
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setTotalPages(Math.ceil(data.totalUsers / limit));
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [limit]);

  const loadNextPage = async (): Promise<void> => {
    if (currentPage < totalPages) {
      await loadUsers(currentPage + 1);
    }
  };

  const loadPreviousPage = async (): Promise<void> => {
    if (currentPage > 1) {
      await loadUsers(currentPage - 1);
    }
  };

  const goToPage = async (page: number): Promise<void> => {
    if (page >= 1 && page <= totalPages) {
      await loadUsers(page);
    }
  };

  return {
    users,
    isLoading,
    error,
    totalUsers,
    currentPage,
    totalPages,
    loadNextPage,
    loadPreviousPage,
    goToPage
  };
}; 