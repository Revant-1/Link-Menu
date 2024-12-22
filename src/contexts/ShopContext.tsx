import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ShopFormData } from '../types';
import axiosInstance from '../config/axios';

interface ShopContextType {
  shops: ShopFormData[];
  loading: boolean;
  error: string | null;
  getShopById: (id: string) => ShopFormData | undefined;
  createShop: (data: ShopFormData) => Promise<ShopFormData>;
  updateShop: (id: string, data: ShopFormData) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  getShopBySlug: (slug: string) => ShopFormData | undefined;
  fetchShops: () => Promise<void>;
  fetchShopBySlug: (slug: string) => Promise<ShopFormData | null>;
}

const defaultContextValue: ShopContextType = {
  shops: [],
  loading: false,
  error: null,
  getShopById: () => undefined,
  createShop: async () => { throw new Error('Not implemented'); },
  updateShop: async () => { },
  deleteShop: async () => { },
  getShopBySlug: () => undefined,
  fetchShops: async () => { },
  fetchShopBySlug: async () => null,
};

const ShopContext = createContext<ShopContextType>(defaultContextValue);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<ShopFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/shops');
      setShops(response.data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch shops');
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShopBySlug = async (slug: string): Promise<ShopFormData | null> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/shops/${slug}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch shop');
      console.error('Error fetching shop by slug:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const getShopById = (id: string): ShopFormData | undefined => {
    return shops.find(shop => shop._id === id);
  };

  const createShop = async (shopData: ShopFormData): Promise<ShopFormData> => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/shops', shopData);
      const createdShop = response.data;
      setShops(prevShops => [...prevShops, createdShop]);
      return createdShop;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to create shop');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateShop = async (id: string, shopData: ShopFormData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/shops/id/${id}`, shopData);
      setShops(prevShops =>
        prevShops.map(shop => (shop._id === id ? { ...shop, ...response.data } : shop))
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update shop');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteShop = async (id: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/shops/id/${id}`);
      setShops(prevShops => prevShops.filter(shop => shop._id !== id));
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to delete shop');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getShopBySlug = (slug: string): ShopFormData | undefined => {
    return shops.find(shop => shop.slug === slug);
  };

  const value = {
    shops,
    loading,
    error,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    getShopBySlug,
    fetchShops,
    fetchShopBySlug,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
