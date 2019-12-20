import React, { Component, Fragment } from "react";
import { diagonals, neighbors } from "../scripts/generator";
import { Grid } from "../scripts/grid";

export enum Type { STROKE, FILL, PATTERN };

export default class Pattern extends Component<{ type: Type, gradient: boolean, grid: Grid<boolean> }> {
	renderStroke() {
		return this.props.grid.map((_, pos) => {
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
		});
	}

	get fillDefs() {
		return <Fragment>
			<linearGradient id="gradient" x1="0.01171875" y1="0.98828125" x2="0.98828125" y2="0.01171875">
				<stop offset="0%" stopColor="#4b529c" />
				<stop offset="100%" stopColor="#88c5b3" />
			</linearGradient>
			<mask id="mask">
				{
					this.props.grid.map((filled, pos) => !filled ? null : <rect
						x={6 + (100 * pos.x)}
						y={6 + (100 * pos.y)}
						width={100}
						height={100}
						fill="#fff"
					/>)
				}
			</mask>
		</Fragment>
	}

	renderFill() {
		return <Fragment>
			<defs>{this.fillDefs}</defs>
			<rect fill="url(#gradient)" x="0" y="0" width="512" height="512" mask="url(#mask)" />
		</Fragment>;
	}

	renderPattern() {
		return <Fragment>
			<defs>
				<pattern id="line" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(-45 2 2)">
					<path d="M -1,2 l 20,0" stroke="#fff" stroke-width="4" />
					{/* <line x1="0" y1="10" x2="10" y2="0" color="#fff" width="2" /> */}
				</pattern>
				{this.fillDefs}
				<mask id="pattern-mask" x="0" y="0" width="1" height="1">
					<rect x="0" y="0" width="512" height="512" fill="url(#line)" mask="url(#mask)" />
				</mask>
			</defs>
			<rect fill="url(#gradient)" x="0" y="0" width="512" height="512" mask="url(#pattern-mask)" />
			{/* <rect fill="red" x="0" y="0" width="512" height="512" /> */}
		</Fragment>;
	}

	renderInner() {
		switch (this.props.type) {
			case Type.STROKE: return this.renderStroke();
			case Type.FILL: return this.renderFill();
			case Type.PATTERN: return this.renderPattern();
			default: return null;
		}
	}

	render() {
		return <svg width={512} height={512}>{this.renderInner()}</svg>;
	}
}
