import gql from "graphql-tag";

// ################################################ AUTH MUTATIONS ################################################

// ##### SIGNUP #####

const SIGNUP_MUTATION = gql`
  mutation signup(
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

// ##### SIGNIN #####

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

// ##### SIGNOUT #####

const SIGNOUT_MUTATION = gql`
  mutation signOut {
    signout {
      message
    }
  }
`;

// ##### REQUEST FOR RESET PASSWORD #####

const REQUEST_RESET_MUTATION = gql`
  mutation requestReset($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

// ##### RESET PASSWORD #####

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

// ##### UPDATE USER'S PERMISSIONS #####

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

// ################################################ EGG MUTATIONS ################################################

// ##### CREATE #####

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

// ##### UPDATE #####

const UPDATE_EGG_MUTATION = gql`
  mutation updateEgg($eggname: String!, $title: String!) {
    updateEgg(eggname: $eggname, title: $title) {
      id
    }
  }
`;

// ##### DELETE #####

const DELETE_EGG_MUTATION = gql`
  mutation deleteEgg($eggname: String!) {
    deleteEgg(eggname: $eggname) {
      id
    }
  }
`;

// ##### PUBLISH #####

const PUBLISH_EGG_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
    }
  }
`;

// ##### UNPUBLISH #####

const UNPUBLISH_EGG_MUTATION = gql`
  mutation unPublish($id: ID!) {
    unPublish(id: $id) {
      id
    }
  }
`;

// ################################################ FLAVOR MUTATIONS ################################################

// ##### CREATE #####

const CREATE_FLAVOR_MUTATION = gql`
  mutation createFlavor($name: String!, $eggId: ID!) {
    createFlavor(name: $name, eggId: $eggId) {
      id
    }
  }
`;

// ##### UPDATE #####

const UPDATE_FLAVOR_MUTATION = gql`
  mutation updateFlavor($id: ID!, $name: String!) {
    updateFlavor(id: $id, name: $name) {
      id
    }
  }
`;

// ##### DELETE #####

const DELETE_FLAVOR_MUTATION = gql`
  mutation deleteFlavor($id: ID!) {
    deleteFlavor(id: $id) {
      id
    }
  }
`;

// ################################################ CURSOR MUTATIONS ################################################

// ##### CREATE #####

const CREATE_CURSOR_MUTATION = gql`
  mutation createCursor($name: cursorName!, $frames: Int!, $flavorId: ID!) {
    createCursor(name: $name, frames: $frames, flavorId: $flavorId) {
      id
    }
  }
`;

// ##### DELETE #####

const DELETE_CURSOR_MUTATION = gql`
  mutation deleteCursor($id: ID!) {
    deleteCursor(id: $id) {
      id
    }
  }
`;

// ##### RENAME CURSOR #####

const RENAME_CURSOR_MUTATION = gql`
  mutation reanameCursor($id: ID!, $flavorId: ID!, $name: cursorName!) {
    renameCursor(id: $id, flavorId: $flavorId, name: $name) {
      id
    }
  }
`;

// ################################################ FILE MUTATIONS ################################################

// ##### SINGLE UPLOAD #####

const UPLOAD_MUTATION = gql`
  mutation uploadFile($file: Upload!, $cursorId: ID!) {
    uploadFile(file: $file, cursorId: $cursorId) {
      id
    }
  }
`;

const DELETE_FILE_MUTATION = gql`
  mutation deleteFile($fileId: ID!) {
    deleteFile(fileId: $fileId) {
      id
    }
  }
`;

export {
  // Auth
  SIGNUP_MUTATION,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  REQUEST_RESET_MUTATION,
  RESET_PASSWORD_MUTATION,
  UPDATE_PERMISSION_MUTATION,
  // Egg
  CREATE_EGG_MUTATION,
  DELETE_EGG_MUTATION,
  UPDATE_EGG_MUTATION,
  PUBLISH_EGG_MUTATION,
  UNPUBLISH_EGG_MUTATION,
  // Flavor
  CREATE_FLAVOR_MUTATION,
  UPDATE_FLAVOR_MUTATION,
  DELETE_FLAVOR_MUTATION,
  // Cursor
  CREATE_CURSOR_MUTATION,
  DELETE_CURSOR_MUTATION,
  RENAME_CURSOR_MUTATION,
  // File
  UPLOAD_MUTATION,
  DELETE_FILE_MUTATION
};
