import React from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { FaHome, FaList, FaCarSide } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function SidebarComponent() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "rgb(8 51 68);",
          color: "rgb(67 56 202)",
          width: "240px",
          height: "100%",
          position: "fixed",
          zIndex: "1000",
        },
      }}
    >
      <Menu>
        <MenuItem icon={<FaHome />} onClick={() => handleNavigate("/")}>Dashboard</MenuItem>
        <MenuItem icon={<FaCarSide />} onClick={() => handleNavigate("/cars")}>Car List</MenuItem>
        <MenuItem icon={<FaList />} onClick={() => handleNavigate("/orders")}>Order List</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarComponent;
