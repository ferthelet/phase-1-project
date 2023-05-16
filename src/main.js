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
        // img.src = `https://cataas.com/cat/${catId}`;
        // img.src = "assets/Joker-cat.jpg";
    });
    img.classList.add("listCat");
    img.alt = `cute cat ${catId}`;
    catListDiv.appendChild(img);

}

// fetch cats, default 4
function fetchCats(qtty = 4) {
    const requestURL = `https://cataas.com/api/cats?limit=${qtty}`;
    const request = new Request(requestURL);

    const response = fetch(request);
    response
        .then((response) => response.json())
        .then((data) => {
            data.forEach((cat) => {
                displayJoker(cat._id);
                console.log(cat._id);
            });
        })
        .catch((error) => console.log(error));
}

// main
// const myForm = document.getElementById('myForm');
// myForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const qtty = document.getElementById('qtty').value;
//     fetchCats(qtty);
// });
const myButton = document.getElementById('reload');
myButton.addEventListener('click', () => fetchCats(8));
