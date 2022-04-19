const express = require("express");
const mongoose = require("mongoose");

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
module.exports={
    PORT : process.env.PORT
}