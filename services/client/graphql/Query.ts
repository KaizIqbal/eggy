import gql from "graphql-tag";

// Query For fetch Egg by id
const EGG_QUERY = gql`
  query egg($eggname: String!) {
    egg(where: { eggname: $eggname }) {
      id
      title
      eggname
    }
  }
`;

// Query For fetch Flavor by id
const FLAVOR_QUERY = gql`
  query flavor($eggname: String!, $flavorname: String!) {
    flavor(eggname: $eggname, flavorname: $flavorname) {
      id
      name
    }
  }
`;

// Query For fetch Cursor by id
const CURSOR_QUERY = gql`
  query cursor($eggname: String!, $flavorname: String!, $cursorname: String!) {
    cursor(
      eggname: $eggname
      flavorname: $flavorname
      cursorname: $cursorname
    ) {
      id
      name
      frames
    }
  }
`;

// Query For fetch Cursors
const CURSORS_QUERY = gql`
  query cursors($flavorname: String!) {
    cursors(flavorname: $flavorname) {
      id
      name
      frames
    }
  }
`;

// Query For fetch all Flavours in Egg
const FLAVORS_QUERY = gql`
  query flavors($eggname: String!) {
    flavors(eggname: $eggname) {
      id
      name
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
          eggname
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
  FLAVOR_QUERY,
  CURSOR_QUERY,
  CURSORS_QUERY,
  FLAVORS_QUERY,
  GET_EGGS_CURSOR,
  GET_USER_EGGS_CURSOR,
  ME_QUERY,
  ALL_USER_QUERY
};
