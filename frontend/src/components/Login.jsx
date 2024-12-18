import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Button,
    CircularProgress,
    Box,
    Typography,
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
        <div>
            {/* <Navbar /> */}
            <Box display="flex" justifyContent="center" alignItems="center" my={10}>
                <Box
                    component="form"
                    onSubmit={submitHandler}
                    sx={{
                        width: '400px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '2rem',
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" marginBottom={2}>
                        Login
                    </Typography>
                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="patel@gmail.com"
                    />
                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="Enter your password"
                    />
                    {/* Role Selection */}
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup
                            row
                            name="role"
                            value={input.role}
                            onChange={changeEventHandler}
                        >
                            <FormControlLabel
                                value="student"
                                control={<Radio />}
                                label="Student"
                            />
                            <FormControlLabel
                                value="recruiter"
                                control={<Radio />}
                                label="Recruiter"
                            />
                        </RadioGroup>
                    </FormControl>
                    {/* Submit Button */}
                    {loading ? (
                        <Button
                            fullWidth
                            variant="contained"
                            disabled
                            sx={{ marginTop: '1rem' }}
                        >
                            <CircularProgress size={24} sx={{ marginRight: '0.5rem' }} />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: '1rem' }}
                        >
                            Login
                        </Button>
                    )}
                    <Typography variant="body2" marginTop={2}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#1976D2' }}>
                            Signup
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Login;
