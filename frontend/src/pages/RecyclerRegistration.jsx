import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Chip,
    MenuItem,
    Paper,
    Alert,
    CircularProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerRecycler } from "../services/recyclerApi";
import AuthContext from "../context/AuthContext";

const wasteTypes = [
    "Electronics",
    "Batteries",
    "Mobile Phones",
    "Laptops",
    "Cables",
    "Computer Parts",
    "Household Appliances",
    "Other"
];

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai"];

const RecyclerRegistration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Redirect if already registered as recycler
    useEffect(() => {
        if (user?.role === "recycler") {
            // Check if they need to complete registration
            // This is just a placeholder - you would typically check if they have a profile
            const checkRecyclerProfile = async () => {
                try {
                    const token = localStorage.getItem("token");
                    // You would need to implement this endpoint
                    const response = await fetch("/api/recyclers/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.ok) {
                        navigate("/dashboard/recycler");
                    }
                } catch (err) {
                    // If error, they need to complete registration
                    console.log("User needs to complete registration");
                }
            };

            // Uncomment when you implement the profile check
            // checkRecyclerProfile();
        }
    }, [user, navigate]);

    // Handle waste type selection
    const handleWasteTypeClick = (wasteType) => {
        setSelectedWasteTypes(prev =>
            prev.includes(wasteType)
                ? prev.filter(type => type !== wasteType)
                : [...prev, wasteType]
        );
    };

    // Form submission handler
    const onSubmit = async (data) => {
        try {
            // Validation checks
            if (selectedWasteTypes.length === 0) {
                setError("Please select at least one waste type");
                return;
            }

            setLoading(true);
            const token = localStorage.getItem("token");

            // Prepare recycler data
            const recyclerData = {
                companyName: data.companyName,
                city: data.city,
                address: data.address,
                acceptedWasteTypes: selectedWasteTypes
            };

            // Call API to register
            await registerRecycler(recyclerData, token);

            // Success - redirect to dashboard
            navigate("/dashboard/recycler");
        } catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "Failed to register recycler");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" sx={{ mb: 4, color: "#2e7d32", textAlign: "center" }}>
                    Register Your Recycling Service
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Company Name"
                        margin="normal"
                        {...register("companyName", { required: "Company name is required" })}
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                        disabled={loading}
                    />

                    <TextField
                        select
                        fullWidth
                        label="City"
                        margin="normal"
                        defaultValue=""
                        {...register("city", { required: "City is required" })}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        disabled={loading}
                    >
                        <MenuItem value="" disabled>Select a city</MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            Select Accepted Waste Types
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Choose all the types of e-waste your service can process
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {wasteTypes.map((type) => (
                                <Chip
                                    key={type}
                                    label={type}
                                    onClick={() => !loading && handleWasteTypeClick(type)}
                                    color={selectedWasteTypes.includes(type) ? "primary" : "default"}
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: selectedWasteTypes.includes(type)
                                            ? "#2e7d32"
                                            : "default",
                                        opacity: loading ? 0.7 : 1
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        label="Complete Address"
                        margin="normal"
                        multiline
                        rows={3}
                        {...register("address", {
                            required: "Address is required",
                            minLength: {
                                value: 10,
                                message: "Please enter a complete address"
                            }
                        })}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        placeholder="Enter your complete business address including street, locality, and pincode"
                        disabled={loading}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 3,
                            backgroundColor: "#2e7d32",
                            "&:hover": { backgroundColor: "#1b5e20" },
                            height: 56
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Register Service"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RecyclerRegistration;