It's uploaded on: https://code-review-api.herokuapp.com/

## API:

#### User routes
*[GET] /login
*[GET] /signup
*[GET] /logout - destroys session data if you're logged in.
***[GET] /users/:userID** - returns user's data (_id, name and username)
***[POST] /users** - **Registration is here** You should send **unique** email, username, name and password. 
On **success**, you'll get user's ID and the user will be automatically logged in.
