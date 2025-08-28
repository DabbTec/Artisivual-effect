import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BottomNavigation from './components/Layout/BottomNavigation';

// Modal Components
import AuthModal from './components/Modals/AuthModal';
import ArtworkModal from './components/Modals/ArtworkModal';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import SellerProfile from './pages/SellerProfile';

// Dashboard Pages
import BuyerDashboard from './pages/dashboards/BuyerDashboard';
import SellerDashboard from './pages/dashboards/SellerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-dark-100 flex flex-col pb-16 md:pb-0">
            <Header />
            
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/seller/:sellerId" element={<SellerProfile />} />
                  <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                  <Route path="/seller-dashboard" element={<SellerDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
              </AnimatePresence>
            </main>

            <Footer />
            <BottomNavigation />

            {/* Modals */}
            <AuthModal />
            <ArtworkModal />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;