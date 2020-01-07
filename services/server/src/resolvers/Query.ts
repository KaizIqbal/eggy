import { forwardTo } from "prisma-binding";

const Query = {
  eggs: forwardTo("db"),
  egg: forwardTo("db")
};

export default Query;
