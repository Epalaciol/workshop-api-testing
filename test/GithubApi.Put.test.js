require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('Github Repositoriess Api Test PUT', () => {
  describe(`Follow user ${githubUserName} in Github`, () => {
    it('Validate 204 Answer', async () => {
      const response = await axios({
        method: 'PUT',
        url: `${urlBase}/user/following/${githubUserName}`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      //
      expect(response.status).to.equal(StatusCodes.NO_CONTENT);
      expect(response.data).to.equal('');
    });

    it(`user ${githubUserName} is in the list`, async () => {
      const response = await axios.get(`${urlBase}/user/following`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });

      const userFollowed = response.data.find(
        (usuario) => usuario.login === githubUserName
      );
      expect(userFollowed.login).to.eql(githubUserName);
    });
  });
});
