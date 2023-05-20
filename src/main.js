// js


// display dead cat in list
function displayDeadCat(catId) {
    const catListDiv = document.getElementById("catId");
    const img = document.createElement("img");
}

// remove cat from list :: TODO :: check if this is needed
// function removeListCat(catId) {
//     const catListDiv = document.getElementById("catList");
//     const catImg = document.getElementById(catId);
//     debugger;

//     catListDiv.removeChild(catImg);
// }

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

    catImg.src = `https://cataas.com/cat/${catId.substring(0, 16)}`; // removes "-", 16 is the length of catId
    catImg.alt = "shown cat";
    catImg.classList.add("shownCat");
    catImgDiv.insertAdjacentElement("afterbegin", catImg);

    changeListCat(catId);
}

// replace catId in catList with random catId array
function replaceCatId() {
    const catListClass = document.getElementsByClassName("listCat");

    for (let i = 0; i < catListClass.length; i++) {
        catListClass[i].id = catList[i];
        debugger;
    }
}

// randomize jokers in catList
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
    img.alt = "joker cat";
    catListDiv.appendChild(img);
    // randomizeCatList();
    // replaceCatId();
}

// fetch one cat
async function fetchOneCat() {
    const data = await fetch("https://cataas.com/cat?json=true");
    const cat = await data.json();
    catList.push(cat._id);
    displayJoker(cat._id);
    return cat._id;
}

// display jokers list
function displayJokersList() {
    randomizeCatList();
    catList.forEach((catId) => displayJoker(catId));
}

// fetch cats
function fetchCats(qtty = 1) {

    for (let i = 0; i < qtty; i++) {
        const cat = fetchOneCat().then(catId => console.log(catId));
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


    if (easy.checked) {
        fetchCats(6);
    }
    if (medium.checked) {
        fetchCats(8);
    }
    if (hard.checked) {
        fetchCats(12);
    }
}


