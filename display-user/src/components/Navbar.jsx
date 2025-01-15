import React from "react";
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import "./navbar.css";
import { ColorModeButton } from "./ui/color-mode";

const Navbar = () => {
  const links = [
    {
      to: "/",
      path: "Home",
    },
    {
      to: "/userDetail/:id",
      path: "User Deatail",
    },
  ];
  return (
    <Box
      className="navbar"
      background="grey.400"
      display="flex"
      justifyContent="space-around"
      border="none"
    >
      {links.map((link, index) => (
        <ChakraLink className="link" key={index} as={RouterLink} to={link.to}>
          {link.path}
        </ChakraLink>
      ))}
      <ColorModeButton></ColorModeButton>
    </Box>
  );
};

export default Navbar;
