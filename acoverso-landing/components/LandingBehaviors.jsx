'use client';

import { useEffect } from 'react';
import { initLanding } from '@/lib/behaviors';

// Activa las interacciones (lib/behaviors) una sola vez cuando la página ya está en el navegador.
export default function LandingBehaviors({ config, legalDocs }) {
  useEffect(() => {
    if (window.__acoInit) return; // evita doble activación en desarrollo (React Strict Mode)
    window.__acoInit = true;
    initLanding({ config, legalDocs });
  }, [config, legalDocs]);
  return null;
}
