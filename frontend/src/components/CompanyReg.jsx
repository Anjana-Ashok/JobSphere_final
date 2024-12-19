

import React, { useEffect, useState } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, CircularProgress, Typography, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../redux/authSlice";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));  // Preparing the form data for submission, including the file if uploaded.
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
                // Sends a POST request to register the user with all form data.
            });
            if (res.data.success) {
                navigate("/login");   // Navigates to the login page on successful registration.
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <Box
            className="flex items-center justify-center min-h-screen bg-gray-50"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
                height: "100vh",
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    padding: 3, // Reduced padding to minimize form height
                    borderRadius: 3,
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3} color="black">
                    Create Your Account
                </Typography>
                <form onSubmit={submitHandler}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            type="email"
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            type="tel"
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            type="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            required
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Role
                        </Typography>
                        <RadioGroup
                            name="role"
                            value={input.role}
                            onChange={changeEventHandler}
                            row
                        >
                            <FormControlLabel value="student" control={<Radio />} label="Seeker" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Profile Picture
                        </Typography>
                        <input
                            accept="image/*"
                            type="file"
                            id="profile"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        {loading ? (
                            <Button variant="contained" fullWidth disabled>
                                <CircularProgress size={20} />
                                <span className="ml-2">Signing up...</span>
                            </Button>
                        ) : (
                            <Button sx={{background: 'linear-gradient(to right,rgb(5, 3, 0),rgb(7, 5, 3))', color:'white'}} type="submit" fullWidth size="large">
                                Create Account
                            </Button>
                        )}
                    </Box>
                    <Typography className="text-center mt-3 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline" >
                            Login
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Signup;