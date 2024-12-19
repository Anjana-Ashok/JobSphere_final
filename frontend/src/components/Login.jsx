// login.jsx

import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    Typography,
    Box,
    Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/home');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    return (
        <Box
            className="flex items-center justify-center min-h-screen bg-gray-50"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                height: '100vh',
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    padding: 3, // Matches the padding with Signup
                    borderRadius: 3,
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3} color="black">
                    Welcome Back!
                </Typography>
                <form onSubmit={submitHandler}>
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
                            <FormControlLabel value="student" control={<Radio />} label="seeker" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        {loading ? (
                            <Button variant="contained" fullWidth disabled>
                                <CircularProgress size={20} />
                                <span className="ml-2">Logging in...</span>
                            </Button>
                        ) : (
                            <Button
                                sx={{ background: 'linear-gradient(to right, rgb(5, 3, 0), rgb(7, 5, 3))', color: 'white' }}
                                type="submit"
                                fullWidth
                                size="large"
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                    <Typography className="text-center mt-3 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Signup
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;