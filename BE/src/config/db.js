
const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
       await  mongoose.connect(process.env.MONGO_URI);
       console.log("DataBase is Connected");
       
    } catch (error) {
        console.log("DB Error",error);
        process.exit(1);
        
      }
}

module.exports = connectDb ;