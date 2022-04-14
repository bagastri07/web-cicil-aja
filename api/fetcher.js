import axios from "axios";
import { BASE_URL } from "./base";

const fetcher = axios.create({
  baseURL: BASE_URL,
});

// if (typeof window !== "undefined") {
//   const token = localStorage.getItem("token");

//   token ? (axios.defaults.headers.common["Authorization"] = token) : "";
// }

export default fetcher;
