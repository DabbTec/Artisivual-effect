import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Star, Eye, Heart, Share2, MessageCircle, User, Camera, Settings, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import MasonryGrid from '../components/Layout/MasonryGrid';

const SellerProfile: React.FC = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const { artworks, toggleArtworkModal, toggleLike, addToCart, toggleFavorite, favorites, toggleAuthModal } = useApp();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('about');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find seller's artworks
  const sellerArtworks = artworks.filter(artwork => artwork.sellerId === sellerId);
  const seller = sellerArtworks[0]; // Get seller info from first artwork

  if (!seller) {
    return (
      <div className="min-h-screen bg-dark-100 py-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <User className="w-16 h-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Seller not found</h2>
            <p className="text-dark-600 mb-6">The seller you're looking for doesn't exist or has no artworks.</p>
            <Link
              to="/products"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse All Artworks
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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

  const totalViews = sellerArtworks.reduce((sum, artwork) => sum + artwork.views, 0);
  const totalLikes = sellerArtworks.reduce((sum, artwork) => sum + artwork.likes, 0);
  const averageRating = 4.8; // Mock rating

  const tabs = [
    { id: 'about', name: 'About', count: null },
    { id: 'artworks', name: 'Artworks', count: sellerArtworks.length },
    { id: 'reviews', name: 'Reviews', count: 24 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            {/* Bio Section */}
            <div className="bg-dark-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Bio</h3>
              <p className="text-dark-600 leading-relaxed mb-4">
                {seller.sellerName} is a passionate digital artist specializing in contemporary digital art. 
                With a unique vision and innovative approach, they create captivating visual experiences that 
                blend traditional artistic principles with cutting-edge digital techniques.
              </p>
              <p className="text-dark-600 leading-relaxed">
                Their work has been featured in various online galleries and has gained recognition from 
                art collectors worldwide. Always pushing creative boundaries and exploring new artistic territories.
              </p>
            </div>

            {/* Details Section */}
            <div className="bg-dark-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">Lives in Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">Joined March 2024</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">4.8 star rating</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">{totalViews.toLocaleString()} total views</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">{totalLikes} total likes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary-400" />
                    <span className="text-dark-600">Digital Artist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties Section */}
            <div className="bg-dark-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Specialties & Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Digital Illustrations', 'Abstract Art', 'Concept Design', 'Digital Paintings', 'Character Design', 'Environment Art', 'UI/UX Design', 'Brand Identity'].map((skill, index) => (
                  <div key={index} className="bg-dark-300 px-3 py-2 rounded-lg text-center">
                    <span className="text-dark-700 text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-dark-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Uploaded new artwork', item: '"Digital Dreams"', time: '2 days ago' },
                  { action: 'Received 5-star review from', item: 'Art Collector', time: '1 week ago' },
                  { action: 'Sold artwork', item: '"Neon Nights"', time: '2 weeks ago' },
                  { action: 'Joined Artivisual', item: 'community', time: '1 month ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-dark-300/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                    <span className="text-dark-600 flex-1">
                      {activity.action} <span className="text-white font-medium">{activity.item}</span>
                    </span>
                    <span className="text-dark-500 text-sm">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'artworks':
        return (
          <div>
            {sellerArtworks.length > 0 ? (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">All Artworks ({sellerArtworks.length})</h3>
                  <div className="text-sm text-dark-600">
                    Total earnings: ₦{(sellerArtworks.reduce((sum, art) => sum + art.price, 0)).toLocaleString()}
                  </div>
                </div>
                <MasonryGrid
                  artworks={sellerArtworks}
                  onArtworkClick={toggleArtworkModal}
                  onToggleLike={handleToggleLike}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  favorites={favorites}
                />
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-2">No artworks yet</h3>
                <p className="text-dark-600">This artist hasn't uploaded any artworks yet.</p>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="bg-dark-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-dark-500'}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{averageRating}</span>
                  <span className="text-dark-600">(24 reviews)</span>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm text-dark-600 w-8">{rating} ★</span>
                    <div className="flex-1 bg-dark-300 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: rating === 5 ? '80%' : rating === 4 ? '15%' : '5%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-dark-600 w-8">{rating === 5 ? '19' : rating === 4 ? '4' : '1'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {[
                { name: 'Art Collector', rating: 5, comment: 'Amazing artwork! The quality is outstanding and the creativity is inspiring. The attention to detail is remarkable and the final piece exceeded my expectations.', date: '2024-03-15', verified: true },
                { name: 'Digital Enthusiast', rating: 5, comment: 'Love the unique style and attention to detail. Highly recommended! Fast delivery and excellent communication throughout the process.', date: '2024-03-12', verified: true },
                { name: 'Creative Studio', rating: 4, comment: 'Great work and professional service. Will definitely purchase again. The artwork fits perfectly with our brand aesthetic.', date: '2024-03-10', verified: false },
                { name: 'Gallery Owner', rating: 5, comment: 'Exceptional talent and professionalism. The artwork has received numerous compliments from our visitors.', date: '2024-03-08', verified: true },
              ].map((review, index) => (
                <div key={index} className="bg-dark-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{review.name}</h4>
                          {review.verified && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Verified</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-dark-500'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-dark-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-dark-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-100">
      {/* Cover Photo Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Link
            to="/products"
            className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          <button className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 pb-20 md:pb-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 rounded-xl p-6 mb-6 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center border-4 border-dark-200 shadow-xl">
                <span className="text-white text-4xl md:text-5xl font-bold">
                  {seller.sellerName.charAt(0)}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 bg-dark-300 p-2 rounded-full hover:bg-dark-400 transition-colors">
                <Camera className="w-4 h-4 text-dark-700" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{seller.sellerName}</h1>
              <p className="text-lg text-dark-600 mb-3">Digital Artist & Creative Professional</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-dark-600 mb-4">
                <span>{sellerArtworks.length} artworks</span>
                <span>•</span>
                <span>{totalViews.toLocaleString()} views</span>
                <span>•</span>
                <span>{totalLikes} likes</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{averageRating} rating</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
                <button className="flex items-center space-x-2 bg-dark-300 text-dark-700 px-6 py-2 rounded-lg hover:bg-dark-400 transition-colors font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Follow</span>
                </button>
                <button className="flex items-center space-x-2 bg-dark-300 text-dark-700 px-4 py-2 rounded-lg hover:bg-dark-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="bg-dark-300 text-dark-700 p-2 rounded-lg hover:bg-dark-400 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-dark-200 rounded-xl p-1">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-dark-600 hover:text-white hover:bg-dark-300'
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.count !== null && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id ? 'bg-white/20' : 'bg-dark-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default SellerProfile;