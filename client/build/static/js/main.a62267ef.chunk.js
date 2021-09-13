(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(20),o=n.n(s),i=n(12),c=n.n(i),h=n(13),u=n(8),l=n(9),b=n(11),d=n(10),p=n(7),j=(n(18),n(14)),g=n(6),v=n(34),m=n(2),f=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={board_length:0,x_name:"X",o_name:"O"},a.onXChange=a.onXChange.bind(Object(p.a)(a)),a.onOChange=a.onOChange.bind(Object(p.a)(a)),a.onLengthChange=a.onLengthChange.bind(Object(p.a)(a)),a}return Object(l.a)(n,[{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onNameXChange(this.state.x_name),this.props.onNameOChange(this.state.o_name),this.props.onLengthChange(this.state.board_length)}},{key:"onXChange",value:function(e){this.setState({x_name:e.target.value})}},{key:"onOChange",value:function(e){this.setState({o_name:e.target.value})}},{key:"onLengthChange",value:function(e){this.setState({board_length:e.target.value})}},{key:"render",value:function(){var e=this;return Object(m.jsx)(v.a,{children:Object(m.jsxs)(g.a,{onSubmit:function(t){return e.onSubmit(t)},children:[Object(m.jsxs)(g.a.Group,{children:[Object(m.jsx)(g.a.Label,{children:"Name of player 1 (plays X): "}),Object(m.jsx)(g.a.Control,{type:"text",placeholder:"X",onChange:this.onXChange})]}),Object(m.jsxs)(g.a.Group,{children:[Object(m.jsx)(g.a.Label,{children:"Name of player 2 (plays O): "}),Object(m.jsx)(g.a.Control,{type:"text",placeholder:"O",onChange:this.onOChange})]}),Object(m.jsxs)(g.a.Group,{children:[Object(m.jsx)(g.a.Label,{children:"Length of board: "}),Object(m.jsx)(g.a.Control,{type:"number",min:"5",onChange:this.onLengthChange})]}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{variant:"primary",type:"submit",children:"Submit"})]})})}}]),n}(r.a.Component),O=(n(32),n(21)),x=n.n(O);function y(e){return Object(m.jsx)("button",{position:e.position,style:e.style,className:"square",onClick:e.onClick,children:e.value})}var C=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={board_length:a.props.boardLength},a}return Object(l.a)(n,[{key:"renderSquare",value:function(e){var t=this,n={};if(this.props.winner)for(var a=1;a<=5;a++)e===this.props.winner[a]&&(n={backgroundColor:"cyan"});else this.props.historyPos===e&&(n={backgroundColor:"red"});return Object(m.jsx)(y,{position:e,style:n,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){for(var e=this.state.board_length,t=[],n=0;n<e;n++){for(var a=[],r=0;r<e;r++)a.push(Object(m.jsx)("span",{children:this.renderSquare(n*e+r)},n*e+r));t.push(Object(m.jsx)("div",{className:"board-row",children:a},n))}return Object(m.jsx)("div",{id:"board",children:t})}}]),n}(r.a.Component),k=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).updateServerBoard=function(){var e=Object(h.a)(c.a.mark((function e(t){var n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/game_room",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 2:if(200===(n=e.sent).status){e.next=5;break}throw Error("No proper response");case 5:return e.next=7,n.json();case 7:a=e.sent,console.log("Res Board: ",a.board),console.log("Init: ",a.init);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.destroyServerBoard=Object(h.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/game_room",{method:"DELETE",headers:{"Content-Type":"application/json"}});case 2:if(200===e.sent.status){e.next=5;break}throw Error("No proper response");case 5:console.log("Server board deleted");case 6:case"end":return e.stop()}}),e)}))),a.state={history:[{squares:Array(a.props.boardLength*a.props.boardLength).fill(null),move:-1}],board_length:a.props.boardLength,stepNumber:0,xIsNext:!0,endgame:!1},a.check_clicked=!1,a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.updateServerBoard(this.state.history.squares)}},{key:"componentWillUnmount",value:function(){this.destroyServerBoard()}},{key:"changeBtnColor",value:function(e,t){t.target.variant=e?"info":"light"}},{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();this.state.endgame||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.updateServerBoard(n),this.setState({history:t.concat([{squares:n,move:e}]),stepNumber:t.length,xIsNext:!this.state.xIsNext,endgame:!!N(n,e,this.state.board_length)}))}},{key:"jumpTo",value:function(e){e!==this.state.stepNumber&&this.setState({stepNumber:e,xIsNext:e%2===0,endgame:!1})}},{key:"btnMouseEnter",value:function(e,t){var n=this;this.check_clicked||this.jumpTo(e),this.changeBtnColor(!0,t);var a="#move"+e+" button";x()(a).on({click:function(){n.jumpTo(e),n.changeBtnColor(!1,t),n.check_clicked=!0},mouseleave:function(){n.changeBtnColor(!1,t),n.check_clicked||n.jumpTo(n.state.history.length-1)}})}},{key:"render",value:function(){var e,t=this,n=this.state.history,a=n[this.state.stepNumber],r=N(a.squares,a.move,this.state.board_length),s=-1,o=n.map((function(e,a){var r="";if(a){for(var o="",i=0;i<t.state.board_length*t.state.board_length;i++)if(n[a].squares[i]!==n[a-1].squares[i]){o=n[a].squares[i],s=i;break}r="Go to move #"+a+": Player "+o+" moved ("+Math.floor(s/t.state.board_length).toString()+", "+(s%t.state.board_length).toString()+")"}else r="Go to game start";return Object(m.jsxs)("div",{children:[Object(m.jsx)("li",{id:"move"+a,children:Object(m.jsx)(j.a,{variant:"outline-success",onMouseEnter:function(e){t.btnMouseEnter(a,e)},children:r})}),Object(m.jsx)("br",{})]},a)}));return e=r?"Winner: "+("X"===r[0]?this.props.xName:this.props.oName):"Next player: "+(this.state.xIsNext?this.props.xName+" (plays X)":this.props.oName+" (plays O)"),Object(m.jsx)(v.a,{children:Object(m.jsxs)("div",{className:"game",children:[Object(m.jsx)("div",{className:"game-board",children:Object(m.jsx)(C,{historyPos:this.state.history[this.state.stepNumber].move,winner:r,boardLength:this.state.board_length,squares:a.squares,onClick:function(e){return t.handleClick(e)}})}),Object(m.jsxs)("div",{className:"game-info",children:[Object(m.jsx)(g.a.Label,{children:e}),Object(m.jsx)("ol",{children:o})]})]})})}}]),n}(r.a.Component);function N(e,t,n){var a=e[t];if(null==a)return null;for(var r=[Math.floor(t/n),t%n],s=r[0],o=r[1],i=[[-1,0],[-1,1],[0,1],[1,1]],c=0;c<i.length;c++){var h=[a,t],u=1,l=void 0;for(l=1;l<=5;l++){var b=s+i[c][0]*l,d=o+i[c][1]*l;if(!(b<0||b>n||d<0||d>n)){if(e[b*n+d]!==a)break;u++,h.push(b*n+d)}}var p=void 0;for(p=-1;p>=-5;p--){var j=s+i[c][0]*p,g=o+i[c][1]*p;if(!(j<0||j>n||g<0||g>n)){if(e[j*n+g]!==a)break;u++,h.push(j*n+g)}}if(u>=5)return h}return null}var _=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).state={board_length:0,x_player:"X",o_player:"O"},a.onLengthChange=a.onLengthChange.bind(Object(p.a)(a)),a.onNameXChange=a.onNameXChange.bind(Object(p.a)(a)),a.onNameOChange=a.onNameOChange.bind(Object(p.a)(a)),a}return Object(l.a)(n,[{key:"onLengthChange",value:function(e){e<5||this.setState({board_length:e})}},{key:"onNameXChange",value:function(e){this.setState({x_player:e})}},{key:"onNameOChange",value:function(e){this.setState({o_player:e})}},{key:"render",value:function(){return 0===this.state.board_length?Object(m.jsx)(f,{onLengthChange:this.onLengthChange,onNameXChange:this.onNameXChange,onNameOChange:this.onNameOChange}):Object(m.jsx)(k,{boardLength:this.state.board_length,xName:this.state.x_player,oName:this.state.o_player})}}]),n}(r.a.Component),S=function(e){Object(b.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).callBackendAPI=Object(h.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/express_backend");case 2:return t=e.sent,e.next=5,t.json();case 5:if(n=e.sent,200===t.status){e.next=8;break}throw Error("Error");case 8:return e.abrupt("return",n);case 9:case"end":return e.stop()}}),e)}))),a.state={isOK:!1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.callBackendAPI().then((function(t){return e.setState({isOK:t.check_status})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return this.state.isOK?Object(m.jsx)(_,{}):Object(m.jsx)("h1",{children:"Error occurred, try again!"})}}]),n}(a.Component);o.a.render(Object(m.jsx)(S,{}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.a62267ef.chunk.js.map