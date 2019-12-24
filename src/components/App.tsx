import React, { Component } from "react";

import Main from "./Main";
import SlideShow from "./SlideShow";

export default class App extends Component<{}, { slideshow: boolean }> {
	constructor(props: App['props'], context: any) {
		super(props, context);
		this.state = { slideshow: false }
	}
	render() {
		return <div id="app">
			{this.state.slideshow ? <SlideShow /> : <Main toSlideShow={() => this.setState({ slideshow: true })} />}
		</div>;
	}
}
