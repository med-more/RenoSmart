import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '2px solid #E5E7EB',
            borderRadius: '0.5rem 1.5rem 1.5rem 0.5rem', // asymmetric
            padding: '16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
            style: {
              border: '2px solid #10B981',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
            style: {
              border: '2px solid #EF4444',
            },
          },
          loading: {
            iconTheme: {
              primary: '#FFA726',
              secondary: '#fff',
            },
            style: {
              border: '2px solid #FFA726',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
