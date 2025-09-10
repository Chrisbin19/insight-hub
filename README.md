\*InsightHub: A Full-Stack Restaurant Finder\* A comprehensive web
application for discovering, reviewing, and rating restaurants. Built
with a modern tech stack featuring React, Node.js, Express, and
PostgreSQL, InsightHub provides a seamless and interactive user
experience. Table of Contents \* About The Project \* Key Features \*
Tech Stack \* Getting Started \* API Endpoints About The Project
InsightHub is designed to be a one-stop solution for food enthusiasts.
Users can view a list of restaurants, see detailed information including
location and price range, read reviews from other users, and contribute
by adding their own ratings and reviews. The application calculates and
displays an aggregate average rating for each restaurant, providing a
reliable and community-driven guide to the best dining experiences. This
project demonstrates a full-stack development workflow, from creating a
robust RESTful API on the backend to building a dynamic, state-managed
user interface on the frontend. Key Features \* View All Restaurants: A
clean, filterable list of all available restaurants. \* Detailed
Restaurant View: Click on any restaurant to see its detailed page with
an average rating, review count, and all user-submitted reviews. \* CRUD
Operations: Full Create, Read, Update, and Delete functionality for
restaurants. \* User Reviews & Ratings: Users can submit their own
reviews with a name, a written review, and a star rating from 1 to 5. \*
Dynamic Average Rating: The system automatically recalculates and
displays the average rating and total review count whenever a new review
is added. Tech Stack This project is built using the following
technologies: Frontend: \* React.js (UI Library) \* React Router DOM
(Client-Side Routing) \* React Context API (Global State Management) \*
Axios (HTTP Client for API Calls) \* Bootstrap (Styling and Responsive
Design) Backend: \* Node.js (Runtime Environment) \* Express.js (Web
Application Framework) \* PostgreSQL (Relational Database) \*
node-postgres (PostgreSQL client for Node.js) Development Tools: \*
Nodemon (Automatic server restarts) Getting Started To get a local copy
up and running, please follow these steps. Prerequisites \* Node.js and
npm installed (v16.x or higher recommended) \* PostgreSQL installed and
running on your local machine Installation & Setup 1. Clone the
repository: git clone \<your-repository-url\> cd insight-hub

2\. Backend Setup: \* Navigate to the server directory: cd server

\* Install backend dependencies: npm install

\* Create a .env file and add your PostgreSQL credentials. It should
look like this: PG_USER=your_postgres_user PG_HOST=localhost
PG_DATABASE=your_database_name PG_PASSWORD=your_postgres_password
PG_PORT=5432 PORT=3001

\* Set up the database schema by running the SQL commands found in the
db.sql file. \* Start the backend server: npm run dev

(The API will be available at http://localhost:3001) 3. Frontend Setup:
\* Navigate to the client directory (from the root): cd client

\* Install frontend dependencies: npm install

\* Start the React development server: npm start

(The application will open at http://localhost:3000) API Endpoints The
backend provides the following RESTful API endpoints: Method Endpoint
Description GET /api/v1/restaurants Fetches a list of all restaurants.
GET /api/v1/restaurants/:id Fetches details for a single restaurant and
its reviews. POST /api/v1/restaurants Creates a new restaurant. PUT
/api/v1/restaurants/:id Updates the details of a specific restaurant.
DELETE /api/v1/restaurants/:id Deletes a specific restaurant. POST
/api/v1/restaurants/:id/addReview Adds a new review for a specific
restaurant.
