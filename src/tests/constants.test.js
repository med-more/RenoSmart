/**
 * Tests des constantes
 * Ce qu'on vérifie : que les données de l'app (types de travaux, statuts) sont bien définies
 */
import { describe, it, expect } from 'vitest';
import {
  WORK_TYPES,
  REQUEST_STATUSES,
  STATUS_LABELS,
} from '../utils/constants';

describe('Constantes - Types de travaux', () => {
  it('contient 5 types de travaux', () => {
    expect(WORK_TYPES).toHaveLength(5);
  });

  it('chaque type a un id et un label', () => {
    WORK_TYPES.forEach((type) => {
      expect(type).toHaveProperty('id');
      expect(type).toHaveProperty('label');
      expect(typeof type.id).toBe('string');
      expect(typeof type.label).toBe('string');
    });
  });

  it('contient les types Peinture, Carrelage, Plomberie, Électricité, Autres', () => {
    const labels = WORK_TYPES.map((t) => t.label);
    expect(labels).toContain('Peinture');
    expect(labels).toContain('Carrelage');
    expect(labels).toContain('Plomberie');
    expect(labels).toContain('Électricité');
    expect(labels).toContain('Autres');
  });
});

describe('Constantes - Statuts des demandes', () => {
  it('contient les 4 statuts : Pending, In Review, Approved, Rejected', () => {
    expect(REQUEST_STATUSES.PENDING).toBe('Pending');
    expect(REQUEST_STATUSES.IN_REVIEW).toBe('In Review');
    expect(REQUEST_STATUSES.APPROVED).toBe('Approved');
    expect(REQUEST_STATUSES.REJECTED).toBe('Rejected');
  });

  it('a une traduction en français pour chaque statut', () => {
    expect(STATUS_LABELS[REQUEST_STATUSES.PENDING]).toBe('En attente');
    expect(STATUS_LABELS[REQUEST_STATUSES.IN_REVIEW]).toBe("En cours d'examen");
    expect(STATUS_LABELS[REQUEST_STATUSES.APPROVED]).toBe('Approuvé');
    expect(STATUS_LABELS[REQUEST_STATUSES.REJECTED]).toBe('Rejeté');
  });
});
