import React from 'react';
import { LayoutDashboard, Terminal, Shield, Zap } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  userLevel: number;
  xp: number;
  nextLevelXp: number;
  username: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, userLevel, xp, nextLevelXp, username }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'missions', label: 'Missões', icon: <Terminal size={18} /> },
    { id: 'badges', label: 'Conquistas', icon: <Shield size={18} /> },
  ];

  const progressPercent = Math.min(100, (xp / nextLevelXp) * 100);

  return (
    <div className="hidden md:flex w-64 h-full bg-zinc-950 border-r border-zinc-800 flex-col justify-between">
      <div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Zap size={20} className="fill-primary" />
            <span className="font-mono font-bold text-lg tracking-tight text-white">CODEX</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest pl-7">Protocol Zero</div>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium group ${
                currentView === item.id 
                  ? 'bg-zinc-900 text-white shadow-inner' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <span className={`${currentView === item.id ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 m-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center border border-zinc-700 text-zinc-300 text-xs font-mono font-bold">
            {username.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{username}</div>
            <div className="text-[10px] text-primary font-mono">Acesso Nível {userLevel}</div>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-mono">
            <span>XP Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};