import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { Store, Search, ImageOff } from 'lucide-react';

const ShopCard = ({ shop }: { shop: any }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/${shop.slug}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
    >
      <div className="aspect-w-16 aspect-h-9">
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <ImageOff className="w-8 h-8 text-gray-400" />
          </div>
        ) : (
          <img
            src={shop.imageUrl}
            alt={shop.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {shop.name}
        </h2>
        <p className="text-gray-600 mb-4">{shop.description}</p>
        <div className="flex items-center text-purple-600">
          <Store className="w-4 h-4 mr-2" />
          <span>View Menu</span>
        </div>
      </div>
    </Link>
  );
};

const ShopsSkeleton = () => (
  <>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    ))}
  </>
);

const ShopsPage = () => {
  const { shops, fetchShops, loading, error } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (shops.length === 0) {
      fetchShops().catch(err => {
        console.error('Failed to fetch shops:', err);
      });
    }
  }, [fetchShops, shops.length]);

  const filteredShops = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return shops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchLower) ||
        shop.description.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, shops]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error: {error}</p>
          <button 
            onClick={() => fetchShops()} 
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Discover Restaurants
          </h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <ShopsSkeleton />
          ) : (
            filteredShops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} />
            ))
          )}
        </div>

        {!loading && filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm 
                ? "No restaurants found matching your search."
                : "No restaurants available."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;
