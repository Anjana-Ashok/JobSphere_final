import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  IconButton,
  Divider,
  Tooltip,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';
import log from '../assets/orangelogo.png';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null); // For mobile menu
  const openMenu = Boolean(anchorEl);
  const openNavMenu = Boolean(anchorElNav);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavMenuOpen = (event) => setAnchorElNav(event.currentTarget);
  const handleNavMenuClose = () => setAnchorElNav(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response.data.message);
    } finally {
      handleMenuClose();
    }
  };

  const navLinks = user?.role === 'recruiter'
    ? [
        { label: 'Companies', path: '/admin/companies' },
        { label: 'Jobs', path: '/admin/jobs' },
        { label: 'About', path: '/aboutUs' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Jobs', path: '/jobs' },
        { label: 'About', path: '/aboutUs' },
      ];

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(13, 13, 14))' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src={log} alt="JobSphere Logo" style={{ width: 50, height: 50 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                display: { xs: 'none', md: 'block' },
              }}
            >
              Job<span style={{ color: 'orange' }}>Sphere</span>
            </Typography>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton size="large" color="inherit" onClick={handleNavMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={openNavMenu}
              onClose={handleNavMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.label} onClick={handleNavMenuClose} component={Link} to={link.path}>
                  <Typography textAlign="center">{link.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Push navigation links to the left */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                sx={{ color: 'white', '&:hover': { color: 'orange' } }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* User Section - Now at the end */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!user ? (
              <Button
                component={Link}
                to="/login"
                sx={{ color: 'white', '&:hover': { color: 'orange' } }}
              >
                Join
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar src={user?.profile?.profilePhoto} alt="User Avatar" />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {user?.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.profile?.bio}
                    </Typography>
                  </Box>
                  <Divider />
                  {user?.role === 'student' && (
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
      </Container>
    </AppBar>
  );
};

export default Navbar;