import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-avadhut.firebaseio.com/"
});

export default instance;
