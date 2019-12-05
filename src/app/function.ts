// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from 'aws-lambda';

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
export const lambdaHandler: Handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
        // location: ret.data.trim(),
        version: context.functionVersion,
      }),
    };
  } catch (err) {
    // console.log(err);
    return err;
  }

  return response;
};
