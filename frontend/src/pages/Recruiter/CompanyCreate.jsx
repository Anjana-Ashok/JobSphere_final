import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Box, Typography, TextField, Button, Stack, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                 withCredentials:true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create company. Please try again.");
        }
    };

    return (
        <Box>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Navbar />
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box maxWidth="md" mx="auto" my={6} px={2}>
                {/* Heading */}
                <Box my={4}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Your Company Name
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        What would you like to give your company name? You can change this later.
                    </Typography>
                </Box>

                {/* Input */}
                <TextField
                    fullWidth
                    label="Company Name"
                    variant="outlined"
                    margin="normal"
                    placeholder="JobHunt, Microsoft, etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                {/* Buttons */}
                <Stack direction="row" spacing={2} mt={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/admin/companies')}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={registerNewCompany}>
                        Continue
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default CompanyCreate;
