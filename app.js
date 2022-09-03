"use script";

let images = []; //array of images
let totalClicks = 0; //total number of clicks
let clickCounter = 25; //number of clicks left

function createImage(name, src, imgHasShown, timesShown) {
  // constructor function
  this.name = name;
  this.src = src;
  this.imgHasShown = imgHasShown;
  this.timesShown = timesShown;
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
    images.push(new createImage(imagesName[i], imagesSrc[i], 0, 0));
  }
}

//Local Storage
function saveToLocalStorage() {
  let stringifiedImages = JSON.stringify(images);
  localStorage.setItem("images", stringifiedImages);
}

function getFromLocalStorage() {
  let data = localStorage.getItem("images");
  let parsedImages = JSON.parse(data);
  if (parsedImages) {
    images = parsedImages;
  }
}

function renderImages() {
  //renders images to page
  let randomImage1 = Math.floor(Math.random() * images.length);
  let randomImage2 = Math.floor(Math.random() * images.length);
  let randomImage3 = Math.floor(Math.random() * images.length);
  while (
    randomImage1 === randomImage2 ||
    randomImage1 === randomImage3 ||
    randomImage2 === randomImage3
  ) {
    randomImage1 = Math.floor(Math.random() * images.length);
    randomImage2 = Math.floor(Math.random() * images.length);
    randomImage3 = Math.floor(Math.random() * images.length);
  }
  let image1 = document.createElement("img");
  image1.src = images[randomImage1].src;
  image1.id = images[randomImage1].name;
  image1.addEventListener("click", handleClick);
  document.getElementById("images").appendChild(image1);
  let image2 = document.createElement("img");
  image2.src = images[randomImage2].src;
  image2.id = images[randomImage2].name;
  image2.addEventListener("click", handleClick);
  document.getElementById("images").appendChild(image2);
  let image3 = document.createElement("img");
  image3.src = images[randomImage3].src;
  image3.id = images[randomImage3].name;
  image3.addEventListener("click", handleClick);
  document.getElementById("images").appendChild(image3);
  images[randomImage1].timesShown++;
  images[randomImage2].timesShown++;
  images[randomImage3].timesShown++;

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

let button = document.getElementById("clickCounter"); //button to view results

button.addEventListener("click", function (e) {
  let buttonClicked = false;
  //adds event listener to button
  if (clickCounter === 0) {
    document.getElementById("clickCounter").textContent = "View Results";
    document.getElementById("images").removeEventListener("click", handleClick);
    addTableHeader();
    renderResults();
    renderChart();
    buttonClicked = true;
  }

  if (clickCounter === 0) {
    saveToLocalStorage();
  }
  if (buttonClicked === true) {
    removeClickHandler();
  }
});

function addTableHeader() {
  //adds table header to page
  let tableRow = document.createElement("tr");
  let tableHeader = document.createElement("th");
  let tableHeader2 = document.createElement("th");
  tableHeader.textContent = "Image";
  tableRow.appendChild(tableHeader);
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Times Clicked";
  tableRow.appendChild(tableHeader);
  tableHeader2.textContent = "Times Shown";
  tableRow.appendChild(tableHeader2);
  document.getElementById("results").appendChild(tableRow);
}

function renderResults() {
  //renders results to page
  for (let i = 0; i < images.length; i++) {
    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");
    tableData.textContent = images[i].name;
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = images[i].imgHasShown;
    tableRow.appendChild(tableData);
    tableData = document.createElement("td");
    tableData.textContent = images[i].timesShown;
    tableRow.appendChild(tableData);
    document.getElementById("results").appendChild(tableRow);
  }
}

function renderChart() {
  //renders chart to page
  let imgClicked = []; //array of images clicked
  let imgShown = []; //array of images shown
  for (let i = 0; i < images.length; i++) {
    //loops through images array
    imgClicked.push(images[i].imgHasShown); //adds number of times image has been clicked to array
    imgShown.push(images[i].timesShown); //adds number of times image has been shown to array
  }

  let ctx = document.getElementById("myChart").getContext("2d"); //creates chart
  let myChart = new Chart(ctx, {
    //creates chart
    type: "bar",
    data: {
      //data for chart
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
