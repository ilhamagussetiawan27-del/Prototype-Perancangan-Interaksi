import React, { useState } from 'react';
import { PLANTS_DATA, INITIAL_CART } from './data/plantsData';
import { Plant, CartItem, FilterState, RoomCategory } from './types/plant';
import { Header, ViewMode, DeviceView } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './views/HomeScreen';
import { CatalogScreen } from './views/CatalogScreen';
import { ProductDetailScreen } from './views/ProductDetailScreen';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { PlantFinderModal } from './components/PlantFinderModal';
import { FilterBottomSheet } from './components/FilterBottomSheet';
import { CareGuideModal, CareType } from './components/CareGuideModal';
import { CommunityModal } from './components/CommunityModal';
import { ProfileModal } from './components/ProfileModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('catalog');
  const [deviceView, setDeviceView] = useState<DeviceView>('responsive');
  const [selectedPlant, setSelectedPlant] = useState<Plant>(PLANTS_DATA[0]); // Monstera
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [wishlist, setWishlist] = useState<string[]>(['monstera-deliciosa']);

  // Filters state (Initial state matches Image 2 & 14: Cahaya rendah, Ukuran sedang, Mudah, Aman hewan)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    lightLevels: ['rendah'],
    sizes: ['sedang'],
    difficulties: ['mudah'],
    petOnly: true,
    maxPrice: 500000,
    sortBy: 'terlaris',
    selectedRoom: 'semua'
  });

  // Modal and drawer controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [careGuideType, setCareGuideType] = useState<CareType>(null);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast state
  const [toastInfo, setToastInfo] = useState<{
    show: boolean;
    message: string;
    icon?: string;
    actionText?: string;
    onAction?: () => void;
  }>({
    show: false,
    message: ''
  });

  const showToast = (message: string, icon = 'check_circle', actionText?: string, onAction?: () => void) => {
    setToastInfo({ show: true, message, icon, actionText, onAction });
    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, show: false }));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (plant: Plant, quantity = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.plant.id === plant.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [{ plant, quantity }, ...prev];
    });
  };

  const handleUpdateCartQty = (plantId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.plant.id === plantId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (plantId: string) => {
    setCart((prev) => prev.filter((item) => item.plant.id !== plantId));
    showToast('Tanaman dihapus dari keranjang', 'delete');
  };

  // Wishlist toggle
  const handleToggleWishlist = (plant: Plant) => {
    setWishlist((prev) => {
      if (prev.includes(plant.id)) {
        showToast(`${plant.name} dihapus dari Favorit`, 'favorite_border');
        return prev.filter((id) => id !== plant.id);
      } else {
        showToast(`❤️ ${plant.name} ditambahkan ke Favorit!`, 'favorite');
        return [...prev, plant.id];
      }
    });
  };

  // Filter handlers
  const handleUpdateFilters = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      lightLevels: [],
      sizes: [],
      difficulties: [],
      petOnly: false,
      maxPrice: 500000,
      sortBy: 'terlaris',
      selectedRoom: 'semua'
    });
  };

  // Plant selection -> Navigate to detail
  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f1fcf3] text-[#141e18] flex flex-col items-center">
      {/* Container wrapper based on device view */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          deviceView === 'mobile'
            ? 'max-w-md my-4 rounded-3xl border-8 border-[#29332c] shadow-2xl overflow-hidden min-h-[844px] bg-[#f1fcf3]'
            : 'w-full'
        }`}
      >
        {/* Universal Header with Simulated Browser Bar & Switcher */}
        <Header
          currentView={currentView}
          onNavigate={(v) => {
            if (v === 'finder') setIsFinderOpen(true);
            else if (v === 'community') setIsCommunityOpen(true);
            else setCurrentView(v);
          }}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          deviceView={deviceView}
          onChangeDeviceView={setDeviceView}
          selectedRoom={filters.selectedRoom}
          onSelectRoom={(room: RoomCategory) => {
            setFilters((f) => ({ ...f, selectedRoom: room }));
            setCurrentView('catalog');
          }}
          plantNameForUrl={selectedPlant.name}
        />

        {/* View Routing */}
        <main className="flex-1 w-full relative">
          {currentView === 'home' && (
            <HomeScreen
              plants={PLANTS_DATA}
              onSelectPlant={handleSelectPlant}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onOpenFinder={() => setIsFinderOpen(true)}
              onNavigate={(v) => setCurrentView(v)}
              onShowToast={showToast}
            />
          )}

          {currentView === 'catalog' && (
            <CatalogScreen
              plants={PLANTS_DATA}
              onSelectPlant={handleSelectPlant}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
              onNavigate={(v) => setCurrentView(v)}
              onShowToast={showToast}
            />
          )}

          {currentView === 'detail' && (
            <ProductDetailScreen
              plant={selectedPlant}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.includes(selectedPlant.id)}
              onOpenCareGuide={(type) => setCareGuideType(type)}
              onOpenReviews={() => setIsCommunityOpen(true)}
              onNavigate={(v) => setCurrentView(v)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Mobile Sticky Bottom Navigation Bar (Hidden in wide desktop mode unless toggled) */}
        <div className={deviceView === 'desktop' ? 'hidden' : 'block'}>
          <BottomNav
            currentView={currentView}
            onNavigate={(v) => {
              if (v === 'finder') {
                setIsFinderOpen(true);
              } else if (v === 'community') {
                setIsCommunityOpen(true);
              } else {
                setCurrentView(v);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onExploreCatalog={() => {
          setCurrentView('catalog');
          setIsCartOpen(false);
        }}
        onShowToast={showToast}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        plants={PLANTS_DATA}
        onSelectPlant={handleSelectPlant}
      />

      <PlantFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        plants={PLANTS_DATA}
        onSelectPlant={handleSelectPlant}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onShowToast={showToast}
      />

      <FilterBottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        filters={filters}
        onApplyFilters={handleUpdateFilters}
        onResetFilters={handleResetFilters}
      />

      <CareGuideModal
        careType={careGuideType}
        onClose={() => setCareGuideType(null)}
        plantName={selectedPlant.name}
      />

      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
        onShowToast={showToast}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        wishlistCount={wishlist.length}
        onShowToast={showToast}
        onOpenWishlist={() => {
          handleUpdateFilters({ petOnly: false, lightLevels: [], sizes: [] });
          setCurrentView('catalog');
        }}
      />

      {/* Global Toast */}
      <Toast
        message={toastInfo.message}
        icon={toastInfo.icon}
        show={toastInfo.show}
        actionText={toastInfo.actionText}
        onAction={toastInfo.onAction}
      />
    </div>
  );
}
