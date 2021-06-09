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
    "datacontenttype" : "application/json",
    "dataschema":"./schema/person.json",
    "data" : {
        "firstName": "John",
        "lastName": "Doe",
        "age": 21
    }
}
`;

let parsed = JSON.parse(cloudEvent);

const Ajv = require("ajv").default
const personEventSchema = require( parsed.dataschema );
const ajv = new Ajv();
const validatePersonAdded = ajv.compile(personEventSchema)

console.log(`person added valid? --> ${validatePersonAdded(parsed.data)}`);

let cloudEvent2 = `
{
    "specversion" : "1.0",
    "type" : "person.added",
    "source" : "/mycontext",
    "id" : "A234-1234-1234",
    "time" : "2018-04-05T17:31:00Z",
    "comexampleextension1" : "value",
    "comexampleothervalue" : 5,
    "unsetextension": null,
    "datacontenttype" : "application/json",
    "dataschema":"./schema/person.json",
    "data" : {
        "firstName": "John",
        "age": 21
    }
}
`;

parsed = JSON.parse(cloudEvent2);
console.log(`person added valid? --> ${validatePersonAdded(parsed.data)}`);