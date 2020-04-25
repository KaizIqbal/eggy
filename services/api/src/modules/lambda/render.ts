import { aws } from "../awsConfig";

const lambda = new aws.Lambda({ apiVersion: "2015-03-31" });

export async function invokeRenderLambdaFunction(payload: Object) {
  const params = {
    arn: process.env.RENDER_LAMBDA_ARN,
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(payload)
  };

  return await lambda.invoke(params).promise();
}
