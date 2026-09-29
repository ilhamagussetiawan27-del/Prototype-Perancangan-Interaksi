import React, { useState, useEffect } from 'react';
import { FilterState, LightLevel, PlantSize, CareDifficulty } from '../types/plant';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const [localLight, setLocalLight] = useState<LightLevel[]>(filters.lightLevels);
  const [localSizes, setLocalSizes] = useState<PlantSize[]>(filters.sizes);
  const [localDifficulties, setLocalDifficulties] = useState<CareDifficulty[]>(filters.difficulties);
  const [localPetOnly, setLocalPetOnly] = useState<boolean>(filters.petOnly);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(filters.maxPrice);

  useEffect(() => {
    if (isOpen) {
      setLocalLight(filters.lightLevels);
      setLocalSizes(filters.sizes);
      setLocalDifficulties(filters.difficulties);
      setLocalPetOnly(filters.petOnly);
      setLocalMaxPrice(filters.maxPrice);
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const toggleLight = (val: LightLevel) => {
    setLocalLight((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleSize = (val: PlantSize) => {
    setLocalSizes((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const toggleDifficulty = (val: CareDifficulty) => {
    setLocalDifficulties((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      lightLevels: localLight,
      sizes: localSizes,
      difficulties: localDifficulties,
      petOnly: localPetOnly,
      maxPrice: localMaxPrice
    });
    onClose();
  };

  const handleReset = () => {
    setLocalLight([]);
    setLocalSizes([]);
    setLocalDifficulties([]);
    setLocalPetOnly(false);
    setLocalMaxPrice(500000);
    onResetFilters();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e5f1e7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#02341f] text-[22px]">tune</span>
            <h2 className="text-[#02341f] font-bold text-base sm:text-lg">Filter Pencarian</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf7ed] flex items-center justify-center text-[#414943] hover:bg-[#dae5dc]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 1. Kebutuhan Cahaya */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#141e18]">Kebutuhan Cahaya</span>
          <div className="flex flex-wrap gap-2">
            {[
              { val: 'rendah' as LightLevel, label: 'Rendah' },
              { val: 'sedang' as LightLevel, label: 'Sedang' },
              { val: 'terang' as LightLevel, label: 'Terang' }
            ].map(({ val, label }) => {
              const active = localLight.includes(val);
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => toggleLight(val)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#02341f] text-white shadow-sm'
                      : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Ukuran Pot & Tanaman */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#141e18]">Ukuran Pot & Tanaman</span>
          <div className="flex flex-wrap gap-2">
            {[
              { val: 'kecil' as PlantSize, label: 'Kecil (<20cm)' },
              { val: 'sedang' as PlantSize, label: 'Sedang (20-50cm)' },
              { val: 'besar' as PlantSize, label: 'Besar (>50cm)' }
            ].map(({ val, label }) => {
              const active = localSizes.includes(val);
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => toggleSize(val)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#02341f] text-white shadow-sm'
                      : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Karakteristik & Keamanan */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-[#141e18]">Karakteristik & Keamanan</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggleDifficulty('mudah')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                localDifficulties.includes('mudah')
                  ? 'bg-[#02341f] text-white shadow-sm'
                  : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">eco</span>
              <span>Mudah Dirawat</span>
            </button>
            <button
              type="button"
              onClick={() => setLocalPetOnly(!localPetOnly)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                localPetOnly
                  ? 'bg-[#02341f] text-white shadow-sm'
                  : 'bg-[#ebf7ed] text-[#141e18] hover:bg-[#dae5dc]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">pets</span>
              <span>Ramah Kucing / Anjing</span>
            </button>
          </div>
        </div>

        {/* 4. Rentang Harga Slider Interaktif */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#141e18]">Rentang Harga Maksimal</span>
            <span className="font-bold text-[#02341f] text-sm">
              Rp {localMaxPrice.toLocaleString('id-ID')}
            </span>
          </div>
          <input
            type="range"
            min={30000}
            max={500000}
            step={10000}
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#e0ebe2] rounded-lg appearance-none cursor-pointer accent-[#02341f]"
          />
          <div className="flex justify-between text-[11px] text-[#717972]">
            <span>Rp 30rb</span>
            <span>Rp 500rb</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-[#e5f1e7]">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 bg-[#ebf7ed] text-[#141e18] rounded-xl text-xs font-bold hover:bg-[#e0ebe2] transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 bg-[#02341f] text-white rounded-xl text-xs font-bold hover:bg-[#1e4b34] transition-all shadow-md active:scale-95"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
};
