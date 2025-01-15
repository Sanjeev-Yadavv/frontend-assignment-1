import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../allPages/homePage/Home";
import UserDetail from "../allPages/userDetailPage/UserDetail";

const RouteComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userDetail/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default RouteComponent;
