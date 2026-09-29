import React from 'react';
import { ViewMode } from './Header';

interface BottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#f1fcf3]/95 backdrop-blur-xl border-t border-[#e5f1e7] shadow-[0_-2px_12px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {/* Beranda */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            currentView === 'home'
              ? 'text-[#02341f] font-bold'
              : 'text-[#414943] hover:text-[#02341f]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentView === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Beranda</span>
        </button>

        {/* Katalog */}
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            currentView === 'catalog' || currentView === 'detail'
              ? 'text-[#02341f] font-bold'
              : 'text-[#414943] hover:text-[#02341f]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings:
                currentView === 'catalog' || currentView === 'detail' ? "'FILL' 1" : "'FILL' 0"
            }}
          >
            potted_plant
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Katalog</span>
        </button>

        {/* Finder */}
        <button
          onClick={() => onNavigate('finder')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            currentView === 'finder'
              ? 'text-[#02341f] font-bold'
              : 'text-[#414943] hover:text-[#02341f]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentView === 'finder' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Finder</span>
        </button>

        {/* Komunitas */}
        <button
          onClick={() => onNavigate('community')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all ${
            currentView === 'community'
              ? 'text-[#02341f] font-bold'
              : 'text-[#414943] hover:text-[#02341f]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentView === 'community' ? "'FILL' 1" : "'FILL' 0" }}
          >
            forum
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Komunitas</span>
        </button>
      </div>
    </nav>
  );
};
