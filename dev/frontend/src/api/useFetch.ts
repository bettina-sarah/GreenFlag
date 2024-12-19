/*
------------------------------------------------------------------------------------
Fichier     : useFetch.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Hook personnalisé et générique pour effectuer des requêtes HTTP avec 
              `fetchData`. Gère les états de chargement, d'erreur et de données 
              typées (T), adapté aux composants React.
------------------------------------------------------------------------------------
*/

import { useEffect, useState } from "react";
import fetchData from "./fetchData";
import { IUseFetch } from "@/interfaces/interfaces";

const useFetch = <T>({ url, data: incomingData }: IUseFetch) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

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
