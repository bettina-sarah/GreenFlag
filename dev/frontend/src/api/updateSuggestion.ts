// import fetchData from "./fetchData";

import { updateData } from "./updateData";

// interface SuggestionData {
//   suggestion_id: string
//   choice: string
// }

// export const updateSuggestion = async (suggestion_id: string, choice: string) => {
//   const data = {  suggestion_id: suggestion_id,
//     choice: choice}
//     try {
//           const response = await fetchData<SuggestionData>("/update-suggestion", data);
//           if(response){
//             return true;
//           }
//         }
//     catch (error) {
//       console.error("Error updating suggestion:", error);
//     }
//   };

interface SuggestionData {
  suggestion_id: string;
  choice: string;
}

export const updateSuggestion = async (
  suggestion_id: string,
  choice: string
) => {
  const data: SuggestionData = { suggestion_id, choice };
  const endpoint = "/update-suggestion";
  return await updateData<SuggestionData>(endpoint, data);
};
