import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Callback,
  Context,
  Handler,
} from 'aws-lambda';
import { parse } from 'querystring';

export type LambdaFnWrapper = () => (fn: Handler) => LambdaProxyHandler;
export type LambdaProxyHandler = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => Promise<APIGatewayProxyHandler>|void;

const lambdaFnWrapper: LambdaFnWrapper = (): (fn: Handler) => LambdaProxyHandler => {
  return (fn: Handler): LambdaProxyHandler => {
    return (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyHandler> | void => {
      // TODO add any pre processing of incoming requests
      if (event.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        (event as any).body = parse((event as any).body);
      }

      return fn(event, context, callback);
    };
  };
};

export const httpFn: (fn: Handler) => LambdaProxyHandler = lambdaFnWrapper();

const middleware: (fn: Handler) => LambdaProxyHandler = (fn: Handler): LambdaProxyHandler => {
  return (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyHandler> | void => {
    (context as any).myName = 'Miro';

    return fn(event, context, callback);
  };
};

export const mw: (fn: Handler) => LambdaProxyHandler = (fn: Handler): LambdaProxyHandler => httpFn(middleware(fn));
