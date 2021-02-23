import axios from "axios";

// Fill in ai-bloc api deployed on digital ocean

export default axios.create({
  baseURL: "",
  headers: {
    Authorization: "Bearer ",
  },
});
