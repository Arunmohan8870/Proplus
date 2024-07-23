import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Card,
  Avatar,
  Input,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEmployeeLoginMutation } from "../../features/api/dashboard/dashboardApi";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [employeeLogin] = useEmployeeLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      try {
        const login = await employeeLogin({ email, password }).unwrap();
        toast.success(login.message);
        localStorage.setItem("token", login.token);
        setIsLoggedIn(true);
        navigate("/");
      } catch (error) {
        toast.error(error.data.message);
        console.error(error.data.message);
      }
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <ToastContainer />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //backgroundColor: "#f0f2f5",
            padding: 3,
          }}
        >
          <Card
            sx={{
              width: 450,
              boxShadow: 3,
              padding: 6,
              borderRadius: 5,
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                margin: 2,
                bgcolor: "primary.main",
                width: 70,
                height: 70,
                boxShadow: 3,
              }}
            >
              <LockOutlinedIcon fontSize="inherit" />
            </Avatar>
            <Typography sx={{ fontSize: 27 }} gutterBottom>
              Login
            </Typography>
            <Divider sx={{ width: "80%", marginY: 2 }} />
            <Typography sx={{ fontSize: 15, marginBottom: 3 }}>
              Welcome Back!
            </Typography>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <TextField
                fullWidth
                size="small"
                label="Email Address"
                margin="normal"
                variant="outlined"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  sx: {
                    height: "45px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                    // textAlign:'center',
                    display:'flex',
                    alignItems:'center',
                  },
                }}
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  sx: {
                    height: "45px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                    textAlign:'center',
                    display:'flex',
                    alignItems:'center',
                  },
                }}
                sx={{
                  mb: 3,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 8,
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#303f9f",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              >
                Sign In
              </Button>
            </form>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Login;
// import React from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   Divider,
//   TextField,
//   Button,
//   Card,
//   Avatar,
//   Link,
//   Grid,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";

// const Login = () => {
//   return (
//     <Box
//       sx={{
//         backgroundImage:
//           'url("https://images.pexels.com/photos/5277391/pexels-photo-5277391.jpeg?auto=compress&cs=tinysrgb&w=600")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         color: "white",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//         },
//       }}
//     >
//       <Container
//         component="main"
//         maxWidth="xs"
//         sx={{ position: "relative", zIndex: 1 }}
//       >
//         <Card
//           sx={{
//             backdropFilter: "blur(10px)",
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             padding: 4,
//             borderRadius: 2,
//             width: "100%",
//             maxWidth: 400,
//             textAlign: "center",
//             color: "white",
//           }}
//         >
//           <Avatar
//             sx={{
//               margin: "0 auto",
//               backgroundColor: "primary.main",
//               width: 70,
//               height: 70,
//               boxShadow: 3,
//             }}
//           >
//             <LockOutlinedIcon fontSize="large" />
//           </Avatar>
//           <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
//             Login
//           </Typography>
//           <Divider
//             sx={{
//               width: "80%",
//               my: 2,
//               backgroundColor: "white",
//               textAlign: "center",
//             }}
//           />
//           <Typography component="h4" variant="h6">
//             Welcome Back!
//           </Typography>
//           <form style={{ width: "100%", marginTop: 8 }} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               InputLabelProps={{
//                 sx: {
//                   fontSize: "14px",
//                   color: "white",
//                 },
//               }}
//               InputProps={{
//                 sx: {
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   color: "white",
//                 },
//               }}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               InputLabelProps={{
//                 sx: {
//                   fontSize: "14px",
//                   color: "white",
//                 },
//               }}
//               InputProps={{
//                 sx: {
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   color: "white",
//                 },
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 marginTop: 3,
//                 marginBottom: 2,
//                 backgroundColor: "#8A1E3A",
//                 color: "#fff",
//                 "&:hover": {
//                   backgroundColor: "#63162A",
//                 },
//               }}
//             >
//               Login
//             </Button>
//             <Grid container justifyContent="space-between">
//               <Grid item>
//                 <Link sx={{ color: "white" }} href="#" variant="body2">
//                   Forgot Password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link sx={{ color: "white" }} href="#" variant="body2">
//                   Sign Up
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default Login;
