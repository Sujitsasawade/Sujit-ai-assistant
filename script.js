async function sendMessage(){

let inputField = document.getElementById("userInput");
let input = inputField.value;
let chatbox = document.getElementById("chatbox");

if(input.trim() === "") return;

chatbox.innerHTML += "<div class='user'>" + input + "</div>";

inputField.value = "";

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

chatbox.innerHTML += "<div class='ai'>" + data.response + "</div>";

chatbox.scrollTop = chatbox.scrollHeight;

}catch(error){

chatbox.innerHTML += "<div class='ai'>Error connecting to AI</div>";

}

}


// ENTER KEY SUPPORT
document.getElementById("userInput")
.addEventListener("keypress", function(event) {
if (event.key === "Enter") {
sendMessage();
}
});
