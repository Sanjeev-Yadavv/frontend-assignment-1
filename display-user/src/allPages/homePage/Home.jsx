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
  Button,
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

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
    }
    setCurrentPage(1);
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

  // for pagination

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  let paginatedData = filteredData.slice(startIndex, endIndex);
  let totalPage = Math.ceil(filteredData.length / itemPerPage);

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }
  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  // console.log(sortingOrder);
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
        {paginatedData?.map((user, index) => (
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
      <Box p={10} display="flex" gap={10}>
        <Button disabled={currentPage < 2} onClick={handlePrevious}>
          Previous
        </Button>
        <Button disabled={currentPage == totalPage} onClick={handleNext}>
          Next
        </Button>
        <Text>Page: {currentPage}</Text>
      </Box>
    </Box>
  );
};

export default Home;
