const url = "http://api.thecatapi.com/v1/images/search"
const button = document.querySelector('.button');

let image = document.querySelector("#image")


function setImage(imageUrl) {
    image.src = imageUrl
}

function createPage(category) {
    if (category) {

        fetch(url + "?category_ids=" + category).then(function (response) {

            return response.json()

        }).then(function (data) {
            console.log(data)
            setImage(data[0].url)
        })
    } else {
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (data) { setImage(data[0].url) })
    }
}


createPage()

const categoryOptions = document.querySelector("#choose-cat")

button.addEventListener("click", function () {

    var category = categoryOptions.options[categoryOptions.selectedIndex].value;
    if (category != "0") {
        createPage(category)
    } else {
        createPage()
    }
})


const submit = document.querySelector('.submit');

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