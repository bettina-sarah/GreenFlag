/*
------------------------------------------------------------------------------------
====================================================================================
Fichier     : updateData.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Fonction générique pour envoyer des données typées (T) à un endpoint 
              via `fetchData` et retourner un booléen indiquant le succès ou l'échec 
              de l'opération.
====================================================================================
------------------------------------------------------------------------------------
*/

import fetchData from "./fetchData";

export const updateData = async <T>(
  endpoint: string,
  data: T
): Promise<boolean> => {
  try {
    const response = await fetchData<T>(endpoint, data);
    if (response) {
      return true;
    }
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    return false;
  }
  return false;
};
