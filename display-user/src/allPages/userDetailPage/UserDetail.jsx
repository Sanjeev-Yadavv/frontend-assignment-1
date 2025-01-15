import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Text, Button, Heading } from "@chakra-ui/react";
import "./userDetail.css";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const filteredData = data?.filter((user, index) => {
    return user.id == id;
  });

  const handleClick = () => {
    navigate("/");
  };

  // console.log("filterd data", filteredData);
  if (!filteredData) {
    return <Heading>Please select user first to see the details</Heading>;
  }
  return (
    <div className="cardDetail">
      <Heading>Here is Selected User's detail</Heading>
      {filteredData?.map((user, index) => (
        <Box className="userDetail" key={index}>
          <Text>
            <strong>Name: </strong>
            {user.name}
          </Text>
          <Text>
            <strong>Email: </strong>
            {user.email}
          </Text>
          <Text>
            <strong>Phone: </strong>
            {user.phone}
          </Text>
          <Text>
            <strong>Name of Company: </strong>
            {user.company.name}
          </Text>
          <Text>
            <strong>Website: </strong>
            {user.website}
          </Text>
        </Box>
      ))}
      <Button m={10} onClick={handleClick}>
        Go Back
      </Button>
    </div>
  );
};

export default UserDetail;
