// import { request, GraphQLClient, gql } from 'graphql-request';

// import { useQuery, gql } from "@apollo/client";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import { createHttpLink } from "apollo-link-http";

// const httpLink = createHttpLink({
//   uri: "https://whats-menu-server.vercel.app/api",
//   // uri:"http://192.168.8.101:5005/api",
// });

// export const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });
import { gql}  from 'graphql-request';


export const DISHES_QUERY = gql`
  query {
    dishes {
      id
      image
      name
      description
      price
      dishType {
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
