import * as LAMBDA from "aws-sdk/clients/lambda";

const lambda = new LAMBDA({
  apiVersion: "2015-03-31",
  region: process.env.REGION
});

export async function invokeRenderLambdaFunction(payload: Object) {
  const params = {
    FunctionName: process.env.RENDER_LAMBDA_ARN,
    Payload: payload
  };

  return await lambda.invoke(params).promise();
}
