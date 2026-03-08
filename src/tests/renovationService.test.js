import { describe, it, expect, vi, beforeEach } from 'vitest';


vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));


vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
  post: vi.fn(),
}));


import {
  createRenovationRequest,
  fetchRenovationRequests,
  fetchRenovationRequestById,
  updateRenovationStatus,
  updateRenovationRequest,
  deleteRenovationRequest,
  notifyNewQuote,
  notifyStatusChange,
  sendRequestDetailsEmail,
} from '../services/renovationService';


import api from '../services/api';
import axios from 'axios';

describe('Renovation Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createRenovationRequest', () => {
    it('should create a renovation request successfully', async () => {
      const requestData = {
        clientName: 'John Doe',
        email: 'john@example.com',
        workType: 'peinture',
        surface: 50,
        description: 'Test description',
      };

      const mockResponse = { data: { id: '1', ...requestData } };
      api.post.mockResolvedValue(mockResponse);

      const result = await createRenovationRequest(requestData);

      expect(api.post).toHaveBeenCalledWith('', requestData);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failure', async () => {
      const requestData = { clientName: 'John Doe' };
      const errorMessage = 'Network error';
      api.post.mockRejectedValue(new Error(errorMessage));

      await expect(createRenovationRequest(requestData)).rejects.toThrow(
        `Erreur lors de la création de la demande: ${errorMessage}`
      );
    });
  });

  describe('fetchRenovationRequests', () => {
    it('should fetch all renovation requests', async () => {
      const mockResponse = {
        data: [
          { id: '1', clientName: 'John Doe' },
          { id: '2', clientName: 'Jane Doe' },
        ],
      };
      api.get.mockResolvedValue(mockResponse);

      const result = await fetchRenovationRequests();

      expect(api.get).toHaveBeenCalledWith('');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failure', async () => {
      const errorMessage = 'Network error';
      api.get.mockRejectedValue(new Error(errorMessage));

      await expect(fetchRenovationRequests()).rejects.toThrow(
        `Erreur lors de la récupération des demandes: ${errorMessage}`
      );
    });
  });

  describe('fetchRenovationRequestById', () => {
    it('should fetch a specific renovation request', async () => {
      const id = '1';
      const mockResponse = { data: { id, clientName: 'John Doe' } };
      api.get.mockResolvedValue(mockResponse);

      const result = await fetchRenovationRequestById(id);

      expect(api.get).toHaveBeenCalledWith(`/${id}`);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failure', async () => {
      const id = '1';
      const errorMessage = 'Not found';
      api.get.mockRejectedValue(new Error(errorMessage));

      await expect(fetchRenovationRequestById(id)).rejects.toThrow(
        `Erreur lors de la récupération de la demande: ${errorMessage}`
      );
    });
  });

  describe('updateRenovationStatus', () => {
    it('should update renovation status', async () => {
      const id = '1';
      const status = 'Approved';
      const mockResponse = { data: { id, status } };
      api.put.mockResolvedValue(mockResponse);

      const result = await updateRenovationStatus(id, status);

      expect(api.put).toHaveBeenCalledWith(`/${id}`, { status });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failure', async () => {
      const id = '1';
      const status = 'Approved';
      const errorMessage = 'Update failed';
      api.put.mockRejectedValue(new Error(errorMessage));

      await expect(updateRenovationStatus(id, status)).rejects.toThrow(
        `Erreur lors de la mise à jour du statut: ${errorMessage}`
      );
    });
  });

  describe('updateRenovationRequest', () => {
    it('should update renovation request', async () => {
      const id = '1';
      const requestData = { description: 'Updated description' };
      const mockResponse = { data: { id, ...requestData } };
      api.put.mockResolvedValue(mockResponse);

      const result = await updateRenovationRequest(id, requestData);

      expect(api.put).toHaveBeenCalledWith(`/${id}`, requestData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteRenovationRequest', () => {
    it('should delete a renovation request', async () => {
      const id = '1';
      const mockResponse = { data: {} };
      api.delete.mockResolvedValue(mockResponse);

      const result = await deleteRenovationRequest(id);

      expect(api.delete).toHaveBeenCalledWith(`/${id}`);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error on failure', async () => {
      const id = '1';
      const errorMessage = 'Delete failed';
      api.delete.mockRejectedValue(new Error(errorMessage));

      await expect(deleteRenovationRequest(id)).rejects.toThrow(
        `Erreur lors de la suppression de la demande: ${errorMessage}`
      );
    });
  });

  describe('notifyNewQuote', () => {
    it('should send notification when webhook URL is configured', async () => {
      const webhookUrl = 'https://example.com/webhook';
      const quoteData = { id: '1', amount: 1000 };
      
      import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL = webhookUrl;
      const mockPost = vi.fn().mockResolvedValue({ data: { success: true } });
      axios.post = mockPost;
      axios.default = { post: mockPost };

      await notifyNewQuote(quoteData);

      expect(mockPost).toHaveBeenCalledWith(webhookUrl, quoteData);
      delete import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL;
    });

    it('should not send notification when webhook URL is not configured', async () => {
      delete import.meta.env.VITE_N8N_QUOTE_WEBHOOK_URL;
      const quoteData = { id: '1', amount: 1000 };
      const mockPost = vi.fn();
      axios.post = mockPost;
      axios.default = { post: mockPost };

      await notifyNewQuote(quoteData);

      expect(mockPost).not.toHaveBeenCalled();
    });
  });

  describe('notifyStatusChange', () => {
    it('should send status change notification when webhook URL is configured', async () => {
      const webhookUrl = 'https://example.com/webhook';
      const requestData = { id: '1', status: 'Approved' };
      
      import.meta.env.VITE_N8N_STATUS_WEBHOOK_URL = webhookUrl;
      global.fetch = vi.fn().mockResolvedValue({ ok: true });

      await notifyStatusChange(requestData);

      expect(global.fetch).toHaveBeenCalledWith(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        mode: 'no-cors',
      });
      delete import.meta.env.VITE_N8N_STATUS_WEBHOOK_URL;
    });

    it('should not send notification when webhook URL is not configured', async () => {
      delete import.meta.env.VITE_N8N_STATUS_WEBHOOK_URL;
      const requestData = { id: '1', status: 'Approved' };

      await notifyStatusChange(requestData);

      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('sendRequestDetailsEmail', () => {
    it('should send email with request details', async () => {
      const webhookUrl = 'https://example.com/webhook';
      const requestData = {
        id: '1',
        clientName: 'John Doe',
        email: 'john@example.com',
      };
      
      import.meta.env.VITE_N8N_SEND_DETAILS_WEBHOOK_URL = webhookUrl;
      global.fetch = vi.fn().mockResolvedValue({ ok: true });

      await sendRequestDetailsEmail(requestData);

      expect(global.fetch).toHaveBeenCalled();
      delete import.meta.env.VITE_N8N_SEND_DETAILS_WEBHOOK_URL;
    });

    it('should handle large PDF files', async () => {
      const webhookUrl = 'https://example.com/webhook';
      const largePdf = 'a'.repeat(6 * 1024 * 1024); // 6MB
      const requestData = {
        id: '1',
        pdfFile: largePdf,
      };
      
      import.meta.env.VITE_N8N_SEND_DETAILS_WEBHOOK_URL = webhookUrl;
      global.fetch = vi.fn().mockResolvedValue({ ok: true });

      await sendRequestDetailsEmail(requestData);

      expect(global.fetch).toHaveBeenCalled();
      const callArgs = global.fetch.mock.calls[0][1];
      const sentData = JSON.parse(callArgs.body);
      expect(sentData.pdfTooLarge).toBe(true);
      delete import.meta.env.VITE_N8N_SEND_DETAILS_WEBHOOK_URL;
    });
  });
});

