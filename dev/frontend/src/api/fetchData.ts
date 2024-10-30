import { IP_SERVER } from "@/config/constants";
import axios, { AxiosResponse } from "axios";

// const fetchData = async <T>(path: string, data: any) => {
//   try {
//     const response = await axios.post(`${IP_SERVER}${path}`, data, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data as T;
//   } catch (error) {
//     console.error("Error during fetching data:", error);
//     throw error;
//   }
// };

// export default fetchData;


const fetchData = async <T>(path: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse = await axios.post(`${IP_SERVER}${path}`, data, {
      responseType: 'arraybuffer', // This will allow handling both binary and JSON responses
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check Content-Type to decide how to handle the response
    const contentType = response.headers['content-type'];

    // Handle JSON response
    if (contentType.includes('application/json')) {
      // Decode the array buffer to a string
      const decodedString = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
      const jsonData = JSON.parse(decodedString);
      return jsonData as T;
    }

    if (contentType.startsWith('image/')) {
      // Convert the binary data to a Base64 string
      const binary = new Uint8Array(response.data).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, '');
      const base64Image = btoa(binary);
      const imageDataUrl = `data:${contentType};base64,${base64Image}`;

      // Return an object with key and path if that's the structure you expect
      return {
        key: data, // Using the provided data (like key) as the key
        path: imageDataUrl,
      } as unknown as T; // Type casting to match the expected type
    }

    // Add more conditions if you expect other types of responses

    throw new Error(`Unsupported Content-Type: ${contentType}`);
  } catch (error) {
    console.error("Error during fetching data:", error);
    throw error;
  }
};

export default fetchData;

