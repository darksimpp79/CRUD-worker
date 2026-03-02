import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  People,
  AttachMoney,
  TrendingUp,
  EventAvailable,
} from '@mui/icons-material';
import { Layout } from '../components/layout/Layout';
import { useTheme } from '../contexts/ThemeContext';

const stats = [
  {
    title: 'Pracownicy',
    value: '24',
    subtitle: 'Aktywni pracownicy',
    icon: <People sx={{ fontSize: 40, color: '#667eea' }} />,
    color: '#667eea',
  },
  {
    title: 'Wydatki',
    value: '€847,500',
    subtitle: 'Roczny budżet wynagrodzeń',
    icon: <AttachMoney sx={{ fontSize: 40, color: '#10b981' }} />,
    color: '#10b981',
  },
  {
    title: 'Przyrost',
    value: '+12%',
    subtitle: 'Wzrost YoY',
    icon: <TrendingUp sx={{ fontSize: 40, color: '#f59e0b' }} />,
    color: '#f59e0b',
  },
  {
    title: 'Wolne',
    value: '8',
    subtitle: 'Dni dostępne',
    icon: <EventAvailable sx={{ fontSize: 40, color: '#8b5cf6' }} />,
    color: '#8b5cf6',
  },
];

const departments = [
  { name: 'IT & Development', employees: 8, budget: '€320,000' },
  { name: 'Design & UX', employees: 5, budget: '€175,000' },
  { name: 'Sales & Marketing', employees: 6, budget: '€210,000' },
  { name: 'HR & Administration', employees: 5, budget: '€142,500' },
];

const recentActivities = [
  { action: 'Dodano nowego pracownika', user: 'Admin', time: '2 godziny temu' },
  { action: 'Zaktualizowano dane pracownika', user: 'HR Manager', time: '4 godziny temu' },
  { action: 'Zatwierdzono urlop', user: 'Manager', time: 'Wczoraj' },
  { action: 'Zmieniono status pracownika', user: 'Admin', time: '3 dni temu' },
];

// Dane do wykresu - Budżet po departamentach
const budgetData = [
  { name: 'IT & Dev', value: 320000, percentage: 37.8 },
  { name: 'Sales & Marketing', value: 210000, percentage: 24.8 },
  { name: 'Design & UX', value: 175000, percentage: 20.7 },
  { name: 'HR & Admin', value: 142500, percentage: 16.8 },
];

// Dane do wykresu - Pracownicy po departamentach
const employeeData = [
  { name: 'IT & Dev', employees: 8 },
  { name: 'Sales & Marketing', employees: 6 },
  { name: 'Design & UX', employees: 5 },
  { name: 'HR & Admin', employees: 5 },
];

// Dane do wykresu - Statystyki miesiączne
const monthlyData = [
  { month: 'Sty', salary: 205000, bonuses: 12000, costs: 217000 },
  { month: 'Lut', salary: 215000, bonuses: 15000, costs: 230000 },
  { month: 'Mar', salary: 220000, bonuses: 18000, costs: 238000 },
  { month: 'Kwi', salary: 225000, bonuses: 20000, costs: 245000 },
  { month: 'Maj', salary: 230000, bonuses: 22000, costs: 252000 },
  { month: 'Cze', salary: 235000, bonuses: 25000, costs: 260000 },
];

// Kolory dla pie chart
const COLORS = ['#667eea', '#764ba2', '#8b5cf6', '#f59e0b'];

export const Dashboard: React.FC = () => {
  return (
    <Layout currentPage="dashboard">
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" color="primary.dark">
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Przegląd statystyk i wskaźników firmy
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: `2px solid ${stat.color}20`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  elevation: 8,
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 600 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    {stat.subtitle}
                  </Typography>
                </Box>
                <Box sx={{ opacity: 0.5 }}>{stat.icon}</Box>
              </Box>
            </Paper>
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Paper elevation={2} sx={{ borderRadius: 2, p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Departamenty
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Nazwa Departamentu</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Pracownicy</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Budżet Roczny</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Procent</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>
                        <Typography variant="body2" fontWeight="500">
                          {dept.name}
                        </Typography>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Typography variant="body2">{dept.employees}</Typography>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Typography variant="body2" fontWeight="500">
                          {dept.budget}
                        </Typography>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Box sx={{ width: '100%', maxWidth: 100 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(index + 1) * 20}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: '#e5e7eb',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                              },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            {(index + 1) * 20}%
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 2, p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Ostatnie Aktywności
            </Typography>
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1.5,
                    px: 0,
                    borderBottom: index !== recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {activity.user.charAt(0)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="500">
                        {activity.action}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {activity.user} • {activity.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};
