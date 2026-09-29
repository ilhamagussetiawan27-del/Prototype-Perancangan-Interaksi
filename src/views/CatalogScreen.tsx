import React, { useState } from 'react';
import { Plant, FilterState, LightLevel, PlantSize, CareDifficulty } from '../types/plant';
import { PlantCard } from '../components/PlantCard';
import { ViewMode } from '../components/Header';

interface CatalogScreenProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onToggleWishlist: (plant: Plant) => void;
  wishlist: string[];
  filters: FilterState;
  onUpdateFilters: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onOpenFilterSheet: () => void;
  onNavigate: (view: ViewMode) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  plants,
  onSelectPlant,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  filters,
  onUpdateFilters,
  onResetFilters,
  onOpenFilterSheet,
  onNavigate,
  onShowToast
}) => {
  const [sortOpen, setSortOpen] = useState(false);

  // Quick toggle helper
  const toggleLight = (val: LightLevel) => {
    const next = filters.lightLevels.includes(val)
      ? filters.lightLevels.filter((x) => x !== val)
      : [...filters.lightLevels, val];
    onUpdateFilters({ lightLevels: next });
  };

  const toggleSize = (val: PlantSize) => {
    const next = filters.sizes.includes(val)
      ? filters.sizes.filter((x) => x !== val)
      : [...filters.sizes, val];
    onUpdateFilters({ sizes: next });
  };

  const toggleDifficulty = (val: CareDifficulty) => {
    const next = filters.difficulties.includes(val)
      ? filters.difficulties.filter((x) => x !== val)
      : [...filters.difficulties, val];
    onUpdateFilters({ difficulties: next });
  };

  const togglePet = () => {
    onUpdateFilters({ petOnly: !filters.petOnly });
  };

  // Filter application
  let filteredPlants = plants.filter((plant) => {
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        plant.name.toLowerCase().includes(q) ||
        plant.latinName.toLowerCase().includes(q) ||
        plant.categoryTag.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.selectedRoom !== 'semua') {
      if (!plant.roomCategories.includes(filters.selectedRoom)) return false;
    }

    if (filters.lightLevels.length > 0) {
      if (!filters.lightLevels.includes(plant.lightLevel)) return false;
    }

    if (filters.sizes.length > 0) {
      if (!filters.sizes.includes(plant.size)) return false;
    }

    if (filters.difficulties.length > 0) {
      if (!filters.difficulties.includes(plant.difficulty)) return false;
    }

    if (filters.petOnly) {
      if (plant.petFriendly !== 'aman') return false;
    }

    if (plant.price > filters.maxPrice) {
      return false;
    }

    return true;
  });

  // Sort application
  if (filters.sortBy === 'harga-terendah') {
    filteredPlants.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'harga-tertinggi') {
    filteredPlants.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'nama') {
    filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // terlaris
    filteredPlants.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  // Count active filter pills
  const activeCount =
    filters.lightLevels.length +
    filters.sizes.length +
    filters.difficulties.length +
    (filters.petOnly ? 1 : 0) +
    (filters.maxPrice < 500000 ? 1 : 0);

  const sortLabelMap = {
    terlaris: 'Terlaris',
    'harga-terendah': 'Harga Terendah',
    'harga-tertinggi': 'Harga Tertinggi',
    nama: 'Nama A-Z'
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 pb-24 flex flex-col gap-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#414943]">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#02341f] transition-colors cursor-pointer"
        >
          Beranda
        </button>
        <span className="material-symbols-outlined text-[13px] text-[#717972]">
          chevron_right
        </span>
        <button
          onClick={() => onNavigate('catalog')}
          className="hover:text-[#02341f] transition-colors cursor-pointer"
        >
          Tanaman Hias
        </button>
        <span className="material-symbols-outlined text-[13px] text-[#717972]">
          chevron_right
        </span>
        <span className="text-[#02341f] font-bold">Semua</span>
      </nav>

      {/* Page Title & Filter Modal Button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-[#02341f] tracking-tight">
            Koleksi Tanaman
          </h1>
          <p className="text-xs text-[#414943]">
            Temukan sahabat hijau ideal untuk sudut ruanganmu
          </p>
        </div>

        <button
          onClick={onOpenFilterSheet}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#e0ebe2] hover:bg-[#dae5dc] rounded-full text-[#02341f] transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span className="text-xs font-bold">Filter</span>
          <span className="w-4 h-4 rounded-full bg-[#02341f] text-white text-[10px] flex items-center justify-center font-bold">
            {activeCount}
          </span>
        </button>
      </div>

      {/* Active Filter Chips Row */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#414943] font-semibold">Filter Aktif:</span>
          {activeCount > 0 && (
            <button
              onClick={() => {
                onResetFilters();
                onShowToast('Semua filter aktif telah dibersihkan', 'refresh');
              }}
              className="text-[#02341f] hover:underline font-bold transition-all cursor-pointer"
            >
              Hapus semua
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.lightLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => toggleLight(lvl)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#02341f] text-white rounded-full text-xs shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span className="capitalize">Cahaya {lvl}</span>
              <span className="material-symbols-outlined text-[13px] leading-none">close</span>
            </button>
          ))}

          {filters.sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => toggleSize(sz)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#02341f] text-white rounded-full text-xs shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span className="capitalize">Ukuran: {sz}</span>
              <span className="material-symbols-outlined text-[13px] leading-none">close</span>
            </button>
          ))}

          {filters.difficulties.map((df) => (
            <button
              key={df}
              onClick={() => toggleDifficulty(df)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#02341f] text-white rounded-full text-xs shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>{df === 'mudah' ? 'Mudah dirawat' : 'Sulit'}</span>
              <span className="material-symbols-outlined text-[13px] leading-none">close</span>
            </button>
          ))}

          {filters.petOnly && (
            <button
              onClick={togglePet}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#02341f] text-white rounded-full text-xs shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>Aman hewan</span>
              <span className="material-symbols-outlined text-[13px] leading-none">close</span>
            </button>
          )}

          {filters.maxPrice < 500000 && (
            <button
              onClick={() => onUpdateFilters({ maxPrice: 500000 })}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#02341f] text-white rounded-full text-xs shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>Maks Rp {(filters.maxPrice / 1000).toFixed(0)}rb</span>
              <span className="material-symbols-outlined text-[13px] leading-none">close</span>
            </button>
          )}

          {activeCount === 0 && (
            <span className="text-xs text-[#717972] italic py-0.5">
              Tidak ada filter aktif (menampilkan seluruh koleksi)
            </span>
          )}
        </div>
      </div>

      {/* Main Catalog Layout (Sidebar on Desktop + Grid on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filter (Matches Desktop Wireframe) */}
        <aside className="hidden lg:flex flex-col gap-4 bg-white p-4 rounded-2xl border border-[#e5f1e7] shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#e5f1e7]">
            <h3 className="font-bold text-sm text-[#02341f] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              <span>Filter Tanaman</span>
            </h3>
            {activeCount > 0 && (
              <button
                onClick={onResetFilters}
                className="text-[11px] text-[#02341f] hover:underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {/* Cahaya */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#141e18]">Cahaya</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { val: 'rendah' as LightLevel, label: 'Rendah' },
                { val: 'sedang' as LightLevel, label: 'Sedang' },
                { val: 'terang' as LightLevel, label: 'Terang' }
              ].map(({ val, label }) => {
                const active = filters.lightLevels.includes(val);
                return (
                  <button
                    key={val}
                    onClick={() => toggleLight(val)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#02341f] text-white shadow-xs'
                        : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ukuran */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#141e18]">Ukuran</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { val: 'kecil' as PlantSize, label: 'Kecil' },
                { val: 'sedang' as PlantSize, label: 'Sedang' },
                { val: 'besar' as PlantSize, label: 'Besar' }
              ].map(({ val, label }) => {
                const active = filters.sizes.includes(val);
                return (
                  <button
                    key={val}
                    onClick={() => toggleSize(val)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#02341f] text-white shadow-xs'
                        : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Perawatan */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#141e18]">Perawatan</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => toggleDifficulty('mudah')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filters.difficulties.includes('mudah')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                }`}
              >
                Mudah
              </button>
              <button
                onClick={() => toggleDifficulty('sulit')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filters.difficulties.includes('sulit')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                }`}
              >
                Sulit
              </button>
            </div>
          </div>

          {/* Hewan Peliharaan */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#141e18]">Hewan Peliharaan</span>
            <button
              onClick={togglePet}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                filters.petOnly
                  ? 'bg-[#02341f] text-white shadow-xs'
                  : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">pets</span>
              <span>Aman untuk hewan</span>
            </button>
          </div>

          {/* Harga Slider */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#e5f1e7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#141e18]">Harga</span>
              <span className="text-[#02341f] font-bold">
                Maks Rp {(filters.maxPrice / 1000).toFixed(0)}rb
              </span>
            </div>
            <input
              type="range"
              min={30000}
              max={500000}
              step={10000}
              value={filters.maxPrice}
              onChange={(e) =>
                onUpdateFilters({ maxPrice: parseInt(e.target.value, 10) })
              }
              className="w-full h-1.5 bg-[#e0ebe2] rounded-lg appearance-none cursor-pointer accent-[#02341f]"
            />
            <div className="flex justify-between text-[10px] text-[#717972]">
              <span>Rp 20rb</span>
              <span>Rp 500rb</span>
            </div>
          </div>
        </aside>

        {/* Right Content Column */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Quick Horizontal Filter Bar (Mobile / Responsive) */}
          <div className="flex flex-col gap-2 p-3 bg-[#ebf7ed] rounded-xl border border-[#e0ebe2]">
            <div className="flex items-center justify-between text-xs text-[#414943]">
              <span className="font-bold text-[#02341f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">filter_alt</span>
                <span>Opsi Filter Cepat</span>
              </span>
              <span className="font-medium text-[#717972]">
                Rp 20rb - Rp {(filters.maxPrice / 1000).toFixed(0)}rb
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {/* Cahaya buttons */}
              <button
                type="button"
                onClick={() => toggleLight('rendah')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  filters.lightLevels.includes('rendah')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">wb_twilight</span>
                <span>Cahaya: Rendah</span>
              </button>

              <button
                type="button"
                onClick={() => toggleLight('sedang')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  filters.lightLevels.includes('sedang')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">partly_cloudy_day</span>
                <span>Sedang</span>
              </button>

              <button
                type="button"
                onClick={() => toggleLight('terang')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  filters.lightLevels.includes('terang')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">sunny</span>
                <span>Terang</span>
              </button>

              {/* Ukuran buttons */}
              <button
                type="button"
                onClick={() => toggleSize('kecil')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  filters.sizes.includes('kecil')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                Kecil
              </button>

              <button
                type="button"
                onClick={() => toggleSize('sedang')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  filters.sizes.includes('sedang')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                Ukuran: Sedang
              </button>

              <button
                type="button"
                onClick={() => toggleSize('besar')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  filters.sizes.includes('besar')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                Besar
              </button>

              {/* Mudah & Hewan */}
              <button
                type="button"
                onClick={() => toggleDifficulty('mudah')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  filters.difficulties.includes('mudah')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">eco</span>
                <span>Mudah</span>
              </button>

              <button
                type="button"
                onClick={() => toggleDifficulty('sulit')}
                className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  filters.difficulties.includes('sulit')
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                Sulit
              </button>

              <button
                type="button"
                onClick={togglePet}
                className={`px-2.5 py-1 rounded-full text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  filters.petOnly
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#e5f1e7]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">pets</span>
                <span>Aman hewan</span>
              </button>
            </div>
          </div>

          {/* Results Count & Sorting Header Bar */}
          <div className="flex items-center justify-between pt-1 relative z-20">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#02341f]">
                Menampilkan {filteredPlants.length} tanaman
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#43664d]" />
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ebf7ed] text-xs font-semibold text-[#141e18] hover:bg-[#e0ebe2] transition-colors cursor-pointer"
              >
                <span>Urutkan: {sortLabelMap[filters.sortBy]}</span>
                <span
                  className={`material-symbols-outlined text-[16px] text-[#717972] transition-transform duration-200 ${
                    sortOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Sort Menu */}
              {sortOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-xl z-30 py-1 flex flex-col border border-[#e5f1e7] animate-in fade-in"
                  onClick={() => setSortOpen(false)}
                >
                  {(
                    [
                      { key: 'terlaris', label: 'Terlaris' },
                      { key: 'harga-terendah', label: 'Harga Terendah' },
                      { key: 'harga-tertinggi', label: 'Harga Tertinggi' },
                      { key: 'nama', label: 'Nama A-Z' }
                    ] as const
                  ).map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => {
                        onUpdateFilters({ sortBy: key });
                        onShowToast(`Urutkan: ${label}`);
                      }}
                      className={`px-3.5 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                        filters.sortBy === key
                          ? 'font-bold text-[#02341f] bg-[#ebf7ed]'
                          : 'text-[#141e18] hover:bg-[#ebf7ed]'
                      }`}
                    >
                      <span>{label}</span>
                      {filters.sortBy === key && (
                        <span className="material-symbols-outlined text-[15px] text-[#02341f]">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Plant Cards Grid (2-columns on mobile, 3-columns on desktop) */}
          {filteredPlants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-[#e5f1e7] p-6">
              <span className="material-symbols-outlined text-[#717972] text-[48px] mb-2">
                filter_alt_off
              </span>
              <h3 className="font-bold text-sm text-[#141e18]">
                Tidak ada tanaman yang cocok dengan filter
              </h3>
              <p className="text-xs text-[#414943] mt-1 max-w-xs">
                Coba sesuaikan filter pencahayaan atau hapus batasan harga untuk menemukan tanaman lainnya.
              </p>
              <button
                onClick={onResetFilters}
                className="mt-4 px-4 py-2 bg-[#02341f] text-white rounded-xl text-xs font-semibold hover:bg-[#1e4b34] transition-all cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onSelect={onSelectPlant}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.includes(plant.id)}
                />
              ))}
            </div>
          )}

          {/* Botanical Guarantee Banner */}
          <div
            onClick={() => onShowToast('🛡️ Garansi sampai selamat ke seluruh Indonesia!')}
            className="flex items-center gap-3 p-3.5 bg-[#e0ebe2] rounded-xl mt-3 cursor-pointer hover:bg-[#dae5dc] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#02341f] flex items-center justify-center text-white shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm text-[#02341f]">
                Garansi Sampai Segar
              </span>
              <span className="text-[11px] text-[#414943]">
                Pengemasan aman berlapis sabut kelapa khusus ke seluruh Indonesia.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
