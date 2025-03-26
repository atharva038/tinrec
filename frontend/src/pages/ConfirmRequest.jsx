import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Card, CardContent } from "@mui/material";
import { createRequest } from "../services/requestApi"; // API to create a request

const ConfirmRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { city, recycler, ...eWasteDetails } = location.state || {}; // Extract data from state

    // Debugging: Log location.state to verify data
    console.log("Location State:", location.state);

    // Fallback for missing recycler or eWasteDetails
    if (!location.state) {
        alert("Missing request details. Redirecting to the previous page.");
        navigate(-1); // Go back to the previous page
        return null;
    }

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem("token");
            const requestData = {
                wasteType: eWasteDetails.category || "Unknown", // Default to "Unknown" if missing
                quantity: eWasteDetails.quantity || "1", // Use quantity from eWasteDetails
                location: eWasteDetails.pickupAddress || "Unknown", // Default to "Unknown" if missing
                recyclerId: recycler?._id || "Unknown", // Handle missing recycler
                city: city || "Unknown", // Default to "Unknown" if missing
            };
            console.log("Request Data:", requestData); // Debugging log
            await createRequest(requestData, token);
            alert("Request confirmed successfully!");
            navigate("/dashboard/user");
        } catch (error) {
            console.error("Error confirming request:", error);
            alert("Failed to confirm request. Please try again.");
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
            }}
        >
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        color: "#2e7d32",
                        fontWeight: "bold",
                        mb: 3,
                    }}
                >
                    Confirm Your Request
                </Typography>

                {/* E-Waste Details */}
                <Card
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                            E-Waste Details
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Item Name:</b> {eWasteDetails.itemName || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Category:</b> {eWasteDetails.category || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Description:</b> {eWasteDetails.description || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Pickup Address:</b> {eWasteDetails.pickupAddress || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>City:</b> {city || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Quantity:</b> {eWasteDetails.quantity || "N/A"}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Recycler Details */}
                <Card
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                            Selected Recycler
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Company Name:</b> {recycler.companyName || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>City:</b> {recycler.city || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <b>Accepted Waste Types:</b> {recycler.acceptedWasteTypes?.join(", ") || "N/A"}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Confirm Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                    }}
                    onClick={handleConfirm}
                >
                    Confirm Request
                </Button>
            </Container>
        </Box>
    );
};

export default ConfirmRequest;