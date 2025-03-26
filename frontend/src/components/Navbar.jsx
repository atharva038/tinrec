import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./Navbar.css"; // Custom CSS file for extra styling

const CustomNavbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const isRecycler = user?.role === "recycler"; // Assuming role is stored in user object

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                
                <Navbar.Brand as={Link} to="/" className="brand-title">
                    <img
                        src="/images/logo.jpg"
                        alt="E-Waste Management"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    E-Waste Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>

                        {!isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/signup" className="nav-link">Signup</Nav.Link>
                                <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/dashboard/user" className="nav-link">Dashboard</Nav.Link>

                                {/* ✅ Show "Register Pickup" only for non-recycler users */}
                                {!isRecycler && (
                                    <Button
                                        as={Link}
                                        to="/submit-ewaste"
                                        className="register-pickup-btn">
                                        📦 Register Pickup
                                    </Button>
                                )}

                                <Button onClick={handleLogout} className="logout-btn">Logout</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
