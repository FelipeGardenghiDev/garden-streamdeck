import React, { useState, useEffect } from 'react';
import { obsManager, ObsStatusState } from './core/obs-client';
import { loadProfiles, saveProfiles } from './core/deck-store';
import { DeckProfile, DeckButton, ObsConnectionConfig } from './types';
import { DeckButtonComponent } from './components/DeckButtonComponent';
import { SettingsModal } from './components/SettingsModal';
import { Radio, Disc, Mic, VolumeX, Settings, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  const [profiles, setProfiles] = useState<DeckProfile[]>(loadProfiles);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [obsState, setObsState] = useState<ObsStatusState>(obsManager.getState());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [config, setConfig] = useState<ObsConnectionConfig>({
    host: '127.0.0.1',
    port: 4455,
    password: '',
    autoReconnect: true
  });

  const currentProfile = profiles[activeProfileIndex] || profiles[0];

  useEffect(() => {
    const unsubscribe = obsManager.subscribe((state) => {
      setObsState(state);
    });
    return unsubscribe;
  }, []);

  const handleAction = async (button: DeckButton) => {
    switch (button.actionType) {
      case 'obs-switch-scene':
        if (button.actionPayload?.sceneName) {
          await obsManager.switchScene(button.actionPayload.sceneName);
        }
        break;
      case 'obs-toggle-stream':
        await obsManager.toggleStream();
        break;
      case 'obs-toggle-record':
        await obsManager.toggleRecord();
        break;
      case 'obs-toggle-mute':
        if (button.actionPayload?.inputName) {
          await obsManager.toggleMute(button.actionPayload.inputName);
        }
        break;
      case 'audio-sfx-play':
        // Beep sintético local via Web Audio
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(button.actionPayload?.sound === 'airhorn' ? 220 : 880, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch {}
        break;
      default:
        break;
    }
  };

  const handleSaveSettings = (newConfig: ObsConnectionConfig) => {
    setConfig(newConfig);
    obsManager.connect(newConfig);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Header / Status Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-sm tracking-wider text-emerald-400">
            <span>🌿</span>
            <span>GARDEN DECK</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <select
              value={activeProfileIndex}
              onChange={(e) => setActiveProfileIndex(Number(e.target.value))}
              className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 cursor-pointer focus:outline-none"
            >
              {profiles.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live OBS Status Badges */}
        <div className="flex items-center gap-2">
          {obsState.connected ? (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
              <Wifi className="w-3 h-3" />
              <span>OBS CONECTADO</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
              <WifiOff className="w-3 h-3" />
              <span>SIMULADOR LOCAL</span>
            </div>
          )}

          {obsState.streaming && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold animate-pulse">
              <Radio className="w-3 h-3" />
              <span>LIVE</span>
            </div>
          )}

          {obsState.recording && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold">
              <Disc className="w-3 h-3 animate-spin" />
              <span>REC</span>
            </div>
          )}

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            title="Configurações OBS"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Deck Grid */}
      <main className="flex-1 p-3 overflow-hidden flex items-center justify-center">
        <div
          className="w-full h-full max-w-5xl grid gap-2.5"
          style={{
            gridTemplateRows: `repeat(${currentProfile.gridRows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${currentProfile.gridCols}, minmax(0, 1fr))`
          }}
        >
          {currentProfile.buttons.map((btn) => {
            const isButtonActive =
              (btn.actionType === 'obs-switch-scene' && obsState.currentScene === btn.actionPayload?.sceneName) ||
              (btn.actionType === 'obs-toggle-stream' && obsState.streaming) ||
              (btn.actionType === 'obs-toggle-record' && obsState.recording) ||
              (btn.actionType === 'obs-toggle-mute' &&
                obsState.audioInputs.find((i) => i.name === btn.actionPayload?.inputName)?.muted);

            return (
              <DeckButtonComponent
                key={btn.id}
                button={btn}
                onPress={handleAction}
                isActive={Boolean(isButtonActive)}
              />
            );
          })}
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveSettings}
        isConnected={obsState.connected}
      />
    </div>
  );
};
