// src/components/ToastConfig.jsx
import { Toaster } from 'react-hot-toast';

export default function ToastConfig() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Global styles
        style: {
          background: '#1e293b', // slate-800
          color: '#f8fafc', // slate-50
          borderRadius: '12px',
          fontSize: '0.9rem',
        },
        success: {
          icon: '✅',
        },
        error: {
          icon: '❌',
        },
        loading: {
          icon: '⏳',
        },
      }}
    />
  );
}
