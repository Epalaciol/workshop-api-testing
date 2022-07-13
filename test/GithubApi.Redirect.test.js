require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

describe('HEAD Method will consumed ', () => {
  const redirectUrl = 'https://github.com/aperdomob/redirect-test';
  const answerUrl = 'https://github.com/aperdomob/new-redirect-test';
  let response;

  it('Head to the repo given', async () => {
    try {
      response = await axios({
        method: 'HEAD',
        url: redirectUrl
      });
    } catch (error) {
      response = error;
    }
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.request.res.responseUrl).to.equal(answerUrl);
  });
  describe('Consume the new URL ', () => {
    it('the url is redirect to the new', async () => {
      response = await axios.get(redirectUrl);
      expect(response.status).to.equal(StatusCodes.OK);
    });
  });
});
