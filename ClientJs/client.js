const socket = io('http://localhost:8000');
const f=document.getElementById("send");
const text=document.getElementById("mytext");
const container=document.querySelector(".container");
// const inputfile=document.getElementById("inputfile");
const myappend=(message,pos)=>{
    //const myname = prompt("Here"); 
    const element=document.createElement('div');
    element.innerText=message;
    element.classList.add(pos);
    container.appendChild(element);
    
}
const myname = prompt("Enter your name:");
console.log(myname);

socket.emit('newly-joined',myname);
socket.on('UserJoined',data=>{
    myappend(`${data}  joined`,'middle');
});
socket.on('receive',data=>{
    myappend(`${data.name}:${data.m}`,'left');
});
f.addEventListener("submit",(element)=>{
    element.preventDefault();
    m=text.value;
    myappend(`You: ${m}`,'right');
    socket.emit("message-sent",m);
    text.value='';
});


    $('#inputfile').bind('change', function(e){
    console.log("Inside!");
    var data = e.originalEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function(evt){
      rightimage('You: ', evt.target.result);
      socket.emit('user image', evt.target.result);
    };
    reader.readAsDataURL(data);
    
  });
  socket.on('user image', leftimage);
function leftimage (from, base64Image) {
    console.log(from);
     $('.container').append($('<div class="limagediv">').append($('<b>').text(from), '<img src="' + base64Image + '" width="200" height="100"/>'));
  };
  function rightimage (from, base64Image) {
    //myimageappend()
    console.log(from);//from+=": ";
     $('.container').append($('<div class="rimagediv">').append($('<b>').text(from), '<img src="' + base64Image + '" width="200" height="100"/>'));
  };