require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';

describe('Query parameters', () => {
  it('Verify number of users', async () => {
    const response = await axios.get(`${urlBase}/users`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.length).to.equal(30);
  });
  it('Obtain only 10 users', async () => {
    const response = await axios.get(`${urlBase}/users`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      },
      params: {
        per_page: 10
      }
    });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.length).to.equal(10);
  });
  it('Obtain only 100 users', async () => {
    const response = await axios.get(`${urlBase}/users`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      },
      params: {
        per_page: 100
      }
    });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.length).to.equal(100);
  });
});
