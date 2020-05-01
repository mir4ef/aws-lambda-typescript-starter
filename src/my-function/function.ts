import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';

import {
  LambdaProxyHandler,
  mw,
} from '../mw';

const url = 'http://checkip.amazonaws.com/';
let response: APIGatewayProxyResult;

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
const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const ret: AxiosResponse = await axios.get(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
        location: ret.data.trim(),
        myName: (context as any).myName,
        version: context.functionVersion,
      }),
    };
  } catch (err) {
    // console.log(err);
    return err;
  }

  return response;
};

export const lambdaHandler: LambdaProxyHandler = (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyHandler> | void => mw(handler)(event, context, callback); // works with the WS built-in run/debug tool
// export const myFuncHandler = mw(handler); // works, but not with the WS built-in run/debug tool
