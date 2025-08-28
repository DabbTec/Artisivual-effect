import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, Heart, ShoppingCart, TrendingUp, Plus, Edit, Trash2, DollarSign, Users, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artworks, addArtwork, toggleArtworkModal } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter artworks by current seller
  const myArtworks = artworks.filter(artwork => artwork.sellerId === user?.id);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'artworks', name: 'My Artworks', icon: Eye },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'upload', name: 'Upload New', icon: Upload },
    { id: 'earnings', name: 'Earnings', icon: DollarSign },
  ];

  const stats = [
    { label: 'Total Artworks', value: myArtworks.length, icon: Eye, color: 'bg-blue-600', change: '+2 this week' },
    { label: 'Total Views', value: myArtworks.reduce((sum, art) => sum + art.views, 0), icon: Eye, color: 'bg-green-600', change: '+15% this month' },
    { label: 'Total Likes', value: myArtworks.reduce((sum, art) => sum + art.likes, 0), icon: Heart, color: 'bg-red-600', change: '+8% this month' },
    { label: 'Total Earnings', value: '₦125,000', icon: ShoppingCart, color: 'bg-purple-600', change: '+₦25,000 this month' },
  ];

  const recentActivity = [
    { type: 'like', message: 'New like on "Digital Dreams"', time: '2 hours ago' },
    { type: 'view', message: 'Artwork "Neon Nights" viewed 15 times', time: '5 hours ago' },
    { type: 'sale', message: 'Sold "Abstract Emotions" for ₦18,000', time: '1 day ago' },
    { type: 'follower', message: 'New follower: Art Collector', time: '1 day ago' },
  ];

  const UploadModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      price: '',
      category: 'Digital Art',
      imageUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (user) {
        addArtwork({
          title: formData.title,
          description: formData.description,
          price: parseInt(formData.price),
          category: formData.category,
          imageUrl: formData.imageUrl || 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
          sellerId: user.id,
          sellerName: user.name,
          likes: 0,
          views: 0,
          isLiked: false,
          watermarked: true
        });
        setShowUploadModal(false);
        setFormData({ title: '', description: '', price: '', category: 'Digital Art', imageUrl: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-200 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          <h3 className="text-xl font-bold text-white mb-4">Upload New Artwork</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Price (₦)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option>Digital Art</option>
                <option>Cyberpunk</option>
                <option>Abstract</option>
                <option>Portrait</option>
                <option>Landscape</option>
                <option>NFT</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-dark-300 text-dark-700 py-2 px-4 rounded-lg hover:bg-dark-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="bg-dark-200 rounded-lg p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'like' ? 'bg-red-500' :
                          activity.type === 'view' ? 'bg-blue-500' :
                          activity.type === 'sale' ? 'bg-green-500' : 'bg-purple-500'
                        }`}></div>
                        <span className="text-dark-600">{activity.message}</span>
                      </div>
                      <span className="text-sm text-dark-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Top Performing Artworks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myArtworks.slice(0, 4).map((artwork) => (
                  <div key={artwork.id} className="bg-dark-200 rounded-lg p-4 flex items-center space-x-4">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => toggleArtworkModal(artwork)}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{artwork.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-dark-600">
                        <span>{artwork.views} views</span>
                        <span>{artwork.likes} likes</span>
                      </div>
                      <p className="text-primary-400 font-bold">₦{artwork.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => toggleArtworkModal(artwork)}
                      className="p-2 text-primary-400 hover:text-primary-300 transition-colors"
                      title="View Artwork"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-primary-600 p-4 rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Upload Artwork</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                  <span className="text-white font-medium">View Analytics</span>
                </button>
                <button
                  onClick={() => setActiveTab('earnings')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Check Earnings</span>
                </button>
                <button
                  onClick={() => setActiveTab('artworks')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Manage Artworks</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'artworks':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">My Artworks ({myArtworks.length})</h3>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myArtworks.map((artwork) => (
                <div key={artwork.id} className="bg-dark-200 rounded-lg overflow-hidden hover:bg-dark-300 transition-colors">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => toggleArtworkModal(artwork)}
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white flex-1">{artwork.title}</h4>
                      <button
                        onClick={() => toggleArtworkModal(artwork)}
                        className="ml-2 p-1 text-primary-400 hover:text-primary-300 transition-colors"
                        title="View Full Artwork"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-dark-600 mb-3 line-clamp-2">{artwork.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary-400">₦{artwork.price.toLocaleString()}</span>
                      <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">
                        {artwork.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-dark-600 mb-3">
                      <span>{artwork.views} views</span>
                      <span>{artwork.likes} likes</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-1 bg-dark-300 text-dark-700 py-2 rounded hover:bg-dark-400 transition-colors">
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => toggleArtworkModal(artwork)}
                        className="flex items-center justify-center bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-700 transition-colors"
                        title="View Artwork"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className="flex items-center justify-center bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Analytics & Insights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Views Over Time</h4>
                <div className="h-64 flex items-center justify-center text-dark-600">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                    <p>Chart placeholder - Views analytics would go here</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h4>
                <div className="h-64 flex items-center justify-center text-dark-600">
                  <div className="text-center">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    <p>Chart placeholder - Revenue analytics would go here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-400">2.4k</div>
                  <div className="text-sm text-dark-600">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">156</div>
                  <div className="text-sm text-dark-600">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">89</div>
                  <div className="text-sm text-dark-600">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <div className="text-sm text-dark-600">Sales</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Earnings Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">Total Earnings</h4>
                <div className="text-3xl font-bold">₦125,000</div>
                <div className="text-sm opacity-80">+₦25,000 this month</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">Pending Payouts</h4>
                <div className="text-3xl font-bold">₦15,000</div>
                <div className="text-sm opacity-80">Available in 3 days</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
                <h4 className="text-lg font-semibold mb-2">This Month</h4>
                <div className="text-3xl font-bold">₦25,000</div>
                <div className="text-sm opacity-80">8 sales completed</div>
              </div>
            </div>
            
            <div className="bg-dark-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Recent Sales</h4>
              <div className="space-y-4">
                {[
                  { artwork: 'Digital Dreams', amount: '₦25,000', date: '2024-03-15', buyer: 'Art Collector' },
                  { artwork: 'Neon Nights', amount: '₦35,000', date: '2024-03-12', buyer: 'Digital Enthusiast' },
                  { artwork: 'Abstract Emotions', amount: '₦18,000', date: '2024-03-10', buyer: 'Creative Studio' },
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dark-300 rounded">
                    <div>
                      <div className="font-semibold text-white">{sale.artwork}</div>
                      <div className="text-sm text-dark-600">Sold to {sale.buyer}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{sale.amount}</div>
                      <div className="text-sm text-dark-600">{sale.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Upload New Artwork</h3>
            <div className="bg-dark-200 rounded-lg p-8">
              <div className="text-center">
                <Upload className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Upload Your Artwork</h4>
                <p className="text-dark-600 mb-6">Share your creative work with the world</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Upload
                </button>
              </div>
            </div>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
                <p className="text-dark-600">Welcome back, {user?.name}! Manage your artworks and track your success.</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Artwork</span>
            </button>
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
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-dark-600">{stat.label}</p>
                  </div>
                </div>
                <p className="text-xs text-green-400">{stat.change}</p>
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

        {/* Upload Modal */}
        {showUploadModal && <UploadModal />}
      </div>
    </div>
  );
};

export default SellerDashboard;