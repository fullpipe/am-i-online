import { OnlineCheck } from '../src/index';
import * as sinon from 'sinon';

window.fetch = () => {
  return Promise.resolve(new Response());
};

describe('OnlineCheck tests', () => {
  const stubedFetch = sinon.stub(global, 'fetch');

  stubedFetch.returns(Promise.resolve(mockApiResponse()));

  function mockApiResponse(body = {}) {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    });
  }

  it('checks if I am  online', () => {
    const check = new OnlineCheck();

    return check.isOnline().then(isOnline => expect(isOnline).toBe(true));
  });
});
