export type Settings = Record<string, any>;

export const STORAGE_KEY = "algobridge-settings";

const defaultSettings: Settings = {
    inAppDiagramView: false,
};

export const readSettings = (): Settings => {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const writeSettings = (settings: Settings): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    // ignore storage errors
    // console.error("writeSettings error", err);
  }
};

export const getSetting = <T = any>(key: string, fallback?: T): T | undefined => {
  const s = readSettings();
  return (s[key] ?? fallback) as T | undefined;
};

export const setSetting = (key: string, value: any): Settings => {
  const current = readSettings();
  const next = { ...current, [key]: value };
  writeSettings(next);
  return next;
};

export const removeSetting = (key: string): Settings => {
  const current = readSettings();
  const { [key]: _removed, ...rest } = current;
  writeSettings(rest);
  return rest;
};