import { Animation, AnimationContainer } from './animation';

class Figure {
	x: number;
	y: number;
	w: number;
	h: number;
	done: boolean;
	strokeStyle: string;
	fillStyle: string;
}

function rnd(range) {
	return Math.floor(Math.random() * range);
}

export class Circle extends Figure implements Animation {
	steps = 0;
	r: number; g: number; b: number; a: number;
	duration: number;

	constructor(w: number, h: number) {
		super();
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.w = Math.random() * w / 10;
		this.h = this.w;
		this.strokeStyle = 'white';
		this.r = rnd(256);
		this.g = rnd(256);
		this.b = rnd(256);
		this.a = 1;
		this.done = false;
		this.duration = 60 + Math.random() * 9;
	}

	step() {
		this.w++;
		this.steps++;
		this.a -= 0.0025;
		if (this.a <= 0 /*|| this.steps > 60 * this.duration*/) this.done = true;
	}

	draw(gc: CanvasRenderingContext2D) {
		gc.strokeStyle = this.strokeStyle;
		gc.fillStyle = this.fillStyle;
		this.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		gc.beginPath();
		gc.arc(this.x, this.y, this.w, 0, Math.PI * 2);
		gc.fill();
	}
}


export class Circles extends AnimationContainer {
	steps = 0;

	constructor(private w: number, private h: number) {
		super();
	}

	step() {
		this.steps++;
		if (this.steps % 30 == 0)
			this.add(new Circle(this.w, this.h));
		super.step();
	}
}