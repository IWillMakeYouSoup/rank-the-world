# Rank The World

Rank The World is a two‑part application consisting of a mobile front‑end built with [Expo](https://expo.dev/) and a Node/Express backend that persists ranking data in a MySQL database.

The goal of the app is to let users compare pairs of animals on arbitrary attributes (e.g. *which animal is cuter?*).  Each time a user selects one of the animals, the decision is recorded so you can build graphs and visualisations later.

## Features

* **Expo front‑end** – cross‑platform React Native application that presents the user with two animals and an attribute.  Users tap on the animal they think better represents the attribute.  After submission the UI automatically loads the next pair.
* **Express backend** – REST API built with Node.js and Express.  It exposes a `/api/vote` endpoint for recording user choices and demonstrates how to connect to a MySQL database using a connection pool.
* **MySQL integration** – the backend connects securely to a MySQL instance.  Connection details are loaded from environment variables and demonstrated in the `db.js` module.  A sample `.env.example` file is provided as a starting point.

## Repository structure

```
rank-the-world/
├── backend/            # Express + MySQL server
│   ├── index.js        # Main API entrypoint
│   ├── db.js           # MySQL connection pool helper
│   ├── package.json    # Backend dependencies and scripts
│   └── .env.example    # Example environment variables
├── frontend/           # Expo application
│   ├── App.js          # Main React component
│   ├── app.json        # Expo project configuration
│   └── package.json    # Front‑end dependencies and scripts
└── README.md           # Project overview and instructions (this file)
```

## Getting started

### Prerequisites

* **Node.js** – install Node.js (version 18 or later recommended).  Both the front‑end and backend projects use npm for dependency management.
* **Expo CLI** – to run the mobile app locally you need to install the Expo CLI: `npm install -g expo-cli`.  Alternatively, use `npx expo start` if you prefer not to install globally.
* **MySQL database** – provide your own MySQL instance (local or hosted).  Create a database and grant credentials for the API to connect.  A simple schema might look like this:

```sql
CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute VARCHAR(255) NOT NULL,
    winner VARCHAR(255) NOT NULL,
    loser VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Setup the backend

1. Navigate into the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Copy the `.env.example` file to `.env` and fill in your MySQL connection details:

   ```bash
   cp .env.example .env
   # edit .env to set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
   ```

3. Start the server:

   ```bash
   npm start
   ```

   By default the API listens on port 3001.  Use the `PORT` environment variable to override it.

### Setup the front‑end

1. Navigate into the `frontend` directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npm start
   ```

3. Use the Expo Go app on your phone or an emulator to load the application.  Make sure the API server is running and accessible.  The front‑end sends votes to `http://localhost:3001/api/vote` by default; adjust the URL in `App.js` if your backend is hosted elsewhere.

## Contributing

Feel free to fork the repository and open pull requests.  Suggestions for new features (such as generating analytics or adding different entity types) are welcome!
