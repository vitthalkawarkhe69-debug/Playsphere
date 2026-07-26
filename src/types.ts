export type NavTab = 
  | 'home' 
  | 'games' 
  | 'tournaments' 
  | 'cafe' 
  | 'booking' 
  | 'dashboard' 
  | 'contact' 
  | 'about';

export interface Game {
  id: string;
  title: string;
  category: string;
  rating: number;
  pricePerHour: number;
  image: string;
  isFavorite?: boolean;
  description?: string;
  platforms?: string[];
  banner?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'snacks' | 'burgers' | 'drinks' | 'desserts';
  price: number;
  image: string;
  description?: string;
  popular?: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  subtitle: string;
  game: string;
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED';
  date: string;
  time: string;
  prizePool: string;
  entryFee: string;
  image: string;
  teamsRegistered: number;
  maxTeams: number;
  targetDate: string; // ISO string for timer
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  role?: string;
}

export interface CartItem {
  id: string;
  type: 'food' | 'booking';
  title: string;
  price: number;
  quantity: number;
  image?: string;
  details?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  level: number;
  currentXp: number;
  maxXp: number;
  avatar: string;
  discountClaimed?: boolean;
}

export interface SlotBookingRequest {
  gameId?: string;
  gameTitle?: string;
  platform: 'PS5' | 'Xbox Series X' | 'High-End PC' | 'VR Simulator';
  date: string;
  timeSlot: string;
  durationHours: number;
  foodAddons: { foodId: string; quantity: number }[];
  couponCode?: string;
  totalPrice: number;
}
