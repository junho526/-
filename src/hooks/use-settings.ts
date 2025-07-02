'use client';

import { useState, useEffect, useCallback } from 'react';

interface Settings {
  animationSpeed: number;
  boardTheme: string;
}

const defaultSettings: Settings = {
  animationSpeed: 300,
  boardTheme: 'default',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('checkmate-arena-settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Could not load settings from localStorage", error);
    }
  }, []);

  const setSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings, [key]: value };
      try {
        localStorage.setItem('checkmate-arena-settings', JSON.stringify(newSettings));
      } catch (error) {
        console.error("Could not save settings to localStorage", error);
      }
      return newSettings;
    });
  }, []);

  return { settings, setSetting };
}
