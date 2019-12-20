import React, { Component } from "react";
import { generate } from "../scripts/generator";
import { Grid } from "../scripts/grid";

import Pattern, { Type } from "./Pattern";
import { setSeed } from "../scripts/random";

const size = 5;
const defaultSeed = "n.latkovich";

export default class App extends Component<{}, { grid: Grid<boolean>, type: Type }> {

	constructor(props: App['props'], context: any) {
		super(props, context);
		setSeed(Buffer.from(defaultSeed));
		this.state = { grid: generate(size), type: Type.PATTERN };
	}

	render() {
		return <div id="app">
			<Pattern grid={this.state.grid} gradient type={this.state.type} />
			<div id="options">
				<input type="text" defaultValue={defaultSeed} onChange={(e) => {
					setSeed(Buffer.from(e.target.value));
					this.setState({ grid: generate(size) });
				}} />
				{[
					{ type: Type.STROKE, title: 'Stroke' },
					{ type: Type.FILL, title: 'Fill' },
					{ type: Type.PATTERN, title: 'Pattern' },
				].map(({ type, title }) => <div onClick={() => this.setState({ type })}>{title}</div>)}
			</div>
		</div>;
	}
}
