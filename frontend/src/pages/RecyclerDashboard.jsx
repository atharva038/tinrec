import { useEffect, useState, useContext } from "react";
import { getRecyclerRequests, acceptRequest } from "../services/requestApi";
import {
    Card, Button, Typography, Box, Container, CircularProgress,
    Alert, Grid, Badge, Tabs, Tab, Chip, Divider, useMediaQuery, useTheme
} from "@mui/material";
import RecyclerSidebar from "../components/RecyclerDashboard/RecyclerSidebar";
import AuthContext from "../context/AuthContext";

const RecyclerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getRecyclerRequests(token);

                // Extract data from response
                let requestsData = [];
                if (Array.isArray(response.data)) {
                    requestsData = response.data;
                } else if (response.data?.data && Array.isArray(response.data.data)) {
                    requestsData = response.data.data;
                } else if (response.data?.requests && Array.isArray(response.data.requests)) {
                    requestsData = response.data.requests;
                }

                setRequests(requestsData);

            } catch (error) {
                console.error("Error fetching requests:", error);
                setError("Failed to load requests. Please try again.");
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchRequests();
        } else {
            setError("Authentication required");
            setLoading(false);
        }
    }, [token]);

    const handleAccept = async (id) => {
        try {
            const response = await acceptRequest(id, token);
            // Update local state to reflect changes
            setRequests(prevRequests =>
                prevRequests.map(req =>
                    req._id === id ? { ...req, status: 'Accepted' } : req
                )
            );
        } catch (error) {
            console.error("Error accepting request:", error);
            setError("Failed to accept request. Please try again.");
        }
    };

    // Filter requests based on tab
    const getFilteredRequests = () => {
        switch (tabValue) {
            case 0: // All
                return requests;
            case 1: // Available
                return requests.filter(req => req.status === "Pending Assignment");
            case 2: // Assigned
                return requests.filter(req => req.status === "Assigned");
            case 3: // Accepted
                return requests.filter(req => req.status === "Accepted");
            default:
                return requests;
        }
    };

    // Count requests by status for badges
    const pendingCount = requests.filter(req => req.status === "Pending Assignment").length;
    const assignedCount = requests.filter(req => req.status === "Assigned").length;
    const acceptedCount = requests.filter(req => req.status === "Accepted").length;

    const filteredRequests = getFilteredRequests();

    // Filter out duplicates by ID
    const uniqueRequests = filteredRequests.filter(
        (req, index, self) => index === self.findIndex(r => r._id === req._id)
    );

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                width: '100%', // Take full width of the parent
          
                transition: 'margin 0.3s ease',
            }}
        >
            <Container
               maxWidth="xl" // Changed from false to xl for consistent spacing
            sx={{ px: { xs: 1, sm: 2, md: 3 } }} // Add padding
      
            >
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        mb: { xs: 2, sm: 4 },
                        color: '#00897b',
                        fontWeight: 500,
                        textAlign: { xs: 'center', sm: 'left' },
                        pl: 0 // No padding on left side
                    }}
                >
                    Welcome, {user?.username || 'Recycler'}!
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        mb: 3,
                        overflowX: 'auto', // Enable horizontal scrolling on small screens
                        '&::-webkit-scrollbar': {
                            display: 'none'  // Hide scrollbar
                        }
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
                        aria-label="request tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        variant={isMobile ? "scrollable" : "standard"}
                        scrollButtons={isMobile ? "auto" : false}
                        allowScrollButtonsMobile
                        sx={{
                            '& .MuiTab-root': {
                                minWidth: isMobile ? 100 : 120,
                                fontWeight: 500,
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                px: { xs: 1, sm: 2 }
                            },
                            '& .MuiTab-iconWrapper': {
                                marginLeft: '8px'  // Add space between text and icon for all tabs
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#00897b'
                            },
                            '& .Mui-selected': {
                                color: '#00897b !important'
                            }
                        }}
                    >
                        <Tab label="All Requests" />
                        <Tab
                            label="Available"
                            icon={pendingCount > 0 ? <Badge color="error" badgeContent={pendingCount} /> : null}
                            iconPosition="end"
                        />
                        <Tab
                            label="Assigned"
                            icon={assignedCount > 0 ? <Badge color="primary" badgeContent={assignedCount} /> : null}
                            iconPosition="end"
                        />
                        <Tab
                            label="Accepted"
                            icon={acceptedCount > 0 ? <Badge color="success" badgeContent={acceptedCount} /> : null}
                            iconPosition="end"
                        />
                    </Tabs>
                </Box>

                {/* Request cards */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress sx={{ color: '#00897b' }} />
                    </Box>
                ) : uniqueRequests.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: 'center', borderRadius: '8px' }}>
                        <Typography>No {tabValue === 0 ? "" : tabValue === 1 ? "available" : tabValue === 2 ? "assigned" : "accepted"} requests at this time.</Typography>
                    </Card>
                ) : (
                    <Grid container spacing={2}>
                        {uniqueRequests.map((req) => (
                            <Grid item xs={12} key={req._id || `request-${Math.random()}`}>
                                {/* Card content remains the same */}
                                <Card
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${req.status === 'Accepted' ? '#4caf50' :
                                            req.status === 'Assigned' ? '#2196f3' : '#ff9800'
                                            }`,
                                        '&:hover': {
                                            boxShadow: 3
                                        }
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        justifyContent: 'space-between',
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        mb: 2
                                    }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 500,
                                                mb: { xs: 1, sm: 0 }
                                            }}
                                        >
                                            Request Details
                                        </Typography>
                                        <Chip
                                            label={req.status}
                                            sx={{
                                                bgcolor: req.status === 'Accepted' ? '#e8f5e9' :
                                                    req.status === 'Assigned' ? '#e3f2fd' : '#fff3e0',
                                                color: req.status === 'Accepted' ? '#2e7d32' :
                                                    req.status === 'Assigned' ? '#1565c0' : '#e65100',
                                                fontWeight: 500
                                            }}
                                        />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography sx={{ mb: 1 }}><strong>Category:</strong> {req.wasteType}</Typography>
                                            <Typography><strong>Quantity:</strong> {req.quantity || 'Not specified'}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Typography sx={{ mb: 1 }}><strong>Pickup Address:</strong> {req.location}</Typography>
                                            <Typography><strong>Created:</strong> {new Date(req.createdAt).toLocaleString()}</Typography>
                                        </Grid>
                                    </Grid>

                                    {(req.status === 'Pending Assignment' || req.status === 'Assigned') && (
                                        <Box sx={{
                                            mt: 2,
                                            textAlign: { xs: 'center', sm: 'right' }
                                        }}>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleAccept(req._id)}
                                                sx={{
                                                    backgroundColor: '#00897b',
                                                    px: { xs: 3, sm: 4 },
                                                    py: { xs: 0.75, sm: 1 },
                                                    '&:hover': {
                                                        backgroundColor: '#00695c'
                                                    }
                                                }}
                                            >
                                                {req.status === 'Pending Assignment' ? 'Take Request' : 'Accept Request'}
                                            </Button>
                                        </Box>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>

    );
};

export default RecyclerDashboard;