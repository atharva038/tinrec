import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Badge
} from "@mui/material";
import {
    Menu as MenuIcon,
    Close,
    Home,
    Dashboard,
    Person,
    Login,
    Logout,
    Recycling,
    AccountCircle,
    NotificationsOutlined
} from "@mui/icons-material";
import AuthContext from "../context/AuthContext";

const ResponsiveNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const isRecycler = user?.role === "recycler";

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
        navigate("/login");
    };

    const handleNavigation = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
        handleCloseUserMenu();
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Menu items based on authentication status
    const getMenuItems = () => {
        let items = [
            { title: "Home", path: "/", icon: <Home /> }
        ];

        if (isAuthenticated) {
            items.push({
                title: "Dashboard",
                path: isRecycler ? "/dashboard/recycler" : "/dashboard/user",
                icon: <Dashboard />
            });

            if (!isRecycler) {
                items.push({
                    title: "Register Pickup",
                    path: "/submit-ewaste",
                    icon: <Recycling />,
                    highlight: true
                });
            }
        } else {
            items = [
                ...items,
                { title: "Login", path: "/login", icon: <Login /> },
                { title: "Sign Up", path: "/signup", icon: <Person /> }
            ];
        }
        return items;
    };

    // User menu items for authenticated users
    const userMenuItems = [
        {
            title: "Profile",
            path: "/profile",
            onClick: () => handleNavigation("/profile")
        },
        {
            title: "Dashboard",
            path: isRecycler ? "/dashboard/recycler" : "/dashboard/user",
            onClick: () => handleNavigation(isRecycler ? "/dashboard/recycler" : "/dashboard/user")
        },
        {
            title: "Logout",
            onClick: handleLogout
        }
    ];

    const menuItems = getMenuItems();

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ 
                    backgroundColor: "#fff", 
                    color: "#333", 
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: "64px" // Decreased height from default
                }}
            >
                <Container maxWidth="lg"> {/* Decreased from xl to lg for less width */}
                    <Toolbar 
                        disableGutters
                        sx={{ 
                            minHeight: "64px", // Matching reduced height
                            padding: "0 8px" // Reduced horizontal padding
                        }}
                    >
                        {/* Logo - always visible */}
                        <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            mr: { xs: 1, md: 2 }
                        }}>
                            <img
                                src="/images/logo.jpg"
                                alt="E-Waste Management"
                                height="36" // Slightly reduced logo size
                                style={{ 
                                    marginRight: "8px",
                                    borderRadius: "4px",
                                    transition: "transform 0.2s ease-in-out"
                                }}
                                onMouseOver={(e) => {e.currentTarget.style.transform = "scale(1.05)"}}
                                onMouseOut={(e) => {e.currentTarget.style.transform = "scale(1)"}}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    fontSize: "1.1rem", // Slightly smaller font
                                    fontWeight: 600,
                                    color: "#00897b", // Using teal from your updated theme
                                    textDecoration: "none",
                                    letterSpacing: "0.02em"
                                }}
                            >
                                E-Waste Management
                            </Typography>
                        </Box>

                        {/* Mobile menu icon */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="small"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => setMobileMenuOpen(true)}
                                color="inherit"
                                sx={{ 
                                    border: "1px solid #f0f0f0", 
                                    borderRadius: "4px"
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Mobile title */}
                        <Typography
                            variant="subtitle1"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                                fontWeight: 600,
                                color: "#00897b",
                                textDecoration: "none",
                            }}
                        >
                            E-Waste
                        </Typography>

                        {/* Desktop navigation links */}
                        <Box sx={{ 
                            flexGrow: 1, 
                            display: { xs: "none", md: "flex" }, 
                            justifyContent: "center" // Center the navigation items
                        }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.title}
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        my: 1.5, // Reduced vertical padding
                                        mx: 0.75, // Reduced horizontal margin
                                        px: 1.5, // Reduced horizontal padding inside button
                                        py: 0.5, // Reduced vertical padding inside button
                                        fontSize: "0.875rem", // Smaller font size
                                        color: isActive(item.path) ? "#fff" : "#555",
                                        backgroundColor: isActive(item.path) ? "#00897b" : "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: "6px",
                                        fontWeight: 500,
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            backgroundColor: item.highlight ? "#00695c" : isActive(item.path) ? "#00695c" : "#f5f5f5",
                                            color: item.highlight ? "#fff" : isActive(item.path) ? "#fff" : "#00897b",
                                            transform: "translateY(-2px)",
                                            boxShadow: item.highlight || isActive(item.path) ? "0 3px 6px rgba(0,0,0,0.1)" : "none"
                                        },
                                        ...(item.highlight && {
                                            backgroundColor: "#00897b",
                                            color: "#fff",
                                            fontWeight: 500,
                                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                        }),
                                    }}
                                    startIcon={item.icon}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </Box>

                        {/* User menu - only for authenticated users */}
                        {isAuthenticated && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Notifications icon */}
                                <Tooltip title="Notifications">
                                    <IconButton 
                                        size="small" 
                                        sx={{ 
                                            mr: 1, 
                                            color: "#555",
                                            "&:hover": { color: "#00897b" }
                                        }}
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <NotificationsOutlined fontSize="small" />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                
                                <Tooltip title="Account settings">
                                    <IconButton 
                                        onClick={handleOpenUserMenu} 
                                        sx={{ 
                                            p: 0,
                                            border: "2px solid #e0f2f1",
                                            "&:hover": { border: "2px solid #00897b" },
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        <Avatar
                                            sx={{ 
                                                bgcolor: "#00897b",
                                                width: 34, 
                                                height: 34,
                                                fontSize: "0.9rem",
                                                fontWeight: 600
                                            }}
                                            alt={user?.username || "User"}
                                            src={user?.avatar || undefined}
                                        >
                                            {(user?.username || "U")[0].toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: {
                                            borderRadius: "8px",
                                            overflow: "hidden"
                                        }
                                    }}
                                >
                                    <Box sx={{ py: 1.5, px: 2, minWidth: 200 }}>
                                        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
                                            {user?.username || "User"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {user?.email}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "inline-block",
                                                color: "#fff",
                                                bgcolor: isRecycler ? "#ffb300" : "#00897b",
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 1,
                                                fontWeight: 500,
                                                letterSpacing: "0.02em"
                                            }}
                                        >
                                            {isRecycler ? "Recycler" : "User"}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    {userMenuItems.map((item) => (
                                        <MenuItem 
                                            key={item.title} 
                                            onClick={item.onClick}
                                            sx={{ 
                                                py: 1.5,
                                                "&:hover": { 
                                                    backgroundColor: item.title === "Logout" ? "#ffebee" : "#e0f2f1" 
                                                },
                                                color: item.title === "Logout" ? "#d32f2f" : "inherit"
                                            }}
                                        >
                                            <Typography 
                                                textAlign="center"
                                                sx={{ fontWeight: 500 }}
                                            >
                                                {item.title}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer menu */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "270px", // Slightly reduced width
                        maxWidth: "80%",
                        boxSizing: "border-box",
                        borderRadius: "0 12px 12px 0",
                    },
                }}
                PaperProps={{
                    sx: {
                        boxShadow: "3px 0 15px rgba(0,0,0,0.08)"  
                    }
                }}
            >
                <Box sx={{ 
                    p: 2, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    borderBottom: "1px solid #f0f0f0"
                }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                            src="/images/logo.jpg"
                            alt="E-Waste Management"
                            height="28"
                            style={{ marginRight: "10px", borderRadius: "4px" }}
                        />
                        <Typography variant="subtitle1" sx={{ color: "#00897b", fontWeight: "600" }}>
                            Menu
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={() => setMobileMenuOpen(false)}
                        size="small"
                        sx={{
                            backgroundColor: "#f5f5f5",
                            "&:hover": { backgroundColor: "#e0f2f1" }
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>
                
                <List sx={{ p: 1.5 }}>
                    {menuItems.map((item) => (
                        <ListItem
                            component='button'
                            key={item.title}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                backgroundColor: isActive(item.path) ? "#e0f2f1" : "transparent",
                                borderRadius: "8px",
                                mb: 0.75,
                                "&:hover": { backgroundColor: "#f1f8e9" },
                                ...(item.highlight && {
                                    color: "#00897b",
                                    fontWeight: "bold",
                                }),
                            }}
                        >
                            <ListItemIcon 
                                sx={{ 
                                    color: isActive(item.path) ? "#00897b" : "#555",
                                    minWidth: "36px"
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    fontWeight: isActive(item.path) || item.highlight ? 600 : 400,
                                    fontSize: "0.95rem",
                                    color: isActive(item.path) ? "#00897b" : item.highlight ? "#00897b" : "inherit"
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                {isAuthenticated && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ 
                            p: 2, 
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            mx: 2,
                            mb: 2
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                    sx={{ 
                                        bgcolor: "#00897b", 
                                        width: 36, 
                                        height: 36, 
                                        mr: 2,
                                        fontSize: "0.9rem",
                                        fontWeight: 600 
                                    }}
                                    alt={user?.username || "User"}
                                >
                                    {(user?.username || "U")[0].toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">{user?.username}</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "#fff",
                                                bgcolor: isRecycler ? "#ffb300" : "#00897b",
                                                px: 0.75,
                                                py: 0.2,
                                                borderRadius: 1,
                                                fontSize: "0.65rem",
                                                fontWeight: 500
                                            }}
                                        >
                                            {isRecycler ? "RECYCLER" : "USER"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleLogout}
                                size="small"
                                startIcon={<Logout fontSize="small" />}
                                sx={{ 
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </>
                )}
            </Drawer>

            {/* Toolbar spacer to prevent content from going under the AppBar */}
            <Box sx={{ minHeight: "64px" }} /> {/* Adjusted to match the new navbar height */}
        </>
    );
};

export default ResponsiveNavbar;