import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AggregateEgg = {
   __typename?: 'AggregateEgg';
  count: Scalars['Int'];
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type Cursor = Node & {
   __typename?: 'Cursor';
  id: Scalars['ID'];
  name: CursorName;
  frames: Scalars['Int'];
  flavor: Flavor;
  source?: Maybe<File>;
};

export enum CursorName {
  Default = 'Default',
  X11 = 'X11',
  Wayland = 'Wayland'
}

export enum CursorOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  FramesAsc = 'frames_ASC',
  FramesDesc = 'frames_DESC'
}

export type CursorWhereInput = {
  AND?: Maybe<Array<CursorWhereInput>>;
  OR?: Maybe<Array<CursorWhereInput>>;
  NOT?: Maybe<Array<CursorWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<CursorName>;
  name_not?: Maybe<CursorName>;
  name_in?: Maybe<Array<CursorName>>;
  name_not_in?: Maybe<Array<CursorName>>;
  frames?: Maybe<Scalars['Int']>;
  frames_not?: Maybe<Scalars['Int']>;
  frames_in?: Maybe<Array<Scalars['Int']>>;
  frames_not_in?: Maybe<Array<Scalars['Int']>>;
  frames_lt?: Maybe<Scalars['Int']>;
  frames_lte?: Maybe<Scalars['Int']>;
  frames_gt?: Maybe<Scalars['Int']>;
  frames_gte?: Maybe<Scalars['Int']>;
  flavor?: Maybe<FlavorWhereInput>;
  source?: Maybe<FileWhereInput>;
};


export type Egg = Node & {
   __typename?: 'Egg';
  id: Scalars['ID'];
  title: Scalars['String'];
  eggname: Scalars['String'];
  isPublished: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  platforms: Array<Platform>;
  user: User;
  flavors?: Maybe<Array<Flavor>>;
};


export type EggFlavorsArgs = {
  where?: Maybe<FlavorWhereInput>;
  orderBy?: Maybe<FlavorOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type EggConnection = {
   __typename?: 'EggConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<EggEdge>>;
  aggregate: AggregateEgg;
};

export type EggEdge = {
   __typename?: 'EggEdge';
  node: Egg;
  cursor: Scalars['String'];
};

export type EggWhereInput = {
  AND?: Maybe<Array<EggWhereInput>>;
  OR?: Maybe<Array<EggWhereInput>>;
  NOT?: Maybe<Array<EggWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_not_in?: Maybe<Array<Scalars['String']>>;
  title_lt?: Maybe<Scalars['String']>;
  title_lte?: Maybe<Scalars['String']>;
  title_gt?: Maybe<Scalars['String']>;
  title_gte?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_starts_with?: Maybe<Scalars['String']>;
  title_not_starts_with?: Maybe<Scalars['String']>;
  title_ends_with?: Maybe<Scalars['String']>;
  title_not_ends_with?: Maybe<Scalars['String']>;
  eggname?: Maybe<Scalars['String']>;
  eggname_not?: Maybe<Scalars['String']>;
  eggname_in?: Maybe<Array<Scalars['String']>>;
  eggname_not_in?: Maybe<Array<Scalars['String']>>;
  eggname_lt?: Maybe<Scalars['String']>;
  eggname_lte?: Maybe<Scalars['String']>;
  eggname_gt?: Maybe<Scalars['String']>;
  eggname_gte?: Maybe<Scalars['String']>;
  eggname_contains?: Maybe<Scalars['String']>;
  eggname_not_contains?: Maybe<Scalars['String']>;
  eggname_starts_with?: Maybe<Scalars['String']>;
  eggname_not_starts_with?: Maybe<Scalars['String']>;
  eggname_ends_with?: Maybe<Scalars['String']>;
  eggname_not_ends_with?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  isPublished_not?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserWhereInput>;
  flavors_every?: Maybe<FlavorWhereInput>;
  flavors_some?: Maybe<FlavorWhereInput>;
  flavors_none?: Maybe<FlavorWhereInput>;
};

export type EggWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  eggname?: Maybe<Scalars['String']>;
};

export type File = Node & {
   __typename?: 'File';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
  cursor: Cursor;
};

export type FileWhereInput = {
  AND?: Maybe<Array<FileWhereInput>>;
  OR?: Maybe<Array<FileWhereInput>>;
  NOT?: Maybe<Array<FileWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  key?: Maybe<Scalars['String']>;
  key_not?: Maybe<Scalars['String']>;
  key_in?: Maybe<Array<Scalars['String']>>;
  key_not_in?: Maybe<Array<Scalars['String']>>;
  key_lt?: Maybe<Scalars['String']>;
  key_lte?: Maybe<Scalars['String']>;
  key_gt?: Maybe<Scalars['String']>;
  key_gte?: Maybe<Scalars['String']>;
  key_contains?: Maybe<Scalars['String']>;
  key_not_contains?: Maybe<Scalars['String']>;
  key_starts_with?: Maybe<Scalars['String']>;
  key_not_starts_with?: Maybe<Scalars['String']>;
  key_ends_with?: Maybe<Scalars['String']>;
  key_not_ends_with?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  filename_not?: Maybe<Scalars['String']>;
  filename_in?: Maybe<Array<Scalars['String']>>;
  filename_not_in?: Maybe<Array<Scalars['String']>>;
  filename_lt?: Maybe<Scalars['String']>;
  filename_lte?: Maybe<Scalars['String']>;
  filename_gt?: Maybe<Scalars['String']>;
  filename_gte?: Maybe<Scalars['String']>;
  filename_contains?: Maybe<Scalars['String']>;
  filename_not_contains?: Maybe<Scalars['String']>;
  filename_starts_with?: Maybe<Scalars['String']>;
  filename_not_starts_with?: Maybe<Scalars['String']>;
  filename_ends_with?: Maybe<Scalars['String']>;
  filename_not_ends_with?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  mimetype_not?: Maybe<Scalars['String']>;
  mimetype_in?: Maybe<Array<Scalars['String']>>;
  mimetype_not_in?: Maybe<Array<Scalars['String']>>;
  mimetype_lt?: Maybe<Scalars['String']>;
  mimetype_lte?: Maybe<Scalars['String']>;
  mimetype_gt?: Maybe<Scalars['String']>;
  mimetype_gte?: Maybe<Scalars['String']>;
  mimetype_contains?: Maybe<Scalars['String']>;
  mimetype_not_contains?: Maybe<Scalars['String']>;
  mimetype_starts_with?: Maybe<Scalars['String']>;
  mimetype_not_starts_with?: Maybe<Scalars['String']>;
  mimetype_ends_with?: Maybe<Scalars['String']>;
  mimetype_not_ends_with?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
  encoding_not?: Maybe<Scalars['String']>;
  encoding_in?: Maybe<Array<Scalars['String']>>;
  encoding_not_in?: Maybe<Array<Scalars['String']>>;
  encoding_lt?: Maybe<Scalars['String']>;
  encoding_lte?: Maybe<Scalars['String']>;
  encoding_gt?: Maybe<Scalars['String']>;
  encoding_gte?: Maybe<Scalars['String']>;
  encoding_contains?: Maybe<Scalars['String']>;
  encoding_not_contains?: Maybe<Scalars['String']>;
  encoding_starts_with?: Maybe<Scalars['String']>;
  encoding_not_starts_with?: Maybe<Scalars['String']>;
  encoding_ends_with?: Maybe<Scalars['String']>;
  encoding_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Scalars['String']>>;
  url_not_in?: Maybe<Array<Scalars['String']>>;
  url_lt?: Maybe<Scalars['String']>;
  url_lte?: Maybe<Scalars['String']>;
  url_gt?: Maybe<Scalars['String']>;
  url_gte?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_starts_with?: Maybe<Scalars['String']>;
  url_not_starts_with?: Maybe<Scalars['String']>;
  url_ends_with?: Maybe<Scalars['String']>;
  url_not_ends_with?: Maybe<Scalars['String']>;
  cursor?: Maybe<CursorWhereInput>;
};

export type Flavor = Node & {
   __typename?: 'Flavor';
  id: Scalars['ID'];
  name: Scalars['String'];
  egg: Egg;
  cursors?: Maybe<Array<Cursor>>;
};


export type FlavorCursorsArgs = {
  where?: Maybe<CursorWhereInput>;
  orderBy?: Maybe<CursorOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum FlavorOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC'
}

export type FlavorWhereInput = {
  AND?: Maybe<Array<FlavorWhereInput>>;
  OR?: Maybe<Array<FlavorWhereInput>>;
  NOT?: Maybe<Array<FlavorWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  egg?: Maybe<EggWhereInput>;
  cursors_every?: Maybe<CursorWhereInput>;
  cursors_some?: Maybe<CursorWhereInput>;
  cursors_none?: Maybe<CursorWhereInput>;
};

export type Mutation = {
   __typename?: 'Mutation';
  uploadFile: File;
  deleteFile: File;
  createEgg: Egg;
  updateEgg: Egg;
  renameEgg: Egg;
  deleteEgg: Egg;
  publish: Egg;
  unPublish: Egg;
  createCursor: Cursor;
  updateCursor: Cursor;
  renameCursor: Cursor;
  deleteCursor: Flavor;
  createFlavor: Flavor;
  updateFlavor: Flavor;
  deleteFlavor: Flavor;
  signup: AuthPayload;
  signin: AuthPayload;
  signout?: Maybe<SuccessMessage>;
  revokeRefreshTokenForUser: User;
  resetPasswordRequest?: Maybe<SuccessMessage>;
  resetPassword: AuthPayload;
  updatePermissions?: Maybe<User>;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  cursorId: Scalars['ID'];
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['ID'];
};


export type MutationCreateEggArgs = {
  title: Scalars['String'];
  platforms: Array<Maybe<Platform>>;
};


export type MutationUpdateEggArgs = {
  id: Scalars['ID'];
  platforms: Array<Maybe<Platform>>;
};


export type MutationRenameEggArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationDeleteEggArgs = {
  id: Scalars['ID'];
};


export type MutationPublishArgs = {
  id: Scalars['ID'];
};


export type MutationUnPublishArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCursorArgs = {
  name: CursorName;
  frames: Scalars['Int'];
  flavorId: Scalars['ID'];
};


export type MutationUpdateCursorArgs = {
  id: Scalars['ID'];
  name: CursorName;
  frames: Scalars['Int'];
};


export type MutationRenameCursorArgs = {
  id: Scalars['ID'];
  flavorId: Scalars['ID'];
  name: CursorName;
};


export type MutationDeleteCursorArgs = {
  id: Scalars['ID'];
};


export type MutationCreateFlavorArgs = {
  name: Scalars['String'];
  eggId: Scalars['ID'];
};


export type MutationUpdateFlavorArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationDeleteFlavorArgs = {
  id: Scalars['ID'];
};


export type MutationSignupArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['ID'];
};


export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationUpdatePermissionsArgs = {
  permissions?: Maybe<Array<Maybe<Permission>>>;
  userId: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export enum Permission {
  Admin = 'ADMIN',
  User = 'USER',
  Eggcreate = 'EGGCREATE',
  Eggupdate = 'EGGUPDATE',
  Eggdelete = 'EGGDELETE',
  Permissionupdate = 'PERMISSIONUPDATE'
}

export enum Platform {
  Window = 'WINDOW',
  Linux = 'LINUX'
}

export type Query = {
   __typename?: 'Query';
  egg?: Maybe<Egg>;
  publicBasket: EggConnection;
  userBasket: EggConnection;
  cursor?: Maybe<Cursor>;
  cursors: Array<Maybe<Cursor>>;
  flavor?: Maybe<Flavor>;
  flavors: Array<Maybe<Flavor>>;
  me?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryEggArgs = {
  where: EggWhereUniqueInput;
};


export type QueryPublicBasketArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryUserBasketArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryCursorArgs = {
  eggname: Scalars['String'];
  flavorname: Scalars['String'];
  cursorname: CursorName;
};


export type QueryCursorsArgs = {
  flavorname: Scalars['String'];
};


export type QueryFlavorArgs = {
  eggname: Scalars['String'];
  flavorname: Scalars['String'];
};


export type QueryFlavorsArgs = {
  eggname: Scalars['String'];
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']>;
};


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  permissions: Array<Permission>;
  tokenVersion: Scalars['Int'];
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  firstName_not?: Maybe<Scalars['String']>;
  firstName_in?: Maybe<Array<Scalars['String']>>;
  firstName_not_in?: Maybe<Array<Scalars['String']>>;
  firstName_lt?: Maybe<Scalars['String']>;
  firstName_lte?: Maybe<Scalars['String']>;
  firstName_gt?: Maybe<Scalars['String']>;
  firstName_gte?: Maybe<Scalars['String']>;
  firstName_contains?: Maybe<Scalars['String']>;
  firstName_not_contains?: Maybe<Scalars['String']>;
  firstName_starts_with?: Maybe<Scalars['String']>;
  firstName_not_starts_with?: Maybe<Scalars['String']>;
  firstName_ends_with?: Maybe<Scalars['String']>;
  firstName_not_ends_with?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  lastName_not?: Maybe<Scalars['String']>;
  lastName_in?: Maybe<Array<Scalars['String']>>;
  lastName_not_in?: Maybe<Array<Scalars['String']>>;
  lastName_lt?: Maybe<Scalars['String']>;
  lastName_lte?: Maybe<Scalars['String']>;
  lastName_gt?: Maybe<Scalars['String']>;
  lastName_gte?: Maybe<Scalars['String']>;
  lastName_contains?: Maybe<Scalars['String']>;
  lastName_not_contains?: Maybe<Scalars['String']>;
  lastName_starts_with?: Maybe<Scalars['String']>;
  lastName_not_starts_with?: Maybe<Scalars['String']>;
  lastName_ends_with?: Maybe<Scalars['String']>;
  lastName_not_ends_with?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  username_not?: Maybe<Scalars['String']>;
  username_in?: Maybe<Array<Scalars['String']>>;
  username_not_in?: Maybe<Array<Scalars['String']>>;
  username_lt?: Maybe<Scalars['String']>;
  username_lte?: Maybe<Scalars['String']>;
  username_gt?: Maybe<Scalars['String']>;
  username_gte?: Maybe<Scalars['String']>;
  username_contains?: Maybe<Scalars['String']>;
  username_not_contains?: Maybe<Scalars['String']>;
  username_starts_with?: Maybe<Scalars['String']>;
  username_not_starts_with?: Maybe<Scalars['String']>;
  username_ends_with?: Maybe<Scalars['String']>;
  username_not_ends_with?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_not?: Maybe<Scalars['String']>;
  email_in?: Maybe<Array<Scalars['String']>>;
  email_not_in?: Maybe<Array<Scalars['String']>>;
  email_lt?: Maybe<Scalars['String']>;
  email_lte?: Maybe<Scalars['String']>;
  email_gt?: Maybe<Scalars['String']>;
  email_gte?: Maybe<Scalars['String']>;
  email_contains?: Maybe<Scalars['String']>;
  email_not_contains?: Maybe<Scalars['String']>;
  email_starts_with?: Maybe<Scalars['String']>;
  email_not_starts_with?: Maybe<Scalars['String']>;
  email_ends_with?: Maybe<Scalars['String']>;
  email_not_ends_with?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  password?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  password_in?: Maybe<Array<Scalars['String']>>;
  password_not_in?: Maybe<Array<Scalars['String']>>;
  password_lt?: Maybe<Scalars['String']>;
  password_lte?: Maybe<Scalars['String']>;
  password_gt?: Maybe<Scalars['String']>;
  password_gte?: Maybe<Scalars['String']>;
  password_contains?: Maybe<Scalars['String']>;
  password_not_contains?: Maybe<Scalars['String']>;
  password_starts_with?: Maybe<Scalars['String']>;
  password_not_starts_with?: Maybe<Scalars['String']>;
  password_ends_with?: Maybe<Scalars['String']>;
  password_not_ends_with?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  resetToken_not?: Maybe<Scalars['String']>;
  resetToken_in?: Maybe<Array<Scalars['String']>>;
  resetToken_not_in?: Maybe<Array<Scalars['String']>>;
  resetToken_lt?: Maybe<Scalars['String']>;
  resetToken_lte?: Maybe<Scalars['String']>;
  resetToken_gt?: Maybe<Scalars['String']>;
  resetToken_gte?: Maybe<Scalars['String']>;
  resetToken_contains?: Maybe<Scalars['String']>;
  resetToken_not_contains?: Maybe<Scalars['String']>;
  resetToken_starts_with?: Maybe<Scalars['String']>;
  resetToken_not_starts_with?: Maybe<Scalars['String']>;
  resetToken_ends_with?: Maybe<Scalars['String']>;
  resetToken_not_ends_with?: Maybe<Scalars['String']>;
  resetTokenExpiry?: Maybe<Scalars['String']>;
  resetTokenExpiry_not?: Maybe<Scalars['String']>;
  resetTokenExpiry_in?: Maybe<Array<Scalars['String']>>;
  resetTokenExpiry_not_in?: Maybe<Array<Scalars['String']>>;
  resetTokenExpiry_lt?: Maybe<Scalars['String']>;
  resetTokenExpiry_lte?: Maybe<Scalars['String']>;
  resetTokenExpiry_gt?: Maybe<Scalars['String']>;
  resetTokenExpiry_gte?: Maybe<Scalars['String']>;
  resetTokenExpiry_contains?: Maybe<Scalars['String']>;
  resetTokenExpiry_not_contains?: Maybe<Scalars['String']>;
  resetTokenExpiry_starts_with?: Maybe<Scalars['String']>;
  resetTokenExpiry_not_starts_with?: Maybe<Scalars['String']>;
  resetTokenExpiry_ends_with?: Maybe<Scalars['String']>;
  resetTokenExpiry_not_ends_with?: Maybe<Scalars['String']>;
  tokenVersion?: Maybe<Scalars['Int']>;
  tokenVersion_not?: Maybe<Scalars['Int']>;
  tokenVersion_in?: Maybe<Array<Scalars['Int']>>;
  tokenVersion_not_in?: Maybe<Array<Scalars['Int']>>;
  tokenVersion_lt?: Maybe<Scalars['Int']>;
  tokenVersion_lte?: Maybe<Scalars['Int']>;
  tokenVersion_gt?: Maybe<Scalars['Int']>;
  tokenVersion_gte?: Maybe<Scalars['Int']>;
  eggs_every?: Maybe<EggWhereInput>;
  eggs_some?: Maybe<EggWhereInput>;
  eggs_none?: Maybe<EggWhereInput>;
};

export type SignupMutationVariables = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & UserDataFragment
    ) }
  ) }
);

export type SigninMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & UserDataFragment
    ) }
  ) }
);

export type SignOutMutationVariables = {};


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & { signout: Maybe<(
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  )> }
);

export type ResetPasswordRequestMutationVariables = {
  email: Scalars['String'];
};


export type ResetPasswordRequestMutation = (
  { __typename?: 'Mutation' }
  & { resetPasswordRequest: Maybe<(
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  )> }
);

export type ResetPasswordMutationVariables = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
  ) }
);

export type UpdatePermissionsMutationVariables = {
  permissions?: Maybe<Array<Maybe<Permission>>>;
  userId: Scalars['ID'];
};


export type UpdatePermissionsMutation = (
  { __typename?: 'Mutation' }
  & { updatePermissions: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'permissions'>
    & UserDataFragment
  )> }
);

export type PublicBasketQueryVariables = {
  first?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type PublicBasketQuery = (
  { __typename?: 'Query' }
  & { publicBasket: (
    { __typename?: 'EggConnection' }
    & BasketDataFragment
  ) }
);

export type UserBasketQueryVariables = {
  first?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
};


export type UserBasketQuery = (
  { __typename?: 'Query' }
  & { userBasket: (
    { __typename?: 'EggConnection' }
    & BasketDataFragment
  ) }
);

export type EggQueryVariables = {
  eggname: Scalars['String'];
};


export type EggQuery = (
  { __typename?: 'Query' }
  & { egg: Maybe<(
    { __typename?: 'Egg' }
    & EggDataFragment
  )> }
);

export type CreateEggMutationVariables = {
  title: Scalars['String'];
  platforms: Array<Maybe<Platform>>;
};


export type CreateEggMutation = (
  { __typename?: 'Mutation' }
  & { createEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type UpdateEggMutationVariables = {
  id: Scalars['ID'];
  platforms: Array<Maybe<Platform>>;
};


export type UpdateEggMutation = (
  { __typename?: 'Mutation' }
  & { updateEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type RenameEggMutationVariables = {
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type RenameEggMutation = (
  { __typename?: 'Mutation' }
  & { renameEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type DeleteEggMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteEggMutation = (
  { __typename?: 'Mutation' }
  & { deleteEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type PublishMutationVariables = {
  id: Scalars['ID'];
};


export type PublishMutation = (
  { __typename?: 'Mutation' }
  & { publish: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type UnPublishMutationVariables = {
  id: Scalars['ID'];
};


export type UnPublishMutation = (
  { __typename?: 'Mutation' }
  & { unPublish: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username' | 'lastName' | 'firstName'>
);

export type EggDataFragment = (
  { __typename?: 'Egg' }
  & Pick<Egg, 'id' | 'title' | 'eggname' | 'platforms' | 'isPublished'>
  & { user: (
    { __typename?: 'User' }
    & UserDataFragment
  ) }
);

export type BasketDataFragment = (
  { __typename?: 'EggConnection' }
  & { edges: Array<Maybe<(
    { __typename?: 'EggEdge' }
    & { node: (
      { __typename?: 'Egg' }
      & EggDataFragment
    ) }
  )>>, pageInfo: (
    { __typename?: 'PageInfo' }
    & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & UserDataFragment
  )> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<Maybe<(
    { __typename?: 'User' }
    & UserDataFragment
  )>> }
);

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  email
  username
  lastName
  firstName
}
    `;
export const EggDataFragmentDoc = gql`
    fragment EggData on Egg {
  id
  title
  eggname
  platforms
  isPublished
  user {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export const BasketDataFragmentDoc = gql`
    fragment BasketData on EggConnection {
  edges {
    node {
      ...EggData
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${EggDataFragmentDoc}`;
export const SignupDocument = gql`
    mutation signup($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  signup(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
    accessToken
    user {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SigninDocument = gql`
    mutation signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    accessToken
    user {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;
export type SigninMutationFn = ApolloReactCommon.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        return ApolloReactHooks.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, baseOptions);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = ApolloReactCommon.MutationResult<SigninMutation>;
export type SigninMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignOutDocument = gql`
    mutation signOut {
  signout {
    message
  }
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const ResetPasswordRequestDocument = gql`
    mutation resetPasswordRequest($email: String!) {
  resetPasswordRequest(email: $email) {
    message
  }
}
    `;
export type ResetPasswordRequestMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordRequestMutation, { data, loading, error }] = useResetPasswordRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>(ResetPasswordRequestDocument, baseOptions);
      }
export type ResetPasswordRequestMutationHookResult = ReturnType<typeof useResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationResult = ApolloReactCommon.MutationResult<ResetPasswordRequestMutation>;
export type ResetPasswordRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordRequestMutation, ResetPasswordRequestMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
  resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
    accessToken
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetToken: // value for 'resetToken'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdatePermissionsDocument = gql`
    mutation updatePermissions($permissions: [Permission], $userId: ID!) {
  updatePermissions(permissions: $permissions, userId: $userId) {
    ...UserData
    permissions
  }
}
    ${UserDataFragmentDoc}`;
export type UpdatePermissionsMutationFn = ApolloReactCommon.MutationFunction<UpdatePermissionsMutation, UpdatePermissionsMutationVariables>;

/**
 * __useUpdatePermissionsMutation__
 *
 * To run a mutation, you first call `useUpdatePermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePermissionsMutation, { data, loading, error }] = useUpdatePermissionsMutation({
 *   variables: {
 *      permissions: // value for 'permissions'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdatePermissionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePermissionsMutation, UpdatePermissionsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePermissionsMutation, UpdatePermissionsMutationVariables>(UpdatePermissionsDocument, baseOptions);
      }
export type UpdatePermissionsMutationHookResult = ReturnType<typeof useUpdatePermissionsMutation>;
export type UpdatePermissionsMutationResult = ApolloReactCommon.MutationResult<UpdatePermissionsMutation>;
export type UpdatePermissionsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePermissionsMutation, UpdatePermissionsMutationVariables>;
export const PublicBasketDocument = gql`
    query publicBasket($first: Int = 7, $cursor: String) {
  publicBasket(first: $first, after: $cursor) {
    ...BasketData
  }
}
    ${BasketDataFragmentDoc}`;

/**
 * __usePublicBasketQuery__
 *
 * To run a query within a React component, call `usePublicBasketQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicBasketQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicBasketQuery({
 *   variables: {
 *      first: // value for 'first'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePublicBasketQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicBasketQuery, PublicBasketQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicBasketQuery, PublicBasketQueryVariables>(PublicBasketDocument, baseOptions);
      }
export function usePublicBasketLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicBasketQuery, PublicBasketQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicBasketQuery, PublicBasketQueryVariables>(PublicBasketDocument, baseOptions);
        }
export type PublicBasketQueryHookResult = ReturnType<typeof usePublicBasketQuery>;
export type PublicBasketLazyQueryHookResult = ReturnType<typeof usePublicBasketLazyQuery>;
export type PublicBasketQueryResult = ApolloReactCommon.QueryResult<PublicBasketQuery, PublicBasketQueryVariables>;
export const UserBasketDocument = gql`
    query userBasket($first: Int = 7, $cursor: String) {
  userBasket(first: $first, after: $cursor) {
    ...BasketData
  }
}
    ${BasketDataFragmentDoc}`;

/**
 * __useUserBasketQuery__
 *
 * To run a query within a React component, call `useUserBasketQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBasketQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBasketQuery({
 *   variables: {
 *      first: // value for 'first'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserBasketQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserBasketQuery, UserBasketQueryVariables>) {
        return ApolloReactHooks.useQuery<UserBasketQuery, UserBasketQueryVariables>(UserBasketDocument, baseOptions);
      }
export function useUserBasketLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserBasketQuery, UserBasketQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserBasketQuery, UserBasketQueryVariables>(UserBasketDocument, baseOptions);
        }
export type UserBasketQueryHookResult = ReturnType<typeof useUserBasketQuery>;
export type UserBasketLazyQueryHookResult = ReturnType<typeof useUserBasketLazyQuery>;
export type UserBasketQueryResult = ApolloReactCommon.QueryResult<UserBasketQuery, UserBasketQueryVariables>;
export const EggDocument = gql`
    query egg($eggname: String!) {
  egg(where: {eggname: $eggname}) {
    ...EggData
  }
}
    ${EggDataFragmentDoc}`;

/**
 * __useEggQuery__
 *
 * To run a query within a React component, call `useEggQuery` and pass it any options that fit your needs.
 * When your component renders, `useEggQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEggQuery({
 *   variables: {
 *      eggname: // value for 'eggname'
 *   },
 * });
 */
export function useEggQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EggQuery, EggQueryVariables>) {
        return ApolloReactHooks.useQuery<EggQuery, EggQueryVariables>(EggDocument, baseOptions);
      }
export function useEggLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EggQuery, EggQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EggQuery, EggQueryVariables>(EggDocument, baseOptions);
        }
export type EggQueryHookResult = ReturnType<typeof useEggQuery>;
export type EggLazyQueryHookResult = ReturnType<typeof useEggLazyQuery>;
export type EggQueryResult = ApolloReactCommon.QueryResult<EggQuery, EggQueryVariables>;
export const CreateEggDocument = gql`
    mutation createEgg($title: String!, $platforms: [Platform]!) {
  createEgg(title: $title, platforms: $platforms) {
    id
  }
}
    `;
export type CreateEggMutationFn = ApolloReactCommon.MutationFunction<CreateEggMutation, CreateEggMutationVariables>;

/**
 * __useCreateEggMutation__
 *
 * To run a mutation, you first call `useCreateEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEggMutation, { data, loading, error }] = useCreateEggMutation({
 *   variables: {
 *      title: // value for 'title'
 *      platforms: // value for 'platforms'
 *   },
 * });
 */
export function useCreateEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEggMutation, CreateEggMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEggMutation, CreateEggMutationVariables>(CreateEggDocument, baseOptions);
      }
export type CreateEggMutationHookResult = ReturnType<typeof useCreateEggMutation>;
export type CreateEggMutationResult = ApolloReactCommon.MutationResult<CreateEggMutation>;
export type CreateEggMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEggMutation, CreateEggMutationVariables>;
export const UpdateEggDocument = gql`
    mutation updateEgg($id: ID!, $platforms: [Platform]!) {
  updateEgg(id: $id, platforms: $platforms) {
    id
  }
}
    `;
export type UpdateEggMutationFn = ApolloReactCommon.MutationFunction<UpdateEggMutation, UpdateEggMutationVariables>;

/**
 * __useUpdateEggMutation__
 *
 * To run a mutation, you first call `useUpdateEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEggMutation, { data, loading, error }] = useUpdateEggMutation({
 *   variables: {
 *      id: // value for 'id'
 *      platforms: // value for 'platforms'
 *   },
 * });
 */
export function useUpdateEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEggMutation, UpdateEggMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEggMutation, UpdateEggMutationVariables>(UpdateEggDocument, baseOptions);
      }
export type UpdateEggMutationHookResult = ReturnType<typeof useUpdateEggMutation>;
export type UpdateEggMutationResult = ApolloReactCommon.MutationResult<UpdateEggMutation>;
export type UpdateEggMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEggMutation, UpdateEggMutationVariables>;
export const RenameEggDocument = gql`
    mutation renameEgg($id: ID!, $title: String!) {
  renameEgg(id: $id, title: $title) {
    id
  }
}
    `;
export type RenameEggMutationFn = ApolloReactCommon.MutationFunction<RenameEggMutation, RenameEggMutationVariables>;

/**
 * __useRenameEggMutation__
 *
 * To run a mutation, you first call `useRenameEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameEggMutation, { data, loading, error }] = useRenameEggMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useRenameEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameEggMutation, RenameEggMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameEggMutation, RenameEggMutationVariables>(RenameEggDocument, baseOptions);
      }
export type RenameEggMutationHookResult = ReturnType<typeof useRenameEggMutation>;
export type RenameEggMutationResult = ApolloReactCommon.MutationResult<RenameEggMutation>;
export type RenameEggMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameEggMutation, RenameEggMutationVariables>;
export const DeleteEggDocument = gql`
    mutation deleteEgg($id: ID!) {
  deleteEgg(id: $id) {
    id
  }
}
    `;
export type DeleteEggMutationFn = ApolloReactCommon.MutationFunction<DeleteEggMutation, DeleteEggMutationVariables>;

/**
 * __useDeleteEggMutation__
 *
 * To run a mutation, you first call `useDeleteEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEggMutation, { data, loading, error }] = useDeleteEggMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEggMutation, DeleteEggMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEggMutation, DeleteEggMutationVariables>(DeleteEggDocument, baseOptions);
      }
export type DeleteEggMutationHookResult = ReturnType<typeof useDeleteEggMutation>;
export type DeleteEggMutationResult = ApolloReactCommon.MutationResult<DeleteEggMutation>;
export type DeleteEggMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEggMutation, DeleteEggMutationVariables>;
export const PublishDocument = gql`
    mutation publish($id: ID!) {
  publish(id: $id) {
    id
  }
}
    `;
export type PublishMutationFn = ApolloReactCommon.MutationFunction<PublishMutation, PublishMutationVariables>;

/**
 * __usePublishMutation__
 *
 * To run a mutation, you first call `usePublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishMutation, { data, loading, error }] = usePublishMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishMutation, PublishMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishMutation, PublishMutationVariables>(PublishDocument, baseOptions);
      }
export type PublishMutationHookResult = ReturnType<typeof usePublishMutation>;
export type PublishMutationResult = ApolloReactCommon.MutationResult<PublishMutation>;
export type PublishMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishMutation, PublishMutationVariables>;
export const UnPublishDocument = gql`
    mutation unPublish($id: ID!) {
  unPublish(id: $id) {
    id
  }
}
    `;
export type UnPublishMutationFn = ApolloReactCommon.MutationFunction<UnPublishMutation, UnPublishMutationVariables>;

/**
 * __useUnPublishMutation__
 *
 * To run a mutation, you first call `useUnPublishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishMutation, { data, loading, error }] = useUnPublishMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnPublishMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnPublishMutation, UnPublishMutationVariables>) {
        return ApolloReactHooks.useMutation<UnPublishMutation, UnPublishMutationVariables>(UnPublishDocument, baseOptions);
      }
export type UnPublishMutationHookResult = ReturnType<typeof useUnPublishMutation>;
export type UnPublishMutationResult = ApolloReactCommon.MutationResult<UnPublishMutation>;
export type UnPublishMutationOptions = ApolloReactCommon.BaseMutationOptions<UnPublishMutation, UnPublishMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;