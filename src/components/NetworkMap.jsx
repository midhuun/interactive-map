import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import rawData from '../data/regionusage.json';
import regionShapes from '../assets/countries.geo.json';

const regionColors = {
  US: '#1f77b4',
  AT: '#ff7f0e',
  SE: '#2ca02c',
  IN: '#d62728',
  CA: '#9467bd',
  FR: '#8c564b',
  DE: '#e377c2',
  GB: '#7f7f7f',
  JP: '#17becf',
  AU: '#bcbd22',
  CN: '#c5b0d5',
  BR: '#f7b6d1',
  ZA: '#c49c94',
  RU: '#ffbb78',
  IT: '#ff9896',
  ES: '#c7c7c7',
  MX: '#98df8a',
  AR: '#f7b6d1',
  KR: '#c5b0d5',
  EG: '#ff7f0e',
  NG: '#bcbd22',
  SA: '#7f7f7f',
  PK: '#c49c94',
  GR: '#e377c2',
  NL: '#17becf',
  CH: '#ffbb78',
  TR: '#ff9896',
  KE: '#98df8a',
};

const regionCenters = {
  US: [41.5, -100.5],
  AT: [48.2, 14.5],
  SE: [60, 16.5],
  IN: [20.5937, 78.9629],
  CA: [56.1304, -106.3468],
  FR: [46.6034, 1.8883],
  DE: [51.1657, 10.4515],
  GB: [51.5074, -0.1278],
  JP: [36.2048, 138.2529],
  AU: [-25.2744, 133.7751],
  CN: [35.8617, 104.1954],
  BR: [-14.235, -51.9253],
  ZA: [-30.5595, 22.9375],
  RU: [55.7558, 37.6176],
  IT: [41.8719, 12.5674],
  ES: [40.4637, -3.7492],
  MX: [23.6345, -102.5528],
  AR: [-38.4161, -63.6167],
  KR: [35.9078, 127.7669],
  EG: [26.8206, 30.8025],
  NG: [9.082, 8.6753],
  SA: [23.8859, 45.0792],
  PK: [30.3753, 69.3451],
  GR: [39.0742, 21.8243],
  NL: [52.3784, 4.9009],
  CH: [46.8182, 8.2275],
  TR: [38.9637, 35.2433],
  KE: [-1.2921, 36.8219],
};

const NetworkMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regionUsage = useMemo(() => {
    const result = {};
    rawData.forEach(({ region, data }) => {
      result[region] = result[region] ? result[region] + data : data;
    });
    return result;
  }, []);

  return (
    <div className="w-full h-screen flex">
      <div className="flex-1 relative">
        <MapContainer center={[30, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <GeoJSON data={regionShapes} style={{ fillOpacity: 0.1, color: '#ccc' }} />

          {Object.entries(regionUsage).map(([code, usage]) => {
            const center = regionCenters[code];
            if (!center) return null;

            return (
              <CircleMarker
                key={code}
                center={center}
                radius={Math.sqrt(usage) / 5}
                pathOptions={{
                  color: regionColors[code] || '#cccccc',
                  fillColor: regionColors[code] || '#cccccc',
                  fillOpacity: 0.8,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedRegion({
                      code,
                      usage,
                    }),
                }}
              >
                <Tooltip direction="top" sticky>{`${code}: ${usage} MB`}</Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {selectedRegion && (
        <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl text-gray-800 font-semibold mb-3">
            Region: <span className="text-gray-600">{selectedRegion.code}</span>
          </h2>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-lg text-gray-600">
              <span className="font-medium text-gray-700">Total Data Usage:</span>{' '}
              <span className="text-gray-900 font-semibold">{selectedRegion.usage} MB</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkMap;
