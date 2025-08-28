import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Users, Shield, TrendingUp } from 'lucide-react';
import MasonryGrid from '../components/Layout/MasonryGrid';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { getFilteredArtworks, toggleArtworkModal, toggleLike, addToCart, toggleFavorite, favorites, toggleAuthModal, searchQuery } = useApp();
  const { user } = useAuth();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get filtered artworks based on search query, show only first 6 for home page
  const filteredArtworks = getFilteredArtworks();
  const featuredArtworks = searchQuery ? filteredArtworks.slice(0, 12) : filteredArtworks.slice(0, 6);

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
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section - Hide when searching */}
      {!searchQuery && (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-accent-900/20"></div>
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Digital Art Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Discover Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
                Artistry
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-dark-600 mb-8 max-w-2xl mx-auto"
            >
              Where creativity meets commerce. Showcase, promote, and sell your digital masterpieces to a global audience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/products"
                className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 group"
              >
                <span className="text-lg font-semibold">Explore Artworks</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => toggleAuthModal('register')}
                className="border-2 border-accent-400 text-accent-400 px-8 py-4 rounded-xl hover:bg-accent-400 hover:text-white transition-colors text-lg font-semibold"
              >
                Start Selling
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search Results Header */}
      {searchQuery && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-dark-600">
                Found {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section - Hide when searching */}
      {!searchQuery && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose Artivisual?</h2>
              <p className="text-xl text-dark-600 max-w-2xl mx-auto">
                Join thousands of artists and collectors in the premier digital art marketplace
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Palette,
                  title: 'For Artists',
                  description: 'Showcase your digital creations with automatic watermarking and analytics'
                },
                {
                  icon: Users,
                  title: 'Global Community',
                  description: 'Connect with artists and collectors from around the world'
                },
                {
                  icon: Shield,
                  title: 'Secure Transactions',
                  description: 'Protected payments and authentic artwork verification'
                },
                {
                  icon: TrendingUp,
                  title: 'Growing Market',
                  description: 'Be part of the rapidly expanding digital art economy'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-dark-200 p-6 rounded-xl text-center hover:bg-dark-300 transition-colors"
                >
                  <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-dark-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Artworks / Search Results */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Featured Artworks</h2>
              <p className="text-xl text-dark-600">Discover amazing digital art from talented creators</p>
            </motion.div>
          )}

          {featuredArtworks.length > 0 ? (
            <MasonryGrid
              artworks={featuredArtworks}
              onArtworkClick={toggleArtworkModal}
              onToggleLike={handleToggleLike}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          ) : searchQuery ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-dark-600 mb-6">
                Try searching with different keywords or browse all artworks
              </p>
              <Link
                to="/products"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse All Artworks
              </Link>
            </div>
          ) : null}

          {!searchQuery && featuredArtworks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-colors group"
              >
                <span className="text-lg font-semibold">View All Artworks</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}

          {searchQuery && featuredArtworks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-colors group"
              >
                <span className="text-lg font-semibold">View All Results in Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section - Hide when searching */}
      {!searchQuery && (
        <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join our community of digital artists and art enthusiasts today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => toggleAuthModal('register')}
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-lg font-semibold"
                >
                  Sign Up as Artist
                </button>
                <button
                  onClick={() => toggleAuthModal('register')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors text-lg font-semibold"
                >
                  Sign Up as Collector
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;