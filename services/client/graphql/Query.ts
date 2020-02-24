import gql from "graphql-tag";

// ################################################ USER QUERIES ################################################

// ##### ME! #####

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

// ##### FETCH USERS #####

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

// ################################################ EGG QUERIES ################################################

// ##### FETCH SINGLE EGG #####

const EGG_QUERY = gql`
  query egg($eggname: String!) {
    egg(where: { eggname: $eggname }) {
      id
      title
      eggname
    }
  }
`;

// ##### FETCH PUBLISHED EGGS / PUBLIC EGG #####

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

// ##### FETCH USER'S EGG #####

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

// ################################################ FLAVOR QUERIES ################################################

// ##### FETCH SINGLE FLAVOR #####

const FLAVOR_QUERY = gql`
  query flavor($eggname: String!, $flavorname: String!) {
    flavor(eggname: $eggname, flavorname: $flavorname) {
      id
      name
    }
  }
`;

// ##### FETCH ALL FLAVORS INSIDE EGG #####

const FLAVORS_QUERY = gql`
  query flavors($eggname: String!) {
    flavors(eggname: $eggname) {
      id
      name
    }
  }
`;

// ################################################ CURSOR QUERIES ################################################

// ##### FETCH SINGLE CURSOR #####

const CURSOR_QUERY = gql`
  query cursor(
    $eggname: String!
    $flavorname: String!
    $cursorname: cursorName!
  ) {
    cursor(
      eggname: $eggname
      flavorname: $flavorname
      cursorname: $cursorname
    ) {
      id
      name
      frames
      flavor {
        id
      }
      source {
        id
        url
      }
    }
  }
`;

// ##### FETCH ALL CURSOR INSIDE FLAVOR #####

const CURSORS_QUERY = gql`
  query cursors($flavorname: String!) {
    cursors(flavorname: $flavorname) {
      id
      name
      frames
    }
  }
`;

export {
  // User
  ME_QUERY,
  ALL_USER_QUERY,
  // Egg
  EGG_QUERY,
  GET_EGGS_CURSOR,
  GET_USER_EGGS_CURSOR,
  // Flavor
  FLAVOR_QUERY,
  FLAVORS_QUERY,
  // Cursor
  CURSOR_QUERY,
  CURSORS_QUERY
};
