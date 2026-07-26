import { Game, FoodItem, Tournament, Testimonial, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'GamerX',
  handle: 'gamerx_23',
  level: 23,
  currentXp: 750,
  maxXp: 1200,
  avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop',
  discountClaimed: false,
};

export const FEATURED_GAMES: Game[] = [
  {
    id: 'gow-ragnarok',
    title: 'God of War Ragnarök',
    category: 'Action, Adventure',
    rating: 4.8,
    pricePerHour: 300,
    image: '/images/godofwap.jpeg',
    isFavorite: true,
    description: 'Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives across the Nine Realms.',
    platforms: ['PS5', 'PS4', 'PC']
  },
  {
    id: 'spiderman-2',
    title: 'Spider-Man 2',
    category: 'Action, Adventure',
    rating: 4.7,
    pricePerHour: 350,
    image: '/images/Spider-Man 2 Player Recreates Tobey Maguire Movie___.jpeg',
    isFavorite: false,
    description: 'Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save New York.',
    platforms: ['PS5']
  },
  {
    id: 'eafc-24',
    title: 'EA FC 24',
    category: 'Sports, Multiplayer',
    rating: 4.6,
    pricePerHour: 250,
    image: '/images/fc26.jpeg',
    isFavorite: false,
    description: 'The next generation of the world\'s game featuring 19,000+ fully licensed players and HyperMotionV technology.',
    platforms: ['PS5', 'Xbox Series X', 'PC']
  },
  {
    id: 'cod-bo6',
    title: 'Call of Duty: Black Ops 6',
    category: 'Action, Shooting',
    rating: 4.9,
    pricePerHour: 300,
    image: '/images/callofdutyblackops7.jpeg',
    isFavorite: false,
    description: 'Forced to go rogue. Hunted from within. Call of Duty: Black Ops 6 is a signature Black Ops spy action thriller set in the early 90s.',
    platforms: ['PC', 'PS5', 'Xbox Series X']
  },
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V',
    category: 'Action, Open World',
    rating: 4.9,
    pricePerHour: 250,
    image: '/images/Grand Theft Auto V.jpeg',
    isFavorite: false,
    description: 'Explore the vast, bustling open world of Los Santos and Blaine County in the ultimate Grand Theft Auto experience with Michael, Franklin, and Trevor.',
    platforms: ['PS5', 'Xbox Series X', 'PC']
  },
  {
    id: 'forza-horizon-6',
    title: 'Forza Horizon 6',
    category: 'Racing, Sports',
    rating: 4.8,
    pricePerHour: 280,
    image: '/images/Forza Horizon 6.jpeg',
    isFavorite: false,
    description: 'Your ultimate Horizon Adventure awaits! Drive hundreds of the world’s greatest cars across vibrant, ever-evolving open world landscapes.',
    platforms: ['Xbox Series X', 'PC']
  },
  {
    id: 'ghost-of-tsushima',
    title: 'Ghost of Tsushima Director\'s Cut',
    category: 'Action, Adventure',
    rating: 4.9,
    pricePerHour: 320,
    image: '/images/ghost of tsushima.jpeg',
    isFavorite: true,
    description: 'In the late 13th century, the Mongol empire has laid waste to entire nations. As Jin Sakai, forge a new path and wage an unconventional war for the freedom of Tsushima.',
    platforms: ['PS5', 'PC']
  },
  {
    id: 'rdr2',
    title: 'Red Dead Redemption 2',
    category: 'Action, Open World',
    rating: 4.9,
    pricePerHour: 300,
    image: '/images/Red dead redemption.jpeg',
    isFavorite: false,
    description: 'Winner of over 175 Game of the Year Awards, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age.',
    platforms: ['PS5', 'Xbox Series X', 'PC']
  },
  {
    id: 're4-remake',
    title: 'Resident Evil 4',
    category: 'Horror, Survival',
    rating: 4.8,
    pricePerHour: 280,
    image: '/images/Resident Evil 4.jpeg',
    isFavorite: false,
    description: 'Survival is just the beginning. Six years after the biological disaster in Raccoon City, agent Leon S. Kennedy is sent on a mission to rescue the president\'s daughter.',
    platforms: ['PS5', 'Xbox Series X', 'PC']
  },
  {
    id: 'wwe-2k24',
    title: 'WWE 2K24',
    category: 'Fighting, Sports',
    rating: 4.7,
    pricePerHour: 250,
    image: "/images/WWE 2K26's.jpeg",
    isFavorite: false,
    description: 'Celebrate 40 Years of WrestleMania in WWE 2K24, featuring a star-studded roster, iconic matches, and new match types like Casket and Special Guest Ref.',
    platforms: ['PS5', 'Xbox Series X', 'PC']
  },
  {
    id: '8-ball-pool',
    title: '8-Ball Pool Table',
    category: 'Billiards, Indoor Sports',
    rating: 4.9,
    pricePerHour: 200,
    image: '/images/pooltable.jpeg',
    isFavorite: true,
    description: 'Experience professional 8-Ball Pool on tour-grade slate tables equipped with carbon-fiber cues, Aramith balls & ambient overhead spotlighting.',
    platforms: ['Pool Lounge', '8-Ball Zone']
  },
  {
    id: 'pro-snooker',
    title: 'Championship Snooker Table',
    category: 'Snooker, Precision Sports',
    rating: 4.9,
    pricePerHour: 250,
    image: '/images/snooker.jpeg',
    isFavorite: false,
    description: '12ft Full-sized Championship Snooker table featuring Strachan 6811 green cloth, precision wooden cues, extension rests & electronic scoring.',
    platforms: ['Snooker Arena', 'VIP Lounge']
  }
];

export const CAFE_ITEMS: FoodItem[] = [
  {
    id: 'loaded-nachos',
    name: 'Loaded Nachos',
    category: 'snacks',
    price: 199,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=600&auto=format&fit=crop',
    description: 'Crispy tortilla chips smothered in melted cheddar, jalapeños, salsa, sour cream, and guacamole.',
    popular: true
  },
  {
    id: 'cheese-burger',
    name: 'Cheese Burger',
    category: 'burgers',
    price: 149,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
    description: 'Juicy gourmet grilled patty topped with melted double cheese, caramelized onions, crisp lettuce & house special sauce.',
    popular: true
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'drinks',
    price: 119,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
    description: 'Rich dark espresso blended with chilled milk, cream, and topped with chocolate drizzle.',
    popular: true
  },
  {
    id: 'iced-mojito',
    name: 'Iced Mojito',
    category: 'drinks',
    price: 99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop',
    description: 'Refreshing muddled mint, crushed ice, zesty lime juice and sparkling soda.',
    popular: true
  }
];

export const CURRENT_TOURNAMENT: Tournament = {
  id: 'playsphere-cup',
  title: 'PLAYSPHERE CUP',
  subtitle: 'Valorant Tournament',
  game: 'Valorant',
  status: 'UPCOMING',
  date: 'Upcoming',
  time: '11:00 AM',
  prizePool: '₹10,000',
  entryFee: '₹500 / Team',
  image: '/images/valorant.jpeg',
  teamsRegistered: 28,
  maxTeams: 32,
  targetDate: new Date(Date.now() + 3 * 86400000 + 15 * 3600000 + 42 * 60000).toISOString()
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rohit Yadav',
    rating: 4,
    comment: 'Best gaming lounge I\'ve ever visited! Amazing setup and atmosphere.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    role: 'Pro Gamer'
  },
  {
    id: 'test-2',
    name: 'Sneha Patil',
    rating: 4,
    comment: 'Loved the vibe and food! Perfect place to hangout.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'Casual Gamer'
  },
  {
    id: 'test-3',
    name: 'Ankush More',
    rating: 4,
    comment: 'Tournaments are so well organized. Totally worth it!',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    role: 'Esports Competitor'
  }
];

export const FEATURES_LIST = [
  {
    id: 'f1',
    symbol: '%',
    title: 'BEST PRICES',
    description: 'Affordable gaming like never before'
  },
  {
    id: 'f2',
    symbol: 'HEADSET',
    title: 'PREMIUM SETUP',
    description: 'High-end consoles & ultra-fast internet'
  },
  {
    id: 'f3',
    symbol: 'SHIELD',
    title: 'SAFE & SECURE',
    description: 'Clean, safe & hygienic environment'
  },
  {
    id: 'f4',
    symbol: 'PEOPLE',
    title: 'AWESOME COMMUNITY',
    description: 'Meet gamers, play & grow together'
  }
];

export const STATS_LIST = [
  { count: '50+', label: 'GAMES', icon: 'Gamepad2' },
  { count: '1000+', label: 'HAPPY PLAYERS', icon: 'Users' },
  { count: '25+', label: 'TOURNAMENTS', icon: 'Trophy' },
  { count: '5+', label: 'RATINGS', icon: 'Star' }
];

export const HERO_OPERATOR_IMAGE = 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop';
export const GAMING_LOUNGE_BG = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop';
