import axios from "axios";

const apiClient = axios.create({
 baseURL: "https://tbr.otbbookings.co.za/wp-json/timetics/v1",
 timeout: 5000,
 headers: {
  "Content-Type": "application/json",
 },
});

export default apiClient;
