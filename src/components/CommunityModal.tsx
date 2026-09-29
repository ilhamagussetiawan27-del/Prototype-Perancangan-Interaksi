import React, { useState } from 'react';
import { COMMUNITY_TIPS } from '../data/plantsData';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [tips, setTips] = useState(COMMUNITY_TIPS);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [authorName, setAuthorName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || !newTitle.trim()) {
      onShowToast('Harap isi judul dan tips tanaman Anda', 'info');
      return;
    }
    const newEntry = {
      id: `tip-${Date.now()}`,
      author: authorName.trim() || 'Teman LittleSeed',
      role: 'Urban Gardener',
      city: 'Indonesia',
      title: newTitle.trim(),
      text: newText.trim(),
      likes: 1,
      comments: 0
    };
    setTips([newEntry, ...tips]);
    setNewTitle('');
    setNewText('');
    setAuthorName('');
    onShowToast('Tips tanamanmu berhasil dibagikan ke komunitas! 🌿', 'forum');
  };

  const handleLike = (id: string) => {
    setTips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
    );
    onShowToast('Menyukai tips komunitas!', 'thumb_up');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141e18]/45 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl relative max-h-[88vh] flex flex-col gap-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e5f1e7]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#02341f] text-[22px]">
              forum
            </span>
            <h3 className="font-bold text-base text-[#02341f]">
              Komunitas & Diskusi Tanaman
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebf7ed] flex items-center justify-center text-[#414943] hover:bg-[#dae5dc]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-[#ebf7ed] rounded-xl p-3.5 border border-[#e0ebe2] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#02341f] text-white flex items-center justify-center font-bold text-xs">
                    {tip.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#141e18] leading-tight">
                      {tip.author}
                    </h5>
                    <span className="text-[10px] text-[#414943]">
                      {tip.role} • {tip.city}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleLike(tip.id)}
                  className="flex items-center gap-1 text-[11px] text-[#02341f] bg-white px-2 py-1 rounded-full shadow-sm hover:bg-[#c2e9c9] transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">favorite</span>
                  <span>{tip.likes}</span>
                </button>
              </div>

              <div>
                <h6 className="font-bold text-xs text-[#02341f] mb-0.5">{tip.title}</h6>
                <p className="text-xs text-[#414943] leading-relaxed">"{tip.text}"</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#dae5dc] text-[10px] text-[#717972]">
                <span>{tip.comments} diskusi aktif</span>
                <span className="text-[#02341f] font-semibold hover:underline cursor-pointer">
                  Ikut Berdiskusi →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Submit new tip form */}
        <form onSubmit={handleSubmit} className="pt-2 border-t border-[#e5f1e7] flex flex-col gap-2">
          <span className="text-xs font-bold text-[#141e18]">Bagikan Pengalamanmu:</span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Nama kamu (opsional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-[#ebf7ed] text-xs px-3 py-1.5 rounded-lg text-[#141e18] outline-none border border-[#dae5dc] focus:border-[#02341f]"
            />
            <input
              type="text"
              placeholder="Topik / Judul tips"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-[#ebf7ed] text-xs px-3 py-1.5 rounded-lg text-[#141e18] outline-none border border-[#dae5dc] focus:border-[#02341f]"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tuliskan saran atau tips perawatan tanamanmu..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="flex-1 bg-[#ebf7ed] text-xs px-3 py-2 rounded-lg text-[#141e18] outline-none border border-[#dae5dc] focus:border-[#02341f]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#02341f] text-white rounded-lg text-xs font-bold hover:bg-[#1e4b34] transition-colors"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
