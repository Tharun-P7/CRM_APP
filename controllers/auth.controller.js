
/**
 * Controller for signup/registration
*/

const bcrypt = require("bcryptjs")
const constants = require("../utils/constants")
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")
const config = require("../configs/auth.config")




exports.signup = async(req,res) => {
    var userStatus = req.body.userStatus;
    if(!userStatus){
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
    try{
    const userCreated = await User.create(userObjToBeStoredInDB);
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
catch(err){
    console.log("Error while creating a message",err.message);
    res.status(500).send({
        message: "Some internal error while creating user"
    })

}
}



exports.signin = async(req,res)=> {
    try{
    var user = await User.findOne({userId : req.body.userId});
    }catch(err){
        console.log(err.message);
    }
    
    if(user == null){
        return res.status(400).send({
            message: "Signin failed!..Invalid Credentials"
        })
    } 
    if(user.userStatus != constants.userStatus.approved){
        res.status(200).send({
            message : "User is not approved"
        })
    }
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            message: "Invalid Password"   
    })
    }
    /**
     * Successfull login after logging in with jsonwebtoken we should create a jwt token
     */
     const token = jwt.sign({id: user.userId}, config.secret,{
         expiresIn:600
     });
     res.status(200).send({
         name : user.name,
         userId : user.userId,
         email : user.email,
         userType : user.userType,
         userStatus : user.userStatus,
         accessToken : token
     })
};