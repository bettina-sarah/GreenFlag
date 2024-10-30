import { IP_SERVER } from "@/config/constants";
import axios from "axios";

const fetchData = async <T>(path: string, data: any) => {
  try {
    const response = await axios.post(`${IP_SERVER}${path}`, data);
    return response.data as T;
  } catch (error) {
    console.error("Error during fetching profile:", error);
    throw error;
  }
};

export default fetchData;
