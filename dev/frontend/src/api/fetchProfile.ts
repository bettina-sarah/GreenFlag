import { IP_SERVER } from "@/config/constants";
import axios from 'axios';

interface FetchProfileData {
    email: string;
    // You can add other fields as necessary
}

//data any
const fetchProfile = (async (data:FetchProfileData) => {
    try {
        const response = await axios.post(`${IP_SERVER}/profile`, data);
        return response.data;
    } catch (error) {
        console.error('Error during fetching profile:', error);
        throw error; 
    }
});

export default fetchProfile;