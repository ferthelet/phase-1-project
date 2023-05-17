// js


// display dead cat in list
function displayDeadCat(catId) {
    const catListDiv = document.getElementById("catList");
    const img = document.createElement("img");
}

// display cat
function displayCat(catId) {
    const catImgDiv = document.getElementById("catImg");
    const catImg = document.createElement("img");

    catImg.src = `https://cataas.com/cat/${catId}`;
    catImg.alt = `cute cat ${catId}`;
    catImg.classList.add("shownCat");
    catImgDiv.insertAdjacentElement("afterbegin", catImg);
}

// display joker cat
function displayJoker(catId) {
    const catListDiv = document.getElementById("catList");
    const img = document.createElement("img");

    img.id = catId;
    img.src = "./assets/Joker-cat.jpg";
    img.addEventListener('click', () => {
        displayCat(catId);
    });
    img.classList.add("listCat");
    img.alt = `cute cat ${catId}`;
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

