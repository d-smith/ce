const avro = require('avro-js');
let cloudEventType = avro.parse('./ce-spec.avsc');
let personType = avro.parse('../avro/person.avsc');

let person = {
    firstName: "John",
    lastName: "Doe",
    age: 21
};

let personEvent = {
    "attribute": {
        "type": {"string":"com.example.person.created"},
        "specversion": {"string":"1.0"},
        "contenttype": {"string": "application/avro"},
        "dataschema": {"string":"../avro/person.avsc"},
        "an-extension-attribute": {"string":"my stuff"},
    },
    "data":{"bytes":personType.toBuffer(person)}
};

console.log("avro serializable cloud event");
console.log(personEvent);

console.log('serialize...');
var buf = cloudEventType.toBuffer(personEvent);
console.log(buf)

console.log("decode the event using the type unmarshaller")
let decodedEvent = cloudEventType.fromBuffer(buf);
console.log(decodedEvent)

console.log('valid cloud event?');
console.log(cloudEventType.isValid(decodedEvent));

console.log('extract person type encoded in the data portion of the payload');
let decodedPerson = personType.fromBuffer(decodedEvent.data.bytes)

console.log('unmarshalled person type')
console.log(decodedPerson)

console.log('type valid?')
console.log(personType.isValid(decodedPerson))
//let decodedPerson = personType.fromBuffer(decodedEvent.data.

//let decodedPerson = personType.fromBuffer(Buffer.from(parsed.data, 'base64'));

//let generated = cloudEventType.random();
//console.log(JSON.stringify(generated))
