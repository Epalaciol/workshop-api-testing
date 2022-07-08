require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { expect, assert } = require('chai');
const axios = require('axios');
const md5 = require('md5');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
let repositoryUrl;

describe('Github Repositoriess Api Test GET', () => {
  describe('Aperdomob service', () => {
    it('Aperdomob info', async () => {
      const response = await axios.get(`${urlBase}/users/${githubUserName}`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.name).to.equal('Alejandro Perdomo');
      expect(response.data.company).to.equal('Perficient Latam');
      expect(response.data.location).to.equal('Colombia');
    });

    it('Aperdomo repositories', async () => {
      const repositoryExpectName = 'jasmine-json-report';
      const response = await axios.get(`${urlBase}/users/${githubUserName}/repos`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      const repositories = response.data;
      const repository = repositories.find((repo) => repo.name === repositoryExpectName);

      expect(response.status).to.equal(StatusCodes.OK);
      expect(repository.name).to.equal(repositoryExpectName);
      expect(repository.private).to.equal(false);
      expect(repository.description).to.equal('A Simple Jasmine JSON Report');
    });

    describe('Download a repository', async () => {
      let zipFile;
      before(async () => {
        const repositoryToDownload = 'jasmine-json-report';
        const response = await axios.get(`${urlBase}/users/${githubUserName}/repos`, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
        const repositories = response.data;
        const repository = repositories.find((repo) => repo.name === repositoryToDownload);
        repositoryUrl = repository.url;
        const downloadLink = await axios.get(`${repository.svn_url}/archive/${repository.default_branch}.zip`, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
        zipFile = downloadLink.data;
      });

      it('Verify Download', async () => {
        expect(zipFile).to.not.equal('');
      });
    });

    describe('Download a File', async () => {
      let readmeFile;
      const expectedData = {
        name: 'README.md',
        path: 'README.md',
        sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0',
        size: 51
      };
      before(async () => {
        const response = await axios.get(`${repositoryUrl}/contents`, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
        const repositoryFiles = response.data;
        readmeFile = repositoryFiles.find((file) => file.name === 'README.md');
      });
      it('Validate README.md', async () => {
        assert.exists(readmeFile);
        expect(readmeFile).contain(expectedData);
      });
      it('Download README.md', async () => {
        const expectedMD5 = '497eb689648cbbda472b16baaee45731';
        const responseReadme = await axios.get(`${readmeFile.download_url}`);
        const downloadReadme = responseReadme.data;
        //
        expect(md5(downloadReadme)).to.equal(expectedMD5);
      });
    });
  });
});
