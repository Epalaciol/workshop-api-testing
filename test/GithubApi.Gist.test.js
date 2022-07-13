require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');
const chai = require('chai');
chai.use(require('chai-subset'));

const urlBase = 'https://api.github.com';

describe('Github Gist test HEAD', () => {
  describe('Create a promise anad a Gist', () => {
    const promise = `new Promise((resolve) => {
        setTimeout(() => {
          resolve('Hola, soy un test!');
        }, 4000);
      })`;
    const cist = {
      description: 'This is a gist for a test',
      public: true,
      files: {
        'promise.js': {
          content: promise
        }
      }
    };
    let gistCreated;
    it('Post gist created and expect answer', async () => {
      const response = await axios({
        method: 'POST',
        url: `${urlBase}/gists`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        data: cist
      });
      gistCreated = response.data;
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.data).containSubset(cist);
      expect(response.data.public).to.equal(true);
    });
    it('Verify Gist was created', async () => {
      const response = await axios.get(gistCreated.url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      expect(response.status).to.eql(StatusCodes.OK);
    });
    it('Delete Gist created', async () => {
      const response = await axios.delete(gistCreated.url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      expect(response.status).to.eql(StatusCodes.NO_CONTENT);
    });
    it('Verify the gist was deleted successfully', async () => {
      let response;
      try {
        response = await axios.get(gistCreated.url, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
      } catch (error) {
        response = error.response;
      }
      expect(response.status).to.equal(StatusCodes.NOT_FOUND);
      expect(response.statusText).to.eql('Not Found');
    });
  });
});
