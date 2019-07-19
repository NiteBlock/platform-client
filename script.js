const objects = ["name", "type", "status","colour", "_id"]
const container = document.querySelector("#devicelistonly")
console.log("here")
fetch("http://localhost:8000/list-devices")
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
    fetch("http://localhost:8000/list-devices?name=" + search.value)
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
    fetch("http://localhost:8000/find-by-id?id=" + document.querySelector("#find_with_id").value)
        .then(function (r) {
            return r.json()
        })
        .then(function (item) {
            if (item.name && item.type && item._id) {
                let deviceHolder = document.querySelector("#device-info")
                deviceHolder.textContent = makeTextContent(item)


            } else {
                let deviceHolder = document.querySelector("#device-info")
                deviceHolder.textContent = "Thats a bad id."
            }
        })
        fetch("http://localhost:8000/data-by-device?id=" + document.querySelector("#find_with_id").value)
        .then(function (r) {
            return r.json()
        })
        .then(function (item) {
            console.log(item)
            if(item[0].value) {
                let deviceHolder = document.querySelector("#device-info")
                deviceHolder.textContent += "  Value: " + item[0].value

            }
        })
})

function makeTextContent(item) {
    type = item.type.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
    return `Name: ${item.name}   Type: ${type}    ID: ${item._id}`
}


const saveForm = document.querySelector("#save-data")
saveForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const deviceId = document.querySelector("#device-id-save").value
    const value = document.querySelector("#device-value").value

    const requestData = {
        deviceId: deviceId,
        value: value
    }

    const json = JSON.stringify(requestData)

    const request = {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    }
    console.log(request)
    fetch("http://localhost:8000/save-data", request).then(function (response) {
        return response.text()
    }).then(function (data) {
        console.log(data)
    })

})

const updateForm = document.querySelector("#update-device")
updateForm.addEventListener("submit", function(e){
    e.preventDefault()
    const deviceId =  document.querySelector("#device-id-status").value
    const deviceStatus =  document.querySelector("#new-status").value


    const requestBody = JSON.stringify({
        id: deviceId,
        status: deviceStatus
    })

    fetch("http://localhost:8000/update-device-status", {
        body: requestBody,
        headers: {
            "Content-Type": "application/json"
        },
        method : "PUT"
    }).then(function(response){
        return response.text()
    }).then(function(data){
        console.log(data)
    })

})


const updateColourForm = document.querySelector("#update-device-colour")
updateForm.addEventListener("submit", function(e){
    e.preventDefault()
    const deviceId =  document.querySelector("#device-id-colour").value
    const deviceColour =  document.querySelector("#new-colour").value


    const requestBody = JSON.stringify({
        id: deviceId,
        colour: deviceColour
    })

    fetch("http://localhost:8000/update-device-colour", {
        body: requestBody,
        headers: {
            "Content-Type": "application/json"
        },
        method : "PUT"
    }).then(function(response){
        return response.text()
    }).then(function(data){
        console.log(data)
    })

})