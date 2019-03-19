import { Animation, runAnimation } from './animation';
import { Circles } from './simple-anim';
import { Lissa } from './lissajous'


function createCanvas(): HTMLCanvasElement {
	let div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.display = 'block';
	let margin = '0';
	div.style.top = margin;
	div.style.bottom = margin;
	div.style.left = margin;
	div.style.right = margin;
	div.style.backgroundColor = 'black';
	document.body.appendChild(div);
	let canvas = document.createElement('canvas');
	let w = div.clientWidth;
	let h = div.clientHeight;
	canvas.setAttribute('width', '' + w);
	canvas.setAttribute('height', '' + h);
	div.appendChild(canvas);
	return canvas;
}

let animct = 1;

function createAnimation(canvas): Animation {
	animct++;
	if (animct > 1) animct = 0;
	switch (animct) {
		case 0: return new Circles(canvas.width, canvas.height);
		default: return new Lissa(canvas.width, canvas.height);
	}
}


function main() {
	let canvas = createCanvas();
	let animation = createAnimation(canvas)
	runAnimation(canvas, animation)
	canvas.onclick = () => {
		animation.done = true
		animation = createAnimation(canvas)
		runAnimation(canvas, animation)
	}
}

main();
