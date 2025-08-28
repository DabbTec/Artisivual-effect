import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Info, Briefcase, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Services', href: '/services', icon: Briefcase },
    { name: 'Blog', href: '/blog', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-dark-200/95 backdrop-blur-md border-t border-dark-300 z-50 md:hidden"
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 min-w-[50px] ${
                isActive(item.href)
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'text-dark-600 hover:text-primary-400 hover:bg-dark-300/50'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;