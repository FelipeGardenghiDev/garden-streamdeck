import { describe, it, expect } from 'vitest';
import { DEFAULT_PROFILES, loadProfiles } from '../src/core/deck-store';
import { ObsClientManager } from '../src/core/obs-client';

describe('Garden StreamDeck Core Engine', () => {
  it('loads valid default profiles with correct grid dimensions and actions', () => {
    expect(DEFAULT_PROFILES.length).toBeGreaterThanOrEqual(2);
    const streamerProfile = DEFAULT_PROFILES[0];
    expect(streamerProfile.name).toContain('Streamer');
    expect(streamerProfile.gridRows).toBe(3);
    expect(streamerProfile.gridCols).toBe(4);
    expect(streamerProfile.buttons.length).toBe(12);

    const musicProfile = DEFAULT_PROFILES[1];
    expect(musicProfile.gridRows).toBe(2);
    expect(musicProfile.gridCols).toBe(4);
    expect(musicProfile.buttons.length).toBe(8);
  });

  it('correctly toggles scenes and states in offline simulated mode', async () => {
    const obs = new ObsClientManager({ autoReconnect: false });
    const initialState = obs.getState();
    expect(initialState.connected).toBe(false);
    expect(initialState.streaming).toBe(false);
    expect(initialState.recording).toBe(false);

    // Switch scene
    await obs.switchScene('Gameplay');
    expect(obs.getState().currentScene).toBe('Gameplay');

    // Toggle stream
    await obs.toggleStream();
    expect(obs.getState().streaming).toBe(true);

    // Toggle record
    await obs.toggleRecord();
    expect(obs.getState().recording).toBe(true);

    // Toggle audio mute
    await obs.toggleMute('Microfone');
    const mic = obs.getState().audioInputs.find(i => i.name === 'Microfone');
    expect(mic?.muted).toBe(true);
  });

  it('notifies subscribers upon state changes', async () => {
    const obs = new ObsClientManager({ autoReconnect: false });
    let notifications = 0;
    const unsubscribe = obs.subscribe(() => {
      notifications++;
    });

    expect(notifications).toBe(1); // initial state call
    await obs.switchScene('Facecam Cheia');
    expect(notifications).toBe(2);

    unsubscribe();
    await obs.switchScene('Abertura');
    expect(notifications).toBe(2); // no more notifications after unsubscribe
  });
});
