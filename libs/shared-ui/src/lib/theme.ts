import { useEffect, useState } from 'react';

/**
 * Cross-remote theme sync.
 *
 * Each remote is built and deployed independently, so we can't rely on a
 * shared React context instance (module federation singleton sharing is a
 * build concern, not a guarantee). Instead this is a plain window-level
 * event bus + localStorage: any remote can call `setTheme` and every remote
 * (including ones that never import from each other) hears about it via a
 * DOM CustomEvent, because they all share the same `window`/`document`.
 */
export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'pulse-theme';
const THEME_EVENT = 'pulse:theme-change';

export function getTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

/** Call once on app init (shell and each standalone-served remote) to apply the persisted theme. */
export function initTheme() {
  document.documentElement.dataset.theme = getTheme();
}

/** Subscribe to theme changes from any remote. Returns [theme, setTheme]. */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    initTheme();
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  return [theme, setTheme];
}
