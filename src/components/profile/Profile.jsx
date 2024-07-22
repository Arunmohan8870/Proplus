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
import CardMedia from "@mui/material/CardMedia";

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    //   alignItems: "center",
    minHeight: "100vh",
  },

  card: {
    // maxWidth: 800,
    width: "70%",
  },
  media: {
    height: 400,
  },
};
 const Profile = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <div style={styles.cardContainer}>
        <Card sx={styles.card}>
          {/* <CardMedia
         sx={styles.media}
         component="video" 
         controls 
         
         
       /> */}

          <CardMedia
            sx={styles.media}
            image="https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&w=600https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg?auto=compress&cs=tinysrgb&w=600"
            // title="green iguana"
          />

          <CardContent>
            <Box
              style={{
                //   width: '100%',
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box width="100%">
                <Typography sx={{ fontWeight: "700", mb: 4 }} variant="h5">
                  Personal Details
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  Rajesh
                </Typography>
                <Divider style={{ margin: "15px 0" }} />

                <Typography variant="body2" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  Rajesh@gmail.com
                </Typography>
               
                <Divider style={{ margin: "15px 0" }} />


                <Typography variant="body2" color="textSecondary">
                  Role
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  HR
                </Typography>
                <Divider style={{ margin: "15px 0" }} />
                <Typography variant="body2" color="textSecondary">
                  Mobile Number
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                 987654321
                </Typography>
                <Divider style={{ margin: "15px 0" }} />
                <Typography variant="body2" color="textSecondary">
                  Date of Joining
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  9-9-2022
                </Typography>
                <Divider style={{ margin: "15px 0" }} />
                <Typography variant="body2" color="textSecondary">
                  Date of Birth
                </Typography>
                <Typography variant="body2" style={{ fontWeight: 500 }}>
                  9-9-1997
                </Typography>
                <Divider style={{ margin: "15px 0" }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Profile;