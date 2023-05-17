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
    catImg.alt = `dead cat`;
    catImg.classList.remove("listCat");
    catImg.classList.add("deadCat");
}

// display cat
function displayCat(catId) {
    const catImgDiv = document.getElementById("catImg");
    const catImg = document.createElement("img");

    catImg.src = `https://cataas.com/cat/${catId}`;
    catImg.alt = `cute cat`;
    catImg.classList.add("shownCat");
    catImgDiv.insertAdjacentElement("afterbegin", catImg);

    changeListCat(catId);
}

// display joker cat
function displayJoker(catId) {
    const catListDiv = document.getElementById("catList");
    const img = document.createElement("img");

    img.id = catId;
    img.src = "./assets/Joker-cat.jpg";
    img.addEventListener('click',
        () => displayCat(catId),{once: true});
    img.classList.add("listCat");
    img.alt = `joker cat`;
    catListDiv.appendChild(img);
}

async function fetchOneCat() {
    return (await fetch("https://cataas.com/cat?json=true"))
    .json()
    .then((data) => {
        console.log(data._id); 
        catList.push(data._id);
        displayJoker(data._id);
        return data._id;
    });
}

// fetch cats, default 4
function fetchCats(qtty = 4) {
    let counter = 0;

    while (counter < qtty) {
        fetchOneCat();
        counter++;
    }
}

// main
// const myForm = document.getElementById('myForm');
// myForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const qtty = document.getElementById('qtty').value;
//     fetchCats(qtty);
// });

let catList = [];
const myButton = document.getElementById('reload');
myButton.addEventListener('click', () => fetchCats(8));

