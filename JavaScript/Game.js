const bgCanvas = document.getElementById("BG")
const bgCtx = bgCanvas.getContext("2d")

bgCanvas.width = window.innerWidth
bgCanvas.height = window.innerHeight

const fish = [new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100),
				new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100),
				new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100),
				new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100),
				new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100),
				new player({x: -32, y: Math.floor(Math.random() * bgCanvas.height)}, 2,Math.floor(Math.random() * 150) + 100)]


var timeElapsed = 0

function update(time){
	requestAnimationFrame(update)
	var delta = (time - timeElapsed) / 1000
	timeElapsed = time
	bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height)

	fish.forEach((f) => {f.loop(delta)})
}

requestAnimationFrame(update)