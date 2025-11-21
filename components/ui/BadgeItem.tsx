import React from 'react';
import { Badge } from '../../types';

interface BadgeItemProps {
  badge: Badge;
  unlocked: boolean;
}

export const BadgeItem: React.FC<BadgeItemProps> = ({ badge, unlocked }) => {
  return (
    <div className={`flex flex-col items-center p-3 rounded-lg border ${unlocked ? 'border-primary/30 bg-primary/5' : 'border-zinc-800 bg-zinc-900/50 opacity-50 grayscale'}`}>
      <div className="text-3xl mb-2">{badge.icon}</div>
      <div className="text-xs font-bold text-center text-zinc-200">{badge.name}</div>
      <div className="text-[10px] text-center text-zinc-500 mt-1 leading-tight">{badge.description}</div>
    </div>
  );
};