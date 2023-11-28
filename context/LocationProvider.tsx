'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';
interface LocationType {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const LocationContext = createContext<LocationType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('');

  async function reverseGeocode(lat: string, lon: string) {
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the API returns a JSON response with the data you need
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  const getLocation = async () => {
    const successCallback = async (geolocation: any) => {
      const location = await reverseGeocode(
        geolocation.coords.latitude,
        geolocation.coords.longitude,
      );
      location?.address?.country &&
        setCookie('location', location.address.country);
      setMode(geolocation);
    };

    const errorCallback = (error: any) => {
      console.log(error);
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    if ('geolocation' in navigator) {
      // Access the API
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions,
      );
    } else {
      // Use a third-party geolocation service
      console.log('Browser does not support the Geolocation API');
    }
  };

  useEffect(() => {
    getLocation();
  }, [mode]);

  return (
    <LocationContext.Provider value={{ mode, setMode }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error('useLocation must be used within a ThemeProvider');
  }

  return context;
}
