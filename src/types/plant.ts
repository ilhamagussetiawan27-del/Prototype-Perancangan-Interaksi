export type LightLevel = 'rendah' | 'sedang' | 'terang';
export type PlantSize = 'kecil' | 'sedang' | 'besar';
export type CareDifficulty = 'mudah' | 'sulit';
export type PetSafety = 'aman' | 'waspada';
export type RoomCategory = 'semua' | 'tamu' | 'tidur' | 'kantor';
export type PlantForm = 'lantai' | 'gantung' | 'meja';

export interface PlantReview {
  id: string;
  author: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Plant {
  id: string;
  name: string;
  latinName: string;
  price: number;
  originalPrice?: number;
  categoryTag: string; // e.g. "Indoor Favorite", "Populer", "Favorit"
  isFeatured?: boolean;
  isFavorited?: boolean;
  roomCategories: RoomCategory[];
  plantForm: PlantForm;
  lightLevel: LightLevel;
  lightLabel: string; // e.g. "Rendah", "Sedang", "Terang"
  size: PlantSize;
  sizeLabel: string; // e.g. "Sedang (20-50cm)"
  difficulty: CareDifficulty;
  difficultyLabel: string; // "Mudah dirawat", "Perawatan khusus"
  petFriendly: PetSafety;
  petLabel: string; // "Aman hewan", "Perlu pengawasan"
  heightCm: number;
  wateringFrequency: string; // "1-2x/minggu", "2x/minggu", "1x/10 hari"
  image: string;
  gallery: string[];
  description: string;
  careDetails: {
    light: string;
    water: string;
    leafCare: string;
    humidity: string;
  };
  specifications: {
    potSize: string;
    potMaterial: string;
    soilMix: string;
    shippingGuarantee: string;
  };
  reviews: PlantReview[];
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedPot?: string;
}

export interface FilterState {
  searchQuery: string;
  lightLevels: LightLevel[];
  sizes: PlantSize[];
  difficulties: CareDifficulty[];
  petOnly: boolean;
  maxPrice: number;
  sortBy: 'terlaris' | 'harga-terendah' | 'harga-tertinggi' | 'nama';
  selectedRoom: RoomCategory;
  selectedForm?: PlantForm;
}
