"use script";

let images = [];
let totalClicks = 0;
let clickCounter = 25;

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
    img.addEventListener("click", handleClick); //adds event listener to image
    document.getElementById("images").appendChild(img);
  }
  if (clickCounter === 0) {
    document.getElementById("clickCounter").textContent = "View Results";
    document.querySelectorAll("img").forEach((img) => {
      img.removeEventListener("click", handleClick);
    });
  }
}

function handleClick(event) {
  //handles click event
  totalClicks++;
  document.getElementById(
    "clickCounter"
  ).textContent = `Clicks left: ${clickCounter}`;
  let id = event.target.id;
  for (let i = 0; i < images.length; i++) {
    if (id === images[i].name) {
      //if the id of the image is the same as the name of the image
      images[i].imgHasShown++; //add one to the number of times the image has been clicked
    }
  }
  if (clickCounter === 0) {
    document.getElementById("clickCounter").textContent = "View Results";
    document.querySelectorAll("img").forEach((img) => {
      img.removeEventListener("click", handleClick);
    });
  } else {
    clickCounter--;
  }

  document.getElementById("images").innerHTML = "";
  renderImages(); //render the images
}

function removeClickHandler() {
  document
    .getElementById("clickCounter")
    .removeEventListener("click", handleClick);
}
let button = document.getElementById("clickCounter");
button.addEventListener("click", function () {
  if (clickCounter === 0) {
    document.getElementById("clickCounter").textContent = "View Results";
    document.getElementById("images").removeEventListener("click", handleClick);
    addTableHeader();
    renderResults();
    renderChart();
  }
});

function addTableHeader() {
  //adds table header to page
  let tableRow = document.createElement("tr");
  let tableHeader = document.createElement("th");
  tableHeader.textContent = "Image";
  tableRow.appendChild(tableHeader);
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Times Clicked";
  tableRow.appendChild(tableHeader);
  document.getElementById("results").appendChild(tableRow);
}

function renderResults() {
  for (let i = 0; i < images.length; i++) {
    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");
    tableData.textContent = images[i].name;
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = images[i].imgHasShown;
    tableRow.appendChild(tableData);
    document.getElementById("results").appendChild(tableRow);
  }
}

function renderChart() {
  let imgClicked = [];
  let imgShown = [];
  for (let i = 0; i < images.length; i++) {
    imgClicked.push(images[i].imgHasShown);
    imgShown.push(images[i].imgHasShown);
  }

  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: imagesName,
      datasets: [
        {
          label: "Times Clicked",
          data: imgClicked,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
        {
          label: "Times Showed",
          data: imgShown,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

createImages(); //calls createImages function
renderImages(); //calls renderImages function
// renderResults();
