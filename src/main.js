// js

function displayCat(catId) {
    var img = document.createElement("img");

    img.id = imgId;
    img.src = `https://cataas.com/cat/${catId}`;
    img.classList.add("imageFeatures");
    img.alt = `cute cat ${catId}`;
    document.body.appendChild(img);
}

function fetchCats() {
    const requestURL = "https://cataas.com/api/cats?limit=5";
    const request = new Request(requestURL);

    const response = fetch(request);
    response
        .then((response) => response.json())
        .then((data) => {
            data.forEach((cat) => {
                displayCat(cat.id);
                console.log(cat.id);
            });
        })
        .catch((error) => console.log(error));
}


//     fetch("https://cataas.com/cat?json=true&height=200")
//         .then((response) => response.json())
//         .then((data) => {
//             const image = document.getElementById('catImg');
//             const imageUrl = data.url;
//             displayImage(imageUrl.slice(-16));
//         })
//         .catch((error) => console.log(error));
// }


const myButton = document.getElementById('reload');
myButton.addEventListener('click', fetchCats);
