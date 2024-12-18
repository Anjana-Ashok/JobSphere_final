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
          <Typography variant="h6">{job?.company?.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            India
          </Typography>
        </Box>
      </Box>

      {/* Job Title and Description */}
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1 }}
          gutterBottom
        >
          {job?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
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
        >
          Details
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#7209b7",
            color: "white",
            "&:hover": { backgroundColor: "#5e0794" },
          }}
        >
          Save For Later
        </Button>
      </CardActions>
    </Card>
  );
};

export default Job;
