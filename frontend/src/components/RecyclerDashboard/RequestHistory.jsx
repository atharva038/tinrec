import { useState, useEffect, useContext } from 'react';
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Chip, IconButton, Button,
    CircularProgress, Alert, Select, MenuItem, FormControl,
    InputLabel, Grid, Card, Divider, Tooltip, useMediaQuery, useTheme
} from '@mui/material';
import {
    FilterList, RemoveRedEye, Check, Close, Schedule,
    LocalShippingOutlined, VerifiedUser, RecyclingOutlined,
    CalendarMonth
} from '@mui/icons-material';
import { getUserRequests, getRecyclerRequests } from "../../services/requestApi";
import AuthContext from '../../context/AuthContext';
import { HistoryOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';

const RequestHistory = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const token = localStorage.getItem('token');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Determine if user is a recycler
    const isRecycler = user?.role === 'recycler';

    useEffect(() => {
        if (token) {
            fetchRequests();
        }
    }, [token, isRecycler]);

    const fetchRequests = async () => {
        try {
            setLoading(true);

            // Call the appropriate API based on user role
            const response = isRecycler
                ? await getRecyclerRequests(token)
                : await getUserRequests(token);

            // Handle different response structures
            let requestData = [];
            if (response.data && Array.isArray(response.data)) {
                requestData = response.data;
            } else if (response.data?.data && Array.isArray(response.data.data)) {
                requestData = response.data.data;
            } else if (response.data?.requests && Array.isArray(response.data.requests)) {
                requestData = response.data.requests;
            }

            // Sort by date (newest first)
            requestData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setRequests(requestData);
            setError(null);
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("Failed to load request history. Please try again later.");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter requests based on selected filter
    const filteredRequests = () => {
        if (filter === 'all') return requests;
        return requests.filter(req => req.status === filter);
    };

    // Get status color for the chip
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending Assignment": return "#ff9800"; // Amber
            case "Assigned": return "#2196f3"; // Blue
            case "Accepted": return "#4caf50"; // Green
            case "Completed": return "#28a745"; // Success green
            case "Cancelled": return "#dc3545"; // Danger red
            default: return "#6c757d"; // Grey
        }
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending Assignment": return <Schedule fontSize="small" />;
            case "Assigned": return <LocalShippingOutlined fontSize="small" />;
            case "Accepted": return <VerifiedUser fontSize="small" />;
            case "Completed": return <Check fontSize="small" />;
            case "Cancelled": return <Close fontSize="small" />;
            default: return <RecyclingOutlined fontSize="small" />;
        }
    };

    // Format date to a more readable format
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        // Remove outer Box wrapper since this is already handled by parent component
        // Just render the main content directly
        <Box
            component="main"
           sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: '100%', // Changed from 140% to 100%
        }}
        >
            <Container
                maxWidth="xl"
                disableGutters={isMobile}
                sx={{ px: { xs: 1, sm: 2, md: 3 } }} // Add some padding to the container  
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    mb: { xs: 2, sm: 4 },
                }}>
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            color: '#00897b',
                            fontWeight: 500,
                            textAlign: { xs: 'center', sm: 'left' },
                            pl: 0,
                            mb: { xs: 2, sm: 0 }
                        }}
                    >
                        Welcome, {user?.username || 'Recycler'}!
                    </Typography>
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                        action={
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={fetchRequests}
                            >
                                <FilterList />
                            </IconButton>
                        }
                    >
                        {error}
                    </Alert>
                )}

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Filter by Status</InputLabel>
                            <Select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                label="Filter by Status"
                                sx={{ bgcolor: 'background.paper' }}
                            >
                                <MenuItem value="all">All Requests</MenuItem>
                                <MenuItem value="Pending Assignment">Pending Assignment</MenuItem>
                                <MenuItem value="Assigned">Assigned</MenuItem>
                                <MenuItem value="Accepted">Accepted</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress sx={{ color: isRecycler ? '#00897b' : '#2e7d32' }} />
                    </Box>
                ) : requests.length === 0 ? (
                    <Card sx={{ p: 4, textAlign: 'center', borderRadius: '8px' }}>
                        <RecyclingOutlined sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                        <Typography variant="h6">No request history found</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            {isRecycler
                                ? "You haven't processed any e-waste pickup requests yet."
                                : "You haven't submitted any e-waste pickup requests yet."
                            }
                        </Typography>
                    </Card>
                ) : (
                    <>
                        {/* Desktop version - Table */}
                        <TableContainer
                            component={Paper}
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                overflow: 'hidden'
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                                        <TableCell>Request ID</TableCell>
                                        <TableCell>Waste Type</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRequests().map((request) => (
                                        <TableRow
                                            key={request._id}
                                            sx={{
                                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' },
                                            }}
                                        >
                                            <TableCell>
                                                {request._id.substring(0, 8)}...
                                            </TableCell>
                                            <TableCell>{request.wasteType}</TableCell>
                                            <TableCell>
                                                {request.quantity ?
                                                    request.quantity :
                                                    request.weight ?
                                                        `${request.weight.value} ${request.weight.unit}` :
                                                        'N/A'
                                                }
                                            </TableCell>
                                            <TableCell>{request.location}</TableCell>
                                            <TableCell>{formatDate(request.createdAt)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={getStatusIcon(request.status)}
                                                    label={request.status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: `${getStatusColor(request.status)}20`, // 20% opacity
                                                        color: getStatusColor(request.status),
                                                        fontWeight: 500,
                                                        '& .MuiChip-icon': {
                                                            color: getStatusColor(request.status)
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="View Details">
                                                    <IconButton size="small" color="primary">
                                                        <RemoveRedEye fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Mobile/Tablet version - Cards */}
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            {filteredRequests().map((request) => (
                                <Card
                                    key={request._id}
                                    sx={{
                                        mb: 2,
                                        borderRadius: '8px',
                                        borderLeft: `4px solid ${getStatusColor(request.status)}`,
                                        overflow: 'visible'
                                    }}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                ID: {request._id.substring(0, 8)}...
                                            </Typography>
                                            <Chip
                                                icon={getStatusIcon(request.status)}
                                                label={request.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: `${getStatusColor(request.status)}20`, // 20% opacity
                                                    color: getStatusColor(request.status),
                                                    fontWeight: 500,
                                                    '& .MuiChip-icon': {
                                                        color: getStatusColor(request.status)
                                                    }
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="body1" fontWeight={500}>
                                            {request.wasteType}
                                        </Typography>

                                        <Divider sx={{ my: 1 }} />

                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Quantity:
                                                </Typography>
                                                <Typography variant="body2">
                                                    {request.quantity || 'N/A'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Location:
                                                </Typography>
                                                <Typography variant="body2" noWrap>
                                                    {request.location}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <CalendarMonth fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="textSecondary">
                                                        {formatDate(request.createdAt)}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                            <Tooltip title="View Details">
                                                <IconButton size="small" color="primary">
                                                    <RemoveRedEye fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default RequestHistory;