require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';

describe('Github Repositoriess Api Test POST  & PATCH', () => {
  let repositories;
  it('Validate Public repositories', async () => {
    const response = await axios.get(`${urlBase}/user`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    //
    repositories = response.data;
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.public_repos).not.equal(0);
  });
  describe('Verify Repositoriess and creat issue', () => {
    let repositoryChoose;
    let issueCreated;
    it('Extract one repo', async () => {
      const response = await axios.get(repositories.repos_url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      repositoryChoose = response.data.pop();
      expect(repositoryChoose).not.to.equal(undefined);
    });
    it('Create an issue POST', async () => {
      const newIssue = { title: 'This a new issue' };
      const response = await axios({
        method: 'POST',
        url: `${repositoryChoose.url}/issues`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        data: newIssue
      });
      issueCreated = response.data;
      expect(response.status).to.equal(StatusCodes.CREATED);
      expect(response.data.title).to.equal(newIssue.title);
      expect(response.data.body).to.equal(null);
    });
    it('Modify Issue PATCH', async () => {
      const updatedIssue = { body: 'This is the new body' };
      const response = await axios({
        method: 'PATCH',
        url: `${repositoryChoose.url}/issues/${issueCreated.number}`,
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        data: updatedIssue
      });
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.title).to.equal(issueCreated.title);
      expect(response.data.body).to.equal(updatedIssue.body);
    });
  });
});
