import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) =>
      searchCompanyByText
        ? company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        : true
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  if (!filteredCompanies.length) {
    return (
      <Box sx={{ p: 3,marginTop:"200px" }} >
        <Typography variant="h6" color="textSecondary">
          No companies found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#E5E1DA", minHeight: "100vh", pb: 4,  }}>
      <Box
        sx={{
          maxWidth: { xs: "95%", sm: 700, md: 800 },
          mx: "auto",
          mt: 4,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 4,
          overflow: "hidden",
          p: { xs: 2, sm: 3 }
          
          
        }}
      >
        <Typography variant="h5" fontWeight="600" mb={2}  >
          Companies
        </Typography>

        {filteredCompanies.map((company) => (
          <Box
            key={company._id}
            sx={{
              mb: 3,
              p: 3,
              border: "1px solid #ddd",
              borderRadius: 4,
              boxShadow: 2,
              
              
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={company.logo}
                  alt={company.name}
                  sx={{
                    width: { xs: 56, sm: 80 },
                    height: { xs: 56, sm: 80 },
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                  >
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {company.description || "No description available"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {company.createdAt
                      ? format(new Date(company.createdAt), "MMM dd, yyyy")
                      : "N/A"}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    {company. website}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    {company.location}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                onClick={() => navigate(`/admin/companies/${company._id}`)}
                color="primary"
              >
                <Edit />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CompaniesTable;
