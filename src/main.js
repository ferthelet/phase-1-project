// js


// display dead cat in list
function displayDeadCat(catId) {
    const catListDiv = document.getElementById("catId");
    const img = document.createElement("img");
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

    catImg.src = `https://cataas.com/cat/${catId.substring(0, 16)}`; // removes "-", 16 is the length of catId
    catImg.alt = "shown cat";
    catImg.classList.add("shownCat");
    catImgDiv.insertAdjacentElement("afterbegin", catImg);

    //score
    if (catId.substring(0, 16) === lastCatId.substring(0, 16)) { // removes the "-" from duplicates catId
        score += 1;
        document.getElementById("score").innerHTML = score;
    }
    lastCatId = catId;

    changeListCat(catId);
}

// randomize jokers in catList
function randomizeCatList() {
    let currentIndex = catList.length;
    let temp;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temp = catList[currentIndex];
        catList[currentIndex] = catList[randomIndex];
        catList[randomIndex] = temp;
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
}

// fetch one cat
async function fetchOneCat() {
    const data = await fetch("https://cataas.com/cat?json=true");
    const cat = await data.json();
    catList.push(cat._id);
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
        const cat = fetchOneCat()
            .then(catId => {
                console.log(catId);
                if (i === qtty - 1) {   // if last cat
                    catList.forEach((catId) => catList.push(catId + "-")); // pushes duplicates to catList
                    displayJokersList();
                };
            });
    }
}

// main
let catList = [];
let lastCatId = "";
let score = 0;
// game difficulty
const EASY = 3;
const MEDIUM = 6;
const HARD = 10;

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
    catList = [];
    score = 0;
    document.getElementById("catImg").innerHTML = "";
    document.getElementById("catList").innerHTML = "";
     document.getElementById("score").innerHTML = score;


    if (easy.checked) {
        fetchCats(EASY);
    }
    if (medium.checked) {
        fetchCats(MEDIUM);
    }
    if (hard.checked) {
        fetchCats(HARD);
    }
}


