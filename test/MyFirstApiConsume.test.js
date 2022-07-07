const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
    it('Consume GET service', async () => {
        const response = await axios.get('https://httpbin.org/ip');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
    })

    it('Consume GET Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.get('https://httpbin.org/get', {query});

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.query).to.eql(query);
    })

    it('Consume POST service', async() => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.post('https://httpbin.org/post', {query});

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.not.be.null;
        expect(response.data.json.query).to.eql(query);

    })

    it('Consume PATCH service', async() => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.patch('https://httpbin.org/patch', {query});

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.not.be.null;
        expect(response.data.json.query).to.eql(query);

    })

    it('Consume PUT service', async() => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.put('https://httpbin.org/put', {query});

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.not.be.null;
        expect(response.data.json.query).to.eql(query);

    })

    it('Consume DELETE service', async() => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.delete('https://httpbin.org/delete', {query});

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.be.null;
        expect(response.data.data).to.be.empty;


    })
});
