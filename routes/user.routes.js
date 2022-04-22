const userController = require("../controllers/user.controller")
// const { authJwt } = require("../middlewares");

module.exports = (app) =>{
    app.get("/crm/api/v1/users/",userController.findAllUsers)
}