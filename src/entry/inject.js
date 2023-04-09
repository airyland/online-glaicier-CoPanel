import { createApp } from 'vue'
import Widget from '../view/CoPanel'
import Web from '../view/WebWidget'

console.log('web', Web)

const app = createApp(Widget)

const widget = createApp(Web)
console.log('widget', widget)

app.config.errorHandler = (err) => {
	console.error('copanel error:', err)
}

widget.config.errorHandler = (err) => {
	console.error('widget error:', err)
}

const div = document.createElement('div')
div.id = 'copanel-widget'
document.body.appendChild(div)
widget.mount('#copanel-widget')


// document.addEventListener("selectionchange", () => {
//   console.log('selected');
// 	if (document.getSelection()) {
// 		console.log(document.getSelection().toString())
// 	}
// })

// const div2 = document.createElement('div')
// div2.id = 'copanel-widget-2'
// document.body.appendChild(div2)
// app.mount('#copanel-widget-2')

// var myScript = "console.log('Hello, world!');";
// var scriptElement = document.createElement('script');
// scriptElement.textContent = myScript;
// document.head.appendChild(scriptElement);

// var scriptText = "console.log('Hello, world!');";
// var blob = new Blob([scriptText], {type: 'application/javascript'});
// var url = URL.createObjectURL(blob);
// var url = 'https://analytics.0xecho.com/js/plausible.js'

// var scriptElement = document.createElement('script');
// scriptElement.src = url;

// document.head.appendChild(scriptElement);

// const list = [
//   {"element":"html","style":{"backgroundColor":"red"}},
//   {"element":"input","style":{"display":"none"}},
//   {"element":"*:has(:contains('About'))","style":{"color":"white"}}
// ]

// const list = [
//   {"element":"html","style":{"backgroundColor":"red"}},
//   {"element":"input","style":{"display":"none"}},
//   {"element":"body","text":"About","style":{"color":"white"}}
// ]

// // [
// //   {"element":"html","style":{"backgroundColor":"red"}},
// //   {"element":"input","style":{"backgroundColor":"green"}}
// // ]

// console.log('style list', list)

// // for (const one of list) {
// //   if (one.element === 'html') {
// //     for (let i in one.style) {
// //       console.log('el', document.documentElement)
// //       document.body.style[i] = one.style[i]
// //     }
// //   } else {
// //     const $el = document.querySelectorAll(one.element)
// //     console.log('el 2', $el)
// //     for (let i = 0; i < $el.length; i++) {
// //       for (let s in one.style) {
// //         console.log($el[i], s, one.style[s])
// //         $el[i].style[s] = one.style[s]
// //       }
// //     }
// //   }
// // }
// // 09.24

// const operations = [
//   {
//     "type": "style",
//     "selector": "body",
//     "property": "background-color",
//     "value": "red"
//   },
//   {
//     "type": "style",
//     "selector": "input",
//     "property": "display",
//     "value": "none"
//   },
//   {
//     "type": "style",
//     "selector": "a:contains('About')",
//     "property": "color",
//     "value": "white"
//   },
//   {
//     "type": "click",
//     "selector": "body",
//     "trigger": "popup",
//     "params": {
//       "message": "hello world"
//     }
//   },
//   {
//     "type": "style",
//     "selector": "img:first-of-type",
//     "property": "animation",
//     "value": "spin 2s linear infinite"
//   },
//   {
//     "type": "text",
//     "selector": "a:contains('Home')",
//     "text": "Home edited"
//   }
// ];

// operations.forEach(operation => {
//   switch (operation.type) {
//     case 'style': {
//       const elements = document.querySelectorAll(operation.selector);
//       elements.forEach(element => {
//         element.style[operation.property] = operation.value;
//       });
//       break;
//     }
//     case 'click': {
//       const target = document.querySelector(operation.selector);
//       target.addEventListener('click', () => {
//         alert(operation.params.message);
//       });
//       break;
//     }
//     case 'text': {
//       const targetText = document.querySelector(operation.selector);
//       targetText.textContent = operation.text;
//       break;
//     }
//   }
// });

// 08 09:53
{
	// 解析并应用样式
	// var json = [
	//   {
	//     "type": "style",
	//     "selector": "body",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "",
	//     "styles": {
	//       "background-color": "red"
	//     }
	//   },
	//   {
	//     "type": "style",
	//     "selector": "input",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "",
	//     "styles": {
	//       "display": "none"
	//     }
	//   },
	//   {
	//     "type": "style",
	//     "selector": "a:contains('About')",
	//     "attr": "",
	//     "match_type": "contain_text",
	//     "text": "About",
	//     "new_text": "",
	//     "styles": {
	//       "color": "white"
	//     }
	//   },
	//   {
	//     "type": "style",
	//     "selector": "a:contains('Home')",
	//     "attr": "",
	//     "match_type": "contain_text",
	//     "text": "Home",
	//     "new_text": "Home edited",
	//     "styles": {}
	//   },
	//   {
	//     "type": "style",
	//     "selector": "img:first-child",
	//     "attr": "src",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "https://a.b/c.jpg",
	//     "styles": {}
	//   },
	//   {
	//     "type": "style",
	//     "selector": "img:first-child",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "",
	//     "styles": {
	//       "animation": "spin 2s linear infinite"
	//     }
	//   }
	// ];
	// applyStylesFromJson(json);
}

// keyframe 定义
// 定义一个函数，接收一个 JSON 定义，并将样式应用到页面中
// function applyStyles2(styles) {
// 	// 遍历 JSON 中的每一个样式定义
// 	styles.forEach(function(style) {
// 		try {
// 			// 根据选择器查找元素

// 			let isFirstChild = false
// 			if (style.selector.includes(':first-child') || style.selector.includes(':first-of-type')) {
// 				isFirstChild = true
// 				style.selector = style.selector.replace(':first-child', '').replace(':first-of-type', '')
// 			}
// 			var elements = document.querySelectorAll(style.selector)
// 			if (isFirstChild && elements.length) {
// 				elements = [ elements[0] ]
// 			}

// 			// 遍历匹配到的每一个元素
// 			elements.forEach(function(element) {
// 				// console.log('element', element)
// 				// 如果需要修改文字，将文字替换为新的文字
// 				if (style.type === 'change_text') {
// 					if (style.selector === 'input' || style.selector === 'textarea') {
// 						if (style.animate === 'one_by_one') {
// 							element.value = ''
// 							const text = style.new_text.split('')
// 							// console.log('new text split', text)
// 							let i = 0
// 							while (i <= text.length - 1) {
// 								let j = i * 100
// 								// console.log(j, text[i], i)
// 								const t = text[i]
// 								setTimeout(() => {
// 									// console.log('current value', element.value)
// 									element.value = (element.value || '') + (t || '')
// 									// console.log('element.value', element.value)
// 								}, j)
// 								i++
// 							}
// 						} else {
// 							// console.log('not one by one')
// 							element.value = style.new_text
// 						}
// 					} else {
// 						element.textContent = element.textContent.replace(style.text, style.new_text)
// 					}
// 				} else if (style.type === 'change_attr' && style.attr && style.new_text) {
// 					// 如果需要修改属性，将属性的值替换为新的值
// 					element.setAttribute(style.attr, style.new_text)
// 				}

// 				// 设置样式
// 				for (var key in style.styles) {
// 					element.style[key] = style.styles[key]
// 				}

// 				// 添加动画定义
// 				if (style.extra_styles) {
// 					var styleElement = document.createElement('style')
// 					styleElement.textContent = style.extra_styles
// 					document.head.appendChild(styleElement)
// 				}
// 			})
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	})
// }
{
	// applyStyles2([
	// 	{
	// 		type: 'style',
	// 		selector: 'body',
	// 		styles: {
	// 			'background-color': '#FFFF00'
	// 		}
	// 	},
	// 	{
	// 		type: 'style',
	// 		selector: 'img:first-of-type',
	// 		styles: {
	// 			animation: 'spin 2s linear infinite',
	// 			content: 'url(https://abs.twimg.com/icons/apple-touch-icon-192x192.png)'
	// 		},
	// 		extra_styles: '@keyframes spin { 100% { transform: rotate(360deg); } }'
	// 	},
	// 	{
	// 		type: 'change_text',
	// 		selector: 'input:first-of-type',
	// 		match_type: 'contain_text',
	// 		text: '',
	// 		new_text: "LET'S AI HACK！",
	// 		animate: 'one_by_one'
	// 	}
	// ])
	// 调用 applyStyles 函数，并将上面的 JSON 定义作为参数传递
	// applyStyles2([
	//   {
	//     "type": "style",
	//     "selector": "body",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "",
	//     "styles": {
	//       "background-color": "#FFFF00" // '#FFC900' // "#FFC82D" /  // ffe411 是即刻最新的颜色
	//     }
	//   },
	//   {
	//     "type": "style",
	//     "selector": "a:contains('About')",
	//     "attr": "",
	//     "match_type": "contain_text",
	//     "text": "About",
	//     "new_text": "",
	//     "styles": {
	//       "color": "white"
	//     }
	//   },
	//   {
	//     "type": "style",
	//     "selector": "a:contains('Home')",
	//     "attr": "",
	//     "match_type": "contain_text",
	//     "text": "Home",
	//     "new_text": "Home edited",
	//     "styles": {}
	//   },
	//   {
	//     "type": "style",
	//     "selector": "img:first-child",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "",
	//     "styles": {
	//       "animation": "spin 2s linear infinite"
	//     },
	//     "extra_styles": "@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}"
	//   },
	//   {
	//     "type": "style",
	//     "selector": "img:first-child",
	//     "attr": "src",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "https://jike.com/assets/images/logo.svg",
	//     "styles": {}
	//   },
	//   {
	//     "type": "change_text",
	//     "selector": "input:first-child",
	//     "attr": "",
	//     "match_type": "",
	//     "text": "",
	//     "new_text": "LET'S AI HACK!",
	//     "styles": {},
	//     "animate": "one_by_one"
	//   }
	// ]);
}

// first-child 会选择到多个
