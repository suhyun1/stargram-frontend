import {gql} from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      firstName
      lastName
      bio
      email
    }
  }
`;