import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Switch,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { mode, setMode, actualMode } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);

  return (
    <Layout currentPage="settings">
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" color="primary.dark">
            Ustawienia
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Zarządzaj preferencjami aplikacji
          </Typography>
        </Box>

        {/* Theme Settings */}
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SettingsIcon sx={{ color: '#667eea', fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold">
              Wygląd
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" fontWeight="600" sx={{ mb: 2 }}>
              Tryb Kolorów
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Aktualnie wybrany tryb: <strong>{actualMode === 'dark' ? 'Ciemny' : 'Jasny'}</strong>
            </Typography>

            <RadioGroup
              value={mode}
              onChange={(e) => setMode(e.target.value as 'light' | 'dark' | 'system')}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="500">
                      Jasny
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Zawsze używaj jasnego trybu
                    </Typography>
                  </Box>
                }
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="500">
                      Ciemny
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Zawsze używaj ciemnego trybu
                    </Typography>
                  </Box>
                }
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="500">
                      Systemowy (Domyślny)
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Automatycznie dostosuj do preferencji systemu
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </Box>
        </Paper>

        {/* Notification Settings */}
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SettingsIcon sx={{ color: '#667eea', fontSize: 28 }} />
            <Typography variant="h6" fontWeight="bold">
              Powiadomienia
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ ml: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2" fontWeight="500">
                  Powiadomienia w aplikacji
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Otrzymuj powiadomienia o zmianach w firmie
                </Typography>
              </Box>
              <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" fontWeight="500">
                  Powiadomienia email
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Otrzymuj aktualizacje przez email
                </Typography>
              </Box>
              <Switch checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} />
            </Box>
          </Box>
        </Paper>

        {/* About Section */}
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            O aplikacji
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>HR Manager Pro</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Wersja: 1.0.0
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              © 2026 Zarządzanie Zasobami Ludzkimi. Wszelkie prawa zastrzeżone.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aplikacja do zarządzania pracownikami z zaawansowanymi funkcjami raportowania i analityki.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};
