# JS 媒体查询

样式的改变使用CSS3的媒体查询，行为和功能的改变使用JS的媒体查询。
`matchMedia()` 方法参数可写任何一个`CSS@media`规则，返回的是新的`MediaQueryList`对象，该对象有两个属性

- `media`：查询语句的内容
- `matches`：检查查询结果，返回boolean

还有两个方法

- `addListener()`：添加一个新的监听器函数，查询结果改变时，调用指定回调
- `removeListener()`：删除之前添加的监听器，若不存在则不执行任何操作

通常在监听函数中执行想要实现的媒体操作：

```js
var media = window.matchMedia('(max-width:768px)');
media.addListener(() => {
	if(media.matches){
    // 值为 true 时执行的操作
  }else{
    // 值为 false 执行的操作
  }
})
```

