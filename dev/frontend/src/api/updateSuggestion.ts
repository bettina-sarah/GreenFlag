import fetchData from "./fetchData";

interface SuggestionData {
  suggestion_id: string
  choice: string
}

export const updateSuggestion = async (suggestion_id: string, choice: string) => {
  const data = {  suggestion_id: suggestion_id,
    choice: choice}
    try {
          const response = await fetchData<SuggestionData>("/update-suggestion", data);
          if(response){
            return true;
          }
        }
    catch (error) {
      console.error("Error updating suggestion:", error);
    }
  };