import { Box, Typography, Container, Grid, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#212121",
                color: "#fff",
                padding: "20px 0",
                marginTop: "auto",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* About Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            We aim to create a sustainable future by making e-waste
                            management easy and accessible.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" underline="hover">
                            Home
                        </Link>
                        <br />
                        <Link href="/signup" color="inherit" underline="hover">
                            Sign Up
                        </Link>
                        <br />
                        <Link href="/login" color="inherit" underline="hover">
                            Login
                        </Link>
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">Email: support@ewaste.com</Typography>
                        <Typography variant="body2">Phone: +91 1234567890</Typography>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box textAlign="center" mt={3}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} E-Waste Management. All rights
                        reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
