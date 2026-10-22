import { describe, it, expect } from 'vitest';
import { DEFAULT_PROFILES, executeMediaSimulatorAction, getSimulatedMediaState } from '../src/core/deck-store';
import { ObsClientManager } from '../src/core/obs-client';

describe('Garden StreamDeck Core Engine', () => {
  it('loads valid default profiles including IRL and Study with correct grid dimensions', () => {
    expect(DEFAULT_PROFILES.length).toBeGreaterThanOrEqual(4);

    const streamerProfile = DEFAULT_PROFILES.find(p => p.id === 'profile-streamer');
    expect(streamerProfile).toBeDefined();
    expect(streamerProfile?.buttons.length).toBe(12);

    const irlProfile = DEFAULT_PROFILES.find(p => p.id === 'profile-irl');
    expect(irlProfile).toBeDefined();
    expect(irlProfile?.name).toContain('IRL');
    expect(irlProfile?.buttons.length).toBe(8);

    const studyProfile = DEFAULT_PROFILES.find(p => p.id === 'profile-study');
    expect(studyProfile).toBeDefined();
    expect(studyProfile?.name).toContain('Estudo');
    expect(studyProfile?.buttons.some(b => b.actionType === 'media-play-pause')).toBe(true);

    const musicProfile = DEFAULT_PROFILES.find(p => p.id === 'profile-music');
    expect(musicProfile).toBeDefined();
    expect(musicProfile?.buttons.length).toBe(8);
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

  it('handles simulated media actions properly', () => {
    const initial = getSimulatedMediaState();
    expect(initial).toHaveProperty('isPlaying');

    const toggled = executeMediaSimulatorAction('media-play-pause');
    expect(toggled.isPlaying).toBe(!initial.isPlaying);

    const volUp = executeMediaSimulatorAction('media-volume-up');
    expect(volUp.volume).toBeGreaterThanOrEqual(initial.volume);

    const nextTrack = executeMediaSimulatorAction('media-next');
    expect(nextTrack.isPlaying).toBe(true);
    expect(typeof nextTrack.currentTrack).toBe('string');
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
