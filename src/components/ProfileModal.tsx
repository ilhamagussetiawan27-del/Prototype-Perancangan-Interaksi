import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount: number;
  onShowToast: (msg: string, icon?: string) => void;
  onOpenWishlist: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  wishlistCount,
  onShowToast,
  onOpenWishlist
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xs sm:max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#e5f1e7]">
          <span className="font-bold text-base text-[#02341f]">Akun Pelanggan</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#ebf7ed] flex items-center justify-center text-[#414943] hover:bg-[#dae5dc]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#bdeece] text-[#02341f] flex items-center justify-center font-bold text-lg shadow-sm">
            JD
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#02341f]">Jane Doe</span>
            <span className="text-xs text-[#414943]">Plant Parent • Gold Member</span>
            <span className="text-[10px] text-[#43664d] font-semibold mt-0.5">
              🌿 320 Poin Hijau Tersedia
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1 pt-1 text-xs">
          <button
            onClick={() => {
              onShowToast('Membuka daftar riwayat pesanan...', 'local_mall');
              onClose();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ebf7ed] text-[#141e18] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                local_mall
              </span>
              <span>Riwayat Pesanan (3)</span>
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#717972]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => {
              onOpenWishlist();
              onClose();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ebf7ed] text-[#141e18] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                favorite
              </span>
              <span>Tanaman Favorit ({wishlistCount})</span>
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#717972]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => {
              onShowToast('Alamat utama: Jl. Kemang Timur No. 14, Jakarta Selatan', 'pin_drop');
              onClose();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ebf7ed] text-[#141e18] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                pin_drop
              </span>
              <span>Buku Alamat Pengiriman</span>
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#717972]">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => {
              onShowToast('Jadwal pengingat siram aktif di ponsel', 'notifications');
              onClose();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ebf7ed] text-[#141e18] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                alarm
              </span>
              <span>Pengingat Jadwal Siram</span>
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#717972]">
              chevron_right
            </span>
          </button>
        </div>

        <button
          onClick={() => {
            onShowToast('Berhasil keluar akun', 'logout');
            onClose();
          }}
          className="w-full py-2.5 bg-[#ebf7ed] text-[#ba1a1a] rounded-xl text-xs font-bold hover:bg-[#ffdad6] transition-colors"
        >
          Keluar Akun
        </button>
      </div>
    </div>
  );
};
