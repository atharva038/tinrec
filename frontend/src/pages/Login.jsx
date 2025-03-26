import { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/api"; // Import API function
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../assets/styles.css"; // Import custom styles for consistency

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // ✅ Get login function

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data);
            if (!res || !res.token) {
                throw new Error("Token is missing from response");
            }
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            login(res.user, res.token); // ✅ Call login function
            setTimeout(() => {
                navigate("/dashboard/user");
            }, 500); // Delay 500ms before redirecting
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="hero-section text-center"> {/* Consistent with Home page */}
            <Container maxWidth="sm">
                <Typography variant="h4" sx={{ color: "#2e7d32", fontWeight: "bold", mb: 2 }}>
                    Login to Your Account
                </Typography>
                <Typography variant="body1" sx={{ color: "#555", mb: 4 }}>
                    Access your dashboard and manage your e-waste pickups.
                </Typography>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error.message || error}</Typography>}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ background: "#fff", p: 4, borderRadius: 2, boxShadow: 3 }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register("email")}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        fullWidth
                        margin="normal"
                        {...register("password")}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
                    >
                        Login
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 3 }}>
                    Don't have an account? <a href="/signup" style={{ color: "#2e7d32", textDecoration: "none" }}>Sign up here</a>.
                </Typography>
            </Container>
        </div>
    );
};

export default Login;