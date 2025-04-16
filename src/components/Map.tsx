
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  address: string;
  className?: string;
}

const Map = ({ address, className = "h-64 w-full" }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to geocode the address to coordinates
  const geocodeAddress = async (address: string) => {
    if (!mapboxToken) return null;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return [lng, lat] as [number, number];
      }
      return null;
    } catch (err) {
      console.error('Error geocoding address:', err);
      setError('Failed to geocode address');
      return null;
    }
  };

  // Handle token input
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('mapboxToken') as HTMLInputElement;
    if (input?.value) {
      setMapboxToken(input.value);
      localStorage.setItem('mapbox_token', input.value);
    }
  };

  // Initialize with saved token
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  // Geocode address when token is available
  useEffect(() => {
    if (mapboxToken && address) {
      setLoading(true);
      geocodeAddress(address).then(coords => {
        if (coords) {
          setCoordinates(coords);
        }
        setLoading(false);
      });
    }
  }, [mapboxToken, address]);

  // Initialize map when coordinates are available
  useEffect(() => {
    if (!mapContainer.current || !coordinates || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add marker at marina location
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [coordinates, mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className={`bg-gray-200 rounded-lg overflow-hidden ${className} flex flex-col items-center justify-center p-4`}>
        <p className="text-gray-600 mb-4">Please enter your Mapbox access token:</p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-2">
          <input 
            type="text" 
            name="mapboxToken" 
            placeholder="pk.eyJ1Ijoi..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-marina text-white rounded-md hover:bg-marina-light"
          >
            Set Token
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Get your token from <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-marina underline">mapbox.com</a>
          </p>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-gray-200 rounded-lg overflow-hidden ${className} flex items-center justify-center`}>
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  if (error || !coordinates) {
    return (
      <div className={`bg-gray-200 rounded-lg overflow-hidden ${className} flex items-center justify-center`}>
        <p className="text-gray-600">{error || "Could not load map for this address"}</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;
