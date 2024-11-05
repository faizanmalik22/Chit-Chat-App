var socket=io();//create socket
let btn=document.getElementById('btn');
let input=document.getElementById('newmsg');
let msglist=document.getElementById('msglist');

//send msg to server
// btn.onclick=function exec(){
//     //sending msg
//     //here we send msg with emit as objct
//     //here the msg send from client side to server so on the server end we will used socket.on to consume this emit
//     socket.emit('msg_send',{
//      msg: inputMsg.value//yha galti kr rha tha mene input me liya hai newmsg but me kr rha tha inputMsg.value which is wrong
//     })
// }


// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btn").click();
    }
  });
  
//chatgpt
btn.onclick = function exec() {
    // Send the message
    socket.emit('msg_send', {
        msg: input.value // input.value (newmsg)
    });
    input.value = ''; // Clear the input field after sending the message
};

//server se jo msg aayga usko frontend me list me append krkr show kr rhe hai dom ke through
//now we will append a msg as li into ul
socket.on('msg_rcvd',(data)=>{
    let limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msglist.appendChild(limsg);
    scrollToBottom(); // Scroll to the bottom after appending the new message
})


// btn.onclick=function exec(){
//     socket.emit("from_client");
// } 
// socket.on('from_server',()=>{
//     // console.log("Collected a new event from server");
//     const div=document.createElement('div');
//     div.innerText='New Event from server';//this message will serve from server to frontend
//     // console.log(div);
//     document.body.appendChild(div);
// })//first argument is geting emmit content so when we get this content we do some task 
