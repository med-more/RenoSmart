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

export const removeRenovationRequest = createAsyncThunk(
  'renovation/deleteRequest',
  async (id, { rejectWithValue }) => {
    try {
      await deleteRenovationRequest(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  requests: [],
  currentRequest: null,
  loading: false,
  error: null,
};

const renovationSlice = createSlice({
  name: 'renovation',
  initialState,
  reducers: {

    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },

    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(addRenovationRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRenovationRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload);
      })
      .addCase(addRenovationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllRenovationRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRenovationRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload || [];
      })
      .addCase(getAllRenovationRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        if (state.currentRequest?.id === action.payload.id) {
          state.currentRequest = action.payload;
        }
      })

      .addCase(updateRequestInternalNotes.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        if (state.currentRequest?.id === action.payload.id) {
          state.currentRequest = action.payload;
        }
      })

      .addCase(updateRequestPDF.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        if (state.currentRequest?.id === action.payload.id) {
          state.currentRequest = action.payload;
        }
      })

      .addCase(removeRenovationRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(req => req.id !== action.payload);
        if (state.currentRequest?.id === action.payload) {
          state.currentRequest = null;
        }
      });
  },
});