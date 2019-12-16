import React, { Component } from "react";
import { generate } from "../scripts/generator";
import { Grid } from "../scripts/grid";

import PatternFill from "./PatternFill";
import PatternRaw from "./PatternRaw";

const size = 5;

export default class App extends Component<{}, { grid: Grid<boolean>, filled: boolean }> {

	constructor(props: App['props'], context: any) {
		super(props, context);
		this.state = { grid: generate(size), filled: true };
	}

	render() {
		return <div id="app">
			{this.state.filled ? <PatternFill grid={this.state.grid} /> : <PatternRaw grid={this.state.grid} />}
			<div id="options">
				<button onClick={() => this.setState({ grid: generate(size) })}>Generate new</button>
				<div>
					<label>Filled</label>
					<input
						type="checkbox"
						defaultChecked={this.state.filled}
						onChange={(e) => this.setState({ filled: e.target.checked })}
					/>
				</div>
			</div>
		</div>;
	}
}
