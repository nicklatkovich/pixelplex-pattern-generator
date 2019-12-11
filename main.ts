const color = "#4650a0";
const size = 5;
const scale = 64;
const line_width = 3;

interface Point { x: number; y: number }
function rand(a: number): number { return Math.floor(Math.random() * a); }
function add(a: Point, b: Point): Point { return { x: a.x + b.x, y: a.y + b.y }; }
function max(a: Point, b: Point): Point { return { x: Math.max(a.x, b.x), y: Math.max(a.y, b.y) }; }
function mul_n(a: Point, n: number): Point { return { x: a.x * n, y: a.y * n }; }
function mul(a: Point, b: Point): Point { return { x: a.x * b.x, y: a.y * b.y }; }
function is_in_bounds(pos: Point): boolean { return pos.x >= 0 && pos.x < size && pos.y >= 0 && pos.y < size; }
function eq(a: Point, b: Point): boolean { return a.x === b.x && a.y === b.y; }

enum CELL {
	EMPTY = 0,
	POTENTIAL = 1,
	POINT = 2,
	LOCKED = 3,
	DIAG = 4,
}

const d0: Point = { x: 0, y: 0 };
const dx = [1, 0, -1, 0];
const dy = dx.map((_, i) => dx[(i + 1) % 4]);
const d = dx.map<Point>((x, i) => ({ x, y: dy[i] }));

const d4x = [1, -1, -1, 1];
const d4y = d4x.map((_, i) => d4x[(i + 1) % 4]);
const d4 = d4x.map<Point>((x, i) => ({ x, y: d4y[i] }));

const es: Point[][] = [
	[],
	[d0],
	[d0, d[0]],
	[d0, d[3]],
	[d0, d[0], d[3]],
];

function generate(size: number): CELL[][] {
	const map = new Array(size).fill(null).map(() => new Array<CELL>(size).fill(CELL.EMPTY));
	const start: Point = { x: rand(size), y: rand(size) };
	for (let i = 0; i < 4; i++) {
		const e_index = rand(es.length);
		const e = es[e_index];
		const pillar = mul_n(max(d4[i], d0), size - 1);
		for (const p of e) {
			const lock_pos = add(pillar, mul(p, d4[(i + 2) % 4]));
			if (!eq(lock_pos, start)) map[lock_pos.x][lock_pos.y] = CELL.LOCKED;
		}
	}
	map[start.x][start.y] = CELL.POTENTIAL;
	const points = [start];
	while (points.length > 0) {
		const pos_index = rand(points.length);
		const pos = points[pos_index];
		const last = points.pop()!;
		if (pos_index < points.length) points[pos_index] = last;
		if (![CELL.POTENTIAL, CELL.DIAG].includes(map[pos.x][pos.y])) continue;
		map[pos.x][pos.y] = CELL.POINT;
		for (let i = 0; i < 4; i++) {
			const near = add(pos, d[i]);
			if (!is_in_bounds(near)) continue;
			if (map[near.x][near.y] === CELL.POTENTIAL) map[near.x][near.y] = CELL.LOCKED;
			else if (map[near.x][near.y] === CELL.DIAG) map[near.x][near.y] = CELL.POTENTIAL;
			else if (map[near.x][near.y] === CELL.EMPTY) {
				map[near.x][near.y] = CELL.POTENTIAL;
				points.push(near);
				points.push(near);
			}
			else continue;
		}
		for (let i = 0; i < 4; i++) {
			const near = add(pos, d4[i]);
			if (!is_in_bounds(near) || map[near.x][near.y] !== CELL.EMPTY) continue;
			map[near.x][near.y] = CELL.DIAG;
			points.push(near);
		}
	}
	return map;
}

function render(map: CELL[][], size: number, ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, scale * (size + 1), scale * (size + 1));
	ctx.lineWidth = line_width;
	ctx.strokeStyle = color;
	ctx.beginPath();
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (map[x][y] !== CELL.POINT) continue;
			for (let i = 0; i < 4; i++) {
				const near = add({ x, y }, d[i]);
				if (is_in_bounds(near) && map[near.x][near.y] === CELL.POINT) continue;
				ctx.moveTo(scale * (x + d4[i].x / 2) + scale, scale * (y + d4[i].y / 2) + scale);
				const other = d4[(i + 3) % 4];
				ctx.lineTo(scale * (x + other.x / 2) + scale, scale * (y + other.y / 2) + scale);
			}
		}
	}
	ctx.stroke();
}

async function main() {
	const renderer = document.getElementById("render") as HTMLCanvasElement | null;
	if (!renderer) throw new Error("renderer not found");
	renderer.width = scale * (size + 1);
	renderer.height = scale * (size + 1);
	const ctx = renderer.getContext("2d");
	if (!ctx) throw new Error("unable to get context");
	render(generate(size), size, ctx);
	document.body.onkeydown = (e) => { if (e.keyCode === 32) render(generate(size), size, ctx); }
	document.body.onmousedown = () => render(generate(size), size, ctx);
}

if (document) main();
