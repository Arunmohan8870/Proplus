import { Avatar, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import {MessageOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import React from "react";


const Header = () => {
  return (
    <div style={{float:'right'}}>
      <Flex>
        {/* <div style={{float:'left'}}>
        <Typography.Title level={3} type="secondary" >
          Welcome, Ajay
        </Typography.Title>
        </div> */}

        <Flex align="center" gap="3rem" >

         <Search placceholder="Search Dashboard" allowClear />

         <Flex align="center" gap="10px">
            <MessageOutlined className="header-icon"/>
            <NotificationOutlined className="header-icon"/>
            <Avatar icon={<UserOutlined />} />
         </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Header;
