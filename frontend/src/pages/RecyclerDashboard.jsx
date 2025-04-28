import { useEffect, useState, useContext } from "react";
import { getRecyclerRequests, acceptRequest } from "../services/requestApi";
import { Card, Button, Typography, Box, Container, CircularProgress, Alert } from "@mui/material";
import RecyclerSidebar from "../components/RecyclerSidebar";
import AuthContext from "../context/AuthContext";

const RecyclerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const data = await getRecyclerRequests(token);
                setRequests(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setError("Failed to load requests. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, [token]);

    const handleAccept = async (id) => {
        try {
            await acceptRequest(id, token);
            // Update local state to reflect changes
            setRequests(prevRequests => 
                prevRequests.map(req => 
                    req._id === id ? {...req, status: 'Accepted'} : req
                )
            );
        } catch (error) {
            console.error("Error accepting request:", error);
            setError("Failed to accept request. Please try again.");
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <RecyclerSidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    ml: { xs: 0, md: '240px' }, // Responsive margin
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ mb: 4, color: '#2e7d32' }}>
                        Welcome, {user?.username || 'Recycler'}!
                    </Typography>
                    
                    <Typography variant="h5" sx={{ mb: 3 }}>
                        Assigned Requests
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : requests.length === 0 ? (
                        <Card sx={{ p: 3, textAlign: 'center' }}>
                            <Typography>No assigned requests at this time.</Typography>
                        </Card>
                    ) : (
                        requests.map((req) => (
                            <Card
                                key={req._id}
                                sx={{
                                    p: 3,
                                    mb: 2,
                                    borderLeft: `4px solid ${
                                        req.status === 'Accepted' ? '#4caf50' : 
                                        req.status === 'Assigned' ? '#2196f3' : '#ff9800'
                                    }`,
                                    '&:hover': {
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Request Details
                                </Typography>
                                <Typography><strong>Category:</strong> {req.wasteType}</Typography>
                                <Typography><strong>Quantity:</strong> {req.quantity}</Typography>
                                <Typography><strong>Pickup Address:</strong> {req.location}</Typography>
                                <Typography><strong>Status:</strong> {req.status}</Typography>
                                
                                {req.status !== 'Accepted' && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAccept(req._id)}
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#2e7d32',
                                            '&:hover': {
                                                backgroundColor: '#1b5e20'
                                            }
                                        }}
                                    >
                                        Accept Request
                                    </Button>
                                )}
                            </Card>
                        ))
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default RecyclerDashboard;