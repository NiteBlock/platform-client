const objects = ["name", "type", "_id"]
const container = document.querySelector("#devicelistonly")
console.log("here")
fetch("http://platform-device.herokuapp.com/list-devices")
    .then(function (r) {
        return r.json()
    })
    .then(function (data) {
        data.forEach(function (item) {

            let deviceHolder = document.createElement("tr")

            objects.forEach(function (x) {
                let object = document.createElement("td")
                object.textContent = item[x]
                deviceHolder.appendChild(object)
            })

            deviceHolder.classList.add("nicelist")

            container.appendChild(deviceHolder)

        })
    })

const search = document.querySelector("#search")

search.addEventListener("keypress", function () {
    const container = document.querySelector("#devicelistonly")
    console.log("here")
    fetch("http://platform-device.herokuapp.com/list-devices?name=" + search.value)
        .then(function (r) {
            return r.json()
        })
        .then(function (data) {
            container.innerHTML = "<tr><th>Name</th><th>Type</th> <th>Id</th></tr>";        
            data.forEach(function (item) {

                let deviceHolder = document.createElement("tr")

                objects.forEach(function (x) {
                    let object = document.createElement("td")
                    object.textContent = item[x]
                    deviceHolder.appendChild(object)
                })

                deviceHolder.classList.add("nicelist")

                container.appendChild(deviceHolder)

            })
        })
});
const find = document.querySelector("#device_id")

find.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log("here")
    fetch("http://platform-device.herokuapp.com/find-by-id?id=" + document.querySelector("#find_with_id").value)
        .then(function (r) {
            return r.json()
        })
        .then(function (item) {
            if (item.name && item.type && item._id) {
                console.log(item)
                let deviceHolder = document.querySelector("#device-info")
                deviceHolder.textContent = makeTextContent(item)


                idcont.appendChild(deviceHolder)
            } else {
                let deviceHolder = document.querySelector("#device-info")
                deviceHolder.textContent = "Thats a bad id."
            }
        })
    })

function makeTextContent(item) {
    type = item.type.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
    return `Name: ${item.name}   Type: ${type}    ID: ${item._id}`
}