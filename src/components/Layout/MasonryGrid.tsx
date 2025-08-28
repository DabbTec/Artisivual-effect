import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, User } from 'lucide-react';
import { Artwork } from '../../context/AppContext';

interface MasonryGridProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onToggleLike: (artworkId: string) => void;
  onAddToCart: (artwork: Artwork) => void;
  onToggleFavorite: (artwork: Artwork) => void;
  favorites: Artwork[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  artworks,
  onArtworkClick,
  onToggleLike,
  onAddToCart,
  onToggleFavorite,
  favorites
}) => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 480) setColumns(1);
      else if (window.innerWidth < 768) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const getColumnItems = () => {
    const cols: Artwork[][] = Array.from({ length: columns }, () => []);
    artworks.forEach((artwork, index) => {
      cols[index % columns].push(artwork);
    });
    return cols;
  };

  const columnItems = getColumnItems();

  return (
    <div className="w-full">
      <div 
        className="grid gap-2 sm:gap-4" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-2 sm:space-y-4">
            {column.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onArtworkClick={onArtworkClick}
                onToggleLike={onToggleLike}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favorites.some(fav => fav.id === artwork.id)}
                index={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ArtworkCardProps {
  artwork: Artwork;
  onArtworkClick: (artwork: Artwork) => void;
  onToggleLike: (artworkId: string) => void;
  onAddToCart: (artwork: Artwork) => void;
  onToggleFavorite: (artwork: Artwork) => void;
  isFavorite: boolean;
  index: number;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onArtworkClick,
  onToggleLike,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  index
}) => {
  const [imageHeight, setImageHeight] = useState(300);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const width = img.offsetWidth;
    setImageHeight(width * aspectRatio);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-200 rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onArtworkClick(artwork)}
    >
      <div className="relative overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ height: `${Math.max(200, Math.min(400, imageHeight))}px` }}
          onLoad={handleImageLoad}
        />
        
        {/* Watermark */}
        {artwork.watermarked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/20 text-lg sm:text-2xl font-bold transform rotate-45">
              ARTIVISUAL
            </div>
          </div>
        )}

        {/* Mobile Action Buttons - Always Visible */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 md:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(artwork.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors shadow-lg ${
              artwork.isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${artwork.isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(artwork);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors shadow-lg ${
              isFavorite
                ? 'bg-accent-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-accent-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(artwork);
            }}
            className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 backdrop-blur-sm transition-colors shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/50 items-center justify-center space-x-3 hidden md:flex"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(artwork.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              artwork.isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/20 text-white hover:bg-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${artwork.isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(artwork);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-accent-500 text-white'
                : 'bg-white/20 text-white hover:bg-accent-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(artwork);
            }}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-primary-600 backdrop-blur-sm transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Stats overlay */}
        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex items-center space-x-1 sm:space-x-2">
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-white text-xs">
            <Eye className="w-2 h-2 sm:w-3 sm:h-3" />
            <span>{artwork.views}</span>
          </div>
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-white text-xs">
            <Heart className="w-2 h-2 sm:w-3 sm:h-3" />
            <span>{artwork.likes}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-2 sm:p-4">
        <h3 className="font-semibold text-dark-800 mb-1 line-clamp-2 text-sm sm:text-base">
          {artwork.title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-dark-600 truncate">{artwork.sellerName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg font-bold text-primary-400">
            ₦{artwork.price.toLocaleString()}
          </span>
          <span className="text-xs text-primary-400 bg-primary-600/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            {artwork.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MasonryGrid;