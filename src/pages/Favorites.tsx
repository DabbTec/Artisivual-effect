import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import MasonryGrid from '../components/Layout/MasonryGrid';

const Favorites: React.FC = () => {
  const { 
    favorites, 
    toggleArtworkModal, 
    toggleLike, 
    addToCart, 
    toggleFavorite, 
    toggleAuthModal 
  } = useApp();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-100 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <Heart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Sign in to view your favorites</h2>
            <p className="text-dark-600 mb-6">Save artworks you love and access them anytime</p>
            <button
              onClick={() => toggleAuthModal('login')}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const categories = [...new Set(favorites.map(artwork => artwork.category))];
  
  const filteredFavorites = favorites.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || artwork.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (artwork: any) => {
    addToCart(artwork);
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-dark-100 py-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Link
              to="/products"
              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Products</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
          </div>
          <p className="text-dark-600">
            {favorites.length} {favorites.length === 1 ? 'artwork' : 'artworks'} saved
          </p>
        </motion.div>

        {favorites.length > 0 && (
          <>
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search your favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-300 rounded-lg text-dark-700 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-dark-200 border border-dark-300 px-4 py-2 rounded-lg text-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Results Count */}
              <div className="mt-4">
                <p className="text-dark-600 text-sm">
                  Showing {filteredFavorites.length} of {favorites.length} favorites
                  {searchQuery && <span> for "{searchQuery}"</span>}
                  {selectedCategory && <span> in {selectedCategory}</span>}
                </p>
              </div>
            </motion.div>

            {/* Favorites Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {filteredFavorites.length > 0 ? (
                <MasonryGrid
                  artworks={filteredFavorites}
                  onArtworkClick={toggleArtworkModal}
                  onToggleLike={toggleLike}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No favorites found</h3>
                  <p className="text-dark-600 mb-6">
                    {searchQuery || selectedCategory 
                      ? 'Try adjusting your search or filter criteria'
                      : 'No artworks match your current filters'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {favorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
            <p className="text-dark-600 mb-8">
              Start exploring and save artworks you love by clicking the heart icon!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>Discover Artworks</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        )}

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="bg-dark-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    favorites.forEach(artwork => addToCart(artwork));
                    alert(`Added ${favorites.length} items to cart!`);
                  }}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add All to Cart
                </button>
                <Link
                  to="/products"
                  className="bg-dark-300 text-dark-700 px-6 py-3 rounded-lg hover:bg-dark-400 transition-colors"
                >
                  Discover More
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;