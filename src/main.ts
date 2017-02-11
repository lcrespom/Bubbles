import { runAnimation } from './animation';
import { Circles } from './simple-anim';


function createCanvas(): HTMLCanvasElement {
	let div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.display = 'block';
	let margin = '10px';
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



function main() {
	let canvas = createCanvas();
	runAnimation(canvas as HTMLCanvasElement, new Circles(canvas.width, canvas.height));
}

main();
