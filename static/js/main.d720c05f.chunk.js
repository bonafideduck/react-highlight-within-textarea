/*! For license information please see main.d720c05f.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-highlight-within-textarea-example"]=this["webpackJsonpreact-highlight-within-textarea-example"]||[]).push([[0],{15:function(e,t,n){e.exports=n(26)},21:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),i=n.n(o),l=(n(20),n(21),n(6)),s=n(11),c=n(9),u=n(10),h=n(8),f=n(12);n(25);var p=[["String","Note that this is case-insensitive.","Potato potato tomato potato.","'potato'","potato"],["RegExp",a.a.createElement("span",null,"Don't forget the ",a.a.createElement("code",null,"g")," (find all) and ",a.a.createElement("code",null,"i")," (case-insensitive) flags if you need them."),"Dog, cat, chicken, goose. Dogs, cats, chickens, geese.","/dogs?|cats?|g(oo|ee)se/gi",/dogs?|cats?|g(oo|ee)se/gi],["Array of Two Numbers (Range)","An array of exactly two numbers is treated as a range. Highlighting starts at the first character index (inclusive) and ends at the second character index (exclusive).","abcdefgh","[2, 6]",[2,6]],["Array of Other Things","You can highlight multiple things, using any types mentioned here, with an array.","apple watermelon banana orange mango","[\n    'orange',\n    /ba(na)*/gi,\n    [0, 5]\n  ]",["orange",/ba(na)*/gi,[0,5]]],["Function",a.a.createElement("span",null,"You can use a function for custom logic. It can return any of the types mentioned here. Return anything falsey (",a.a.createElement("code",null,"false"),", ",a.a.createElement("code",null,"undefined"),", etc.) to indicate no highlighting. The current textarea input is provided to it for convenience."),"Sun Mon Tue Wed Thu Fri Sat :) <-- remove the smiley...","function getSmileyDayString(input) {\n    const dayStrings = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];\n    if (input.indexOf(':)') !== -1) {\n        let dayIndex = (new Date()).getDay();\n        return dayStrings[dayIndex];\n    } else {\n        // no smiley, no highlighting\n        return false;\n    }\n  }",function(e){return-1!==e.indexOf(":)")&&["sun","mon","tue","wed","thu","fri","sat"][(new Date).getDay()]}],["Custom Object with Class Name",a.a.createElement("span",null,"Any type mentioned here can be put in an object wrapper with ",a.a.createElement("code",null,"highlight")," and ",a.a.createElement("code",null,"className")," properties. This lets you set CSS classes in the highlight markup for custom styling, such as changing the highlight color."),"Here's a blueberry. There's a strawberry. Surprise, it's a banananana!","[\n    {\n      highlight: 'strawberry',\n      className: 'red'\n    },\n    {\n      highlight: 'blueberry',\n      className: 'blue'\n    },\n    {\n      highlight: /ba(na)*/gi,\n      className: 'yellow'\n    }\n  ]",[{highlight:"strawberry",className:"red"},{highlight:"blueberry",className:"blue"},{highlight:/ba(na)*/gi,className:"yellow"}]],["Custom Object with Enhancements (coming soon)",a.a.createElement("span",null,"The div behind the highlighted span can be wrapped in an enhancement. This React view receives properties, ",a.a.createElement("code",null,"data")," which contains information about the particular span and ",a.a.createElement("code",null,"MarkView")," which is the highlight that contains the text.  If there are multiple enhancements, they will wrap around each other.  Also note that a single highlight may be broken into two MarkViews if it overlaps two highlights.  This effect can be seen below with the two pairs of indexes."),"Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.\nBut the blues go away after a newline is forced.",'[\n    {\n      highlight: \'blue\',\n      enhancement: MultiColor,\n      className: \'blue\',\n    },\n    {\n      highlight: /[^ ]*berry/gi,\n      enhancement: ToolTip,\n      className: \'yellow\',\n    },\n  ]\n  \n  function ToolTip(props) {\n    const content = (\n      <div style={{whiteSpace: "pre"}}>\n        {JSON.stringify(props.data, 0, 1)}\n      </div>\n    )\n    const overlayStyle = {\n      position: "absolute",\n      height: "50%",\n      width: "100%",\n      background: "transparent",\n      zIndex: 1,\n    }\n  \n    return (\n      <mark style={{position: "relative"}}>\n        <Tippy content={content} maxWidth="800px">\n          <mark style={overlayStyle}></mark>\n        </Tippy>\n        <props.MarkView />\n      </mark>\n    )\n  }\n  \n  function MultiColor(props) {\n    const [color, setColor] = useState(0xff8800);\n    const colorText = `#${color.toString(16)}`\n  \n    useEffect(() => {\n      const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)\n      return () => clearInterval(timer)\n    })\n    return <props.MarkView style={{backgroundColor: colorText}} />\n  }',[{highlight:"blue",enhancement:function(e){var t=Object(r.useState)(16746496),n=Object(l.a)(t,2),o=n[0],i=n[1],s="#".concat(o.toString(16));return Object(r.useEffect)(()=>{var e=setInterval(()=>i(8421504|(o+528408)%16777215),200);return()=>clearInterval(e)}),a.a.createElement(e.MarkView,{style:{backgroundColor:s}})},className:"blue"},{highlight:/[^ ]*berry/gi,enhancement:function(e){var t=a.a.createElement("div",{style:{whiteSpace:"pre"}},JSON.stringify(e.data,0,1));return a.a.createElement("mark",{style:{position:"relative"}},a.a.createElement(f.a,{content:t,maxWidth:"800px"},a.a.createElement("mark",{style:{position:"absolute",height:"50%",width:"100%",background:"transparent",zIndex:1}})),a.a.createElement(e.MarkView,null))},className:"yellow"}]]],m=({title:e,text:t,initialValue:n,highlightText:o,highlight:i})=>{var s=Object(r.useState)(n),f=Object(l.a)(s,2),p=f[0],m=f[1];return a.a.createElement(c.a,null,a.a.createElement(u.a,null,a.a.createElement("h2",null,e),a.a.createElement("p",null,t),a.a.createElement(h.HighlightWithinTextarea,{value:p,highlight:i,onChange:e=>m(e.target.value),rows:"4",containerStyle:{width:"100%"},style:{width:"100%"}}),a.a.createElement("pre",null,"function Demo() ","{",a.a.createElement("br",null),"  ","const highlight = ",(e=>{var t=e.split("\n"),n=[];for(var r in t)n.push(a.a.createElement("span",{key:r},t[r])),n.push(a.a.createElement("br",{key:"b"+r}));return n.pop(),n})(o),";",a.a.createElement("br",null),a.a.createElement("br",null),"  ","return <HighlightWithinTextarea highlight={highlight} />;",a.a.createElement("br",null),"}")))},y=()=>a.a.createElement(s.a,{style:{maxWidth:800,border:20,margin:"auto"}},p.map(e=>a.a.createElement(m,{key:e[0],title:e[0],text:e[1],initialValue:e[2],highlightText:e[3],highlight:e[4]})));i.a.render(a.a.createElement(y,null),document.getElementById("root"))},8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(22);function a(e){return e&&"object"===typeof e&&"default"in e?e:{default:e}}var o=a(r);function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(s){a=!0,o=s}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=y(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw o}}}}var b="styles_container__2Myr5",v="styles_backdrop__2g-i9",w="styles_highlights__3FFG4",x="styles_input__rITaq",S="styles_content__2fBD2",O="styles_enhanced__3GB3b";function k(e,t){switch(function(e){var t=i(e);if(!e)return"falsey";if(Array.isArray(e))return 2===e.length&&"number"===typeof e[0]&&"number"===typeof e[1]?"range":"array";if("object"===t){if(e instanceof RegExp)return"regexp";if(e.hasOwnProperty("highlight"))return"custom"}else if("function"===t||"string"===t)return t;return"other"}(t)){case"array":return function(e,t){var n=t.map(k.bind(this,e));return Array.prototype.concat.apply([],n)}(e,t);case"function":return function(e,t){return k(e,t(e))}(e,t);case"regexp":return function(e,t){var n,r=[];for(;null!==(n=t.exec(e))&&(r.push([n.index,n.index+n[0].length]),t.global););return r}(e,t);case"string":return function(e,t){var n=[],r=e.toLowerCase(),a=t.toLowerCase(),o=0;for(;-1!==(o=r.indexOf(a,o));)n.push([o,o+a.length]),o+=a.length;return n}(e,t);case"range":return[t];case"custom":return function(e,t){var n=k(e,t.highlight);(t.className||t.enhancement)&&n.forEach((function(e){t.className&&(e.className?e.className=t.className+" "+e.className:e.className=t.className),t.enhancement&&(e.enhancements?e.enhancements.unshift(t.enhancement):e.enhancements=[t.enhancement])}));return n}(e,t);default:if(!t)return[];console.error("unrecognized highlight type")}}!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".styles_container__2Myr5 {\n\tdisplay: inline-block;\n\tposition: relative;\n\toverflow: hidden !important;\n\t-webkit-text-size-adjust: none !important;\n}\n\n.styles_backdrop__2g-i9 {\n\tposition: absolute !important;\n\ttop: 0 !important;\n\tright: -99px !important;\n\tbottom: 0 !important;\n\tleft: 0 !important;\n\tpadding-right: 99px !important;\n\toverflow-x: hidden !important;\n\toverflow-y: auto !important;\n}\n\n.styles_highlights__3FFG4 {\n\twidth: auto !important;\n\theight: auto !important;\n\tborder-color: transparent !important;\n\twhite-space: pre-wrap !important;\n\tword-wrap: break-word !important;\n\tcolor: transparent !important;\n\toverflow: hidden !important;\n}\n\n.styles_input__rITaq {\n\tdisplay: block !important;\n\tposition: relative !important;\n\tmargin: 0;\n\tpadding: 0;\n\tborder-radius: 0;\n\tfont: inherit;\n\toverflow-x: hidden !important;\n\toverflow-y: auto !important;\n}\n\n.styles_content__2fBD2 {\n\tborder: 1px solid;\n\tbackground: none transparent !important;\n}\n\n.styles_content__2fBD2 mark {\n\tpadding: 0 !important;\n\tcolor: inherit;\n\tposition: relative;\n}\n\n.styles_content__2fBD2 .styles_enhanced__3GB3b {\n\tposition: absolute;\n\tleft: 0;\n\tright: 0;\n\ttop: 0;\n\tbottom: 0;\n\twidth: auto;\n\theight: auto;\n}\n");var E=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.beginIndex=n,this.endIndex=n+t.length,this.text=t,this.fullText=t,this.isMark=!1,this.ranges=[],this.markClasses=new Set,this.MarkView=this.MarkView.bind(this)}var t,n,r;return t=e,(n=[{key:"addRange",value:function(e){if(this.isMark=!0,e.className){var t,n=g(e.className.split(" "));try{for(n.s();!(t=n.n()).done;){var r=t.value;this.markClasses.add(r)}}catch(a){n.e(a)}finally{n.f()}}this.ranges.push(e)}},{key:"carve",value:function(t){var n=this.text.slice(t-this.beginIndex);this.text=this.text.slice(0,t-this.beginIndex),this.endIndex=t;var r=new e(n,t);return r.isMark=this.isMark,r.markClasses=new Set(m(this.markClasses)),r.ranges=m(this.ranges),r.fullText=this.fullText,r}},{key:"EnhancedMarkView",value:function(e){var t=this.ranges.filter((function(e){return e.enhancements}));if(0===t.length)return e;var n={className:O,text:this.text,fullText:this.fullText,beginIndex:this.beginIndex,endIndex:this.endIndex};function r(e,t,n,r){var a=h(h({},n),{},{rangeBeginIndex:t[0],rangeEndIndex:t[1]});return t.className&&(a.className=t.className),o.default.forwardRef((function(t,n){return o.default.createElement(e,c({},t,{data:a,MarkView:r}))}))}var a,i=g(t);try{for(i.s();!(a=i.n()).done;){var l,s=a.value,u=g(s.enhancements);try{for(u.s();!(l=u.n()).done;)e=r(l.value,s,n,e)}catch(f){u.e(f)}finally{u.f()}}}catch(f){i.e(f)}finally{i.f()}return e}},{key:"MarkView",value:function(e,t){return e=h({},e),this.className&&e.className?e.className="".concat(this.className," ").concat(e.className):this.className&&(e.className=this.className),o.default.createElement("mark",e,this.text)}},{key:"render",value:function(){if(this.isMark){var e=this.EnhancedMarkView(this.MarkView);return o.default.createElement(e,{key:this.beginIndex})}return o.default.createElement("span",{key:this.beginIndex},this.text)}},{key:"className",get:function(){return this.markClasses&&this.markClasses.size>0?m(this.markClasses).sort().join(" "):""}}])&&l(t.prototype,n),r&&l(t,r),e}();function j(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}((void 0===t||null===t)&&n.path)}},n.exports),n.exports}var _="function"===typeof Symbol&&Symbol.for,T=_?Symbol.for("react.element"):60103,N=_?Symbol.for("react.portal"):60106,C=_?Symbol.for("react.fragment"):60107,I=_?Symbol.for("react.strict_mode"):60108,P=_?Symbol.for("react.profiler"):60114,M=_?Symbol.for("react.provider"):60109,$=_?Symbol.for("react.context"):60110,A=_?Symbol.for("react.async_mode"):60111,R=_?Symbol.for("react.concurrent_mode"):60111,D=_?Symbol.for("react.forward_ref"):60112,F=_?Symbol.for("react.suspense"):60113,V=_?Symbol.for("react.suspense_list"):60120,B=_?Symbol.for("react.memo"):60115,W=_?Symbol.for("react.lazy"):60116,q=_?Symbol.for("react.block"):60121,z=_?Symbol.for("react.fundamental"):60117,L=_?Symbol.for("react.responder"):60118,H=_?Symbol.for("react.scope"):60119;function G(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case T:switch(e=e.type){case A:case R:case C:case P:case I:case F:return e;default:switch(e=e&&e.$$typeof){case $:case D:case W:case B:case M:return e;default:return t}}case N:return t}}}function J(e){return G(e)===R}var U={AsyncMode:A,ConcurrentMode:R,ContextConsumer:$,ContextProvider:M,Element:T,ForwardRef:D,Fragment:C,Lazy:W,Memo:B,Portal:N,Profiler:P,StrictMode:I,Suspense:F,isAsyncMode:function(e){return J(e)||G(e)===A},isConcurrentMode:J,isContextConsumer:function(e){return G(e)===$},isContextProvider:function(e){return G(e)===M},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===T},isForwardRef:function(e){return G(e)===D},isFragment:function(e){return G(e)===C},isLazy:function(e){return G(e)===W},isMemo:function(e){return G(e)===B},isPortal:function(e){return G(e)===N},isProfiler:function(e){return G(e)===P},isStrictMode:function(e){return G(e)===I},isSuspense:function(e){return G(e)===F},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===C||e===R||e===P||e===I||e===F||e===V||"object"===typeof e&&null!==e&&(e.$$typeof===W||e.$$typeof===B||e.$$typeof===M||e.$$typeof===$||e.$$typeof===D||e.$$typeof===z||e.$$typeof===L||e.$$typeof===H||e.$$typeof===q)},typeOf:G},Y=(j((function(e,t){0})),j((function(e){e.exports=U})),Object.getOwnPropertySymbols),K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;function X(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(a){return!1}})()&&Object.assign;var Z="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function ee(e,t,n,r,a){}ee.resetWarningCache=function(){0};Function.call.bind(Object.prototype.hasOwnProperty);function te(){}function ne(){}ne.resetWarningCache=te;var re=j((function(e){e.exports=function(){function e(e,t,n,r,a,o){if(o!==Z){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:ne,resetWarningCache:te};return n.PropTypes=n,n}()})),ae=function(e){var t=e.value,n=function(e,t){var n,r=[new E(e,0)],a=g(t);try{for(a.s();!(n=a.n()).done;)for(var o=n.value,i=o[0],l=o[1],s=0;s<r.length;s++){var c=r[s];if(i<c.endIndex)if(i===c.beginIndex)if(l<c.endIndex){var u=c.carve(l);c.addRange(o),r.splice(s+1,0,u),i=l,s+=1}else c.addRange(o),i=c.endIndex;else if(l<c.endIndex){var h=c.carve(i),f=h.carve(l);h.addRange(o),r.splice(s+1,0,h,f),i=l,s+=2}else{var p=c.carve(i);p.addRange(o),r.splice(s+1,0,p),i=p.endIndex,s+=1}if(i===l)break}}catch(m){a.e(m)}finally{a.f()}return r}(t,k(t,e.highlight));return o.default.createElement("div",null,o.default.createElement("div",{className:"".concat(w," ").concat(S)},n.map((function(e){return e.render()}))))};ae.propTypes={value:re.string.isRequired,highlight:re.any.isRequired};t.HighlightWithinTextarea=function(e){var t=e.value,n=e.onChange,a=e.highlight,i=void 0===a?{}:a,l=e.className,s=void 0===l?"":l,u=e.style,h=void 0===u?{}:u,m=e.containerStyle,y=void 0===m?{}:m,d=e.containerClassName,g=void 0===d?"":d,w=(e.onScroll,f(e,["value","onChange","highlight","className","style","containerStyle","containerClassName","onScroll"])),O=r.useRef(null),k=r.useRef(null);s="".concat(x," ").concat(S," ").concat(s),g="".concat(b," ").concat(g),h.resize="none";var E=p(r.useState("Please supply a value and an onChange parameter."),2),j=E[0],_=E[1];void 0==t&&(t=j,n=function(e){_(e.target.value)});var T=function(e){k.current.scrollTop=O.current.scrollTop,k.current.scrollLeft=O.current.scrollLeft},N=T;return o.default.createElement("div",{className:g,style:y,onScroll:N},o.default.createElement("div",{className:v,ref:k},o.default.createElement(ae,{value:t,highlight:i})),o.default.createElement("textarea",c({value:t,onChange:n,style:h,className:s},w,{onScroll:T,ref:O})))}}},[[15,1,2]]]);
//# sourceMappingURL=main.d720c05f.chunk.js.map