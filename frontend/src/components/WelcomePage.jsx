                                                                                                                                                                                                                                                import React from "react";
import "../css/WelcomePage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import log from '../assets/orangelogo.png'
import Navbar from "./Navbar";


const WelcomePage = () => {
  return (
    <>
      <div className="WelcomePage-container">
        {/* Navbar */}
<Navbar/>

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