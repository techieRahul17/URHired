import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-800 animate-spin-slow" />
      ) : (
        <Sun size={20} className="text-yellow-300 animate-pulse" />
      )}
    </button>
  );
}
