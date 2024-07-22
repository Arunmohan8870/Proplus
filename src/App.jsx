import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/home_dashboard/index";
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

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }}>
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
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="triggr-btn mobilebtn"
              style={{ marginLeft: '1%' }}
            />
          </div>
        </Sider>
        <Layout>
          <Content style={{ backgroundColor: "#f7f7f7", padding: "24px" }}>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/" element={<Device />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product" element={<Product />} />
              {/* <Route path="/employee" element={<Employee />} />
              
              <Route path="/attendance" element={<Attendance />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    
      </Provider>
    </BrowserRouter>
  );
};

export default App;
