import { randomBytes } from "crypto";
import React, { Component } from "react";
import { names } from "../scripts/names";
import { rand, setSeed } from "../scripts/random";
import { Grid } from "../scripts/grid";
import { generate } from "../scripts/generator";
import Logo from "../images/logo.svg";
import TagLine from "../images/tagline.svg";
import Pattern, { Type } from "./Pattern";

export default class SlideShow extends Component<{}, { nameIndex: number, grid: Grid<boolean> }> {
	constructor(props: SlideShow['props'], context: any) {
		super(props, context);
		setSeed(randomBytes(32));
		const nameIndex = rand(names.length);
		setSeed(Buffer.from(names[nameIndex]));
		this.state = { nameIndex, grid: generate() };
		setInterval(() => this.regenerate(), 2e3);
	}

	regenerate() {
		setSeed(randomBytes(32));
		const nameIndex = (this.state.nameIndex + rand(names.length - 1)) % names.length;
		setSeed(Buffer.from(names[nameIndex]));
		this.setState({ nameIndex, grid: generate() });
	}

	render() {
		return <div id="slideshow">
			<Pattern grid={this.state.grid} gradient type={Type.PATTERN} />
			<img src={Logo} id="logo" alt="" />
			<img src={TagLine} id="tagline" alt="" />
			<div id="name">{names[this.state.nameIndex]}</div>
		</div>;
	}
}
