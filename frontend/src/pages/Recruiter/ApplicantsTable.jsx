import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import axios from "axios";

// Material UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Link,
  IconButton,
  Popover,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check for small screen

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const open = Boolean(anchorEl);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      handlePopoverClose();
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        width: "100%",
      }}
    >
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: 3,
          backgroundColor: "#fff",
          minWidth: "100%",
          tableLayout: "fixed",
          maxHeight: "calc(100vh - 300px)", 
        }}
      >
        <Box
          sx={{
            display: "block",
            overflowX: "auto", 
            width: "100%",
          }}
        >
          <Table>
            <caption
              style={{
                margin: "10px 0",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              A list of your recently applied users
            </caption>
            <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Full Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Contact
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Resume
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#333" }}
                  align="right"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants?.applications?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell><TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <Link
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="textPrimary"
                      >
                        {item?.applicant?.profile?.resumeOriginalName}
                      </Link>
                    ) : (
                      <Typography color="textSecondary">NA</Typography>
                    )}
                  </TableCell>
                  <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handlePopoverOpen(e, item._id)}>
                      <MoreHorizIcon sx={{ color: "#555" }} />
                    </IconButton>
                    <Popover
                      open={open && selectedId === item._id}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box p={2}>
                        {shortlistingStatus.map((status, index) => (
                          <Button
                            key={index}
                            onClick={() => statusHandler(status, item?._id)}
                            fullWidth
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              justifyContent: "start",
                              mb: 1,
                              color: "#333",
                              borderColor: "#ccc",
                              "&:hover": {
                                backgroundColor: "#f1f1f1",
                              },
                            }}
                          >
                            {status}
                          </Button>
                        ))}
                      </Box>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isSmallScreen ? "column" : "row", // Stack elements on small screens
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Showing {applicants?.applications?.length} applicants
        </Typography>
        {!isSmallScreen && <Divider sx={{ width: "100%" }} />}
      </Box>
    </Box>
  );
};

export default ApplicantsTable;