import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createRenovationRequest,
  fetchRenovationRequests,
  updateRenovationStatus,
  deleteRenovationRequest,
  updateRenovationRequest,
  notifyStatusChange,
} from '../../services/renovationService';

export const addRenovationRequest = createAsyncThunk(
  'renovation/addRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await createRenovationRequest(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllRenovationRequests = createAsyncThunk(
  'renovation/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchRenovationRequests();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'renovation/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateRenovationStatus(id, status);

      try {
        await notifyStatusChange(response.data);
      } catch (notifyError) {

        console.warn('Notification n8n (changement de statut) non envoyée :', notifyError);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRequestInternalNotes = createAsyncThunk(
  'renovation/updateInternalNotes',
  async ({ id, internalNotes }, { rejectWithValue }) => {
    try {
      const response = await updateRenovationRequest(id, { internalNotes });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRequestPDF = createAsyncThunk(
  'renovation/updatePDF',
  async ({ id, pdfFile }, { rejectWithValue }) => {
    try {
      const response = await updateRenovationRequest(id, { pdfFile });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);