Asset Management System

A web-based asset management application built with Node.js, Express, MongoDB, and EJS.

Features
User registration and login
User authentication and authorization
Secure session/token-based access
Asset/form data management
Server-side rendered pages using EJS
MongoDB database integration
Middleware for protecting routes
Technologies Used
Node.js — JavaScript runtime
Express.js — Web application framework
MongoDB — Database
Mongoose — MongoDB object modeling
EJS — Server-side templating
JavaScript — Application logic
CSS/HTML — Frontend
Project Structure
Asset/
├── middlewares/       # Authentication and authorization middleware
├── models/            # MongoDB/Mongoose models
├── views/             # EJS templates
├── .env               # Environment variables (not committed)
├── .gitignore         # Files ignored by Git
├── package.json       # Project dependencies and scripts
├── package-lock.json
└── server.js          # Application entry point

Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
MongoDB or a MongoDB Atlas database
Git
Installation

Clone the repository:

git clone https://github.com/VictorChebon/Asset.git


Navigate into the project directory:

cd Asset


Install the dependencies:

npm install

Environment Variables

Create a .env file in the root of the project:

MONGODB_URI=your_mongodb_connection_string


Do not commit your .env file to GitHub. It contains sensitive credentials and is intentionally excluded through .gitignore.

Running the Application

Start the application with:

node server.js


If your project has a development script configured in package.json, you can also use:

npm run dev


Then open the application in your browser at the address shown in the terminal.

Security

Sensitive information such as database credentials and environment variables should never be committed to the repository.

Use environment variables for secrets and keep the .env file local.

Author

Victor Chebon