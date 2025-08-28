import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import MasonryGrid from '../components/Layout/MasonryGrid';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Products: React.FC = () => {
  const { 
    getFilteredArtworks,
    toggleArtworkModal, 
    toggleLike, 
    addToCart, 
    toggleFavorite, 
    favorites,
    searchQuery,
    setSearchQuery,
    toggleAuthModal
  } = useApp();
  const { user } = useAuth();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Digital Art', 'Cyberpunk', 'Abstract', 'Portrait', 'Landscape', 'NFT'];

  const filteredAndSortedArtworks = useMemo(() => {
    // Start with globally filtered artworks (includes search)
    let filtered = getFilteredArtworks().filter(artwork => {
      const matchesCategory = !selectedCategory || artwork.category === selectedCategory;
      const matchesPrice = artwork.price >= priceRange[0] && artwork.price <= priceRange[1];
      
      return matchesCategory && matchesPrice;
    });

    // Sort artworks
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [getFilteredArtworks, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (artwork: any) => {
    if (!user) {
      toggleAuthModal('login');
      return;
    }
    addToCart(artwork);
    alert('Added to cart!');
  };

  const handleToggleFavorite = (artwork: any) => {
    if (!user) {
      toggleAuthModal('login');
      return;
    }
    toggleFavorite(artwork);
  };

  const handleToggleLike = (artworkId: string) => {
    if (!user) {
      toggleAuthModal('login');
      return;
    }
    toggleLike(artworkId);
  };

  return (
    <div className="min-h-screen bg-dark-100 py-4 sm:py-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Digital Art Collection'}
          </h1>
          <p className="text-dark-600 text-sm sm:text-lg">
            {searchQuery 
              ? `Found ${filteredAndSortedArtworks.length} matching artworks`
              : `Discover ${filteredAndSortedArtworks.length} unique digital artworks from talented creators`
            }
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search artworks, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-dark-200 border border-dark-300 rounded-lg text-dark-700 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Filter Toggle and Sort */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-dark-200 border border-dark-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-dark-700 hover:bg-dark-300 transition-colors text-sm sm:text-base"
              >
                <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-dark-200 border border-dark-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-dark-200 rounded-lg p-4 sm:p-6 border border-dark-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-dark-800 font-semibold mb-3 text-sm sm:text-base">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-dark-700 text-sm sm:text-base">All Categories</span>
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-dark-700 text-sm sm:text-base">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-dark-800 font-semibold mb-3 text-sm sm:text-base">Price Range (₦)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-2 sm:px-3 py-1 sm:py-2 bg-dark-300 border border-dark-400 rounded text-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                      <span className="text-dark-600 text-sm">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                        className="w-full px-2 sm:px-3 py-1 sm:py-2 bg-dark-300 border border-dark-400 rounded text-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-dark-600">
                      Showing: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="text-dark-800 font-semibold mb-3 text-sm sm:text-base">Quick Filters</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPriceRange([0, 20000])}
                      className="block w-full text-left px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-dark-700 hover:bg-dark-300 rounded"
                    >
                      Under ₦20,000
                    </button>
                    <button
                      onClick={() => setPriceRange([20000, 50000])}
                      className="block w-full text-left px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-dark-700 hover:bg-dark-300 rounded"
                    >
                      ₦20,000 - ₦50,000
                    </button>
                    <button
                      onClick={() => setPriceRange([50000, 100000])}
                      className="block w-full text-left px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-dark-700 hover:bg-dark-300 rounded"
                    >
                      Above ₦50,000
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <p className="text-dark-600 text-sm sm:text-base">
            Showing {filteredAndSortedArtworks.length} artworks
            {searchQuery && (
              <span> for "{searchQuery}"</span>
            )}
            {selectedCategory && (
              <span> in {selectedCategory}</span>
            )}
          </p>
        </motion.div>

        {/* Artworks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredAndSortedArtworks.length > 0 ? (
            <MasonryGrid
              artworks={filteredAndSortedArtworks}
              onArtworkClick={toggleArtworkModal}
              onToggleLike={handleToggleLike}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          ) : (
            <div className="text-center py-12 sm:py-20">
              <div className="text-4xl sm:text-6xl mb-4">🎨</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">No artworks found</h3>
              <p className="text-dark-600 mb-4 sm:mb-6 text-sm sm:text-base">
                {searchQuery 
                  ? `No artworks match "${searchQuery}". Try different keywords or adjust filters.`
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setPriceRange([0, 100000]);
                }}
                className="bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Load More Button */}
        {filteredAndSortedArtworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 sm:mt-12"
          >
            <button className="bg-dark-200 border border-dark-300 text-dark-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-dark-300 transition-colors text-sm sm:text-base">
              Load More Artworks
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;