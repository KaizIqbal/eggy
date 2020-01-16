import gql from "graphql-tag";

// Mutation for createEgg
const CREATE_EGG_MUTATION = gql`
  mutation createEgg($title: String!) {
    createEgg(title: $title) {
      id
    }
  }
`;

// Mutation for DeleteEgg
const DELETE_EGG_MUTATION = gql`
  mutation deleteEgg($id: ID!) {
    deleteEgg(id: $id) {
      id
    }
  }
`;

// Mutation for UpdateEgg
const UPDATE_EGG_MUTATION = gql`
  mutation updateEgg($id: ID!, $title: String!) {
    updateEgg(id: $id, title: $title) {
      id
    }
  }
`;

// Mutation for Signup user

const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      email
      name
      password
      permission
    }
  }
`;

export {
  CREATE_EGG_MUTATION,
  DELETE_EGG_MUTATION,
  UPDATE_EGG_MUTATION,
  SIGNUP_MUTATION
};
