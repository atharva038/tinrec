import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme,
    IconButton,
    Avatar,
    styled,
    ListItemButton,
    CircularProgress
} from '@mui/material';
import {
    Dashboard,
    AppRegistration,
    History,
    Settings,
    Logout,
    Menu as MenuIcon,
    RecyclingOutlined,
    Category
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

// Constants for consistent dimensions - match the screenshot
const DRAWER_WIDTH = 220; // Keep sidebar width at 220px
const APPBAR_HEIGHT = 64;

// Styled components to match the provided CSS
const SidebarHeader = styled(Box)(({ theme }) => ({
    padding: '1.25rem 1rem',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    background: '#00897b', // Use exact teal color from screenshot
    color: 'white',
    margin: 0, // Ensure no margin
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
    const [isRegistered, setIsRegistered] = useState(null); // null = loading, true/false = status
    const [loading, setLoading] = useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Check if recycler is registered
    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsRegistered(false);
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/recyclers/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // If we get here without error, profile exists
                setIsRegistered(true);
            } catch (error) {
                // If error (404 profile not found), they're not registered
                setIsRegistered(false);
            } finally {
                setLoading(false);
            }
        };

        checkRegistrationStatus();
    }, []);

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

    // Dynamic menu items based on registration status
    const getMenuItems = () => {
        // Base items all recyclers see
        const baseItems = [
            { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard/recycler' }
        ];

        // Items only for registered recyclers
        const registeredItems = [
            { text: 'Manage Services', icon: <Category />, path: '/dashboard/recycler/update-services' },
            { text: 'Request History', icon: <History />, path: '/request-history' },
            { text: 'Settings', icon: <Settings />, path: '/settings' }
        ];

        // Items only for unregistered recyclers
        const unregisteredItems = [
            { text: 'Complete Registration', icon: <AppRegistration />, path: '/recycler-registration' }
        ];

        // Combine appropriate items based on registration status
        return [
            ...baseItems,
            ...(isRegistered ? registeredItems : unregisteredItems)
        ];
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Show loading state while checking registration
    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: DRAWER_WIDTH,
                flexShrink: 0 // Prevent shrinking
            }}>
                <CircularProgress size={24} sx={{ color: '#00897b' }} />
            </Box>
        );
    }

    const drawerContent = (
        <>
            <SidebarHeader>
                <Avatar
                    sx={{
                        width: 50,
                        height: 50,
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
                height: 'calc(100% - 140px)', // Adjusted to account for header height
                overflow: 'auto', // Make content scrollable
            }}>
                <List sx={{ padding: 0, flex: '1 1 auto' }}>
                    {getMenuItems().map((item) => (
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
                    flexShrink: 0, // Prevent sidebar from shrinking
                    display: { xs: 'block', md: 'block' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#ffffff',
                        border: 'none',
                        borderRight: '1px solid rgba(0, 0, 0, 0.08)', // Add subtle right border
                        top: APPBAR_HEIGHT, // Position exactly at the bottom of navbar
                        height: `calc(100% - ${APPBAR_HEIGHT}px)`, // Take full height minus navbar
                        position: "sticky", // Changed from absolute to fixed for better positioning
                        zIndex: 1000,
                        overflow: 'hidden',
                        marginLeft: 0,
                        padding: 0, // No padding
                        // Remove any right padding or margin
                        pr: 0,
                        mr: 0,
                    },
                }}
            >
                {drawerContent}
            </Drawer>


        </>
    );
};

export default RecyclerSidebar;