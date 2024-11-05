var socket = io();
let btn = document.getElementById('btn');
let input = document.getElementById('newmsg');
let msglist = document.getElementById('msglist');

// Function to scroll to the bottom of the chat when new messages arrive
function scrollToBottom() {
    msglist.scrollTop = msglist.scrollHeight;
}

// Send the message when the user clicks the send button or presses Enter
btn.onclick = function exec() {
    const msg = input.value.trim();
    if (msg !== "") {
        socket.emit('msg_send', { msg: msg });
        appendMessage(msg, 'sent');
        input.value = '';
        scrollToBottom();
    }
};

// Function to append the new message to the beginning of the list
function appendMessage(msg, type) {
    let limsg = document.createElement('li');
    limsg.innerText = msg;
    limsg.classList.add(type);
    msglist.prepend(limsg);
    scrollToBottom();
}

// When the server sends a new message, append it to the list
socket.on('msg_rcvd', (data) => {
    appendMessage(data.msg, 'received');
    scrollToBottom();
});

// Handle pressing "Enter" key to send the message
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
    }
});