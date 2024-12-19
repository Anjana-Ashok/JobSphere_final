import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { TextField, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./RecruiterJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <Container maxWidth="lg" sx={{ my: 5 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    my={3}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Filter by name, role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="small"
                        sx={{ width: "300px" }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/admin/jobs/create")}
                        sx={{
                            textTransform: "none",
                            background:
                  "linear-gradient(to right,rgb(228, 142, 23),rgb(240, 109, 16))",
                            "&:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        New Jobs
                    </Button>
                </Box>
                <AdminJobsTable />
            </Container>
        </div>
    );
};

export default AdminJobs;
