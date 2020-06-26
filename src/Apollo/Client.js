import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";
console.log(process.env.NODE_ENV);
export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://stargram-backend.herokuapp.com/",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});