import React, { useState } from 'react';
import { Plant } from '../types/plant';

interface PlantFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const PlantFinderModal: React.FC<PlantFinderModalProps> = ({
  isOpen,
  onClose,
  plants,
  onSelectPlant,
  onAddToCart,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const questions = [
    {
      title: 'Seberapa terang ruanganmu?',
      subtitle: 'Pencahayaan menentukan jenis tanaman yang paling awet.',
      options: [
        { label: 'Cahaya melimpah & terang', icon: 'wb_sunny', key: 'terang' },
        { label: 'Cahaya sedang / tidak langsung', icon: 'filter_drama', key: 'sedang' },
        { label: 'Cahaya minim / ruang ber-AC', icon: 'nightlight', key: 'rendah' }
      ]
    },
    {
      title: 'Seberapa sering kamu bisa menyiram?',
      subtitle: 'Menyesuaikan dengan rutinitas harianmu.',
      options: [
        { label: 'Hampir tiap hari (rajin merawat)', icon: 'water_drop', key: 'sering' },
        { label: 'Seminggu 1-2 kali (waktu normal)', icon: 'schedule', key: 'normal' },
        { label: 'Sering bepergian (butuh super tahan kering)', icon: 'flight', key: 'jarang' }
      ]
    },
    {
      title: 'Apakah ada hewan peliharaan?',
      subtitle: 'Beberapa daun tanaman perlu perhatian untuk anabul.',
      options: [
        { label: 'Ya, ada kucing/anjing yang usil', icon: 'pets', key: 'pet_yes' },
        { label: 'Tidak ada hewan peliharaan', icon: 'home', key: 'pet_no' },
        { label: 'Ditaruh di tempat tinggi / gantung', icon: 'vertical_align_top', key: 'high' }
      ]
    },
    {
      title: 'Di mana tanaman akan diletakkan?',
      subtitle: 'Ukuran pot akan disesuaikan dengan posisi ruangan.',
      options: [
        { label: 'Meja kerja / meja nakas mungil', icon: 'desk', key: 'meja' },
        { label: 'Sudut lantai ruang tamu', icon: 'chair', key: 'lantai' },
        { label: 'Digantung di jendela / teras', icon: 'hangout', key: 'gantung' }
      ]
    }
  ];

  const handleSelectOption = (key: string) => {
    const nextAnswers = [...answers, key];
    setAnswers(nextAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Results step
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  // Determine recommendation based on answers
  const getRecommendation = (): Plant => {
    const lightAnswer = answers[0] || 'sedang';
    const placeAnswer = answers[3] || 'meja';

    if (lightAnswer === 'rendah' || answers.includes('jarang')) {
      return plants.find((p) => p.id === 'zamioculcas') || plants[1];
    }
    if (answers.includes('pet_yes') && placeAnswer === 'meja') {
      return plants.find((p) => p.id === 'spider-plant') || plants[4];
    }
    if (placeAnswer === 'gantung') {
      return plants.find((p) => p.id === 'pothos-sirih-gading') || plants[2];
    }
    if (placeAnswer === 'lantai') {
      return plants.find((p) => p.id === 'monstera-deliciosa') || plants[0];
    }
    return plants.find((p) => p.id === 'sansevieria') || plants[1];
  };

  const recommendedPlant = getRecommendation();
  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / questions.length) * 100));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md p-5 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e5f1e7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#02341f] text-[22px]">
              psychology
            </span>
            <h3 className="font-bold text-base text-[#02341f]">Plant Finder</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf7ed] flex items-center justify-center text-[#414943] hover:bg-[#dae5dc]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {currentStep < questions.length ? (
          <>
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs text-[#414943]">
              <span className="font-semibold text-[#02341f]">
                Langkah {currentStep + 1} dari {questions.length}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#c2e9c9] text-[#02341f] font-bold text-[10px]">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-[#ebf7ed] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#02341f] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question */}
            <div className="flex flex-col gap-0.5">
              <h4 className="font-bold text-base text-[#141e18]">
                {questions[currentStep].title}
              </h4>
              <p className="text-xs text-[#414943]">
                {questions[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2 mt-1">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#e5f1e7] hover:border-[#02341f] hover:bg-[#ebf7ed] transition-all text-left group active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#02341f] group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <span className="text-sm font-semibold text-[#141e18]">
                      {opt.label}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#717972] group-hover:text-[#02341f] text-[18px]">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Result View */
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-14 h-14 rounded-full bg-[#c2e9c9] flex items-center justify-center text-[#02341f]">
              <span className="material-symbols-outlined text-[32px]">eco</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#43664d] uppercase tracking-wider">
                Rekomendasi Tanaman Paling Pas
              </span>
              <h4 className="text-xl font-bold text-[#141e18] mt-0.5">
                {recommendedPlant.name}
              </h4>
              <span className="text-xs italic text-[#414943]">
                {recommendedPlant.latinName}
              </span>
              <p className="text-xs text-[#414943] mt-2 max-w-[280px] mx-auto leading-relaxed">
                {recommendedPlant.description}
              </p>
            </div>

            <div className="w-full bg-[#ebf7ed] rounded-xl p-3 flex items-center gap-3 text-left">
              <img
                src={recommendedPlant.image}
                alt={recommendedPlant.name}
                className="w-16 h-16 rounded-lg object-cover bg-white"
              />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm text-[#02341f] block">
                  Rp {recommendedPlant.price.toLocaleString('id-ID')}
                </span>
                <span className="text-[11px] text-[#414943] block">
                  Cahaya {recommendedPlant.lightLabel} • Siram {recommendedPlant.wateringFrequency}
                </span>
                <span className="text-[11px] text-[#43664d] font-semibold block">
                  {recommendedPlant.petLabel}
                </span>
              </div>
            </div>

            <div className="flex gap-2 w-full pt-2">
              <button
                onClick={() => {
                  onSelectPlant(recommendedPlant);
                  onClose();
                }}
                className="flex-1 py-2.5 bg-[#ebf7ed] text-[#02341f] rounded-xl text-xs font-bold hover:bg-[#dae5dc] transition-colors"
              >
                Lihat Detail
              </button>
              <button
                onClick={() => {
                  onAddToCart(recommendedPlant);
                  onShowToast(`${recommendedPlant.name} berhasil ditambahkan ke keranjang! 🌱`, 'shopping_bag');
                  onClose();
                }}
                className="flex-1 py-2.5 bg-[#02341f] hover:bg-[#1e4b34] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                + Masukkan Keranjang
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-[#717972] hover:text-[#02341f] underline mt-1"
            >
              Ulangi Kuis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
