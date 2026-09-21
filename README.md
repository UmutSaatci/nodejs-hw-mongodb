Contacts App

A RESTful Contacts API built with Node.js, Express.js, MongoDB, and Mongoose.

This branch (hw7-swagger) focuses on adding and configuring Swagger / OpenAPI documentation for the Contacts API and preparing the application for deployment on Render.

Features
User registration
User login
JWT-based authentication
Create contacts
Get contacts with pagination
Get a contact by ID
Update a contact
Delete a contact
Contact filtering and sorting
MongoDB database integration
Swagger / OpenAPI 3.1 documentation
Swagger UI
Render deployment configuration
Technologies
Node.js
Express.js
MongoDB
Mongoose
JWT
Swagger / OpenAPI 3.1
Swagger UI Express
Redocly
Pino HTTP
CORS
Cookie Parser
Nodemon
Render
Project Structure
.
├── docs/
│   ├── openapi.yaml
│   └── swagger.json
│
├── swagger/
│   ├── components/
│   │   ├── responses/
│   │   │   ├── 401.yaml
│   │   │   ├── 404.yaml
│   │   │   └── 409.yaml
│   │   └── schemas/
│   │       ├── contact.yaml
│   │       ├── user.yaml
│   │       └── user-register.yaml
│   │
│   └── paths/
│       ├── contacts/
│       │   ├── get.yaml
│       │   ├── post.yaml
│       │   └── {id}/
│       │       ├── get.yaml
│       │       ├── patch.yaml
│       │       └── delete.yaml
│       │
│       └── auth/
│           ├── register/
│           │   └── post.yaml
│           └── login/
│               └── post.yaml
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── routers/
│   ├── services/
│   └── index.js
│
├── .env
├── package.json
└── README.md
Installation

Clone the repository:

git clone <repository-url>

Enter the project directory:

cd <project-directory>

Install dependencies:

npm install
Environment Variables

Create a .env file in the project root.

Example:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Do not commit .env or other sensitive credentials to the repository.

Available Scripts
Start the application
npm start
Start in development mode
npm run dev

Nodemon is used during development, so the server automatically restarts when source files change.

Build Swagger documentation
npm run build

This command generates the bundled OpenAPI JSON file:

docs/swagger.json

from:

docs/openapi.yaml
Build Swagger documentation directly
npm run build-docs
Preview API documentation
npm run preview-docs
Swagger Documentation

After starting the application, Swagger UI is available at:

http://localhost:3000/api-docs/

The API documentation is based on OpenAPI 3.1.0.

The OpenAPI source file is:

docs/openapi.yaml

The generated Swagger JSON file is:

docs/swagger.json
API Endpoints
Authentication
Method	Endpoint	Authentication
POST	/auth/register	No
POST	/auth/login	No
Contacts
Method	Endpoint	Authentication
GET	/contacts	Bearer Token
POST	/contacts	Bearer Token
GET	/contacts/{id}	Bearer Token
PATCH	/contacts/{id}	Bearer Token
DELETE	/contacts/{id}	Bearer Token
Authentication

Protected endpoints use Bearer Token authentication.

After logging in through:

POST /auth/login

the API returns an access token.

Example:

{
  "status": 200,
  "message": "Successfully logged in an user!",
  "data": {
    "accessToken": "YOUR_ACCESS_TOKEN"
  }
}

The token can then be used in the Swagger UI through the Authorize button.

Enter only the token:

YOUR_ACCESS_TOKEN

Swagger automatically sends:

Authorization: Bearer YOUR_ACCESS_TOKEN
Swagger Server Configuration

The OpenAPI configuration contains both local and production servers.

Example:

servers:
  - url: http://localhost:3000
    description: Local development server

  - url: https://your-project.onrender.com
    description: Production server

The production URL should be replaced with the actual Render service URL after deployment.

Deployment

This branch is intended to be deployed to Render.

Recommended Render configuration:

Runtime:
Node

Build Command:
npm install && npm run build

Start Command:
npm start

Branch:
hw7-swagger

Environment variables such as the MongoDB connection string and JWT secret should be configured through Render's Environment Variables section.

After deployment, the API will be available at:

https://your-project.onrender.com

Swagger UI will be available at:

https://your-project.onrender.com/api-docs/
API Documentation Flow

The Swagger documentation is generated using the following flow:

docs/openapi.yaml
        │
        ▼
     Redocly
        │
        ▼
docs/swagger.json
        │
        ▼
swagger-ui-express
        │
        ▼
/api-docs/
Development Workflow

For development:

git checkout hw7-swagger

Make your changes and then:

git add .
git commit -m "update swagger documentation"
git push origin hw7-swagger

If Render Auto Deploy is enabled, pushing changes to hw7-swagger will trigger a new deployment.

License

This project is licensed under the Apache 2.0 License.
