

function setup() {
    createCanvas(600, 400)
    background("#282828")
}

let timer = -5000;

function drawGraph(item) {
    const colour = item.colour
    const id = item._id
    fetch("http://localhost:8000/data-by-device?id=" + id).then(function (r) {
        return r.json()
    }).then(function (d) {
        fill(colour)
        let xList =  []
        let yList = []
        stroke(colour);
        d.forEach(function (item, index) {
            console.log(item.value)
            ellipse((600 / d.length - 1) * index, 400 - item.value, 5, 5)

            beginShape()
            if (!(index + 1 == d.length)) {
                line(
                    (600 / d.length - 1) * index,
                    400 - item.value,
                    (600 / d.length - 1) * (index + 1),
                    400 - d[index + 1].value

                )
                curveVertex((600 / d.length - 1) * index,
                400 - item.value)
                xList.push((600 / d.length - 1) * index)
                yList.push(400 - item.value)
            }
        })
        endShape()
        noFill()
        let cords = []
        xList.forEach(function(x, index){
            y = yList[index]
            cords.push(x)
            cords.push(y)
        })
        for (let i = 0; i < cords.length; i+= 2){
            ellipse(cords[i], cords[i+1], 10, 10);
        }
    })
}

function drawBars(item) {
    const colour = item.colour
    const id = item._id
    fetch("http://localhost:8000/data-by-device?id=" + id).then(function (r) {
        return r.json()
    }).then(function (d) {
        fill(colour)
        d.forEach(function (item, index) {
            rect((600 / d.length - 1) * index, 400 - item.value, 600 / d.lenght, item.value)
        })

    })
}


function draw() {
    if (millis() - timer > 5000) {
        timer = millis()
        background("#282828")

        fetch("http://localhost:8000/list-devices").then(function (r) {
            return r.json()
        }).then(function (d) {
            d.forEach(function (item) {
                if (!(item == {})) {
                    drawGraph(item)
                }
            })
        })
    }
}