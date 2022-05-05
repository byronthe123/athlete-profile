const app = require('../app');
const supertest = require('supertest');
const { Profile } = require('../models/index');

test('PUT /api/profile valid data', async () => {

    const profiles = await Profile.find({});

    // if (profiles.length === 0) {
    //     await Profile.create({
    //         name: 'test',
    //         dateOfBirth: new Date(),
    //         location: 'test',
    //         team: 'test',
    //         gender: 'test',
    //         sports: ['abc', 'def'],
    //         about: 'test',
    //         interests: 'test',
    //         profileImage: 'test'
    //     });
    // }

    const res = await supertest(app)
        .get('/api/profiles');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.any(Array));
    expect(res.body.length).toBeGreaterThanOrEqual(1);
});