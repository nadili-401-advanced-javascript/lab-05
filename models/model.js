'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  // CRUD: create
  create(item) {
    // returns a Promise!
    let validatedItem = new this.schema(item);
    return validatedItem.save();
  }
  delete (_id, record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  update(record){
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  // CRUD: read / search - we don't know if it exists
  get(_id) {
    // return a Promise!
    if (_id) return this.schema.findOne({ _id });
    else return this.schema.findOne({});
  }
  
  getFromField(query){
    if(query) {
      return this.schema.find(query);
    }
    else {
      return this.schema.find({});
    }
  }

  getByQuery(query) {
    // query is an object!
    // ex: {firstName: 'Sarah'}
    if (query) return this.schema.find(query);
    else return this.schema.find({});
  }

  count() {
      return this.schema.countDocuments();
  }


print() {
      let docs = this.schema.find();    
      return docs;
  }
}


module.exports = Model;
