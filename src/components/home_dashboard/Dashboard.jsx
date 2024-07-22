// Dashboard.js
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CelebrationIcon from "@mui/icons-material/Celebration";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  // },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    // textAlign:'left'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const Dashboard = () => {
  const data = [
    { title: "Total Employees", value: 950, subtitle: "Last Month" },
    { title: "New Joining", value: 25, subtitle: "Last Month" },
    { title: "Today's Attendance", value: "98%", subtitle: "Today" },
    { title: "Update Leave Balance", value: "25%", subtitle: "Today" },
  ];
  const rows = [
    { name: "John", dob: "01/01/1990", doj: "01/01/2015" },
    { name: "Sathish", dob: "02/02/1992", doj: "02/02/2016" },
    { name: "Rajesh", dob: "02/02/1992", doj: "02/02/2016" },
    { name: "Jeeva", dob: "02/02/1992", doj: "02/02/2016" },
    { name: "Manoj", dob: "02/02/1992", doj: "02/02/2016" },
  ];

  return (
    <Box sx={{ padding: 10 }} p={3}>
      <Typography
        sx={{ paddingBottom: 2, fontWeight: "700" }}
        variant="h5"
        gutterBottom
      >
        Welcome, HR 👋
      </Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card elevation={1} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {item.value}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card sx={{ marginTop: 3, p: 3, borderRadius: 3 }}>
        <Typography
          sx={{ paddingBottom: 2, fontWeight: "700" }}
          variant="h5"
          gutterBottom
        >
          Birthday & Anniversary
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontSize: 20 }}>
                  Employees
                </StyledTableCell>
                <StyledTableCell sx={{ fontSize: 20 }} align="center">
                  Date of Birth
                </StyledTableCell>
                <StyledTableCell sx={{ fontSize: 20 }} align="center">
                  Date of Joining
                </StyledTableCell>
                <StyledTableCell
                  sx={{ fontSize: 20 }}
                  align="center"
                ></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    component="th"
                    scope="row"
                  >
                    <Avatar>{row.name[0]}</Avatar>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.dob}</StyledTableCell>
                  <StyledTableCell align="center">{row.doj}</StyledTableCell>
                  <StyledTableCell align="center">
                    <CelebrationIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Dashboard;
