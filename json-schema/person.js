const Ajv = require("ajv").default
const schema_person = require("./schema/person.json")
const ajv = new Ajv()
const validate_person = ajv.compile(schema_person)

let p1 = {
    "firstName": "John",
  "lastName": "Doe",
  "age": 21
};

console.log(`p1 valid? --> ${validate_person(p1)}`);

let p2 = {
    "first": "John",
  "last": "Doe",
  "age": 21
};

console.log(`p2 valid? --> ${validate_person(p2)}`);