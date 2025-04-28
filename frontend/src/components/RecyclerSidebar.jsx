import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Dashboard, AppRegistration, History, Settings , Logout} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RecyclerSidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/recycler' },
        { text: 'Registration Form', icon: <AppRegistration />, path: '/recycler-registration' },
        { text: 'Request History', icon: <History />, path: '/request-history' },
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
                        <ListItem
                            button
                            key={item.text}
                            onClick={item.onClick || (() => navigate(item.path))}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#e0e0e0'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: '#2e7d32' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ color: '#2e7d32' }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default RecyclerSidebar;