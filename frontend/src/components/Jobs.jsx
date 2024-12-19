// jobs.jsx



import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Box, Grid, Typography, Container, Paper } from "@mui/material";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh", // Ensure the page takes up the full height
      }}
    >
      {/* Navbar */}
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 5 }}>
       

          {/* Job Listings */}
          <Grid item xs={13} md={9}>
            {filterJobs.length <= 0 ? (
              <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>
                Job not found
              </Typography>
            ) : (
              <Box
                sx={{
                  height: "auto",
                  overflowY: "auto",
                  pb: 7,
                }}
              >
                <Grid container spacing={3}>
                  {filterJobs.map((job) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={job?._id}
                      component={motion.div}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
    
      </Container>
    </Box>
  );
};

export default Jobs;