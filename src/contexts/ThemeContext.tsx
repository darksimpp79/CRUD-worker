import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  actualMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'system';
  });

  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setSystemMode(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const actualMode = mode === 'system' ? systemMode : mode;

  const theme = createTheme({
    palette: {
      mode: actualMode,
      primary: {
        main: '#667eea',
        dark: '#5568d3',
        light: '#8b9ef8',
      },
      secondary: {
        main: '#764ba2',
        light: '#9966cc',
      },
      ...(actualMode === 'dark' && {
        background: {
          default: '#0a0e27',
          paper: '#1a1f3a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8afc7',
        },
        divider: '#2d3748',
        action: {
          active: '#667eea',
          hover: 'rgba(102, 126, 234, 0.08)',
          selected: 'rgba(102, 126, 234, 0.12)',
          disabled: 'rgba(255, 255, 255, 0.38)',
        },
        error: {
          main: '#f44336',
          light: '#ffcdd2',
        },
        warning: {
          main: '#ff9800',
        },
        info: {
          main: '#2196f3',
        },
        success: {
          main: '#4caf50',
        },
      }),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
          } : undefined,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            backgroundImage: 'linear-gradient(135deg, #1a1f3a 0%, #2d2842 100%)',
            borderColor: '#2d3748',
          } : undefined,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            backgroundColor: '#1a1f3a',
            borderColor: '#2d3748',
            backgroundImage: 'linear-gradient(135deg, #1a1f3a 0%, #252d42 100%)',
          } : undefined,
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: actualMode === 'dark' ? {
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
            },
          } : undefined,
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: '#2d3748',
              '&:hover fieldset': {
                borderColor: '#667eea',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea',
              },
            },
          } : undefined,
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: actualMode === 'dark' ? {
            backgroundColor: '#0f1423',
            backgroundImage: 'linear-gradient(135deg, #0f1423 0%, #1a1f3a 100%)',
            borderRight: '1px solid #2d3748',
          } : undefined,
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(102, 126, 234, 0.12)',
              borderLeft: '4px solid #667eea',
            },
          } : undefined,
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: actualMode === 'dark' ? {
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderColor: 'rgba(102, 126, 234, 0.3)',
          } : undefined,
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode, actualMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być użyty wewnątrz ThemeProvider');
  }
  return context;
};
