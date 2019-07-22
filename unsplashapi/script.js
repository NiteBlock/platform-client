const key = "5f38c464557c83ab13906403514f092f1e004b251a9842f931557df989e57751"
let imageLabel = document.querySelector("#image-label")

const button = document.querySelector('.button');
button.addEventListener('click', createPage)



function createPage() {
    const query = document.querySelector('.search').value;
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

function toggleClass() {
    this.classList.toggle('active');
}

function addClass() {
    this.classList.add('finished');
    setTimeout(() => {
        this.classList.remove("finished")
        this.classList.add("button")
    }, 2000);
}

button.addEventListener('click', toggleClass);
button.addEventListener('transitionend', toggleClass);
button.addEventListener('transitionend', addClass);