const key = "INSERT UNSPLASH API KEY"
let imageLabel = document.querySelector("#image-label")

const button = document.querySelector('#new-image');
button.addEventListener('click', createPage)



function createPage() {
    const query = document.querySelector('#search').value;
    if (query) {
        let image = document.querySelector("#image")
        let endpoint = "https://api.unsplash.com/search/photos?per_page=100&query=" + query + "&client_id=" + key;
        fetch(endpoint, {
            method: "GET", headers: {
                accept: "application/json",
            }
        })
            .then(function (request) {
                return request.json()
            })
            .then(function (data) {
                data = data.results[Math.floor(Math.random() * data.results.length)]
                image.src = data.urls.raw 
                imageLabel.textContent = data.description
            }).catch(function(e){
                imageLabel.textContent = "Error, Invalid."
            })



    } else {

        let image = document.querySelector("#image")


        let endpoint = "https://api.unsplash.com/photos/random?client_id=" + key;

        fetch(endpoint, {
            method: "GET", headers: {
                accept: "application/json",
            }
        })
            .then(function (request) {
                return request.json()
            })
            .then(function (data) {
                image.src = data.urls.raw 
                imageLabel.textContent = data.description
            });

    }

}


createPage()