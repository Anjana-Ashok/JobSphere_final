import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Update Profile</DialogTitle>
            <form onSubmit={submitHandler}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Full Name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            fullWidth
                        />
                        <TextField
                            label="Bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <TextField
                            label="Skills (comma-separated)"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            fullWidth
                        />
                        <Box>
                            <Typography variant="body1" fontWeight="bold">
                                Resume
                            </Typography>
                            <Button variant="outlined" component="label" fullWidth>
                                Upload Resume
                                <input
                                    type="file"
                                    hidden
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                />
                            </Button>
                            {input.file && (
                                <Typography variant="caption" color="text.secondary">
                                    Selected file: {input.file.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="error">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={18} />}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateProfileDialog;
