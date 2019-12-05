import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context,
  Handler,
} from 'aws-lambda';

import {
  httpFn,
  LambdaProxyHandler,
} from '../mw';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
const handler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const body: any = event.body;
  let response: APIGatewayProxyResult;

  if (body.name.toLowerCase() === 'miro') {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: body.name,
      }),
    };
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        body,
        message: 'bad request',
      }),
    };
  }

  return response;
};

export const lambdaHandler: LambdaProxyHandler = (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyHandler> | void => httpFn(handler)(event, context, callback); // works with the WS built-in run/debug tool
// export const lambdaHandler: Handler = httpFn(handler); // works, but not with the WS built-in run/debug tool
