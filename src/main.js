// js

function displayImage(imgId) {
    var img = document.createElement("img");

    img.id = imgId;
    img.src = `https://cataas.com/cat/${imgId}`;
    img.classList.add("imageFeatures");
    img.alt = `cute cat ${imgId}`;
    document.body.appendChild(img);
}

function fetchCats() {
    fetch("https://cataas.com/cat?json=true")
        .then((response) => response.json())
        .then((data) => {
            const image = document.getElementById('catImg');
            const imageUrl = data.url;
            displayImage(imageUrl.slice(-16));
        })
        .catch((error) => console.log(error));
}


const myButton = document.getElementById('reload');
myButton.addEventListener('click', fetchCats);
