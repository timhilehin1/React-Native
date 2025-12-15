// ToastContext.tsx
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Toast, ToastContextType, ToastOptions, ToastType } from './types';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>): string | number => {
    const id = Date.now() + Math.random();
    const newToast: Toast = { id, ...toast };
    
    setToasts(prev => {
      if (prev.length > 0 && prev[0].onClose) {
        prev[0].onClose();
      }
      return [newToast];
    });
    
    // Auto dismiss
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
    
    return id;
  }, []);


   const removeToast = useCallback((id: string | number) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      if (toast?.onClose) {
        toast.onClose();
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const createToastMethod = useCallback((type: ToastType, defaultDuration?: number) => {
    return (message: string, options: ToastOptions = {}): string | number => {
      return addToast({
        type,
        message,
        duration: defaultDuration,
        ...options
      });
    };
  }, [addToast]);

  const success = useCallback((message: string, options: ToastOptions = {}) => {
    return createToastMethod('success')(message, options);
  }, [createToastMethod]);

  const error = useCallback((message: string, options: ToastOptions = {}) => {
    return createToastMethod('error', 4000)(message, options); // Error toasts stay longer
  }, [createToastMethod]);

  const warn = useCallback((message: string, options: ToastOptions = {}) => {
    return createToastMethod('warn')(message, options);
  }, [createToastMethod]);

  const info = useCallback((message: string, options: ToastOptions = {}) => {
    return createToastMethod('info')(message, options);
  }, [createToastMethod]);

  const dismiss = useCallback((id?: string | number) => {
    if (id) {
      removeToast(id);
    } else {
      // Dismiss all toasts
      setToasts(prev => {
        prev.forEach(toast => {
          if (toast.onClose) {
            toast.onClose();
          }
        });
        return [];
      });
    }
  }, [removeToast]);

  const value: ToastContextType = {
    toasts,
    success,
    error,
    warn,
    info,
    dismiss,
    addToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};