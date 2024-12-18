import React, { useState } from 'react';

import { Avatar, Box, Button, Card, CardContent, Typography, Chip, Divider, IconButton, Link, Stack, MenuItem } from '@mui/material';
import { Mail, Contact, Edit, User2 } from 'lucide-react';
import AppliedJobTable from './Appliedjob';
import UpdateProfileDialog from './UpdatedProfile';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../../hooks/useGetAppliedJobs';
import Navbar from '../../components/Navbar';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh', pb: 4 }}>
            <Navbar/>
            <Box
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    mt: 4,
                    backgroundColor: 'white',
                    boxShadow: 3,
                    borderRadius: 4,
                    overflow: 'hidden',
                }}
            >
                {/* Profile Header */}
                <Card>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Stack direction="row" spacing={3}>
                                <Avatar src={user?.profile?.profilePhoto} alt="User Avatar" />
                            {/* {user && user.role === 'student' && (
                                    <MenuItem onClick={handleMenuClose} >
                                        <User2 style={{ marginRight: '8px' }} size={18} />
                                        View Profile
                                    </MenuItem>
                                )} */}
                                <Box>
                                    <Typography variant="h5" fontWeight="600">
                                        {user?.fullname}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user?.profile?.bio || 'No bio available'}
                                    </Typography>
                                </Box>
                            </Stack>
                            <IconButton onClick={() => setOpen(true)} color="primary">
                                <Edit />
                            </IconButton>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Contact Details */}
                <Box sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Mail color="gray" />
                            <Typography variant="body1">{user?.email}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Contact color="gray" />
                            <Typography variant="body1">
                                {user?.phoneNumber || 'No phone number provided'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Divider />

                {/* Skills */}
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                        Skills
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" spacing={1}>
                        {user?.profile?.skills.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <Chip key={index} label={skill} color="primary" variant="outlined" />
                            ))
                        ) : (
                            <Typography color="text.secondary">No skills added</Typography>
                        )}
                    </Stack>
                </Box>

                {/* Resume */}
                <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Resume:
                    </Typography>
                    {isResume && user?.profile?.resume ? (
                        <Link
                            href={user?.profile?.resume}
                            target="_blank"
                            underline="hover"
                            color="primary"
                        >
                            {user?.profile?.resumeOriginalName || 'Download Resume'}
                        </Link>
                    ) : (
                        <Typography color="text.secondary">No resume available</Typography>
                    )}
                </Box>
            </Box>

            {/* Applied Jobs Table */}
            <Box
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    mt: 4,
                    backgroundColor: 'white',
                    boxShadow: 3,
                    borderRadius: 4,
                    p: 3,
                }}
            >
                <Typography variant="h5" fontWeight="600" mb={2}>
                    Applied Jobs
                </Typography>
                <AppliedJobTable />
            </Box>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </Box>
    );
};

export default Profile;
