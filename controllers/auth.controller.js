
/**
 * Controller for signup/registration
*/

const bcrypt = require("bcryptjs")
const constants = require("../utils/constants")
const User = require("../models/user.model");
const { use } = require("express/lib/application");

exports.signup = (req,res) => {
    var userStatus = req.body.userStatus;
    if(!req.body.userStatus){
        if(!req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved
        }else{
            userStatus = constants.userStatus.pending
        }
    }
    const userObjToBeStoredInDB ={
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8),
        userStatus : userStatus
    }
    //userStatus : APPROVED | PENDING | REJECTED

    //Insert this new user to the DB
    const userCreated = await User.create(userObj);
    console.log("user created", userCreated);

    //Return the response
    const userCreationResponse = {
        name : userCreated.name,
        userId : userCreated.userId,
        email : userCreated.email,
        userType : userCreated.userType,
        userStatus : userCreated.userStatus,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }

    res.status(201).send(userCreationResponse);
}