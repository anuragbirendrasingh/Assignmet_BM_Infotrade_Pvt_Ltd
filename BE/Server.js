const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./src/config/db");

dotenv.config();
connectDb();

const app = express();
// app.use()

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log("Server is connected " + PORT);
    
})
