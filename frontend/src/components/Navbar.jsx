import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, Box, IconButton, Divider } from '@mui/material';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';
import log from "../assets/orangelogo.png";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response.data.message);
        } finally {
            handleMenuClose();
        }
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(to right,rgb(0, 0, 0),rgb(13, 13, 14))', Width: '1600px' }}>
            <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Logo */}
                <img src={log} alt="JobSphere Logo" style={{ width: 90, height: 90 }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', marginRight:'10px' }}>
                    Job<span style={{ color: '#FFD700' }}>Sphere</span>
                </Typography>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex',marginLeft:'750px', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Button color="inherit" component={Link} to="/admin/companies" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    Companies
                                </Button>
                                <Button color="inherit" component={Link} to="/admin/jobs" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    Jobs
                                </Button>
                                <Button color="inherit" component={Link} to="/aboutUs" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    About
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} to="/jobs" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    Jobs
                                </Button>
                                <Button color="inherit" component={Link} to="/aboutUs" sx={{ '&:hover': { color: '#FFD700' } }}>
                                    About
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Conditional Buttons */}
                    {!user ? (
                        <Box sx={{ display: 'flex', gap: 2, marginLeft:'20px' }}>
                            
                            <Button
                                component={Link}
                                to="/login"
                                sx={{  color: 'white',  '&:hover': { color: '#FFD700' } }}
                            >
                                Join
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <IconButton onClick={handleMenuOpen} sx={{ p: 0,marginLeft:'50px '}}>
                                <Avatar src={user?.profile?.profilePhoto} alt="User Avatar" />
                            </IconButton>
                            {/* Profile Menu */}
                            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {user?.fullname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user?.profile?.bio}
                                    </Typography>
                                </Box>
                                <Divider />
                                {user && user.role === 'student' && (
                                    <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                                        <User2 style={{ marginRight: '8px' }} size={18} />
                                        View Profile
                                    </MenuItem>
                                )}
                                <MenuItem onClick={logoutHandler}>
                                    <LogOut style={{ marginRight: '8px' }} size={18} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
