import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

const SEM_TOAST = { mostrarToast: () => {} };

export default function useToast() {
  return useContext(ToastContext) || SEM_TOAST;
}
