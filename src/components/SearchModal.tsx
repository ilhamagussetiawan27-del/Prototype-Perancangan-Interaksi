import React, { useState, useEffect } from 'react';
import { Plant } from '../types/plant';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  plants,
  onSelectPlant
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularKeywords = ['Monstera', 'Pothos', 'Zamioculcas', 'Sansevieria', 'Tanaman Meja', 'Aman Hewan'];

  const filtered = query.trim()
    ? plants.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.latinName.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryTag.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-md flex flex-col justify-start p-4 pt-10"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg mx-auto rounded-2xl shadow-2xl p-4 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-2 border-b border-[#e5f1e7] pb-3">
          <span className="material-symbols-outlined text-[#02341f] text-[22px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tanaman, kategori, atau tips perawatan..."
            className="w-full bg-transparent text-sm sm:text-base text-[#141e18] placeholder-[#717972] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#717972] hover:text-[#141e18] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf7ed] flex items-center justify-center text-[#414943] hover:bg-[#e0ebe2]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#717972]">
            Pencarian Populer
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularKeywords.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-[#ebf7ed] hover:bg-[#c2e9c9] text-[#02341f] rounded-full text-xs font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto divide-y divide-[#e5f1e7]">
          {query.trim().length === 0 ? (
            <div className="text-xs text-[#717972] py-4 text-center">
              Ketik nama tanaman untuk pencarian instan (contoh: Monstera, Sansevieria)
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-6 text-center text-sm text-[#414943]">
              Tidak ada tanaman yang cocok dengan "<b>{query}</b>".
            </div>
          ) : (
            filtered.map((plant) => (
              <div
                key={plant.id}
                onClick={() => {
                  onSelectPlant(plant);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 hover:bg-[#ebf7ed] rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-11 h-11 rounded-lg object-cover bg-[#e5f1e7]"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-[#141e18]">{plant.name}</span>
                    <span className="text-xs text-[#414943] italic">{plant.latinName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-[#02341f]">
                    Rp {plant.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-[#43664d] block font-semibold">
                    {plant.lightLabel} • {plant.sizeLabel}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
