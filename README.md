# Url Shortener

## Service Specification
- [x] 1. Make a small REST API that receives in a URL with Python or Typescript
- [x] 2. Using the supplied URL, generate a unique URL with the base of tier.app. It should be generated keeping uniqueness in mind
- [x] 3. Return the shortened URL
- [x] 4. Bonus: track the visits in a second DB table for stats be returned.

## Description
The solution is implemented using the Functional Programming Paradigm. All dependencies are injected from the root for more testability.


[Fastify](https://www.fastify.io/) is used for rest server implementation and request/response payloads validated using JSON Schema Validator.
[Jest](https://jestjs.io/) is used for the test running framework.
[MongoDb]() is used as document database


## TODO List
- [ ] Implementing and inject log dependency
- [ ] Handle exceptions gracefully
- [ ] Adding more tests (successful and unsuccessful scenarios)
- [ ] Setup ts-lint

## Commands
### Start Server
```
npm i && npm start
```


### Run Tests
```
npm test
```

### Run using docker compose
While you are in the root of repository execute following commands:
```
$ docker compose build
$ docker compose up -d
```

### Request Example

In order to see the service is working in action, please open ```url.short``` from the 

#### Get shortened version of the url
In order to see the service is working in action, please open ```url.short``` from the following api call response.
```
POST /api/url HTTP/1.1
Host: localhost:3011
Content-Type: application/json

{
    "targetUrl": "http://www.google.com",
    "utm": {
        "source": "some-source",
        "medium": "some-medium",
        "campaign": "some-campaign"
    }
}
```
Sample response:
```
{
    "url": {
        "uid": "itiDx7r5N0",
        "long": "http://www.google.com",
        "short": "http://localhost:3000/itiDx7r5N0",
        "longWithUtm": "http://www.google.com?source=some-source&&medium=some-medium&&campaign=some-campaign"
    }
}
```
#### Get status
```
GET /api/stats/{some-uid} HTTP/1.1
```
Sample response:
```
{
    "uid": "Mm272OGEKN",
    "visits": 1
}
```