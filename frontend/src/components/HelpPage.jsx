// import React from 'react';
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import {
//   ExpandMore as ExpandMoreIcon,
// } from '@mui/icons-material';

// import "../css/HelpPage.css"; // Custom CSS
// import TopNavbar from '../pages/Recruiter/TopNavbar';
// import SideNavbar from '../pages/Recruiter/SideNavbar';

// const HelpPage = () => {
//   const faqs = [
//     {
//       question: "How do I create an account?",
//       answer: "Click the Sign Up button on the homepage and fill in the required details to create an account.",
//     },
//     {
//       question: "How do I reset my password?",
//       answer: "Go to the login page and click on 'Forgot Password' to receive a password reset link.",
//     },
//     {
//       question: "How do I post a job as a recruiter?",
//       answer: "Log in to your recruiter account, navigate to 'Posted Jobs', and click the 'Add Job' button.",
//     },
//     {
//       question: "Can I edit my profile information?",
//       answer: "Yes, you can edit your profile by navigating to the 'Profile' section and clicking the 'Edit' button.",
//     },
//     {
//       question: "How do I contact support?",
//       answer: "You can reach out to our support team through the 'Contact' section on the website.",
//     },
//   ];

//   return (
//     <Box className="main-container">
//       {/* Fixed Top Navbar */}
//       <TopNavbar />

//       {/* Sidebar and Content Layout */}
//       <Box className="layout-container">
//         {/* Sidebar */}
//         <SideNavbar />

//         {/* Help Page Content */}
//         <Box className="content-container">
//           <Box className="faq-container">
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               textAlign="center"
//               className="faq-title"
//             >
//               Welcome to JobSphere Help Center
//             </Typography>
//             <Typography variant="body1" textAlign="center" className="faq-subtitle">
//               Get answers to frequently asked questions or contact us for assistance.
//             </Typography>

//             {faqs.map((faq, index) => (
//               <Accordion key={index} className="faq-item">
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
//                   <Typography>{faq.question}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography>{faq.answer}</Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}

//             <Box className="contact-box">
//               <Typography variant="h6" className="contact-title">
//                 Need further assistance?
//               </Typography>
//               <Typography variant="body2">
//                 If your query is not listed here, feel free to contact our support team at{' '}
//                 <a href="mailto:support@jobsphere.com" className="contact-link">
//                   support@jobsphere.com
//                 </a>.
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HelpPage;