/*
------------------------------------------------------------------------------------
====================================================================================
Fichier     : useTriggerFetch.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Hook personnalisé et générique permettant de déclencher des requêtes 
              HTTP avec `fetchData` à l'aide d'une variable `trigger`. Gère les états 
              de chargement, d'erreur, et de données typées (T), et réinitialise les 
              données à chaque déclenchement.
====================================================================================
------------------------------------------------------------------------------------
*/

import { useEffect, useState } from "react";
import fetchData from "./fetchData";
import { IUseFetch } from "@/interfaces/interfaces";

const useTriggerFetch = <T extends any[]>(
  { url, data: incomingData }: IUseFetch,
  trigger: number
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetchData<T>(url, incomingData)
      .then((data) => {
        setData(data);
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
