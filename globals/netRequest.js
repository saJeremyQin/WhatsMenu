import { request, gql } from 'graphql-request';
export const GRAPHQL_ENDPOINT = "https://whats-menu-server.vercel.app/api";

export const DISHES_QUERY = gql`
  query {
    dishes {
      id
      image
      name
      description
      price
      dishType {
        name
        alias
      }
    }
  }
`;

