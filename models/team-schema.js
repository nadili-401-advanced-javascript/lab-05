'use strict';

const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({

  name: {required: true, type: 'string'},
  color: {required: true, type: 'string', lowercase: true, enum: ['red', 'blue', 'yellow']},
  
});

module.exports = mongoose.model('people', peopleSchema); 