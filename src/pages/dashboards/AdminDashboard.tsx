import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, ShoppingCart, TrendingUp, Settings, Flag, MessageSquare, BarChart3, Shield, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artworks } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'artworks', name: 'Artworks', icon: Eye },
    { id: 'reports', name: 'Reports', icon: Flag },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-600', change: '+12%' },
    { label: 'Total Artworks', value: artworks.length.toString(), icon: Eye, color: 'bg-green-600', change: '+8%' },
    { label: 'Total Sales', value: '₦2.4M', icon: ShoppingCart, color: 'bg-purple-600', change: '+23%' },
    { label: 'Active Sellers', value: '156', icon: TrendingUp, color: 'bg-orange-600', change: '+5%' },
    { label: 'Revenue', value: '₦450K', icon: DollarSign, color: 'bg-emerald-600', change: '+18%' },
    { label: 'Platform Health', value: '98.5%', icon: Shield, color: 'bg-cyan-600', change: '+0.2%' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Buyer', joinDate: '2024-03-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', joinDate: '2024-03-14', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Buyer', joinDate: '2024-03-13', status: 'Pending' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Seller', joinDate: '2024-03-12', status: 'Active' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Buyer', joinDate: '2024-03-11', status: 'Active' },
  ];

  const pendingArtworks = [
    { id: 1, title: 'Digital Landscape', artist: 'Artist One', category: 'Digital Art', status: 'Pending Review', uploadDate: '2024-03-15' },
    { id: 2, title: 'Abstract Vision', artist: 'Artist Two', category: 'Abstract', status: 'Pending Review', uploadDate: '2024-03-14' },
    { id: 3, title: 'Cyber City', artist: 'Artist Three', category: 'Cyberpunk', status: 'Pending Review', uploadDate: '2024-03-13' },
  ];

  const platformMetrics = [
    { label: 'Daily Active Users', value: '1,234', trend: '+5.2%' },
    { label: 'Conversion Rate', value: '3.4%', trend: '+0.8%' },
    { label: 'Average Order Value', value: '₦28,500', trend: '+12%' },
    { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.1' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Platform Metrics */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Platform Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {platformMetrics.map((metric, index) => (
                  <div key={index} className="bg-dark-200 p-4 rounded-lg">
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                    <div className="text-sm text-dark-600">{metric.label}</div>
                    <div className="text-xs text-green-400">{metric.trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="bg-dark-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-dark-600">New user registration: John Doe</span>
                    </div>
                    <span className="text-sm text-dark-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-dark-600">Artwork approved: "Digital Dreams"</span>
                    </div>
                    <span className="text-sm text-dark-500">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-dark-600">Report resolved: Inappropriate content</span>
                    </div>
                    <span className="text-sm text-dark-500">6 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-dark-600">New seller application: Jane Smith</span>
                    </div>
                    <span className="text-sm text-dark-500">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <Users className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Manage Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('artworks')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Review Artworks</span>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <Flag className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Handle Reports</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors text-center"
                >
                  <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-white font-medium">Platform Settings</span>
                </button>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">User Growth</h4>
                <div className="h-64 flex items-center justify-center text-dark-600">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary-400" />
                    <p>Chart placeholder - User growth over time</p>
                  </div>
                </div>
              </div>
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Revenue Analytics</h4>
                <div className="h-64 flex items-center justify-center text-dark-600">
                  <div className="text-center">
                    <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    <p>Chart placeholder - Revenue breakdown</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">User Management</h3>
              <div className="flex space-x-2">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Export Users
                </button>
                <button className="bg-dark-300 text-dark-700 px-4 py-2 rounded-lg hover:bg-dark-400 transition-colors">
                  Add User
                </button>
              </div>
            </div>
            
            <div className="bg-dark-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Join Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-300">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-dark-300/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-medium">{user.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-dark-600">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'Seller' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-600">
                          {user.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-400 hover:text-primary-300 mr-3">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Suspend</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'artworks':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Artwork Management</h3>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Approve All
                </button>
                <button className="bg-dark-300 text-dark-700 px-4 py-2 rounded-lg hover:bg-dark-400 transition-colors">
                  Filter
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingArtworks.map((artwork) => (
                <div key={artwork.id} className="bg-dark-200 rounded-lg p-4 hover:bg-dark-300 transition-colors">
                  <div className="aspect-square bg-dark-300 rounded-lg mb-4 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-dark-500" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{artwork.title}</h4>
                  <p className="text-sm text-dark-600 mb-2">by {artwork.artist}</p>
                  <p className="text-xs text-dark-500 mb-2">Uploaded: {artwork.uploadDate}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-primary-600/20 text-primary-400 px-2 py-1 rounded-full">
                      {artwork.category}
                    </span>
                    <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full">
                      {artwork.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm">
                      Approve
                    </button>
                    <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors text-sm">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Reports & Moderation</h3>
            <div className="bg-dark-200 rounded-lg p-6">
              <div className="text-center py-20">
                <Flag className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No pending reports</h4>
                <p className="text-dark-600">All reports have been resolved</p>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Support Messages</h3>
            <div className="bg-dark-200 rounded-lg p-6">
              <div className="text-center py-20">
                <MessageSquare className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No new messages</h4>
                <p className="text-dark-600">All support tickets have been handled</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Platform Settings</h3>
            <div className="space-y-6">
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600">Platform Maintenance Mode</span>
                    <button className="bg-dark-300 relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600">New User Registrations</span>
                    <button className="bg-primary-600 relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-600">Auto-approve Artworks</span>
                    <button className="bg-dark-300 relative inline-flex h-6 w-11 items-center rounded-full">
                      <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Commission Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Platform Commission (%)</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Minimum Artwork Price (₦)</label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full px-3 py-2 bg-dark-300 border border-dark-400 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-dark-600">Welcome back, {user?.name}! Manage your platform effectively.</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Generate Report
              </button>
              <button className="bg-dark-300 text-dark-700 px-4 py-2 rounded-lg hover:bg-dark-400 transition-colors">
                Settings
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 p-4 rounded-lg hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-green-400">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-dark-600">{stat.label}</p>
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

export default AdminDashboard;