import { Link } from 'react-router-dom'; 
import '../css/About.css';
import Footer from './Footer';
import log from '../assets/orangelogo.png'
import "../css/WelcomePage.css";
const About = () => {
  return (
    <div className="about-us-container">
      <header className="navbar">
          <div className="logo">
            <img src={log} alt="JobSphere Logo"
              style={{ width: 90, height: 90 }} />
            <span style={{ fontWeight: 600, fontSize: 25 }}>JobSphere</span>
          </div>
          <nav className="nav-links">

            <Link to={'/home'}><a href="#home">Home</a></Link>


            <Link to={'/aboutus'}><a href="#price-sheet">About us</a></Link>


            <Link to={'/login'}> <a href="#about-us">Join</a></Link>
          </nav>

        </header><br></br>  
      {/* Header */}
      <br></br>
      <header className="about-us-header">
        <h1>Welcome to JobSphere</h1>
        <p>Your Gateway to Career Success</p>
      </header>

      {/* Main Content Section */}
      <section className="about-us-content">
        <div className="card-container">
          {/* Our Story Card */}
          <div className="card">
            <h3>Our Story</h3>
            <p style={{ textAlign: "justify" }}>
              At JobSphere, we understand the importance of finding the right job and the right talent. We have created a platform that helps job seekers and employers connect in the most seamless and efficient way possible. Our goal is to empower individuals with the resources and tools they need to take the next step in their careers while helping businesses build strong teams.
            </p>
          </div>

          {/* Our Vision Card */}
          <div className="card">
            <h3>Our Vision</h3>
            <p style={{ textAlign: "justify" }}>
              We envision a world where finding a job is as simple as a few clicks. JobSphere strives to become the leading job portal, offering innovative solutions to bridge the gap between employers and job seekers, fostering professional growth for individuals and helping businesses thrive through exceptional talent.
            </p>
          </div>

          {/* Our Values Card */}
          <div className="card">
            <h3>Our Values</h3>
            <p style={{ textAlign: "justify" }}>
              We are committed to integrity, innovation, and excellence in all we do. At JobSphere, we believe in creating a culture of respect and opportunity, helping both individuals and businesses achieve their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <h3>Our Mission</h3>
        <p style={{ textAlign: "justify" }}>
          Our mission is simple: to make the job search and hiring process easier, faster, and more effective for everyone. We believe that the right job can change lives, and we are here to help make that connection.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;