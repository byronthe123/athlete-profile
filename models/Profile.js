const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    sports: {
        type: Array,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;