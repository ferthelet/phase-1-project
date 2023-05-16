// js

function displayCat(catId) {
    var img = document.createElement("img");

    img.id = catId;
    img.src = `https://cataas.com/cat/${catId}`;
    img.classList.add("imageFeatures");
    img.alt = `cute cat ${catId}`;
    document.body.appendChild(img);
}

function fetchCats(quantity = 1) {
    const requestURL = `https://cataas.com/api/cats?limit=${quantity}`;
    debugger;
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



const myButton = document.getElementById('reload');
myButton.addEventListener('click', fetchCats(5));
