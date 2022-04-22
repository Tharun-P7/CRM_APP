/**
 * This file will contain the custom middleware fir verifying the request body
 */

const User = require("../models/user.model")
const constant = require("../utils/constants")
validateSignupRequest = async(req,res,next) => {
    //Validate if username already exists
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! Username is not provided"
        })
    }
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! UserId is not provided"
        })
    }
    const user = await User.findOne({userId : req.body.userId});
    if(user!=null){
            return res.status(400).send({
                message : "Failed ! UserId already exists"
        })
    }
    if(!req.body.email){
        return res.status(400).send({
            message: "Failed! User EmailId is not provided"
        })
    }

    const email = await User.findOne({email: req.body.email});
    if(email!=null){
        return res.status(400).send({
            message : "Failed ! EmailId already exists"
        })
    }

    if(!  req.body.password){
        return res.status(400).send({
            message : "Failed ! User password is not provided"
        })
    }

const userType =  req.body.userType;
const userTypes = [constant.userTypes.customer , constant.userTypes.admin, constant.userTypes.engineer] 
if(userType && !userTypes.includes(userType)){
    return res.status(400).send({
        message : "Failed ! User Type is not correctly provided"
    })  
}

    //similar validations to do for email,password,userType
    next(); //give the control to the controller
} 
module.exports ={
    validateSignupRequest : validateSignupRequest
}