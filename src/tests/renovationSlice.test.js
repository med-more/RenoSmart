/**
 * Tests du slice Redux "renovation" (actions synchrones)
 * Ce qu'on vérifie : setCurrentRequest et clearCurrentRequest mettent à jour currentRequest
 */
import { describe, it, expect } from 'vitest';
import renovationReducer, {
  setCurrentRequest,
  clearCurrentRequest,
} from '../store/slices/renovationSlice';

describe('renovationSlice - État initial', () => {
  it('requests est un tableau vide', () => {
    const state = renovationReducer(undefined, { type: 'unknown' });
    expect(state.requests).toEqual([]);
  });

  it('currentRequest est null au départ', () => {
    const state = renovationReducer(undefined, { type: 'unknown' });
    expect(state.currentRequest).toBe(null);
  });

  it('loading est false, error est null', () => {
    const state = renovationReducer(undefined, { type: 'unknown' });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});

describe('renovationSlice - Actions synchrones', () => {
  it('setCurrentRequest enregistre la demande affichée', () => {
    const demande = { id: '1', clientName: 'Dupont', status: 'Pending' };
    const state = renovationReducer(undefined, setCurrentRequest(demande));
    expect(state.currentRequest).toEqual(demande);
  });

  it('clearCurrentRequest remet currentRequest à null', () => {
    const demande = { id: '1', clientName: 'Martin' };
    let state = renovationReducer(undefined, setCurrentRequest(demande));
    expect(state.currentRequest).not.toBe(null);
    state = renovationReducer(state, clearCurrentRequest());
    expect(state.currentRequest).toBe(null);
  });
});
