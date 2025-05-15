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
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                backgroundColor: "#00695c", // Dark teal
                color: "#fff",
                mt: "auto", // Push to bottom with flexbox
                width: "100%",
                position: "relative",
                zIndex: 10
            }}
        >
            {/* Scroll to top button */}
            <IconButton
                onClick={scrollToTop}
                aria-label="scroll to top"
                sx={{
                    position: "absolute",
                    top: -25,
                    right: 20,
                    backgroundColor: "#fff",
                    color: "#00897b",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                    width: 46,
                    height: 46,
                    transition: "all 0.3s ease",
                    '&:hover': {
                        backgroundColor: "#e0f2f1",
                        transform: "translateY(-3px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.2)"
                    }
                }}
            >
                <ArrowUpward fontSize="small" />
            </IconButton>

            {/* Upper section with content */}
            <Box
                sx={{
                    backgroundColor: "#00897b", // Teal
                    py: { xs: 4, md: 5 },
                    backgroundImage: 'url("/images/wave-pattern.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={isMobile ? 3 : 4}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Box
                                    component="img"
                                    src="/images/logo.jpg"
                                    alt="E-Waste Management"
                                    sx={{
                                        width: isMobile ? 48 : 50,
                                        height: isMobile ? 48 : 50,
                                        mr: 1,
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: isMobile ? "1.25rem" : "1.4rem",
                                        color: "#fff"
                                    }}
                                >
                                    E-Waste Management
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 2,
                                    maxWidth: "95%",
                                    color: "rgba(255,255,255,0.9)",
                                    lineHeight: 1.6
                                }}
                            >
                                We're committed to creating a sustainable future through responsible e-waste management and recycling solutions.
                            </Typography>
                            <Stack direction="row" spacing={0.5}>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Facebook fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Twitter fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Instagram fontSize="small" />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#fff",
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <LinkedIn fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={3}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                fontWeight: 600,
                                position: "relative",
                                display: "inline-block",
                                '&:after': {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -6,
                                    left: 0,
                                    width: "40px",
                                    height: "2px",
                                    backgroundColor: "rgba(255,255,255,0.4)"
                                }
                            }}>
                                Quick Links
                            </Typography>
                            <Stack spacing={1.2}>
                                {[
                                    { text: "Home", path: "/" },
                                    { text: "About Us", path: "/about" },
                                    { text: "Request Pickup", path: "/submit-ewaste" },
                                    { text: "Login", path: "/login" }
                                ].map((item) => (
                                    <Link
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.path}
                                        sx={{
                                            color: "#e0f2f1",
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "all 0.2s ease",
                                            '&:before': {
                                                content: '"›"',
                                                marginRight: "6px",
                                                fontSize: "18px",
                                                transition: "transform 0.2s ease"
                                            },
                                            '&:hover': {
                                                color: "#fff",
                                                '&:before': {
                                                    transform: "translateX(3px)"
                                                }
                                            }
                                        }}
                                    >
                                        {item.text}
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                fontWeight: 600,
                                position: "relative",
                                display: "inline-block",
                                '&:after': {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -6,
                                    left: 0,
                                    width: "40px",
                                    height: "2px",
                                    backgroundColor: "rgba(255,255,255,0.4)"
                                }
                            }}>
                                Resources
                            </Typography>
                            <Stack spacing={1.2}>
                                {[
                                    { text: "Blog", path: "/blog" },
                                    { text: "FAQ", path: "/faq" },
                                    { text: "Recycling Tips", path: "/tips" },
                                    { text: "E-Waste Guide", path: "/guide" }
                                ].map((item) => (
                                    <Link
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.path}
                                        sx={{
                                            color: "#e0f2f1",
                                            textDecoration: "none",
                                            fontSize: "0.875rem",
                                            display: "flex",
                                            alignItems: "center",
                                            transition: "all 0.2s ease",
                                            '&:before': {
                                                content: '"›"',
                                                marginRight: "6px",
                                                fontSize: "18px",
                                                transition: "transform 0.2s ease"
                                            },
                                            '&:hover': {
                                                color: "#fff",
                                                '&:before': {
                                                    transform: "translateX(3px)"
                                                }
                                            }
                                        }}
                                    >
                                        {item.text}
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} sm={4} md={3}>
                            <Typography variant="h6" sx={{
                                mb: 2,
                                fontWeight: 600,
                                position: "relative",
                                display: "inline-block",
                                '&:after': {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -6,
                                    left: 0,
                                    width: "40px",
                                    height: "2px",
                                    backgroundColor: "rgba(255,255,255,0.4)"
                                }
                            }}>
                                Contact Us
                            </Typography>
                            <Stack spacing={1.5}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Email sx={{ mr: 1, fontSize: 18, color: "#80cbc4" }} />
                                    <Typography variant="body2">support@ewaste.com</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Phone sx={{ mr: 1, fontSize: 18, color: "#80cbc4" }} />
                                    <Typography variant="body2">+91 1234567890</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                    <LocationOn sx={{ mr: 1, fontSize: 18, color: "#80cbc4", mt: 0.3 }} />
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
            <Box sx={{
                backgroundColor: "#00695c", // Darker teal
                py: 2,
            }}>
                <Container maxWidth="lg">
                    <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)", mb: 2 }} />

                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="body2"
                                align={isMediumScreen ? "center" : "left"}
                                sx={{ fontSize: "0.8rem", opacity: 0.9 }}
                            >
                                © {new Date().getFullYear()} E-Waste Management. All rights reserved.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack
                                direction="row"
                                spacing={2}
                                divider={<Box sx={{ bgcolor: "rgba(255,255,255,0.3)", width: "1px", height: "12px", alignSelf: "center" }} />}
                                justifyContent={isMediumScreen ? "center" : "flex-end"}
                            >
                                <Link
                                    component={RouterLink}
                                    to="/terms"
                                    sx={{
                                        color: "#b2dfdb",
                                        textDecoration: "none",
                                        fontSize: "0.8rem",
                                        '&:hover': {
                                            color: "#fff",
                                            textDecoration: "none"
                                        }
                                    }}
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    component={RouterLink}
                                    to="/privacy"
                                    sx={{
                                        color: "#b2dfdb",
                                        textDecoration: "none",
                                        fontSize: "0.8rem",
                                        '&:hover': {
                                            color: "#fff",
                                            textDecoration: "none"
                                        }
                                    }}
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    component={RouterLink}
                                    to="/sitemap"
                                    sx={{
                                        color: "#b2dfdb",
                                        textDecoration: "none",
                                        fontSize: "0.8rem",
                                        '&:hover': {
                                            color: "#fff",
                                            textDecoration: "none"
                                        }
                                    }}
                                >
                                    Sitemap
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