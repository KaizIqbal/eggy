import { eggMutations } from "./egg";
import { flavrorMutations } from "./flavor";
import { authMutations } from "./auth";
import { cursorMutations } from "./cursor";

export const mutations = {
  ...authMutations,

  ...eggMutations,

  ...flavrorMutations,

  ...cursorMutations
};
