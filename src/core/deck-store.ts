/**
 * Stream Deck Profile Store & Haptic Controller
 * Persiste perfis e botões customizáveis em localStorage e aciona feedback tátil nativo no Android/Web.
 */

import { DeckProfile, DeckButton } from '../types';

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
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
