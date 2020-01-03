import * as jwt from "jsonwebtoken";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  try {
    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      const { userId }: any = jwt.verify(token, process.env.APP_SECRET);
      return userId;
    }
    throw new Error("Not authorized");
  } catch (e) {
    console.log(e);
  }
}

export default getUserId;
