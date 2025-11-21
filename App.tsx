import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { MissionCard } from './components/MissionCard';
import { TerminalView } from './components/TerminalView';
import { BadgeItem } from './components/ui/BadgeItem';
import { INITIAL_STATE, MISSIONS, BADGES, LEVEL_THRESHOLDS } from './constants';
import { UserState, Mission, MissionStatus } from './types';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<UserState>(() => {
    const saved = localStorage.getItem('codex_save_v1');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [currentView, setCurrentView] = useState('dashboard');
  const [activeMission, setActiveMission] = useState<Mission | null>(null);

  useEffect(() => {
    localStorage.setItem('codex_save_v1', JSON.stringify(gameState));
  }, [gameState]);

  const getMissionStatus = (mission: Mission): MissionStatus => {
    if (gameState.completedMissions.includes(mission.id)) return MissionStatus.COMPLETED;
    if (mission.requiredLevel <= gameState.level) return MissionStatus.ACTIVE;
    return MissionStatus.LOCKED;
  };

  const handleMissionComplete = (missionId: string) => {
    const mission = MISSIONS.find(m => m.id === missionId);
    if (!mission || gameState.completedMissions.includes(missionId)) return;

    setGameState(prev => {
      const newXp = prev.currentXp + mission.xpReward;
      let newLevel = prev.level;
      if (LEVEL_THRESHOLDS[prev.level] && newXp >= LEVEL_THRESHOLDS[prev.level]) {
        newLevel += 1;
      }

      const newCompleted = [...prev.completedMissions, missionId];
      const newBadges = [...prev.unlockedBadges];
      if (missionId === 'm001' && !newBadges.includes('b001')) newBadges.push('b001');
      if (missionId === 'm002' && !newBadges.includes('b002')) newBadges.push('b002');
      if (newLevel >= 5 && !newBadges.includes('b003')) newBadges.push('b003');

      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        completedMissions: newCompleted,
        unlockedBadges: newBadges
      };
    });

    setTimeout(() => {
      setActiveMission(null);
      setCurrentView('dashboard');
    }, 2500);
  };

  if (activeMission) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center md:p-8 relative">
         <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none"></div>
        <div className="w-full h-full md:max-w-4xl md:h-[90vh] z-10">
          <TerminalView 
            mission={activeMission} 
            onBack={() => setActiveMission(null)} 
            onComplete={handleMissionComplete} 
          />
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8 pb-24 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Painel de Controle</h1>
              <p className="text-zinc-400 text-sm md:text-base">Sistemas operacionais. Bem-vindo, Engenheiro.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm p-5 rounded-xl shadow-sm">
                <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">Missões Cumpridas</div>
                <div className="text-3xl font-mono text-white font-bold">
                  {gameState.completedMissions.length} <span className="text-zinc-600 text-sm font-sans font-normal">/ {MISSIONS.length}</span>
                </div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm p-5 rounded-xl shadow-sm">
                <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">XP Total</div>
                <div className="text-3xl font-mono text-primary font-bold">{gameState.currentXp}</div>
              </div>
               <div className="bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm p-5 rounded-xl shadow-sm">
                <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">Nível de Acesso</div>
                <div className="text-3xl font-mono text-accent font-bold">Lvl {gameState.level}</div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Próximo Protocolo
              </h2>
              {(() => {
                const nextMission = MISSIONS.find(m => !gameState.completedMissions.includes(m.id) && m.requiredLevel <= gameState.level);
                if (nextMission) {
                  return (
                    <MissionCard 
                      mission={nextMission} 
                      status={MissionStatus.ACTIVE} 
                      onSelect={setActiveMission} 
                    />
                  );
                } else {
                  return (
                    <div className="p-8 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl text-zinc-500 text-center flex flex-col items-center gap-2">
                      <div className="p-3 bg-zinc-900 rounded-full"><Zap size={20} className="text-zinc-600"/></div>
                      <p className="text-sm">Todas as missões disponíveis foram completadas.</p>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        );
      
      case 'missions':
        return (
          <div className="space-y-6 pb-24 animate-in fade-in duration-500">
             <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Arquivo de Missões</h1>
              <p className="text-zinc-400 text-sm">Histórico completo de operações.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {MISSIONS.map(mission => (
                <MissionCard 
                  key={mission.id} 
                  mission={mission} 
                  status={getMissionStatus(mission)} 
                  onSelect={setActiveMission} 
                />
              ))}
            </div>
          </div>
        );

      case 'badges':
        return (
           <div className="space-y-6 pb-24 animate-in fade-in duration-500">
             <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Conquistas</h1>
              <p className="text-zinc-400 text-sm">Distintivos de honra e certificações.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {BADGES.map(badge => (
                <BadgeItem 
                  key={badge.id} 
                  badge={badge} 
                  unlocked={gameState.unlockedBadges.includes(badge.id)} 
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background text-zinc-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-zinc-950 z-[-2]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 z-[-1]" />
      <div className="fixed inset-0 bg-grid-white opacity-[0.03] z-[-1]" />

      {/* Sidebar for Desktop */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        userLevel={gameState.level}
        xp={gameState.currentXp}
        nextLevelXp={LEVEL_THRESHOLDS[gameState.level] || 9999}
        username={gameState.username}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative no-scrollbar md:custom-scrollbar">
        
        {/* Mobile Header */}
        <div className="md:hidden px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Zap size={18} className="text-primary fill-primary/20" />
             <span className="font-bold tracking-tight text-sm">CODEX</span>
           </div>
           <div className="text-[10px] font-mono bg-zinc-900 px-2 py-1 rounded border border-zinc-800 text-zinc-400">
             LVL {gameState.level}
           </div>
        </div>

        <div className="p-4 md:p-8 max-w-5xl mx-auto relative z-0">
          {renderView()}
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav currentView={currentView} onChangeView={setCurrentView} />
    </div>
  );
};

export default App;