import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { signupUser } from "../services/api"; // Correct API import
import { useNavigate } from "react-router-dom";
import "../assets/styles.css"; // Import custom styles for consistency

const Signup = () => {
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await signupUser(data); // Call API correctly
            reset();
            navigate("/login");
        } catch (err) {
            setError(err.message || "Signup failed"); // Ensure error is displayed properly
        }
    };

    return (
        <div className="hero-section text-center"> {/* Consistent with Home and Login pages */}
            <Container maxWidth="sm">
                <Typography variant="h4" sx={{ color: "#2e7d32", fontWeight: "bold", mb: 2 }}>
                    Create Your Account
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
                    Join us and start managing your e-waste pickups today.
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ background: "#fff", p: 4, borderRadius: 2, boxShadow: 3 }}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register("email", { required: "Email is required" })}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("password", { required: "Password is required" })}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
                    >
                        Signup
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account? <a href="/login" style={{ color: "#2e7d32", textDecoration: "none" }}>Login here</a>.
                </Typography>
            </Container>
        </div>
    );
};

export default Signup;