import { describe, it, expect } from 'vitest';
import * as Yup from 'yup';
import { WORK_TYPES } from '../utils/constants';


const renovationSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .required('Le nom est requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('L\'email est requis'),
  phone: Yup.string()
    .matches(/^(\+212|0)[5-7]\d{8}$|^$/, 'Numéro de téléphone invalide (format marocain attendu: +212 612 345 678 ou 0612345678)')
    .nullable(),
  workType: Yup.string()
    .oneOf(WORK_TYPES.map(type => type.id), 'Veuillez sélectionner un type de travaux valide')
    .required('Veuillez sélectionner un type de travaux'),
  surface: Yup.number()
    .typeError('La surface doit être un nombre')
    .positive('La surface doit être supérieure à 0')
    .min(1, 'La surface doit être d\'au moins 1 m²')
    .max(10000, 'La surface ne peut pas dépasser 10000 m²')
    .required('La surface est requise'),
  budget: Yup.number()
    .typeError('Le budget doit être un nombre')
    .min(0, 'Le budget ne peut pas être négatif')
    .nullable(),
  description: Yup.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères')
    .required('La description est requise'),
});

describe('Renovation Form Validation', () => {
  describe('clientName validation', () => {
    it('should accept valid name', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject name shorter than 2 characters', async () => {
      const invalidData = {
        clientName: 'J',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Le nom doit contenir au moins 2 caractères'
      );
    });

    it('should reject name longer than 50 characters', async () => {
      const invalidData = {
        clientName: 'A'.repeat(51),
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Le nom ne peut pas dépasser 50 caractères'
      );
    });

    it('should require clientName', async () => {
      const invalidData = {
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Le nom est requis'
      );
    });
  });

  describe('email validation', () => {
    it('should accept valid email', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject invalid email', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'invalid-email',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Email invalide'
      );
    });

    it('should require email', async () => {
      const invalidData = {
        clientName: 'John Doe',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'L\'email est requis'
      );
    });
  });

  describe('phone validation', () => {
    it('should accept valid Moroccan phone number with +212', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        phone: '+212612345678',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should accept valid Moroccan phone number starting with 0', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        phone: '0612345678',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should accept empty phone (optional)', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        phone: '',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject invalid phone number', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Numéro de téléphone invalide'
      );
    });
  });

  describe('workType validation', () => {
    it('should accept valid work type', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject invalid work type', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'invalid-type',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Veuillez sélectionner un type de travaux valide'
      );
    });

    it('should require workType', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Veuillez sélectionner un type de travaux'
      );
    });
  });

  describe('surface validation', () => {
    it('should accept valid surface', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject surface less than 1', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 0,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should reject surface greater than 10000', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 10001,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'La surface ne peut pas dépasser 10000 m²'
      );
    });

    it('should reject non-numeric surface', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 'not-a-number',
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'La surface doit être un nombre'
      );
    });
  });

  describe('budget validation', () => {
    it('should accept valid budget', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        budget: 2000,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should accept null budget (optional)', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        budget: null,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject negative budget', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        budget: -100,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'Le budget ne peut pas être négatif'
      );
    });
  });

  describe('description validation', () => {
    it('should accept valid description', async () => {
      const validData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'This is a valid description with enough characters',
      };

      await expect(renovationSchema.validate(validData)).resolves.toBeTruthy();
    });

    it('should reject description shorter than 10 characters', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'Short',
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'La description doit contenir au moins 10 caractères'
      );
    });

    it('should reject description longer than 2000 characters', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'A'.repeat(2001),
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'La description ne peut pas dépasser 2000 caractères'
      );
    });

    it('should require description', async () => {
      const invalidData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
      };

      await expect(renovationSchema.validate(invalidData)).rejects.toThrow(
        'La description est requise'
      );
    });
  });
});

