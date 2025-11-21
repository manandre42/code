import React, { useState, useEffect, useRef } from 'react';
import { Mission } from '../types';
import { Button } from './ui/Button';
import { ArrowLeft, Send, Link as LinkIcon, Sparkles, AlertTriangle, Terminal } from 'lucide-react';
import { getAICoachHint } from '../services/geminiService';

interface TerminalViewProps {
  mission: Mission;
  onBack: () => void;
  onComplete: (missionId: string) => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ mission, onBack, onComplete }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [isGettingHint, setIsGettingHint] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear previous logs when mission changes
    setLogs([]);
    addLog(`INICIALIZANDO CONEXÃO SEGURA [SECURE_SOCKET_LAYER]...`);
    setTimeout(() => addLog(`ALVO IDENTIFICADO: ${mission.title}`), 400);
    setTimeout(() => addLog(`DIRETRIZ PRIMÁRIA: ${mission.description}`), 800);
    if(mission.clueUrl) {
      setTimeout(() => addLog(`RASTREAMENTO DE SINAL: ${mission.clueUrl}`), 1200);
    }
    setTimeout(() => addLog(`TERMINAL ATIVO. AGUARDANDO INPUT DO USUÁRIO...`, 'warning'), 1600);
  }, [mission]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"})}] ${type.toUpperCase()}: ${msg}`]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addLog(`> ${input}`, 'info');
    
    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalizedHash = mission.answerHash.toLowerCase().replace(/\s+/g, ' ').trim();

    if (normalizedInput === normalizedHash) {
      setStatus('success');
      addLog('HASH VERIFICADO. ACESSO CONCEDIDO.', 'success');
      addLog('EXECUTANDO SCRIPT DE RECOMPENSA...', 'success');
      setTimeout(() => {
        onComplete(mission.id);
      }, 2000);
    } else {
      setStatus('error');
      addLog('ERRO DE SINTAXE OU HASH INVÁLIDO. ACESSO NEGADO.', 'error');
      setInput('');
    }
  };

  const requestHint = async () => {
    setIsGettingHint(true);
    addLog('ESTABELECENDO UPLINK NEURAL COM O ORÁCULO...', 'warning');
    
    const hint = await getAICoachHint(mission.title, mission.description + " " + mission.hint, "Estou preso, preciso de uma dica.");
    
    addLog(`RESPOSTA DO ORÁCULO: ${hint}`, 'warning');
    setIsGettingHint(false);
  };

  return (
    <div className="flex flex-col h-full bg-black md:rounded-xl overflow-hidden border-0 md:border border-zinc-800 shadow-2xl relative">
      {/* Header */}
      <div className="bg-zinc-950 p-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col">
             <span className="font-bold text-sm text-white flex items-center gap-2">
               <Terminal size={14} className="text-primary" />
               {mission.title}
             </span>
             <span className="font-mono text-[10px] text-zinc-500">SECURE_SHELL_V2</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : status === 'error' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'}`}></div>
        </div>
      </div>

      {/* Story Context */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/20 shrink-0">
        <p className="text-zinc-300 text-sm leading-relaxed font-mono border-l-2 border-primary/50 pl-3">
          {mission.storyline}
        </p>
        
        {mission.clueUrl && (
          <a 
            href={mission.clueUrl} 
            target="_blank" 
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs text-accent hover:text-white transition-colors border border-accent/20 bg-accent/5 px-3 py-1.5 rounded"
          >
            <LinkIcon size={12} />
            ACESSAR DADOS EXTERNOS
          </a>
        )}
      </div>

      {/* Console Output */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs md:text-sm space-y-1.5 bg-black/80 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className={`break-words ${
            log.includes('SUCCESS') ? 'text-emerald-400' : 
            log.includes('ERROR') ? 'text-red-400' : 
            log.includes('WARNING') ? 'text-amber-400' : 
            'text-zinc-500'
          }`}>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area - Sticky at bottom */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-800 shrink-0 pb-safe">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md py-2.5 pl-7 pr-4 text-white font-mono text-sm focus:outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all placeholder-zinc-600"
              placeholder="Inserir código..."
              autoFocus
              disabled={status === 'success'}
            />
          </div>
          <Button type="submit" variant="primary" size="md" disabled={status === 'success' || !input} className="w-12 px-0">
            <Send size={18} />
          </Button>
        </form>
        <div className="flex justify-end">
           <button 
             onClick={requestHint}
             disabled={isGettingHint || status === 'success'}
             className="flex items-center gap-1.5 text-[10px] text-zinc-500 hover:text-accent transition-colors font-medium px-2 py-1 rounded hover:bg-zinc-900"
           >
             <Sparkles size={12} />
             SOLICITAR DICA DE IA
           </button>
        </div>
      </div>
    </div>
  );
};