import axios from "axios";

const TOKEN = "cj902epr01qjjsj7k6r0cj902epr01qjjsj7k6rg";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
