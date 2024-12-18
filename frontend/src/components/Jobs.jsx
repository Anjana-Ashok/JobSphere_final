import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterCard from "./FilterCard";
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
    <Box>
      {/* Navbar */}
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {/* Filter Sidebar */}
          {/* <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <FilterCard />
            </Paper>
          </Grid> */}

          {/* Job Listings */}
          <Grid item xs={12} md={9}>
            {filterJobs.length <= 0 ? (
              <Typography variant="h6" color="textSecondary">
                Job not found
              </Typography>
            ) : (
              <Box
                sx={{
                  height: "88vh",
                  overflowY: "auto",
                  pb: 5,
                }}
              >
                <Grid container spacing={3}>
                  {filterJobs.map((job) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
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
        </Grid>
      </Container>
    </Box>
  );
};

export default Jobs;
