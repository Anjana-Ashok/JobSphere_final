                                                                                                                                                                                                                                                import React from "react";
import "../css/WelcomePage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import log from '../assets/orangelogo.png'


const WelcomePage = () => {
  return (
    <>
      <div className="WelcomePage-container">
        {/* Navbar */}
        <header className="navbar">
          <div className="logo">
            <img src={log} alt="JobSphere Logo"
              style={{ width: 90, height: 90 }} />
            <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
          </div>
          <nav className="nav-links">

            <Link to={'/'}><a href="#WelcomePage">Home</a></Link>


            <Link to={'/aboutus'}><a href="#price-sheet">About us</a></Link>


            <Link to={'/login'}> <a href="#about-us">Join</a></Link>
          </nav>

        </header>


        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Find Your Next Job Here</h1>
            <h2>We are a Community focused on growth</h2><br></br>
            <Link to={'/home'}><button className="cta-button">Start Here</button></Link>
            
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default WelcomePage;