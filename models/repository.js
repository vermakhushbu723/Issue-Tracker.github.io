const mongoose = require('mongoose');
// creating a repository schema in mongodb
const repoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const Repository = mongoose.model('Repository', repoSchema);

module.exports = Repository;