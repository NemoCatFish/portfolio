keys = {a: 0, d: 0, s: 0, w:0, ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0}

function updateKeys(){
	addEventListener("touchstart", (event) =>{
		hero.position.x = event.pageX - 65
		hero.position.y = event.pageY - 95
	})
	addEventListener("keydown", (event) =>{
			keys[event.key] = 1
	})
	addEventListener("keyup", (event) =>{
		keys[event.key] = 0
	})	
}

class spriteSheet{
	frameTime = 0
	flip = -1
	constructor(src, position, scale, frameSize){
		this.img = new Image()
		this.img.src = src
		this.img.id = "hero"
		this.position = position
		this.scale = scale
		this.frameSize = frameSize
		this.chunkRect = {x: 0, y: 0, width: frameSize.x, height: frameSize.y}

	}

	draw(){
		heroCanvas.style.left = this.position.x + "px"
		heroCanvas.style.top = this.position.y + "px"
		heroCtx.drawImage(this.img, this.chunkRect.x, this.chunkRect.y, 131, 142,
					 	0, 0, this.frameSize.x * this.scale, this.frameSize.y * this.scale)
	}
}

class player extends spriteSheet{
	inputVector = {x: 0, y: 0}
	animations = {"idle": 0, "run": 1, "jump": 2, "attack": 3, "stun": 4}
	constructor(src, position, scale, frameSize, speed){
		super(src, position, scale, frameSize)
		this.speed = speed
	}

	animate(delta){
		this.frameTime += delta
		if (this.frameTime > 0.05){
			this.frameTime = 0
			if (this.chunkRect.x + this.frameSize.x > this.frameSize.x * 7){
				this.chunkRect.x = 0
			}
			else{
				this.chunkRect.x += this.frameSize.x
			}
		}

		if (this.inputVector.x || this.inputVector.y){
			this.chunkRect.y = this.animations.run * this.frameSize.y
		}
		else{
			this.chunkRect.y = this.animations.idle * this.frameSize.y
		}
	}

	move(delta){
		this.inputVector.x = keys.d - keys.a
		if (!this.inputVector.x){
			this.inputVector.x = (keys.ArrowRight - keys.ArrowLeft)
		}
		this.inputVector.y = keys.s - keys.w
		if (!this.inputVector.y){
			(this.inputVector.y = keys.ArrowDown - keys.ArrowUp)
		}
		this.position.x += this.inputVector.x * this.speed * delta
		this.position.y += this.inputVector.y * this.speed * delta
		this.animate(delta)
	}

	loop(delta){
		this.move(delta)
		this.draw()
	}
}

//const hero = new player("./Assets/Hero.png", {x: 10, y: 10}, 1, {x: 131, y: 142} ,250)
const hero = new player("./Assets/Hero.png", {x: 0, y: 0}, 1, {x: 131, y: 142} ,250)
