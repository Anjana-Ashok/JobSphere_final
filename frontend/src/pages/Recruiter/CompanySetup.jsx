import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button, Box, Typography, Grid, TextField, CircularProgress } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
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
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
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
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || '',
            description: singleCompany.description || '',
            website: singleCompany.website || '',
            location: singleCompany.location || '',
            file: singleCompany.file || null,
        });
    }, [singleCompany]);

    return (
        <Box>
            <Navbar />
            <Box maxWidth="md" mx="auto" my={6}>
                <form onSubmit={submitHandler}>
                    <Box display="flex" alignItems="center" gap={2} p={3}>
                        <Button
                            onClick={() => navigate('/admin/companies')}
                            variant="outlined"
                            color="secondary"
                            startIcon={<ArrowLeft />}
                        >
                            Back
                        </Button>
                        <Typography variant="h6" fontWeight="bold">
                            Company Setup
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
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
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button variant="outlined" component="span">
                                    Upload Logo
                                </Button>
                            </label>
                        </Grid>
                    </Grid>

                    <Box mt={3}>
                        {loading ? (
                            <Button fullWidth variant="contained" disabled>
                                <CircularProgress size={24} sx={{ marginRight: 2 }} /> Please wait...
                            </Button>
                        ) : (
                            <Button fullWidth type="submit" variant="contained">
                                Update
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default CompanySetup;
