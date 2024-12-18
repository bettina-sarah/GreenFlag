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
