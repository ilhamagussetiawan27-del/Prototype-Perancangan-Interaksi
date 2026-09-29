import React, { useState } from 'react';
import { RoomCategory } from '../types/plant';

export type ViewMode = 'home' | 'catalog' | 'detail' | 'finder' | 'community';
export type DeviceView = 'responsive' | 'mobile' | 'desktop';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  deviceView: DeviceView;
  onChangeDeviceView: (dev: DeviceView) => void;
  selectedRoom: RoomCategory;
  onSelectRoom: (room: RoomCategory) => void;
  plantNameForUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenProfile,
  deviceView,
  onChangeDeviceView,
  selectedRoom,
  onSelectRoom,
  plantNameForUrl = 'monstera'
}) => {
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);

  // Compute simulated browser URL matching the wireframes
  const browserUrl =
    currentView === 'home'
      ? 'littleseed.com'
      : currentView === 'catalog'
      ? 'littleseed.com/tanaman-hias'
      : currentView === 'detail'
      ? `littleseed.com/tanaman/${plantNameForUrl.toLowerCase().replace(/\s+/g, '-')}`
      : currentView === 'finder'
      ? 'littleseed.com/plant-finder'
      : 'littleseed.com/komunitas';

  return (
    <div className="w-full">
      {/* Top Device Viewport Switcher & Simulated Browser Bar */}
      <div className="bg-[#e0ebe2] border-b border-[#dae5dc] px-3 py-1.5 flex items-center justify-between text-xs select-none">
        {/* Browser dots & URL */}
        <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]/40 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#43664d]/30 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#02341f]/30 inline-block" />
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-md border border-[#c1c9c1]/60 text-[11px] text-[#414943] font-mono truncate max-w-xs sm:max-w-md shadow-xs">
            <span className="material-symbols-outlined text-[13px] text-[#43664d]">lock</span>
            <span className="truncate">{browserUrl}</span>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#ebf7ed] p-0.5 rounded-lg border border-[#c1c9c1]/50 shrink-0">
          <button
            onClick={() => onChangeDeviceView('responsive')}
            title="Tampilan Responsif Otomatis"
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'responsive'
                ? 'bg-[#02341f] text-white shadow-xs'
                : 'text-[#414943] hover:text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">devices</span>
            <span className="hidden md:inline">Responsif</span>
          </button>
          <button
            onClick={() => onChangeDeviceView('mobile')}
            title="Tampilan Layar Mobile (App)"
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'mobile'
                ? 'bg-[#02341f] text-white shadow-xs'
                : 'text-[#414943] hover:text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">smartphone</span>
            <span className="hidden md:inline">Mobile</span>
          </button>
          <button
            onClick={() => onChangeDeviceView('desktop')}
            title="Tampilan Layar Desktop (Wireframe)"
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${
              deviceView === 'desktop'
                ? 'bg-[#02341f] text-white shadow-xs'
                : 'text-[#414943] hover:text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">desktop_windows</span>
            <span className="hidden md:inline">Desktop</span>
          </button>
        </div>
      </div>

      {/* Main Header Content */}
      <header className="w-full bg-[#f1fcf3]/95 backdrop-blur-xl border-b border-[#e5f1e7] shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40">
        {/* Top Header Row */}
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Brand Logo & Wordmark */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWnkC7ZXdHGtEF-0N0rsrYAanHyZ9zN7B6p0p3qFQZ0i4qX91zzXTdfwA2OAv1ewQ6BYwtya5Uw_RaJxHvYXOeav5zdzOv5DJuiOu17BG-3Kt37BciDhoh1hNDw106Z3fS6yS4Zy9q9o3vVxf6ZACMl0Pjx2D2v9dez1MOtY6AdXoDsUA-R00v6ytOihe2CsmfXzS_YswtLUwK07FpV0zphjVPq-X-G-EmEHhkcHeGhtfwdpPAcfWs"
              alt="LittleSeed Plants"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg text-[#02341f] leading-none tracking-tight">
                LittleSeed Plants
              </span>
              <span className="text-[10px] font-semibold text-[#414943] leading-none mt-0.5">
                {currentView === 'catalog' ? 'Catalog' : currentView === 'detail' ? 'Product Detail' : 'Home'}
              </span>
            </div>
          </div>

          {/* Search Bar (Center in Desktop) */}
          <div
            onClick={onOpenSearch}
            className="flex-1 max-w-md hidden sm:flex items-center bg-white rounded-full px-3.5 py-1.5 border border-[#dae5dc] hover:border-[#02341f] shadow-xs cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[#717972] text-[18px] mr-2">
              search
            </span>
            <input
              type="text"
              readOnly
              placeholder="Cari tanaman, kategori, atau tips perawatan..."
              className="w-full bg-transparent text-xs text-[#141e18] placeholder-[#717972] focus:outline-none cursor-pointer"
            />
          </div>

          {/* Right Action Icons: Masuk / Profile & Keranjang */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenProfile}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#02341f] hover:bg-[#ebf7ed] rounded-lg transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Masuk</span>
            </button>

            <button
              onClick={onOpenProfile}
              className="sm:hidden w-8 h-8 rounded-full bg-[#02341f] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">person</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="Keranjang belanja"
              className="relative px-3 py-1.5 flex items-center gap-1.5 rounded-full bg-[#ebf7ed] hover:bg-[#e0ebe2] text-[#02341f] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="hidden sm:inline">Keranjang ({cartCount})</span>
              <span className="sm:hidden min-w-[18px] h-[18px] px-1 bg-[#02341f] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row (visible on small screens) */}
        <div className="sm:hidden px-4 pb-2.5">
          <div
            onClick={onOpenSearch}
            className="w-full flex items-center bg-white rounded-full px-3 py-1.5 border border-[#dae5dc] shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#717972] text-[17px] mr-2">
              search
            </span>
            <input
              type="text"
              readOnly
              placeholder="Cari tanaman, kategori, atau tips perawatan..."
              className="w-full bg-transparent text-xs text-[#141e18] placeholder-[#717972] focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Desktop Category Navigation Tabs Bar (Matches Desktop Wireframes) */}
        <div className="hidden sm:block border-t border-[#e5f1e7] bg-[#ebf7ed]/50">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 overflow-x-auto text-xs font-semibold text-[#141e18]">
            <button
              onClick={() => onNavigate('catalog')}
              className={`px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'catalog'
                  ? 'border-[#02341f] text-[#02341f] bg-white/60 font-bold'
                  : 'border-transparent text-[#414943] hover:text-[#02341f]'
              }`}
            >
              Jenis Tanaman
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-3 py-2 border-b-2 border-transparent text-[#414943] hover:text-[#02341f] transition-all cursor-pointer whitespace-nowrap"
            >
              Ukuran
            </button>

            {/* Ruangan Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoomDropdownOpen(!roomDropdownOpen)}
                className={`px-3 py-2 border-b-2 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
                  selectedRoom !== 'semua'
                    ? 'border-[#02341f] text-[#02341f] font-bold bg-white/60'
                    : 'border-transparent text-[#414943] hover:text-[#02341f]'
                }`}
              >
                <span>Ruangan {selectedRoom !== 'semua' ? `(${selectedRoom})` : '▾'}</span>
              </button>
              {roomDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-[#e5f1e7] py-1 z-50 flex flex-col animate-in fade-in"
                  onClick={() => setRoomDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      onSelectRoom('semua');
                      onNavigate('catalog');
                    }}
                    className="px-3 py-2 text-left hover:bg-[#ebf7ed] text-xs font-medium"
                  >
                    Semua Ruang
                  </button>
                  <button
                    onClick={() => {
                      onSelectRoom('tamu');
                      onNavigate('catalog');
                    }}
                    className="px-3 py-2 text-left hover:bg-[#ebf7ed] text-xs font-medium"
                  >
                    Ruang Tamu
                  </button>
                  <button
                    onClick={() => {
                      onSelectRoom('tidur');
                      onNavigate('catalog');
                    }}
                    className="px-3 py-2 text-left hover:bg-[#ebf7ed] text-xs font-medium"
                  >
                    Kamar Tidur
                  </button>
                  <button
                    onClick={() => {
                      onSelectRoom('kantor');
                      onNavigate('catalog');
                    }}
                    className="px-3 py-2 text-left hover:bg-[#ebf7ed] text-xs font-medium"
                  >
                    Kantor / Meja Kerja
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('catalog')}
              className="px-3 py-2 border-b-2 border-transparent text-[#414943] hover:text-[#02341f] transition-all cursor-pointer whitespace-nowrap"
            >
              Tingkat Perawatan
            </button>
            <button
              onClick={() => onNavigate('finder')}
              className={`px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'finder'
                  ? 'border-[#02341f] text-[#02341f] bg-white/60 font-bold'
                  : 'border-transparent text-[#414943] hover:text-[#02341f]'
              }`}
            >
              Plant Finder
            </button>
            <button
              onClick={() => onNavigate('community')}
              className={`px-3 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'community'
                  ? 'border-[#02341f] text-[#02341f] bg-white/60 font-bold'
                  : 'border-transparent text-[#414943] hover:text-[#02341f]'
              }`}
            >
              Komunitas
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
