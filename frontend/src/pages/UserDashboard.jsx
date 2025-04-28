import { useContext, useEffect, useState } from "react";
import {
    Container, Typography, Table, TableHead, TableRow, TableCell,
    TableBody, Paper, CircularProgress, Box, Button, Chip,
    Card, CardContent, Grid, Alert, IconButton, Tooltip, Badge
} from "@mui/material";
import {
    Refresh, Add, Info, DeleteOutline, RemoveRedEye,
    RecyclingOutlined, SentimentSatisfiedAlt
} from "@mui/icons-material";
import AuthContext from "../context/AuthContext";
import { getUserRequests } from "../services/requestApi";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        processing: 0,
        completed: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await getUserRequests(token);
            const requestData = Array.isArray(response.data) ? response.data : [];
            setRequests(requestData);

            // Calculate statistics
            const pending = requestData.filter(req => req.status === "Pending Assignment").length;
            const processing = requestData.filter(req => ["Assigned", "Accepted"].includes(req.status)).length;
            const completed = requestData.filter(req => req.status === "Completed").length;

            setStats({
                total: requestData.length,
                pending,
                processing,
                completed
            });

            setError(null);
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("Failed to load requests. Please try again later.");
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to get appropriate color for status chip
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending Assignment": return "#FFC107"; // Amber
            case "Assigned": return "#17A2B8"; // Info blue
            case "Accepted": return "#2196F3"; // Primary blue
            case "Completed": return "#28A745"; // Success green
            case "Cancelled": return "#DC3545"; // Danger red
            default: return "#6C757D"; // Grey
        }
    };

    // Render loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <UserSidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: 8,
                        ml: { xs: 0, md: '240px' },
                    }}
                >
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                        <CircularProgress sx={{ color: '#2e7d32' }} />
                    </Container>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <UserSidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    ml: { xs: 0, md: '240px' },
                }}
            >
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Box>
                            <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
                                Welcome, {user?.username}!
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
                                Manage your e-waste pickups and track requests here.
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => navigate('/submit-ewaste')}
                                sx={{
                                    backgroundColor: '#2e7d32',
                                    '&:hover': { backgroundColor: '#1b5e20' }
                                }}
                            >
                                New Request
                            </Button>
                            <IconButton
                                onClick={fetchRequests}
                                sx={{ ml: 1 }}
                                color="primary"
                            >
                                <Refresh />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                            action={
                                <Button color="inherit" size="small" onClick={fetchRequests}>
                                    Retry
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">Total Requests</Typography>
                                    <Typography variant="h3" sx={{ mt: 2, color: '#2e7d32' }}>{stats.total}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', borderLeft: '4px solid #FFC107' }}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">Pending</Typography>
                                    <Typography variant="h3" sx={{ mt: 2, color: '#FFC107' }}>{stats.pending}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', borderLeft: '4px solid #2196F3' }}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">In Process</Typography>
                                    <Typography variant="h3" sx={{ mt: 2, color: '#2196F3' }}>{stats.processing}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', borderLeft: '4px solid #28A745' }}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="textSecondary">Completed</Typography>
                                    <Typography variant="h3" sx={{ mt: 2, color: '#28A745' }}>{stats.completed}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Request Table */}
                    <Typography variant="h5" sx={{ mb: 2, color: '#2e7d32' }}>
                        My E-Waste Requests
                    </Typography>

                    {requests.length === 0 ? (
                        <Card sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
                            <RecyclingOutlined sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                            <Typography variant="h6">No e-waste requests found</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Start recycling your electronic waste by creating a new request.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => navigate('/submit-ewaste')}
                                sx={{
                                    mt: 3,
                                    backgroundColor: '#2e7d32',
                                    '&:hover': { backgroundColor: '#1b5e20' }
                                }}
                            >
                                Create Request
                            </Button>
                        </Card>
                    ) : (
                        <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableCell><Typography variant="subtitle2">Item</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle2">Quantity/Weight</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle2">Date</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle2">Status</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle2">Actions</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow
                                            key={request._id}
                                            sx={{
                                                '&:hover': { backgroundColor: '#f9f9f9' },
                                                borderLeft: `4px solid ${getStatusColor(request.status)}`,
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body2">{request.wasteType}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {request.quantity ?
                                                        `${request.quantity} items` :
                                                        request.weight ?
                                                            `${request.weight.value} ${request.weight.unit}` :
                                                            'N/A'
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {new Date(request.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={request.status}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: getStatusColor(request.status),
                                                        color: 'white',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Tooltip title="View Details">
                                                        <IconButton size="small" color="primary">
                                                            <RemoveRedEye fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    {/* Only show delete for pending requests */}
                                                    {request.status === "Pending Assignment" && (
                                                        <Tooltip title="Cancel Request">
                                                            <IconButton size="small" color="error">
                                                                <DeleteOutline fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}

                                                    {/* Feedback button for completed requests */}
                                                    {request.status === "Completed" && (
                                                        <Tooltip title="Leave Feedback">
                                                            <IconButton size="small" color="success">
                                                                <SentimentSatisfiedAlt fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default UserDashboard;