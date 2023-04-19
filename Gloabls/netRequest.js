import { request, GraphQLClient, gql } from 'graphql-request';

// const endpoint = "http://192.168.1.2:5005/";
const endpoint = "http://10.160.15.80:5005/";
export const client = new GraphQLClient(endpoint, { headers: {} });

export const DISHES_QUERY = gql`
  query {
    dishes {
      image
      name
      description
      price
      id
      type
    }
  }
`;

export const SINGLE_DISH_QUERY = gql`
  query ($dishId: ID!) {
    getDish(id: $dishId) {
      image
      name
      description
      price
    }
  }
`;
