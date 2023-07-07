const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const PORT = 5555;

const userRoute = require("./routes/userRoute")

const app = express();
app.use(express.json());

app.use("/api", userRoute)



app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
})

mongoose.connect(process.env.url).catch((error)=>{
    console.log(error.message);
}).then(()=>{
    console.log("connection to database is successful");
})