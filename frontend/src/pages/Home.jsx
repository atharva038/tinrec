import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles.css"; // Import custom styles
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {

    const { user } = useContext(AuthContext);
    const isAuthenticated = !!user;
    const isRecycler = user?.role === "recycler"; // Assuming role is stored in user object

    return (
        <div>
            {/* 🌱 Hero Section */}
            <section className="hero-section text-center">
                <h1 className="display-4 fw-bold">E-Waste Management</h1>
                <p className="lead">
                    Dispose of electronic waste responsibly and contribute to a greener future.
                </p>
                <div className="mt-4">
                    {!isAuthenticated ? (
                        <>
                            <Button variant="contained" color="primary" component={Link} to="/signup" className="cta-btn">Get Started</Button>
                            <Button variant="outlined" color="secondary" component={Link} to="/login" className="cta-btn">Login</Button>
                        </>
                    ) : (
                        !isRecycler && (  // ✅ Show "Register Pickup" only for normal users
                            <Button variant="contained" color="success" component={Link} to="/submit-ewaste" className="cta-btn">
                                📦 Register Pickup
                            </Button>
                        )
                    )}
                </div>
            </section>

            {/* ♻️ Why Choose Us? */}
            <section className="features-section text-center">
                <h2 className="fw-bold">Why Choose Us?</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="feature-box">
                            <img src="/images/recycle.png" alt="Recycle" />
                            <h4>Eco-Friendly Disposal</h4>
                            <p>We ensure proper recycling to reduce environmental harm.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <img src="/images/convenience.png" alt="Convenience" />
                            <h4>Easy Pickup</h4>
                            <p>Schedule an e-waste pickup from your doorstep.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="feature-box">
                            <img src="/images/reward.png" alt="Rewards" />
                            <h4>Get Rewarded</h4>
                            <p>Earn points for responsible e-waste disposal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🚀 How It Works? */}
            <section className="process-section text-center">
                <h2 className="fw-bold">How It Works?</h2>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5 col-lg-3 step">
                            <div className="step-content">
                                <div className="step-icon">📸</div>
                                <h4>Upload Details</h4>
                                <p>Fill out the form with e-waste details and upload a photo.</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-3 step">
                            <div className="step-content">
                                <div className="step-icon">📍</div>
                                <h4>Schedule Pickup</h4>
                                <p>Choose a convenient pickup date and time.</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-3 step">
                            <div className="step-content">
                                <div className="step-icon">🚛</div>
                                <h4>Recycler Assigned</h4>
                                <p>A recycler will be assigned to collect your e-waste.</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-3 step">
                            <div className="step-content">
                                <div className="step-icon">🎉</div>
                                <h4>Get Rewarded</h4>
                                <p>Earn rewards and contribute to a sustainable future.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 💬 Testimonials */}
            <section className="testimonials-section text-center">
                <h2 className="fw-bold">What Users Say</h2>
                <div className="testimonial">
                    <p>"This platform made e-waste disposal super easy! Highly recommended."</p>
                    <h5>- Rahul Sharma</h5>
                </div>
                <div className="testimonial">
                    <p>"Great initiative! Scheduling a pickup was hassle-free and smooth."</p>
                    <h5>- Priya Mehta</h5>
                </div>
            </section>


        </div>
    );
};

export default Home;
