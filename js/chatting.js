var chatting = {
  members: [
    {
      name: "๋ฏผ์ง๐ป",
      text: ["๊ฐํด๋ฆฐ ์ด์ํ๋ค"],
      chatting: [],
    },
    {
      name: "๋ค๋์๐ถ",
      text: ["๋ฌ์ฝคํ ๋ง๋ง", "๋์ ํธ ๋ง๋ง"],
      chatting: [],
    },
    {
      name: "ํ๋๐ฐ",
      text: ["์ํ๊ฒ ๋  ๊ฑธ ์์์", "๐"],
      chatting: [],
    },
    {
      name: "ํ์ธ๐ฃ",
      text: ["๋ ์ฌ๋ฏธ์์ด ๊ฒ์ ๊ฐ์ ๊ฑด"],
      chatting: [],
    },
    {
      name: "ํด๋ฆฐ๐",
      text: ["?"],
      chatting: [],
    },
    {
      name: "Bunnies",
      chatting: [],
    },
  ],
};

// Init
const chatRoom = document.getElementById("chatRoom");
const idCards = document.querySelectorAll("#idcard");
const chatBG = document.getElementById("chatBg");
const chatCover = document.getElementById("chatCover");

const chatForm = document.querySelector(".form");
const formText = document.querySelector("#chatInput");
const chatDiv = document.getElementsByClassName("chat")[0];
const btnClean = document.getElementById("btnClean");

var chatID = "none";
var listNum = 0;
var profileImg = "";

// Functions
function initChat(object) {
  var newObj = JSON.stringify(object);
  localStorage.setItem("chat", newObj);
}

function initUser(object) {
  var newObj = JSON.stringify(object);
  localStorage.setItem("chat", newObj);
}

function loadChat() {
  // 1. ๋ก์ปท์คํ ๋ฆฌ์ง์์ JSON ๊ฐ์ ธ์จ ํ ์ค๋ธ์ ํธ๋ก ํ์ฑ
  // 2. chatting ํ๋ผ๋ฏธํฐ๋ก ์ ๊ทผํ์ฌ ๋ฆฌํด
  var temp = JSON.parse(localStorage.getItem("chat"));

  return temp;
}

function saveChat(listNum, input) {
  // 1. ๋ก์ปฌ์คํ ๋ฆฌ์ง์์ JSON() ๊ฐ์ ธ์ด
  // 2. ์ค๋ธ์ ํธ๋ก ํ์ฑ ํ chatting ํ๋ผ๋ฏธํฐ๋ก ์ ๊ทผ
  // 3. ์๋ ฅ๋ฐ์ input ๋ณ์ chatting ํ๋ผ๋ฏธํฐ์ append
  // 4. ๊ธฐ์กด ์ค๋ธ์ ํธ ์ญ์  ํ ์๋ก์ด ์๋ ฅ ๊ฐฑ์  ๋ ์ค๋ธ์ ํธ JSONํ
  // 5. ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ์ ์ฅ
  var chatObj = loadChat();
  chatObj.members[listNum].chatting.push(input);
  console.log(input);

  localStorage.removeItem("chat");

  var newChatlist = JSON.stringify(chatObj);
  localStorage.setItem("chat", newChatlist);
}

function printChat(listNum) {
  // 1. ๋ก์ปฌ์คํ ๋ฆฌ์ง์์ JSON() ๊ฐ์ ธ์ด
  // 2. ์ค๋ธ์ ํธ๋ก ํ์ฑ ํ ํด๋น ์ ์ ์ chatting ํ๋ผ๋ฏธํฐ๋ก ์ ๊ทผ
  // 3. ๊ฐ์ ธ์ forEach ๋ฉ์๋ ํตํด ์ฑํ ๊ฐฏ์๋งํผ ํ๋ฉด์ ์ถ๋ ฅ
  // 4.
  chatDiv.innerHTML = "";
  var chatObj = loadChat();
  chatList = chatObj.members[listNum].chatting;

  chatList.forEach((item) => {
    item = String(item);
    var template = `<div
    id="myChatting"
    class="col-12 mt-2 d-flex justify-content-end"
    style="height: 1.7rem%"
  >
    <div class="myChat">${item}</div>
  </div>`;

    chatDiv.insertAdjacentHTML("beforeend", template);
  });
}

function clearChat(listNum) {
  var chatObj = loadChat();
  chatDiv.innerHTML = "";

  // chatObj.members.forEach((item) => {
  //   item.chatting = [];
  // });

  chatObj.members[listNum].chatting = [];
  localStorage.removeItem("chat");

  var newChatlist = JSON.stringify(chatObj);
  localStorage.setItem("chat", newChatlist);

  printChat(listNum);
}

// Events
idCards.forEach((item) => {
  item.addEventListener("dragstart", (e) => {
    // e.preventDefault();
    chatID = item;
  });
});

chatCover.addEventListener("dragover", (e) => {
  console.log(e);
  e.preventDefault();
  chatCover.style.border = "15px solid rgba(0, 145, 255, 0.478)";

  document.getElementById("chatText").style.transform = "scale(1.3)";
});

chatCover.addEventListener("drop", (e) => {
  chatCover.style.border = "none";
  chatCover.classList.add("d-none");

  switch (chatID) {
    case idCards[0]:
      listNum = 0;
      printChat(listNum);
      //๋ฏผ์ง
      // ์ฑํ๋ฐฉ ํ ๋ฒ ์ด๊ธฐํํ๊ณ 
      // ์ค๋ธ์ ํธ ๋ด ์ฑํ ๊ฐ์ฒด ๋ฐ์ดํฐ๋ฐ์ธ๋ฉ
      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[0].name}'s Room`;
      profileImg = "./img/minji.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[0].name;
      chatting.members[0].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[0].text;
      break;

    case idCards[1]:
      listNum = 1;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[1].name}'s Room`;
      profileImg = "./img/daniel.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[1].name;
      chatting.members[1].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[1].text;

      //๋ค๋์
      break;

    case idCards[2]:
      listNum = 2;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[2].name}'s Room`;
      profileImg = "./img/hani.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[2].name;
      chatting.members[2].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[2].text;

      //ํ๋
      break;

    case idCards[3]:
      listNum = 3;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[3].name}'s Room`;
      profileImg = "./img/hyein.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[3].name;
      chatting.members[3].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[3].text;

      //ํ์ธ
      break;

    case idCards[4]:
      listNum = 4;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[4].name}'s Room`;
      profileImg = "./img/haerin.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[4].name;
      chatting.members[4].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[4].text;

      //ํด๋ฆฐ
      break;
  }
});

chatCover.addEventListener("dragleave", (e) => {
  document.getElementById("chatText").style.transform = "scale(1)";
});

chatRoom.addEventListener("dragover", (e) => {
  e.preventDefault();
  chatRoom.style.border = "15px solid rgba(0, 145, 255, 0.478)";
});

chatRoom.addEventListener("drop", (e) => {
  chatRoom.style.border = "none";

  switch (chatID) {
    case idCards[0]:
      // Minji
      listNum = 0;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[0].name}'s Room`;
      profileImg = "./img/minji.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[0].name;
      chatting.members[0].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[0].text;
      break;

    case idCards[1]:
      // Daniel
      listNum = 1;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[1].name}'s Room`;
      profileImg = "./img/daniel.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[1].name;
      chatting.members[1].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[1].text;
      break;

    case idCards[2]:
      // Hani
      listNum = 2;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[2].name}'s Room`;
      profileImg = "./img/hani.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[2].name;
      chatting.members[2].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[2].text;
      break;

    case idCards[3]:
      // Hyein
      listNum = 3;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[3].name}'s Room`;
      profileImg = "./img/hyein.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[3].name;
      chatting.members[3].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[3].text;
      break;

    case idCards[4]:
      // Haerin
      listNum = 4;
      printChat(listNum);

      document.getElementById(
        "chatTitle"
      ).innerHTML = `${chatting.members[4].name}'s Room`;
      profileImg = "./img/haerin.jpeg";
      document.getElementById("profileImg").src = profileImg;

      document.getElementById("chatName").innerHTML = chatting.members[4].name;
      chatting.members[4].chatting = [];
      document.getElementsByClassName("yourChat")[0].innerHTML =
        chatting.members[4].text;
      break;
  }
});

chatRoom.addEventListener("dragleave", (e) => {
  chatRoom.style.border = "none";
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (formText.value.length != 0) {
    saveChat(listNum, formText.value);
    printChat(listNum);
    formText.value = "";
  }
});

document.getElementById("chatSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  if (formText.value.length != 0) {
    saveChat(listNum, formText.value);
    printChat(listNum);
    formText.value = "";
  }
});

btnClean.addEventListener("click", (e) => {
  e.preventDefault();
  clearChat(listNum);
});

var chat = JSON.parse(localStorage.getItem("chat"));
