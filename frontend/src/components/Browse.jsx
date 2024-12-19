import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { Box, Container, Grid, Typography } from '@mui/material';

const Browse = () => {
    useGetAllJobs();   // Fetches all jobs from the server when the component is rendered.
    const { allJobs } = useSelector(store => store.job);  // Accessing the list of all jobs from the Redux store.
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <Box>
            <Navbar />
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ my: 3 }}>
                    Search Results ({allJobs.length})
                </Typography>
                <Grid container spacing={3}>  {/* Grid container for arranging job cards */}
                    {allJobs.map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <Job job={job} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Browse;
