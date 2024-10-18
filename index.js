const express=require('express');
const http = require('http');
const socketio=require('socket.io');
 const app=express();
 const server = http.createServer(app);
 const io=socketio(server)//creating io object

 //event to connect the conversation
 io.on('connection', (socket) => {
    console.log('a user connected',socket.id);//every socket have unique id 

    //whenever we consume a emit on expect a call back and it have one argument data which have same object which we will sending
    socket.on('msg_send',(data)=>{
        console.log(data);
        //ye msg jo revd hua hai or jitne bhi client connect hai server se sbko bhej dega io.emit() se 

        //so there are some different diffrenet fucntion used to serve the response 
        //check it out("_")
         //io.emit('msg_rcvd',data);//this function provide by socket
         //socket.emit('msg_rcvd',data);//only serve to itself
        socket.broadcast.emit('msg_rcvd',data);//serve to other connectd client except itslelf
    });

    // //ctach client emmit
    // socket.on('from_client',()=>{
    //     console.log("event comes from client");
    // })

    // // setInterval(()=>{
    // //    socket.emit('from_server');
    // // },2000);//After evr 2 minute send the emit
  });
  

 app.use('/',express.static(__dirname +'/public'));//middle ware to get static file//All html css file detect here['/', is root route so whenevr localhost hit this file run first]

//  app.listen(3000,()=>{
//     console.log("Server Started");
//  });

//insetad of express app we used scoket server
server.listen(3000,()=>{
    console.log("Server Started");
 });