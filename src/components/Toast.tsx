import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  show: boolean;
  actionText?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  icon = 'check_circle',
  show,
  actionText,
  onAction
}) => {
  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none max-w-[90vw] ${
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-[#141e18] text-[#f1fcf3] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-medium border border-[#3c4541]/40 backdrop-blur-md">
        <span className="material-symbols-outlined text-[#a1d1b3] text-[20px]">
          {icon}
        </span>
        <span className="truncate">{message}</span>
        {actionText && (
          <button
            onClick={onAction}
            className="text-[#a1d1b3] hover:underline font-bold text-xs ml-1 cursor-pointer"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
