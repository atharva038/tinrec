import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";

const cities = ["Mumbai", "Pune", "Delhi", "Bangalore", "Hyderabad"];
const categories = ["Electronics", "Batteries", "Cables", "Mobile Phones", "Laptops"];

const SubmitEWaste = () => {
    const navigate = useNavigate();
    const { register, handleSubmit,watch, formState: { errors } } = useForm({
        defaultValues: {
            itemName: "",
            category: "",
            description: "",
            city: "",
            pickupAddress: "",
            quantity: "",
            weight: "", // Add default value for weight
            unit: "kg", // Add default value for unit
        }
    });
    // Watch the quantity and weight fields
    const quantity = watch("quantity");
    const weight = watch("weight");

    const onSubmit = (data) => {
        navigate("/select-recycler", { state: data });
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
                <Typography variant="h4" sx={{ textAlign: "center", color: "#2e7d32", fontWeight: "bold", mb: 3 }}>
                    Submit E-Waste
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        background: "#fff",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <TextField
                        label="Item Name"
                        fullWidth
                        margin="normal"
                        {...register("itemName", { required: "Item Name is required" })}
                        error={!!errors.itemName}
                        helperText={errors.itemName?.message}
                    />

                    <TextField
                        select
                        label="Category"
                        fullWidth
                        margin="normal"
                        {...register("category", { required: "Category is required" })}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        defaultValue="" // Ensures controlled input
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        {...register("description")}
                        multiline
                        rows={3}
                    />

                    <TextField
                        select
                        label="City"
                        fullWidth
                        margin="normal"
                        {...register("city", { required: "City is required" })}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        defaultValue="" // Ensures controlled input
                    >
                        {cities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Pickup Address"
                        fullWidth
                        margin="normal"
                        {...register("pickupAddress", { required: "Pickup Address is required" })}
                        error={!!errors.pickupAddress}
                        helperText={errors.pickupAddress?.message}
                    />

                    {/* Quantity Field */}
                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        margin="normal"
                        {...register("quantity", { required: "Quantity is required", min: 1 })}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                    />

                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: "#555" }}>
                        Specify either Quantity or Weight
                    </Typography>

                    {/* Quantity Field */}
                    <TextField
                        label="Quantity (for small items)"
                        type="number"
                        fullWidth
                        margin="normal"
                        placeholder="Enter number of items"
                        {...register("quantity", {
                            validate: value => (value || watch("weight")) ? true : "Either Quantity or Weight is required"
                        })}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                        disabled={!!weight}
                    />

                    {/* Weight Field */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Weight (for bulk items)"
                            type="number"
                            fullWidth
                            margin="normal"
                            placeholder="Enter weight for bulk items"
                            {...register("weight", {
                                validate: value => (value || watch("quantity")) ? true : "Either Quantity or Weight is required",
                                min: {
                                    value: 0,
                                    message: "Weight must be greater than 0"
                                }
                            })}
                            error={!!errors.weight}
                            helperText={errors.weight?.message}
                            disabled={!!quantity}
                        />

                        <TextField
                            select
                            label="Unit"
                            sx={{ width: '100px' }}
                            margin="normal"
                            {...register("unit")}
                            defaultValue="kg"
                        >
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="g">g</MenuItem>
                        </TextField>
                    </Box>
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
                        Next
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default SubmitEWaste;