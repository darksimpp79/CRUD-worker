import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: 'dashboard' | 'employees' | 'settings';
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const { user, logout } = useAuth();
  const { actualMode } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, key: 'dashboard', onClick: () => navigate('/dashboard') },
    { label: 'Pracownicy', icon: <PeopleIcon />, key: 'employees', onClick: () => navigate('/employees') },
    { label: 'Ustawienia', icon: <SettingsIcon />, key: 'settings', onClick: () => navigate('/settings') },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* Górny pasek (AppBar) */}
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: actualMode === 'dark' 
          ? 'linear-gradient(135deg, #1a1f3a 0%, #252d42 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: actualMode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.3)'
          : '0 4px 20px rgba(102, 126, 234, 0.15)'
      }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            HR Manager Pro
          </Typography>
          <Button
            color="inherit"
            onClick={handleMenuClick}
            sx={{ textTransform: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.3)' }}>
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2">{user?.username}</Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Typography variant="caption" color="text.secondary">
                Zalogowany jako: {user?.username}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Wyloguj się
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Pusty toolbar, żeby odsunąć listę pod AppBar */}
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton 
                  selected={currentPage === item.key}
                  onClick={item.onClick}
                  sx={{
                    '&.Mui-selected': {
                      background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      borderRight: '4px solid #667eea',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: currentPage === item.key ? '#667eea' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        {/* Sekcja użytkownika na dole sidebara */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              {user?.username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="bold">{user?.username}</Typography>
              <Typography variant="caption" color="text.secondary">Administrator</Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: 'none', color: '#764ba2', borderColor: '#764ba2', '&:hover': { bgcolor: 'rgba(118, 75, 162, 0.05)' } }}
          >
            Wyloguj
          </Button>
        </Box>
      </Drawer>

      {/* Główna zawartość strony */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar /> {/* Spacer pod AppBar */}
        {children}
      </Box>
    </Box>
  );
};