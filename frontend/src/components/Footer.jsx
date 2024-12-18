
import instagram_icon from '../assets/insta.png'
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import footerlog from '../assets/orangelogo2.png'
import twitter from '../assets/twitter.png'


import { width } from "@mui/system";
const Footer = () => {
  const footerStyle = {
    backgroundColor: "#ffff",
    padding: "40px 0px 20px 90px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const logoSection = {
    textAlign: "center",
    marginBottom: "0px",
  };

  const logoImg = {
    height:"170px",
    width:"170px",
    marginBottom: "10px",
  };

  const contactInfo = {
    lineHeight: "1.8",
  };

  const footerLinks = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    textAlign: "left",
    marginTop: "30px",
  };

  const linkGroup = {
    listStyle: "none",
    padding: "0",
    margin: "0",
  };

  const link = {
    textDecoration: "none",
    color: "#333",
    marginBottom: "10px",
    display: "block",
  };

  const socialIcons = {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  };

  const iconImg = {
    width: "24px",
    height: "24px",
  };

  const copyright = {
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: "20px"
  };

  const avatarRow = {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  };

  const avatarImg = {
    width: "200px",
    borderRadius: "50%",
  };

  return (
    <footer style={footerStyle}>
      <div style={logoSection}>
        <img
          src={footerlog}
          alt="Gorilla Logo"
          style={logoImg}
        />
        {/* <p style={contactInfo}>
          +977-9812345678 <br />
          Maitidevi, Kathmandu <br />
          info@gorillaeducation.com
        </p> */}
      </div> 

      <div style={footerLinks}>
        <ul style={linkGroup}>
          <li><strong>Company</strong></li>
          <li><a href="#about" style={link}>About Us</a></li>
          <li><a href="#process" style={link}>Our Process</a></li>
          <li><a href="#contact" style={link}>Contact</a></li>
        </ul>
        <ul style={linkGroup}>
          <li><strong>Find a Job</strong></li>
          <li><a href="#account" style={link}>Account</a></li>
          <li><a href="#search" style={link}>Start Searching</a></li>
          <li><a href="#skills" style={link}>Skill Assessment</a></li>
        </ul>
        <ul style={linkGroup}>
          <li><strong>Post a Job</strong></li>
          <li><a href="#posting" style={link}>Start Posting</a></li>
          <li><a href="#candidates" style={link}>Shortlist Candidates</a></li>
          <li><a href="#team" style={link}>Gather Your Team</a></li>
        </ul>
        <ul style={linkGroup}>
          <li><strong>Community</strong></li>
          <li><a href="#blogs" style={link}>Blogs</a></li>
          <li><a href="#faq" style={link}>FAQ</a></li>
        </ul>
        <ul style={linkGroup}>
          <li><strong>Resources</strong></li>
          <li><a href="#privacy" style={link}>Privacy Policy</a></li>
          <li><a href="#terms" style={link}>Terms of Use</a></li>
          <li><a href="#disclaimer" style={link}>Disclaimer</a></li>
        </ul>
      </div>

      <div style={socialIcons}>
     
        <img src={instagram_icon} alt="Instagram" style={iconImg} />
        <img src={facebook} alt="Facebook" style={iconImg} />
        <img src={google} alt="Google" style={iconImg} />
        <img src={twitter} alt="Twitter" style={iconImg} />
    
      </div>

      <p style={copyright}>
        ©2024 Job Portal. All Rights Reserved. Powered By UltraByte
        International Pvt. Ltd
      </p>

      {/* <div style={avatarRow}>
        <img src={avatar1} alt="Avatar 1" style={avatarImg} />
        <img src="/path-to-avatar2.png" alt="Avatar 2" style={avatarImg} />
        <img src="/path-to-avatar3.png" alt="Avatar 3" style={avatarImg} />
        <img src="/path-to-avatar4.png" alt="Avatar 4" style={avatarImg} />
        <img src="/path-to-avatar5.png" alt="Avatar 5" style={avatarImg} />
        
      </div> */}
      
    </footer>
  );
};

export default Footer;