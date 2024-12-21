import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ShopFormData } from '../types';
import axiosInstance from '../config/axios.ts';

interface ShopContextType {
  shops: ShopFormData[];
  loading: boolean;
  error: string | null;
  getShopById: (id: string) => ShopFormData | undefined;
  createShop: (data: ShopFormData) => Promise<ShopFormData>;
  updateShop: (id: string, data: ShopFormData) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  getShopBySlug: (name: string) => ShopFormData | undefined;
  fetchShops: (slug: string) => Promise<ShopFormData | null>;
}

const defaultContextValue: ShopContextType = {
  shops: [],
  loading: false,
  error: null,
  getShopById: () => undefined,
  createShop: async () => { throw new Error('Not implemented'); },
  updateShop: async () => {},
  deleteShop: async () => {},
  getShopBySlug: () => undefined,
  fetchShops: async () => null,
};

const ShopContext = createContext<ShopContextType>(defaultContextValue);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [shops, setShops] = useState<ShopFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = async (slug?: string): Promise<ShopFormData[] | ShopFormData | null> => {
    try {
      if (!slug && shops.length > 0) {
        return shops;
      }

      const endpoint = slug ? `/shops/${slug}` : '/shops';
      const response = await axiosInstance.get(endpoint);

      if (slug) {
        return response.data as ShopFormData;
      } else {
        setShops(response.data as ShopFormData[]);
        return response.data as ShopFormData[];
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const getShopById = (id: string): ShopFormData | undefined => {
    return shops.find(shop => shop._id === id);
  };

  const createShop = async (shopData: ShopFormData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/shops', shopData);
      const createdShop = response.data;
      setShops((prevShops) => [...prevShops, createdShop]);
      return createdShop;
    } catch (err) {
      const error = err as Error;
      console.error('Error creating shop:', error);
      setError(error.message || 'Failed to create shop');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateShop = async (id: string, shopData: ShopFormData) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/shops/id/${id}`, shopData);
      setShops((prevShops) =>
        prevShops.map((shop) => (shop._id === id ? { ...shop, ...shopData } : shop))
      );
    } catch (err) {
      const error = err as Error;
      console.error('Error updating shop:', error);
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
      setShops((prevShops) => prevShops.filter((shop) => shop._id !== id));
    } catch (err) {
      const error = err as Error;
      console.error('Error deleting shop:', error);
      setError(error.message || 'Failed to delete shop');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getShopBySlug = (name: string): ShopFormData | undefined => {
    const normalizedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  
    return shops.find(shop => shop.slug === normalizedSlug);
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
