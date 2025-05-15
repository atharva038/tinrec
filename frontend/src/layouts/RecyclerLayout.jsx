import { Box, useTheme, useMediaQuery } from '@mui/material';
import RecyclerSidebar from '../components/RecyclerSidebar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RecyclerLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const DRAWER_WIDTH = 240; // Match the width in RecyclerSidebar

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#f9fafb'
        }}>
            {/* Navbar - fixed at top */}
            <Navbar />

            {/* Content wrapper */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 64px)', // Full viewport height minus navbar
                    marginTop: '64px', // Space for navbar
                }}
            >
                {/* Main content area with sidebar */}
                <Box sx={{
                    display: 'flex',
                    flex: '1 0 auto', // This prevents shrinking
                }}>
                    <RecyclerSidebar />

                    {/* Main content */}
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: { xs: 2, md: 2 }, // Reduced padding
                            width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
                            marginLeft: { xs: 0, md: 0 }, // No left margin to match screenshot
                            transition: theme.transitions.create(['margin', 'width'], {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen,
                            }),
                        }}
                    >
                        {children}
                    </Box>
                </Box>

                {/* Footer - completely separate from sidebar */}
                <Box
                    sx={{
                        flexShrink: 0, // Prevent footer from shrinking
                        marginTop: 'auto', // Push to bottom when content is short
                        position: 'relative',
                        width: '100%',
                        left: 0, // Ensure full width
                        zIndex: 1200, // Above the sidebar (MUI drawer usually has z-index 1200)
                    }}
                >
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
};

export default RecyclerLayout;