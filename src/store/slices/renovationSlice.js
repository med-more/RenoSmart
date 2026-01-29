import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createRenovationRequest,
  fetchRenovationRequests,
  updateRenovationStatus,
  deleteRenovationRequest,
  updateRenovationRequest,
  notifyStatusChange,
} from '../../services/renovationService';