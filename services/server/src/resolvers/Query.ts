import { forwardTo } from "prisma-binding";

const Query = {
  eggs: forwardTo("db")
};

export default Query;
