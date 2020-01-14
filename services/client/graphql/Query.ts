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

//For get eggs based on cursor
const GET_EGGS_CURSOR = gql`
  query eggs($first: Int = 7, $cursor: String) {
    eggsConnection(first: $first, after: $cursor) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export { EGG_QUERY, EGGS_QUERY, GET_EGGS_CURSOR };
