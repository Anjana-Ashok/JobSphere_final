import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "../../redux/companySlice";
import CompaniesTable from "./CompaniesTable";

// Material UI Components
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {/* Header with Search and Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField
            label="Filter by name"
            variant="outlined"
            size="small"
            onChange={(e) => setInput(e.target.value)}
            sx={{ width: "50%" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/companies/create")}
            sx={{ textTransform: "capitalize" }}
          >
            New Company
          </Button>
        </Box>

        {/* Companies Table */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Companies List
        </Typography>
        <CompaniesTable />
      </Container>
    </div>
  );
};

export default Companies;
