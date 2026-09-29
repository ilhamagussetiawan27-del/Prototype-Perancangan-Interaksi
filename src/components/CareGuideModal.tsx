import React from 'react';

export type CareType = 'cahaya' | 'siram' | 'hewan' | 'tinggi' | null;

interface CareGuideModalProps {
  careType: CareType;
  onClose: () => void;
  plantName: string;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({
  careType,
  onClose,
  plantName
}) => {
  if (!careType) return null;

  const dataMap = {
    cahaya: {
      title: 'Panduan Pencahayaan',
      icon: 'wb_sunny',
      headline: 'Cahaya Terang Tidak Langsung (Indirect Light)',
      desc: `${plantName} paling bahagia di tempat dengan cahaya alami tersaring seperti dekat jendela berlapis tirai tipis. Hindari terik matahari siang langsung yang bisa menyebabkan daun gosong atau kering.`
    },
    siram: {
      title: 'Jadwal & Teknik Penyiraman',
      icon: 'water_drop',
      headline: 'Siram Saat 2-3 cm Tanah Atas Kering',
      desc: `Sentuh media tanam sedalam buku jari pertama. Jika terasa kering dan ringan, berikan air perlahan hingga merata sampai tiris dari lubang bawah pot. Jangan biarkan air tergenang di tatakan pot untuk mencegah busuk akar.`
    },
    hewan: {
      title: 'Keamanan Hewan Peliharaan',
      icon: 'pets',
      headline: 'Ramah Anabul & Bebas Racun',
      desc: `Keamanan anabul (kucing & anjing) menjadi prioritas. Untuk tanaman yang ramah hewan, tanaman ini aman jika terendus. Tetap rekomendasikan meletakkan tanaman di rak stabil agar tidak terjatuh saat anabul bermain aktif.`
    },
    tinggi: {
      title: 'Potensi Tumbuh & Dimensi',
      icon: 'straighten',
      headline: 'Ukuran Ideal Tanaman Ruangan',
      desc: `Tinggi tanaman dikirim berkisar 35–45 cm lengkap dengan pot. Dengan perawatan konsisten dan pupuk organik 2 bulan sekali, tanaman ini akan menumbuhkan tunas daun baru secara berkala.`
    }
  };

  const current = dataMap[careType];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#ebf7ed] text-[#414943] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-12 h-12 rounded-full bg-[#c2e9c9] text-[#02341f] flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[26px]">{current.icon}</span>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#43664d]">
          {current.title}
        </span>
        <h4 className="text-base font-bold text-[#141e18] mt-1">{current.headline}</h4>
        <p className="text-xs text-[#414943] mt-2 leading-relaxed">{current.desc}</p>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-[#02341f] text-white rounded-xl text-xs font-semibold hover:bg-[#1e4b34] transition-all"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
};
