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
      id
      email
      name
      password
      permission
    }
  }
`;

// Mutation for Login user

const LOGIN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

// Mutation for Login user

const LOGOUT_MUTATION = gql`
  mutation logOut {
    logout {
      message
    }
  }
`;

// Mutation for Request reset token

const REQUEST_RESET_MUTATION = gql`
  mutation requestReset($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

// Mutation for Request reset token

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

export {
  CREATE_EGG_MUTATION,
  DELETE_EGG_MUTATION,
  UPDATE_EGG_MUTATION,
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REQUEST_RESET_MUTATION,
  RESET_PASSWORD_MUTATION
};
