import { useEffect, useState } from "react";

type Theme = 'light' | 'dark' | 'auto';

declare global {
  interface Window {
    __preferredTheme: Theme;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

const themes: Theme[] = ['light', 'dark', 'auto'];

export default function ThemeSwitch() {
  const [preferred, setPreferred] = useState<Theme | null>(null);

  useEffect(() => {
    setPreferred(window.__preferredTheme);
  }, []);

  const onChange = (theme: Theme) => {
    setPreferred(theme);
    window.__setPreferredTheme(theme);
  }

  return (
    <div className="text-black dark:text-white space-x-4">
      {themes.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={t === preferred ? 'font-bold' : 'font-normal'}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
