/**
 * Stream Deck Profile Store & Haptic Controller
 * Persiste perfis e botões customizáveis em localStorage e aciona feedback tátil nativo no Android/Web.
 */

import { DeckProfile, DeckButton, DeckActionType, MediaSimulatorState } from '../types';

export const DEFAULT_PROFILES: DeckProfile[] = [
  {
    id: 'profile-streamer',
    name: '🎮 Streamer Essentials',
    gridRows: 3,
    gridCols: 4,
    buttons: [
      {
        id: 'btn-1',
        label: 'Abertura',
        iconName: 'Tv',
        bgColor: '#1e293b',
        textColor: '#38bdf8',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Abertura' },
        hapticFeedback: true
      },
      {
        id: 'btn-2',
        label: 'Gameplay',
        iconName: 'Gamepad2',
        bgColor: '#1e293b',
        textColor: '#4ade80',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Gameplay' },
        hapticFeedback: true
      },
      {
        id: 'btn-3',
        label: 'Facecam',
        iconName: 'Camera',
        bgColor: '#1e293b',
        textColor: '#c084fc',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Facecam Cheia' },
        hapticFeedback: true
      },
      {
        id: 'btn-4',
        label: 'BRB / Pausa',
        iconName: 'Coffee',
        bgColor: '#1e293b',
        textColor: '#fbbf24',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'BRB / Pausa' },
        hapticFeedback: true
      },
      {
        id: 'btn-5',
        label: 'Mic Mute',
        iconName: 'Mic',
        bgColor: '#881337',
        textColor: '#f43f5e',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Microfone' },
        hapticFeedback: true
      },
      {
        id: 'btn-6',
        label: 'Game Mute',
        iconName: 'Volume2',
        bgColor: '#1e1b4b',
        textColor: '#818cf8',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Áudio do Jogo / Desktop' },
        hapticFeedback: true
      },
      {
        id: 'btn-7',
        label: 'Gravar REC',
        iconName: 'Disc',
        bgColor: '#450a0a',
        textColor: '#ef4444',
        actionType: 'obs-toggle-record',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'btn-8',
        label: 'Transmissão',
        iconName: 'Radio',
        bgColor: '#14532d',
        textColor: '#22c55e',
        actionType: 'obs-toggle-stream',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'btn-9',
        label: 'Aplausos',
        iconName: 'Sparkles',
        bgColor: '#312e81',
        textColor: '#a5b4fc',
        actionType: 'audio-sfx-play',
        actionPayload: { sound: 'applause' },
        hapticFeedback: true
      },
      {
        id: 'btn-10',
        label: 'Airhorn',
        iconName: 'VolumeX',
        bgColor: '#713f12',
        textColor: '#facc15',
        actionType: 'audio-sfx-play',
        actionPayload: { sound: 'airhorn' },
        hapticFeedback: true
      },
      {
        id: 'btn-11',
        label: 'Timer 5m',
        iconName: 'Clock',
        bgColor: '#134e4a',
        textColor: '#2dd4bf',
        actionType: 'timer-countdown',
        actionPayload: { minutes: 5 },
        hapticFeedback: true
      },
      {
        id: 'btn-12',
        label: 'Blackout',
        iconName: 'EyeOff',
        bgColor: '#020617',
        textColor: '#94a3b8',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Blackout' },
        hapticFeedback: true
      }
    ]
  },
  {
    id: 'profile-irl',
    name: '🚶 IRL & Vlogging Ao Vivo',
    gridRows: 2,
    gridCols: 4,
    buttons: [
      {
        id: 'irl-1',
        label: 'Cam Principal',
        iconName: 'Camera',
        bgColor: '#1e293b',
        textColor: '#38bdf8',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Cam Traseira' },
        hapticFeedback: true
      },
      {
        id: 'irl-2',
        label: 'Selfie Cam',
        iconName: 'Smartphone',
        bgColor: '#1e293b',
        textColor: '#a855f7',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Selfie Cam' },
        hapticFeedback: true
      },
      {
        id: 'irl-3',
        label: 'Mute Lapela',
        iconName: 'MicOff',
        bgColor: '#881337',
        textColor: '#f43f5e',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Lapela Wireless' },
        hapticFeedback: true
      },
      {
        id: 'irl-4',
        label: 'Mapa / GPS',
        iconName: 'Compass',
        bgColor: '#14532d',
        textColor: '#4ade80',
        actionType: 'obs-toggle-source',
        actionPayload: { sourceName: 'GPS Overlay' },
        hapticFeedback: true
      },
      {
        id: 'irl-5',
        label: 'Live Toggle',
        iconName: 'Radio',
        bgColor: '#7f1d1d',
        textColor: '#fca5a5',
        actionType: 'obs-toggle-stream',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'irl-6',
        label: 'Gravar 4K',
        iconName: 'Disc',
        bgColor: '#450a0a',
        textColor: '#ef4444',
        actionType: 'obs-toggle-record',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'irl-7',
        label: 'Buzina SFX',
        iconName: 'Volume2',
        bgColor: '#713f12',
        textColor: '#fde047',
        actionType: 'audio-sfx-play',
        actionPayload: { sound: 'airhorn' },
        hapticFeedback: true
      },
      {
        id: 'irl-8',
        label: 'Tela Escura',
        iconName: 'EyeOff',
        bgColor: '#020617',
        textColor: '#94a3b8',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Blackout' },
        hapticFeedback: true
      }
    ]
  },
  {
    id: 'profile-study',
    name: '📚 Estudo, Lofi & Foco',
    gridRows: 2,
    gridCols: 4,
    buttons: [
      {
        id: 'std-1',
        label: 'Lofi Play/Pause',
        iconName: 'Play',
        bgColor: '#312e81',
        textColor: '#818cf8',
        actionType: 'media-play-pause',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'std-2',
        label: 'Próxima Faixa',
        iconName: 'SkipForward',
        bgColor: '#1e1b4b',
        textColor: '#a5b4fc',
        actionType: 'media-next',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'std-3',
        label: 'Vol -',
        iconName: 'Volume1',
        bgColor: '#0f172a',
        textColor: '#94a3b8',
        actionType: 'media-volume-down',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'std-4',
        label: 'Vol +',
        iconName: 'Volume2',
        bgColor: '#0f172a',
        textColor: '#38bdf8',
        actionType: 'media-volume-up',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'std-5',
        label: 'Pomodoro 25m',
        iconName: 'Clock',
        bgColor: '#064e3b',
        textColor: '#34d399',
        actionType: 'timer-countdown',
        actionPayload: { minutes: 25 },
        hapticFeedback: true
      },
      {
        id: 'std-6',
        label: 'Pausa 5m',
        iconName: 'Coffee',
        bgColor: '#78350f',
        textColor: '#fbbf24',
        actionType: 'timer-countdown',
        actionPayload: { minutes: 5 },
        hapticFeedback: true
      },
      {
        id: 'std-7',
        label: 'Chuva SFX',
        iconName: 'Headphones',
        bgColor: '#164e63',
        textColor: '#22d3ee',
        actionType: 'audio-sfx-play',
        actionPayload: { sound: 'applause' },
        hapticFeedback: true
      },
      {
        id: 'std-8',
        label: 'Modo Leitura',
        iconName: 'BookOpen',
        bgColor: '#1e293b',
        textColor: '#f1f5f9',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Leitura Foco' },
        hapticFeedback: true
      }
    ]
  },
  {
    id: 'profile-music',
    name: '🎸 Palco & Rig Ao Vivo',
    gridRows: 2,
    gridCols: 4,
    buttons: [
      {
        id: 'm-1',
        label: 'Soltar Trilha',
        iconName: 'Play',
        bgColor: '#064e3b',
        textColor: '#34d399',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Play VS' },
        hapticFeedback: true
      },
      {
        id: 'm-2',
        label: 'Parar Mídia',
        iconName: 'Square',
        bgColor: '#7f1d1d',
        textColor: '#f87171',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Stop VS' },
        hapticFeedback: true
      },
      {
        id: 'm-3',
        label: 'Mute Guitar',
        iconName: 'MicOff',
        bgColor: '#312e81',
        textColor: '#a5b4fc',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Guitarra' },
        hapticFeedback: true
      },
      {
        id: 'm-4',
        label: 'Mute Voz',
        iconName: 'MicOff',
        bgColor: '#831843',
        textColor: '#f472b6',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Voz Principal' },
        hapticFeedback: true
      },
      {
        id: 'm-5',
        label: 'Lead Solo',
        iconName: 'Flame',
        bgColor: '#78350f',
        textColor: '#fbbf24',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Solo Cam' },
        hapticFeedback: true
      },
      {
        id: 'm-6',
        label: 'Geral Mute',
        iconName: 'VolumeX',
        bgColor: '#450a0a',
        textColor: '#ef4444',
        actionType: 'obs-toggle-mute',
        actionPayload: { inputName: 'Master' },
        hapticFeedback: true
      },
      {
        id: 'm-7',
        label: 'Gravar Take',
        iconName: 'Disc',
        bgColor: '#172554',
        textColor: '#60a5fa',
        actionType: 'obs-toggle-record',
        actionPayload: {},
        hapticFeedback: true
      },
      {
        id: 'm-8',
        label: 'Afinador',
        iconName: 'Activity',
        bgColor: '#1e293b',
        textColor: '#38bdf8',
        actionType: 'obs-switch-scene',
        actionPayload: { sceneName: 'Tuner' },
        hapticFeedback: true
      }
    ]
  }
];

const STORAGE_KEY = 'garden_streamdeck_profiles';

export function loadProfiles(): DeckProfile[] {
  if (typeof window === 'undefined') return DEFAULT_PROFILES;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length >= DEFAULT_PROFILES.length) return parsed;
    }
  } catch {}
  return DEFAULT_PROFILES;
}

export function saveProfiles(profiles: DeckProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch {}
}

export function triggerHaptic(durationMs = 40): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(durationMs);
    } catch {}
  }
}

// Simulador e Gerenciador de Ações de Mídia Local (Play/Pause, Faixas, Volume)
let simulatedMediaState: MediaSimulatorState = {
  isPlaying: false,
  volume: 75,
  currentTrack: 'Lofi Chill Garden #1'
};

const TRACK_LIST = [
  'Lofi Chill Garden #1',
  'Acoustic Sunset Breeze #2',
  'Coding Deep Focus Beats #3',
  'Night Drive Synthwave #4'
];

export function getSimulatedMediaState(): MediaSimulatorState {
  return { ...simulatedMediaState };
}

export function executeMediaSimulatorAction(actionType: DeckActionType): MediaSimulatorState {
  switch (actionType) {
    case 'media-play-pause':
      simulatedMediaState.isPlaying = !simulatedMediaState.isPlaying;
      break;
    case 'media-next': {
      const idx = TRACK_LIST.indexOf(simulatedMediaState.currentTrack);
      const nextIdx = (idx + 1) % TRACK_LIST.length;
      simulatedMediaState.currentTrack = TRACK_LIST[nextIdx];
      simulatedMediaState.isPlaying = true;
      break;
    }
    case 'media-prev': {
      const idx = TRACK_LIST.indexOf(simulatedMediaState.currentTrack);
      const prevIdx = (idx - 1 + TRACK_LIST.length) % TRACK_LIST.length;
      simulatedMediaState.currentTrack = TRACK_LIST[prevIdx];
      simulatedMediaState.isPlaying = true;
      break;
    }
    case 'media-volume-up':
      simulatedMediaState.volume = Math.min(100, simulatedMediaState.volume + 10);
      break;
    case 'media-volume-down':
      simulatedMediaState.volume = Math.max(0, simulatedMediaState.volume - 10);
      break;
    case 'media-mute':
      simulatedMediaState.volume = simulatedMediaState.volume === 0 ? 75 : 0;
      break;
    default:
      break;
  }

  // Notificar Web Media Session API se disponível no navegador
  if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
    try {
      navigator.mediaSession.playbackState = simulatedMediaState.isPlaying ? 'playing' : 'paused';
    } catch {}
  }

  return { ...simulatedMediaState };
}
