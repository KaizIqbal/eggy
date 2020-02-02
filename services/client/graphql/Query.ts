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

//For get eggs based on cursor
const GET_EGGS_CURSOR = gql`
  query eggs($first: Int = 7, $cursor: String) {
    publishedEggsConnection(first: $first, after: $cursor) {
      edges {
        node {
          id
          title
          cursorTypes
          user {
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

//For get eggs based on cursor
const GET_USER_EGGS_CURSOR = gql`
  query eggs($first: Int = 7, $cursor: String) {
    userEggsConnection(first: $first, after: $cursor) {
      edges {
        node {
          id
          title
          isPublished
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
//For me
const ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      username
    }
  }
`;

// For all users
const ALL_USER_QUERY = gql`
  query users {
    users {
      id
      name
      email
      permissions
    }
  }
`;

export {
  EGG_QUERY,
  GET_EGGS_CURSOR,
  GET_USER_EGGS_CURSOR,
  ME_QUERY,
  ALL_USER_QUERY
};
