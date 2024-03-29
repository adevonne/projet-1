const items = [
  {
    src: "./assets/html.png",
    name: "HTML",
    price: 15,
    count: 0,
    description: "Manage the content of your web page",
  },
  {
    src: "./assets/css.png",
    name: "CSS",
    price: 100,
    count: 0,
    description: "Add style",
  },
  {
    src: "./assets/js.png",
    name: "JS",
    price: 500,
    count: 0,
    description: "Add interaction between your elements",
  },
  {
    src: "./assets/react.png",
    name: "REACT",
    price: 2000,
    count: 0,
    description: "Use the best libraries",
  },
  {
    src: "./assets/sql.png",
    name: "SQL",
    price: 7000,
    count: 0,
    description: "Learn how to manage databases",
  },
  {
    src: "./assets/dev.png",
    name: "DEV",
    price: 1000000,
    count: 0,
    description: "You are now a real DEV!",
  },
];

function createItem(itemInformations) {
  const listItems = document.querySelector("#right-panel ul");
  const item = document.createElement("li");
  item.classList.add("item");
  item.classList.add("disable");

  const itemImg = document.createElement("img");
  itemImg.classList.add("item-img");
  itemImg.src = itemInformations.src;
  itemImg.alt = itemInformations.name;
  item.appendChild(itemImg);

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  item.appendChild(itemContainer);

  const itemHeader = document.createElement("div");
  itemHeader.classList.add("item-header");
  itemContainer.appendChild(itemHeader);

  const itemInfos = document.createElement("div");
  itemInfos.classList.add("item-infos");
  itemHeader.appendChild(itemInfos);

  const itemTitle = document.createElement("h3");
  itemTitle.classList.add("item-title");
  itemTitle.innerHTML = itemInformations.name;
  itemInfos.appendChild(itemTitle);

  const itemPrice = document.createElement("p");
  itemPrice.classList.add("item-price");
  itemPrice.innerHTML = itemInformations.price + " XP";
  itemInfos.appendChild(itemPrice);

  const itemCount = document.createElement("p");
  itemCount.classList.add("item-count");
  itemCount.innerHTML = itemInformations.count;
  itemHeader.appendChild(itemCount);

  const itemDescription = document.createElement("p");
  itemDescription.classList.add("item-description");
  itemDescription.innerHTML = itemInformations.description;
  itemContainer.appendChild(itemDescription);

  listItems.appendChild(item);
}

for (let i = 0; i < items.length; i++) {
  createItem(items[i]);
}

// définit le début du count du score et des items
let scoreTotal = 0;
let xpS = 0;

// incrémente le score à chaque fois qu'on clique sur l'image du chat
function clickCat() {
  scoreTotal = scoreTotal + 1;
  document.querySelector("#scoreTotal").innerHTML = scoreTotal;
  disableItem();
}

// toutes les 1000ms la fonction myCallBack est appelée, qui ajoute automatique X points d'xp en fonction des items qu'on a
const intervalID = setInterval(myCallback, 10000, scoreTotal);
const clickItems = document.querySelectorAll("li.item");
const count = document.querySelectorAll(".item-count");
const gridItems = document.querySelectorAll("#grid li");

// ajoute + 1 au count du html lorsqu'on clique sur l'item
function gridItemsPrice() {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", () => {
      if (scoreTotal >= items[i].price) {
        scoreTotal = scoreTotal - items[i].price;
        items[i].price = Math.ceil(items[i].price * 1.1);
        const newPrice = items[i].price;
        document.getElementsByClassName("item-price")[i].innerHTML =
          newPrice + " XP";
        items[i].count = items[i].count + 1;
        count[i].innerHTML = parseInt(count[i].innerHTML) + 1;
        myCallback();
      }
    });
  }
}

function clickItemsPrice() {
  for (let i = 0; i < clickItems.length; i++) {
    clickItems[i].addEventListener("click", () => {
      if (scoreTotal >= items[i].price) {
        scoreTotal = scoreTotal - items[i].price;
        items[i].price = Math.ceil(items[i].price * 1.1);
        const newPrice = items[i].price;
        document.getElementsByClassName("item-price")[i].innerHTML =
          newPrice + " XP";
        items[i].count = items[i].count + 1;
        count[i].innerHTML = parseInt(count[i].innerHTML) + 1;
        myCallback();
      }
    });
  }
}

if (screen.width < 768) {
  gridItemsPrice();
} else {
  clickItemsPrice();
}

// configuration du nombre de points d'xp générés par seconde
for (let i = 0; i < clickItems.length; i++) {
  clickItems[i].addEventListener("click", () => {
    //trouver un moyen de l'automatiser sinon ça bloque lorsqu'on n'a pas tous les articles de débloqués
    xpS =
      +items[0].count * 1 +
      items[1].count * 5 +
      items[2].count * 10 +
      items[3].count * 50 +
      items[4].count * 100;
    document.getElementById("xpS").innerHTML = xpS;
  });
}

for (let i = 0; i < gridItems.length; i++) {
  gridItems[i].addEventListener("click", () => {
    //trouver un moyen de l'automatiser sinon ça bloque lorsqu'on n'a pas tous les articles de débloqués
    xpS =
      +items[0].count * 1 +
      items[1].count * 5 +
      items[2].count * 10 +
      items[3].count * 50 +
      items[4].count * 100;
    document.getElementById("xpS").innerHTML = xpS;
  });
}

// incrémente le score en fonction des items qu'on possède
function myCallback() {
  scoreTotal = scoreTotal + xpS;
  document.querySelector("#scoreTotal").innerHTML = scoreTotal;
  document.querySelector(".score-html").innerHTML = items[0].count;
  document.querySelector(".score-css").innerHTML = items[1].count;
  document.querySelector(".score-javascript").innerHTML = items[2].count;
  document.querySelector(".score-react").innerHTML = items[3].count;
  document.querySelector(".score-sql").innerHTML = items[4].count;
  disableItem();
}

// grise les items non selectionnables

function removeMobileDisable() {
  document.querySelector("#html").classList.remove("mobile-disable");
  document.querySelector("#css").classList.remove("mobile-disable");
  document.querySelector("#javascript").classList.remove("mobile-disable");
  document.querySelector("#react").classList.remove("mobile-disable");
  document.querySelector("#sql").classList.remove("mobile-disable");
}
if (screen.width > 768) {
  removeMobileDisable();
}

window.addEventListener("resize", disableItem());
window.addEventListener("resize", () => {
  if (screen.width < 768) {
    gridItemsPrice();
    document.querySelector("#html").classList.add("mobile-disable");
    document.querySelector("#css").classList.add("mobile-disable");
    document.querySelector("#javascript").classList.add("mobile-disable");
    document.querySelector("#react").classList.add("mobile-disable");
    document.querySelector("#sql").classList.add("mobile-disable");
  } else {
    clickItemsPrice();
    removeMobileDisable();
  }
});

function disableItem() {
  if (screen.width < 768) {
    for (let i = 0; i < gridItems.length; i++) {
      if (scoreTotal >= items[i].price) {
        gridItems[i].classList.remove("mobile-disable");
      } else {
        gridItems[i].classList.add("mobile-disable");
      }
    }
  }
  for (let i = 0; i < clickItems.length; i++) {
    if (scoreTotal >= items[i].price) {
      clickItems[i].classList.remove("disable");
    } else {
      clickItems[i].classList.add("disable");
    }
  }

  if (items[0].count > 0) {
    document.querySelector("#html").classList.remove("disable");
  }
  if (items[1].count > 0) {
    document.querySelector("#css").classList.remove("disable");
  }
  if (items[2].count > 0) {
    document.querySelector("#javascript").classList.remove("disable");
  }
  if (items[3].count > 0) {
    document.querySelector("#react").classList.remove("disable");
  }
  if (items[4].count > 0) {
    document.querySelector("#sql").classList.remove("disable");
  }
}

let mainBottom = document.getElementById("main-bottom");
let punchline = document.getElementById("punchline");
let setup = document.getElementById("setup");

const joke = async () => {
  let requestString =
    "https://official-joke-api.appspot.com/jokes/programming/random";

  let data = await fetch(requestString);

  let response = await data.json();

  setup.textContent = response[0].setup;
  punchline.textContent = response[0].punchline;
};
joke();
const jokesInterval = setInterval(joke, 20000);

//importer image
function handleFiles(files) {
  let imageType = /^image\//;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!imageType.test(file.type)) {
      alert("please select a picture");
    } else {
      if (i == 0) {
        preview.innerHTML = "";
      }
      let img = document.querySelector("#cat");
      let reader = new FileReader();
      reader.onload = (function () {
        return function (e) {
          img.src = e.target.result;
        };
      })(img);

      reader.readAsDataURL(file);
    }
  }
}

const settings = document.querySelector("#settings");
//afficher settings
const settingsIcon = document.querySelector("#settings-icon");
settingsIcon.addEventListener("click", () => {
  settings.style.display = "inline";
});
//quitter le menu settings
const close = document.querySelector("#close-icon");
close.addEventListener("click", () => {
  settings.style.display = "none";
});

//récupération du pseudo
const username = document.getElementById("user");
const inputUser = document.getElementById("inputUsername");
const usernameButton = document.getElementById("settingsButton");
const errorMessage = document.getElementById("error");

usernameButton.addEventListener("click", () => {
  if (inputUser.value.length !== 0) {
    username.innerHTML = inputUser.value;
    errorMessage.innerText = "";
  } else {
    errorMessage.innerText = "Your username cannot be empty";
    errorMessage.style.fontSize = "10px";
  }
});

inputUser.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

//controler l'audio
const audio = document.getElementById("audioPlay");
const muteIcon = document.getElementById("mute");
muteIcon.addEventListener("click", () => {
  if (muteIcon.src.includes("/assets/mute.svg")) {
    audio.play();
    muteIcon.src = "./assets/volumeOn.svg";
  } else {
    audio.pause();
    muteIcon.src = "./assets/mute.svg";
  }
});

//afficher +1xp au clic
const image = document.querySelector("#cat");
const body = document.querySelector("body");
image.addEventListener("click", (e) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("xpOnClick");
  body.appendChild(newDiv);
  let x = e.clientX;
  let y = e.clientY - 30;
  let z = e.clientY - 100;
  newDiv.innerHTML = "+ 1 XP";
  newDiv.style.left = x + "px";
  newDiv.style.top = y + "px";
  setTimeout(() => {
    body.removeChild(newDiv);
  }, 2000);
});
