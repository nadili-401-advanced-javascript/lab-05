const Model = require('../models/model.js');
const schema = require('../models/people-schema.js');
// const Teams = require('../models/teams.js');
// const People = require('../models/people.js');
const supertester = require('./supertester.js');

let model = new Model(schema);

describe('Model', () => {
  test('can create', async () => {
    let person = await model.create({
        firstName: 'Nadya',
        lastName: 'Ilinskaya',
        birthday: '07/11/1979',
        likes: 'cats'
      });
    expect(person).toBeDefined();
  });

  xit('can read', () => {});

  xit('can update', () => {});

  xit('can delete', () => {});
});
