import React, { useEffect, useState } from "react";
// import log from "../assets/orangelogo.png";
import {  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel"
import carouselImage from "../assets/image3.jpg"
import carouselImages from "../assets/image4.jpg"
import carouselImage1 from "../assets/image5.jpg"
// import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import LatestJobs from '../pages/Job Seeker/LatestJobs'
const Home = () => {

  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  const carouselItems = [
    {
      image: carouselImage,
      
    },
    {
      image: carouselImages,
      
    },
    {
      image: carouselImage1,
      
    },
  ];
  
  return (
    <div className="home-container">
      <Navbar/>
      <Carousel
  indicators={true}
  interval={4000}
  animation="slide"
  navButtonsAlwaysVisible={true}
  style={{ marginTop: "20px" }}
>
  {carouselItems.map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        height: "500px", // Adjust to match the height of the carousel
        backgroundImage:` url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // Make the parent container relative for absolute positioning
        paddingTop:"450px",
        paddingBottom:"200px"
      }}
    >
      {/* Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "30%", // Adjust the vertical position of the text
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black", // Text color
          textAlign: "center",
        }}
      >
       <HeroSection/>  
      </div>
     
    
    </div>
  ))}
  
</Carousel>
<LatestJobs/>    
      <Footer />
    </div>
  );
};

export default Home;