import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/action";
import {
  Box,
  Text,
  Spinner,
  VStack,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("");

  const URL = "https://jsonplaceholder.typicode.com/users";

  // fetched the original data

  useEffect(() => {
    dispatch(fetchUserData(URL));
  }, [dispatch]);

  // filter the original data by taking input's name

  useEffect(() => {
    let filtered = data;
    if (search.trim()) {
      filtered = data.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      setFilteredData(data);
    }

    if (sortingOrder === "a-z") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortingOrder == "z-a") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filtered) {
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [search, data, sortingOrder]);

  const navigateUser = (id) => {
    navigate(`/userDetail/${id}`);
  };
  // console.log(data);
  if (isLoading) {
    return (
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    );
  }
  if (error) {
    return <Heading>{error}</Heading>;
  }

  console.log(sortingOrder);
  return (
    <Box className="mainContainer">
      <Box className="topContainer" display="flex" gap={10} m={10}>
        <Input
          w="30vw"
          type="text"
          placeholder="Find the user by its name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortingOrder}
          onChange={(e) => setSortingOrder(e.target.value)}
        >
          <option value="default">Select the order of users</option>
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
        </select>
      </Box>
      <Heading textAlign="center" m={5}>
        Users List.
      </Heading>
      <Box className="container">
        {filteredData?.map((user, index) => (
          <Box
            className="userData"
            key={index}
            onClick={() => navigateUser(user.id)}
          >
            <Text>
              <strong>Name: </strong>
              {user.name}
            </Text>
            <Text>
              <strong>Email: </strong>
              {user.email}
            </Text>
            <Text>
              <strong>City: </strong>
              {user.address.city}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
