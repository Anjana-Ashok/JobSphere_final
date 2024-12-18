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
  TableFooter,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

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
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <caption style={{ margin: "10px 0", textAlign: "left", fontSize: "14px" }}>
          A list of your recently applied users
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <Link
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="primary"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </Link>
                ) : (
                  <Typography color="textSecondary">NA</Typography>
                )}
              </TableCell>
              <TableCell>
                {item?.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handlePopoverOpen(e, item._id)}>
                  <MoreHorizIcon />
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
                  <Box p={1}>
                    {shortlistingStatus.map((status, index) => (
                      <Button
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        fullWidth
                        variant="text"
                        sx={{ textTransform: "capitalize", justifyContent: "start" }}
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
    </TableContainer>
  );
};

export default ApplicantsTable;
