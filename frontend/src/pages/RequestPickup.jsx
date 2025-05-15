import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    MenuItem,
    Box,
    Paper,
    Grid,
    Alert,
    Snackbar,
    InputAdornment,
    Divider,
    FormControl,
    InputLabel,
    Select,
    FormHelperText
} from "@mui/material";
import {
    RecyclingOutlined,
    DeleteOutline,
    LocationOn,
    Check,
    Info as InfoIcon
} from '@mui/icons-material';
import { submitEWaste } from "../api/api"; // API call function
import { useNavigate } from "react-router-dom";

const RequestPickup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemType: "",
        quantity: "",
        address: "",
        description: "", // Added new field for item description
    });

    // Form validation state
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Validate item type
        if (!formData.itemType) {
            newErrors.itemType = "Please select an item type";
        }

        // Validate quantity
        if (!formData.quantity) {
            newErrors.quantity = "Please enter a quantity";
        } else if (parseInt(formData.quantity) <= 0) {
            newErrors.quantity = "Quantity must be a positive number";
        }

        // Validate address
        if (!formData.address.trim()) {
            newErrors.address = "Please enter a pickup address";
        } else if (formData.address.trim().length < 10) {
            newErrors.address = "Please enter a complete address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for quantity to ensure it's a positive number
        if (name === 'quantity') {
            // Allow only positive numbers
            const parsedValue = value === '' ? '' : Math.max(0, parseInt(value) || 0).toString();
            setFormData({ ...formData, [name]: parsedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await submitEWaste(formData);
            setSuccess("Pickup request submitted successfully!");
            setOpenSnackbar(true);
            setFormData({ itemType: "", quantity: "", address: "", description: "" });
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setErrors({ submit: err.message || "Failed to submit request. Please try again." });
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" sx={{ my: 5 }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{
                    bgcolor: '#00897b',
                    p: 3,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <RecyclingOutlined fontSize="large" />
                    <Typography variant="h4" fontWeight="medium">
                        Request E-Waste Pickup
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: { xs: 3, md: 5 },
                        bgcolor: 'background.paper',
                    }}
                >
                    {errors.submit && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {errors.submit}
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.itemType}>
                                <InputLabel id="item-type-label">Item Type</InputLabel>
                                <Select
                                    labelId="item-type-label"
                                    name="itemType"
                                    value={formData.itemType}
                                    onChange={handleChange}
                                    label="Item Type"
                                    required
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <DeleteOutline />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="Laptop">Laptop</MenuItem>
                                    <MenuItem value="Desktop">Desktop Computer</MenuItem>
                                    <MenuItem value="Mobile">Mobile Phone</MenuItem>
                                    <MenuItem value="Tablet">Tablet</MenuItem>
                                    <MenuItem value="Television">Television</MenuItem>
                                    <MenuItem value="Monitor">Monitor</MenuItem>
                                    <MenuItem value="Battery">Battery</MenuItem>
                                    <MenuItem value="Printer">Printer</MenuItem>
                                    <MenuItem value="Keyboard">Keyboard/Mouse</MenuItem>
                                    <MenuItem value="Other">Other Electronic Device</MenuItem>
                                </Select>
                                {errors.itemType && <FormHelperText>{errors.itemType}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                fullWidth
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                inputProps={{ min: "1", step: "1" }}
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            #
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Pickup Address"
                                name="address"
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.address}
                                onChange={handleChange}
                                required
                                error={!!errors.address}
                                helperText={errors.address}
                                placeholder="Please enter your complete address including city, state and pin code"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Item Description (Optional)"
                                name="description"
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Please describe the condition of the item and any other relevant details"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4 }}>
                        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
                            Your request will be matched with a certified recycler who will contact you to confirm the pickup time.
                        </Alert>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/dashboard')}
                            sx={{ px: 3 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                px: 4,
                                py: 1,
                                backgroundColor: "#00897b",
                                "&:hover": { backgroundColor: "#005f56" },
                                minWidth: 150
                            }}
                        >
                            {loading ? "Submitting..." : "Submit Request"}
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    icon={<Check />}
                >
                    {success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RequestPickup;