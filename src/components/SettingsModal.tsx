import React, { useState } from 'react';
import { X, Wifi, Shield, Server } from 'lucide-react';
import { ObsConnectionConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ObsConnectionConfig;
  onSave: (config: ObsConnectionConfig) => void;
  isConnected: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  isConnected
}) => {
  const [host, setHost] = useState(config.host);
  const [port, setPort] = useState(config.port);
  const [password, setPassword] = useState(config.password || '');
  const [autoReconnect, setAutoReconnect] = useState(config.autoReconnect);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      host,
      port: Number(port),
      password,
      autoReconnect
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Configurações do OBS Studio (WebSocket v5)</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Endereço IP / Host</label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="127.0.0.1 ou 192.168.1.X"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500">Para celular Android, use o IP da sua máquina na rede local</span>
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Porta WebSocket</label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              placeholder="4455"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-slate-300">Senha do Servidor OBS (Opcional)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Deixe em branco se desativada"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="autoReconnect"
              checked={autoReconnect}
              onChange={(e) => setAutoReconnect(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="autoReconnect" className="text-xs text-slate-300">
              Reconectar automaticamente em caso de queda
            </label>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl cursor-pointer"
            >
              Conectar & Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
