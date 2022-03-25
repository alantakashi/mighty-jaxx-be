

## Coding Challenge for Web Engineers
This project was bootstrapped with 
- Nodejs
- MongoDB
- Apollo Server
- GraphQL
- bcryptjs

## Get it started
Clone down this repository. In the project root directory, run:

Installation:\
`npm install`

To Start Server:\
`node index.js`\
or\
`npm run serve`

To Test :\
`localhost:4000/graphql`

## Environment variables
You will need to create `.env` file in the project root folder of below environment variables and update accordingly
```js
PORT=4000
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_HOST=
MONGO_DATABASE=
BCRYPT_SECRET_WORD=
BASE_URL=http://localhost:4000
```
## Features
GraphQL sandbox explorer to test your graphql queries and mutations. Easy to include your own model, resolver and typedef
1. Admin: 
   - Query
	   -  All admins
   - Mutation
	   - Login
2. Products:
   - Query
	   - All products
	   - Get product by Id
	   - Search product by SKU
   - Mutation.
	   - Create new product
	   - Update product
	   - Delete product