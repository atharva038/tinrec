import { useContext } from "react";
import {
    Container, Typography, Button, Box, Grid, Card, CardContent,
    CardMedia, Avatar, Paper, Stack, useTheme, useMediaQuery
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
    RecyclingOutlined, LocationOnOutlined, EmojiEventsOutlined,
    CloudUploadOutlined, EventOutlined, LocalShippingOutlined,
    CelebrationOutlined, ArrowForward
} from "@mui/icons-material";

const Home = () => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const isRecycler = user?.role === "recycler";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                    color: 'white',
                    pt: { xs: 10, md: 15 },
                    pb: { xs: 10, md: 15 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Decorative elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -150,
                        left: -150,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                    }}
                />

                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12} md={7}>
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                sx={{
                                    mb: 2,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                }}
                            >
                                Responsible E-Waste Management
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    maxWidth: 600,
                                    fontWeight: 300,
                                    lineHeight: 1.4,
                                }}
                            >
                                Join our mission to create a sustainable future through proper electronic waste disposal and recycling.
                            </Typography>

                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                            >
                                {!isAuthenticated ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            component={RouterLink}
                                            to="/signup"
                                            sx={{
                                                bgcolor: '#fff',
                                                color: '#2e7d32',
                                                fontWeight: 'bold',
                                                px: 4,
                                                py: 1.5,
                                                '&:hover': {
                                                    bgcolor: '#f9f9f9',
                                                }
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            component={RouterLink}
                                            to="/login"
                                            sx={{
                                                borderColor: '#fff',
                                                color: '#fff',
                                                px: 4,
                                                py: 1.5,
                                                '&:hover': {
                                                    borderColor: '#fff',
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                }
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </>
                                ) : (
                                    !isRecycler && (
                                        <Button
                                            variant="contained"
                                            size="large"
                                            endIcon={<ArrowForward />}
                                            component={RouterLink}
                                            to="/submit-ewaste"
                                            sx={{
                                                bgcolor: '#fff',
                                                color: '#2e7d32',
                                                fontWeight: 'bold',
                                                px: 4,
                                                py: 1.5,
                                                '&:hover': {
                                                    bgcolor: '#f9f9f9',
                                                }
                                            }}
                                        >
                                            Register Pickup
                                        </Button>
                                    )
                                )}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                                component="img"
                                src="/images/hero-image.png"
                                alt="E-Waste Recycling"
                                sx={{
                                    width: '100%',
                                    maxWidth: 500,
                                    filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.3))',
                                    transform: 'translateY(-20px)',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg">
                <Grid
                    container
                    sx={{
                        mt: -5,
                        mb: 8,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Grid item xs={12} md={4} sx={{ bgcolor: '#fff', p: 4, textAlign: 'center' }}>
                        <Typography variant="h2" fontWeight="bold" color="#2e7d32">5000+</Typography>
                        <Typography variant="subtitle1" color="text.secondary">E-waste pickups completed</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ bgcolor: '#f5f5f5', p: 4, textAlign: 'center' }}>
                        <Typography variant="h2" fontWeight="bold" color="#2e7d32">10+</Typography>
                        <Typography variant="subtitle1" color="text.secondary">Tons recycled monthly</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ bgcolor: '#fff', p: 4, textAlign: 'center' }}>
                        <Typography variant="h2" fontWeight="bold" color="#2e7d32">500+</Typography>
                        <Typography variant="subtitle1" color="text.secondary">Verified recyclers</Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ bgcolor: '#f8f8f8', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="#2e7d32"
                            sx={{ mb: 2 }}
                        >
                            Why Choose Us
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Our platform makes e-waste recycling accessible, rewarding, and impactful
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: '#e8f5e9', p: 3, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: '#2e7d32',
                                            width: 70,
                                            height: 70,
                                            mx: 'auto',
                                        }}
                                    >
                                        <RecyclingOutlined fontSize="large" />
                                    </Avatar>
                                </Box>
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" fontWeight="medium">
                                        Eco-Friendly Disposal
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        We partner with certified recyclers who follow environmentally responsible practices to properly process e-waste.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: '#e8f5e9', p: 3, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: '#2e7d32',
                                            width: 70,
                                            height: 70,
                                            mx: 'auto',
                                        }}
                                    >
                                        <LocationOnOutlined fontSize="large" />
                                    </Avatar>
                                </Box>
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" fontWeight="medium">
                                        Convenient Pickup
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Schedule hassle-free pickups from your doorstep, making responsible disposal easier than ever.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                <Box sx={{ bgcolor: '#e8f5e9', p: 3, textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: '#2e7d32',
                                            width: 70,
                                            height: 70,
                                            mx: 'auto',
                                        }}
                                    >
                                        <EmojiEventsOutlined fontSize="large" />
                                    </Avatar>
                                </Box>
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" fontWeight="medium">
                                        Rewarding Experience
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Earn points and rewards for your contributions to environmental sustainability through our program.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="#2e7d32"
                            sx={{ mb: 2 }}
                        >
                            How It Works
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Four simple steps to responsibly dispose of your electronic waste
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {[
                            {
                                icon: <CloudUploadOutlined fontSize="large" />,
                                title: "Upload Details",
                                description: "Register your e-waste items with photos and details on our user-friendly platform."
                            },
                            {
                                icon: <EventOutlined fontSize="large" />,
                                title: "Schedule Pickup",
                                description: "Choose a convenient date and time for collection from your location."
                            },
                            {
                                icon: <LocalShippingOutlined fontSize="large" />,
                                title: "Recycler Assigned",
                                description: "A verified recycler will be assigned to collect your electronic waste."
                            },
                            {
                                icon: <CelebrationOutlined fontSize="large" />,
                                title: "Get Rewarded",
                                description: "Earn points, track your environmental impact, and receive rewards."
                            }
                        ].map((step, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        borderRadius: 4,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderLeft: index === 0 ? '4px solid #2e7d32' : 'none',
                                        borderTop: index === 1 ? '4px solid #2e7d32' : 'none',
                                        borderRight: index === 2 ? '4px solid #2e7d32' : 'none',
                                        borderBottom: index === 3 ? '4px solid #2e7d32' : 'none',
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: 50,
                                            height: 50,
                                            bgcolor: 'rgba(46, 125, 50, 0.1)',
                                            borderRadius: '50%',
                                            bottom: -20,
                                            right: -20,
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mb: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 60,
                                            height: 60,
                                            borderRadius: '50%',
                                            bgcolor: '#e8f5e9',
                                            color: '#2e7d32',
                                        }}
                                    >
                                        {step.icon}
                                        <Typography
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: 20,
                                                fontSize: '4rem',
                                                fontWeight: 'bold',
                                                color: 'rgba(46, 125, 50, 0.1)',
                                            }}
                                        >
                                            {index + 1}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {step.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Impact Section */}
            <Box
                sx={{
                    py: 8,
                    bgcolor: '#2e7d32',
                    color: 'white',
                    position: 'relative',
                    backgroundImage: 'url("/images/pattern-bg.png")',
                    backgroundBlendMode: 'overlay',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                            Our Environmental Impact
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
                            Every e-waste pickup contributes to these environmental savings
                        </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                                <Box
                                    component="img"
                                    src="/images/carbon-icon.png"
                                    alt="Carbon Reduction"
                                    sx={{ height: 80, mb: 2 }}
                                />
                                <Typography variant="h4" fontWeight="bold" color="#2e7d32">
                                    5,200 kg
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Carbon emissions reduced
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                                <Box
                                    component="img"
                                    src="/images/water-icon.png"
                                    alt="Water Saved"
                                    sx={{ height: 80, mb: 2 }}
                                />
                                <Typography variant="h4" fontWeight="bold" color="#2e7d32">
                                    8.3 million
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Liters of water saved
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                                <Box
                                    component="img"
                                    src="/images/landfill-icon.png"
                                    alt="Landfill Reduction"
                                    sx={{ height: 80, mb: 2 }}
                                />
                                <Typography variant="h4" fontWeight="bold" color="#2e7d32">
                                    15 tons
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    E-waste diverted from landfills
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box sx={{ py: 8, bgcolor: '#f8f8f8' }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="#2e7d32"
                            sx={{ mb: 2 }}
                        >
                            What Users Say
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Hear from people who have used our platform
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {[
                            {
                                quote: "This platform made e-waste disposal super easy! The pickup was scheduled quickly and the recycler was professional. I appreciate the impact tracker showing my environmental contribution.",
                                name: "Rahul Sharma",
                                title: "Regular User",
                                avatar: "/images/avatar-1.jpg"
                            },
                            {
                                quote: "As someone concerned about the environment, I was looking for a responsible way to dispose of old electronics. This service exceeded my expectations with their professionalism and convenience.",
                                name: "Priya Mehta",
                                title: "Tech Professional",
                                avatar: "/images/avatar-2.jpg"
                            },
                            {
                                quote: "I've been using this platform for my company's e-waste disposal needs. The reporting and tracking features are excellent, and the pickup service is always prompt.",
                                name: "Amit Patel",
                                title: "Business Owner",
                                avatar: "/images/avatar-3.jpg"
                            }
                        ].map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        borderRadius: 4,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    elevation={2}
                                >
                                    <Box sx={{ height: '100%' }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{
                                                mb: 3,
                                                fontStyle: 'italic',
                                                position: 'relative',
                                                '&:before': {
                                                    content: '"""',
                                                    fontSize: '4rem',
                                                    position: 'absolute',
                                                    top: -20,
                                                    left: -10,
                                                    color: 'rgba(46, 125, 50, 0.1)',
                                                    fontFamily: 'serif'
                                                }
                                            }}
                                        >
                                            {testimonial.quote}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                        <Avatar
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            sx={{ width: 50, height: 50, mr: 2 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.title}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 10 }}>
                <Container maxWidth="md">
                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                            color: 'white',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -50,
                                right: -50,
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -80,
                                left: -80,
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                            }}
                        />

                        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2, position: 'relative' }}>
                            Ready to Recycle Your E-Waste?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
                            Join thousands of users making a positive environmental impact through responsible e-waste management.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={RouterLink}
                            to={isAuthenticated ? "/submit-ewaste" : "/signup"}
                            sx={{
                                bgcolor: '#fff',
                                color: '#2e7d32',
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    bgcolor: '#f9f9f9',
                                },
                                zIndex: 1,
                                position: 'relative',
                            }}
                        >
                            {isAuthenticated ? "Schedule Pickup" : "Get Started Now"}
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;