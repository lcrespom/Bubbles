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


function drawLoop(cb, timeData: any = {}) {
	window.requestAnimationFrame(_ => {
		timeData.before = performance.now();
		let done = cb(timeData);
		calcTime(timeData);
		if (!done) drawLoop(cb, timeData);
	});
}

function calcTime(timeData) {
	timeData.time = timeData.time || 0;
	timeData.count = timeData.count || 1;
	let now = performance.now();
	let elapsed = now - timeData.time;
	timeData.time = now;
	timeData.count++;
	timeData.fps = 1000 / elapsed;
	timeData.cpu = (now - timeData.before) / elapsed;
}

function showTimeData(gc: CanvasRenderingContext2D, timeData) {
	if (isNaN(timeData.fps)) return;
	gc.fillStyle = 'white';
	gc.font = '16px sans-serif';
	if (timeData.count % 30 == 0)
		timeData.txt = '' + timeData.fps.toPrecision(2) + ' FPS';
	gc.fillText(timeData.txt || '', 15, 30);
}

export function runAnimation(canvas: HTMLCanvasElement, animation: Animation, showInfo = true) {
	let ctx = canvas.getContext('2d');
	if (!ctx) throw Error('No 2d context!');
	let w = canvas.width;
	let h = canvas.height;
	let gc = ctx;
	drawLoop(timeData => {
		animation.step();
		gc.clearRect(0, 0, w, h);
		animation.draw(gc);
		if (showInfo) showTimeData(gc, timeData);
		return animation.done;
	});
}
