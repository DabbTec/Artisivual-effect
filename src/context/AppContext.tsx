import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  likes: number;
  views: number;
  isLiked: boolean;
  createdAt: string;
  watermarked: boolean;
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

interface AppContextType {
  artworks: Artwork[];
  favorites: Artwork[];
  cartItems: CartItem[];
  searchQuery: string;
  selectedCategory: string;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register';
  isArtworkModalOpen: boolean;
  selectedArtwork: Artwork | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleAuthModal: (type?: 'login' | 'register') => void;
  toggleArtworkModal: (artwork?: Artwork) => void;
  toggleFavorite: (artwork: Artwork) => void;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  toggleLike: (artworkId: string) => void;
  addArtwork: (artwork: Omit<Artwork, 'id' | 'createdAt'>) => void;
  getFilteredArtworks: () => Artwork[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Extended mock data with more artworks
const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Digital Dreams',
    description: 'A vibrant digital artwork exploring the intersection of technology and consciousness.',
    price: 25000,
    category: 'Digital Art',
    imageUrl: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Artist Creator',
    likes: 24,
    views: 156,
    isLiked: false,
    createdAt: '2024-03-15',
    watermarked: true
  },
  {
    id: '2',
    title: 'Neon Nights',
    description: 'Cyberpunk-inspired artwork with glowing neon elements.',
    price: 35000,
    category: 'Cyberpunk',
    imageUrl: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Artist Creator',
    likes: 42,
    views: 289,
    isLiked: false,
    createdAt: '2024-03-10',
    watermarked: true
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    description: 'An emotional journey through color and form.',
    price: 18000,
    category: 'Abstract',
    imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '2',
    sellerName: 'Artist Creator',
    likes: 18,
    views: 92,
    isLiked: false,
    createdAt: '2024-03-08',
    watermarked: true
  },
  {
    id: '4',
    title: 'Cosmic Voyage',
    description: 'Journey through the stars with this mesmerizing space-themed artwork.',
    price: 42000,
    category: 'Space Art',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '3',
    sellerName: 'Space Artist',
    likes: 67,
    views: 234,
    isLiked: false,
    createdAt: '2024-03-12',
    watermarked: true
  },
  {
    id: '5',
    title: 'Urban Decay',
    description: 'A gritty portrayal of modern city life through digital art.',
    price: 28000,
    category: 'Urban Art',
    imageUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '4',
    sellerName: 'Urban Explorer',
    likes: 31,
    views: 178,
    isLiked: false,
    createdAt: '2024-03-09',
    watermarked: true
  },
  {
    id: '6',
    title: 'Nature\'s Symphony',
    description: 'Digital interpretation of natural harmony and balance.',
    price: 22000,
    category: 'Nature Art',
    imageUrl: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '5',
    sellerName: 'Nature Lover',
    likes: 45,
    views: 201,
    isLiked: false,
    createdAt: '2024-03-11',
    watermarked: true
  },
  {
    id: '7',
    title: 'Geometric Harmony',
    description: 'Perfect balance of shapes and colors in digital form.',
    price: 33000,
    category: 'Geometric',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '6',
    sellerName: 'Geo Master',
    likes: 29,
    views: 145,
    isLiked: false,
    createdAt: '2024-03-07',
    watermarked: true
  },
  {
    id: '8',
    title: 'Digital Portrait',
    description: 'Stunning digital portrait showcasing human emotion.',
    price: 38000,
    category: 'Portrait',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '7',
    sellerName: 'Portrait Pro',
    likes: 52,
    views: 267,
    isLiked: false,
    createdAt: '2024-03-13',
    watermarked: true
  },
  {
    id: '9',
    title: 'Futuristic City',
    description: 'Vision of tomorrow\'s urban landscape.',
    price: 45000,
    category: 'Futuristic',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '8',
    sellerName: 'Future Vision',
    likes: 73,
    views: 312,
    isLiked: false,
    createdAt: '2024-03-14',
    watermarked: true
  },
  {
    id: '10',
    title: 'Minimalist Beauty',
    description: 'Less is more - elegant minimalist digital art.',
    price: 19000,
    category: 'Minimalist',
    imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '9',
    sellerName: 'Minimal Artist',
    likes: 36,
    views: 189,
    isLiked: false,
    createdAt: '2024-03-06',
    watermarked: true
  },
  {
    id: '11',
    title: 'Ocean Dreams',
    description: 'Dive into the depths of digital ocean artistry.',
    price: 31000,
    category: 'Ocean Art',
    imageUrl: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '10',
    sellerName: 'Ocean Artist',
    likes: 41,
    views: 198,
    isLiked: false,
    createdAt: '2024-03-05',
    watermarked: true
  },
  {
    id: '12',
    title: 'Fire & Ice',
    description: 'The eternal battle between opposing forces.',
    price: 39000,
    category: 'Elemental',
    imageUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '11',
    sellerName: 'Element Master',
    likes: 58,
    views: 245,
    isLiked: false,
    createdAt: '2024-03-04',
    watermarked: true
  },
  {
    id: '13',
    title: 'Mystic Forest',
    description: 'Enchanted forest scene with magical elements.',
    price: 27000,
    category: 'Fantasy',
    imageUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '12',
    sellerName: 'Fantasy Creator',
    likes: 34,
    views: 167,
    isLiked: false,
    createdAt: '2024-03-03',
    watermarked: true
  },
  {
    id: '14',
    title: 'Retro Wave',
    description: 'Nostalgic 80s-inspired digital artwork.',
    price: 24000,
    category: 'Retro',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '13',
    sellerName: 'Retro Master',
    likes: 47,
    views: 203,
    isLiked: false,
    createdAt: '2024-03-02',
    watermarked: true
  },
  {
    id: '15',
    title: 'Digital Mandala',
    description: 'Intricate mandala design with digital precision.',
    price: 21000,
    category: 'Spiritual',
    imageUrl: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '14',
    sellerName: 'Spiritual Artist',
    likes: 39,
    views: 156,
    isLiked: false,
    createdAt: '2024-03-01',
    watermarked: true
  },
  {
    id: '16',
    title: 'Cyber Samurai',
    description: 'Traditional warrior meets futuristic technology.',
    price: 48000,
    category: 'Cyberpunk',
    imageUrl: 'https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '15',
    sellerName: 'Cyber Artist',
    likes: 62,
    views: 278,
    isLiked: false,
    createdAt: '2024-02-28',
    watermarked: true
  },
  {
    id: '17',
    title: 'Liquid Gold',
    description: 'Flowing metallic textures in digital form.',
    price: 35000,
    category: 'Abstract',
    imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '16',
    sellerName: 'Texture Master',
    likes: 44,
    views: 189,
    isLiked: false,
    createdAt: '2024-02-27',
    watermarked: true
  },
  {
    id: '18',
    title: 'Neon Genesis',
    description: 'Birth of a digital world in neon colors.',
    price: 41000,
    category: 'Futuristic',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '17',
    sellerName: 'Genesis Creator',
    likes: 56,
    views: 234,
    isLiked: false,
    createdAt: '2024-02-26',
    watermarked: true
  },
  {
    id: '19',
    title: 'Digital Butterfly',
    description: 'Delicate butterfly rendered in stunning detail.',
    price: 23000,
    category: 'Nature Art',
    imageUrl: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '18',
    sellerName: 'Nature Digital',
    likes: 38,
    views: 145,
    isLiked: false,
    createdAt: '2024-02-25',
    watermarked: true
  },
  {
    id: '20',
    title: 'Quantum Realm',
    description: 'Exploration of quantum physics through art.',
    price: 52000,
    category: 'Science Art',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
    sellerId: '19',
    sellerName: 'Quantum Artist',
    likes: 71,
    views: 298,
    isLiked: false,
    createdAt: '2024-02-24',
    watermarked: true
  }
];

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const toggleAuthModal = (type?: 'login' | 'register') => {
    if (type) setAuthModalType(type);
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  const toggleArtworkModal = (artwork?: Artwork) => {
    if (artwork) setSelectedArtwork(artwork);
    setIsArtworkModalOpen(!isArtworkModalOpen);
  };

  const toggleFavorite = (artwork: Artwork) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === artwork.id);
      if (exists) {
        return prev.filter(fav => fav.id !== artwork.id);
      } else {
        return [...prev, artwork];
      }
    });
  };

  const addToCart = (artwork: Artwork) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map(item =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { artwork, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCartItems(prev => prev.filter(item => item.artwork.id !== artworkId));
  };

  const toggleLike = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(artwork =>
        artwork.id === artworkId
          ? {
              ...artwork,
              isLiked: !artwork.isLiked,
              likes: artwork.isLiked ? artwork.likes - 1 : artwork.likes + 1
            }
          : artwork
      )
    );
  };

  const addArtwork = (artworkData: Omit<Artwork, 'id' | 'createdAt'>) => {
    const newArtwork: Artwork = {
      ...artworkData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setArtworks(prev => [newArtwork, ...prev]);
  };

  // Global search function that filters artworks based on search query
  const getFilteredArtworks = () => {
    if (!searchQuery.trim()) {
      return artworks;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return artworks.filter(artwork => {
      // Search in title
      const titleMatch = artwork.title.toLowerCase().includes(query);
      
      // Search in description
      const descriptionMatch = artwork.description.toLowerCase().includes(query);
      
      // Search in seller name
      const sellerMatch = artwork.sellerName.toLowerCase().includes(query);
      
      // Search in category
      const categoryMatch = artwork.category.toLowerCase().includes(query);
      
      // Search in price (convert to string for partial matches)
      const priceMatch = artwork.price.toString().includes(query);
      
      return titleMatch || descriptionMatch || sellerMatch || categoryMatch || priceMatch;
    });
  };

  const value: AppContextType = {
    artworks,
    favorites,
    cartItems,
    searchQuery,
    selectedCategory,
    isAuthModalOpen,
    authModalType,
    isArtworkModalOpen,
    selectedArtwork,
    setSearchQuery,
    setSelectedCategory,
    toggleAuthModal,
    toggleArtworkModal,
    toggleFavorite,
    addToCart,
    removeFromCart,
    toggleLike,
    addArtwork,
    getFilteredArtworks
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};