const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { asyncHandler } = require('../middleware/index');
const { Profile } = require('../models/index');

const createProfileValidation = [
    check('name')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "Name"'),
    check('dateOfBirth')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "Date of Birth"'),
    check('location')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "Location"'),
    check('gender')
        .exists({ checkNull: true })
        .withMessage('Please provide a value for "Gender"'),
    check('sports')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "Sports"'),
    check('about')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "about"'),
    check('interests')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "interests"'),             
];

const updateProfileValidation = [
    ...createProfileValidation, 
    check('_id')
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage('Please provide a value for "_id"')
];

router.get('/', (req, res) => {
  return res.json('online');
});

router.get('/profiles', asyncHandler(async(req, res) => {
    const profiles = await Profile.find({});
    return res.json(profiles);
}));

router.post('/profile', createProfileValidation, asyncHandler(async(req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({ errors: errorMessages });
    }

    await Profile.create(req.body);

    const updatedProfiles = await Profile.find({});
    return res.json(updatedProfiles);
}));

router.put('/profile', updateProfileValidation, asyncHandler(async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);

        return res.status(400).json({ errors: errorMessages });
    }

    await Profile.updateOne({
        '_id': req.body._id
    }, req.body);

    const updatedProfiles = await Profile.find({});
    return res.json(updatedProfiles);
}));

module.exports = router;