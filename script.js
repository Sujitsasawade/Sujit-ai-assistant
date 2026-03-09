async function sendMessage(){

let inputField = document.getElementById("userInput");
let input = inputField.value;
let chatbox = document.getElementById("chatbox");

if(input.trim() === "") return;

// Show user message
chatbox.innerHTML += "<div class='user'>" + input + "</div>";

// Clear input
inputField.value = "";

// Scroll down
chatbox.scrollTop = chatbox.scrollHeight;

try{

const response = await fetch("http://localhost:11434/api/generate",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
model:"llama3",
prompt:input,
stream:false
})
});

const data = await response.json();

// Show AI response
chatbox.innerHTML += "<div class='ai'>" + data.response + "</div>";

// Auto scroll
chatbox.scrollTop = chatbox.scrollHeight;

}catch(error){

chatbox.innerHTML += "<div class='ai'>Error connecting to AI</div>";

}

}