# restaurant-app-loopback-server

This is the backend part of my React + MongoDB + Loopback restaurant web app. The frontend is at https://github.com/Abel-Slk/restaurant-app-react-client-for-loopback

# Complete App Overview (frontend + backend)
A restaurant website with a React + Redux frontend and a MongoDB + Loopback backend. 

The website supports logging in, which enables users to add comments to the dishes in the menu, as well as add dishes to their personal list of favorites.

See the screenshots folder for both frontend and backend screens.

## Frontend
Implemented as a single page React app. Navigation is done via React Router. Application state is managed by Redux. 

### Technologies used
- ES6 JavaScript 
- React
- Redux
- Redux-Thunk
- React Router
- Reactstrap (Bootstrap)
- React Transition Group and React Animation Components for animation

## Backend
Implemented using a MongoDB database and a Loopback server. 

### Technologies and Tools
-	MongoDB
-	REST API
- Loopback (Loopback models, relations, Loopback API Explorer)

### Loopback server

The Loopback app is scaffolded out using the Loopback CLI:
- Loopback models are created via the `lb model` command 
- a MongoDB database is set up a data source via the `lb datasource` command
- Access control list (ACL) is defined via the `lb acl` command. We construct it as follows: initially we deny access to everyone for all the routes; then we enable GET access to all authenticated users; then we allow only admins to perform all operations. For the Customer model we allow the create operation for all users (so that any one can sign up for an account).

A boot script named script.js is created in the server/boot folder. The script set up the code to create an admin user by default. Because this script is in server/boot, it is executed when the application starts up, so the admin user will always exist once the app initializes.

Loopback relations are used to define model relations between various Loopback models via the `lb relation` command. After defining relations between models, additional access control rules were added via the `lb acl` command in order to:
- allow customers to read comments
- allow customers to post comments
- allow a customer that posted a comment to edit or delete the comment
- allow customers to read their own favorites
- allow customers to post favorites
- allow a customer that posted a favorite to edit or delete the favorite

Carrying out server-side operations was done using Loopback API Explorer.

## How to run the app locally

### Start the MongoDB server
-	Create a folder named mongodb on your computer and create a subfolder under it named data.
-	Navigate in the Terminal to the mongodb folder and then start the MongoDB server by typing

  `mongod --dbpath=data --bind_ip 127.0.0.1`

### Start the Loopback server
- `cd loopback-server`
- `npm install`
- `npm start`

### Start the React client 
- `cd react-client-for-loopback`
- `npm install`
- `npm start`
