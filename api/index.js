require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const UserRoute = require("./routes/User.js");

/*Kết nối cơ sở dữ liệu*/
const connectToMongoDB = async() => {
  const uriMongo = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bdbidf5.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uriMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
   
  console.log("Connection to database...");
  }catch(err) {
    console.log("Can't connection to database ". uriMongo);
    process.exit(1);
  }
}
/*Route*/
app.use(express.json())
connectToMongoDB();
app.use("/api/user", UserRoute);
app.use((req,res,next) => {
  res.status(404).json({success: false, message: "Route isn't exits"});
});

app.listen(3001, () => {
  console.log('server listening on *:3001');
});
