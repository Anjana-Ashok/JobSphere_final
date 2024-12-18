import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';
import { COMPANY_API_END_POINT } from '../../utils/constant';

// Material-UI imports
import { TextField, Button, CircularProgress, Box, Typography, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <Box sx={{ maxWidth: '600px', margin: '40px auto' }}>
                <form onSubmit={submitHandler}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            sx={{ fontWeight: 600 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h5" fontWeight="bold">
                            Company Setup
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={input.website}
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
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                Upload Logo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                />
                            </Button>
                            {input.file && (
                                <Typography sx={{ mt: 1 }} variant="body2">
                                    Selected File: {input.file.name}
                                </Typography>
                            )}
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
                                Update
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </div>
    );
};

export default CompanySetup;
