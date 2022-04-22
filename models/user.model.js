const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    /**
     * name,userId,password,email,createdAt
     * userType [ADMIN]
     */
    name: {
        type: String,
        required : true
    },
    userId:{
        type: Number,
        required : true, 
        unique :true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        minlength : 10,
        lowercase : true,
        required: true 
    },
    createdAt:{
        type : Date,
        immutable: true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type : Date,
        default : ()=>{
            return Date.now();
        }
    },
    userType:{
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    userStatus:{
        type: String,
        required:true,
        default: "APPROVED"
    }
})

module.exports = mongoose.model("users",userSchema);