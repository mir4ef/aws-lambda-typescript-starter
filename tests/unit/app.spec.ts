import * as chai from 'chai';
const expect = chai.expect;

import { lambdaHandler } from '../../src/app/function';

describe('App', () => {
  const event: any = {};
  const context: any = { functionVersion: '$LATEST' };
  const callback: any = {};

  it('verifies successful response', async () => {
    const result = await lambdaHandler(event, context, callback);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    const response = JSON.parse(result.body);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('hello world');
    // expect(response.location).to.be.an('string');
    expect(response.version).to.be.equal('$LATEST');
  });
});
