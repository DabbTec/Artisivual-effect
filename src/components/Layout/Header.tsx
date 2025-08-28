import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toggleAuthModal, cartItems, searchQuery, setSearchQuery } = useApp();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleDashboardRedirect = () => {
    if (user?.role === 'admin') {
      window.location.href = '/admin-dashboard';
    } else if (user?.role === 'seller') {
      window.location.href = '/seller-dashboard';
    } else {
      window.location.href = '/buyer-dashboard';
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-100/95 backdrop-blur-md border-b border-dark-300 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://i.postimg.cc/vmvTt2MY/Blue-White-Modern_Minimalist-Name-Logo-20250523-183330-0000-1-removebg-preview.png" 
              alt="Artivisual" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about' },
              { name: 'Products', href: '/products' },
              { name: 'Our Services', href: '/services' },
              { name: 'Blog', href: '/blog' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-primary-400 border-b-2 border-primary-400'
                    : 'text-dark-600 hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-200 border border-dark-300 rounded-lg text-dark-700 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden text-dark-600 hover:text-primary-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <>
                <Link to="/favorites" className="text-dark-600 hover:text-primary-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link to="/cart" className="relative text-dark-600 hover:text-primary-400 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-dark-600 hover:text-primary-400 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="hidden sm:block text-sm">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-dark-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button
                        onClick={handleDashboardRedirect}
                        className="block px-4 py-2 text-sm text-dark-700 hover:bg-dark-300 w-full text-left"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-sm text-dark-700 hover:bg-dark-300 w-full text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAuthModal('login')}
                  className="px-4 py-2 text-sm font-medium text-dark-600 hover:text-primary-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => toggleAuthModal('register')}
                  className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setShowMobileSearch(false)}
          >
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              className="bg-dark-100 p-4 border-b border-dark-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-dark-300 rounded-lg text-dark-700 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setShowMobileSearch(false)}
                  className="text-dark-600 hover:text-primary-400 transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;