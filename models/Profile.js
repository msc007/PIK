const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;