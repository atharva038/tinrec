import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
    Dashboard, AddBox, History, AutoGraph,
    CardGiftcard, Settings, Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/user' },
        { text: 'New Request', icon: <AddBox />, path: '/submit-ewaste' },
        { text: 'Request History', icon: <History />, path: '/request-history' },
        { text: 'Impact Stats', icon: <AutoGraph />, path: '/impact-stats' },
        { text: 'Rewards', icon: <CardGiftcard />, path: '/rewards' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
        {
            text: 'Logout',
            icon: <Logout />,
            path: '/logout',
            onClick: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            }
        }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #e0e0e0'
                },
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.text}
                            onClick={item.onClick || (() => navigate(item.path))}
                            selected={isActive(item.path)}
                            sx={{
                                py: 1.5,
                                borderRadius: 1,
                                mb: 0.5,
                                color: isActive(item.path) ? '#00897b' : 'inherit',
                                bgcolor: isActive(item.path) ? 'rgba(0, 137, 123, 0.08)' : 'transparent',
                                '&:hover': {
                                    bgcolor: isActive(item.path) ? 'rgba(0, 137, 123, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: '36px' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontWeight: isActive(item.path) ? 600 : 400 }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default UserSidebar;