// import { request, GraphQLClient, gql } from 'graphql-request';

// import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
  uri: "https://whats-menu-server.vercel.app/api",
  // uri:"http://localhost:5005/api",
  // uri:"http://192.168.8.101:5005/api",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


// const endpoint = "https://whats-menu-server.vercel.app/api";
// export const client = new GraphQLClient(endpoint, { headers: {} });

export const DISHES_QUERY = gql`
  query {
    dishes {
      image
      name
      description
      price
      id
      type {
        title
        alias
      }
    }
  }
`;

// export const SINGLE_DISH_QUERY = gql`
//   query ($dishId: ID!) {
//     getDish(id: $dishId) {
//       image
//       name
//       description
//       price
//     }
//   }
// `;
