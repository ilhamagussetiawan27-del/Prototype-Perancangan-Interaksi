import React, { useState } from 'react';
import { Plant } from '../types/plant';
import { CareType } from '../components/CareGuideModal';
import { ViewMode } from '../components/Header';

interface ProductDetailScreenProps {
  plant: Plant;
  onAddToCart: (plant: Plant, quantity: number) => void;
  onToggleWishlist: (plant: Plant) => void;
  isWishlisted: boolean;
  onOpenCareGuide: (type: CareType) => void;
  onOpenReviews: () => void;
  onNavigate: (view: ViewMode) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  plant,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenCareGuide,
  onOpenReviews,
  onNavigate,
  onShowToast
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    desc: true,
    tips: false,
    specs: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleAddToCart = () => {
    onAddToCart(plant, quantity);
    onShowToast(`${plant.name} (${quantity}x) ditambahkan ke keranjang! 🌱`, 'shopping_cart');
  };

  const currentImageUrl = plant.gallery[selectedImageIdx] || plant.image;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 pb-24 flex flex-col gap-4">
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
        <span className="text-[#02341f] font-bold truncate max-w-[140px] sm:max-w-none">
          {plant.name}
        </span>
      </nav>

      {/* Main Two-Column Layout on Desktop, Vertical on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Gallery Section */}
        <section className="flex flex-col gap-2.5">
          {/* Big Featured Photo */}
          <div className="relative w-full aspect-square rounded-2xl bg-[#ebf7ed] overflow-hidden shadow-xs border border-[#e5f1e7]">
            <img
              src={currentImageUrl}
              alt={plant.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Ready Stock Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#02341f] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#141e18]">
                Tersedia (Ready Stock)
              </span>
            </div>

            {/* Wishlist Heart Button */}
            <button
              onClick={() => onToggleWishlist(plant)}
              aria-label="Favoritkan tanaman"
              className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs transition-all active:scale-75 cursor-pointer ${
                isWishlisted ? 'text-[#ba1a1a]' : 'text-[#414943] hover:text-[#ba1a1a]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            {/* Image index indicator */}
            <div className="absolute bottom-3 right-3 bg-[#141e18]/75 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm select-none">
              {selectedImageIdx + 1} / {plant.gallery.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 gap-2">
            {plant.gallery.map((thumbUrl, idx) => {
              const active = selectedImageIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`aspect-square rounded-xl bg-[#ebf7ed] p-0.5 overflow-hidden transition-all shadow-xs cursor-pointer border-2 ${
                    active
                      ? 'border-[#02341f] ring-2 ring-[#02341f]/20 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`${plant.name} tampilan ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Details Section */}
        <section className="flex flex-col gap-4">
          {/* Title & Tag */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#c2e9c9] text-[#02341f] px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                {plant.categoryTag}
              </span>
              <span className="text-xs text-[#414943] italic">{plant.latinName}</span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <h2 className="text-2xl font-bold text-[#141e18]">{plant.name}</h2>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-bold text-[#02341f]">
                  Rp {plant.price.toLocaleString('id-ID')}
                </span>
                {plant.originalPrice && (
                  <span className="text-xs text-[#717972] line-through block">
                    Rp {plant.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Care Summary Metric Cards */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-bold text-[#141e18]">Ringkasan perawatan</h3>
              <span className="text-[#43664d] font-semibold">{plant.difficultyLabel}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Cahaya */}
              <button
                onClick={() => onOpenCareGuide('cahaya')}
                className="bg-[#ebf7ed] rounded-xl p-2 flex flex-col items-center text-center justify-between min-h-[82px] shadow-xs hover:bg-[#e0ebe2] active:scale-95 transition-all cursor-pointer group border border-[#e5f1e7]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#02341f] group-hover:scale-110 transition-transform">
                  wb_sunny
                </span>
                <div className="w-full">
                  <p className="text-[10px] text-[#414943]">Cahaya</p>
                  <p className="text-xs font-bold text-[#141e18] truncate">
                    {plant.lightLabel}
                  </p>
                </div>
              </button>

              {/* Siram */}
              <button
                onClick={() => onOpenCareGuide('siram')}
                className="bg-[#ebf7ed] rounded-xl p-2 flex flex-col items-center text-center justify-between min-h-[82px] shadow-xs hover:bg-[#e0ebe2] active:scale-95 transition-all cursor-pointer group border border-[#e5f1e7]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#02341f] group-hover:scale-110 transition-transform">
                  water_drop
                </span>
                <div className="w-full">
                  <p className="text-[10px] text-[#414943]">Siram</p>
                  <p className="text-xs font-bold text-[#141e18] truncate">
                    {plant.wateringFrequency}
                  </p>
                </div>
              </button>

              {/* Hewan */}
              <button
                onClick={() => onOpenCareGuide('hewan')}
                className="bg-[#ebf7ed] rounded-xl p-2 flex flex-col items-center text-center justify-between min-h-[82px] shadow-xs hover:bg-[#e0ebe2] active:scale-95 transition-all cursor-pointer group border border-[#e5f1e7]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#02341f] group-hover:scale-110 transition-transform">
                  pets
                </span>
                <div className="w-full">
                  <p className="text-[10px] text-[#414943]">Hewan</p>
                  <p className="text-xs font-bold text-[#141e18] truncate">
                    {plant.petLabel}
                  </p>
                </div>
              </button>

              {/* Tinggi */}
              <button
                onClick={() => onOpenCareGuide('tinggi')}
                className="bg-[#ebf7ed] rounded-xl p-2 flex flex-col items-center text-center justify-between min-h-[82px] shadow-xs hover:bg-[#e0ebe2] active:scale-95 transition-all cursor-pointer group border border-[#e5f1e7]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#02341f] group-hover:scale-110 transition-transform">
                  straighten
                </span>
                <div className="w-full">
                  <p className="text-[10px] text-[#414943]">Tinggi</p>
                  <p className="text-xs font-bold text-[#141e18] truncate">
                    {plant.heightCm} cm
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quantity Stepper & Add to Cart */}
          <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-xs border border-[#e5f1e7]">
            {/* Stepper */}
            <div className="flex items-center bg-[#ebf7ed] rounded-lg p-1">
              <button
                onClick={() => handleQtyChange(-1)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-[#141e18] hover:bg-[#e0ebe2] active:scale-90 transition-all font-bold"
              >
                −
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#141e18] select-none">
                {quantity}
              </span>
              <button
                onClick={() => handleQtyChange(1)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-[#141e18] hover:bg-[#e0ebe2] active:scale-90 transition-all font-bold"
              >
                +
              </button>
            </div>

            {/* Buy button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 h-11 bg-[#02341f] text-white rounded-lg flex items-center justify-center gap-2 px-4 text-xs sm:text-sm font-bold shadow-md hover:bg-[#1e4b34] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Tambah ke keranjang</span>
            </button>
          </div>

          {/* Expandable Accordions */}
          <div className="flex flex-col gap-2">
            {/* Accordion 1: Deskripsi singkat */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5f1e7]">
              <button
                onClick={() => toggleAccordion('desc')}
                className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-[#ebf7ed]/50 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-[#141e18] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                    eco
                  </span>
                  <span>Deskripsi singkat</span>
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#717972] transition-transform duration-200 ${
                    openAccordions.desc ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openAccordions.desc && (
                <div className="px-3.5 pb-3 pt-1 text-xs text-[#414943] leading-relaxed border-t border-[#f1fcf3]">
                  {plant.description}
                </div>
              )}
            </div>

            {/* Accordion 2: Tips perawatan */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5f1e7]">
              <button
                onClick={() => toggleAccordion('tips')}
                className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-[#ebf7ed]/50 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-[#141e18] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                    psychology_alt
                  </span>
                  <span>Tips perawatan</span>
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#717972] transition-transform duration-200 ${
                    openAccordions.tips ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openAccordions.tips && (
                <div className="px-3.5 pb-3 pt-1 text-xs text-[#414943] leading-relaxed border-t border-[#f1fcf3] space-y-1.5">
                  <p>• <strong>Cahaya:</strong> {plant.careDetails.light}</p>
                  <p>• <strong>Air & Penyiraman:</strong> {plant.careDetails.water}</p>
                  <p>• <strong>Perawatan Daun:</strong> {plant.careDetails.leafCare}</p>
                  <p>• <strong>Kelembapan:</strong> {plant.careDetails.humidity}</p>
                </div>
              )}
            </div>

            {/* Accordion 3: Detail lanjutan */}
            <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e5f1e7]">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-[#ebf7ed]/50 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold text-[#141e18] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                    inventory_2
                  </span>
                  <span>Detail lanjutan</span>
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#717972] transition-transform duration-200 ${
                    openAccordions.specs ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openAccordions.specs && (
                <div className="px-3.5 pb-3 pt-1 text-xs text-[#414943] leading-relaxed border-t border-[#f1fcf3] space-y-1.5">
                  <p>• <strong>Ukuran Pot:</strong> {plant.specifications.potSize}</p>
                  <p>• <strong>Material Pot:</strong> {plant.specifications.potMaterial}</p>
                  <p>• <strong>Media Tanam:</strong> {plant.specifications.soilMix}</p>
                  <p>• <strong>Garansi Pengiriman:</strong> {plant.specifications.shippingGuarantee}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Community Tips & Reviews Section */}
      <section className="pt-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#02341f] text-[20px]">
              forum
            </span>
            <h3 className="font-bold text-sm sm:text-base text-[#141e18]">
              Tips dari komunitas
            </h3>
          </div>
          <button
            onClick={onOpenReviews}
            className="text-xs font-semibold text-[#02341f] hover:underline cursor-pointer"
          >
            Lihat semua →
          </button>
        </div>

        {/* Horizontal Scroll Reviews */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {plant.reviews.map((rev) => (
            <div
              key={rev.id}
              onClick={onOpenReviews}
              className="min-w-[240px] max-w-[270px] bg-white rounded-xl p-3 flex flex-col justify-between shrink-0 shadow-xs border border-[#e5f1e7] cursor-pointer hover:bg-[#ebf7ed]/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1 text-[#02341f] mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#141e18] leading-snug line-clamp-3">
                  “{rev.comment}”
                </p>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#f1fcf3]">
                <div className="w-6 h-6 rounded-full bg-[#1e4b34] text-white flex items-center justify-center text-[10px] font-bold">
                  {rev.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#141e18] truncate">{rev.author}</p>
                  <p className="text-[10px] text-[#414943] truncate">
                    {rev.location} • {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botanical Guarantee Banner */}
      <section
        onClick={() => onShowToast('🛡️ Garansi 14 Hari Tanaman Sehat aktif!')}
        className="bg-[#e0ebe2] rounded-xl p-3.5 flex items-center gap-3 shadow-xs cursor-pointer hover:bg-[#dae5dc] transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-[#02341f] flex items-center justify-center text-white shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">verified</span>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-bold text-[#02341f]">
            Garansi 14 Hari Tanaman Sehat
          </p>
          <p className="text-[11px] text-[#414943]">
            Jika tanaman layu atau rusak dalam perjalanan, kami ganti baru gratis tanpa biaya tambahan.
          </p>
        </div>
      </section>
    </div>
  );
};
