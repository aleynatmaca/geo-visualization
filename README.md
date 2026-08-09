# Geo Visualization Frontend

Interactive map-based frontend application developed with React and React-Leaflet.

## Features

- User login and registration
- Interactive map powered by OpenStreetMap
- Creating named points on the map
- Drawing lines
- Drawing polygons
- Loading previously saved user-specific map features
- Logout functionality

## Technologies

- React
- JavaScript
- Vite
- React-Leaflet
- Leaflet
- HTML5
- CSS3
- Node.js
- Git

## Project Structure

src/
├── assets/
├── components/
│   ├── MapView.jsx
│   └── MapView.css
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── SignUpPage.jsx
├── App.jsx
└── main.jsx

## Backend Integration

The frontend communicates with the Spring Boot backend through REST API requests.

Main operations include:

- User registration
- User login
- Saving map features
- Loading map features by user ID

## Running the Project

Install dependencies:

npm install

Start the development server:

npm run dev

The application will run locally using Vite.

## Backend Repository

https://github.com/aleynatmaca/geo-visualization-backend
