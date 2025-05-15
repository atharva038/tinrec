import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
    IconButton,
    Divider,
    Avatar,
    styled,
    ListItemButton
} from '@mui/material';
import {
    Dashboard,
    AppRegistration,
    History,
    Settings,
    Logout,
    Menu as MenuIcon,
    RecyclingOutlined
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Constants for consistent dimensions - reduce width to match screenshot
const DRAWER_WIDTH = 240;
const APPBAR_HEIGHT = 64;

// Styled components to match the provided CSS
const SidebarHeader = styled(Box)(({ theme }) => ({
    padding: '1.25rem 1rem',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    background: '#00897b', // Use exact teal color from screenshot
    color: 'white',
}));

const SidebarNavItem = styled(ListItemButton)(({ theme, active }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: active ? '#00897b' : '#4b5563',
    marginBottom: '0.5rem',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    backgroundColor: active ? '#e0f2f1' : 'transparent',
    '&:hover': {
        backgroundColor: active ? '#e0f2f1' : '#f3f4f6',
        color: active ? '#00695c' : '#00897b',
    }
}));

const RecyclerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { user } = useContext(AuthContext || { user: null });
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (isMobile) {
            setMobileOpen(false);
        }
    }, [location.pathname, isMobile]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/recycler' },
        { text: 'Registration Form', icon: <AppRegistration />, path: '/recycler-registration' },
        { text: 'Request History', icon: <History />, path: '/request-history' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    const drawerContent = (
        <>
            <SidebarHeader>
                <Avatar
                    sx={{
                        width: 50, // Further reduced size to match screenshot
                        height: 50, // Further reduced size to match screenshot
                        margin: '0 auto 0.75rem auto',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: '2px solid rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <RecyclingOutlined />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                    Recycler Portal
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.8rem' }}>
                    {user?.username || 'Recycler User'}
                </Typography>
            </SidebarHeader>

            <Box sx={{
                padding: '1rem 0.75rem',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 140px)', // Adjusted to account for smaller header
                overflow: 'auto', // Make content scrollable
            }}>
                <List sx={{ padding: 0, flex: '1 1 auto' }}>
                    {menuItems.map((item) => (
                        <SidebarNavItem
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            active={isActive(item.path) ? 1 : 0}
                        >
                            <ListItemIcon sx={{
                                color: 'inherit',
                                minWidth: '24px',
                                width: '24px',
                                marginRight: '0.75rem'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{
                                        fontWeight: isActive(item.path) ? 500 : 400,
                                        fontSize: '0.9rem', // Slightly smaller font
                                    }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </SidebarNavItem>
                    ))}
                </List>

                {/* Logout button at the bottom */}
                <Box sx={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid #f0f0f0'
                }}>
                    <SidebarNavItem
                        onClick={handleLogout}
                        sx={{
                            color: '#dc2626',
                            '&:hover': {
                                backgroundColor: '#fee2e2',
                                color: '#dc2626'
                            }
                        }}
                    >
                        <ListItemIcon sx={{
                            color: 'inherit',
                            minWidth: '24px',
                            width: '24px',
                            marginRight: '0.75rem'
                        }}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontWeight: 400, fontSize: '0.9rem' }}>
                                    Logout
                                </Typography>
                            }
                        />
                    </SidebarNavItem>
                </Box>
            </Box>
        </>
    );

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            {isMobile && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: APPBAR_HEIGHT + 9,
                        left: 10,
                        zIndex: 1000,
                    }}
                >
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            padding: '8px',
                            backgroundColor: '#ffffff',
                            color: '#333',
                            borderRadius: '5px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                </Box>
            )}

            {/* Sidebar Drawer */}
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : true}
                onClose={isMobile ? handleDrawerToggle : undefined}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    display: { xs: 'block', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#ffffff',
                        border: 'none',
                        top: APPBAR_HEIGHT,
                        height:'auto',  // Remove extra space at bottom
                        maxHeight:'auto' ,
                        position: 'sticky', // Keep it fixed on the left
                        zIndex: 1000, // Below the footer's z-index
                        overflow: 'hidden'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Only for desktop - add permanent spacer to maintain layout spacing */}
            {!isMobile && (
                <Box sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                }} />
            )}
        </>
    );
};

export default RecyclerSidebar;