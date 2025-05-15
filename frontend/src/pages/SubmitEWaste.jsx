import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
    Grid,
    Paper,
    Divider,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Alert
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
    RecyclingOutlined,
    LocationOn,
    ShoppingBag,
    Category,
    Description,
    Scale,
    ArrowForward
} from "@mui/icons-material";

const cities = ["Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"];
const categories = ["Electronics", "Batteries", "Cables", "Mobile Phones", "Laptops", "Monitors", "Printers", "Computer Parts", "Home Appliances"];

const SubmitEWaste = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            itemName: "",
            category: "",
            description: "",
            city: "",
            pickupAddress: "",
            quantity: "",
            weight: "",
            unit: "kg",
        },
        mode: "onChange"
    });

    const [measurementMode, setMeasurementMode] = useState(null); // 'quantity' or 'weight'

    // Watch quantity and weight to handle mutual exclusivity
    const quantity = watch("quantity");
    const weight = watch("weight");

    // Handle switching between quantity and weight inputs
    const handleMeasurementChange = (mode) => {
        setMeasurementMode(mode);
        if (mode === 'quantity') {
            setValue("weight", "");
        } else if (mode === 'weight') {
            setValue("quantity", "");
        }
    };

    const onSubmit = (data) => {
        navigate("/select-recycler", { state: data });
    };

    return (
        <Box
            sx={{
                backgroundColor: "#f5f9f7", // Softer background
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                padding: { xs: 2, md: 4 },
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden'
                    }}
                >
                    {/* Header Section */}
                    <Box
                        sx={{
                            bgcolor: '#00897b',
                            color: 'white',
                            p: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <RecyclingOutlined fontSize="large" />
                        <Typography variant="h4" fontWeight="medium">
                            Submit E-Waste for Recycling
                        </Typography>
                    </Box>

                    {/* Main Form */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            p: { xs: 3, md: 4 },
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                            Please provide details about the e-waste you want to recycle
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Item Details Section */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight="bold" color="#00897b" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Category sx={{ mr: 1 }} /> Item Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="itemName"
                                    control={control}
                                    rules={{ required: "Item Name is required" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Item Name"
                                            fullWidth
                                            error={!!errors.itemName}
                                            helperText={errors.itemName?.message}
                                            placeholder="e.g. Dell Laptop, iPhone 12"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <ShoppingBag fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: "Category is required" }}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.category}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                {...field}
                                                label="Category"
                                            >
                                                {categories.map((cat) => (
                                                    <MenuItem key={cat} value={cat}>
                                                        {cat}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Description"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="Please describe the item(s), including condition, age, and any other relevant details"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                                        <Description fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Measurement Section */}
                            <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="subtitle1" fontWeight="bold" color="#00897b" sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <Scale sx={{ mr: 1 }} /> Quantity & Measurement
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    Please specify either quantity (for individual items) or weight (for bulk items)
                                </Alert>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="quantity"
                                    control={control}
                                    rules={{
                                        validate: value => {
                                            if (!value && !weight) return "Either Quantity or Weight is required";
                                            if (value && parseInt(value) <= 0) return "Quantity must be greater than 0";
                                            return true;
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Quantity (for individual items)"
                                            type="number"
                                            fullWidth
                                            disabled={measurementMode === 'weight'}
                                            error={!!errors.quantity}
                                            helperText={errors.quantity?.message}
                                            placeholder="e.g. 2 laptops, 5 phones"
                                            onClick={() => handleMeasurementChange('quantity')}
                                            InputProps={{
                                                inputProps: { min: "1" },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Typography variant="body2" color="text.secondary">Qty</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <Controller
                                            name="weight"
                                            control={control}
                                            rules={{
                                                validate: value => {
                                                    if (!value && !quantity) return "Either Quantity or Weight is required";
                                                    if (value && parseFloat(value) <= 0) return "Weight must be greater than 0";
                                                    return true;
                                                }
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Weight (for bulk items)"
                                                    type="number"
                                                    fullWidth
                                                    disabled={measurementMode === 'quantity'}
                                                    error={!!errors.weight}
                                                    helperText={errors.weight?.message}
                                                    placeholder="e.g. 5.5"
                                                    onClick={() => handleMeasurementChange('weight')}
                                                    InputProps={{
                                                        inputProps: { min: "0.1", step: "0.1" },
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Typography variant="body2" color="text.secondary">Wt</Typography>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controller
                                            name="unit"
                                            control={control}
                                            render={({ field }) => (
                                                <FormControl fullWidth disabled={measurementMode === 'quantity'}>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Select
                                                        {...field}
                                                        label="Unit"
                                                    >
                                                        <MenuItem value="kg">kg</MenuItem>
                                                        <MenuItem value="g">g</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Location Section */}
                            <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="subtitle1" fontWeight="bold" color="#00897b" sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <LocationOn sx={{ mr: 1 }} /> Pickup Location
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: "City is required" }}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.city}>
                                            <InputLabel>City</InputLabel>
                                            <Select
                                                {...field}
                                                label="City"
                                            >
                                                {cities.map((city) => (
                                                    <MenuItem key={city} value={city}>
                                                        {city}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.city && <FormHelperText>{errors.city.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="pickupAddress"
                                    control={control}
                                    rules={{ required: "Pickup Address is required" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Pickup Address"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            error={!!errors.pickupAddress}
                                            helperText={errors.pickupAddress?.message}
                                            placeholder="Enter your complete address with landmark and pin code"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                                        <LocationOn fontSize="small" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{
                                    px: 3,
                                    borderColor: '#00897b',
                                    color: '#00897b',
                                    '&:hover': { borderColor: '#00695c', color: '#00695c' }
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<ArrowForward />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    backgroundColor: "#00897b",
                                    "&:hover": { backgroundColor: "#00695c" },
                                    boxShadow: 2
                                }}
                            >
                                Continue to Select Recycler
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SubmitEWaste;