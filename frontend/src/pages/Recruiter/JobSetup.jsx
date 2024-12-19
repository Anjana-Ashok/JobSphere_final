import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetJobById from '../../hooks/useGetJobById';
import { JOB_API_END_POINT } from '../../utils/constant';

// Material-UI imports
import { TextField, Button, CircularProgress, Box, Typography, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JobSetup = () => {
    const params = useParams();
    useGetJobById(params.id); // Custom hook to fetch job details
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
    });
    const { singleJob } = useSelector((store) => store.job); // Redux selector for the job
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements?.join(", ") || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || "",
            });
        }
    }, [singleJob]);
    
    if (!singleJob || Object.keys(singleJob).length === 0) {

    return (
        <div>
            <Navbar />
            <Box sx={{ maxWidth: '600px', margin: '40px auto' }}>
                <form onSubmit={submitHandler}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                        <Button
                            onClick={() => navigate("/admin/jobs")}
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            sx={{ fontWeight: 600 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h5" fontWeight="bold">
                            Job Setup
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Requirements (comma-separated)"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Salary"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Job Type"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Experience Level"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="Vacancy"
                                value={input.position}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4 }}>
                        {loading ? (
                            <Button
                                fullWidth
                                variant="contained"
                                disabled
                                startIcon={<CircularProgress size={20} />}
                            >
                                Please wait...
                            </Button>
                        ) : (
                            <Button fullWidth variant="contained" type="submit">
                                Update Job
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </div>
    );
}};

export default JobSetup;
