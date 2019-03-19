import { Animation } from './animation'

export class Lissa implements Animation {

	done: boolean
	w: number
	h: number
	r: number
	cx: number
	cy: number
	vx: number
	vy: number
	ax: number
	ay: number
	dax: number
	day: number
	dots: number

	constructor(w: number, h: number) {
		this.dots = 3000
		this.w = w
		this.h = h
		this.r = 0.4 * (w > h ? h : w)
		this.cx = w / 2
		this.cy = h / 2
		this.ax = 0
		this.ay = 0
		this.vx = 4
		this.vy = 1.001
		this.dax = this.vx * 2 * Math.PI / this.dots
		this.day = this.vy * 2 * Math.PI / this.dots
	}

	step() {
		if (this.ax > 2 * Math.PI) this.ax -= 2 * Math.PI
		if (this.ay > 2 * Math.PI) this.ay -= 2 * Math.PI
	}

	draw(gc: CanvasRenderingContext2D) {
		let x0 = 9999
		for (let i = 0; i < this.dots; i++) {
			this.ax += this.dax
			this.ay += this.day
			let x = Math.sin(this.ax)
			let y = Math.cos(this.ay)
			x = this.cx + this.r * x
			y = this.cy + this.r * y
			if (x > x0) gc.fillStyle = '#FFF'
			else gc.fillStyle = '#BBB'
			x0 = x
			gc.moveTo(x, y)
			gc.fillRect(x - 1, y - 1, 3, 3)
		}
	}

}
