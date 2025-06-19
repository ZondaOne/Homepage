import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

type Theme = 'light' | 'dark' | 'old' | 'system';

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', newTheme);
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={18} />;
      case 'dark':
        return <Moon size={18} />;
      case 'old':
        return <Palette size={18} />;
      case 'system':
        return <Monitor size={18} />;
      default:
        return <Moon size={18} />;
    }
  };

  return (
    <div className={`theme-toggle ${className}`}>
      <button 
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
      >
        {getIcon()}
        <span className="theme-toggle-text">{theme}</span>
      </button>
      
      {isOpen && (
        <div className="theme-toggle-dropdown">
          <button 
            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun size={16} />
            <span>Light</span>
          </button>
          <button 
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon size={16} />
            <span>Dark</span>
          </button>
          <button 
            className={`theme-option ${theme === 'old' ? 'active' : ''}`}
            onClick={() => handleThemeChange('old')}
          >
            <Palette size={16} />
            <span>Old</span>
          </button>
          <button 
            className={`theme-option ${theme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <Monitor size={16} />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;