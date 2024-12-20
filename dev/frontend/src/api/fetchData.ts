/*
------------------------------------------------------------------------------------
====================================================================================
Filename    : fetchData.ts
Created By  : Bettina-Sarah Janesch
About       : Fonction utilitaire générique pour effectuer des requêtes POST avec 
              Axios, traitant les réponses JSON ou images, via une interface T,
              sous forme de promesse type T.
====================================================================================
------------------------------------------------------------------------------------
*/

import { IP_SERVER } from "@/constants";
import axios, { AxiosResponse } from "axios";

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

