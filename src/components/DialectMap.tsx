'use client';

import { useEffect, useRef, useState } from 'react';
import type * as Leaflet from 'leaflet';
import type { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface DialectMapProps {
  dialects: Dialect[];
  selectedDialect: Dialect | null;
  onDialectSelect: (dialect: Dialect) => void;
  resetView: number;
}

const initialCenter: [number, number] = [35.8617, 104.1954];

export default function DialectMap({ dialects, selectedDialect, onDialectSelect, resetView }: DialectMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const leafletRef = useRef<typeof Leaflet | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    import('leaflet').then((L) => {
      if (disposed || !containerRef.current) return;
      leafletRef.current = L;
      const map = L.map(containerRef.current, { zoomControl: false }).setView(initialCenter, 4);
      mapRef.current = map;
      L.control.zoom({ position: 'topright' }).addTo(map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      setReady(true);
    }).catch(() => { if (!disposed) setFailed(true); });
    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!ready || !L || !map) return;
    const markers = L.layerGroup().addTo(map);
    dialects.forEach((dialect) => {
      const color = dialectCategories.find((c) => c.id === dialect.category)?.color || '#666';
      const selected = selectedDialect?.id === dialect.id;
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<span class="dialect-marker${selected ? ' is-selected' : ''}" style="background-color:${color}"></span>`,
        iconSize: [24, 24], iconAnchor: [12, 12],
      });
      const label = document.createElement('span');
      label.textContent = dialect.name;
      L.marker(dialect.coordinates, { icon, title: dialect.name, alt: dialect.name, riseOnHover: true,
        zIndexOffset: selected ? 1000 : 0 })
        .addTo(markers).bindTooltip(label, { direction: 'top', offset: [0, -10] })
        .on('click', () => onDialectSelect(dialect));
    });
    return () => { markers.remove(); };
  }, [ready, dialects, selectedDialect, onDialectSelect]);

  useEffect(() => {
    if (!ready || !selectedDialect) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mapRef.current?.flyTo(selectedDialect.coordinates, 6, { animate: !reducedMotion, duration: 0.8 });
  }, [ready, selectedDialect]);

  useEffect(() => {
    if (ready) mapRef.current?.setView(initialCenter, 4);
  }, [ready, resetView]);

  return (
    <>
      <div ref={containerRef} className="w-full h-full" aria-label="中国方言代表地点地图" />
      {!ready && <div role="status" className="absolute inset-0 flex items-center justify-center bg-slate-100">
        {failed ? <button onClick={() => { setFailed(false); setAttempt((value) => value + 1); }}>地图加载失败，点击重试</button> : '正在加载地图…'}
      </div>}
    </>
  );
}
