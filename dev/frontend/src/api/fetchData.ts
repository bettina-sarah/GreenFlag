import { IP_SERVER } from "@/constants";
import axios, { AxiosResponse } from "axios";

/**  FETCH DATA FUNCTION
 * Performs a POST request to the server at the given path with the given data,
 * and returns the response as a Promise of type T.
 *
 * Equipped to handle different Content-Type responses: JSON objects and images.
 *
 * @param path The path to POST to.
 * @param data The data to send in the request body.
 * @returns A Promise of type T, resolved with the response data.
 * @throws {Error} If the response Content-Type is not supported.
 */

const fetchData = async <T>(path: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse = await axios.post(
      `${IP_SERVER}${path}`,
      data,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = response.headers["content-type"];

    if (contentType.includes("application/json")) {
      const decodedString = new TextDecoder("utf-8").decode(
        new Uint8Array(response.data)
      );
      const jsonData = JSON.parse(decodedString);
      return jsonData as T;
    }

    if (contentType.startsWith("image/")) {
      const binary = new Uint8Array(response.data).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, "");
      const base64Image = btoa(binary);
      const imageDataUrl = `data:${contentType};base64,${base64Image}`;

      return {
        key: data,
        path: imageDataUrl,
      } as unknown as T;
    }

    throw new Error(`Unsupported Content-Type: ${contentType}`);
  } catch (error) {
    console.error("Error during fetching data:", error);
    throw error;
  }
};

export default fetchData;

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
