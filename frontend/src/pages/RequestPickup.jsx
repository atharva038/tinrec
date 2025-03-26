import { useState } from "react";
import { Container, TextField, Button, Typography, MenuItem, Box } from "@mui/material";
import { submitEWaste } from "../api/api"; // API call function
import { useNavigate } from "react-router-dom";

const RequestPickup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemType: "",
        quantity: "",
        address: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitEWaste(formData);
            setSuccess("Pickup request submitted successfully!");
            setError("");
            setFormData({ itemType: "", quantity: "", address: "" });
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setError(err.message || "Failed to submit request.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ textAlign: "center", color: "#2e7d32", fontWeight: "bold", mb: 3 }}>
                Request E-Waste Pickup
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="primary" sx={{ mb: 2, textAlign: "center" }}>
                    {success}
                </Typography>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    background: "#fff",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <TextField
                    select
                    label="Item Type"
                    name="itemType"
                    fullWidth
                    margin="normal"
                    value={formData.itemType}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Mobile">Mobile</MenuItem>
                    <MenuItem value="Battery">Battery</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Pickup Address"
                    name="address"
                    fullWidth
                    margin="normal"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: "#2e7d32",
                        "&:hover": { backgroundColor: "#1b5e20" },
                    }}
                >
                    Submit Request
                </Button>
            </Box>
        </Container>
    );
};

export default RequestPickup;