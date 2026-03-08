import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';


vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        response: {
          use: vi.fn(),
        },
      },
    })),
  },
  create: vi.fn(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
  })),
}));


import { createApiInstance } from '../services/api';

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createApiInstance', () => {
    it('should create an axios instance', () => {
      const instance = createApiInstance();
      
      expect(axios.create).toHaveBeenCalled();
      expect(instance).toBeDefined();
    });

    it('should create an instance with correct configuration', () => {
      const instance = createApiInstance();
      
      expect(axios.create).toHaveBeenCalled();
      const callArgs = axios.create.mock.calls[0][0];
      expect(callArgs.headers).toEqual({
        'Content-Type': 'application/json',
      });
      expect(callArgs.baseURL).toBeDefined();
    });

    it('should create an instance with custom endpoint', () => {
      const endpoint = 'projects';
      const instance = createApiInstance(endpoint);
      
      expect(axios.create).toHaveBeenCalled();
      expect(instance).toBeDefined();
    });

    it('should set correct headers', () => {
      const instance = createApiInstance();
      
      const callArgs = axios.create.mock.calls[0][0];
      expect(callArgs.headers).toEqual({
        'Content-Type': 'application/json',
      });
    });
  });
});

