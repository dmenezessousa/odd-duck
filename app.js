"use script";

function createImage(name, src, imgHasShown) {
  // constructor function
  this.name = name;
  this.src = src;
  this.imgHasShown = imgHasShown;
}

let imagesName = [
  //array of image names
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
  //array of image sources
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
  //adds images to array
  for (let i = 0; i < imagesName.length; i++) {
    images.push(new createImage(imagesName[i], imagesSrc[i], 0));
  }
}
// console.log(images);

function renderImages() {
  //renders images to page
  for (let i = 0; i < 3; i++) {
    let img = document.createElement("img");
    let random = Math.floor(Math.random() * images.length);
    img.src = images[random].src;
    img.id = images[random].name;
    img.addEventListener("click", handleClick);
    document.getElementById("images").appendChild(img);
  }
}

function handleClick(event) {
  //handles click event
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
  //renders results to page
  for (let i = 0; i < images.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${images[i].name} has been clicked ${images[i].imgHasShown} times`;
    document.getElementById("results").appendChild(li);
  }
}

createImages(); //calls createImages function
renderImages(); //calls renderImages function
renderResults(); //calls renderResults function
