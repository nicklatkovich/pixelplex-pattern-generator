import { Grid } from "./grid";
import { Point } from "./point";
import { rand } from "./random";

export enum CELL {
	EMPTY = 0,
	POTENTIAL = 1,
	FILLED = 2,
	LOCKED = 3,
	DIAG = 4,
}

export const pointZero = new Point(0, 0);
export const neighbors: Point[] = [1, 0, -1, 0].map((x, i, arr) => new Point(x, arr[(i + 1) % 4]));
export const [right, top, left, bottom] = neighbors;
export const diagonals: Point[] = [1, -1, -1, 1].map((x, i, arr) => new Point(x, arr[(i + 1) % 4]));

export const possibleCornerLocks: Point[][] = [
	[],
	[pointZero],
	[pointZero, right],
	[pointZero, bottom],
	[pointZero, right, bottom],
];

export function generate(size: number): Grid<boolean> {
	const grid = new Grid(size, size, () => CELL.EMPTY);
	const start = new Point(rand(grid.width), rand(grid.height));
	for (let i = 0; i < 4; i++) {
		const cornerLocksIndex = rand(possibleCornerLocks.length);
		const cornerLocks = possibleCornerLocks[cornerLocksIndex];
		const pillar = diagonals[i].max(pointZero).mul(grid.size.add(-1));
		console.log('pillar', pillar);
		for (const cornerLock of cornerLocks) {
			console.log('cornerLock', cornerLock);
			const lockPos = pillar.add(cornerLock.mul(diagonals[(i + 2) % 4]));
			console.log('lockPos', lockPos);
			grid.set(lockPos, CELL.LOCKED);
		}
	}
	grid.set(start, CELL.POTENTIAL);
	const points = [start];
	while (points.length > 0) {
		const posIndex = rand(points.length);
		const pos = points[posIndex];
		const last = points.pop()!;
		if (posIndex < points.length) points[posIndex] = last;
		if (![CELL.POTENTIAL, CELL.DIAG].includes(grid.get(pos))) continue;
		grid.set(pos, CELL.FILLED);
		for (let i = 0; i < 4; i++) {
			const near = pos.add(neighbors[i]);
			if (!grid.isInBounds(near)) continue;
			switch (grid.get(near)) {
				case CELL.POTENTIAL:
					grid.set(near, CELL.LOCKED);
					break;
				case CELL.DIAG:
					grid.set(near, CELL.POTENTIAL);
					break;
				case CELL.EMPTY:
					grid.set(near, CELL.POTENTIAL);
					for (let j = 0; j < 2; j++) points.push(near);
					break;
				default: break;
			}
		}
		for (let i = 0; i < 4; i++) {
			const near = pos.add(diagonals[i]);
			if (!grid.isInBounds(near) || grid.get(near) !== CELL.EMPTY) continue;
			grid.set(near, CELL.DIAG);
			points.push(near);
		}
	}
	return grid.transform((cell) => cell === CELL.FILLED);
}
