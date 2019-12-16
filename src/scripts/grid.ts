import { Point } from "./point";
import { validatePositiveInt } from "./validators";

export class Grid<T> {
	public get width(): number { return this._width; }
	public get height(): number { return this._height; }
	public get size(): Point { return new Point(this.width, this.height); }
	private _width: number;
	private _height: number;
	private _data: T[][];
	constructor(width: number, height: number, fill: (pos: Point) => T) {
		this._width = validatePositiveInt(width);
		this._height = validatePositiveInt(height);
		this._data = new Array(this.width).fill(null).map((_, x) => new Array(this.height).fill(null).map((_, y) => {
			return fill(new Point(x, y));
		}));
	}
	public isInBounds(point: Point): boolean {
		return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height;
	}
	public onlyIfInBounds(point: Point): void { if (!this.isInBounds(point)) throw new Error("out of bounds"); }
	public get(pos: Point): T {
		this.onlyIfInBounds(pos);
		return this._data[pos.x][pos.y];
	}
	public set(pos: Point, value: T): T {
		this.onlyIfInBounds(pos);
		return this._data[pos.x][pos.y] = value;
	}
	public transform<K>(f: (value: T, pos: Point, grid: Grid<T>) => K): Grid<K> {
		return new Grid(this.width, this.height, (pos: Point) => f(this.get(pos), pos, this));
	}
	public map<K>(f: (value: T, pos: Point, grid: Grid<T>) => K): K[] {
		return new Array(this.width * this.height).fill(null).map((_, i) => {
			const x = i % this.width;
			const y = Math.floor(i / this.width);
			const pos = new Point(x, y);
			return f(this.get(pos), pos, this);
		});
	}
}
