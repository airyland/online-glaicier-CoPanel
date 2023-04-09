// keyframe 定义
// 定义一个函数，接收一个 JSON 定义，并将样式应用到页面中
export default function(styles) {
	console.log('render', JSON.stringify(styles, null, 2))
	// 遍历 JSON 中的每一个样式定义
	styles.forEach(function(style) {
		let selector = style.selector
		try {
			// 根据选择器查找元素
			let isFirstChild = false
			if (style.selector && (style.selector.includes(':first-child') || style.selector.includes(':first-of-type'))) {
				isFirstChild = true
				selector = style.selector.replace(':first-child', '').replace(':first-of-type', '')
			}

			let elements = []

			if ((style.type === 'change_text' && !selector) || (selector && selector.includes('contains')) || (style.match_type && style.match_type === 'contain_text')) {
				// 获取所有元素
				var allElements = document.getElementsByTagName('*')
				// 遍历所有元素
				for (var i = 0; i < allElements.length; i++) {
					// 如果元素的textContent或innerText是 "About"，则打印出该元素
					if (allElements[i].textContent === style.text || allElements[i].innerText === style.text) {
						elements = [ allElements[i] ]
					}
				}
			} else {
				elements = document.querySelectorAll(selector)
				if (isFirstChild && elements.length) {
					elements = [ elements[0] ]
				}
			}
			// 遍历匹配到的每一个元素
			elements.forEach(function(element) {
				// console.log('element', element)
				// 如果需要修改文字，将文字替换为新的文字
				if (style.type === 'change_text') {
					if (selector && (selector.includes('input') || selector.includes('textarea'))) {
						if (style.animate === 'one_by_one') {
							element.value = ''
							const text = style.new_text.split('')
							// console.log('new text split', text)
							let i = 0
							while (i <= text.length - 1) {
								let j = i * 100
								// console.log(j, text[i], i)
								const t = text[i]
								setTimeout(() => {
									// console.log('current value', element.value)
									element.value = (element.value || '') + (t || '')
									// console.log('element.value', element.value)
								}, j)
								i++
							}
						} else {
							// console.log('not one by one')
							element.value = style.new_text
						}
					} else {
						element.textContent = element.textContent.replace(style.text, style.new_text)
					}
				} else if (style.type === 'change_attr' && style.attr && style.new_text) {
					// 如果需要修改属性，将属性的值替换为新的值
					console.log(element, style.attr, style.new_text)
					element.setAttribute(style.attr, style.new_text)
					if (style.attr === 'src') {
						element.setAttribute('srcset', '') // to avoid conflict
					}
				}
				// 设置样式
				for (var key in style.styles) {
					element.style[key] = style.styles[key]
				}

				// 添加动画定义
				if (style.extra_styles) {
					var styleElement = document.createElement('style')
					styleElement.textContent = style.extra_styles
					document.head.appendChild(styleElement)
				}
			})
		} catch (e) {
			console.log('render error', e)
		}
	})
}
