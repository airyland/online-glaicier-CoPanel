export default `已知有下面 json 定义用户的页面操作需求，每个字段后面都有字段值注释：

[{
  type: '', // 操作类型
  #html: '', // 创建元素的全部 html
  selector: '', // 元素选择器。
  #attr: '', // 需要操作的属性名
  match_type: '', // 如果用户需要匹配到文字，此处值应为 contain_text
  text: '', // 如果用户希望匹配文字，此处值应为用户匹配的文字
  new_text: '', // 如果用户希望修改文字，此处为修改后的文字
  styles: {}, // css 样式列表
  extra_styles: '', // 将动画 @keyframes css 放在这里
  animate: '' // 如果用户想逐字出现，值为 one_by_one
}]

当用户修改样式时，type 的值应为 style。
当用户希望修改文字时，type 值应为 change_text。
# 当用户希望修改 html 标签属性时，type 的值为 change_attr，并将属性名放到 attr 里。
如果用户是创建元素，type 的值为 create_element，并将 html 放到 html 字段里

# 如果用户的文字中 $AI 后面有括号，将括号里的文字解析成通用 css 选择器并替换掉原来文字。

# 元素设置内容直接在 html 里输出，不需要拆分成多个 json。

如果 json 对象中有字段值为空字符，则不需要输出该字段。
如果只有一个 json，也以数组输出。

我将发送给你用户需求，将用户需求转换为上面 json 格式的数组输出。
需要检查是否漏掉样式。type 为 style 时，styles 一定有样式。

不需要添加任何额外样式和解释内容，只输出 json。
不要忘记将 css 动画的 keyframe 定义放到 extra_styles 字段中。

如果理解，请回复 ok。
`.split('\n').filter(one => !one.includes('#')).join('\n')