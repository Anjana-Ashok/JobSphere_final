import React, { useEffect, useState } from 'react';

import { TextField, Button, RadioGroup, FormControlLabel, Radio, CircularProgress } from '@mui/material';
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

    const { loading, user } = useSelector(store => store.auth);
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
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
        <div>
            
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                    />
                    
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                    
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                    />
                    
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        type="password"
                        value={input.password}
                        onChange={changeEventHandler}
                    />
                    
                    <RadioGroup
                        name="role"
                        value={input.role}
                        onChange={changeEventHandler}
                        row
                    >
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                    </RadioGroup>
                    
                    <div className="my-2">
                        <label htmlFor="profile">Profile Picture</label>
                        <input
                            accept="image/*"
                            type="file"
                            id="profile"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    
                    {loading ? (
                        <Button variant="contained" fullWidth disabled>
                            <CircularProgress size={24} />
                            Please wait
                        </Button>
                    ) : (
                        <Button variant="contained" type="submit" fullWidth>
                            Signup
                        </Button>
                    )}

                    <div className="text-center mt-4">
                        <span className="text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
