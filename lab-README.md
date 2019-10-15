# LAB: Data Modeling With NoSQL Databases

In this lab, we're going to re-work our Lab 04 to use MongoDB and Mongoose.

## Requirements

You will be required to populate an empty MongoDB database with `people` and `team` entries, similar to Lab 04.

You can choose to do this lab in one of two ways (or some combination):

- Do most of the actions through the terminal connection to mongo
- Do the actions through running a program like `index.js`

Whichever route you choose, remember that we'll be looking for your database in the `/data/` folder of your repo, and we'll be looking for a database named `app`.

Remember, if you have `index.js` create entries in your database, then every time you re-run `index.js` you'll get duplicate entries in your database. So be careful with this!

For your final submission, we require that you have an `index.js` which console logs information read from the MongoDB database.

### Setup

- Install MongoDB, Mongoose and Supertest in your `package.json`. Remove any unnecessary packages
  - Think about: Do you need `uuid` or `uuid-validate` any more?
- Run your MongoDB server with a path to a folder in your lab called data:
  `mongod --dbpath=./data/`

### Model

- Convert `model.js` into using the MongoDB CRUD system
  - Hint: We did this a lot of this in the demo [`/demo/mongo`]
  - Hint: We should no longer need a `load()` operation
- In your `model.js`, add a method called `getFromField`, which takes in an object parameter and returns the search result for objects that match the fields in the object parameter
  - Hint: You probably want to use the `find()` method
  - Think about:
    - Should you do any validation here?
- In your `model.js`, add a method called `count()` which takes in an object parameter. This method will search the database for items that match the object paramter, and return the number of items that match.
  - Hint: You might want to use the [built-in `count()` method](http://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html#countDocuments)

### People

- Convert your `people.js` so that it properly uses your new `model.js`
  - Hint: We did this in the demo [`/demo/mongo`]
- Move your schema definition into a new file called `people-schema.js`, and use Mongoose to properly define your schema
  - Hint: We did this in the demo [`/demo/mongo`]
  - Think about:
    - If something is an id, we should have a `_` at the beginning of its key name
- Add to your schema so that it matches the following rough outline (note: you will need to convert this to match [Mongoose types](https://mongoosejs.com/docs/schematypes.html))

```javascript
{
  firstName: {required: true, type: "string"},
  lastName: {required: true, type: "string"},
  team: {required: false, type: "uuid"},
  birthday: {required: true, type: "date"},
  likes: {required: true, type: "string", lowercase: "true", enum: ["cats", "dogs", "none", "both"]}
}
```

### Teams

- Convert your `teams.js` so that it properly uses your new `model.js`
  - Hint: We did this in the demo [`/demo/mongo`]
- Move your schema definition into a new file called `teams-schema.js`, and use Mongoose to properly define your schema
  - Hint: We did this in the demo [`/demo/mongo`]
- Add to your scheam so that it matches the following rough outline (note: you will need to convert this to match [Mongoose types](https://mongoosejs.com/docs/schematypes.html))

```javascript
{
  name: {required: true, type: "string"},
  color: {required: true, type: "string", lowercase: "true", enum: ["red", "blue", "yellow"]}
}
```

### Data Operations

- Add each of your classmates to your database (do not set their teams). Add yourself as well, so that you have a total of 7 people
- Add the following four teams:

```javascript
{
  name: "Red Heron",
  color: "red"
}
{
  name: "Blue Otter",
  color: "blue"
}
{
  name: "Yellow Rhino",
  color: "yellow"
}
```

- Randomly assign each person to a team, so that you have two teams of two and one team of three
- In your `index.js` write a code that will do the following based on command line arguments:
  - No command line arguments: print the count of Teams and People
  - Name of a person command line argument: print the information for that person if a person was found. Print "No record found", if that name doesn't exist in the database
  - Name of a team command line argument: print the information for that team and the members of that team if the team name was found. Otherwise print "No record found".
- See sample output below:

```
>> node index.js

Teams: 3
People: 7

>> node index.js Sonia Kandah

Name: Sonia Kandah
Team: Yellow Rhino
Birthday: 2/22/2020
Likes: Cats and Dogs

>> node index.js Yellow Rhino

Team Name: Yellow Rhino
Members:
- Sonia Kandah
- Erin Trainor

>> node index.js Pink Flamingo

No record found
```

### Tests

- Test out the database CRUD operations using the package `supertest`
  - Think about:
    - Can you re-use your tests from Lab 04?
    - Do you need mocks for this application?

## Assignment Submission Instructions

### Configure your repository

For each part of this lab, configure your folder with the following files and directories.

- `README.md` - contains your lab documentation ([template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/reference/submission-instructions/labs/README-template.md))
- `.env` - If you deploy your app to Heroku, this file should exist and contain important environment variables for Heroku
- `.gitignore` - contains a robust .gitignore file ([template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/configs/.gitignore))
- `.eslintrc.json` - contains the course linter configuration ([template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/configs/.eslintrc.json))
- `.eslintignore` - contains the course linter ignore configuration ([template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/configs/.eslintignore))
- `.travis.yml` - contains the course linter ignore configuration ([template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/configs/.travis.yml))
- `package.json` - contains npm package config and scripts ([script template](https://github.com/codefellows/seattle-javascript-401n14/blob/master/configs/package.json.notes))
  - Add your name in the `author` field (you can do this easily using `npm init`)
  - Create a `lint` script for running eslint (`eslint **/*.js`)
  - Create a `test` script for running tests
  - Create `start` script to run `index.js`
- `/__tests__/` - contains unit tests
- `/__mocks__/` - contains mock files
- `/__data__/` - contains your MongoDB database information
- `/docs/` - Where your documentation will reside (no generation needed)
  - `/docs/config`
  - `/docs/config/jsdoc.config.json`
    - JSDOC Config File
    - Edit this for each lab if your folder structure is different

### Heroku

Typically, when we have a lab that includes a database using MongoDB, we want to deploy our app to Heroku so that we don't use a localhost url when attempting to access our database.

Because this is the first app where you'll be working with a database, deployment to Heroku is **optional but recommended**. We will be going over this process in a little more depth during Lab 06.

Check out [these instructions](https://medium.com/make-school/how-to-deploy-your-node-js-mongodb-app-to-the-web-using-heroku-63d4bccf2675) about how to deploy to Heroku, so that you can experiment with the process for this lab.

If you do deploy to Heroku, most likely you will want an `.env` file with some variables that are specific to Heroky (such as url to your database, port number, etc).

**Whether you use Heroku or not**, you will need to have detailed instructions in your `README` for how to run your application and how to access the application data.

If you do not deploy to Heroku, describe where your database data is stored (most likely in the `/data` folder of your project). Be sure to list out any other steps, such as how to start the MongoDB database from the terminal.

If you deploy to Heroku, make sure to include a URL to your running Heroku server.

### Submit to Canvas

- Ensure that your `README.md` exists and has:
  - A link to your TravisCI
  - A link to pull request from your lab branch to your master branch in your forked repository
    - Keep this pull request open (**don't merge to master**) in case you need to resubmit your lab
  - Your module names for the application
  - Instructions for how to run your application
  - Instructions for how to test your application
  - Embedded UML diagram image

Be sure to delete any placeholder content if you use `README-template.md`. Once you've ensured your `README.md` is correct, within Canvas submit a link to your `README.md`

### Resubmitting

- Your open pull request will be your gateway to resubmitting
- Commit and push your changes in your lab branch, and they should be updated on the pull request
- Only one resubmit allowed

## Grading Rubric

### Requirements:

- Program takes a name as a command line argument
- `model.js`
  - Implement all CRUD operations for MongoDB
  - Implement `getFromField`
  - Implement `count`
- `people.js` and `people-schema.js` / `teams.js` and `teams-schema.js`
  - Should extend Model
  - Implement all the features of the schema
- `index.js`
  - Handle command line arguments for:
    - People
    - Teams
    - No input
- MongoDB
  - Have entries in your database that match:
    - 7 people
    - 3 teams

### Code Quality:

- Properly modularized
- Functional programming where it makes sense

### Tests:

- Test all CRUD operations
- Test your index.js output

| Criteria                                                                                                       | Points |
| -------------------------------------------------------------------------------------------------------------- | ------ |
| Features: Score based on % of features demonstrably completed                                                  | 3      |
| Code Implementation: Efficiency of code + JSDoc Comments + Code Quality + Modularity + Monolithic + Functional | 3      |
| Tests: MUST HAVE A TRAVIS URL TO BE CONSIDERED! One unit test minimum, 80% coverage for full points            | 2      |
| Documentation: README + UML                                                                                    | 2      |
| Total:                                                                                                         | 10     |
