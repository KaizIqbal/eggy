import gql from "graphql-tag";

// Mutation for createEgg
const CREATE_EGG_MUTATION = gql`
  mutation createEgg(
    $eggname: String!
    $title: String!
    $cursorTypes: [cursorType]!
  ) {
    createEgg(eggname: $eggname, title: $title, cursorTypes: $cursorTypes) {
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
  mutation updateEgg($eggname: String!, $title: String!) {
    updateEgg(eggname: $eggname, title: $title) {
      id
    }
  }
`;

// Mutation for Publishing Egg
const PUBLISH_EGG_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
    }
  }
`;

// Mutation for Unpublishing Egg
const UNPUBLISH_EGG_MUTATION = gql`
  mutation unPublish($id: ID!) {
    unPublish(id: $id) {
      id
    }
  }
`;

// Mutation for Signup user

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
  ) {
    signup(
      email: $email
      name: $name
      username: $username
      password: $password
    ) {
      id
    }
  }
`;

// Mutation for Login user

const SIGNIN_MUTATION = gql`
  mutation sigIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

// Mutation for Login user

const SIGNOUT_MUTATION = gql`
  mutation signOut {
    signout {
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

// Update User permissions
const UPDATE_PERMISSION_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

export {
  CREATE_EGG_MUTATION,
  DELETE_EGG_MUTATION,
  UPDATE_EGG_MUTATION,
  PUBLISH_EGG_MUTATION,
  UNPUBLISH_EGG_MUTATION,
  SIGNUP_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  REQUEST_RESET_MUTATION,
  RESET_PASSWORD_MUTATION,
  UPDATE_PERMISSION_MUTATION
};
