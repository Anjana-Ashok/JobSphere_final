import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Navbar />
            <Box display="flex" justifyContent="center" my={5}>
                <form onSubmit={submitHandler} style={{ width: '100%', maxWidth: '800px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Requirements"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Salary"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Job Type"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Experience Level"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="No of Vacancy"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </Grid>

                        {
                            companies.length > 0 && (
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Company</InputLabel>
                                        <Select
                                            value={input.companyId}
                                            onChange={(e) => selectChangeHandler(e.target.value)}
                                        >
                                            {companies.map((company) => (
                                                <MenuItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )
                        }
                    </Grid>

                    {
                        loading ? (
                            <Button fullWidth variant="contained" disabled sx={{ mt: 3 }}>
                                <CircularProgress size={24} sx={{ mr: 2 }} /> Please wait
                            </Button>
                        ) : (
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
                                Post New Job
                            </Button>
                        )
                    }

                    {
                        companies.length === 0 && (
                            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                                *Please register a company first, before posting jobs
                            </Typography>
                        )
                    }
                </form>
            </Box>
        </Box>
    );
};

export default PostJob;
