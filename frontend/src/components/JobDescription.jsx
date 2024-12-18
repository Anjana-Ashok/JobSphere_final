import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Typography,
} from '@mui/material';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <Paper sx={{ maxWidth: 1200, mx: 'auto', my: 4, p: 4 }}>
            <Grid container justifyContent="space-between" alignItems="flex-start" mb={4}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                        {singleJob?.title}
                    </Typography>
                    <Box mt={2} display="flex" gap={2}>
                        <Chip label={`${singleJob?.position} Positions`} color="primary" variant="outlined" />
                        <Chip label={singleJob?.jobType} color="error" variant="outlined" />
                        <Chip label={`${singleJob?.salary} LPA`} color="secondary" variant="outlined" />
                    </Box>
                </Box>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    variant="contained"
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        bgcolor: isApplied ? 'grey.400' : 'purple.600',
                        '&:hover': {
                            bgcolor: isApplied ? 'grey.400' : 'purple.700',
                        },
                        cursor: isApplied ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </Grid>

            <Typography variant="h6" borderBottom={2} borderColor="grey.300" pb={2} mb={3}>
                Job Details
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <Typography>
                    <strong>Role:</strong> <span>{singleJob?.title}</span>
                </Typography>
                <Typography>
                    <strong>Location:</strong> <span>{singleJob?.location}</span>
                </Typography>
                <Typography>
                    <strong>Description:</strong> <span>{singleJob?.description}</span>
                </Typography>
                <Typography>
                    <strong>Experience:</strong> <span>{singleJob?.experience} years</span>
                </Typography>
                <Typography>
                    <strong>Salary:</strong> <span>{singleJob?.salary} LPA</span>
                </Typography>
                <Typography>
                    <strong>Total Applicants:</strong> <span>{singleJob?.applications?.length}</span>
                </Typography>
                <Typography>
                    <strong>Posted Date:</strong> <span>{new Date(singleJob?.createdAt).toLocaleDateString()}</span>
                </Typography>
            </Box>
        </Paper>
    );
};

export default JobDescription;
