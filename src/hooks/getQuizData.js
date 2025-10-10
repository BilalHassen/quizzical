import axios from "axios";
import formatData from "../utils/formatData";
const getQuizdata = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );

    const data = formatData(response.data.results)

   console.log(data)

   return data
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};

export default getQuizdata;

