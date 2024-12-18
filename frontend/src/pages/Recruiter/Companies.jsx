import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "../../redux/companySlice";
import CompaniesTable from "./CompaniesTable";

// Material UI Components
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        {/* Header Section */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Search Input */}
          <Grid item xs={12} sm={8} md={7}>
            <TextField
              fullWidth
              label="Filter by name"
              variant="outlined"
              size="small"
              onChange={(e) => setInput(e.target.value)}
            />
          </Grid>

          {/* New Company Button */}
          <Grid item xs={6} sm={4} md={2}>
            <Button
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/companies/create")}
              sx={{
                textTransform: "capitalize",
                background:
                  "linear-gradient(to right,rgb(228, 142, 23),rgb(240, 109, 16))",
                color: "white",
                "&:hover": {
                  background: "rgb(240, 109, 16)",
                },
              }}
            >
              New Company
            </Button>
          </Grid>

          {/* Jobs Button */}
          <Grid item xs={6} sm={4} md={3}>
            <Button
              fullWidth
              onClick={() => navigate("/admin/jobs")}
              sx={{
                textTransform: "capitalize",
                background:
                  "linear-gradient(to right,rgb(228, 142, 23),rgb(240, 109, 16))",
                color: "white",
                "&:hover": {
                  background: "rgb(240, 109, 16)",
                },
              }}
            >
              Jobs
            </Button>
          </Grid>
        </Grid>

        {/* Companies Table */}
        <Box mt={4}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontSize: {
                xs: "1rem", // Small screens
                sm: "1.25rem", // Medium screens
                md: "1.5rem", // Large screens
              },
              textAlign: {
                xs: "center",
                sm: "left",
              },
            }}
          >
            Companies List
          </Typography>
          <CompaniesTable />
        </Box>
      </Container>
    </div>
  );
};

export default Companies;