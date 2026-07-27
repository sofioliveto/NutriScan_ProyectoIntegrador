'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'nutriscan-pwa-install-dismissed-at';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;

    if (isStandalone) return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_COOLDOWN_MS) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-[60] mx-auto flex w-[calc(100%-1.5rem)] max-w-md items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg lg:bottom-4">
      <img src="/icons/icon-192.png" alt="" className="h-10 w-10 rounded-lg" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">Instalar NutriScan</p>
        <p className="truncate text-xs text-gray-500">Accedé más rápido desde tu pantalla de inicio.</p>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="min-h-11 min-w-11 rounded-full px-2 text-sm font-medium text-gray-400 hover:bg-gray-50"
        aria-label="Cerrar"
      >
        ✕
      </button>
      <button
        type="button"
        onClick={handleInstall}
        className="min-h-11 rounded-full bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Instalar
      </button>
    </div>
  );
}
