const bgCanvas = document.getElementById("BG")
const bgCtx = bgCanvas.getContext("2d")

bgCanvas.height = window.innerWidth

const heroCanvas = document.getElementById("hero")
const heroCtx = heroCanvas.getContext("2d")

heroCanvas.width = 131
heroCanvas.height = 142

var timeElapsed = 0

function update(time){
	requestAnimationFrame(update)
	var delta = (time - timeElapsed) / 1000
	timeElapsed = time
	updateKeys()
	heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height)
	hero.loop(delta)
}

requestAnimationFrame(update)