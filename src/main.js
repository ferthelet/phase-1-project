// js

// display cat
function displayCat(catId) {
    var img = document.createElement("img");

    img.id = catId;
    img.src = `https://cataas.com/cat/${catId}`;
    img.classList.add("imageFeatures");
    img.alt = `cute cat ${catId}`;
    document.body.appendChild(img);
}

// fetch cats, pending how to pass how many as a parameter
function fetchCats(qtty = 4) {
    const requestURL = `https://cataas.com/api/cats?limit=10`;
    const request = new Request(requestURL);

    const response = fetch(request);
    response
        .then((response) => response.json())
        .then((data) => {
            data.forEach((cat) => {
                displayCat(cat._id);
                console.log(cat._id);
            });
        })
        .catch((error) => console.log(error));
}

// main
const myButton = document.getElementById('reload');
myButton.addEventListener('click', () => fetchCats(10));
