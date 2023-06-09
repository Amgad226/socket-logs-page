const socket = io('127.0.0.1:3000', {  reconnectionAttempts: 3 /* Try to reconnect up to 3 times*/});

  socket.on('connect_error', (error) => {
    alert('check CORS error')
    alert('Error connection with server try again after play server on port 3000 ,we will try connect 3 times  ');

    console.log('Connection error:', error.message);
  
    // Change the URL to a different address
    // socket.io.uri = '192.168.1.37:3000';
  
    // Attempt to reconnect
    socket.connect();
  });
  
socket.on('connect_timeout', timeout => {
  console.log('Connection timeout:', timeout);
  alert('Error connect_timeout with server try again after play server on port 3000 ');
  // Handle the timeout here
}); 

socket.onAny((event, ...args) => {
    // console.log('listen on '+event  +' on Any ');
    append(event , args)
});
function printJsonToHtml(obj){
    return JSON.stringify(obj, null, 2).replace(/,\s*(?=\n)/g, ',<br>');
}

const append= (event ,  args)=>{
  console.log(args[0].date);
  const formattedHtml =printJsonToHtml( args[0]);


const messagesContainer = document.querySelector('#messages-container');

const newContainer = document.createElement('div');
newContainer.classList.add('container', 'darker');

newContainer.innerHTML = `
  <div class="event"  >
    <div class="event-title">${event}</div>
    <div class="event-time" >${(args[0]?.createdAt) ?formatTime(args[0].createdAt) :formatTime(Date.now())}</div>
    <div class="show-more caret"></div>

  </div>
  <div class="event-body d-none">
    <pre class="pre-body"> ${formattedHtml}</pre>
  </div>
`;

// messagesContainer.appendChild(newContainer);
messagesContainer.insertBefore(newContainer, messagesContainer.firstChild);
newContainer.style.background = 'rgb(52, 52, 79)';
newContainer.style.border = '#fff solid .01px';


setTimeout(function() {
  newContainer.style.background = '';
  newContainer.style.border = 'transparent solid .01px';
}, 1000);

}

function sendTestEvent(){
  alert('edit endpoint for send request in sendTestEvent function ')
  // fetch('/send-test-event',{method:"GET"})
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
document.getElementById('send-test-event').addEventListener('click',()=>{
  sendTestEvent()
})
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('show-more')) {
    var parentElement = event.target.parentNode.parentNode;
    var childTwo = parentElement.children;
    childTwo[1].classList.toggle('d-none');
  }
});
