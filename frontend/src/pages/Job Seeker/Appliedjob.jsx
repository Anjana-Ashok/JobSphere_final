import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    // TableCaption,
    Typography,
    Chip,
    Box,
} from '@mui/material';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    // Function to dynamically set chip colors based on status
    const getStatusChipColor = (status) => {
        switch (status) {
            case 'rejected':
                return 'error'; // Red color
            case 'pending':
                return 'warning'; // Orange color
            case 'approved':
                return 'success'; // Green color
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                A list of your applied jobs
            </Typography>
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Job Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        You haven't applied to any jobs yet.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>
                                        {appliedJob?.createdAt?.split('T')[0]}
                                    </TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            label={appliedJob.status.toUpperCase()}
                                            color={getStatusChipColor(appliedJob.status)}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AppliedJobTable;
