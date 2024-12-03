import fetchData from "./fetchData";

export const updateData = async <T>(endpoint: string, data: T): Promise<boolean> => {
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