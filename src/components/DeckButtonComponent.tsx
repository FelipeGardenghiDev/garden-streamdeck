import React from 'react';
import { DeckButton } from '../types';
import * as Icons from 'lucide-react';
import { triggerHaptic } from '../core/deck-store';

interface DeckButtonProps {
  button: DeckButton;
  onPress: (button: DeckButton) => void;
  isActive?: boolean;
}

export const DeckButtonComponent: React.FC<DeckButtonProps> = ({ button, onPress, isActive }) => {
  // Dynamically resolve lucide icon
  const IconComponent = (Icons as any)[button.iconName] || Icons.Square;

  const handleClick = () => {
    if (button.hapticFeedback) {
      triggerHaptic(40);
    }
    onPress(button);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isActive ? '#0f766e' : button.bgColor,
        borderColor: isActive ? '#2dd4bf' : 'rgba(255, 255, 255, 0.1)',
        color: button.textColor
      }}
      className="relative flex flex-col items-center justify-center p-3 rounded-2xl border shadow-lg transition-all duration-150 active:scale-95 cursor-pointer hover:brightness-125 select-none w-full h-full min-h-[90px]"
    >
      <IconComponent className="w-8 h-8 mb-1.5 transition-transform duration-100 group-active:scale-90" />
      <span className="text-[11px] font-bold tracking-wide text-center leading-tight truncate w-full px-1">
        {button.label}
      </span>
      {isActive && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      )}
    </button>
  );
};
