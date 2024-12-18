import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
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
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
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
        <div>
            <Navbar />
            <Box maxWidth="sm" mx="auto" my={4}>
                <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={() => navigate('/admin/companies')}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold">
                        Company Setup
                    </Typography>
                </Box>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Company Name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Website"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Location"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
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
                                <Typography variant="body2" mt={1}>
                                    {input.file.name}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        {loading ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled
                                startIcon={
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                }
                            >
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
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
