"use script";

function createImage(name, src, imgHasShown) {
  this.name = name;
  this.src = src;
  this.imgHasShown = imgHasShown;
}

let imagesName = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];

let imagesSrc = [
  "img/bag.jpg",
  "img/banana.jpg",
  "img/bathroom.jpg",
  "img/boots.jpg",
  "img/breakfast.jpg",
  "img/bubblegum.jpg",
  "img/chair.jpg",
  "img/cthulhu.jpg",
  "img/dog-duck.jpg",
  "img/dragon.jpg",
  "img/pen.jpg",
  "img/pet-sweep.jpg",
  "img/scissors.jpg",
  "img/shark.jpg",
  "img/sweep.png",
  "img/tauntaun.jpg",
  "img/unicorn.jpg",
  "img/water-can.jpg",
  "img/wine-glass.jpg",
];

let images = [];
let totalClicks = 0;
let totalClicksPerImage = [];

function createImages() {
  for (let i = 0; i < imagesName.length; i++) {
    images.push(new createImage(imagesName[i], imagesSrc[i], 0));
  }
}

function renderImages() {
  for (let i = 0; i < images.length; i++) {
    let img = document.createElement("img");
    img.src = images[i].src;
    img.id = images[i].name;
    img.addEventListener("click", handleClick);
    document.getElementById("images").appendChild(img);
  }
}

function handleClick(event) {
  totalClicks++;
  let id = event.target.id;
  for (let i = 0; i < images.length; i++) {
    if (id === images[i].name) {
      images[i].imgHasShown++;
    }
  }
  if (totalClicks === 25) {
    renderResults();
  }
}

function renderResults() {
  for (let i = 0; i < images.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${images[i].name} has been clicked ${images[i].imgHasShown} times`;
    document.getElementById("results").appendChild(li);
  }
}

createImages();
