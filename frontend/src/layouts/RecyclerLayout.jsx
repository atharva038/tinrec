import { Box, useTheme, useMediaQuery } from '@mui/material';
import RecyclerSidebar from '../components/RecyclerDashboard/RecyclerSidebar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const RecyclerLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const DRAWER_WIDTH = 220; // Reduced from 240px to match your other components

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
                    minHeight: '100vh',
                    backgroundColor: '#f9fafb'
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
                            flexGrow: 0,
                            p: { xs: 2, md: 2 }, // Reduced padding
                            // width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
                            // overflow: 'auto', // Allow scrolling if content is too tall
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RecyclerLayout;