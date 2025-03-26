import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress, Box, Card, CardContent, Button, Grid } from "@mui/material";
import { getNearbyRecyclers } from "../services/api"; // Import API function

const SelectRecycler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { city } = location.state || {}; // Get city from state

    const [recyclers, setRecyclers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!city) {
            setError("City not selected.");
            setLoading(false);
            return;
        }

        const fetchRecyclers = async () => {
            try {
                const data = await getNearbyRecyclers(city); // Call API from `api.js`
                if (data.length === 0) {
                    setError(`No recyclers found in ${city}.`);
                } else {
                    setRecyclers(data);
                }
            } catch (err) {
                setError("Failed to load recyclers. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecyclers();
    }, [city]);

    const handleSelectRecycler = (recycler) => {
        navigate("/confirm-request", { state: { ...location.state, city, recycler } });
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
            <Container maxWidth="md" sx={{ textAlign: "center" }}> {/* Reduced margin-top */}
                <Typography
                    variant="h4"
                    sx={{
                        color: "#2e7d32",
                        fontWeight: "bold",
                        mb: 3, // Keep some spacing below the heading
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    Select a Recycler
                </Typography>
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "40vh",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography
                        color="error"
                        sx={{
                            mt: 3,
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                        }}
                    >
                        {error}
                    </Typography>
                )}

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {recyclers.map((recycler) => (
                        <Grid item xs={12} sm={6} md={4} key={recycler._id}>
                            <Card
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#2e7d32",
                                            mb: 1,
                                        }}
                                    >
                                        {recycler.companyName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#555", mb: 1 }}
                                    >
                                        <b>Location:</b> {recycler.city}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#555", mb: 2 }}
                                    >
                                        <b>Accepted Waste:</b>{" "}
                                        {recycler.acceptedWasteTypes.join(", ")}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#2e7d32",
                                            "&:hover": { backgroundColor: "#1b5e20" },
                                            color: "#fff",
                                            fontWeight: "bold",
                                            textTransform: "none",
                                        }}
                                        onClick={() => handleSelectRecycler(recycler)}
                                    >
                                        Choose Recycler
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default SelectRecycler;