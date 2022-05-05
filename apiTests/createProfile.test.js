const app = require('../app');
const supertest = require('supertest');
const { Profile } = require('../models/index');

test('POST /api/profile missing data', async () => {
    const body = {

    }

    const res = await supertest(app)
        .post('/api/profile')
        .send(body);

    expect(res.status).toBe(400);
});

test('POST /api/profile valid data', async () => {

    const numRecordsBefore = await Profile.find({});

    const body = {
        name: 'test',
        dateOfBirth: new Date(),
        location: 'test',
        team: 'test',
        gender: 'test',
        sports: ['abc', 'def'],
        about: 'test',
        interests: 'test',
        profileImage: 'test'
    }

    const res = await supertest(app)
        .post('/api/profile')
        .send(body);

    expect(res.status).toBe(200);

    const numRecordsAfter = await Profile.find({});
 
    expect(numRecordsAfter.length).toBe(numRecordsBefore.length + 1);

});