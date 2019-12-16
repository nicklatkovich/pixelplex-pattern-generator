import React, { Component } from "react";
import { Grid } from "../scripts/grid";

export default class PatternFill extends Component<{ grid: Grid<boolean> }> {
	render() {
		return <svg width={512} height={512}>{
			this.props.grid.map((filled, pos) => !filled ? null : <rect
				x={6 + (100 * pos.x)}
				y={6 + (100 * pos.y)}
				width={100}
				height={100}
				fill="#4650a0"
			/>)
		}</svg>;
	}
}
