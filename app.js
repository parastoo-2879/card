// grab things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".playerLivesCount");
let playerLives = 6;
// link text
playerLivesCount.textContent = playerLives;
// generate data
const getData = () => [
  { imgSrc: "img/5spades.png", name: "5spades.png" },
  { imgSrc: "img/asdimond.png", name: "asdimond.png" },
  { imgSrc: "img/5hearts.png", name: "5hearts.png" },
  { imgSrc: "img/asheart.png", name: "asheart.png" },
  { imgSrc: "img/king.jpg", name: "king.jpg" },
  { imgSrc: "img/queen.png", name: "queen.png" },
  { imgSrc: "img/dimond8.png", name: "dimond8.png" },
  { imgSrc: "img/soldier.png", name: "soldier.png" },
  { imgSrc: "img/5hearts.png", name: "5hearts.png" },
  { imgSrc: "img/5spades.png", name: "5spades.png" },
  { imgSrc: "img/asdimond.png", name: "asdimond.png" },
  { imgSrc: "img/asheart.png", name: "asheart.png" },
  { imgSrc: "img/king.jpg", name: "king.jpg" },
  { imgSrc: "img/queen.png", name: "queen.png" },
  { imgSrc: "img/dimond8.png", name: "dimond8.png" },
  { imgSrc: "img/soldier.png", name: "soldier.png" },
];

console.log(getData);
// Randomize
const randomize = () => {
  const cardData = getData();
  // to set random we use 0.5
  cardData.sort(() => Math.random() - 0.5);
  // console.log(cardData);
  return cardData;
};
const cardGenerator = () => {
  const cardData = randomize();
  // console.log(cardData);
  // html generate the card
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    face.src = item.imgSrc;
    back.classList = "back";
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.setAttribute("name", item.name);
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
      // console.log(card);
    });
  });
};

const checkCards = (e) => {
  const clickCard = e.target;
  console.log(clickCard);
  clickCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  console.log(flippedCard);
  // logic
  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        // set a delay when click to another card the firstone has just clicked dosen't return
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        setTimeout(() => {
          restart("👎 try again 🥺");
        }, 1000);
      }
    }
  }
  // run a check to see if we won the game
  if (toggleCard.length === 16) {
    restart("👍 you won 😎");
  }
};
// Restart
const restart = (text) => {
  let cardData = randomize();
  let face = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      face[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};
cardGenerator();
