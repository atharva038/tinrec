import { useEffect, useState } from "react";
import { getRecyclerRequests, acceptRequest } from "../services/requestApi";
import { Card, Button, Typography, Box } from "@mui/material";

const RecyclerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getRecyclerRequests(token);
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        fetchRequests();
    }, []);

    const handleAccept = async (id) => {
        try {
            await acceptRequest(id, token);
            setRequests(requests.filter((req) => req._id !== id)); // Remove accepted request
        } catch (error) {
            console.error("Error accepting request:", error);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Assigned Requests</Typography>
            {requests.length === 0 ? (
                <Typography>No assigned requests</Typography>
            ) : (
                requests.map((req) => (
                    <Card key={req._id} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography>Category: {req.wasteType}</Typography>
                        <Typography>Quantity: {req.quantity}</Typography>
                        <Typography>Pickup Address: {req.location}</Typography>
                        <Typography>Submitted By: {req.userId.username}</Typography>
                        <Button variant="contained" color="primary" onClick={() => handleAccept(req._id)}>
                            Accept Request
                        </Button>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default RecyclerDashboard;