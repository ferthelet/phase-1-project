// js


// display cat
function displayCat(catId) {
    const catImgDiv = document.getElementById("catImg");
    const catImg = document.createElement("img");
    debugger;
    catImg.src = `https://cataas.com/cat/${catId}`;
    catImg.alt = `cute cat ${catId}`;
    console.log(catImg);
    catImgDiv.appendChild(catImg);

    // const img = document.createElement("img");

    // // img.id = catId;
    // img.src = `https://cataas.com/cat/${catId}`;
    // // img.classList.add("imageFeatures");
    // img.alt = `cute cat ${catId}`;
    // document.body.appendChild(img);
}

// display joker cat
function displayJoker(catId) {
    const img = document.createElement("img");

    img.id = catId;
    img.src = "assets/Joker-cat.jpg";
    img.addEventListener('click', () => {
        displayCat(catId);
        // img.src = `https://cataas.com/cat/${catId}`;
        // img.src = "assets/Joker-cat.jpg";
    });
    img.classList.add("cuteCat");
    img.alt = `cute cat ${catId}`;
    document.body.appendChild(img);

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
