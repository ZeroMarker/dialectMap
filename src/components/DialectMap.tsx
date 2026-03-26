'use client';

import { useEffect, useRef } from 'react';
import type L from 'leaflet';
import { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface DialectMapProps {
  dialects: Dialect[];
  selectedDialect: Dialect | null;
  onDialectSelect: (dialect: Dialect) => void;
}

export default function DialectMap({
  dialects,
  selectedDialect,
  onDialectSelect,
}: DialectMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const L = await import('leaflet');

      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([35.8617, 104.1954], 4);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mapRef.current);
      }

      return L;
    };

    initMap().then((L) => {
      (window as any).L = L;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const loadMarkers = async () => {
      const L = await import('leaflet');

      if (!mapRef.current) return;

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      dialects.forEach((dialect) => {
        const category = dialectCategories.find((c) => c.id === dialect.category);
        const color = category?.color || '#666';

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
          "></div>
        `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker(dialect.coordinates, { icon })
          .addTo(mapRef.current!)
          .bindTooltip(dialect.name, {
            direction: 'top',
            offset: [0, -10],
          })
          .on('click', () => onDialectSelect(dialect));

        markersRef.current.push(marker);
      });
    };

    loadMarkers();
  }, [dialects, onDialectSelect]);

  useEffect(() => {
    const flyToLocation = async () => {
      if (!selectedDialect || !mapRef.current) return;
      const L = await import('leaflet');
      mapRef.current.flyTo(selectedDialect.coordinates, 6, {
        duration: 1.5,
      });
    };

    flyToLocation();
  }, [selectedDialect]);

  return <div id="map" className="w-full h-full" />;
}
