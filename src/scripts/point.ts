import { validateInt } from "./validators";

export class Point {
	static get ZERO(): Point { return new Point(0, 0); }
	public get x(): number { return this._x; }
	public get y(): number { return this._y; }
	private _x: number;
	private _y: number;
	constructor(x: number, y: number) {
		this._x = validateInt(x);
		this._y = validateInt(y);
	}
	public add(other: Point | number): Point {
		if (typeof other === "number") return this.add(new Point(other, other));
		return new Point(this.x + other.x, this.y + other.y);
	}
	public max(other: Point): Point { return new Point(Math.max(this.x, other.x), Math.max(this.y, other.y)); }
	public mul(other: number | Point): Point {
		if (typeof other === "number") return this.mul(new Point(other, other));
		return new Point(this.x * other.x, this.y * other.y);
	}
	public eq(other: Point): boolean { return this.x === other.x && this.y === other.y; }
}
