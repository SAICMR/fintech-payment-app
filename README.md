# Payment Gateway Node js OAuth2 Express js ES6 RESTful API Docker Example

Payment Gateway Node js OAuth2 Express js ES6 RESTful API Docker Example

## Description
The purpose of this template is to kick-start your node js payment gateway API. 
It implements best practices in developing RESTful APIs and Domain-Driven Design. 

Features include:
- API versioning allows you to alter behavior between different clients. ... Versioning is determined by the incoming client request, and may either be based on the request URL, or based on the request headers. There are a number of valid approaches to approaching versioning.
- A basic example of a OAuth2 server, using [oauth2-server](https://github.com/oauthjs/oauth2-server) (version 3.0.1) with the MVP model configuration.
- User management describes the ability for administrators to manage user access to various IT resources like systems, devices, applications, storage systems, networks, SaaS services, and more. User management is a core part to any directory service and is a basic security essential for any organization.
- Use of the Hexagonal Architecture to arrange the application into logical layers, with well-defined responsibilities.
- RESTful APIs are implemented using the Express framework.
- Persistence is implemented using an in-memory repository layer. This can be substituted with any persistence technology of your choice.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them


- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/download/)


## Quick Start

```
git clone git@github.com:angelospillos/node-api-oauth-server-payment-gateway.git
cd node-api-oauth-server-payment-gateway
npm install
npm start
```
The server should now be running at `http://localhost:8080`.

## Authentication
API methods require
authentication by passing a bearer token (https://tools.ietf.org/html/rfc6750).
There are specific API endpoints to obtain such tokens.


## API Methods

### Classic Authentication

- Description: Issues a temporary authentication token that can be used for the rest of the calls using username and password.
- Method: POST
- Path: /v1/authenticate

Request Body
```
{
    "username": "pillos",
    "password": "password"
}
```

Response Body
```
{
    "authToken":"fJizPj8LxL3eKOy1GEIMPcdPQqgxN42oprukdHLu8jgbV",
    "expiresIn": "2017-01-22T11:26:14.805Z"
}
```

Curl Example
```
curl http://localhost:8080/v1/authenticate -H "Content-Type: application/json" -d "{\"username\":\"pillos\",\"password\":\"password\"}"
```

### OAuth2 Authentication

- Description: Issues a temporary authentication token that can be used for the rest of the calls using OAuth 2 Specification.
- Method: POST
- Path: /v1/authenticate

Request Headers
```
"Content-Type: application/x-www-form-urlencoded"
```

Request Body
```
client_id=clientid&client_secret=clientsecret&grant_type=password&username=pillos&password=password

```

Response Body
```
{
    "authToken":"fJizPj8LxL3eKOy1GEIMPcdPQqgxN42oprukdHLu8jgbV",
    "expiresIn": "2017-01-22T11:26:14.805Z"
}
```

Curl Example
```
curl http://localhost:8080/v1/authenticate/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -d "client_id=clientid&client_secret=clientsecret&grant_type=password&username=pillos&password=password"
```


### List payments
- Description: Returns the list of existing payments.
- Method: GET
- Path: /v1/payments
- Request body:none

Request Headers
```
"Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```

Response Body
```
[
   {
      "id":"9781bd16-8221-4eb6-a37f-2eb60acc1338",
      "payeeId":"a5b500e1-2ba7-4623-baa2-e09b6a721b5e",
      "payerId":"d8f090ae-a4ed-42dc-9181-f51564d0e304",
      "paymentSystem":"yandexMoney",
      "paymentMethod":"PMB",
      "amount":1337.01,
      "currency":"RUB",
      "status":"created",
      "comment":null,
      "created":"2018-03-09T11:26:14.805Z",
      "updated":"2018-03-09T11:31:14.666Z"
   }
]
```

Curl Example
```
curl http://localhost:8080/v1/payments -H "Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```

### Create payment
- Description: Creates a new payment.
- Method: POST
- Path: /v1/payments

Request Headers
```
"Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```

Request Body
```
{
   "payeeId":"fc1941f3-7912-4b3d-8fdb-dcb9733aa994",
   "payerId":"0499274e-9325-43b1-9cff-57c957e9a337",
   "paymentSystem":"ingenico",
   "paymentMethod":"mastercard",
   "amount":100500.42,
   "currency":"USD",
   "comment":"Salary for March"
}
```

Response Body
```
[
   {
      "id":"9781bd16-8221-4eb6-a37f-2eb60acc1338",
      "payeeId":"a5b500e1-2ba7-4623-baa2-e09b6a721b5e",
      "payerId":"d8f090ae-a4ed-42dc-9181-f51564d0e304",
      "paymentSystem":"yandexMoney",
      "paymentMethod":"PMB",
      "amount":1337.01,
      "currency":"RUB",
      "status":"created",
      "comment":null,
      "created":"2018-03-09T11:26:14.805Z",
      "updated":"2018-03-09T11:31:14.666Z"
   }
]
```

Curl Example
```
curl http://localhost:8080/v1/payments -H "Authorization: Bearer f06684dea957c103ca4133d74fea2953dfc82c39" -H "Content-Type: application/json" -d "{\"payeeId\":\"fc1941f3-7912-4b3d-8fdb-dcb9733aa994\",\"payerId\":\"0499274e-9325-43b1-9cff-57c957e9a337\",\"paymentSystem\":\"ingenico\",\"paymentMethod\":\"mastercard\",\"amount\":100500.42,\"currency\":\"USD\",\"comment\":\"Salary for March\"}" 
```
### Get payment
- Descriptions: Returns an existing payment.
- Method: GET
- Path: /v1/payment/:id
- Request body: none

Request Headers
```
"Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```
Response Body
```
{
   "id":"9781bd16-8221-4eb6-a37f-2eb60acc1338",
   "payeeId":"a5b500e1-2ba7-4623-baa2-e09b6a721b5e",
   "payerId":"d8f090ae-a4ed-42dc-9181-f51564d0e304",
   "paymentSystem":"yandexMoney",
   "paymentMethod":"PMB",
   "amount":1337.01,
   "currency":"RUB",
   "status":"created",
   "comment":null,
   "created":"2018-03-09T11:26:14.805Z",
   "updated":"2018-03-09T11:31:14.666Z"
}
```

Curl Example
```
curl http://localhost:8080/v1/payments/0c77e7b6-072e-4861-950a-772c69512648 -H "Authorization: Bearer 66204be5cf4b16ecb25a5817092ec9f204c6d7e6"
```

### Approve payment
- Description: Approves a payment, effectively it moves money from a payer account to a payee account.
- Method: PUT
- Path: /v1/payments/:id/approve
- Request body:none
- Response body: none

Request Headers
```
"Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```

Curl Example
```
curl -X PUT http://localhost:8080/v1/payments/0c77e7b6-072e-4861-950a-772c69512648/approve -H "Authorization: Bearer 8d1213c968ba5f9675df380d75cdd79f1f7ce694"
```

### Cancel payment
- Description: Cancels created payment that hasn’t been approved yet.
- Method: PUT
- Path: /v1/payments/:id/cancel
- Request body:none
- Response body: none

Request Headers
```
"Authorization: Bearer 147a552f1d36bc6549f1277697ce39ef6dfbd236"
```

Curl Example
```
curl -X PUT http://localhost:8080/v1/payments/b90c73cf-177a-48d6-abcd-9df1b9ad262d/cancel -H "Authorization: Bearer 8d1213c968ba5f9675df380d75cdd79f1f7ce694"
```

## HTTP Status codes
Each response contains aproper HTTP codeset. Here are the details:
- 200 — Success
- 201 — Created
- 400 — Client error (e.g. validation)
- 401 — Unathorized
- 500— Server error

## Errors

### Structure
In caseof an error (both client 4xx and server 5xx), response will contain an object with the following structure:
```
{
   "code":"string",
   "message":"string"
}
```

### Unauthorized Error
```
{
   "code":"ERR_UNATHORIZED",
   "message":"No auth token provided"
}
```
### Auth Token Expired Error
```
{
   "code":"ERR_AUTH_TOKEN_EXPIRED",
   "message":"Auth token expired"
}
```

### Validation Error
```
{
   "code":"ERR_VALIDATION",
   "message":"Validation failed",
}
```

### Cannot Approve Error
```
{
   "code":"ERR_CANNOT_APPROVE",
   "message":"Cannot approve a payment that has already been cancelled"
}
```

### Cannot Cancel Error
```
{
   "code":"ERR_CANNOT_CANCEL",
   "message":"Cannot cancel a payment that has already been approved"
}
```

### Route Not Found Error
```
{
   "code":"ERR_ROUTE_NOT_FOUND",
   "message":"Route X Not Found"
}
```

## Architecture

```
/src
    /dtos
    /routes
    /services
    /repositories
    /utils
```

The source folder contains sub-folders that arrange the application into logical
layers as suggested by the onion architecture.

-   `dtos` The dtos folder contains the dtos. A data transfer object(DTO) is an object that carries data between processes. The motivation for its use is that communication between processes is usually done resorting to remote interfaces (e.g., web services), where each call is an expensive operation.

-   `routes:` This is the adapter layer of the Hexagonal Architecture. It adapts
the HTTP transforms the HTTP requests from the external world to the service
layer and transforms the objects returned by the service layer to HTTP
responses.

-   `services`: The service layer coordinates high-level activities such as
creation of domain objects and asking them to perform tasks requested by the
external world. It interacts with the repository layer to save and restore objects.

-   `repositories`: The repository layer is responsible for persisting domain
objects and performing CRUD operations on them. This template uses in-memory
persistence, however it can be easily replaced to use a relational or NoSQL database.

-   `utils`: The utils folder contains useful utilities and helpers.

## Production Build

```bash
$ npm run build
$ npm run serve
```

## Docker Build

```bash
$ docker build -t <dockerhub_username>/payment-service-server:1.0.0 .
$ docker run -d --rm --name rest-server -p 8080:8080 <dockerhub_username>/payment-service-server:1.0.0
```

## Versioning

For the versions available, see the [tags on this repository](https://github.com/angelospillos/gateway/tags). 

## Authors

* **Angelos Pillos** - (https://www.angelospillos.com)

See also the list of [contributors](https://github.com/angelospillos/gateway/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* FxPro https://www.fxpro.com
* Archfirst https://archfirst.org/
