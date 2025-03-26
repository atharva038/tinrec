import { useContext, useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { getUserRequests } from "../services/requestApi";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await getUserRequests(token);
                // Ensure we're setting an array
                setRequests(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setError("Failed to load requests. Please try again later.");
                setRequests([]); // Ensure requests is an array even on error
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4">Welcome, {user?.username}!</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Manage your e-waste pickups and track requests here.
            </Typography>

            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>My E-Waste Requests</Typography>

            {requests.length === 0 ? (
                <Typography>No e-waste requests found.</Typography>
            ) : (
                <Paper sx={{ p: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><b>Item</b></TableCell>
                                <TableCell><b>Quantity/Weight</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request._id}>
                                    <TableCell>{request.wasteType}</TableCell>
                                    <TableCell>
                                        {request.quantity ?
                                            `${request.quantity} items` :
                                            request.weight ?
                                                `${request.weight.value} ${request.weight.unit}` :
                                                'N/A'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            backgroundColor:
                                                request.status === "Pending Assignment" ? "#FFC107" :
                                                    request.status === "Assigned" ? "#17A2B8" :
                                                        request.status === "Accepted" ? "#28A745" :
                                                            "#6C757D",
                                            color: "white"
                                        }}>
                                            {request.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    );
};

export default UserDashboard;