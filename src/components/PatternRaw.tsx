import React, { Component, Fragment } from "react";
import { neighbors, diagonals } from "../scripts/generator";
import { Grid } from "../scripts/grid";
import { Point } from "../scripts/point";

export default class PatternRaw extends Component<{ grid: Grid<boolean> }> {
	drawCell(pos: Point) {
		if (!this.props.grid.get(pos)) return null;
		const lines = [];
		for (let i = 0; i < 4; i++) {
			const near = pos.add(neighbors[i]);
			if (this.props.grid.isInBounds(near) && this.props.grid.get(near)) continue;
			const x1 = 100 * (pos.x + diagonals[i].x / 2) + 56;
			const y1 = 100 * (pos.y + diagonals[i].y / 2) + 56;
			const other = diagonals[(i + 3) % 4];
			const x2 = 100 * (pos.x + other.x / 2) + 56;
			const y2 = 100 * (pos.y + other.y / 2) + 56;
			lines.push(<line {...{ x1, x2, y1, y2 }} stroke="#4650a0" strokeWidth="4" />);
		}
		if (lines.length === 0) return null;
		return <Fragment>{lines}</Fragment>;
	}

	render() {
		return <svg width={512} height={512}>{
			this.props.grid.map((_, pos) => this.drawCell(pos))
		}</svg>;
	}
}
