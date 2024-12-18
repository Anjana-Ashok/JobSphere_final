import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid } from '@mui/material';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <Box maxWidth="lg" mx="auto" py={8} px={2}>
            <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                align="center"
                mb={4}
            >
                <Box component="span" color="primary.main">
                    Latest & Top
                </Box>{' '}
                Job Openings
            </Typography>

            <Grid container spacing={4}>
                {allJobs.length <= 0 ? (
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            variant="h6"
                            color="text.secondary"
                        >
                            No Jobs Available
                        </Typography>
                    </Grid>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <LatestJobCards job={job} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default LatestJobs;

