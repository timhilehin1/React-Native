// types/toast.ts
import React from "react";
import { TextStyle, ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'warn' | 'info' | 'custom';

export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  duration?: number;
  onClose?: () => void;
  subtitle?: string;
  icon?: string | React.ReactNode;
  iconColor?: string;
  messageStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  showCloseButton?: boolean;
  customComponent?: React.ReactNode;
  blockInteraction?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export interface Toast extends ToastOptions {
  id: string | number;
  type: ToastType;
  message: string;
}

export interface ToastContextType {
  toasts: Toast[];
  success: (message: string, options?: ToastOptions) => string | number;
  error: (message: string, options?: ToastOptions) => string | number;
  warn: (message: string, options?: ToastOptions) => string | number;
  info: (message: string, options?: ToastOptions) => string | number;
  dismiss: (id?: string | number) => void;
  addToast: (toast: Omit<Toast, 'id'>) => string | number;
}


export interface ToastStyles {
  toastContainer: ViewStyle;
  toast: ViewStyle;
  toastContent: ViewStyle;
  iconContainer: ViewStyle;
  messageContainer: ViewStyle;
  message: TextStyle;
  subtitle: TextStyle;
  closeButton: ViewStyle;
  defaultToast: ViewStyle;
  successToast: ViewStyle;
  errorToast: ViewStyle;
  warnToast: ViewStyle;
  infoToast: ViewStyle;
}