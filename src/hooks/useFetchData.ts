import { useQuery } from "react-query";
import axios from "axios";

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFetchData = (dataUrl) => {
  return useQuery(["data", dataUrl], () => fetchData(dataUrl));
};
