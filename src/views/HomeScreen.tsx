import React, { useState } from 'react';
import { Plant, RoomCategory } from '../types/plant';
import { PlantCard } from '../components/PlantCard';
import { ViewMode } from '../components/Header';

interface HomeScreenProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onToggleWishlist: (plant: Plant) => void;
  wishlist: string[];
  onOpenFinder: () => void;
  onNavigate: (view: ViewMode) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  plants,
  onSelectPlant,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenFinder,
  onNavigate,
  onShowToast
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomCategory>('semua');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [tipExpanded, setTipExpanded] = useState(true);

  // Filter bestselling plants
  const filteredBestsellers = plants.filter((plant) => {
    const roomMatch = selectedRoom === 'semua' || plant.roomCategories.includes(selectedRoom);
    let featureMatch = true;
    if (activeFeature === 'light') {
      featureMatch = plant.lightLevel === 'sedang' || plant.lightLevel === 'terang';
    } else if (activeFeature === 'pet') {
      featureMatch = plant.petFriendly === 'aman';
    } else if (activeFeature === 'beginner') {
      featureMatch = plant.difficulty === 'mudah';
    }
    return roomMatch && featureMatch;
  });

  const handleRoomClick = (room: RoomCategory) => {
    setSelectedRoom(room);
    onShowToast(`Menampilkan tanaman untuk: ${room === 'semua' ? 'Semua Ruang' : room}`, 'filter_alt');
  };

  const handleFeatureToggle = (feature: string, label: string) => {
    if (activeFeature === feature) {
      setActiveFeature(null);
      onShowToast('Filter fitur dinonaktifkan', 'filter_alt_off');
    } else {
      setActiveFeature(feature);
      onShowToast(`Filter aktif: ${label}`, 'filter_alt');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto px-4 py-4 pb-20">
      {/* 1. Hero Campaign Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-[#e0ebe2] shadow-sm p-6 sm:p-10 flex flex-col items-center text-center justify-center min-h-[220px]">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#c2e9c9]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#bdeece]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-md">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[#02341f] text-xs font-semibold mb-2.5 shadow-xs">
            <span className="material-symbols-outlined text-[15px]">eco</span>
            <span>Koleksi Rumah Tropis</span>
          </span>

          <h2 className="text-xl sm:text-3xl font-bold text-[#02341f] tracking-tight mb-2 leading-tight">
            Tanaman yang pas untuk ruanganmu
          </h2>

          <p className="text-xs sm:text-sm text-[#414943] mb-5 leading-relaxed">
            Hadirkan kesegaran alami, tingkatkan fokus, dan segarkan udara di setiap sudut hunian.
          </p>

          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center justify-center gap-2 bg-[#02341f] hover:bg-[#1e4b34] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>Cari tanaman yang cocok</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 2. Belanja per Ruangan & Plant Form Styles */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg text-[#02341f]">
            Belanja per ruangan
          </h3>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-[#43664d] hover:underline cursor-pointer"
          >
            Lihat semua
          </button>
        </div>

        {/* Room Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'semua' as RoomCategory, label: 'Semua Ruang' },
            { id: 'tamu' as RoomCategory, label: 'Ruang Tamu' },
            { id: 'tidur' as RoomCategory, label: 'Kamar Tidur' },
            { id: 'kantor' as RoomCategory, label: 'Kantor / Meja Kerja' }
          ].map((room) => {
            const active = selectedRoom === room.id;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                  active
                    ? 'bg-[#02341f] text-white shadow-xs'
                    : 'bg-white text-[#414943] hover:bg-[#ebf7ed] border border-[#e5f1e7]'
                }`}
              >
                {room.label}
              </button>
            );
          })}
        </div>

        {/* 3 Plant Form Type Cards */}
        <div className="grid grid-cols-3 gap-2.5 mt-1">
          {/* Tanaman Lantai */}
          <div
            onClick={() => {
              onShowToast('Membuka koleksi Tanaman Lantai', 'nature');
              onNavigate('catalog');
            }}
            className="flex flex-col items-center bg-white rounded-xl p-2.5 shadow-xs hover:shadow-md border border-[#e5f1e7] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#ebf7ed] mb-2 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgpe4-VAFErN_kmUPqCaabJVJq1bd_0dt_amRml0_xUzh-pFEK1VpT8cEYIWV_dVTxPCvDOOhAY-VkaJnrgJ8tkSMo5CJYUduZ0C5DbCl9T8TdA3bXgtTpAqjHyBsVmXbM8BZ6Y0UqIcCSxCMlrSgw8zhLxiqG11ofTvF56jm0wrt-BiUpZxSSnhSE3JPgrBFJuyTrtk_FVghxbVqQNV5O--0GCwdaOfsi7vp-0bRuzh5ujP2TI_Iu"
                alt="Tanaman Lantai"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold text-[#141e18] text-center">
              Tanaman Lantai
            </span>
            <span className="text-[10px] text-[#414943]">Tinggi & tegak</span>
          </div>

          {/* Tanaman Gantung */}
          <div
            onClick={() => {
              onShowToast('Membuka koleksi Tanaman Gantung', 'nature');
              onNavigate('catalog');
            }}
            className="flex flex-col items-center bg-white rounded-xl p-2.5 shadow-xs hover:shadow-md border border-[#e5f1e7] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#ebf7ed] mb-2 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUPlja37lFLZgmMoEVeR6hS1puQfP72_szRLCKDtE3HC8vy4GqmTxC6GJ0LvRFp-u2N_pXXokVA4Oq88Gk1r6b4PHmZ2-zKRFXeznu-XCBukmaEOzwevh9t-3PZ10Ob3cBwNqC2szmo-O021gyLuFhu7zuMPCbD39K1N8y6S1dBBPSYo-4OZ_xTvqYY9FXoSPDWqxmz-5t4FvfMMJaWuDblthk2Gps2f0RfQGHIHrY7bEJWqkmXM_J"
                alt="Tanaman Gantung"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold text-[#141e18] text-center">
              Tanaman Gantung
            </span>
            <span className="text-[10px] text-[#414943]">Menjuntai indah</span>
          </div>

          {/* Tanaman Meja */}
          <div
            onClick={() => {
              onShowToast('Membuka koleksi Tanaman Meja', 'nature');
              onNavigate('catalog');
            }}
            className="flex flex-col items-center bg-white rounded-xl p-2.5 shadow-xs hover:shadow-md border border-[#e5f1e7] transition-all cursor-pointer group active:scale-95"
          >
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#ebf7ed] mb-2 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFHC2QQydNP8SSmUORH4p09Ib26coNjNGsTaqKBnsdUVLTWDPxXQdyAFoCRL_ucOAl7j5dEcB-YYvm0vSix_mDYXFlE5BQ7hSUGvJEtsVqIuO4ehb_gYnu1Jmom1iQDmdqdkgLsqoFKjrJLTsCD2W-kP4VXRPm9o0EzfximH9TEtEwzGglcqoALxov4wkOiMvRHMkSJbHrZoZnbwSHOqJjMq_tB7M6DdJ6ZMeJmHZ2UufhFRGfOCE2"
                alt="Tanaman Meja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold text-[#141e18] text-center">
              Tanaman Meja
            </span>
            <span className="text-[10px] text-[#414943]">Ringkas & imut</span>
          </div>
        </div>
      </section>

      {/* 3. Quick Feature Benefits Grid (2x2) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div
          onClick={() => handleFeatureToggle('light', 'Ruang Terang')}
          className={`p-3 rounded-xl shadow-xs flex items-center gap-2.5 transition-all cursor-pointer border ${
            activeFeature === 'light'
              ? 'bg-[#02341f] text-white border-[#02341f]'
              : 'bg-white hover:bg-[#ebf7ed] text-[#141e18] border-[#e5f1e7]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              activeFeature === 'light'
                ? 'bg-white/20 text-white'
                : 'bg-[#c2e9c9] text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Ruang terang</span>
            <span className={`text-[10px] truncate ${activeFeature === 'light' ? 'text-white/80' : 'text-[#414943]'}`}>
              Suka cahaya
            </span>
          </div>
        </div>

        <div
          onClick={() => handleFeatureToggle('pet', 'Aman untuk Hewan')}
          className={`p-3 rounded-xl shadow-xs flex items-center gap-2.5 transition-all cursor-pointer border ${
            activeFeature === 'pet'
              ? 'bg-[#02341f] text-white border-[#02341f]'
              : 'bg-white hover:bg-[#ebf7ed] text-[#141e18] border-[#e5f1e7]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              activeFeature === 'pet'
                ? 'bg-white/20 text-white'
                : 'bg-[#c2e9c9] text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">pets</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Aman untuk hewan</span>
            <span className={`text-[10px] truncate ${activeFeature === 'pet' ? 'text-white/80' : 'text-[#414943]'}`}>
              Bebas racun
            </span>
          </div>
        </div>

        <div
          onClick={() => handleFeatureToggle('beginner', 'Untuk Pemula')}
          className={`p-3 rounded-xl shadow-xs flex items-center gap-2.5 transition-all cursor-pointer border ${
            activeFeature === 'beginner'
              ? 'bg-[#02341f] text-white border-[#02341f]'
              : 'bg-white hover:bg-[#ebf7ed] text-[#141e18] border-[#e5f1e7]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              activeFeature === 'beginner'
                ? 'bg-white/20 text-white'
                : 'bg-[#c2e9c9] text-[#02341f]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Untuk pemula</span>
            <span className={`text-[10px] truncate ${activeFeature === 'beginner' ? 'text-white/80' : 'text-[#414943]'}`}>
              Mudah dirawat
            </span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('community')}
          className="p-3 rounded-xl shadow-xs flex items-center gap-2.5 transition-all cursor-pointer border bg-white hover:bg-[#ebf7ed] text-[#141e18] border-[#e5f1e7]"
        >
          <div className="w-8 h-8 rounded-full bg-[#c2e9c9] text-[#02341f] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">groups</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate">Tips komunitas</span>
            <span className="text-[10px] text-[#414943] truncate">Belajar bareng</span>
          </div>
        </div>
      </section>

      {/* 4. Interactive Plant Finder Teaser Banner */}
      <section className="bg-[#1e4b34] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex items-center justify-between gap-4">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#bdeece]/15 rounded-full pointer-events-none" />
        <div className="flex flex-col max-w-xs z-10">
          <span className="font-bold text-base sm:text-lg">Bingung pilih?</span>
          <p className="text-xs text-[#8bba9d] mt-0.5 mb-3 leading-relaxed">
            Jawab 4 pertanyaan singkat untuk rekomendasi pas sesuai kondisi ruanganmu.
          </p>
          <div>
            <button
              onClick={onOpenFinder}
              className="inline-flex items-center gap-1.5 bg-white text-[#02341f] hover:bg-[#f1fcf3] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              <span>Coba Plant Finder</span>
            </button>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-[#bdeece]/20 flex items-center justify-center text-[#bdeece] shrink-0 z-10">
          <span className="material-symbols-outlined text-[36px]">psychology</span>
        </div>
      </section>

      {/* 5. Terlaris (Bestsellers) Grid */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base sm:text-lg text-[#02341f]">
              Terlaris
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#c2e9c9] text-[#02341f] text-[10px] font-bold">
              Populer ({filteredBestsellers.length})
            </span>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-[#43664d] hover:underline cursor-pointer"
          >
            Semua katalog
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredBestsellers.slice(0, 4).map((plant) => (
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
      </section>

      {/* 6. Community Care Tip Highlight Accordion */}
      <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#e5f1e7]">
        <div
          onClick={() => setTipExpanded(!tipExpanded)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#43664d] text-[20px]">
              lightbulb
            </span>
            <h4 className="font-bold text-sm text-[#02341f]">
              Tips Hari Ini untuk Pemula
            </h4>
          </div>
          <span
            className={`material-symbols-outlined text-[#717972] text-[20px] transition-transform duration-200 ${
              tipExpanded ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </div>

        {tipExpanded && (
          <div className="pt-2 animate-in fade-in duration-200">
            <p className="text-xs text-[#414943] leading-relaxed">
              "Jangan siram tanaman berdasarkan jadwal kaku. Sentuh permukaan tanah sedalam 2 cm — jika terasa kering dan ringan, barulah beri air secukupnya."
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#f1fcf3]">
              <span className="text-[11px] text-[#717972]">
                Oleh Sari P. • Komunitas LittleSeed
              </span>
              <button
                onClick={() => onNavigate('community')}
                className="text-[#43664d] text-xs font-semibold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>Diskusi (14)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 7. Guarantee Footer Badge */}
      <div
        onClick={() => onShowToast('🛡️ Garansi 100% uang kembali atau kirim ulang jika tanaman rusak')}
        className="flex items-center gap-3 p-3.5 bg-[#e0ebe2] rounded-2xl shadow-xs cursor-pointer hover:bg-[#dae5dc] transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-[#02341f] flex items-center justify-center text-white shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">local_shipping</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xs sm:text-sm text-[#02341f]">
            Garansi Sampai Segar Seluruh Indonesia
          </span>
          <span className="text-[11px] text-[#414943]">
            Pengemasan aman berlapis sabut kelapa khusus agar helai daun tetap segar dan lembap.
          </span>
        </div>
      </div>
    </div>
  );
};
