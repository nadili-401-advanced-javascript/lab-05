'use strict';

const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/app';

const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(db, configs);

//const Teams = require('./models/teams.js');
const People = require('./models/people.js');

let people = new People();

const makePerson = async (person) => {

  let found = await people.getByQuery(person);
  console.log(found);
  return found;
}

makePerson({
  firstName: 'Sarah',
  lastName: 'Smalls'
}).then(() => {
  console.log("i'm here!");
  mongoose.connection.close();

});