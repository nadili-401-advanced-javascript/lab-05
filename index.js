'use strict';

const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/app';

const configs = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(db, configs);

const Teams = require('./models/teams.js');
const People = require('./models/people.js');


// // File from console input
// let args = process.argv;
// if (args.length === 2){
//   // printCount();
// } else if (args.length === 3){
//   let name = args[2];
//   if (findPerson(name) === {}){
//      findTeam(name);
//   }
// };




const makePerson = async (person) => {
  let people = new People();
  let made = await people.create(person);
  console.log(made);
  return made;
}

const makeTeam = async (team) => {
  let newteam = new Teams();
  let made = await newteam.create(team);
  console.log(made);
  return made;
}


const findPerson = async (person) => {
  let found = await people.getByQuery(person);
  if (found === {}){
    return 'No record found';
  } else {
  return found;
  }
}
const findTeam = async (team) => {
  let found = await team.getByQuery(team);
  if (found === {}){
    return 'No record found';
  } else {
  return found;
  }
}


// makePerson({
//   firstName: 'Nadya',
//   lastName: 'Ilinskaya',
//   team: 0,
//   birthday: '07/11/1979',
//   likes: 'cats'
// }).then(() => {
//   console.log("Person created!");
// }).then(()=> mongoose.connection.close());

makeTeam({
  name:  'Red Heron',
  color: 'red'
}).then(() => {
  console.log("Team created!");
}).then(()=> mongoose.connection.close());