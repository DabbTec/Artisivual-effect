import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Download, User, Search, Filter, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import MasonryGrid from '../../components/Layout/MasonryGrid';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artworks, favorites, cartItems, toggleArtworkModal, toggleLike, addToCart, toggleFavorite } = useApp();
  const [activeTab, setActiveTab] = useState('browse');

  const tabs = [
    { id: 'browse', name: 'Browse Art', icon: Eye },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'cart', name: 'Cart', icon: ShoppingCart },
    { id: 'purchases', name: 'Purchases', icon: Download },
    { id: 'recommendations', name: 'For You', icon: Star },
  ];

  const stats = [
    { label: 'Artworks Liked', value: artworks.filter(art => art.isLiked).length, icon: Heart, color: 'bg-red-500' },
    { label: 'Favorites', value: favorites.length, icon: Heart, color: 'bg-pink-500' },
    { label: 'Cart Items', value: cartItems.length, icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Total Purchases', value: 12, icon: Download, color: 'bg-green-500' },
  ];

  const mockPurchases = [
    {
      id: '1',
      artwork: artworks[0],
      purchaseDate: '2024-03-15',
      price: 25000,
      downloadUrl: '#'
    },
    {
      id: '2',
      artwork: artworks[1],
      purchaseDate: '2024-03-10',
      price: 35000,
      downloadUrl: '#'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'browse':
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">Discover Amazing Artworks</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search artworks..."
                    className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-300 rounded-lg text-dark-700 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="flex items-center space-x-2 bg-dark-200 border border-dark-300 px-4 py-2 rounded-lg text-dark-700 hover:bg-dark-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
            <MasonryGrid
              artworks={artworks}
              onArtworkClick={toggleArtworkModal}
              onToggleLike={toggleLike}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </div>
        );

      case 'favorites':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Your Favorite Artworks ({favorites.length})</h3>
            {favorites.length > 0 ? (
              <MasonryGrid
                artworks={favorites}
                onArtworkClick={toggleArtworkModal}
                onToggleLike={toggleLike}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            ) : (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No favorites yet</h4>
                <p className="text-dark-600 mb-6">Start exploring and save artworks you love!</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Browse Artworks
                </button>
              </div>
            )}
          </div>
        );

      case 'cart':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Shopping Cart ({cartItems.length} items)</h3>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.artwork.id} className="bg-dark-200 rounded-lg p-4 flex items-center space-x-4">
                    <img
                      src={item.artwork.imageUrl}
                      alt={item.artwork.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.artwork.title}</h4>
                      <p className="text-dark-600">by {item.artwork.sellerName}</p>
                      <p className="text-primary-400 font-bold">₦{item.artwork.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-dark-600">Qty: {item.quantity}</span>
                      <button className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-500/10 rounded">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-dark-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-white">Total:</span>
                    <span className="text-2xl font-bold text-primary-400">
                      ₦{cartItems.reduce((total, item) => total + (item.artwork.price * item.quantity), 0).toLocaleString()}
                    </span>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Your cart is empty</h4>
                <p className="text-dark-600 mb-6">Add some amazing artworks to your cart!</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        );

      case 'purchases':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Purchase History</h3>
            {mockPurchases.length > 0 ? (
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="bg-dark-200 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={purchase.artwork.imageUrl}
                        alt={purchase.artwork.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{purchase.artwork.title}</h4>
                        <p className="text-dark-600">by {purchase.artwork.sellerName}</p>
                        <p className="text-sm text-dark-500">Purchased on {purchase.purchaseDate}</p>
                        <p className="text-primary-400 font-bold">₦{purchase.price.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
                          Download
                        </button>
                        <button className="bg-dark-300 text-dark-700 px-4 py-2 rounded hover:bg-dark-400 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Download className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No purchases yet</h4>
                <p className="text-dark-600 mb-6">Your purchased artworks will appear here</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        );

      case 'recommendations':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Recommended For You</h3>
            <div className="mb-6 p-4 bg-gradient-to-r from-primary-600/20 to-accent-600/20 rounded-lg border border-primary-600/30">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <h4 className="font-semibold text-white">Trending Now</h4>
              </div>
              <p className="text-dark-600 text-sm">Based on your interests and popular artworks</p>
            </div>
            <MasonryGrid
              artworks={artworks.slice(0, 8)}
              onArtworkClick={toggleArtworkModal}
              onToggleLike={toggleLike}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </div>
        );

      default:
        return null;
    }
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
              <p className="text-dark-600">Discover and collect amazing digital artworks</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-dark-600">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-dark-200 p-1 rounded-lg overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-600 hover:text-white hover:bg-dark-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

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

export default BuyerDashboard;