import {
  Box,
  Card,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import SearchIcon from "@mui/icons-material/Search";
// import {useGetProductQuery} from '../../features/api/dashboard/dashboardApi'
// import DatePicker from "react-datepicker";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function Attendance() {


  //  const {data} = useGetProductQuery();

  //  console.log(data);
  const [startDate, setStartDate] = useState(new Date());

  const data1 = [
    { title: <AcUnitIcon />, value: "08.00", subtitle: "Average Working Time" },
    {
      title: <AccessTimeIcon />,
      value: "09.30AM",
      subtitle: "Average In Time",
    },
    {
      title: <HourglassDisabledIcon />,
      value: "06.30PM",
      subtitle: "Average Out Time",
    },
    { title: <TimerOffIcon />, value: "01.00", subtitle: "Average Break Time" },
  ];
  return (
    <div style={{ padding: 50 }}>
      <Typography
        sx={{ paddingBottom: 2, fontWeight: "700", color: "#1a237e" }}
        variant="h5"
        gutterBottom
      >
        Today Attendance
      </Typography>

      <p>
      {
        data?.data?.map((item, index) => (
          
            <div key={index}>
              <h1>{item.productName}</h1>
              <h1>{item.serialNo}</h1>
              
            </div>
     
        ))
      }  
       </p>
      <Grid container spacing={3}>
        {data1.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card
            //   elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                //   backgroundColor: "#f5f5f5",
                //   transition: "transform 0.3s ease-in-out",
                //   "&:hover": {
                //     transform: "scale(1.05)",
                //     boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                //   }
              }}
            >
              <span
                style={{
                  backgroundColor: "#b3afaf",
                  padding: "9px 12px",
                  borderRadius: "999px",
                  display: "inline-block",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#fff",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {item.title}
              </span>
              <Typography
                variant="h5"
                sx={{ fontWeight: "600", color: "#1a237e" }}
              >
                {item.value}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            width: 400,
            marginTop: 5,
            borderRadius: 3,
            py: 0.5,
          }}
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
        {/* <CalendarMonthIcon/> */}
        {/* <Paper  sx={{ display: "flex", alignItems: "center", mr: 2 ,marginTop:5,borderRadius:3,py:.5 }}> */}
        {/* <DatePicker
          className="custom-datepicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        /> */}
        {/* </Paper> */}
      </Box>
    </div>
  );
}

export default Attendance;
