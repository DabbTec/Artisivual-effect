import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, toggleAuthModal } = useApp();
  const { user } = useAuth();

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
            <ShoppingCart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Sign in to view your cart</h2>
            <p className="text-dark-600 mb-6">You need to be signed in to add items to your cart</p>
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

  const updateQuantity = (artworkId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(artworkId);
    }
    // In a real app, you'd update the quantity here
  };

  const totalAmount = cartItems.reduce((total, item) => total + (item.artwork.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-dark-100 py-8 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
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
              <span>Continue Shopping</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <p className="text-dark-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-200 rounded-lg p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.artwork.imageUrl}
                      alt={item.artwork.title}
                      className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-white text-lg mb-1">{item.artwork.title}</h3>
                      <p className="text-dark-600 mb-2">by {item.artwork.sellerName}</p>
                      <p className="text-sm text-dark-500 mb-3">{item.artwork.category}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <span className="text-dark-600">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                              className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center hover:bg-dark-400 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-dark-700" />
                            </button>
                            <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                              className="w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center hover:bg-dark-400 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-dark-700" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <span className="text-xl font-bold text-primary-400">
                            ₦{(item.artwork.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.artwork.id)}
                            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-dark-200 rounded-lg p-6 sticky top-24"
              >
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-dark-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₦{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-dark-600">
                    <span>Processing Fee</span>
                    <span>₦{Math.round(totalAmount * 0.03).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-dark-300 pt-4">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total</span>
                      <span>₦{(totalAmount + Math.round(totalAmount * 0.03)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium mb-4">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <Link
                    to="/products"
                    className="text-primary-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-dark-300/50 rounded-lg">
                  <p className="text-xs text-dark-600 text-center">
                    🔒 Secure checkout with 256-bit SSL encryption
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-16 h-16 text-dark-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-dark-600 mb-8">Discover amazing digital artworks and add them to your cart!</p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>Start Shopping</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;