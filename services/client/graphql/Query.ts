import gql from "graphql-tag";

// Query For fetch Egg by id
const EGG_QUERY = gql`
  query egg($id: ID!) {
    egg(where: { id: $id }) {
      id
      title
    }
  }
`;

//For Fetching all Eggs
const EGGS_QUERY = gql`
  query eggs {
    eggs {
      id
      title
    }
  }
`;

//For get count of eggs
const PAGINATION_QUERY = gql`
  query page {
    eggsConnection {
      aggregate {
        count
      }
    }
  }
`;

export { EGG_QUERY, EGGS_QUERY, PAGINATION_QUERY };
