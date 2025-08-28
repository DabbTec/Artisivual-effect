import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Eye, Download, User, Flag, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const ArtworkModal: React.FC = () => {
  const { isArtworkModalOpen, selectedArtwork, toggleArtworkModal, toggleFavorite, addToCart, toggleLike, favorites } = useApp();
  const { user } = useAuth();

  if (!selectedArtwork) return null;

  const isFavorite = favorites.some(fav => fav.id === selectedArtwork.id);

  const handleAddToCart = () => {
    addToCart(selectedArtwork);
    // Show toast notification (could be implemented with a toast library)
    alert('Added to cart!');
  };

  const handleContactSeller = () => {
    // Implement contact seller functionality
    alert('Contact seller feature would be implemented here');
  };

  const handleReportArtwork = () => {
    // Implement report functionality
    alert('Report artwork feature would be implemented here');
  };

  return (
    <AnimatePresence>
      {isArtworkModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
          onClick={() => toggleArtworkModal()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-200 rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
              {/* Image Section */}
              <div className="lg:w-2/3 relative bg-dark-300 min-h-[300px] lg:min-h-0">
                <button
                  onClick={() => toggleArtworkModal()}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <div className="relative h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center p-4">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  {selectedArtwork.watermarked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-white/20 text-4xl sm:text-6xl font-bold transform rotate-45">
                        ARTIVISUAL
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/3 p-4 sm:p-6 overflow-y-auto max-h-[50vh] lg:max-h-full">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-dark-800 mb-2">
                      {selectedArtwork.title}
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-primary-400 mb-4">
                      ₦{selectedArtwork.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between p-3 bg-dark-300 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-800 text-sm sm:text-base">{selectedArtwork.sellerName}</p>
                        <p className="text-xs sm:text-sm text-dark-600">Digital Artist</p>
                      </div>
                    </div>
                    <Link
                      to={`/seller/${selectedArtwork.sellerId}`}
                      onClick={() => toggleArtworkModal()}
                      className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 transition-colors text-sm"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-dark-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedArtwork.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedArtwork.likes}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-dark-800 mb-2 text-sm sm:text-base">Description</h3>
                    <p className="text-dark-600 text-sm leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <span className="inline-block bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm">
                      {selectedArtwork.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {user && (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleLike(selectedArtwork.id)}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 sm:px-4 rounded-lg border transition-colors text-sm ${
                            selectedArtwork.isLiked
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-dark-400 text-dark-600 hover:border-red-500 hover:text-red-500'
                          }`}
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${selectedArtwork.isLiked ? 'fill-current' : ''}`} />
                          <span>Like</span>
                        </button>
                        
                        <button
                          onClick={() => toggleFavorite(selectedArtwork)}
                          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 sm:px-4 rounded-lg border transition-colors text-sm ${
                            isFavorite
                              ? 'bg-accent-500 border-accent-500 text-white'
                              : 'border-dark-400 text-dark-600 hover:border-accent-500 hover:text-accent-500'
                          }`}
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? 'fill-current' : ''}`} />
                          <span>Save</span>
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>

                      <div className="flex space-x-2">
                        <button
                          onClick={handleContactSeller}
                          className="flex-1 bg-dark-300 text-dark-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-dark-400 transition-colors text-sm"
                        >
                          Contact Seller
                        </button>
                        <button
                          onClick={handleReportArtwork}
                          className="px-3 sm:px-4 py-2 bg-dark-300 text-dark-600 rounded-lg hover:bg-dark-400 transition-colors"
                        >
                          <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* Download restriction notice */}
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <div className="flex items-center space-x-2 text-amber-400 text-xs sm:text-sm">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>High-resolution download available after purchase</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!user && (
                    <div className="p-4 bg-primary-600/10 border border-primary-600/20 rounded-lg text-center">
                      <p className="text-primary-400 text-sm mb-2">
                        Sign in to purchase, like, and save artworks
                      </p>
                      <button className="text-primary-400 font-medium hover:text-primary-300">
                        Sign In Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkModal;