import { useEffect, useRef } from 'react';
import { useResumeStore } from '../store/resumeStore';

// Auto-save to localStorage every 30 seconds
export function useAutoSave(intervalMs: number = 30000) {
  const saveToLocalStorage = useResumeStore((s) => s.saveToLocalStorage);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Start auto-save timer
    timerRef.current = setInterval(() => {
      saveToLocalStorage();
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [intervalMs, saveToLocalStorage]);

  // Also save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveToLocalStorage]);

  return null;
}
