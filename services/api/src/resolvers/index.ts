import { cursorQueries } from "./Query/cursor";
import { eggQueries } from "./Query/egg";
import { flavorQueries } from "./Query/flavor";
import { userQueries } from "./Query/user";
import { fileQueries } from "./Query/file";

import { eggMutations } from "./Mutation/egg";
import { flavrorMutations } from "./Mutation/flavor";
import { authMutations } from "./Mutation/auth";
import { cursorMutations } from "./Mutation/cursor";
import { fileMutations } from "./Mutation/file";

// import { Subscription } from "./Subscription";

export const resolvers = {
  Mutation: {
    ...authMutations,

    ...eggMutations,

    ...flavrorMutations,

    ...cursorMutations,

    ...fileMutations
  },
  Query: {
    ...userQueries,

    ...eggQueries,

    ...flavorQueries,

    ...cursorQueries,

    ...fileQueries
  }
  // Subscription: {
  //   ...Subscription
  // }
};
