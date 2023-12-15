import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({});
  const id = useParams().id;

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog updated");
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

          <Button type="submit" color="warning" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
