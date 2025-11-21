import { Difficulty, Mission, Badge } from './types';

export const INITIAL_STATE = {
  level: 1,
  currentXp: 0,
  completedMissions: [],
  unlockedBadges: [],
  username: 'Guest_Engineer'
};

export const MISSIONS: Mission[] = [
  {
    id: 'm001',
    title: 'O Portal',
    description: 'A chave de acesso está escondida onde o Sol nasce para um programador.',
    storyline: 'Interceptamos uma página da web antiga que atua como um portal para a rede dos Arquitetos. Eles deixaram uma mensagem escondida para quem sabe olhar além da superfície. Inspecione o código-fonte e encontre a frase secreta.',
    clueUrl: 'https://github.com/google-gemini/codex-treasure-hunt/tree/main/portal-01', 
    difficulty: Difficulty.EASY,
    xpReward: 100,
    answerHash: 'o tempo esta a despertar',
    hint: 'Abra o link. Use "Inspecionar Elemento" ou "Exibir Código Fonte". Procure por comentários HTML <!-- -->.',
    requiredLevel: 1
  },
  {
    id: 'm002',
    title: 'Sussurros Binários',
    description: 'Traduza a transmissão numérica para a linguagem humana.',
    storyline: 'O Portal nos forneceu uma sequência de números binários. É um protocolo básico de comunicação, mas essencial para entender como as máquinas falam. Decodifique a mensagem para revelar o próximo alvo.',
    clueUrl: 'https://github.com/google-gemini/codex-treasure-hunt/blob/main/pista-02/transmission.txt',
    difficulty: Difficulty.EASY,
    xpReward: 150,
    answerHash: 'http',
    hint: 'Copie a sequência de 0s e 1s. Use uma ferramenta de tradução Binário para Texto (ASCII).',
    requiredLevel: 1
  },
  {
    id: 'm003',
    title: 'O Fragmento Perdido',
    description: 'Reconstrua a função de navegação corrompida.',
    storyline: 'Recuperamos fragmentos de um script vital do sistema de navegação da nave. O código está quebrado em pedaços espalhados pelo repositório. Sua missão é montar a função JavaScript corretamente para restaurar os motores.',
    clueUrl: 'https://github.com/google-gemini/codex-treasure-hunt/tree/main/fragment-hub',
    difficulty: Difficulty.MEDIUM,
    xpReward: 300,
    answerHash: 'function soma(a,b){return a+b}',
    hint: 'A sintaxe correta de uma função requer a palavra chave function, parênteses para argumentos e chaves para o corpo.',
    requiredLevel: 2
  }
];

export const BADGES: Badge[] = [
  { id: 'b001', name: 'Iniciado', icon: '🌱', description: 'Completou o treinamento básico e abriu o Portal.' },
  { id: 'b002', name: 'Criptógrafo', icon: '🔓', description: 'Quebrou a cifra binária com sucesso.' },
  { id: 'b003', name: 'Arquiteto', icon: '🏗️', description: 'Alcançou o nível 5 de acesso ao sistema.' },
  { id: 'b004', name: 'Caçador', icon: '🧭', description: 'Encontrou todas as pistas escondidas na web.' },
];

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500];