# CoPanel

## 关于嵌入形式

最理想的方式是可以原生嵌入在右侧，但 Chrome 暂未开放 Side Panel 插件自定义。
Arc 浏览暂未支持右侧 pin 一个网页。

所以我们会这样支持：
1. 嵌入在页面右侧，但可能影响布局和样式。
2. 支持 float 的模式，不占用空间，由用户唤出。
3. 网页使用。
4. 窗口分离。我们会发布成 PWA 页面，用户安装后可以将其放置在浏览器右侧，在扩展的帮助下，将可以进行浏览器和 CoPanel 的上下文同步。适合大屏幕使用，或者多个屏幕时使用。

## todo

[ ] 插入页面后，原页面需要左右滚动
[ ] 可以关闭侧边栏
[ ] 分离窗口，需要实现 SSE
[ ] / 太长，可以矮一点，使用滚动

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn build-watch
```

### Compiles and minifies for production
```
yarn build
```