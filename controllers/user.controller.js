/**
 * Fetch the list of all User -Only admin is allowed
 * Admin should be able to filter based on Name,UserType and UserStatus
 */

const user = require('../models/user.model');
const objectController = require("../utils/objectConverter");


exports.findAllUsers = async (req,res) => {
    /**
     * Write code to fetch all the users from the DB
     */
    try{
    const users = await user.find();

    return res.status(200).send(objectController.userResponse(users));
    }catch(err){
        console.log(err.message)
        res.status(500).send({
            message: "Internal error while fetching all the users"
        });
        }
    }