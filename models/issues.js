const mongoose = require('mongoose');
// creating an issue schema in mongodb
const issuesSchema = new mongoose.Schema({
    issuename: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    repository:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repository'
    }
})

const issues = mongoose.model('Issue', issuesSchema);

module.exports = issues;