const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDb = require("./src/config/db");
const formRoutes = require("./src/routes/form")

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', formRoutes);

const PORT = process.env.PORT || 5000 ;

app.listen(PORT,()=>{
    console.log("Server is connected " + PORT);
    
})
