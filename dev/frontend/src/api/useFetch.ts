import { useEffect, useState } from "react";
import fetchData from "./fetchData";
import { IUseFetch } from "@/interfaces/interfaces";
// added dependencies array, trigger to param & interface

const useFetch = <T>({ url, data: incomingData }: IUseFetch) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true); // this is how you use a generic, useState can accept a generic type to help type hint

  useEffect(() => {
    setLoading(true);
    fetchData<T>(url, incomingData)
      .then((data) => {
        setData(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
