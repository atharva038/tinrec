import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Chip,
    Paper,
    TextField,
    Button,
    Grid,
    Alert,
    CircularProgress,
    Divider,
    InputAdornment,
    Container
} from "@mui/material";
import { getRecyclerProfile, updateRecyclerServices } from "../../services/recyclerApi";
import {
    Category,
    Engineering,
    VerifiedUser,
    Check,
    Save
} from "@mui/icons-material";
import { useForm } from "react-hook-form";

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

const UpdateRecyclerServices = () => {
    const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchRecyclerProfile = async () => {
            try {
                setFetching(true);
                const token = localStorage.getItem("token");
                const response = await getRecyclerProfile(token);

                const recyclerData = response.data.data;

                if (recyclerData.acceptedWasteTypes) {
                    setSelectedWasteTypes(recyclerData.acceptedWasteTypes);
                }

                setValue("pickupRadius", recyclerData.pickupRadius || 10);
                setValue("certifications", recyclerData.certifications || "");
                setValue("description", recyclerData.description || "");

            } catch (error) {
                console.error("Error fetching recycler profile:", error);
                setError("Could not load your profile data. Please try again.");
            } finally {
                setFetching(false);
            }
        };

        fetchRecyclerProfile();
    }, [setValue]);

    const handleWasteTypeClick = (wasteType) => {
        setSelectedWasteTypes(prev =>
            prev.includes(wasteType)
                ? prev.filter(type => type !== wasteType)
                : [...prev, wasteType]
        );
    };

    const onSubmit = async (data) => {
        try {
            if (selectedWasteTypes.length === 0) {
                setError("Please select at least one waste type");
                return;
            }

            setLoading(true);
            setError("");
            setSuccess(false);

            const token = localStorage.getItem("token");

            // Prepare update data
            const updateData = {
                acceptedWasteTypes: selectedWasteTypes,
                certifications: data.certifications,
                description: data.description,
                pickupRadius: data.pickupRadius
            };

            await updateRecyclerServices(updateData, token);

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        } catch (err) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to update services. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 4
                }}
            >
                <Typography variant="h5" sx={{ color: "#00897b", mb: 2, fontWeight: 500 }}>
                    Update Your Recycling Services
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                        onClose={() => setError("")}
                    >
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert
                        severity="success"
                        sx={{ mb: 3 }}
                        icon={<Check fontSize="inherit" />}
                    >
                        Service information updated successfully!
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 1, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                                <Category fontSize="small" color="primary" />
                                Acceptable e-waste types:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Update the types of e-waste your service can process:
                            </Typography>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                                {wasteTypes.map((type) => (
                                    <Chip
                                        key={type}
                                        label={type}
                                        onClick={() => !loading && handleWasteTypeClick(type)}
                                        color={selectedWasteTypes.includes(type) ? "primary" : "default"}
                                        disabled={loading}
                                        variant={selectedWasteTypes.includes(type) ? "filled" : "outlined"}
                                        sx={{
                                            backgroundColor: selectedWasteTypes.includes(type)
                                                ? "#00897b"
                                                : "transparent",
                                            color: selectedWasteTypes.includes(type) ? "#fff" : "inherit",
                                            borderColor: selectedWasteTypes.includes(type)
                                                ? "#00897b"
                                                : "inherit",
                                            fontWeight: selectedWasteTypes.includes(type) ? 500 : 400,
                                            '&:hover': {
                                                backgroundColor: selectedWasteTypes.includes(type)
                                                    ? "#00695c"
                                                    : "rgba(0, 137, 123, 0.08)"
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            {selectedWasteTypes.length === 0 && (
                                <Typography variant="caption" color="error">
                                    Please select at least one waste type
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Maximum Pickup Radius (km)"
                                type="number"
                                {...register("pickupRadius", {
                                    min: {
                                        value: 1,
                                        message: "Radius must be at least 1 km"
                                    },
                                    max: {
                                        value: 50,
                                        message: "Radius cannot exceed 50 km"
                                    }
                                })}
                                error={!!errors.pickupRadius}
                                helperText={errors.pickupRadius?.message || "Maximum distance you can travel for pickups"}
                                disabled={loading}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#00897b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00897b',
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#00897b',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Certifications/Licenses"
                                placeholder="List any environmental certifications or recycling licenses you hold"
                                {...register("certifications")}
                                multiline
                                rows={2}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                            <VerifiedUser fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#00897b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00897b',
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#00897b',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Information"
                                placeholder="Tell users more about your recycling service, experience, and processes"
                                {...register("description")}
                                multiline
                                rows={3}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                            <Engineering fontSize="small" color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#00897b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#00897b',
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#00897b',
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                            disabled={loading}
                            sx={{
                                py: 1.2,
                                px: 3,
                                backgroundColor: "#00897b",
                                "&:hover": {
                                    backgroundColor: "#00695c",
                                    boxShadow: '0 4px 10px rgba(0, 105, 92, 0.2)'
                                }
                            }}
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default UpdateRecyclerServices;