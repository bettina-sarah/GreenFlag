import { useEffect, useState } from "react";
import fetchData from "./fetchData";

interface IUseFetch {
  url: string;
  data: any;
}

const useTriggerFetch = <T extends any[]>( // or just <T>
  { url, data: incomingData }: IUseFetch,
  trigger: number
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true); // this is how you use a generic, useState can accept a generic type to help type hint

  useEffect(() => {
    setLoading(true);
    setData(null); // in case of stale state?
    fetchData<T>(url, incomingData)
      .then((data) => {
        // setData(data);
        setData(data); // No need for spread operator if newData is already an array
        console.log("data", data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trigger]);

  return {
    data,
    loading,
    error,
  };
};

export default useTriggerFetch;
