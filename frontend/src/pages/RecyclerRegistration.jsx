import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Chip,
    Paper,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Divider,
    InputAdornment,
    Card,
    CardContent,
    Step,
    StepLabel,
    Stepper,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerRecycler } from "../services/recyclerApi";
import AuthContext from "../context/AuthContext";

import {
    Business,
    LocationCity,
    LocationOn,
    Category,
    Check,
    Engineering,
    VerifiedUser,
    ArrowForward,
    ArrowBack
} from "@mui/icons-material";

// Just leave the comment as it is
// Notice: Removed RecyclerLayout import since we'll add this component directly to routes

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

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata"];


const RecyclerRegistration = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [selectedWasteTypes, setSelectedWasteTypes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Company Information', 'Service Details', 'Verification'];
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        // Redirect if user is not a recycler
        if (user && user.role !== "recycler") {
            navigate("/");
        }
    }, [user, navigate]);

    const handleWasteTypeClick = (wasteType) => {
        setSelectedWasteTypes(prev =>
            prev.includes(wasteType)
                ? prev.filter(type => type !== wasteType)
                : [...prev, wasteType]
        );
    };

    const handleNext = () => {
        // Validate first step
        if (activeStep === 0) {
            const companyName = watch('companyName');
            const city = watch('city');
            const address = watch('address');

            if (!companyName || !city || !address) {
                setError("Please fill in all required fields before proceeding.");
                return;
            }
        }

        // Validate second step
        if (activeStep === 1 && selectedWasteTypes.length === 0) {
            setError("Please select at least one waste type before proceeding.");
            return;
        }

        setError(""); // Clear any existing errors
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setError(""); // Clear any errors when going back
        setActiveStep((prevStep) => prevStep - 1);
    };

    const onSubmit = async (data) => {
        try {
            // Validate waste types
            if (selectedWasteTypes.length === 0) {
                setError("Please select at least one waste type");
                return;
            }

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            // Prepare recycler data
            const recyclerData = {
                companyName: data.companyName,
                city: data.city,
                address: data.address,
                pickupRadius: data.pickupRadius || 10,
                acceptedWasteTypes: selectedWasteTypes,
                certifications: data.certifications || '',
                description: data.description || ''
            };

            // API call to register
            await registerRecycler(recyclerData, token);

            setSuccess(true);
            setTimeout(() => {
                navigate("/dashboard/recycler");
            }, 1500);

        } catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "Failed to register recycler service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                {...register("companyName", {
                                    required: "Company name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Company name must be at least 3 characters"
                                    }
                                })}
                                error={!!errors.companyName}
                                helperText={errors.companyName?.message}
                                disabled={loading || success}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Business fontSize="small" color="action" />
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

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={!!errors.city} sx={{
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
                            }}>
                                <InputLabel>City</InputLabel>
                                <Select
                                    label="City"
                                    defaultValue=""
                                    {...register("city", { required: "City is required" })}
                                    disabled={loading || success}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LocationCity fontSize="small" color="action" />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>Select a city</MenuItem>
                                    {cities.map((city) => (
                                        <MenuItem key={city} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.city && (
                                    <Typography variant="caption" color="error">
                                        {errors.city.message}
                                    </Typography>
                                )}
                            </FormControl>
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
                                defaultValue={10}
                                error={!!errors.pickupRadius}
                                helperText={errors.pickupRadius?.message || "Maximum distance you can travel for pickups"}
                                disabled={loading || success}
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
                                label="Complete Business Address"
                                multiline
                                rows={3}
                                placeholder="Enter your complete business address including street, locality, and pincode"
                                {...register("address", {
                                    required: "Business address is required",
                                    minLength: {
                                        value: 10,
                                        message: "Please enter a complete address"
                                    }
                                })}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                disabled={loading || success}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                            <LocationOn fontSize="small" color="action" />
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
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 1, fontWeight: 500 }}
                            >
                                Select acceptable e-waste types:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Choose all the types of e-waste your service can process:
                            </Typography>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                                {wasteTypes.map((type) => (
                                    <Chip
                                        key={type}
                                        label={type}
                                        onClick={() => !loading && !success && handleWasteTypeClick(type)}
                                        color={selectedWasteTypes.includes(type) ? "primary" : "default"}
                                        disabled={loading || success}
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
                                            opacity: (loading || success) ? 0.7 : 1,
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

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Certifications/Licenses"
                                placeholder="List any environmental certifications or recycling licenses you hold"
                                {...register("certifications")}
                                multiline
                                rows={2}
                                disabled={loading || success}
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
                                disabled={loading || success}
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
                );
            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert
                                severity="info"
                                sx={{
                                    mb: 3,
                                    backgroundColor: 'rgba(0, 137, 123, 0.08)',
                                    '& .MuiAlert-icon': {
                                        color: '#00897b'
                                    }
                                }}
                                icon={<VerifiedUser fontSize="inherit" />}
                            >
                                Please review your information before submitting. You can edit your profile later.
                            </Alert>

                            <Card
                                variant="outlined"
                                sx={{
                                    mb: 2,
                                    borderRadius: 2,
                                    borderColor: 'rgba(0, 137, 123, 0.3)'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: "#00897b", display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Business fontSize="small" /> Company Details
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Company Name:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>{watch('companyName')}</Typography>
                                        </Grid>

                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">City:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>{watch('city')}</Typography>
                                        </Grid>

                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Address:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>{watch('address')}</Typography>
                                        </Grid>

                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Pickup Radius:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>{watch('pickupRadius') || 10} km</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    borderColor: 'rgba(0, 137, 123, 0.3)'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ color: "#00897b", display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Category fontSize="small" /> Service Details
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Waste Types:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selectedWasteTypes.map(type => (
                                                    <Chip
                                                        key={type}
                                                        label={type}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: '#e0f2f1',
                                                            color: '#00897b',
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Certifications:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>
                                                {watch('certifications') || 'None specified'}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} sm={3}>
                                            <Typography variant="body2" color="text.secondary">Description:</Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={9}>
                                            <Typography variant="body2" fontWeight={500}>
                                                {watch('description') || 'None provided'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

    // MAIN CHANGES: Removed RecyclerLayout wrapper, adjusted margins, fixed styling
    return (
        <Box sx={{
            flexGrow: 1,
            mt: 0, // Reduced top margin significantly
            ml: 0, // No left margin to align with sidebar
            mb: 3 // Keep some bottom margin for spacing
        }}>
            <Container
                maxWidth="md"
                sx={{
                    mt: 1, // Small top margin
                    mb: 2 // Bottom margin
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, md: 3 }, // Reduced padding
                        borderRadius: 2,
                        background: "linear-gradient(to bottom, rgba(224, 242, 241, 0.3), rgba(255, 255, 255, 1))",
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mt: 0, // No top margin
                            mb: 1,
                            color: "#00897b",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: { xs: '1.5rem', md: '2rem' } // Slightly smaller
                        }}
                    >
                        Register Your Recycling Service
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3, // Reduced margin
                            textAlign: "center",
                            color: "text.secondary",
                            maxWidth: "700px",
                            mx: "auto"
                        }}
                    >
                        Complete this form to register as an e-waste recycling provider and start receiving pickup requests.
                    </Typography>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3, borderRadius: 1 }}
                            onClose={() => setError("")}
                        >
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert
                            severity="success"
                            sx={{ mb: 3, borderRadius: 1 }}
                            icon={<Check fontSize="inherit" />}
                        >
                            Registration successful! Redirecting to your dashboard...
                        </Alert>
                    )}

                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{
                            mb: 3, // Reduced margin
                            '& .MuiStepLabel-root .Mui-completed': {
                                color: '#00897b',
                            },
                            '& .MuiStepLabel-root .Mui-active': {
                                color: '#00897b',
                            },
                        }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        {getStepContent(activeStep)}

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 4, // Reduced margin
                            pt: 2.5, // Reduced padding
                            borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                        }}>
                            <Button
                                disabled={activeStep === 0 || loading || success}
                                onClick={handleBack}
                                variant="outlined"
                                startIcon={<ArrowBack />}
                                sx={{
                                    py: 1.2, // Taller button 
                                    px: { xs: 2.5, sm: 3.5 }, // Wider button
                                    borderColor: "#00897b",
                                    color: "#00897b",
                                    fontWeight: 500, // Bolder text
                                    "&:hover": {
                                        borderColor: "#00695c",
                                        backgroundColor: 'rgba(0, 137, 123, 0.04)'
                                    },
                                    transition: 'all 0.2s ease' // Smooth transition
                                }}
                            >
                                Back
                            </Button>
                           <Box>
                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading || success}
                                        sx={{
                                            py: 1.2, // Match back button height
                                            px: { xs: 3.5, sm: 4.5 }, // Wider button
                                            backgroundColor: "#00897b",
                                            "&:hover": {
                                                backgroundColor: "#00695c",
                                                boxShadow: '0 4px 10px rgba(0, 105, 92, 0.2)'
                                            },
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                            boxShadow: 'none'
                                        }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : success ? (
                                            "Registration Complete"
                                        ) : (
                                            "Complete Registration"
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        disabled={loading || success || (activeStep === 1 && selectedWasteTypes.length === 0)}
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            py: 1.2, // Match back button height
                                            px: { xs: 3.5, sm: 4.5 }, // Wider button
                                            backgroundColor: "#00897b",
                                            boxShadow: 'none',
                                            "&:hover": {
                                                backgroundColor: "#00695c",
                                                boxShadow: '0 4px 10px rgba(0, 105, 92, 0.2)'
                                            }
                                        }}
                                    >
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default RecyclerRegistration;