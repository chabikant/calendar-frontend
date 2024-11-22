
# Datanexify Frontend

This is the front-end application for the Dashboard, where users can log in with Google, create and view events, and manage their sessions. The front-end is built using React and communicates with a backend server for authentication and event management.

## Features

- **Google Login**: Allows users to log in using their Google account.
- **Event Management**: Users can create events, view a list of created events, and link directly to Google Calendar.
- **Session Handling**: Access to the Dashboard is restricted to authenticated users. Users are redirected to the login page if they are not logged in.
- **Logout**: Users can securely log out, ending their session.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saran-mani/datanexify-frontend.git
   cd datanexify-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   or, if you prefer yarn:
   ```bash
   yarn install
   ```

### Configuration

Make sure the backend server is running and accessible. In the code, the default backend URL is set to `http://localhost:5000`. You can update this URL if your backend is hosted elsewhere.

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   or, with yarn:
   ```bash
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the app.

### File Structure

- `src/components/Login.js`: The login component allows users to log in with Google.
- `src/components/Dashboard.js`: The main dashboard component where users can create and view events.
- `src/App.js`: Main application file, which sets up routing and manages user authentication.

### Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.

## Usage

- **Login**: Click the "Sign in with Google" button on the login page.
- **Create Event**: Fill in the event details on the Dashboard page and submit to create a new event.
- **View Events**: The created events list shows recent events with links to view them on Google Calendar.
- **Logout**: Click the "Logout" button to end the session.

## Authentication

This app requires user authentication to access the Dashboard. Upon successful login, the backend provides a session cookie. The app checks the session status on load to ensure access control. Users without a valid session will be redirected to the login page.

## Dependencies

- **React**: Front-end library for building user interfaces.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For client-side routing.

## Troubleshooting

- **CORS Issues**: Ensure your backend server is configured to allow CORS requests from the frontend origin.
- **Login Redirection**: Make sure the backend is accessible at the correct URL for login redirection.
