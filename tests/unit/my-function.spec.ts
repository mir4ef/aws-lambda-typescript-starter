import { expect } from 'chai';

import { lambdaHandler } from '../../src/my-function/function';

describe('My Function', () => {
  const event: any = { headers: {}};
  const context: any = { functionVersion: '$LATEST' };
  const callback: any = {};

  it('verifies successful response', async () => {
    const result: any = await lambdaHandler(event, context, callback);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    const response = JSON.parse(result.body);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('hello world');
    expect(response.location).to.be.an('string');
    expect(response.myName).to.be.equal('Miro');
    expect(response.version).to.be.equal('$LATEST');
  });
});
