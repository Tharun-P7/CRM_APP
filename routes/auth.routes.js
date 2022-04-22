// This file will act as the route for authentication
//Define the routes - REST endpoints for user registration
const authController = require("../controllers/auth.controller")
const {verifySignup} = require("../middlewares")
module.exports = (app) => {
    //POST 127.0.0.1:8080/crm/api/v1/auth/signup
    app.post("/crm/api/v1/auth/signup",[verifySignup.validateSignupRequest],authController.signup);
    app.post("/crm/api/v1/auth/signin",[verifySignup.validateSignupRequest],authController.signin);
    
    
    
}


