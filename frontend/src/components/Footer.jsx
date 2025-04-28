import {
    Box,
    Typography,
    Container,
    Grid,
    Link,
    Divider,
    Stack,
    IconButton,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Email,
    Phone,
    LocationOn,
    ArrowUpward
} from "@mui/icons-material";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#1b5e20",
                color: "#fff",
                mt: "auto",
                position: "relative"
            }}
        >
            {/* Scroll to top button */}
            <IconButton
                onClick={scrollToTop}
                sx={{
                    position: "absolute",
                    top: -25,
                    right: 20,
                    backgroundColor: "#fff",
                    color: "#1b5e20",
                    boxShadow: 3,
                    width: 50,
                    height: 50,
                    '&:hover': {
                        backgroundColor: "#e8f5e9",
                    }
                }}
            >
                <ArrowUpward />
            </IconButton>

            {/* Upper section with green wave pattern */}
            <Box
                sx={{
                    backgroundColor: "#2e7d32",
                    py: 5,
                    backgroundImage: 'url("/images/wave-pattern.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* Logo and mission statement */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Box
                                    component="img"
                                    src="/images/logo.jpg"
                                    alt="E-Waste Management"
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        mr: 1,
                                        borderRadius: "8px",
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#fff",
                                        textShadow: "1px 1px 3px rgba(0,0,0,0.3)"
                                    }}
                                >
                                    E-Waste Management
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 2, maxWidth: "90%" }}>
                                We're committed to creating a sustainable future by making proper e-waste disposal accessible to everyone. Together, we can reduce environmental impact and promote responsible recycling.
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton sx={{ color: "#fff", '&:hover': { color: "#e8f5e9" } }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton sx={{ color: "#fff", '&:hover': { color: "#e8f5e9" } }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton sx={{ color: "#fff", '&:hover': { color: "#e8f5e9" } }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton sx={{ color: "#fff", '&:hover': { color: "#e8f5e9" } }}>
                                    <LinkedIn />
                                </IconButton>
                            </Stack>
                        </Grid>

                        {/* Quick links */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Quick Links
                            </Typography>
                            <Stack spacing={1.5}>
                                <Link
                                    href="/"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/submit-ewaste"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    Request Pickup
                                </Link>
                                <Link
                                    href="/login"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    Login
                                </Link>
                            </Stack>
                        </Grid>

                        {/* Resources */}
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Resources
                            </Typography>
                            <Stack spacing={1.5}>
                                <Link
                                    href="/blog"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/faq"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    FAQ
                                </Link>
                                <Link
                                    href="/recycling-tips"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    Recycling Tips
                                </Link>
                                <Link
                                    href="/e-waste-guide"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        '&:hover': {
                                            color: "#e8f5e9",
                                            textDecoration: "underline"
                                        },
                                        display: "block"
                                    }}
                                >
                                    E-Waste Guide
                                </Link>
                            </Stack>
                        </Grid>

                        {/* Contact */}
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Contact Us
                            </Typography>
                            <Stack spacing={2}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Email sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2">support@ewaste.com</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ mr: 1, fontSize: 20 }} />
                                    <Typography variant="body2">+91 1234567890</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                    <LocationOn sx={{ mr: 1, fontSize: 20, mt: 0.3 }} />
                                    <Typography variant="body2">
                                        123 Green Street, Eco City,
                                        <br />Sustainable State, 400001
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Lower section with copyright */}
            <Box sx={{ backgroundColor: "#1b5e20", py: 3 }}>
                <Container maxWidth="lg">
                    <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 3 }} />

                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" align={isMobile ? "center" : "left"}>
                                © {new Date().getFullYear()} E-Waste Management. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent={isMobile ? "center" : "flex-end"}
                            >
                                <Link
                                    href="/terms"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontSize: "0.875rem",
                                        '&:hover': { textDecoration: "underline" }
                                    }}
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href="/privacy"
                                    sx={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontSize: "0.875rem",
                                        '&:hover': { textDecoration: "underline" }
                                    }}
                                >
                                    Privacy Policy
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;