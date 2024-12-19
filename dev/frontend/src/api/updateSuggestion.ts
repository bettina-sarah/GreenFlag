/*
------------------------------------------------------------------------------------
Fichier     : updateSuggestion.ts
Créé par    : Bettina-Sarah Janesch
Résumé      : Fonction spécifique pour mettre à jour une suggestion en envoyant 
              des données typées `SuggestionData` à un endpoint via `updateData`.
------------------------------------------------------------------------------------
*/

import { updateData } from "./updateData";
import { SuggestionData } from "@/interfaces/interfaces";

export const updateSuggestion = async (
  suggestion_id: string,
  choice: string
) => {
  const data: SuggestionData = { suggestion_id, choice };
  const endpoint = "/update-suggestion";
  return await updateData<SuggestionData>(endpoint, data);
};
