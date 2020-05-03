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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
   __typename?: 'Query';
  egg?: Maybe<Egg>;
  isEggAccessible?: Maybe<EggFlag>;
  publicBasket: EggConnection;
  userBasket: EggConnection;
  cursor?: Maybe<Cursor>;
  cursors: Array<Maybe<Cursor>>;
  flavor: Flavor;
  flavors: Array<Maybe<Flavor>>;
  me?: Maybe<User>;
  users: Array<Maybe<User>>;
  isUserAvailable?: Maybe<UserFlag>;
  file: File;
};


/**  */
export type QueryEggArgs = {
  where: EggWhereUniqueInput;
};


/**  */
export type QueryIsEggAccessibleArgs = {
  eggname: Scalars['String'];
};


/**  */
export type QueryPublicBasketArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


/**  */
export type QueryUserBasketArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


/**  */
export type QueryCursorArgs = {
  id: Scalars['ID'];
};


/**  */
export type QueryCursorsArgs = {
  flavorId: Scalars['ID'];
};


/**  */
export type QueryFlavorArgs = {
  id: Scalars['ID'];
};


/**  */
export type QueryFlavorsArgs = {
  eggId: Scalars['ID'];
};


/**  */
export type QueryIsUserAvailableArgs = {
  username: Scalars['String'];
};


/**  */
export type QueryFileArgs = {
  id: Scalars['ID'];
};

export type EggWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  eggname?: Maybe<Scalars['String']>;
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


/**  */
export type EggFlavorsArgs = {
  where?: Maybe<FlavorWhereInput>;
  orderBy?: Maybe<FlavorOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};


export enum Platform {
  Window = 'WINDOW',
  Linux = 'LINUX'
}

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

export enum Permission {
  Admin = 'ADMIN',
  User = 'USER',
  Eggcreate = 'EGGCREATE',
  Eggupdate = 'EGGUPDATE',
  Eggdelete = 'EGGDELETE',
  Flavorcreate = 'FLAVORCREATE',
  Flavorupdate = 'FLAVORUPDATE',
  Flavordelete = 'FLAVORDELETE',
  Cursorcreate = 'CURSORCREATE',
  Cursorupdate = 'CURSORUPDATE',
  Cursordelete = 'CURSORDELETE',
  Permissionupdate = 'PERMISSIONUPDATE'
}

export type FlavorWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<FlavorWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<FlavorWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<FlavorWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  name_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  name_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  name_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  name_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  name_not_ends_with?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isPublished_not?: Maybe<Scalars['Boolean']>;
  egg?: Maybe<EggWhereInput>;
  cursors_every?: Maybe<CursorWhereInput>;
  cursors_some?: Maybe<CursorWhereInput>;
  cursors_none?: Maybe<CursorWhereInput>;
};

export type EggWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<EggWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<EggWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<EggWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  title_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  title_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  title_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  title_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  title_not_ends_with?: Maybe<Scalars['String']>;
  eggname?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  eggname_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  eggname_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  eggname_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  eggname_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  eggname_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  eggname_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  eggname_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  eggname_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  eggname_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  eggname_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  eggname_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  eggname_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  eggname_not_ends_with?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isPublished_not?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  user?: Maybe<UserWhereInput>;
  flavors_every?: Maybe<FlavorWhereInput>;
  flavors_some?: Maybe<FlavorWhereInput>;
  flavors_none?: Maybe<FlavorWhereInput>;
};

export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<UserWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  firstName_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  firstName_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  firstName_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  firstName_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  firstName_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  firstName_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  firstName_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  firstName_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  firstName_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  firstName_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  firstName_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  firstName_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  firstName_not_ends_with?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  lastName_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  lastName_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  lastName_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  lastName_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  lastName_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  lastName_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  lastName_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  lastName_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  lastName_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  lastName_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  lastName_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  lastName_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  lastName_not_ends_with?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  username_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  username_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  username_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  username_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  username_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  username_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  username_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  username_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  username_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  username_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  username_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  username_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  username_not_ends_with?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  email_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  email_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  email_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  email_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  email_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  email_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  email_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  email_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  email_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  email_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  email_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  email_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  email_not_ends_with?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  password?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  password_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  password_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  password_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  password_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  password_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  password_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  password_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  password_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  password_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  password_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  password_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  password_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  password_not_ends_with?: Maybe<Scalars['String']>;
  resetToken?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  resetToken_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  resetToken_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  resetToken_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  resetToken_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  resetToken_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  resetToken_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  resetToken_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  resetToken_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  resetToken_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  resetToken_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  resetToken_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  resetToken_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  resetToken_not_ends_with?: Maybe<Scalars['String']>;
  resetTokenExpiry?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  resetTokenExpiry_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  resetTokenExpiry_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  resetTokenExpiry_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  resetTokenExpiry_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  resetTokenExpiry_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  resetTokenExpiry_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  resetTokenExpiry_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  resetTokenExpiry_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  resetTokenExpiry_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  resetTokenExpiry_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  resetTokenExpiry_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  resetTokenExpiry_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  resetTokenExpiry_not_ends_with?: Maybe<Scalars['String']>;
  tokenVersion?: Maybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  tokenVersion_not?: Maybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  tokenVersion_in?: Maybe<Array<Scalars['Int']>>;
  /** All values that are not contained in given list. */
  tokenVersion_not_in?: Maybe<Array<Scalars['Int']>>;
  /** All values less than the given value. */
  tokenVersion_lt?: Maybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  tokenVersion_lte?: Maybe<Scalars['Int']>;
  /** All values greater than the given value. */
  tokenVersion_gt?: Maybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  tokenVersion_gte?: Maybe<Scalars['Int']>;
  eggs_every?: Maybe<EggWhereInput>;
  eggs_some?: Maybe<EggWhereInput>;
  eggs_none?: Maybe<EggWhereInput>;
};

export type CursorWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<CursorWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<CursorWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<CursorWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  name?: Maybe<CursorName>;
  /** All values that are not equal to given value. */
  name_not?: Maybe<CursorName>;
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<CursorName>>;
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<CursorName>>;
  frames?: Maybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  frames_not?: Maybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  frames_in?: Maybe<Array<Scalars['Int']>>;
  /** All values that are not contained in given list. */
  frames_not_in?: Maybe<Array<Scalars['Int']>>;
  /** All values less than the given value. */
  frames_lt?: Maybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  frames_lte?: Maybe<Scalars['Int']>;
  /** All values greater than the given value. */
  frames_gt?: Maybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  frames_gte?: Maybe<Scalars['Int']>;
  isRendered?: Maybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isRendered_not?: Maybe<Scalars['Boolean']>;
  flavor?: Maybe<FlavorWhereInput>;
  source?: Maybe<FileWhereInput>;
  render_every?: Maybe<RenderFileWhereInput>;
  render_some?: Maybe<RenderFileWhereInput>;
  render_none?: Maybe<RenderFileWhereInput>;
};

export enum CursorName {
  PointerLeft = 'Pointer_Left',
  PointerCenter = 'Pointer_Center',
  PointerRight = 'Pointer_Right',
  X11 = 'X11',
  Wayland = 'Wayland'
}

export type FileWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<FileWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<FileWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<FileWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  key?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  key_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  key_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  key_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  key_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  key_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  key_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  key_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  key_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  key_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  key_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  key_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  key_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  key_not_ends_with?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  filename_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  filename_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  filename_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  filename_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  filename_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  filename_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  filename_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  filename_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  filename_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  filename_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  filename_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  filename_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  filename_not_ends_with?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  mimetype_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimetype_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  mimetype_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  mimetype_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  mimetype_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  mimetype_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  mimetype_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  mimetype_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimetype_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimetype_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  mimetype_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimetype_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  mimetype_not_ends_with?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  encoding_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  encoding_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  encoding_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  encoding_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  encoding_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  encoding_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  encoding_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  encoding_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  encoding_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  encoding_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  encoding_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  encoding_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  encoding_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  url_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  url_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  url_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  url_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  url_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  url_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  url_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  url_not_ends_with?: Maybe<Scalars['String']>;
  cursor?: Maybe<CursorWhereInput>;
};

export type RenderFileWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<RenderFileWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<RenderFileWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<RenderFileWhereInput>>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  key?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  key_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  key_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  key_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  key_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  key_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  key_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  key_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  key_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  key_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  key_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  key_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  key_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  key_not_ends_with?: Maybe<Scalars['String']>;
  mimetype?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  mimetype_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimetype_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  mimetype_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  mimetype_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  mimetype_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  mimetype_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  mimetype_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  mimetype_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimetype_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimetype_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  mimetype_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimetype_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  mimetype_not_ends_with?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  encoding_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  encoding_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  encoding_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  encoding_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  encoding_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  encoding_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  encoding_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  encoding_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  encoding_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  encoding_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  encoding_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  encoding_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  encoding_not_ends_with?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  url_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  url_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  url_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  url_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  url_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  url_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  url_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  url_not_ends_with?: Maybe<Scalars['String']>;
  cursor?: Maybe<CursorWhereInput>;
};

export enum FlavorOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  IsPublishedAsc = 'isPublished_ASC',
  IsPublishedDesc = 'isPublished_DESC'
}

export type Flavor = Node & {
   __typename?: 'Flavor';
  id: Scalars['ID'];
  name: Scalars['String'];
  isPublished: Scalars['Boolean'];
  egg: Egg;
  cursors?: Maybe<Array<Cursor>>;
};


/**  */
export type FlavorCursorsArgs = {
  where?: Maybe<CursorWhereInput>;
  orderBy?: Maybe<CursorOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum CursorOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  FramesAsc = 'frames_ASC',
  FramesDesc = 'frames_DESC',
  IsRenderedAsc = 'isRendered_ASC',
  IsRenderedDesc = 'isRendered_DESC'
}

export type Cursor = Node & {
   __typename?: 'Cursor';
  id: Scalars['ID'];
  name: CursorName;
  frames: Scalars['Int'];
  isRendered: Scalars['Boolean'];
  flavor: Flavor;
  source?: Maybe<File>;
  render?: Maybe<Array<RenderFile>>;
};


/**  */
export type CursorRenderArgs = {
  where?: Maybe<RenderFileWhereInput>;
  orderBy?: Maybe<RenderFileOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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

export enum RenderFileOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  MimetypeAsc = 'mimetype_ASC',
  MimetypeDesc = 'mimetype_DESC',
  EncodingAsc = 'encoding_ASC',
  EncodingDesc = 'encoding_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type RenderFile = Node & {
   __typename?: 'RenderFile';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['String'];
  cursor: Cursor;
};

export type EggFlag = {
   __typename?: 'EggFlag';
  access: Scalars['Boolean'];
};

/** A connection to a list of items. */
export type EggConnection = {
   __typename?: 'EggConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<EggEdge>>;
  aggregate: AggregateEgg;
};

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type EggEdge = {
   __typename?: 'EggEdge';
  /** The item at the end of the edge. */
  node: Egg;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type AggregateEgg = {
   __typename?: 'AggregateEgg';
  count: Scalars['Int'];
};

export type UserFlag = {
   __typename?: 'UserFlag';
  available: Scalars['Boolean'];
};

export type Mutation = {
   __typename?: 'Mutation';
  uploadFile: File;
  deleteFile: File;
  createEgg: Egg;
  updateEgg: Egg;
  renameEgg: Egg;
  deleteEgg: Egg;
  publishEgg: Egg;
  unPublishEgg: Egg;
  createFlavor: Flavor;
  renameFlavor: Flavor;
  deleteFlavor: Flavor;
  publishFlavor: Flavor;
  unPublishFlavor: Flavor;
  createCursor: Cursor;
  updateCursor: Cursor;
  renameCursor: Cursor;
  deleteCursor: Cursor;
  renderCursor: Cursor;
  signup: AuthPayload;
  signin: AuthPayload;
  signout?: Maybe<SuccessMessage>;
  revokeRefreshTokenForUser: User;
  resetPasswordRequest?: Maybe<SuccessMessage>;
  resetPassword: AuthPayload;
  updatePermissions?: Maybe<User>;
};


/**  */
export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  cursorId: Scalars['ID'];
};


/**  */
export type MutationDeleteFileArgs = {
  fileId: Scalars['ID'];
};


/**  */
export type MutationCreateEggArgs = {
  title: Scalars['String'];
  platforms: Array<Maybe<Platform>>;
};


/**  */
export type MutationUpdateEggArgs = {
  id: Scalars['ID'];
  platforms: Array<Maybe<Platform>>;
};


/**  */
export type MutationRenameEggArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};


/**  */
export type MutationDeleteEggArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationPublishEggArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationUnPublishEggArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationCreateFlavorArgs = {
  name: Scalars['String'];
  eggId: Scalars['ID'];
};


/**  */
export type MutationRenameFlavorArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


/**  */
export type MutationDeleteFlavorArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationPublishFlavorArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationUnPublishFlavorArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationCreateCursorArgs = {
  name: CursorName;
  frames: Scalars['Int'];
  flavorId: Scalars['ID'];
};


/**  */
export type MutationUpdateCursorArgs = {
  id: Scalars['ID'];
  name: CursorName;
  frames: Scalars['Int'];
};


/**  */
export type MutationRenameCursorArgs = {
  id: Scalars['ID'];
  flavorId: Scalars['ID'];
  name: CursorName;
};


/**  */
export type MutationDeleteCursorArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationRenderCursorArgs = {
  id: Scalars['ID'];
};


/**  */
export type MutationSignupArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


/**  */
export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/**  */
export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['ID'];
};


/**  */
export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};


/**  */
export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
};


/**  */
export type MutationUpdatePermissionsArgs = {
  permissions?: Maybe<Array<Maybe<Permission>>>;
  userId: Scalars['ID'];
};


export type AuthPayload = {
   __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type SuccessMessage = {
   __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']>;
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
    & { user: (
      { __typename?: 'User' }
      & UserDataFragment
    ) }
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

export type CursorQueryVariables = {
  id: Scalars['ID'];
};


export type CursorQuery = (
  { __typename?: 'Query' }
  & { cursor: Maybe<(
    { __typename?: 'Cursor' }
    & CursorDataFragment
  )> }
);

export type CursorsQueryVariables = {
  flavorId: Scalars['ID'];
};


export type CursorsQuery = (
  { __typename?: 'Query' }
  & { cursors: Array<Maybe<(
    { __typename?: 'Cursor' }
    & CursorDataFragment
  )>> }
);

export type CreateCursorMutationVariables = {
  flavorId: Scalars['ID'];
  name: CursorName;
  frames: Scalars['Int'];
};


export type CreateCursorMutation = (
  { __typename?: 'Mutation' }
  & { createCursor: (
    { __typename?: 'Cursor' }
    & Pick<Cursor, 'id'>
  ) }
);

export type RenameCursorMutationVariables = {
  flavorId: Scalars['ID'];
  id: Scalars['ID'];
  name: CursorName;
};


export type RenameCursorMutation = (
  { __typename?: 'Mutation' }
  & { renameCursor: (
    { __typename?: 'Cursor' }
    & Pick<Cursor, 'id'>
  ) }
);

export type RenderCursorMutationVariables = {
  id: Scalars['ID'];
};


export type RenderCursorMutation = (
  { __typename?: 'Mutation' }
  & { renderCursor: (
    { __typename?: 'Cursor' }
    & Pick<Cursor, 'id'>
  ) }
);

export type DeleteCursorMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteCursorMutation = (
  { __typename?: 'Mutation' }
  & { deleteCursor: (
    { __typename?: 'Cursor' }
    & Pick<Cursor, 'id'>
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

export type PublishEggMutationVariables = {
  id: Scalars['ID'];
};


export type PublishEggMutation = (
  { __typename?: 'Mutation' }
  & { publishEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type UnPublishEggMutationVariables = {
  id: Scalars['ID'];
};


export type UnPublishEggMutation = (
  { __typename?: 'Mutation' }
  & { unPublishEgg: (
    { __typename?: 'Egg' }
    & Pick<Egg, 'id'>
  ) }
);

export type UploadFileMutationVariables = {
  file: Scalars['Upload'];
  cursorId: Scalars['ID'];
};


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & { uploadFile: (
    { __typename?: 'File' }
    & FileDataFragment
  ) }
);

export type DeleteFileMutationVariables = {
  fileId: Scalars['ID'];
};


export type DeleteFileMutation = (
  { __typename?: 'Mutation' }
  & { deleteFile: (
    { __typename?: 'File' }
    & FileDataFragment
  ) }
);

export type FlavorQueryVariables = {
  id: Scalars['ID'];
};


export type FlavorQuery = (
  { __typename?: 'Query' }
  & { flavor: (
    { __typename?: 'Flavor' }
    & FlavorDataFragment
  ) }
);

export type FlavorsQueryVariables = {
  eggId: Scalars['ID'];
};


export type FlavorsQuery = (
  { __typename?: 'Query' }
  & { flavors: Array<Maybe<(
    { __typename?: 'Flavor' }
    & FlavorDataFragment
  )>> }
);

export type CreateFlavorMutationVariables = {
  name: Scalars['String'];
  eggId: Scalars['ID'];
};


export type CreateFlavorMutation = (
  { __typename?: 'Mutation' }
  & { createFlavor: (
    { __typename?: 'Flavor' }
    & Pick<Flavor, 'id'>
  ) }
);

export type RenameFlavorMutationVariables = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type RenameFlavorMutation = (
  { __typename?: 'Mutation' }
  & { renameFlavor: (
    { __typename?: 'Flavor' }
    & Pick<Flavor, 'id'>
  ) }
);

export type DeleteFlavorMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteFlavorMutation = (
  { __typename?: 'Mutation' }
  & { deleteFlavor: (
    { __typename?: 'Flavor' }
    & Pick<Flavor, 'id'>
  ) }
);

export type PublishFlavorMutationVariables = {
  id: Scalars['ID'];
};


export type PublishFlavorMutation = (
  { __typename?: 'Mutation' }
  & { publishFlavor: (
    { __typename?: 'Flavor' }
    & Pick<Flavor, 'id'>
  ) }
);

export type UnPublishFlavorMutationVariables = {
  id: Scalars['ID'];
};


export type UnPublishFlavorMutation = (
  { __typename?: 'Mutation' }
  & { unPublishFlavor: (
    { __typename?: 'Flavor' }
    & Pick<Flavor, 'id'>
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

export type FlavorDataFragment = (
  { __typename?: 'Flavor' }
  & Pick<Flavor, 'id' | 'name' | 'isPublished'>
  & { egg: (
    { __typename?: 'Egg' }
    & EggDataFragment
  ) }
);

export type CursorDataFragment = (
  { __typename?: 'Cursor' }
  & Pick<Cursor, 'id' | 'name' | 'frames' | 'isRendered'>
  & { flavor: (
    { __typename?: 'Flavor' }
    & FlavorDataFragment
  ), source: Maybe<(
    { __typename?: 'File' }
    & FileDataFragment
  )>, render: Maybe<Array<(
    { __typename?: 'RenderFile' }
    & RenderFileDataFragment
  )>> }
);

export type FileDataFragment = (
  { __typename?: 'File' }
  & Pick<File, 'id' | 'key' | 'url' | 'mimetype' | 'filename' | 'createdAt' | 'updatedAt'>
);

export type RenderFileDataFragment = (
  { __typename?: 'RenderFile' }
  & Pick<RenderFile, 'id' | 'key' | 'url' | 'mimetype' | 'createdAt' | 'updatedAt'>
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
export const FlavorDataFragmentDoc = gql`
    fragment FlavorData on Flavor {
  id
  name
  isPublished
  egg {
    ...EggData
  }
}
    ${EggDataFragmentDoc}`;
export const FileDataFragmentDoc = gql`
    fragment FileData on File {
  id
  key
  url
  mimetype
  filename
  createdAt
  updatedAt
}
    `;
export const RenderFileDataFragmentDoc = gql`
    fragment RenderFileData on RenderFile {
  id
  key
  url
  mimetype
  createdAt
  updatedAt
}
    `;
export const CursorDataFragmentDoc = gql`
    fragment CursorData on Cursor {
  id
  name
  frames
  isRendered
  flavor {
    ...FlavorData
  }
  source {
    ...FileData
  }
  render {
    ...RenderFileData
  }
}
    ${FlavorDataFragmentDoc}
${FileDataFragmentDoc}
${RenderFileDataFragmentDoc}`;
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
    user {
      ...UserData
    }
  }
}
    ${UserDataFragmentDoc}`;
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
export const CursorDocument = gql`
    query cursor($id: ID!) {
  cursor(id: $id) {
    ...CursorData
  }
}
    ${CursorDataFragmentDoc}`;

/**
 * __useCursorQuery__
 *
 * To run a query within a React component, call `useCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `useCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCursorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCursorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CursorQuery, CursorQueryVariables>) {
        return ApolloReactHooks.useQuery<CursorQuery, CursorQueryVariables>(CursorDocument, baseOptions);
      }
export function useCursorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CursorQuery, CursorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CursorQuery, CursorQueryVariables>(CursorDocument, baseOptions);
        }
export type CursorQueryHookResult = ReturnType<typeof useCursorQuery>;
export type CursorLazyQueryHookResult = ReturnType<typeof useCursorLazyQuery>;
export type CursorQueryResult = ApolloReactCommon.QueryResult<CursorQuery, CursorQueryVariables>;
export const CursorsDocument = gql`
    query cursors($flavorId: ID!) {
  cursors(flavorId: $flavorId) {
    ...CursorData
  }
}
    ${CursorDataFragmentDoc}`;

/**
 * __useCursorsQuery__
 *
 * To run a query within a React component, call `useCursorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCursorsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCursorsQuery({
 *   variables: {
 *      flavorId: // value for 'flavorId'
 *   },
 * });
 */
export function useCursorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CursorsQuery, CursorsQueryVariables>) {
        return ApolloReactHooks.useQuery<CursorsQuery, CursorsQueryVariables>(CursorsDocument, baseOptions);
      }
export function useCursorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CursorsQuery, CursorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CursorsQuery, CursorsQueryVariables>(CursorsDocument, baseOptions);
        }
export type CursorsQueryHookResult = ReturnType<typeof useCursorsQuery>;
export type CursorsLazyQueryHookResult = ReturnType<typeof useCursorsLazyQuery>;
export type CursorsQueryResult = ApolloReactCommon.QueryResult<CursorsQuery, CursorsQueryVariables>;
export const CreateCursorDocument = gql`
    mutation createCursor($flavorId: ID!, $name: cursorName!, $frames: Int!) {
  createCursor(flavorId: $flavorId, name: $name, frames: $frames) {
    id
  }
}
    `;
export type CreateCursorMutationFn = ApolloReactCommon.MutationFunction<CreateCursorMutation, CreateCursorMutationVariables>;

/**
 * __useCreateCursorMutation__
 *
 * To run a mutation, you first call `useCreateCursorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCursorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCursorMutation, { data, loading, error }] = useCreateCursorMutation({
 *   variables: {
 *      flavorId: // value for 'flavorId'
 *      name: // value for 'name'
 *      frames: // value for 'frames'
 *   },
 * });
 */
export function useCreateCursorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCursorMutation, CreateCursorMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCursorMutation, CreateCursorMutationVariables>(CreateCursorDocument, baseOptions);
      }
export type CreateCursorMutationHookResult = ReturnType<typeof useCreateCursorMutation>;
export type CreateCursorMutationResult = ApolloReactCommon.MutationResult<CreateCursorMutation>;
export type CreateCursorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCursorMutation, CreateCursorMutationVariables>;
export const RenameCursorDocument = gql`
    mutation renameCursor($flavorId: ID!, $id: ID!, $name: cursorName!) {
  renameCursor(flavorId: $flavorId, id: $id, name: $name) {
    id
  }
}
    `;
export type RenameCursorMutationFn = ApolloReactCommon.MutationFunction<RenameCursorMutation, RenameCursorMutationVariables>;

/**
 * __useRenameCursorMutation__
 *
 * To run a mutation, you first call `useRenameCursorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameCursorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameCursorMutation, { data, loading, error }] = useRenameCursorMutation({
 *   variables: {
 *      flavorId: // value for 'flavorId'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameCursorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameCursorMutation, RenameCursorMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameCursorMutation, RenameCursorMutationVariables>(RenameCursorDocument, baseOptions);
      }
export type RenameCursorMutationHookResult = ReturnType<typeof useRenameCursorMutation>;
export type RenameCursorMutationResult = ApolloReactCommon.MutationResult<RenameCursorMutation>;
export type RenameCursorMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameCursorMutation, RenameCursorMutationVariables>;
export const RenderCursorDocument = gql`
    mutation renderCursor($id: ID!) {
  renderCursor(id: $id) {
    id
  }
}
    `;
export type RenderCursorMutationFn = ApolloReactCommon.MutationFunction<RenderCursorMutation, RenderCursorMutationVariables>;

/**
 * __useRenderCursorMutation__
 *
 * To run a mutation, you first call `useRenderCursorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenderCursorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renderCursorMutation, { data, loading, error }] = useRenderCursorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRenderCursorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenderCursorMutation, RenderCursorMutationVariables>) {
        return ApolloReactHooks.useMutation<RenderCursorMutation, RenderCursorMutationVariables>(RenderCursorDocument, baseOptions);
      }
export type RenderCursorMutationHookResult = ReturnType<typeof useRenderCursorMutation>;
export type RenderCursorMutationResult = ApolloReactCommon.MutationResult<RenderCursorMutation>;
export type RenderCursorMutationOptions = ApolloReactCommon.BaseMutationOptions<RenderCursorMutation, RenderCursorMutationVariables>;
export const DeleteCursorDocument = gql`
    mutation deleteCursor($id: ID!) {
  deleteCursor(id: $id) {
    id
  }
}
    `;
export type DeleteCursorMutationFn = ApolloReactCommon.MutationFunction<DeleteCursorMutation, DeleteCursorMutationVariables>;

/**
 * __useDeleteCursorMutation__
 *
 * To run a mutation, you first call `useDeleteCursorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCursorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCursorMutation, { data, loading, error }] = useDeleteCursorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCursorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCursorMutation, DeleteCursorMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCursorMutation, DeleteCursorMutationVariables>(DeleteCursorDocument, baseOptions);
      }
export type DeleteCursorMutationHookResult = ReturnType<typeof useDeleteCursorMutation>;
export type DeleteCursorMutationResult = ApolloReactCommon.MutationResult<DeleteCursorMutation>;
export type DeleteCursorMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCursorMutation, DeleteCursorMutationVariables>;
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
export const PublishEggDocument = gql`
    mutation publishEgg($id: ID!) {
  publishEgg(id: $id) {
    id
  }
}
    `;
export type PublishEggMutationFn = ApolloReactCommon.MutationFunction<PublishEggMutation, PublishEggMutationVariables>;

/**
 * __usePublishEggMutation__
 *
 * To run a mutation, you first call `usePublishEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishEggMutation, { data, loading, error }] = usePublishEggMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishEggMutation, PublishEggMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishEggMutation, PublishEggMutationVariables>(PublishEggDocument, baseOptions);
      }
export type PublishEggMutationHookResult = ReturnType<typeof usePublishEggMutation>;
export type PublishEggMutationResult = ApolloReactCommon.MutationResult<PublishEggMutation>;
export type PublishEggMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishEggMutation, PublishEggMutationVariables>;
export const UnPublishEggDocument = gql`
    mutation unPublishEgg($id: ID!) {
  unPublishEgg(id: $id) {
    id
  }
}
    `;
export type UnPublishEggMutationFn = ApolloReactCommon.MutationFunction<UnPublishEggMutation, UnPublishEggMutationVariables>;

/**
 * __useUnPublishEggMutation__
 *
 * To run a mutation, you first call `useUnPublishEggMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishEggMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishEggMutation, { data, loading, error }] = useUnPublishEggMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnPublishEggMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnPublishEggMutation, UnPublishEggMutationVariables>) {
        return ApolloReactHooks.useMutation<UnPublishEggMutation, UnPublishEggMutationVariables>(UnPublishEggDocument, baseOptions);
      }
export type UnPublishEggMutationHookResult = ReturnType<typeof useUnPublishEggMutation>;
export type UnPublishEggMutationResult = ApolloReactCommon.MutationResult<UnPublishEggMutation>;
export type UnPublishEggMutationOptions = ApolloReactCommon.BaseMutationOptions<UnPublishEggMutation, UnPublishEggMutationVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!, $cursorId: ID!) {
  uploadFile(file: $file, cursorId: $cursorId) {
    ...FileData
  }
}
    ${FileDataFragmentDoc}`;
export type UploadFileMutationFn = ApolloReactCommon.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      cursorId: // value for 'cursorId'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, baseOptions);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = ApolloReactCommon.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const DeleteFileDocument = gql`
    mutation deleteFile($fileId: ID!) {
  deleteFile(fileId: $fileId) {
    ...FileData
  }
}
    ${FileDataFragmentDoc}`;
export type DeleteFileMutationFn = ApolloReactCommon.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;

/**
 * __useDeleteFileMutation__
 *
 * To run a mutation, you first call `useDeleteFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFileMutation, { data, loading, error }] = useDeleteFileMutation({
 *   variables: {
 *      fileId: // value for 'fileId'
 *   },
 * });
 */
export function useDeleteFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, baseOptions);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = ApolloReactCommon.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;
export const FlavorDocument = gql`
    query flavor($id: ID!) {
  flavor(id: $id) {
    ...FlavorData
  }
}
    ${FlavorDataFragmentDoc}`;

/**
 * __useFlavorQuery__
 *
 * To run a query within a React component, call `useFlavorQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlavorQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlavorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFlavorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FlavorQuery, FlavorQueryVariables>) {
        return ApolloReactHooks.useQuery<FlavorQuery, FlavorQueryVariables>(FlavorDocument, baseOptions);
      }
export function useFlavorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FlavorQuery, FlavorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FlavorQuery, FlavorQueryVariables>(FlavorDocument, baseOptions);
        }
export type FlavorQueryHookResult = ReturnType<typeof useFlavorQuery>;
export type FlavorLazyQueryHookResult = ReturnType<typeof useFlavorLazyQuery>;
export type FlavorQueryResult = ApolloReactCommon.QueryResult<FlavorQuery, FlavorQueryVariables>;
export const FlavorsDocument = gql`
    query flavors($eggId: ID!) {
  flavors(eggId: $eggId) {
    ...FlavorData
  }
}
    ${FlavorDataFragmentDoc}`;

/**
 * __useFlavorsQuery__
 *
 * To run a query within a React component, call `useFlavorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFlavorsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlavorsQuery({
 *   variables: {
 *      eggId: // value for 'eggId'
 *   },
 * });
 */
export function useFlavorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FlavorsQuery, FlavorsQueryVariables>) {
        return ApolloReactHooks.useQuery<FlavorsQuery, FlavorsQueryVariables>(FlavorsDocument, baseOptions);
      }
export function useFlavorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FlavorsQuery, FlavorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FlavorsQuery, FlavorsQueryVariables>(FlavorsDocument, baseOptions);
        }
export type FlavorsQueryHookResult = ReturnType<typeof useFlavorsQuery>;
export type FlavorsLazyQueryHookResult = ReturnType<typeof useFlavorsLazyQuery>;
export type FlavorsQueryResult = ApolloReactCommon.QueryResult<FlavorsQuery, FlavorsQueryVariables>;
export const CreateFlavorDocument = gql`
    mutation createFlavor($name: String!, $eggId: ID!) {
  createFlavor(name: $name, eggId: $eggId) {
    id
  }
}
    `;
export type CreateFlavorMutationFn = ApolloReactCommon.MutationFunction<CreateFlavorMutation, CreateFlavorMutationVariables>;

/**
 * __useCreateFlavorMutation__
 *
 * To run a mutation, you first call `useCreateFlavorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFlavorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFlavorMutation, { data, loading, error }] = useCreateFlavorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      eggId: // value for 'eggId'
 *   },
 * });
 */
export function useCreateFlavorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFlavorMutation, CreateFlavorMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFlavorMutation, CreateFlavorMutationVariables>(CreateFlavorDocument, baseOptions);
      }
export type CreateFlavorMutationHookResult = ReturnType<typeof useCreateFlavorMutation>;
export type CreateFlavorMutationResult = ApolloReactCommon.MutationResult<CreateFlavorMutation>;
export type CreateFlavorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFlavorMutation, CreateFlavorMutationVariables>;
export const RenameFlavorDocument = gql`
    mutation renameFlavor($id: ID!, $name: String!) {
  renameFlavor(id: $id, name: $name) {
    id
  }
}
    `;
export type RenameFlavorMutationFn = ApolloReactCommon.MutationFunction<RenameFlavorMutation, RenameFlavorMutationVariables>;

/**
 * __useRenameFlavorMutation__
 *
 * To run a mutation, you first call `useRenameFlavorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFlavorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFlavorMutation, { data, loading, error }] = useRenameFlavorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameFlavorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RenameFlavorMutation, RenameFlavorMutationVariables>) {
        return ApolloReactHooks.useMutation<RenameFlavorMutation, RenameFlavorMutationVariables>(RenameFlavorDocument, baseOptions);
      }
export type RenameFlavorMutationHookResult = ReturnType<typeof useRenameFlavorMutation>;
export type RenameFlavorMutationResult = ApolloReactCommon.MutationResult<RenameFlavorMutation>;
export type RenameFlavorMutationOptions = ApolloReactCommon.BaseMutationOptions<RenameFlavorMutation, RenameFlavorMutationVariables>;
export const DeleteFlavorDocument = gql`
    mutation deleteFlavor($id: ID!) {
  deleteFlavor(id: $id) {
    id
  }
}
    `;
export type DeleteFlavorMutationFn = ApolloReactCommon.MutationFunction<DeleteFlavorMutation, DeleteFlavorMutationVariables>;

/**
 * __useDeleteFlavorMutation__
 *
 * To run a mutation, you first call `useDeleteFlavorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFlavorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFlavorMutation, { data, loading, error }] = useDeleteFlavorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFlavorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFlavorMutation, DeleteFlavorMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFlavorMutation, DeleteFlavorMutationVariables>(DeleteFlavorDocument, baseOptions);
      }
export type DeleteFlavorMutationHookResult = ReturnType<typeof useDeleteFlavorMutation>;
export type DeleteFlavorMutationResult = ApolloReactCommon.MutationResult<DeleteFlavorMutation>;
export type DeleteFlavorMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFlavorMutation, DeleteFlavorMutationVariables>;
export const PublishFlavorDocument = gql`
    mutation publishFlavor($id: ID!) {
  publishFlavor(id: $id) {
    id
  }
}
    `;
export type PublishFlavorMutationFn = ApolloReactCommon.MutationFunction<PublishFlavorMutation, PublishFlavorMutationVariables>;

/**
 * __usePublishFlavorMutation__
 *
 * To run a mutation, you first call `usePublishFlavorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishFlavorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishFlavorMutation, { data, loading, error }] = usePublishFlavorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishFlavorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishFlavorMutation, PublishFlavorMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishFlavorMutation, PublishFlavorMutationVariables>(PublishFlavorDocument, baseOptions);
      }
export type PublishFlavorMutationHookResult = ReturnType<typeof usePublishFlavorMutation>;
export type PublishFlavorMutationResult = ApolloReactCommon.MutationResult<PublishFlavorMutation>;
export type PublishFlavorMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishFlavorMutation, PublishFlavorMutationVariables>;
export const UnPublishFlavorDocument = gql`
    mutation unPublishFlavor($id: ID!) {
  unPublishFlavor(id: $id) {
    id
  }
}
    `;
export type UnPublishFlavorMutationFn = ApolloReactCommon.MutationFunction<UnPublishFlavorMutation, UnPublishFlavorMutationVariables>;

/**
 * __useUnPublishFlavorMutation__
 *
 * To run a mutation, you first call `useUnPublishFlavorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnPublishFlavorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unPublishFlavorMutation, { data, loading, error }] = useUnPublishFlavorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnPublishFlavorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnPublishFlavorMutation, UnPublishFlavorMutationVariables>) {
        return ApolloReactHooks.useMutation<UnPublishFlavorMutation, UnPublishFlavorMutationVariables>(UnPublishFlavorDocument, baseOptions);
      }
export type UnPublishFlavorMutationHookResult = ReturnType<typeof useUnPublishFlavorMutation>;
export type UnPublishFlavorMutationResult = ApolloReactCommon.MutationResult<UnPublishFlavorMutation>;
export type UnPublishFlavorMutationOptions = ApolloReactCommon.BaseMutationOptions<UnPublishFlavorMutation, UnPublishFlavorMutationVariables>;
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