import instagram_icon from '../assets/insta.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import footerlog from '../assets/orangelogo2.png';
import twitter from '../assets/twitter.png';

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#ffff",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const logoSection = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const logoImg = {
    height: "150px",
    width: "150px",
    marginBottom: "10px",
  };

  const footerLinks = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    textAlign: "center",
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
    gap: "15px",
  };

  const iconImg = {
    width: "24px",
    height: "24px",
  };

  const copyright = {
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center",
  };

  return (
    <footer style={footerStyle}>
      <div style={logoSection}>
        <img
          src={footerlog}
          alt="Footer Logo"
          style={logoImg}
        />
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
        &copy;2024 Job Portal. All Rights Reserved. Powered By UltraByte
        International Pvt. Ltd
      </p>
    </footer>
  );
};

export default Footer;