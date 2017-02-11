export interface Animation {
	step: () => void;
	draw: (gc: CanvasRenderingContext2D) => void;
	done: boolean;
}

export class AnimationContainer implements Animation {
	items: Animation[];
	done: false;

	constructor() {
		this.items = [];
	}

	add(item: Animation) {
		this.items.push(item);
	}

	step() {
		for (let item of this.items) item.step();
		this.items = this.items.filter(item => !item.done);
	}

	draw(gc: CanvasRenderingContext2D) {
		for (let item of this.items) item.draw(gc);
	}
}


function drawLoop(cb: () => void, timeData: any = {}) {
	window.requestAnimationFrame(_ => {
		timeData.before = performance.now();
		cb();
		calcTime(timeData);
		drawLoop(cb, timeData);
	});
}

function calcTime(timeData) {
	timeData.time = timeData.time || 0;
	let now = performance.now();
	let elapsed = now - timeData.time;
	timeData.time = now;
	timeData.fps = 1000 / elapsed;
	timeData.cpu = (now - timeData.before) / elapsed;
}

export function runAnimation(canvas: HTMLCanvasElement, animation: Animation) {
	let ctx = canvas.getContext('2d');
	if (!ctx) throw Error('No 2d context!');
	let w = canvas.width;
	let h = canvas.height;
	let gc = ctx;
	drawLoop(() => {
		animation.step();
		gc.clearRect(0, 0, w, h);
		animation.draw(gc);
	});
}
