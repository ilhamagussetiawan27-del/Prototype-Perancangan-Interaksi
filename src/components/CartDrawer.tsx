import React, { useState } from 'react';
import { CartItem } from '../types/plant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (plantId: string, delta: number) => void;
  onRemoveItem: (plantId: string) => void;
  onExploreCatalog: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onExploreCatalog,
  onShowToast
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LITTLESEED') {
      setDiscountPercent(15);
      onShowToast('Kode promo LITTLESEED berhasil digunakan! Diskon 15% 🎉', 'local_offer');
    } else if (promoCode.trim().toUpperCase() === 'HIJAU') {
      setDiscountPercent(10);
      onShowToast('Kode promo HIJAU aktif! Diskon 10% 🌿', 'local_offer');
    } else {
      onShowToast('Kode promo tidak valid. Coba: LITTLESEED atau HIJAU', 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      onShowToast('Keranjang Anda masih kosong', 'info');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      onShowToast('Pesanan berhasil dibuat! Terima kasih telah merawat bumi 🌱', 'verified');
    }, 1200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-[#ffffff] shadow-2xl flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#e5f1e7] flex items-center justify-between bg-[#ebf7ed]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#02341f] text-[22px]">
              shopping_bag
            </span>
            <h2 className="text-[#02341f] font-bold text-base sm:text-lg">
              Keranjang Belanja ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="w-8 h-8 rounded-full bg-[#e5f1e7] flex items-center justify-center text-[#414943] hover:bg-[#dae5dc] transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-[#c2e9c9] text-[#02341f] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <h3 className="text-[#02341f] font-bold text-lg">Pesanan Diterima!</h3>
              <p className="text-sm text-[#414943] mt-1 max-w-[260px]">
                Tanamanmu sedang disiapkan dengan packing khusus berlapisan sabut kelapa aman.
              </p>
              <div className="mt-4 p-3 bg-[#ebf7ed] rounded-xl text-left w-full text-xs text-[#141e18] space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Nomor Pesanan:</span>
                  <span className="font-mono">#LS-202609-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimasi Tiba:</span>
                  <span>2-3 Hari Kerja</span>
                </div>
                <div className="flex justify-between font-bold text-[#02341f] pt-1 border-t border-[#dae5dc]">
                  <span>Total Terbayar:</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  onClose();
                  onExploreCatalog();
                }}
                className="mt-6 w-full py-2.5 bg-[#02341f] text-white rounded-xl text-sm font-semibold hover:bg-[#1e4b34] transition-all"
              >
                Belanja Tanaman Lain
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center my-auto">
              <span className="material-symbols-outlined text-[#717972] text-[48px] mb-2">
                shopping_bag
              </span>
              <p className="text-base font-bold text-[#141e18]">Keranjangmu masih kosong</p>
              <p className="text-xs text-[#414943] mt-1 max-w-[220px]">
                Yuk hadirkan tanaman hijau segar untuk sudut ruangan hunianmu!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCatalog();
                }}
                className="mt-4 px-4 py-2 bg-[#02341f] text-white rounded-xl text-xs font-semibold hover:bg-[#1e4b34] transition-all"
              >
                Lihat Koleksi Tanaman
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.plant.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#ebf7ed] border border-[#e0ebe2] gap-3"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#dae5dc] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#141e18] truncate">
                      {item.plant.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#02341f] block">
                      Rp {item.plant.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[11px] text-[#414943] block">
                      {item.plant.specifications.potSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#c1c9c1]/40 shadow-sm shrink-0">
                    <button
                      onClick={() => onUpdateQty(item.plant.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#02341f] hover:bg-[#ebf7ed] rounded active:scale-90"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#141e18]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.plant.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#02341f] hover:bg-[#ebf7ed] rounded active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.plant.id)}
                    aria-label="Hapus item"
                    className="text-[#717972] hover:text-[#ba1a1a] p-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="mt-2 pt-2 border-t border-[#e5f1e7]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Kode promo (coba: LITTLESEED)"
                    className="flex-1 bg-[#ebf7ed] text-xs px-3 py-2 rounded-lg text-[#141e18] outline-none border border-[#dae5dc] focus:border-[#02341f]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#02341f] text-white rounded-lg text-xs font-semibold hover:bg-[#1e4b34] transition-colors"
                  >
                    Gunakan
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-[11px] text-[#43664d] font-semibold mt-1">
                    ✓ Promo aktif: Diskon {discountPercent}% diterapkan!
                  </p>
                )}
              </form>

              {/* Delivery Guarantee Info */}
              <div className="mt-2 p-2.5 rounded-lg bg-[#f1fcf3] border border-[#c2e9c9] flex items-center gap-2 text-xs text-[#02341f]">
                <span className="material-symbols-outlined text-[18px] text-[#02341f]">
                  eco
                </span>
                <span>Kemasan aman berlapis sabut kelapa & garansi daun segar 14 hari.</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!orderSuccess && cart.length > 0 && (
          <div className="p-4 border-t border-[#e5f1e7] bg-[#ebf7ed]/40 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-[#414943]">
              <span>Subtotal Produk</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-[#43664d] font-semibold">
                <span>Diskon Promo ({discountPercent}%)</span>
                <span>-Rp {discountAmount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-[#414943]">
              <span>Biaya Pengemasan Aman</span>
              <span className="text-[#02341f] font-semibold">GRATIS</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#dae5dc]">
              <span className="text-sm font-semibold text-[#141e18]">Total Pembayaran</span>
              <span className="text-lg font-bold text-[#02341f]">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-[#02341f] hover:bg-[#1e4b34] text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCheckingOut ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Memproses Checkout...</span>
                </>
              ) : (
                <>
                  <span>Lanjut ke Pembayaran</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
