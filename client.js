// client  js 

const socket = io('http://localhost:7000')

const form = document.getElementById('send-form');
const msgInp = document.getElementById('text');
const msgContainer = document.querySelector('.container');
const append = (message, position)=>{
    const msgElement = document.createElement('div');
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgElement.innerText = message;
    msgContainer.append(msgElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = msgInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInp.value = ''
})

function prompt_user() {
    const name = prompt("Enter Your name To Join the Chat")
    socket.emit('new-user-joined', name);
}
prompt_user()
socket.on('user-joined', name=>{
    if (name !== null) {
        append(`${name} Joined the Chat`, 'center')
    } else{
        prompt_user()
    }
})
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', name=>{
    append(`${name}- left the Chat`, 'center')
})