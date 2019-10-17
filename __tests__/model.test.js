const Model = require('../models/model.js');
const schema = require('../models/people-schema.js');
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

  test('can read', async () => {
    let query = {firstName: 'Nadya'}
    let person = await model.getFromField(query);
    expect(person).toBeDefined();
  });


});
