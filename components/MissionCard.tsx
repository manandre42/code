import React from 'react';
import { Mission, MissionStatus } from '../types';
import { Button } from './ui/Button';
import { Lock, CheckCircle2, Terminal, ChevronRight, Play } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  status: MissionStatus;
  onSelect: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, status, onSelect }) => {
  const isLocked = status === MissionStatus.LOCKED;
  const isCompleted = status === MissionStatus.COMPLETED;
  
  // Extract numeric ID for display (e.g. m001 -> 01)
  const missionNumber = mission.id.replace(/\D/g, '');

  return (
    <div className={`group relative overflow-hidden rounded-xl border transition-all duration-300 flex flex-col md:flex-row gap-6 p-6
      ${isLocked 
        ? 'border-zinc-800/50 bg-zinc-900/10 opacity-60 grayscale' 
        : isCompleted 
          ? 'border-primary/20 bg-zinc-900/40 hover:bg-zinc-900/60' 
          : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60 backdrop-blur-sm'
      }`}
    >
      {/* Icon / ID Section */}
      <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-2 flex-shrink-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg
          ${isLocked ? 'bg-zinc-900 border-zinc-800 text-zinc-700' 
          : isCompleted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
          : 'bg-zinc-800/50 border-zinc-700 text-zinc-100 group-hover:scale-105 transition-transform'}`}>
          {isLocked ? <Lock size={20} /> : isCompleted ? <CheckCircle2 size={20} /> : <Terminal size={20} />}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Protocol</span>
          <span className="text-lg font-mono font-bold text-zinc-500 leading-none">{missionNumber}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className={`text-lg md:text-xl font-bold tracking-tight ${isLocked ? 'text-zinc-500' : 'text-white'}`}>
            {mission.title}
          </h3>
          <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase tracking-wide font-bold
            ${mission.difficulty === 'Iniciante' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 
              mission.difficulty === 'Intermediário' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' : 
              'border-red-500/20 text-red-500 bg-red-500/5'}`}>
            {mission.difficulty}
          </span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
          {isLocked ? 'Conteúdo encriptado. Acesso restrito. Aumente seu nível de credencial para desbloquear.' : mission.description}
        </p>
      </div>

      {/* Action Section */}
      <div className="flex flex-col md:items-end justify-between gap-4 md:gap-2 md:pl-6 md:border-l md:border-zinc-800/50 min-w-[140px]">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Recompensa</span>
          <span className={`font-mono text-sm font-bold ${isLocked ? 'text-zinc-600' : 'text-primary'}`}>+{mission.xpReward} XP</span>
        </div>
        
        {/* Mobile Reward Line */}
        <div className="flex md:hidden items-center justify-between text-xs border-t border-zinc-800 pt-3 mt-1 mb-1">
           <span className="text-zinc-500 uppercase font-bold">Recompensa</span>
           <span className={`font-mono font-bold ${isLocked ? 'text-zinc-600' : 'text-primary'}`}>+{mission.xpReward} XP</span>
        </div>

        <Button 
          variant={isLocked ? 'ghost' : isCompleted ? 'outline' : 'primary'} 
          size="md"
          disabled={isLocked}
          onClick={() => onSelect(mission)}
          className={`w-full shadow-none ${!isLocked && !isCompleted ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide' : ''}`}
        >
          {isLocked ? 'Bloqueado' : isCompleted ? 'Revisar' : (
            <span className="flex items-center gap-2">
              Iniciar <Play size={14} fill="currentColor" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};