import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

makeRequest.interceptors.request.use((req) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) || null
  if(currentUser) req.headers.Authorization = `Bearer ${currentUser.token}`
  return req;
});