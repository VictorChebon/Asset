🎒 School Lost & Found

A web-based lost-and-found system I built in high school to help students recover lost belongings.

The idea is simple: if you lose something, report it. If you find something, report it. The information is displayed on the website so that the person who lost the item can identify it and get in touch with the person who found it.

💡 How It Works
🔎 Lost an item?

Students can submit information about an item they've lost, including their contact email.

The item is then listed on the website so that someone who has found it can identify the owner and contact them.

📦 Found an item?

Found something that someone might be looking for?

Students can submit the details of the item along with their contact information. The listing is then displayed on the website so the owner can reach out and arrange to get their belongings back.

🤝 The goal

The system provides a simple way for students to connect with each other and return lost belongings without relying entirely on physical lost-and-found notices around the school.

✨ Features
📝 Report a lost item
📦 Report a found item
📋 View reported items
📧 Provide contact information so users can connect
🔐 User registration and login
🛡️ Authorization and protected routes
🗄️ MongoDB database integration
🌐 Web-based interface using EJS
🛠️ Built With
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Backend framework
MongoDB	Database
Mongoose	Database modeling
EJS	Dynamic web pages
JavaScript	Application logic
HTML / CSS	User interface
📁 Project Structure
Asset/
│
├── middlewares/
│   └── authorize.js
│
├── models/
│   ├── FormData.js
│   ├── tokenSender.js
│   └── user.js
│
├── views/
│   ├── form.ejs
│   ├── login.ejs
│   ├── message.ejs
│   ├── signup.ejs
│   └── table.ejs
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

🚀 Getting Started
Prerequisites

You'll need:

Node.js
A MongoDB database or MongoDB Atlas account
Git
Installation

Clone the repository:

git clone https://github.com/VictorChebon/Asset.git
cd Asset


Install the project dependencies:

npm install

Environment Variables

Create a .env file in the root directory:

MONGODB_URI=your_mongodb_connection_string


Add any other environment variables required by your local setup.

⚠️ Never commit your .env file. It may contain database credentials and other sensitive information.

Run the application
node server.js


If a development script is configured:

npm run dev


Then open the local address provided by the application.

🔒 Security

Sensitive information such as database credentials and authentication secrets should never be committed to the repository.

This project uses environment variables for sensitive configuration.

The following are intentionally excluded from Git:

.env
node_modules/
.vs/

🎓 Background

This project was originally created as a high-school project with the goal of solving a simple problem within a school environment: making it easier for students to return lost belongings to their owners.

What started as a school project became an opportunity to learn about:

Backend development
Databases
User authentication
Web application architecture
Git and GitHub
Connecting a frontend to a backend
📌 Project Status

🚧 In development

This project was created as a high-school project and may continue to receive improvements and new features.

👨‍💻 Author

Victor Chebon

Built as a high-school project with the goal of making lost-and-found easier for students.