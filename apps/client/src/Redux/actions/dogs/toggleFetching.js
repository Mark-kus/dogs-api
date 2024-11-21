import axios from "axios";
import { TOGGLE_FETCHING } from "../../types";

const toggleFetching = () => {
  axios.get("/")
  return {
    type: TOGGLE_FETCHING,
  };
};

export default toggleFetching;
