import axios from "axios";
import formatData from "../utils/formatData";
const getQuizdata = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );

    const data = formatData(response.data.results);
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    
    if (error.response?.status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.");
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("Failed to load quiz questions. Please try again.");
    }
  }
};

export default getQuizdata;

