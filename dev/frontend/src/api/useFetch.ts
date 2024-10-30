import { useEffect, useState } from "react";
import fetchData from "./fetchProfile";

interface IUseFetch {
  url: string;
  data: any;
}

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
  }, []); // dependencies array to track the things that the useEffect depends on and would need to run again if the dependencies change.
  // url, incomingData

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
