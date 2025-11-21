import React from 'react';
import { LayoutDashboard, Terminal, Shield } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Painel', icon: <LayoutDashboard size={20} /> },
    { id: 'missions', label: 'Missões', icon: <Terminal size={20} /> },
    { id: 'badges', label: 'Conquistas', icon: <Shield size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800 pb-safe z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
              currentView === item.id 
                ? 'text-primary' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className={`p-1 rounded-full ${currentView === item.id ? 'bg-primary/10' : 'bg-transparent'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};