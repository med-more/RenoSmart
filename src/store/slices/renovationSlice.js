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