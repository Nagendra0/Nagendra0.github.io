

var config = {
    apiKey: "AIzaSyD29_v_ndH0JxLBZKXpjEFEC4lzn_QE5AU",
    authDomain: "gapshap-da5ac.firebaseapp.com",
    databaseURL: "https://gapshap-da5ac.firebaseio.com",
    projectId: "gapshap-da5ac",
    storageBucket: "gapshap-da5ac.appspot.com",
    messagingSenderId: "651250937696"
  };
  firebase.initializeApp(config);
//Var DOM
  const nameForm = document.getElementById('nameForm');
  const nameInput = document.getElementById('name-input');
  const roomId = document.getElementById('room-Id');
  const userId = document.getElementById('user-Id');
  const nameBtn = document.getElementById('name-btn');
  const messageScreen = document.getElementById("messages");
  const messageForm = document.getElementById("messageForm");
  const msgInput = document.getElementById("msg-input");
  const msgBtn = document.getElementById("msg-btn");
  const db = firebase.database();
  const msgRef = db.ref("/msgs");
  let id;
  let name;
  let room;
  messageForm.addEventListener("submit", event =>
  {
      event.preventDefault();
      const text = msgInput.value;
      if(!roomId){
        return alert("Please enter room Id");
      }
      if(!name){
          return alert("You have to set up some name");
      }
      if(!text.trim()) return alert("Have to type something");
        const msg = {
          room,
          id,
          name,
          text
      };
      msgRef.push(msg);
      msgInput.value="";
  });

  const updateMsges = data => 
{
    const name1 = data.val().name;
    const text1 = data.val().text;
    const userId = data.val().id;
    const room1 = data.val().room;
    var today = new Date();
    if(room1==room){
    if(userId==id){
    const msg = '<li class="msg My"><span><i class="name">'+name1+': </i>'+text1+'</span></li>';
    messageScreen.innerHTML += msg;}
    else
    {
        const msg = '<li class="msg"><span><i class="name">'+name1+': </i>'+text1+'</span></li>';
    messageScreen.innerHTML += msg;
    }
  }
};
  // msgRef.on("child_added",updateMsges);

  nameForm.addEventListener('submit',e=>{
      e.preventDefault();
      if(nameInput.value.trim().length<4) return alert("Name must be more than 3 characters");
    nameForm.style.display='none';
    msgInput.removeAttribute('disabled');
    msgBtn.removeAttribute('disabled');
    name = nameInput.value;
    room = roomId.value;
    id = userId.value;
    msgRef.on("child_added",updateMsges);
  });
  //msgRef.on("child_added",updateMsges);