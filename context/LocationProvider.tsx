'use client';
import { useEffect, useCallback } from 'react';
import { setCookie } from 'cookies-next';

export function LocationProvider() {
  async function reverseGeocode(lat: string, lon: string) {
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log({ data });
      // Assuming the API returns a JSON response with the data you need
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  const getLocation = useCallback(async () => {
    const successCallback = async (geolocation: any) => {
      const location = await reverseGeocode(
        geolocation.coords.latitude,
        geolocation.coords.longitude,
      );
      location?.address?.country &&
        setCookie('location', location.address.country);
    };

    const errorCallback = (error: any) => {
      console.error('Error getting geolocation', error);
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    if (navigator.geolocation) {
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
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return null;
}
