(this["webpackJsonppixelplex-pattern"]=this["webpackJsonppixelplex-pattern"]||[]).push([[0],{104:function(t,e){},106:function(t,e){},119:function(t,e){},13:function(t,e,n){"use strict";n.d(e,"b",(function(){return h})),n.d(e,"a",(function(){return f}));var r=n(35),i=n.n(r),a=n(91),u=n(16),o=n.n(u),s=new o.a(Object(a.randomBytes)(32).toString("hex"),16),l=0,c=new o.a(i()(s.toString(16)).toString("hex"),16);function h(t){s=new o.a(t.toString("hex"),16),l=0,c=new o.a(i()(s.toString(16)).toString("hex"),16)}function f(t){if(!Number.isSafeInteger(t))throw new Error("random base is not a safe integer");if(t<=0)throw new Error("random base is not positive");for(;c.lt(t);)l++,c=c.times(new o.a(2).pow(256)).plus(new o.a(i()(s.plus(l).toString(16)).toString("hex"),16));var e=c.mod(t).toNumber();return c=c.idiv(t),e}},14:function(t,e,n){"use strict";var r=n(92),i=n(12),a=n(8);function u(t){if(!Number.isSafeInteger(t))throw new Error("is not a safe integer");return t}function o(t){if((t=u(t))<=0)throw new Error("is not positive");return t}var s,l=function(){function t(e,n){Object(i.a)(this,t),this._x=void 0,this._y=void 0,this._x=u(e),this._y=u(n)}return Object(a.a)(t,[{key:"x",get:function(){return this._x}},{key:"y",get:function(){return this._y}}],[{key:"ZERO",get:function(){return new t(0,0)}}]),Object(a.a)(t,[{key:"add",value:function(e){return"number"===typeof e?this.add(new t(e,e)):new t(this.x+e.x,this.y+e.y)}},{key:"max",value:function(e){return new t(Math.max(this.x,e.x),Math.max(this.y,e.y))}},{key:"mul",value:function(e){return"number"===typeof e?this.mul(new t(e,e)):new t(this.x*e.x,this.y*e.y)}},{key:"eq",value:function(t){return this.x===t.x&&this.y===t.y}}]),t}(),c=function(){function t(e,n,r){var a=this;Object(i.a)(this,t),this._width=void 0,this._height=void 0,this._data=void 0,this._width=o(e),this._height=o(n),this._data=new Array(this.width).fill(null).map((function(t,e){return new Array(a.height).fill(null).map((function(t,n){return r(new l(e,n))}))}))}return Object(a.a)(t,[{key:"width",get:function(){return this._width}},{key:"height",get:function(){return this._height}},{key:"size",get:function(){return new l(this.width,this.height)}}]),Object(a.a)(t,[{key:"isInBounds",value:function(t){return t.x>=0&&t.x<this.width&&t.y>=0&&t.y<this.height}},{key:"onlyIfInBounds",value:function(t){if(!this.isInBounds(t))throw new Error("out of bounds")}},{key:"get",value:function(t){return this.onlyIfInBounds(t),this._data[t.x][t.y]}},{key:"set",value:function(t,e){return this.onlyIfInBounds(t),this._data[t.x][t.y]=e}},{key:"transform",value:function(e){var n=this;return new t(this.width,this.height,(function(t){return e(n.get(t),t,n)}))}},{key:"map",value:function(t){var e=this;return new Array(this.width*this.height).fill(null).map((function(n,r){var i=r%e.width,a=Math.floor(r/e.width),u=new l(i,a);return t(e.get(u),u,e)}))}}]),t}(),h=n(13);n.d(e,"c",(function(){return d})),n.d(e,"a",(function(){return g})),n.d(e,"b",(function(){return E})),function(t){t[t.EMPTY=0]="EMPTY",t[t.POTENTIAL=1]="POTENTIAL",t[t.FILLED=2]="FILLED",t[t.LOCKED=3]="LOCKED",t[t.DIAG=4]="DIAG"}(s||(s={}));var f=new l(0,0),d=[1,0,-1,0].map((function(t,e,n){return new l(t,n[(e+1)%4])})),y=Object(r.a)(d,4),m=y[0],p=(y[1],y[2],y[3]),g=[1,-1,-1,1].map((function(t,e,n){return new l(t,n[(e+1)%4])})),v=[[],[f],[f,m],[f,p],[f,m,p]];function E(t){for(var e=new c(t,t,(function(){return s.EMPTY})),n=new l(Object(h.a)(e.width),Object(h.a)(e.height)),r=0;r<4;r++){var i=Object(h.a)(v.length),a=v[i],u=g[r].max(f).mul(e.size.add(-1));console.log("pillar",u);var o=!0,y=!1,m=void 0;try{for(var p,E=a[Symbol.iterator]();!(o=(p=E.next()).done);o=!0){var w=p.value;console.log("cornerLock",w);var b=u.add(w.mul(g[(r+2)%4]));console.log("lockPos",b),e.set(b,s.LOCKED)}}catch(A){y=!0,m=A}finally{try{o||null==E.return||E.return()}finally{if(y)throw m}}}e.set(n,s.POTENTIAL);for(var k=[n];k.length>0;){var x=Object(h.a)(k.length),O=k[x],I=k.pop();if(x<k.length&&(k[x]=I),[s.POTENTIAL,s.DIAG].includes(e.get(O))){e.set(O,s.FILLED);for(var T=0;T<4;T++){var L=O.add(d[T]);if(e.isInBounds(L))switch(e.get(L)){case s.POTENTIAL:e.set(L,s.LOCKED);break;case s.DIAG:e.set(L,s.POTENTIAL);break;case s.EMPTY:e.set(L,s.POTENTIAL);for(var j=0;j<2;j++)k.push(L)}}for(var P=0;P<4;P++){var S=O.add(g[P]);e.isInBounds(S)&&e.get(S)===s.EMPTY&&(e.set(S,s.DIAG),k.push(S))}}}return e.transform((function(t){return t===s.FILLED}))}},143:function(t,e){},185:function(t,e,n){},19:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return f}));var r,i=n(12),a=n(8),u=n(33),o=n(32),s=n(34),l=n(2),c=n.n(l),h=n(14);!function(t){t[t.STROKE=0]="STROKE",t[t.FILL=1]="FILL",t[t.PATTERN=2]="PATTERN"}(r||(r={}));var f=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(o.a)(e).apply(this,arguments))}return Object(s.a)(e,t),Object(a.a)(e,[{key:"renderStroke",value:function(){var t=this;return this.props.grid.map((function(e,n){if(!t.props.grid.get(n))return null;for(var r=[],i=0;i<4;i++){var a=n.add(h.c[i]);if(!t.props.grid.isInBounds(a)||!t.props.grid.get(a)){var u=100*(n.x+h.a[i].x/2)+56,o=100*(n.y+h.a[i].y/2)+56,s=h.a[(i+3)%4],f=100*(n.x+s.x/2)+56,d=100*(n.y+s.y/2)+56;r.push(c.a.createElement("line",Object.assign({x1:u,x2:f,y1:o,y2:d},{stroke:"#4650a0",strokeWidth:"4"})))}}return 0===r.length?null:c.a.createElement(l.Fragment,null,r)}))}},{key:"renderFill",value:function(){return c.a.createElement(l.Fragment,null,c.a.createElement("defs",null,this.fillDefs),c.a.createElement("rect",{fill:"url(#gradient)",x:"0",y:"0",width:"512",height:"512",mask:"url(#mask)"}))}},{key:"renderPattern",value:function(){return c.a.createElement(l.Fragment,null,c.a.createElement("defs",null,c.a.createElement("pattern",{id:"line",patternUnits:"userSpaceOnUse",width:"10",height:"10",patternTransform:"rotate(-45 2 2)"},c.a.createElement("path",{d:"M -1,2 l 20,0",stroke:"#fff","stroke-width":"4"})),this.fillDefs,c.a.createElement("mask",{id:"pattern-mask",x:"0",y:"0",width:"1",height:"1"},c.a.createElement("rect",{x:"0",y:"0",width:"512",height:"512",fill:"url(#line)",mask:"url(#mask)"}))),c.a.createElement("rect",{fill:"url(#gradient)",x:"0",y:"0",width:"512",height:"512",mask:"url(#pattern-mask)"}))}},{key:"renderInner",value:function(){switch(this.props.type){case r.STROKE:return this.renderStroke();case r.FILL:return this.renderFill();case r.PATTERN:return this.renderPattern();default:return null}}},{key:"render",value:function(){return c.a.createElement("svg",{width:512,height:512},this.renderInner())}},{key:"fillDefs",get:function(){return c.a.createElement(l.Fragment,null,c.a.createElement("linearGradient",{id:"gradient",x1:"0.01171875",y1:"0.98828125",x2:"0.98828125",y2:"0.01171875"},c.a.createElement("stop",{offset:"0%",stopColor:"#4b529c"}),c.a.createElement("stop",{offset:"100%",stopColor:"#88c5b3"})),c.a.createElement("mask",{id:"mask"},this.props.grid.map((function(t,e){return t?c.a.createElement("rect",{x:6+100*e.x,y:6+100*e.y,width:100,height:100,fill:"#fff"}):null}))))}}]),e}(l.Component)},90:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return m}));var r=n(12),i=n(8),a=n(33),u=n(32),o=n(34),s=n(2),l=n.n(s),c=n(14),h=n(19),f=n(13),d=5,y="n.latkovich",m=function(e){function n(e,i){var o;return Object(r.a)(this,n),o=Object(a.a)(this,Object(u.a)(n).call(this,e,i)),Object(f.b)(t.from(y)),o.state={grid:Object(c.b)(d),type:h.a.PATTERN},o}return Object(o.a)(n,e),Object(i.a)(n,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{id:"app"},l.a.createElement(h.b,{grid:this.state.grid,gradient:!0,type:this.state.type}),l.a.createElement("div",{id:"options"},l.a.createElement("input",{type:"text",defaultValue:y,onChange:function(n){Object(f.b)(t.from(n.target.value)),e.setState({grid:Object(c.b)(d)})}}),[{type:h.a.STROKE,title:"Stroke"},{type:h.a.FILL,title:"Fill"},{type:h.a.PATTERN,title:"Pattern"}].map((function(t){var n=t.type,r=t.title;return l.a.createElement("div",{onClick:function(){return e.setState({type:n})}},r)}))))}}]),n}(s.Component)}).call(this,n(4).Buffer)},93:function(t,e,n){t.exports=n(94)},94:function(t,e,n){"use strict";n.r(e);var r=n(2),i=n.n(r),a=n(89),u=n.n(a),o=n(90);n(185);u.a.render(i.a.createElement(o.a,null),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.9f96c3e5.chunk.js.map