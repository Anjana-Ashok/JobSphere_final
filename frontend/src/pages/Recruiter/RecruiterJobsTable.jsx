import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { MoreHoriz, Edit, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const navigate = useNavigate();

    // Filtering jobs based on search input
    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    // Menu handler
    const handleMenuOpen = (event, jobId) => {
        setAnchorEl(event.currentTarget);
        setSelectedJobId(jobId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedJobId(null);
    };

    return (
        <TableContainer component={Paper} elevation={3} sx={{ mt: 3 }}>
            <Table>
                <caption>
                    <Typography variant="body2" sx={{ p: 2 }}>
                        A list of your recently posted jobs
                    </Typography>
                </caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={(e) => handleMenuOpen(e, job._id)}
                                    aria-controls="job-menu"
                                    aria-haspopup="true"
                                >
                                    <MoreHoriz />
                                </IconButton>
                                <Menu
                                    id="job-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedJobId === job._id}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            navigate(`/admin/jobs/${job._id}`);
                                            handleMenuClose();
                                        }}
                                    >
                                        <Edit fontSize="small" sx={{ mr: 1 }} />
                                        Edit
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate(`/admin/jobs/${job._id}/applicants`);
                                            handleMenuClose();
                                        }}
                                    >
                                        <Visibility fontSize="small" sx={{ mr: 1 }} />
                                        Applicants
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {filterJobs?.length === 0 && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No jobs found.
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </TableContainer>
    );
};

export default AdminJobsTable;
