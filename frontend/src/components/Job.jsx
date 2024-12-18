
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Calculate days ago
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "white",
        border: "1px solid #f0f0f0",
        height: "100%", // Allow the card to expand to the available height
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Section: Days Ago and Bookmark */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </Typography>
        <IconButton color="primary">
          <Bookmark />
        </IconButton>
      </Box>

      {/* Company Information */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Avatar
          alt={job?.company?.name}
          src={job?.company?.logo}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for responsiveness
              textAlign: "left", // Ensure alignment is left for consistency
            }}
          >
            {job?.company?.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "1rem" },
              textAlign: "left", // Ensure alignment is left for consistency
            }}
          >
            India
          </Typography>
        </Box>
      </Box>

      {/* Job Title and Description */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            textAlign: "left", // Ensure alignment is left for consistency
          }}
          gutterBottom
        >
          {job?.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: { xs: "0.85rem", sm: "1rem" },
            textAlign: "left", // Ensure alignment is left for consistency
          }}
        >
          {job?.description}
        </Typography>
      </CardContent>

      {/* Badges */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          mt: 2,
          justifyContent: "flex-start", // Align badges consistently to the left
        }}
      >
        <Chip
          label={`${job?.position} Positions`}
          sx={{ color: "blue", fontWeight: "bold" }}
          variant="outlined"
        />
        <Chip
          label={job?.jobType}
          sx={{ color: "#F83002", fontWeight: "bold" }}
          variant="outlined"
        />
        <Chip
          label={`${job?.salary} LPA`}
          sx={{ color: "#7209b7", fontWeight: "bold" }}
          variant="outlined"
        />
      </Box>

      {/* Actions */}
      <CardActions sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(`/description/${job?._id}`)}
          sx={{ width: { xs: "100%", sm: "auto" } }} // Full width on small screens
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Job;