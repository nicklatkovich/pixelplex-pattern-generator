import React, { Component, Fragment } from "react";
import { generate } from "../scripts/generator";
import { Grid } from "../scripts/grid";
import { setSeed } from "../scripts/random";
import Pattern, { Type } from "./Pattern";

const defaultSeed = "n.latkovich";

export default class Main extends Component<{ toSlideShow: () => any }, { grid: Grid<boolean>, type: Type }> {
	constructor(props: Main['props'], context: any) {
		super(props, context);
		setSeed(Buffer.from(defaultSeed));
		this.state = { grid: generate(), type: Type.PATTERN };
	}

	render() {
		return <Fragment>
			<Pattern grid={this.state.grid} gradient type={this.state.type} />
			<div id="options">
				<input type="text" defaultValue={defaultSeed} onChange={(e) => {
					setSeed(Buffer.from(e.target.value));
					this.setState({ grid: generate() });
				}} />
				{[
					{ type: Type.STROKE, title: 'Stroke' },
					{ type: Type.FILL, title: 'Fill' },
					{ type: Type.PATTERN, title: 'Pattern' },
				].map(({ type, title }) => <div onClick={() => this.setState({ type })}>{title}</div>)}
				<div onClick={() => this.props.toSlideShow()}>SlideShow</div>
			</div>
		</Fragment>;
	}
}
