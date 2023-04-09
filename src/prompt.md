下面是一个不懂 js 编程用户的需求，将这个需求结构化成一个操作 json，如果是样式输出为 css 样式，
事件名保存到 event_type 。
如果用户想根据文字选择区域，element 设为 find_text, text 为用户的文字：
如果用户是对整个页面设置样式，element 设为 body
获取页面顶部元素，设置样式为背景红色;获取所有输入框，将它们隐藏；
文字"About"颜色改为白色;
点击页面，弹窗提示 hello world
将页面第一个图片变为自动旋转
将文字"Home"修改为"Home edited"

===============================================

忽略上面我说的，已知有下面 json 定义用户的页面操作需求，每个字段后面都有值注释：

[{
  type: '', // 操作类型。当用户希望修改文字时，此处值应为 change_text。当用户希望修改 html 属性时，type 的值为 change_attr，并将属性名放到 attr 里。如果用户是创建元素，type 的值为 create_element，并将 html 放到 html 字段里
  html: '', // 创建元素的全部 html
  selector: '', // 元素选择器。
  attr: '', // 需要操作的属性名
  match_type: '', // 如果用户需要匹配到文字，此处值应为 contain_text
  text: '', // 如果用户希望匹配文字，此处值应为用户匹配的文字
  new_text: '', // 如果用户希望修改文字，此处为修改后的文字
  styles: {}, // css 样式列表
  extra_styles: '', // 如果涉及到 css 动画，将动画 @keyframes css 放在这里
  animate: '' // 如果用户想逐字出现，值为 one_by_one
}]

如果用户的文字中 $AI 后面有括号，将括号里的文字解析成通用 css 选择器并替换掉原来文字。

元素设置内容直接在 html 里输出，不需要拆分成多个 json。
不要忘记将 css 动画的 keyframe 定义放到 extra_styles 字段中。
将用户需求转换为上面 json 格式的数组输出，不需要添加需求之外的额外样式：

创建一个区域，背景为黑色，顶部有个标题为 hello，标题下面创建一个区域，命名为区域1，
区域1的文字为 "hello world $AI('页面第一个输入框的值')"
将页面背景设为明黄色;
将页面第一个图片变为自动旋转，改成 twitter logo;
将页面第一个输入框的文字改为 "LET'S AI HACK！"，并逐字出现;


文字"About"颜色改为白色;
将文字"Home"修改为"Home edited"

将页面第一个图片地址改为即刻logo地址


