require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const UserRoute = require("./routes/User.js");
const AuthRoute = require('./routes/Auth.js');
const MessageRoute = require('./routes/Message.js');
const RelationshipRoute = require('./routes/Relationship');
const GroupChatRoute = require('./routes/GroupChat');
const Upload = require('./routes/Upload.js');
const http = require('http');
const cors = require('cors')
const cookiePaser = require('cookie-parser')
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.1.8:3000'],
  }
});


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
app.use(cors());
app.use(cookiePaser())
app.use(express.static('resources'));
app.use("/api/user", UserRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/message', MessageRoute);
app.use('/api/relationship', RelationshipRoute);
app.use('/api/groupchat', GroupChatRoute);
app.use('/api/resources/upload', Upload);
app.use((req,res,next) => {
  res.status(404).json({success: false, message: "Route isn't exits!!!"});
});
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join group', (groups)=>{
    if (groups) {
      const uniqueGroups = Array.from(new Set(groups));
      uniqueGroups.forEach(element => {
        socket.join(element);
        console.log(`${socket.id} đã tham gia ${element}`)
      });
    }
  }); 
  socket.on('send message', (data) =>{
    socket.to(data.revGroupId).emit('receive message', data);
  })
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('server listening on *:3002');
});

