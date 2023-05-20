// js


// display dead cat in list
function displayDeadCat(catId) {
    const catListDiv = document.getElementById("catId");
    const img = document.createElement("img");
}

// remove cat from list
function removeListCat(catId) {
    const catListDiv = document.getElementById("catList");
    const catImg = document.getElementById(catId);

    catListDiv.removeChild(catImg);
}

// changes list cat to dead cat
function changeListCat(catId) {
    const catListDiv = document.getElementById("catList");
    const catImg = document.getElementById(catId);
    console.log(catListDiv);
    console.log(catId);
    console.log(catImg);

    catImg.src = "./assets/Joker-cat-inactive.jpg";
    catImg.alt = `${catId}`;
    catImg.classList.remove("listCat");
    catImg.classList.add("deadCat");
}

// display cat
function displayCat(catId) {
    const catImgDiv = document.getElementById("catImg");
    const catImg = document.createElement("img");
   
    catImg.src = `https://cataas.com/cat/${catId.substring(0, 16)}`; // 15 is the length of catId
    catImg.alt = `${catId}`;
    catImg.classList.add("shownCat");
    catImgDiv.insertAdjacentElement("afterbegin", catImg);

    changeListCat(catId);
}

// randomize catList
function randomizeCatList() {
    let currentIndex = catList.length;
    let temporaryValue;
    let randomIndex;
    
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = catList[currentIndex];
        catList[currentIndex] = catList[randomIndex];
        catList[randomIndex] = temporaryValue;
    }
}

// display joker cat
function displayJoker(catId) {
    const catListDiv = document.getElementById("catList");
    const img = document.createElement("img");

    img.id = catId;
    img.src = "./assets/Joker-cat.jpg";
    img.addEventListener('click',
        () => displayCat(catId), { once: true });
    img.classList.add("listCat");
    img.alt = `${catId}`;
    catListDiv.appendChild(img);
}

// fetch one cat
async function fetchOneCat() {
    return (await fetch("https://cataas.com/cat?json=true"))
        .json()
        .then((data) => {
            catList.push(data._id);
            displayJoker(data._id);
            catList.push(data._id + "-");
            displayJoker(data._id + "-");
            return data._id;
        });
}

// display jokers list
function displayJokersList() {
    randomizeCatList();
    catList.forEach((catId) => displayJoker(catId));
}

// fetch cats
async function fetchCats(qtty = 1) {
    let counter = 0;

    while (counter < qtty) {
        fetchOneCat();
        counter++;
    }
}

// main
let catList = [];

// waits for DOM to load before adding event listener
document.addEventListener('DOMContentLoaded', () => addingEventListener());

// adds event listener to form
function addingEventListener() {
    document.getElementById("difficulty_form").addEventListener("submit", handleFormSubmit);
}

// handles form submit
function handleFormSubmit(event) {
    event.preventDefault();
    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");

    // clear web page to start
    document.getElementById("catImg").innerHTML = "";
    document.getElementById("catList").innerHTML = "";
    catList = [];


    if(easy.checked){
       fetchCats(6);
    }
    if(medium.checked){
       fetchCats(8);
    }
    if(hard.checked){
       fetchCats(12);
    }
}


