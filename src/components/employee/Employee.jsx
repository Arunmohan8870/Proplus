import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  IconButton,
  //   Tooltip,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Divider,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from "@mui/x-data-grid";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const Employee = () => {
  const profiles = [
    {
      id: 1,
      name: "Sathish",
      role: "Project Manager",
      department: "Manager",
      dateOfJoining: "Jan, 15 2020",
      email: "sneha2001@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#ba68c8",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 2,
      name: "Rajesh",
      role: "Developer",
      department: "Developer",
      dateOfJoining: "Jun, 20 2020",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#ffb74d",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 3,
      name: "David",
      role: "Data Analyst",
      department: "Analyst",
      dateOfJoining: "Feb, 04 2021",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "https://via.placeholder.com/60",
      roleColor: "#ef9a9a",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 4,
      name: "Meera",
      role: "UX/UI Designer",
      department: "Designer",
      dateOfJoining: "Aug, 12 2020",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#aed581",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 5,
      name: "Sathish",
      role: "Project Manager",
      department: "Manager",
      dateOfJoining: "Jan, 15 2020",
      email: "sneha2001@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#ba68c8",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 6,
      name: "Rajesh",
      role: "Developer",
      department: "Developer",
      dateOfJoining: "Jun, 20 2020",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#ffb74d",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 7,
      name: "David",
      role: "Data Analyst",
      department: "Analyst",
      dateOfJoining: "Feb, 04 2021",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#ef9a9a",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
    {
      id: 8,
      name: "Meera",
      role: "UX/UI Designer",
      department: "Designer",
      dateOfJoining: "Aug, 12 2020",
      email: "Rajesh@gmail.com",
      phone: "9626766342",
      image: "",
      roleColor: "#aed581",
      Devices: ["Dell", "Mouse", "Mobile"],
    },
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        sx={{ px: 6, paddingTop: 3 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography sx={{ fontWeight: "700" }} variant="h5" gutterBottom>
          Employes List
        </Typography>
        <Box display="flex" alignItems="center">
          <Paper
            component="form"
            sx={{ display: "flex", alignItems: "center", mr: 2 }}
          >
            <IconButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Employees"
              inputProps={{ "aria-label": "search employees" }}
            />
          </Paper>
          <Button color="primary" variant="contained" aria-label="add employee">
            <AddIcon />
            Add
          </Button>
        </Box>
      </Box>
      <Grid sx={{ padding: 5 }} container spacing={5}>
        {profiles.map((profile, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              //   variant="outlined"
              style={{
                maxWidth: 400,
                // margin: "16px auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  style={{
                    backgroundColor: profile.roleColor,
                    borderRadius: 16,
                    padding: "6px 12px",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  {profile.role}
                </Typography>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={2}
              >
                <Avatar
                  src={profile.image}
                  style={{
                    width: 80,
                    height: 80,

                    // border: `3px solid ${profile.roleColor}`
                  }}
                />
                <Typography variant="h6" style={{ marginTop: 8 }}>
                  {profile.name}
                </Typography>
              </Box>
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  DEPARTMENT
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  {profile.department}
                </Typography>
                {/* <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: 12 }}
              >
                DATE OF JOINING
              </Typography>
              <Typography variant="body2" style={{ fontWeight: 500 }}>
                {profile.dateOfJoining}
              </Typography> */}
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={2}
                >
                  <EmailIcon fontSize="small" style={{ marginRight: 4 }} />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                >
                  <PhoneIcon fontSize="small" style={{ marginRight: 4 }} />
                  <Typography>{profile.phone}</Typography>
                </Box>
              </CardContent>
              <CardActions style={{ justifyContent: "center", marginTop: 16 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 8 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleClickOpen(profile.id)}
                  variant="contained"
                  color="primary"
                >
                  View
                </Button>

                <Dialog
                 sx={{borderRadius:99}}
                  fullWidth
                  open={open === profile.id}
                  onClose={handleClose}
                >
                  <DialogContent>
                    <Paper>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      mt={2}
                      pb={4}
                    >
                      <Avatar
                        // src={profile.image}
                        style={{
                          width: 80,
                          height: 80,
                        //   border: `3px solid ${profile.roleColor}`,
                        }}
                      />
                      <Typography variant="h6" style={{ marginTop: 8 }}>
                        {profile.name}
                      </Typography>
                    </Box>
                    </Paper>
                   

                    <Box mt={4}>
                      <Typography variant="body2" color="textSecondary">
                        Name
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {profile.name}
                      </Typography>
                      <Divider style={{ margin: "8px 0" }} />

                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {profile.email}
                      </Typography>
                      <Divider style={{ margin: "8px 0" }} />

                      <Typography variant="body2" color="textSecondary">
                        Department
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {profile.department}
                      </Typography>
                      <Divider style={{ margin: "8px 0" }} />

                      <Typography variant="body2" color="textSecondary">
                        Date of Joining
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 500 }}>
                        {profile.dateOfJoining}
                      </Typography>
                      <Divider style={{ margin: "8px 0" }} />

                      <Typography variant="body2" color="textSecondary">
                        Used Devices
                      </Typography>
                      <Box>
                        {profile.Devices.map((dev, index) => (
                          <Box
                            key={index}
                            style={{
                              background: "#e0e0e0",
                              padding: "4px 8px",
                              margin: "4px 0",
                              borderRadius: 4,
                              display: "inline-block",
                              
                              marginRight:10
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, }}
                            >
                              {dev}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </DialogContent>
                </Dialog>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Employee;
