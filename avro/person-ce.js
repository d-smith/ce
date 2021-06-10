
const avro = require('avro-js');
let personType = avro.parse('./person.avsc');

let person = {
    firstName: "John",
    lastName: "Doe",
    age: 21
};

var buf = personType.toBuffer(person).toString('base64');

let cloudEvent = `
{
    "specversion" : "1.0",
    "type" : "person.added",
    "source" : "/mycontext",
    "id" : "A234-1234-1234",
    "time" : "2018-04-05T17:31:00Z",
    "comexampleextension1" : "value",
    "comexampleothervalue" : 5,
    "unsetextension": null,
    "datacontenttype" : "application/vnd.apache.avro;version=1.9.0",
    "dataschema":"./person.avsc",
    "data" : "${buf}"
}
`;

console.log(cloudEvent);

let parsed = JSON.parse(cloudEvent);

let validator = avro.parse(parsed.dataschema);
let decodedPerson = personType.fromBuffer(Buffer.from(parsed.data, 'base64'));
console.log(decodedPerson);
console.log(`is valid? ${personType.isValid(decodedPerson)}`);
