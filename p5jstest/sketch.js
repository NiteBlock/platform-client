

function setup() {
    createCanvas(600, 400)
    background("#282828")

    fetch("http://localhost:8000/data-by-device?id=5d301f4371c2aa0017232d40").then(function(r){
        return r.json()
    }).then(function(d){
        console.log(d)
        fill("#00ff00")
        d.forEach(function(item, index){
            console.log(item.value)
            ellipse((600 / d.length) * index, 400 - item.value, 5,5)
            if(!(index+1==d.length)){
                stroke("#00ff00");

                line((600 / d.length) * index, 400 - item.value, (600 / d.length) * (index+1), 400 - d[index+1].value)
            }
        })
    })
}
