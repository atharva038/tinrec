import { useState, useCallback, useEffect } from "react";
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
    Alert,
    CircularProgress
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
    RecyclingOutlined,
    LocationOn,
    ShoppingBag,
    Category,
    Description,
    Scale,
    ArrowForward,
    MyLocation
} from "@mui/icons-material";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const cities = ["Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur"];
const categories = ["Electronics", "Batteries", "Cables", "Mobile Phones", "Laptops", "Monitors", "Printers", "Computer Parts", "Home Appliances"];

// Map configurations
const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px'
};

const defaultCenter = {
    lat: 20.5937, // Default center of India
    lng: 78.9629
};

const libraries = ["places"];

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
    const [marker, setMarker] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [mapZoom, setMapZoom] = useState(5);
    const [isGeocoding, setIsGeocoding] = useState(false);

    // Watch quantity and weight to handle mutual exclusivity
    const quantity = watch("quantity");
    const weight = watch("weight");
    const selectedCity = watch("city");

    // Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    // Handle switching between quantity and weight inputs
    const handleMeasurementChange = (mode) => {
        setMeasurementMode(mode);
        if (mode === 'quantity') {
            setValue("weight", "");
        } else if (mode === 'weight') {
            setValue("quantity", "");
        }
    };

    // Center map on selected city when city changes
    useEffect(() => {
        if (selectedCity && isLoaded && window.google) {
            setIsGeocoding(true);
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: selectedCity + ", India" }, (results, status) => {
                setIsGeocoding(false);
                if (status === "OK" && results[0]) {
                    const location = results[0].geometry.location;
                    setMapCenter({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                    setMapZoom(11);
                }
            });
        }
    }, [selectedCity, isLoaded]);

    // Handle map click to set marker
    const handleMapClick = useCallback((event) => {
        if (!isLoaded || !window.google) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarker({ lat, lng });

        // Get address from coordinates using Geocoding API
        setIsGeocoding(true);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            setIsGeocoding(false);
            if (status === "OK" && results[0]) {
                setValue("pickupAddress", results[0].formatted_address);

                // Try to extract city from the address components
                const cityComponent = results[0].address_components.find(
                    component => component.types.includes("locality")
                );

                if (cityComponent && cities.includes(cityComponent.long_name)) {
                    setValue("city", cityComponent.long_name);
                }
            }
        });
    }, [isLoaded, setValue]);

    // Use browser's geolocation API to get current location
    const handleGetCurrentLocation = () => {
        if (!isLoaded || !window.google) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    setMarker({ lat, lng });
                    setMapCenter({ lat, lng });
                    setMapZoom(15);

                    // Get address from coordinates
                    setIsGeocoding(true);
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                        setIsGeocoding(false);
                        if (status === "OK" && results[0]) {
                            setValue("pickupAddress", results[0].formatted_address);

                            // Try to extract city from the address components
                            const cityComponent = results[0].address_components.find(
                                component => component.types.includes("locality")
                            );

                            if (cityComponent && cities.includes(cityComponent.long_name)) {
                                setValue("city", cityComponent.long_name);
                            }
                        }
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true }
            );
        }
    };

    const onSubmit = (data) => {
        // Add coordinates to the form data if available
        const formData = { ...data };
        if (marker) {
            formData.coordinates = marker;
        }
        navigate("/select-recycler", { state: formData });
    };

    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={mapZoom}
                onClick={handleMapClick}
                options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoomControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_TOP
                    }
                }}
            >
                {marker && <Marker position={marker} />}
            </GoogleMap>
        );
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

                            {/* Google Map */}
                            <Grid item xs={12}>
                                <Box sx={{ mb: 2, position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                                    {loadError && (
                                        <Alert severity="error" sx={{ mb: 2 }}>
                                            Error loading Google Maps. Please check your API key.
                                        </Alert>
                                    )}

                                    {!isLoaded ? (
                                        <Box sx={{
                                            height: '300px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: '#f5f5f5',
                                            borderRadius: '8px'
                                        }}>
                                            <CircularProgress color="primary" />
                                        </Box>
                                    ) : (
                                        renderMap()
                                    )}

                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<MyLocation />}
                                        onClick={handleGetCurrentLocation}
                                        disabled={!isLoaded || isGeocoding}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 10,
                                            left: 10,
                                            backgroundColor: 'white',
                                            color: '#00897b',
                                            '&:hover': { backgroundColor: '#f1f1f1' },
                                            zIndex: 10
                                        }}
                                    >
                                        {isGeocoding ? <CircularProgress size={20} /> : "Use My Location"}
                                    </Button>
                                </Box>
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    Click on the map to set your pickup location or use the "Use My Location" button
                                </Alert>
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