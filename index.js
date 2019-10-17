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

let people = new People();
let teams = new Teams();
  
const find = async (s1, s2) => {
  let foundPerson = await people.getFromField({
    firstName: s1,
    lastName: s2
  });
  let foundTeam =  await teams.getFromField({
    name: s1 + ' ' + s2
  })
  if (foundPerson.length > 0) {
    await printPerson(foundPerson[0]);
  } else if (foundTeam.length > 0){
    await printTeam(foundTeam[0]);
  } else {
    console.log ('No record found');
  }
}

const print = async () => {
  console.log("here!!!");
   let peoplePrint = await people.print();
   console.log(peoplePrint);
}



const printPerson = async (person)=> {

  console.log('Name: ', person.firstName, person.lastName);
  let team = {};
  if(person._team){
   team = await teams.get(person._team);
  }
  if(team.name) {
    console.log('Team: ', team.name);
  }
  
  console.log('Birthday: ', person.birthday);
  console.log ('Likes: ', person.likes);

}
const printTeam = async (team)=> {
  console.log('Team Name: ', team.name);
  console.log('Color: ', team.color);
  console.log('Members: ');

  let members = await people.getFromField({_team: team._id});

  if(members)
    members.forEach(el => {
      console.log('-', el.firstName, el.lastName);
    });
  else console.log(' empty team ')
}

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

const printCounts = async () => {
  let teamCount = await teams.count();
  let peopleCount = await people.count();

  console.log('Teams: ', teamCount);
  console.log('People: ', peopleCount);
}


/**
 * 
 *   Code below commented to acvoid dupes in DataBase
 * 
 *  */

// makePerson({
//   firstName: 'Nadya',
//   lastName: 'Ilinskaya',
//   _team: 0,
//   birthday: '07/11/1979',
//   likes: 'cats'
// }).then(() => {
//   console.log("Person created!");
// }).then(()=> mongoose.connection.close());

// makeTeam({
//     name: 'Yellow Rhino',
//     color: 'yellow'  
// }).then(() => {
//   console.log("Team created!");
// }).then(()=> mongoose.connection.close());


 const close = () =>{
    mongoose.connection.close();
  }

  // print().then(() => {
  //   console.log("print is done!");
  // }).then(close);

  let args = process.argv;
  if (args.length == 4){
    find(args[2], args[3]).then(close);
  } else {
    printCounts().then(close);
  }
