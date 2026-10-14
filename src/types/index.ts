export type DeckActionType = 
  | 'obs-switch-scene'
  | 'obs-toggle-mute'
  | 'obs-toggle-record'
  | 'obs-toggle-stream'
  | 'obs-toggle-source'
  | 'audio-sfx-play'
  | 'timer-countdown';

export interface DeckButton {
  id: string;
  label: string;
  iconName: string;
  bgColor: string;
  textColor: string;
  actionType: DeckActionType;
  actionPayload: Record<string, any>;
  hapticFeedback: boolean;
}

export interface DeckProfile {
  id: string;
  name: string;
  gridRows: number;
  gridCols: number;
  buttons: DeckButton[];
}

export interface ObsConnectionConfig {
  host: string; // Ex: "192.168.1.100"
  port: number; // Ex: 4455
  password?: string;
  autoReconnect: boolean;
}
