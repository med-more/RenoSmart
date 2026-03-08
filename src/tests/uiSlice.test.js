/**
 * Tests du slice Redux "ui"
 * Ce qu'on vérifie : les actions mettent bien à jour l'état (loading, erreurs, messages)
 */
import { describe, it, expect } from 'vitest';
import uiReducer, { setLoading, setError, setSuccessMessage, clearMessages } from '../store/slices/uiSlice';

describe('uiSlice - État initial', () => {
  it('loading est false au départ', () => {
    const state = uiReducer(undefined, { type: 'unknown' });
    expect(state.loading).toBe(false);
  });

  it('error et successMessage sont null au départ', () => {
    const state = uiReducer(undefined, { type: 'unknown' });
    expect(state.error).toBe(null);
    expect(state.successMessage).toBe(null);
  });
});

describe('uiSlice - Actions', () => {
  it('setLoading met loading à true', () => {
    const state = uiReducer(undefined, setLoading(true));
    expect(state.loading).toBe(true);
  });

  it('setLoading met loading à false', () => {
    const state = uiReducer(undefined, setLoading(false));
    expect(state.loading).toBe(false);
  });

  it('setError enregistre le message et met loading à false', () => {
    const state = uiReducer(undefined, setError('Erreur réseau'));
    expect(state.error).toBe('Erreur réseau');
    expect(state.loading).toBe(false);
  });

  it('setSuccessMessage enregistre le message et met loading à false', () => {
    const state = uiReducer(undefined, setSuccessMessage('Demande envoyée'));
    expect(state.successMessage).toBe('Demande envoyée');
    expect(state.loading).toBe(false);
  });

  it('clearMessages remet error et successMessage à null', () => {
    let state = uiReducer(undefined, setError('Erreur'));
    state = uiReducer(state, setSuccessMessage('OK'));
    state = uiReducer(state, clearMessages());
    expect(state.error).toBe(null);
    expect(state.successMessage).toBe(null);
  });
});
