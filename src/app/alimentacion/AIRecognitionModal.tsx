'use client';

import { useEffect, useRef, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

type Stage = 'idle' | 'preview' | 'recognizing' | 'done';

export default function AIRecognitionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleFileSelected = (file: File | undefined) => {
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setStage('preview');
  };

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setStage('idle');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleRecognize = () => {
    setStage('recognizing');
    setTimeout(() => setStage('done'), 1200);
  };

  return (
    <Modal open={open} onClose={handleClose} title="✨ Reconocimiento por IA">
      <div className="space-y-4">
        {stage === 'idle' && (
          <>
            <p className="text-sm text-gray-500">
              Tomá una foto o importá una imagen de tu comida para identificar los alimentos automáticamente.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="primary"
                className="flex-col gap-1.5 py-4"
                onClick={() => cameraInputRef.current?.click()}
              >
                <span className="text-xl" aria-hidden="true">📷</span>
                <span>Tomar foto</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-col gap-1.5 py-4"
                onClick={() => galleryInputRef.current?.click()}
              >
                <span className="text-xl" aria-hidden="true">🖼️</span>
                <span>Importar de galería</span>
              </Button>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelected(e.target.files?.[0])}
            />
          </>
        )}

        {(stage === 'preview' || stage === 'recognizing' || stage === 'done') && imageUrl && (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Vista previa de la comida" className="w-full max-h-72 object-contain" />
              {stage === 'recognizing' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              )}
            </div>

            {stage === 'done' && (
              <p className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700" aria-live="polite">
                🚧 Funcionalidad en desarrollo. Muy pronto vas a poder reconocer alimentos automáticamente con esta foto.
              </p>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                loading={stage === 'recognizing'}
                disabled={stage === 'recognizing'}
                onClick={handleRecognize}
              >
                {stage === 'recognizing' ? 'Reconociendo...' : 'Reconocer alimentos'}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={handleReset}>
                Repetir / Cambiar foto
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
