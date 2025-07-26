// server/models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    numero: String,
    code_pin: String,
    date: Date
});

module.exports = mongoose.model('Submission', submissionSchema);
