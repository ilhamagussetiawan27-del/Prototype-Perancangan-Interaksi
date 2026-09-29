import React, { useState } from 'react';
import { Plant } from '../types/plant';

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onToggleWishlist: (plant: Plant) => void;
  isWishlisted: boolean;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(plant);
  };

  return (
    <div
      onClick={() => onSelect(plant)}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-[#e5f1e7] transition-all duration-300 cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#ebf7ed] overflow-hidden">
        {plant.isFeatured && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#02341f] text-white text-[10px] font-bold rounded-full shadow-xs tracking-wider">
            FAVORIT
          </span>
        )}

        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Simpan ke favorit"
          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-xs transition-all active:scale-75 ${
            isWishlisted ? 'text-[#ba1a1a]' : 'text-[#414943] hover:text-[#ba1a1a]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
      </div>

      {/* Info Container */}
      <div className="flex flex-col p-3 gap-1.5 flex-1 justify-between bg-white">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-sm text-[#141e18] truncate group-hover:text-[#02341f] transition-colors">
              {plant.name}
            </h4>
            {plant.isFeatured && (
              <span className="material-symbols-outlined text-[#02341f] text-[15px] shrink-0">
                verified
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#414943] mt-0.5">
            Rp {plant.price.toLocaleString('id-ID')}
          </span>
        </div>

        {/* Care indicators & Add button row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#f1fcf3]">
          <div className="flex items-center gap-1.5 text-[#414943]">
            {/* Light Pill */}
            <span
              className="inline-flex items-center gap-0.5 text-[#02341f] text-[10px] font-semibold bg-[#ebf7ed] px-1.5 py-0.5 rounded-full"
              title={`Kebutuhan Cahaya: ${plant.lightLabel}`}
            >
              <span className="material-symbols-outlined text-[12px]">wb_twilight</span>
              <span>{plant.lightLabel}</span>
            </span>

            {/* Pet Safety Pill */}
            <span
              className="inline-flex items-center text-[#43664d] text-[10px] bg-[#c2e9c9] px-1.5 py-0.5 rounded-full"
              title={plant.petLabel}
            >
              <span className="material-symbols-outlined text-[12px]">pets</span>
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddClick}
            aria-label={`Tambah ${plant.name} ke keranjang`}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-all shadow-xs active:scale-75 ${
              addedAnim ? 'bg-[#43664d] scale-110' : 'bg-[#02341f] hover:bg-[#1e4b34]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {addedAnim ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
