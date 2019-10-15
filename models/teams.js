'use strict';

const Model = require('./model.js');
const schema = require('./team-schema.js');

class Teams extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Teams;