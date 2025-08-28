import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-100 border-t border-dark-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="https://i.postimg.cc/vmvTt2MY/Blue-White-Modern-Minimalist-Name-Logo-20250523-183330-0000-1-removebg-preview.png" 
              alt="Artivisual" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-dark-600 text-sm mb-4 max-w-md">
              Artivisual is the premier digital art marketplace where creativity meets commerce. 
              Discover, collect, and sell unique digital artworks from talented artists worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-500 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-dark-500 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-dark-700 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/products" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">Products</Link></li>
              <li><Link to="/about" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">Our Services</Link></li>
              <li><Link to="/blog" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-dark-700 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-dark-600 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                hello@artivisual.com
              </li>
              <li className="flex items-center text-dark-600 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +234 123 456 7890
              </li>
              <li className="flex items-center text-dark-600 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-600 text-sm">
            © 2024 Artivisual. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-dark-600 hover:text-primary-400 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;