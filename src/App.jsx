import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/home_dashboard/index";
import LogoutIcon from '@mui/icons-material/Logout';
import Sidebar from "./components/sidebar";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import Employee from "./pages/employee/index";
import Profile from "./pages/profile/index";
import Attendance from "./pages/attendence/index";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Device from "./pages/device/index";
import Product from "./pages/product/index";
import Login from "./pages/login/index";
import { useEmployeeLoginMutation } from "./features/api/dashboard/dashboardApi";

const { Sider, Content } = Layout;

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout style={{ minHeight: "100vh" }}>
          {isLoggedIn && (
            <Sider
              theme="light"
              trigger={null}
              collapsible
              collapsed={collapsed}
              className="sider"
              width={280}
              collapsedWidth={isMobile ? 0 : 80}
            >
              <Sidebar />
              <div style={{ position: "absolute", bottom: 20, width: "100%" }}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  className="triggr-btn mobilebtn"
                  style={{ marginLeft: "1%" }}
                />
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleLogout}
                  style={{
                    marginLeft: "3%",
                    // backgroundColor: "#8A1E3A",
                    // color: "#fff",
                    padding: "8px 16px",
                    fontSize: "16px",
                    textTransform: "none",
                    borderRadius: "8px",
                    boxShadow: 3,
                    "&:hover": {
                      backgroundColor: "#63162A",
                    },
                    "&:active": {
                      boxShadow: 1,
                    },
                    border: "1px solid #8805D7",
                    marginTop: "10px",
                  }}
                >
                  <LogoutIcon fontSize="10"/>
                  Logout
                </Button>
              </div>
            </Sider>
          )}
          <Layout>
            <Content style={{ backgroundColor: "#f7f7f7", padding: "24px" }}>
              <Routes>
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Device />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
                <Route
                  path="/product"
                  element={
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} /> */}
                {/* <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} /> */}
                {/* <Route path="/device" element={<ProtectedRoute><Device /></ProtectedRoute>} /> */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
