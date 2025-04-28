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
    Divider
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
    AccountCircle
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
            <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#333", boxShadow: 2 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo - always visible */}
                        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                            <img
                                src="/images/logo.jpg"
                                alt="E-Waste Management"
                                height="40"
                                style={{ marginRight: "10px" }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 700,
                                    color: "#2e7d32",
                                    textDecoration: "none",
                                }}
                            >
                                E-Waste Management
                            </Typography>
                        </Box>

                        {/* Mobile menu icon */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => setMobileMenuOpen(true)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Mobile title */}
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                                fontWeight: 700,
                                color: "#2e7d32",
                                textDecoration: "none",
                            }}
                        >
                            E-Waste
                        </Typography>

                        {/* Desktop navigation links */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {menuItems.map((item) => (
                                <Button
                                    key={item.title}
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        my: 2,
                                        mx: 1,
                                        color: isActive(item.path) ? "#fff" : "#555",
                                        backgroundColor: isActive(item.path) ? "#2e7d32" : "transparent",
                                        display: "block",
                                        "&:hover": {
                                            backgroundColor: item.highlight ? "#1b5e20" : isActive(item.path) ? "#1b5e20" : "#f5f5f5",
                                            color: item.highlight ? "#fff" : isActive(item.path) ? "#fff" : "#2e7d32",
                                        },
                                        ...(item.highlight && {
                                            backgroundColor: "#2e7d32",
                                            color: "#fff",
                                            fontWeight: "bold",
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
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar
                                            sx={{ bgcolor: "#2e7d32" }}
                                            alt={user.username || "User"}
                                            src={user.avatar || undefined}
                                        >
                                            {(user.username || "U")[0].toUpperCase()}
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
                                >
                                    <Box sx={{ py: 1, px: 2, minWidth: 200 }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {user.username || "User"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "inline-block",
                                                mt: 0.5,
                                                color: "#fff",
                                                bgcolor: isRecycler ? "#ff9800" : "#2e7d32",
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 1
                                            }}
                                        >
                                            {isRecycler ? "Recycler" : "User"}
                                        </Typography>
                                    </Box>
                                    <Divider />
                                    {userMenuItems.map((item) => (
                                        <MenuItem key={item.title} onClick={item.onClick}>
                                            <Typography textAlign="center">{item.title}</Typography>
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
                        width: "70%",
                        maxWidth: "300px",
                        boxSizing: "border-box",
                    },
                }}
            >
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                        Menu
                    </Typography>
                    <IconButton onClick={() => setMobileMenuOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.title}
                            onClick={() => handleNavigation(item.path)}
                            sx={{
                                backgroundColor: isActive(item.path) ? "#e8f5e9" : "transparent",
                                "&:hover": { backgroundColor: "#f1f8e9" },
                                ...(item.highlight && {
                                    color: "#2e7d32",
                                    fontWeight: "bold",
                                }),
                            }}
                        >
                            <ListItemIcon sx={{ color: isActive(item.path) ? "#2e7d32" : "#555" }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    fontWeight: isActive(item.path) ? "bold" : "regular",
                                    color: isActive(item.path) ? "#2e7d32" : "inherit"
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                {isAuthenticated && (
                    <>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                    sx={{ bgcolor: "#2e7d32", width: 36, height: 36, mr: 2 }}
                                    alt={user.username || "User"}
                                >
                                    {(user.username || "U")[0].toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">{user.username}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {isRecycler ? "Recycler Account" : "User Account"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleLogout}
                                startIcon={<Logout />}
                            >
                                Logout
                            </Button>
                        </Box>
                    </>
                )}
            </Drawer>

            {/* Toolbar spacer to prevent content from going under the AppBar */}
            <Toolbar />
        </>
    );
};

export default ResponsiveNavbar;