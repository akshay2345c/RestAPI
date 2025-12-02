import axios from "axios";
const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com",
})

// get method 
export const getPost = (page = 1, limit = 10) => {
  return api.get(`/posts?_page=${page}&_limit=${limit}`);
};