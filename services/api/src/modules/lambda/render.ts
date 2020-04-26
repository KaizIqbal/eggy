import * as LAMBDA from "aws-sdk/clients/lambda";

const lambda = new LAMBDA({ apiVersion: "2015-03-31" });

export async function invokeRenderLambdaFunction(payload: Object) {
  const params = {
    FunctionName: "render-service-dev-render",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(payload)
  };

  return await lambda.invoke(params).promise();
}
