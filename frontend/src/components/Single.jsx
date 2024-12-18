// import React from "react";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { Card, CardContent, Typography, Button, Modal, Box } from "@mui/material";

// const Single = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { job } = location.state || {}; // Retrieve the job object passed via state

//   const styles = {
//     modalContainer: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     card: {
//       background: "#ffffff", // White card background
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Soft shadow
//       borderRadius: "8px",
//       maxWidth: "700px",
//       width: "90%",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     header: {
//       color: "#003399",
//       fontWeight: "bold",
//       marginBottom: "16px",
//     },
//     subtitle: {
//       color: "#666666", // Subtle gray for subtitles
//       marginBottom: "16px",
//     },
//     details: {
//       lineHeight: "1.6",
//       marginBottom: "20px",
//       fontSize: "16px",
//       color: "#333333", // Standard text color
//     },
//     backButton: {
//       backgroundColor: "#003399", 
//       color: "#ffffff",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "5px",
//       textTransform: "uppercase",
//       fontWeight: "bold",
//       cursor: "pointer",
//       textDecoration: "none",
//       display: "inline-block",
//       textAlign: "center",
//       marginTop: "20px",
//     },
//     noJobMessage: {
//       textAlign: "center",
//       color: "#ff0000",
//       fontWeight: "bold",
//       margin: "20px",
//     },
//   };

//   if (!job) {
//     return (
//       <Modal open={true} onClose={() => navigate("/search")} style={styles.modalContainer}>
//         <Box style={styles.card}>
//           <Typography variant="h6" style={styles.noJobMessage}>
//             No job details found!
//           </Typography>
//           <Button onClick={() => navigate("/search")} style={styles.backButton}>
//             Go Back
//           </Button>
//         </Box>
//       </Modal>
//     );
//   }

//   return (
//     <Modal open={true} onClose={() => navigate("/search")} style={styles.modalContainer}>
//       <Box style={styles.card}>
//         <CardContent>
//           <Typography variant="h4" style={styles.header} gutterBottom>
//             {job.jobTitle}
//           </Typography>
//           <Typography variant="h6" style={styles.subtitle}>
//             Company: {job.companyName}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Location: {job.location || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Category: {job.category || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Job Description: {job.description || "No description available"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Salary Range:{" "}
//             {job.salaryRange
//               ? Min: $${job.salaryRange.min} - Max: $${job.salaryRange.max}
//               : "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Skills Required: {job.skillsRequired || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Requirements: {job.requirements || "Not specified"}
//           </Typography>
//           <Typography variant="body1" style={styles.details}>
//             Application Deadline: {job.applicationDeadline || "Not specified"}
//           </Typography>
//         </CardContent>
//         <Button onClick={() => navigate("/search")} style={styles.backButton}>
//           Apply
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default Single;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SkillIcon from "@mui/icons-material/BuildCircle";
import DeadlineIcon from "@mui/icons-material/EventAvailable";

const Single = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {}; // Retrieve the job object passed via state

  const styles = {
    modalContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    card: {
      background: "#f9f9f9",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      borderRadius: "16px",
      maxWidth: "700px",
      width: "100%",
      padding: "24px",
      fontFamily: "Verdana, sans-serif",
    },
    header: {
      color: "#E07B39",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "16px",
    },
    details: {
      lineHeight: "1.8",
      fontSize: "16px",
      color: "#444",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "12px",
    },
    backButton: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      textTransform: "uppercase",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "20px",
      textAlign: "center",
    },
    noJobMessage: {
      textAlign: "center",
      color: "#d32f2f",
      fontWeight: "bold",
      margin: "20px",
    },
  };

  if (!job) {
    return (
      <Modal
        open={true}
        onClose={() => navigate("/search")}
        aria-labelledby="no-job-modal"
        aria-describedby="no-job-description"
        sx={styles.modalContainer}
      >
        <Box sx={styles.card}>
          <Typography id="no-job-modal" variant="h6" sx={styles.noJobMessage}>
            No job details found!
          </Typography>
          <Button onClick={() => navigate("/home")} sx={styles.backButton}>
            Go Back
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={true}
      onClose={() => navigate("/search")}
      aria-labelledby="job-details-modal"
      aria-describedby="job-details-description"
      sx={styles.modalContainer}
    >
      <Box sx={styles.card}>
        <CardContent>
          <Typography id="job-details-modal" variant="h4" sx={styles.header}>
            <WorkIcon /> {job.jobTitle}
          </Typography>
          <Divider sx={{ marginBottom: "16px" }} />
          <Typography variant="body1" sx={styles.details}>
            <WorkIcon /> Company: {job.companyName}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <LocationOnIcon /> Location: {job.location || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <CategoryIcon /> Category: {job.category || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <DescriptionIcon /> Job Description: {job.description || "No description available"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <AttachMoneyIcon /> Salary Range: {job.salaryRange ? `Min: $${job.salaryRange.min} - Max: $${job.salaryRange.max}` : "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <SkillIcon /> Skills Required: {job.skillsRequired || "Not specified"}
          </Typography>
          <Typography variant="body1" sx={styles.details}>
            <DeadlineIcon /> Application Deadline: {job.applicationDeadline || "Not specified"}
          </Typography>
        </CardContent>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button onClick={() => navigate("/home")} sx={styles.backButton}>
            Back
          </Button>
          <Button
            onClick={() => navigate("/home", { state: { job } })}
            sx={{ ...styles.backButton, backgroundColor: "#4caf50" }}
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Single;
