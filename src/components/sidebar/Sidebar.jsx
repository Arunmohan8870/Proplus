import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa6";
import logo from "../../assets/logoimg.png";
import {
  UserOutlined,
  CarryOutOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <>
      <div className="logo" style={{ textAlign: "center" }}>
        {/* <FaLeaf /> */}
        {/* <img src="https://propluslogics.com/support/uploads/company/fc764ba52ad25285b7e3733ecb2dbc31.png" alt="logo" style={{ width: "120%", background:'black' }} /> */}
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        style={{ backgroundColor: "#fff" }}
      >
        <Menu.Item key="1" icon={<UserOutlined style={{ fontSize: "18px" }} />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        
       <Menu.Item
          key="2"
          icon={<OrderedListOutlined style={{ fontSize: "18px" }} />}
        >
          <Link to="/product">Product Details</Link>
       </Menu.Item>

       {/* <Menu.Item
          key="3"
          icon={<CarryOutOutlined style={{ fontSize: "18px" }} />}
        >
          <Link to="/profile">Profile Info</Link>
        </Menu.Item> */}

         {/* <Menu.Item
          key="4"
          icon={<ProfileOutlined style={{ fontSize: "18px" }} />}
        >
          <Link to="/attendance">Attendance</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<SettingOutlined style={{ fontSize: "18px" }} />}
        >
          <Link to="/settings">Settings</Link>
        </Menu.Item>*/}
        {/* <Menu.Item
          key="6"
          icon={<LoginOutlined style={{ fontSize: "18px" }} />}
        >
          Logout
        </Menu.Item>  */}
      </Menu>
    </>
  );
};

export default Sidebar;
