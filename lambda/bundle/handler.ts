import { Handler } from "aws-lambda";
import "source-map-support/register";


// This Function for generate png file on s3
export const bundle: Handler = async (_event, context) => {

  let bundle: any;

  try {
    bundle = "This is a Bundle"
  } catch (error) {
    return context.fail(error);
  } finally {
    return context.succeed(bundle);
  }
};
