const app = require('../app');
const supertest = require('supertest');
const { Profile } = require('../models/index');

test('PUT /api/updateProfile missing data', async () => {
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
        .put('/api/profile')
        .send(body);

    expect(res.status).toBe(400);
});

test('PUT /api/profile valid data', async () => {

    const createBody = {
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
 
    const created = await Profile.create(createBody);
    createBody._id = created._id;
    createBody.about = 'updated';
    createBody.sports = ['abc', 'def', 'dgh'];

    const res = await supertest(app)
        .put('/api/profile')
        .send(createBody);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Array));

    const updated = await Profile.findOne({ _id: createBody._id });
    expect(updated.about).toBe(createBody.about);
    expect(updated.sports).toEqual(createBody.sports);
});