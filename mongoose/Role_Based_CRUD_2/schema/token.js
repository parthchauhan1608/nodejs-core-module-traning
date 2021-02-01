const mongoose = require('mongoose');

const token = new mongoose.Schema({
    token: {
        type: String,
        require: true
    }
  });

exports.Token = mongoose.model('Tokens', token);
