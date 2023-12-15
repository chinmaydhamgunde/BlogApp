import React, { useState } from "react";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("userId");

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog created");
        navigate("/myBlogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"60%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop={"30px"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="grey"
          >
            Create a Post
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            name="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            name="description"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            name="image"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <Button type="submit" color="primary" variant="contained" >Submit</Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
