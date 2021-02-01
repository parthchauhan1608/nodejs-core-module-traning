const mongoose = require('mongoose');

const token = new mongoose.Schema({
    token: {
        type: String
    }
  });

exports.Token = mongoose.model('Tokens', token);
