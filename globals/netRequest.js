// import { request, GraphQLClient, gql } from 'graphql-request';

// import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
  // uri: "https://whats-menu-server.vercel.app/api",
  uri: "https://ixyse3o5b5epbn6fu3gi3wrxki.appsync-api.ap-southeast-2.amazonaws.com/graphql",
  headers: {
    'x-api-key': 'da2-finw46n22zcrnjbykuoen4rhse'
  }
  // uri:"http://192.168.8.101:5005/api",
});

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     headers: {
//       'x-api-key': 'da2-y43yn2ltxbgxzon65yyml3noky',
//     }
//   });
//   return forward(operation);
// });

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
