import { expect } from 'chai';

import { lambdaHandler } from '../../src/func/function';

describe('Func', () => {
  const event: any = { headers: {}, body: { name: 'Miro' }};
  const context: any = { functionVersion: '$LATEST' };
  const callback: any = {};

  it('verifies successful response', async () => {
    const result: any = await lambdaHandler(event, context, callback);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');

    const response = JSON.parse(result.body);

    expect(response).to.be.an('object');
    // tslint:disable-next-line:no-unused-expression
    expect(response.success).to.be.true;
    expect(response.message).to.be.equal('Miro');
  });
});
