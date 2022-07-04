class spriteSheet{
	frameTime = 0
	constructor(src, position, scale, size){
		this.img = new Image()
		this.img.src = src
		this.img.id = "hero"
		this.position = position
		this.scale = scale
		this.size = size
		this.chunkRect = {x: 0, y: 0, width: size.x, height: size.y}

	}

	draw(){
		bgCtx.drawImage(this.img, this.chunkRect.x, 0, this.size.x, this.size.y,
							this.position.x, this.position.y, this.size.x * this.scale, this.size.y * this.scale)
	}
}

class Bubble extends spriteSheet{
	constructor(position, scale, speed){
		super("./Assets/Bubbles.png", position, scale, {x: 12, y: 12})
		this.speed = speed
		this.oringinPos = position.x
		this.running = true;
	}

	animate(delta){
		if (Math.abs(this.position.x - this.oringinPos) > 30){
			this.running = false;
		}
		else{
			this.position.x -= this.speed * delta;
			this.position.y -= this.speed / 2 * delta;
			this.draw()
		}
	}
}

class player extends spriteSheet{
	constructor(position, scale, speed){
		super("./Assets/Sheet.png", position, scale, {x: 32, y: 32})
		this.speed = speed
		this.bubble = new Bubble({x: position.x - 16, y: position.y}, 1, 50)
	}

	animate(delta){
		this.frameTime += delta
		if (this.bubble.running){
			this.bubble.animate(delta)
		}
		else{
			this.bubble = new Bubble({x: this.position.x - 16, y: this.position.y}, 1, 50)
		}
		if (this.frameTime > 0.2){
			this.frameTime = 0
			if (this.chunkRect.x + 32 > 32){
				this.chunkRect.x = 0
			}
			else{
				this.chunkRect.x += 32
			}
		}
	}
	reload(){
		this.position.x = -32
		this.position.y = Math.floor(Math.random() * bgCanvas.height)
		this.scale = Math.floor(Math.random() * 4) + 1.5
		this.speed = Math.floor(Math.random() * 150) + 100
	}

	move(delta){
		if (this.position.x > bgCanvas.width){
			this.reload()
		}
		this.position.x += this.speed * delta
		this.animate(delta)
		}

	loop(delta){
		this.move(delta)
		this.draw()
	}
}

//const hero = new player("./Assets/Hero.png", {x: 10, y: 10}, 1, {x: 131, y: 142} ,250)
