# MERN-SHOPPING_LIST

1./////////////////////////////////////////////////////////////////
npm init

npm i express body-parser mongoose mongoose concurrently

//-D means its a dev dependancy, wont get updated to production
npm i -D nodemon

Build server endpoints

2./////////////////////////////////////////////////////////////////
//create client folder
cd client

//install create-react-app globally if you havent already
npm i -g create-react-app

//create it an generate it in the CURRENT client folder
create-react-app .

//add proxy value in frontend package.json so you dont have to do: axios.get('http://localhost:5000/api/items')

//now we configure running the server and front end at the same time with npm install concurrently if we haven't done that already with npm i concurrently on the server folder

//to the scripts in package.json, we add:
"client": "npm start --prefix client" OR "cd client && npm start" 
//to have an ability to just run the react without the server, and then create 
"dev": "concurrently \"npm run server\" \"npm run client\""
//to run them both with one command
// also we create a command for installing the client modules:
"client-install": "npm install --prefix client",


//clean up inside the client src folder remove excess

cd client

//bootstrap allows us to use the bootstrap css, reactstrap allows us to use components out of bootstrap, uuid generates random ids for build testing only, react-transition-group is pretty transitions yay

npm i bootstrap reactstrap uuid react-transition-group


5.Redux
cd client
npm i redux react-redux redux-thunk
-create store.js
-App.js:
 - wrap return in provider with a prop of the store
 - import provider and store
-Reducers/index.js
 - create file that will compile all the reducers together.
-itemReducer.js
 - create individual reducers now, copy the state accross under 
   const initialState = {
 - create the switch at the bottom that will accept the actions
-itemActions.js
-ShoppingList.js 
 - import connect, export connect (mapStateToProps, { getItems prop } & component
 - mapStateToProps, set the prop name to the reducer action name
 - declare the propTypes for validation purposes (state is an object)
ShoppingList.js
 - change the reference inside the render method to the new props location
 RUN getItems with componentDidMount: getItems is now a la Redux.

Adding An Action (deleteItem):
1COMPONENT:
 -add a function to an onClick, bind id so its accessible outside
 -in the function outside call the action with this.props.deleteItem(id)
 -import the action and export with connect, now its accessible with this.props.deleteItem
1ACTION:
 -add action in Actions folder (pass in the id as one of the arguments), name it payload and return it
2REDUCER
 -add a new switch to the function in the Reducer.
 -create the state, and the new filtered items


 
7. Connecting with MongoDB
cd client
npm i axios

-. Create: type, action, reducer and state for loading (loading: false).
GET:
-. Update the Action to come from the server. Query your server endpoints for the data and send them as a payload to the dispatcher
-. Update the Reducers to receive the new payload and set loading to false after.
ADD:
-. Update Action, keep the reducer the same.
-. Remove uuid from modal Addcomponent
DELETE
-. Update the Action, change reducer to have _id, change component to use _id as that is what MongoDb calls it.

 
 8.Deploy to Heroku
server.js:
 - update server to point to the front end static assets: unless we're hitting the api routes in server.js, point to the index.html. 
 - if process.env.NODE_ENV === production...
package.json:
 - create post build script: add heroku-postbuild scripts that will install on the server.
 
heroku login
heroku create
//get the app name from online (check deploy tab for instructions)
heroku git:remote -a lit-eyrie-94216
//push to heroku and build the scrips there
git push heroku master


9. Login with Backend Auth, JWT functionality for backend with NODE and express and json web tokens.
- copy item schema and change variable names to fit with a Users inputs.
Set up a route: we want a route to be able to register a user.
- add an extra USE ROUTES:line in server.js
Implement the express router, build the server endpoints.
- copy routes/api/items.js and make new users.js with simple post
        router.post("/", (req, res) => {
          res.send("register");
        });
- use postman to send a request to the route to check it works.
- remove bodyparser as it comes with express
npm i bcryptjs
- put in code for bcrypt in users.js api
Set up JWT tokens & Sort out config
npm i jsonwebtoken
npm i config
-change over from keys.js to default.json to hold keys & secret, change in server.js:
           const db = config.get("mongoURI");
-import jwt and config in users.js route, add jwt.sign code to route.

test in postman with the same request does it add user again.

AUTHENTICATION
Create the route for the login/authentication procedure (v. similar to create user route)
AUTH.JS:
  - Create this new route for logins
  - Make the file available in server.js under //use routes

CREATE MIDDLEWARE
Create the middleware so that we can have private routes that are only accessed if we send along this token. Then whenever we want a private route, we add this middleware as a second parameter in the endpoint.
  - Create the middleware folder/auth.js file.
  - Items.js: Bring in this middleware from auth.js, add 'auth' as a second parameter of POST and DELETE to protect those routes.
  - Auth.js: Create a route here, get the current users data by using the token. The reason we want to do this is because JWT is stateless. We need a way to constantly validate the user that's logged in. We need a route that's just going to take the token and return the user data minus the password.
  Bring in the auth middleware at top and add the route.
  - Test the route with x-auth-token : token key value pair get request on it.


10. React login & register component (so that we can get a token) & Redux auth reducer (to access a private route). Implement 9 into front end.

Types.js: add new types for this section
authReducer.js: create and add to the Index.js combining the reducers
errorReducer.js: create and add to the Index.js combining the reducers
authActions.js: create
errorActions.js: create


11. Create the React modal for registration. Now we're checking for storage in out local storage constantly.
RegisterModal.js: create file for regitration popup.
AppNavbar.js: add registration link to navbar instead of github link.

- When the register button is clicked, we want an action to be fired:
RegisterModal: import this 'register' action at the top, and export it at the bottom inside curly braces. Include it in propTypes declarations.
authActions.js: add //Register User code
RegisterModal: 
  -add the code to fire the register function in the props. 
  - add componentDidUpdate to catch errors before the register button is clicked.
  - add a ternary operator in ModalBody to check for the error 'msg' and alert if so.
  - import clearErrors, add it to the mapStateToProps function, add it to propTypes, and finally add it before the modal changes state.
  - make the modal close if modal is up and is authenticated inside the componentDidUpdate function.
Logout.js: create file, add it to AppNavbar in a NavItem.
authActions.js: add basic logout action & export it.

12. Login Modal & Final bits
LoginModal.js: Copy register modal accross and change some bits:
  - change component to RegisterModal
  - import login from authActions
  - don't need name for the state
  - change propTypes register to login
  - LOGIN_FAIL instead of REGISTER_FAIL
  - change onSubmit:
    - add new code
  - change modal
  - change register action to login and export LoginModal instead of RegisterModal.
AppNavbar: 
  - import LoginModal
  - add LoginModal NavItem
authActions:
  - Create Login User action:
    -copy register user, remove name parameters and change endpoint to /api/ath, change to LOGIN_SUCCESS & FAIL to REGISTER_SUCCESS & FAIL
fix login & logout menu:
  - AppNavbar: get auth out to be able to render differently if logged in
    - add connect to export function
    - add PropTypes declaration
    - change render method with ternary functions, displaying separate fragments depending on auth state (make some new objects with fragments inside and use ternary to display based on user and authState)
fix adding&deleting items (we need to create& delete tokens)
  - ItemActions: bring in tokenConfig (helper function we created to bring in the token from local storage and put it in the headers)
  - add.catch error dispatch to get axios request
  - add tokenConfig param in the requests to attach the tokens to them.
fix what is shown when logged out/in
  - put ternary operators on delete buttons and add button which requires bringing in the auth state and displaying if isAuthenticated = true.
