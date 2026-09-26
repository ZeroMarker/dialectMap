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
  const markersRef = useRef(new Map<string, Leaflet.Marker>());
  const tilesRef = useRef<Leaflet.TileLayer | null>(null);
  const [tilesFailed, setTilesFailed] = useState(false);
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
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      tilesRef.current = tiles;
      tiles.on('tileerror', () => { if (!disposed) setTilesFailed(true); });
      setReady(true);
    }).catch(() => { if (!disposed) setFailed(true); });
    const observer = new ResizeObserver(() => mapRef.current?.invalidateSize());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
      leafletRef.current = null;
      tilesRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!ready || !L || !map) return;
    const markers = L.layerGroup().addTo(map);
    const markerIndex = markersRef.current;
    dialects.forEach((dialect) => {
      const color = dialectCategories.find((c) => c.id === dialect.category)?.color || '#666';
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<span class="dialect-marker" style="background-color:${color}"></span>`,
        iconSize: [24, 24], iconAnchor: [12, 12],
      });
      const label = document.createElement('span');
      label.textContent = dialect.name;
      const marker = L.marker(dialect.coordinates, { icon, title: dialect.name, alt: dialect.name, riseOnHover: true,
        zIndexOffset: 0 })
        .addTo(markers).bindTooltip(label, { direction: 'top', offset: [0, -10] })
        .on('click', () => onDialectSelect(dialect));
      markerIndex.set(dialect.id, marker);
      marker.getElement()?.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) onDialectSelect(dialect);
        }
      });
    });
    return () => { markers.remove(); markerIndex.clear(); };
  }, [ready, dialects, onDialectSelect]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const selected = selectedDialect?.id === id;
      marker.setZIndexOffset(selected ? 1000 : 0);
      const element = marker.getElement();
      element?.setAttribute('aria-pressed', String(selected));
      element?.querySelector('.dialect-marker')?.classList.toggle('is-selected', selected);
    });
  }, [ready, dialects, selectedDialect]);

  useEffect(() => {
    if (ready) mapRef.current?.setView(initialCenter, 4);
  }, [ready, resetView]);

  useEffect(() => {
    if (!ready || !selectedDialect) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mapRef.current?.flyTo(selectedDialect.coordinates, 6, { animate: !reducedMotion, duration: 0.8 });
  }, [ready, selectedDialect]);

  return (
    <>
      <div ref={containerRef} className="w-full h-full" aria-label="中国方言代表地点地图" />
      {ready && tilesFailed && !selectedDialect && <div role="status" className="absolute bottom-7 left-1/2 z-[1002] w-[calc(100%_-_2rem)] max-w-sm -translate-x-1/2 rounded-lg bg-white p-3 text-sm shadow-lg">
        <p>底图暂时无法加载，仍可通过列表查看方言。</p>
        <button type="button" className="mt-2 text-blue-700" onClick={() => {
          setTilesFailed(false);
          tilesRef.current?.redraw();
        }}>重试底图</button>
      </div>}
      {!ready && <div role="status" className="absolute inset-0 flex items-center justify-center bg-slate-100">
        {failed ? <button onClick={() => { setFailed(false); setAttempt((value) => value + 1); }}>地图加载失败，点击重试</button> : '正在加载地图…'}
      </div>}
    </>
  );
}
