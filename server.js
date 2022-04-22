const express = require('express');
const serverConfig = require('./configs/server.config');
const mongoose = require("mongoose")
const dbConfig = require("./configs/db.config.js")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL,()=>{
    console.log("MongoDB connected");
})

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(serverConfig.PORT,() =>{
    console.log("Application has started on port",serverConfig.PORT);
})