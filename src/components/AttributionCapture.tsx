"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/lib/lead-attribution';
export function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => { captureAttribution(); }, [pathname]);
  return null;
}
