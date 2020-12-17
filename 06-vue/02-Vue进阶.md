# 一、vue-cli脚手架

## 1.1 安装vue-cli 脚手架

- Vue 提供了一个官方的 `CLI`，为单页面应用快速搭建 (SPA) 繁杂的脚手架。它为现代前端工作流提供了 `batteries-included `的构建设置。只需要几分钟的时间就可以运行起来并带有`热重载`、保存时 lint 校验，以及生产环境可用的构建版本。
- 需要安装 Node 环境，Node安装地址：<http://nodejs.cn/download/>，注意：安装 `vue-cli` 脚手架目前需要 4.0以上的 Node 版本。


### 1.1.1 vue-cli 全局安装

- 在本地终端根目录执行以下命令

	```js
	npm i -g vue-cli	//-g是全局安装，只要安装了在电脑任何地方都可以使用脚手架
	```

- 安装完成以后 可以输入命令 ：`vue` 回车，可以看到针对vue的命令行：

  ![1537426743888](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537426743888.png)

### 1.1.2 初始化项目

- 执行以下命令初始化项目

	```js
	vue init webpack demo //demo 是你新建项目的名称	，也是文件名称
	```

- 执行之后将会自动初始化一个文件夹 ：demo
- 默认的直接回车，Yes的直接输入y回车，No的输入n回车。最后再按回车进行初始化

- 成功以后就会创建完成一个项目模板

![1537427257624](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537427080473.png)

### 1.1.3 启动项目

- 执行以下命令启动项目

  ```powershell
  npm run dev
  ```

  ![1537427080473](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537427362114.png)

### 1.1.4 Vue 调试工具 Vue-devtools



#### 1.1.4.1 在线安装

在线安装需要翻墙。地址：https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN


#### 1.1.4.2 本地安装

谷歌右上角菜单 - 更多工具 -  扩展程序 - 开发者模式打开 - 加载已解压的扩展程序 - 导入本地文件 - 成功以后显示以下图标

![1537427362114](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537427826854.png)



点击详细信息，勾选上允许访问文件网址，重启浏览器。F12打开控制台，有Vue一项表示安装成功

 ![1537427850848](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537427850848.png)

## 1.2 项目目录介绍

![1537427826854](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1537427257624.png)

### 1.2.1 build 

- webpack 配置相关
- 可以在此目录下的 `webpack.base.conf` 中的 `resolve` 中的 `extentions` 设置导入包时可以省略的文件的后缀名的类型
- 可以在此目录下的 `webpack.base.conf` 中的 `resolve` 中的 `alias` 设置文件路径别名，比如 `src` 就可以简写为 `@`

![image-20200424110107474](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200424110107474.png)

### 1.2.2 config

- 生产开发环境配置的参数
- 可以在此目录下的 index.js 中的 `dev`属性 `port` 修改端口号
- 可以在此目录下的 index.js 中的 `dev`属性  `autoOpenBrowser` 设置是否自动打开浏览器，true则自动打开

- 可以在此目录下的 index.js 中的 `dev`属性 `useEslint` 设置是否启用eslint

![image-20200424110510019](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200424110510019.png)


### 1.2.3 static

- static 中本来是用来放置第三方资源的，默认空文件是无法上传的，如果添加上 `.gitkeep` 则可以将空文件上传

### 1.2.4 node_modules 

- 安装的第三方依赖

### 1.2.5 babelrc

- 将 es6 这种高级语法转为低级语法以便于浏览器去识别

### 1.2.6 src

- 做项目时写的源码，会被 webpack 进行进一步的处理打包

### 1.2.7 .editorconfig

- 编辑器使用的设置



### 1.2.8 .eslintignore

- 代码风格检查忽略文件



### 1.2.9 .eslintrc.js

- 代码风格检查
- rules 里面可以自定义规则



### 1.2.10 .gitignore

- 使用 git 提交项目的时候忽略的一些文件



# 二、可复用性&组合

## 1.1 混入

- 混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

```js
// 定义一个混入对象
var myMixin = {
    created: function() {
        this.hello();
    },
    methods: {
        hello: function() {
            console.log('hello from mixin!');
        }
    }
};
export default {
    mixins: [myMixin]
};
```

### 1.1.1 选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。

比如，数据对象在内部会进行递归合并，在和组件的数据发生冲突时以组件数据优先。

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)  //通过 this.$data 获取到 data 中的所有数据
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

- 同名钩子函数将混合为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子**之前**调用。

```js
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')
  }
})

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

- 值为对象的选项，例如 `methods`, `components` 和 `directives`，将被混合为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```js
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

> - 注意：`Vue.extend()` 也使用同样的策略进行合并。

### 1.1.2 全局混入

- 也可以全局注册混入对象。注意使用！ 一旦使用全局混入对象，将会影响到 **所有** 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
    data () {
        return {
            myOption: '混入属性'
        }
    },
    created: function () {
    var myOption = this.$options.myOption // this.$options 为根实例对象
    if (myOption) {
        console.log(myOption)
    }
}
})

new Vue({
    myOption: 'hello!'
})
// => "hello!"
```

- 以上代码，为全局的 Vue 组件注入了处理逻辑。当 Vue 组件中有 myOption 这个属性的时候就会执行 。同样的 data 中的属性在其他组件只要一加载就会有这个属性。

> 请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为[插件](https://cn.vuejs.org/v2/guide/plugins.html)发布，以避免重复应用混入。

## 1.2 自定义指令

### 1.2.1 简介

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。举个聚焦输入框的例子，当页面加载时，指定input元素将获得焦点，注册一个全局自定义指令 `v-focus`：

> - `参数1` ： 指令的名称，注意，在定义的时候，指令的名称前面，不需要加 v- 前缀。 但是，在调用的时候，必须 在指令名称前 加上 v- 前缀来进行调用。
> - `参数2`： 是一个对象，这个对象身上，有一些指令相关的`钩子函数`，这些函数可以在特定的阶段，执行相关的操作

```js
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当被绑定的元素(使用了v-focus的元素)插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

使用

```html
<input v-focus>
```



### 1.2.2 钩子函数

```js
Vue.directive('focus', {
    bind: function () {
        // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置，样式相关的操作一般可以在bind中执行。
    }, 
    inserted: function () {
        // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。和JS行为有关的操作，最好在 inserted 中去执行，否则 JS行为不生效。
    }, 
    update: function () {
        // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    },  
    componentUpdated: function () {
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    }, 
    unbind: function () {
        // 只调用一次，指令与元素解绑时调用
    } 
})
```



### 1.2.3 钩子函数的参数

指令钩子函数会被传入以下参数：

> - `el`：指令所绑定的元素，可以用来直接操作 DOM。
>
> - `binding`：一个对象，包含以下属性：
>
>   > - `name`：指令名，不包括 `v-` 前缀。
>   > - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
>   > - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
>   > - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
>   > - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
>   > - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
>
> - `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
>
> - `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

这是一个使用了这些 property 的自定义钩子样例：

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

- 结果：

  > ![image-20200424161022791](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200424161022791.png)

### 1.2.4 动态指令参数

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。

例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：

```html
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample'
})
```

这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。

```html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```

### 1.2.5 函数简写

- 在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写:

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

  以上代码，在初始化和更新以后都会执行此函数里面的代码

### 1.2.6 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```



## 1.3 插件

- 插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：

> - 添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
>
> - 添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)
>
> - 通过全局 mixin 方法添加一些组件选项，如: [vue-router](https://github.com/vuejs/vue-router)
>
> - 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
>
> - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

### 1.3.1 使用插件

- 通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  //... options
})
```

- 也可以传入一个选项对象：

```js
Vue.use(MyPlugin, { someOption: true }) 
```

> 注意：Vue.use 会自动阻止多次注册相同插件，届时只会注册一次该插件。

- Vue.js 官方提供的一些插件 (例如 `vue-router`) 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`。然而在例如 CommonJS 的模块环境中，你应该始终显式地调用 `Vue.use()`：

```js
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```

### 1.3.2 开发插件

- Vue.js 的插件应该有一个公开方法 `install`。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () { }
	
  // 2. 添加全局指令
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) { }
    ...
  })

  // 3. 全局混入
  Vue.mixin({
    created: function () { }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) { }
  
  // 5. 添加实例属性
  Vue.prototype.$custom = "这是自定义属性" 
}
```

#### 1.3.2.1  使用

- 参数 Vue 就是我们的 Vue 构造函数，可以在里面使用原型绑定属性，`options` 是我们传进去的参数。

```js
var obj.install = function (Vue, options) {
    Vue.prototype.$custom = '自定义属性'
}
Vue.use(obj,{a: 1})
```

#### 1.3.2.2 实例

- 我们通过以上的方式可以封装一个自己的获取 `localstorage` 的插件

##### plugin.js 文件

```js
const local = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key) || {});
  }
};

export default {
  install: function(Vue, options) {
    Vue.prototype.$local = local;
  }
};
```

- 以上代码，我们可以在全局通过 `vm.$local` 或者 组件中通过 `this.$local` 获取到这个local对象并调用下面的方法。

##### 组件

```js
export default {
  created() {
    this.$local.set('value', '通过插件设置的local值');
    console.log(this.$local.get('value')); // 通过插件设置的local值
  }
};
```

## 1.4 过滤器

概念：Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 v-bind 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
<div>{{ message | capitalize }}</div>

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```



### 1.1.1 基本语法

function 中的第一个参数已经被规定死了，永远都是过滤器 `管道符`前面传递过来的数据。之后的参数可以任意传。过滤器参数：

> - `参数1`：过滤器的名称
> - `参数2`：一个函数

你可以在一个组件的选项中定义**本地的过滤器**：

```js
filters: {
	过滤器名称: function (过滤信息) {
	}
}
```

或者在创建 Vue 实例之前**全局定义过滤器**：

```js
Vue.filter('过滤器的名称', function(msg,arg1,arg2…){
	return msg + arg1 + arg2 + …
})
```

- 使用

```html
<p>{{ msg | 过滤器的名称(arg1,arg2...) }}</p>
```

> 注意：在`new Vue()` 实例中。过滤器可以连续的书写多个，过滤器调用的时候，采用的是`就近原则`，如果私有过滤器和全局过滤器名称一致了，这时候优先调用私有过滤器。

#### 1.6.1.2 用法

- 如下：在`data`里面有`msg`变量，我们想要加载到页面以后是被处理过的，也就是将“`单纯`”替换为“`邪恶`”。因此我们需要对原有的`msg`进行处理

```js
data: {
   msg: '曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人'
}
```

- 定义一个 Vue 全局的过滤器，名字叫做  `msgFormat`，然后用 replace 结合正则表达式进行替换，最后返回替换以后的字符串渲染到页面中。

```js
Vue.filter('msgFormat', function (msg) {
   // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
   return msg.replace(/单纯/g, ‘邪恶’)
})
```

- 另外，在管道后面可以继续传参。那么，现在我们想要在管道传参，然后进行替换。

```html
<p>{{ msg | msgFormat('疯狂', '智障') }}</p>
```

```js
Vue.filter('msgFormat', function (msg, arg1, arg2) {
   return msg.replace(/单纯/g, arg1 + arg2)
})
```

- 同时，过滤器可以同时调用多个。

```html
<p>{{ msg | msgFormat('疯狂', '智障') | test }}</p>
```

```js
Vue.filter('test', function (msg) {
   return msg + '========'
})
```

- 结果：

```shell
曾经，我也是一个疯狂智障的少年，疯狂智障的我，傻傻的问，谁是世界上最疯狂智障的男人========
```

> 全局过滤器也可以在插件中定义，在全局都可以使用。



## 1.5 懒加载

- 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件。
- 当 `ensure` 第三个参数相同时，会将两个组件打包成一个，那么在两个组件之间切换时也只会加载这个 js 文件。

```json
components: {
  headerNav: (resolve)=>{
    return require.ensure([],()=>{
      resolve(require('@/component/header'))
    }, 'abc')
  },
  headerBody: (resolve)=>{
    return require.ensure([],()=>{
      resolve(require('@/component/body'))
    }, 'abc')
  }
}
```

- 也可以以下这样，但是不能将两个文件打包成一个。

```js
components: {
    headerNav: (resolve)=>{
       return import('@/component/header') 
    }
}
```



## 1.6 深入响应式原理

- 当你把一个普通的 JavaScript 对象传给 Vue 实例的 `data` 选项，Vue 将遍历此对象所有的属性，并使用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些属性全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#%E5%AE%9A%E4%B9%89_getters_%E4%B8%8E_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器。
- 这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 [vue-devtools](https://github.com/vuejs/vue-devtools) 来获取更加友好的检查接口。
- 每个组件实例都有相应的 **watcher** 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 `setter` 被调用时，会通知 `watcher` 重新计算，从而致使它关联的组件得以更新。
- 由于 JavaScript 的限制，Vue **不能检测**数组和对象的变化。尽管如此我们还是有一些办法来回避这些限制并保证它们的响应性。

![data](https://cn.vuejs.org/images/data.png)

### 1.6.1 Object.defineProperty()

- 该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 或 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)[ ](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys)方法）， 这些属性的值可以被改变，也可以被[删除](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改的。

![img](https://upload-images.jianshu.io/upload_images/5016475-c1ff7e988c760ebc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

```js
Object.defineProperty(obj, prop, desc)
```

> - obj： 需要定义属性的当前对象
> - prop：要定义或修改的属性的名称。
> - desc：将被定义或修改的属性描述符
> - 返回值：被传递给函数的对象

#### 1.6.1.1 属性的特性以及内部属性

- javacript 有三种类型的属性

  > - 命名数据属性：拥有一个确定的值的属性。这也是最常见的属性
  > - 命名访问器属性：通过`getter`和`setter`进行读取和赋值的属性
  > - 内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到，不过可以通过一些方法间接的读取和设置。比如，每个对象都有一个内部属性`[[Prototype]]`，你不能直接访问这个属性，但可以通过`Object.getPrototypeOf()`方法间接的读取到它的值。虽然内部属性通常用一个双括号包围的名称来表示，但实际上这并不是它们的名字，它们是一种抽象操作，是不可见的，根本没有上面两种属性有的那种字符串类型的属性

#### 1.6.1.2 属性描述符

对象里目前存在的属性描述符有两种主要形式：**数据描述符**和**存取描述符**。

> - **数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。
> - **存取描述符**是由getter-setter函数对描述的属性。

描述符必须是这两种形式之一；不能同时是两者

##### 1. 数据描述符 

- `value`：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。**默认为 undefined**。
- `writable`：当且仅当该属性的`writable`为`true`时，`value`才能被[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。**默认为 false**。

```js
let Person = {}
Object.defineProperty(Person, 'name', {
   value: 'jack',
   writable: true // 是否可以改变
})
```

##### 2. 存取描述符 

- 是由一对 `getter`、`setter` 函数功能来描述的属性

  > - `get`：一个给属性提供 getter 的方法，如果没有 getter 则为 `undefined`。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入`this`对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。
  > - `set`：一个给属性提供 setter 的方法，如果没有 setter 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。

- 数据描述符和存取描述均具有以下描述符

  > - `configrable`： 描述属性是否配置，以及可否删除
  > - `enumerable`： 描述属性是否会出现在 `for in` 或者 `Object.keys()`的遍历中

##### 3. 两者属性统计如下表格

|            | configurable | enumerable | value | writable | get  | set  |
| ---------- | ------------ | ---------- | ----- | -------- | ---- | ---- |
| 数据描述符 | Yes          | Yes        | Yes   | Yes      | No   | No   |
| 存取描述符 | Yes          | Yes        | No    | No       | Yes  | Yes  |

> 注意：如果一个描述符不具有value,writable，且不具有 get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

#### 1.6.1.3 创建属性

- 如果对象中不存在指定的属性，`Object.defineProperty()`就创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。拥有布尔值的字段的默认值都是`false`。`value`，`get`和`set`字段的默认值为`undefined`。一个没有`get/set/value/writable`定义的属性被称为“通用的”，并被“键入”为一个数据描述符。

```js
var a = {};
let temp;

Object.defineProperty(a, 'b', {
  set: function (newValue) {
    temp = newValue;  // 当执行 a.b = 1 赋值操作的时候，会触发 set 函数 newValue 为设置的值，这里我们将设置的值赋值给 temp，当取值的时候我们将 temp 返回出去，就能拿到通过 set 设置的值了
  },
  get: function () {
    return temp; // 当执行 a.b 取值操作的时候，会触发 get 函数，我们将之前 set 的 temp 值给返回出去，就能拿到刚刚设置的属性的值了 
  }
});
a.b = 1;    // 赋值操作，赋值1
a.b;       // 取值操作1
```

- 数据描述符和存取描述符不能混合使用

```js
Object.defineProperty(o, "conflict", {
  value: 0x9f91102, 
  get: function() { 
    return 0xdeadbeef; 
  } 
});
// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```

#### 1.6.1.4  修改属性

- 如果属性已经存在，`Object.defineProperty()`将尝试根据描述符中的值以及对象当前的配置来修改这个属性。
- 如果旧描述符将其`configurable` 属性设置为`false`，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。
- 当试图改变不可配置属性（除了`value`和`writable` 属性之外）的值时会抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，除非当前值和新值相同。

##### 1. Writable

- 当`writable`属性设置为`false`时，该属性被称为“不可写”。它不能被重新分配。

  ```js
  var o = {}; // Creates a new object
  
  Object.defineProperty(o, 'a', {
    value: 37,
    writable: false
  });
  
  console.log(o.a); // 37
  o.a = 25; // Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'
  ```

  

##### 2. Enumerable 特性

- `enumerable`定义了对象的属性是否可以在 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环和 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 中被枚举。

  ```js
  var o = {};
  Object.defineProperty(o, "a", { value : 1, enumerable:true });
  Object.defineProperty(o, "b", { value : 2, enumerable:false });
  Object.defineProperty(o, "c", { value : 3 }); // 默认为 false
  o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true
  
  for (var i in o) {    
    console.log(i);  // 打印 'a' 和 'd' 
  }
  
  console.log(Object.keys(o)); // ["a", "d"]
  
  let a = o.propertyIsEnumerable('a'); // true
  let b = o.propertyIsEnumerable('b'); // false
  let c = o.propertyIsEnumerable('c'); // false
  let d = o.propertyIsEnumerable('d'); // true
  console.log(a,b,c,d); // true false false true
  ```

  

> - `Object.keys(obj)`：返回一个表示给定对象的所有可枚举属性的字符串数组。
> - `obj.propertyIsEnumerable(property)`：判断某个属性是否可枚举，可枚举返回 true，否则返回 false。

##### 3. Configurable 特性

- `configurable`特性表示对象的属性是否可以被删除，以及除`value`和`writable`特性外的其他特性是否可以被修改。

```js
var o = {};
Object.defineProperty(o, "a", {
  get: function () {
    return 1;
  },
  configurable: false
});

Object.defineProperty(o, "a", { configurable: true }); // Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o, "a", {enumerable  : true}); // Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o, "a", {set : function(){}}); // Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o, "a", {get : function(){return 1;}}); // Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o, "a", {value : 12}); // Uncaught TypeError: Cannot redefine property: a
Object.defineProperty(o, "a", {writable : true}); // Uncaught TypeError: Cannot redefine property: a
console.log(o.a); // logs 1
delete o.a; // Uncaught TypeError: Cannot delete property 'a' of #<Object>
```

#### 1.6.1.5 添加多个属性和默认值

- 考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和`Object.defineProperty()`为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示。

```js
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```



#### 1.6.1.6 继承属性

- 如果访问者的属性是被继承的，它的 `get` 和`set` 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```js
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1 设置的属性x的值将被 myclass所有实例化对象共享
```

- 这可以通过将值存储在另一个属性中解决。在 `get` 和 `set` 方法中，`this` 指向某个被访问和修改属性的对象。

```js
function myclass() {
}

Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;
  },
  set(x) {
    this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined
```

- 不像访问者属性，值属性始终在对象自身上设置，而不是一个原型。然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

```js
function myclass() {
}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1
```



### 1.6.2 检测变化的注意事项

#### 1.6.2.1 对于对象

- 由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：

```js
var vm = new Vue({
  data:{
    a:1
  }
})

vm.a = 2 // `vm.a` 是响应的
vm.b = 2 // `vm.b` 是非响应的
```

- Vue 不允许在已经创建的实例上动态添加新的`根级`响应式属性。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到`嵌套`的对象上（可以添加到根属性上）：

```js
Vue.set('data中的属性对象', 'b', 2)
// 或者
this.$set('data中的属性对象','b',2)
```

- 有时你想向一个已有对象添加多个属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。但是，这样添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
// 或者使用es6写法
this.someObject = {...this.someObject, ...{ a: 1, b: 2 }}
```

示例

```html
<template>
  <div>{{a.b1}}--{{a.b2}}--{{a.b3}}</div>
</template>
<script>
export default {
  data() {
    return {
      a: {}
    };
  },
  created() {
    this.a = { ...this.a, ...{ b1: 2, b2: 3 } };
    this.$set(this.a, 'b3', 4);
    setTimeout(() => {
      this.a.b1 = 5;
      this.a.b2 = 5;
      this.a.b3 = 5;
    }, 3000);
  },
};
</script>

```

以上示例，初始的a属性只是一个空对象，我们通过`$set`设置了b1,b2,b3三个属性以及值，这时候在页面上会动态的更新出`2--3--4`。我们再使用定时器测试一下我们添加的三个属性是不是响应式的，所以我们设置了3s以后改变这三个值，这时候我们发现，页面动态更新了`5--5--5`。说明我们的设置的三个属性是响应式的。对于data来说，初始没有给定属性，如果我们在created里面直接赋值b1,b2,b3三个属性，那么很遗憾，这三个属性不会是响应式的，因此，当初始化没有给定属性时，我们必须使用`$set`设置，这样的属性才是响应式的。

#### 1.6.2.2 对于数组

Vue 不能检测以下数组的变动：

> 1. 当你利用索引直接设置一个数组项时，例如：`vm.arr[indexOfItem] = newValue`
> 2. 当你修改数组的长度时，例如：`vm.arr.length = newLength`

举个例子：

```js
var vm = new Vue({
  data: {
    arr: ['a', 'b', 'c']
  }
})
vm.arr[1] = 'x' // 不是响应性的
vm.arr.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 `vm.arr[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```js
// Vue.set
Vue.set(vm.arr, indexOfItem, newValue)
// Array.prototype.splice
vm.arr.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```js
vm.arr.splice(newLength)
```





### 1.6.3 异步更新队列（nextTick）

Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

例如，当你设置 `vm.someData = 'new value'`，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。例如：

```js
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新' // 此时dom不会立即渲染
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新' // 使用nextTick函数里面可以拿到DOM 渲染后的值
      })
    }
  }
})
```

因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用新的 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法完成相同的事情：

```js
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick() //  使用 await 后面的语句就和$nextTick同步了，因此在后面是可以拿到DOM更新后的值得，但是会影响后面的语句，使全变成DOM更新以后才执行
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

## 1.7 React 和 Vue 对比

- React 和 Vue 有许多相似之处，它们都有：

  > - 使用 Virtual DOM
  > - 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
  > - 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。

- 由于有着众多的相似处，我们会用更多的时间在这一块进行比较。这里我们不只保证技术内容的准确性，同时也兼顾了平衡的考量。我们需要承认 React 比 Vue 更好的地方，比如更丰富的生态系统。

###  运行时性能

- React 和 Vue 都是非常快的，所以速度并不是在它们之中做选择的决定性因素。对于具体的数据表现，可以移步这个[第三方 benchmark](https://stefankrause.net/js-frameworks-benchmark8/table.html)，它专注于渲染/更新非常简单的组件树的真实性能。

### 优化

- 在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。

- 如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用 `PureComponent`，或是手动实现 `shouldComponentUpdate` 方法。同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。

- 然而，使用 `PureComponent` 和 `shouldComponentUpdate` 时，需要保证该组件的整个子树的渲染输出都是由该组件的 props 所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致。这使得 React 中的组件优化伴随着相当的心智负担。

- 在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了 `shouldComponentUpdate`，并且没有上述的子树问题限制。

- Vue 的这个特点使得开发者不再需要考虑此类优化，从而能够更好地专注于应用本身。

### HTML

- 在 React 中，一切都是 JavaScript。不仅仅是 HTML 可以用 JSX 来表达，现在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理。这类方案有其优点，但也存在一些不是每个开发者都能接受的取舍。

- Vue 的整体思想是拥抱经典的 Web 技术，并在其上进行扩展。我们下面会详细分析一下。

- 在 React 中，所有的组件的渲染功能都依靠 JSX。JSX 是使用 XML 语法编写 JavaScript 的一种语法糖。

- 使用 JSX 的渲染函数有下面这些优势：

  > - 你可以使用完整的编程语言 JavaScript 功能来构建你的视图页面。比如你可以使用临时变量、JS 自带的流程控制、以及直接引用当前 JS 作用域中的值等等。
  > - 开发工具对 JSX 的支持相比于现有可用的其他 Vue 模板还是比较先进的 (比如，linting、类型检查、编辑器的自动完成)。

- 事实上 Vue 也提供了[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)，甚至[支持 JSX](https://cn.vuejs.org/v2/guide/render-function.html#JSX)。然而，我们默认推荐的还是模板。任何合乎规范的 HTML 都是合法的 Vue 模板，这也带来了一些特有的优势：

  > - 对于很多习惯了 HTML 的开发者来说，模板比起 JSX 读写起来更自然。这里当然有主观偏好的成分，但如果这种区别会导致开发效率的提升，那么它就有客观的价值存在。
  > - 基于 HTML 的模板使得将已有的应用逐步迁移到 Vue 更为容易。
  > - 这也使得设计师和新人开发者更容易理解和参与到项目中。
  > - 你甚至可以使用其他模板预处理器，比如 Pug 来书写 Vue 的模板。

- 有些开发者认为模板意味着需要学习额外的 DSL (Domain-Specific Language 领域特定语言) 才能进行开发——我们认为这种区别是比较肤浅的。首先，JSX 并不是没有学习成本的——它是基于 JS 之上的一套额外语法。同时，正如同熟悉 JS 的人学习 JSX 会很容易一样，熟悉 HTML 的人学习 Vue 的模板语法也是很容易的。最后，DSL 的存在使得我们可以让开发者用更少的代码做更多的事，比如 `v-on` 的各种修饰符，在 JSX 中实现对应的功能会需要多得多的代码。

- 更抽象一点来看，我们可以把组件区分为两类：一类是偏视图表现的 (presentational)，一类则是偏逻辑的 (logical)。我们推荐在前者中使用模板，在后者中使用 JSX 或渲染函数。这两类组件的比例会根据应用类型的不同有所变化，但整体来说我们发现表现类的组件远远多于逻辑类组件。

### CSS

- 除非你把组件分布在多个文件上 (例如 [CSS Modules](https://github.com/gajus/react-css-modules))，CSS 作用域在 React 中是通过 CSS-in-JS 的方案实现的 (比如 [styled-components](https://github.com/styled-components/styled-components)、[glamorous](https://github.com/paypal/glamorous) 和 [emotion](https://github.com/emotion-js/emotion))。这引入了一个新的面向组件的样式范例，它和普通的 CSS 撰写过程是有区别的。另外，虽然在构建时将 CSS 提取到一个单独的样式表是支持的，但 bundle 里通常还是需要一个运行时程序来让这些样式生效。当你能够利用 JavaScript 灵活处理样式的同时，也需要权衡 bundle 的尺寸和运行时的开销。

- 如果你是一个 CSS-in-JS 的爱好者，许多主流的 CSS-in-JS 库也都支持 Vue (比如 [styled-components-vue](https://github.com/styled-components/vue-styled-components) 和 [vue-emotion](https://github.com/egoist/vue-emotion))。这里 React 和 Vue 主要的区别是，Vue 设置样式的默认方法是[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)里类似 `style` 的标签。

- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)让你可以在同一个文件里完全控制 CSS，将其作为组件代码的一部分。

```html
<style scoped>
  @media (min-width: 250px) {
    .list-container:hover {
      background: orange;
    }
  }
</style>
```

- 这个可选 `scoped` 属性会自动添加一个唯一的属性 (比如 `data-v-21e5b78`) 为组件内 CSS 指定作用域，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover`。

- 最后，Vue 的单文件组件里的样式设置是非常灵活的。通过 [vue-loader](https://github.com/vuejs/vue-loader)，你可以使用任意预处理器、后处理器，甚至深度集成 [CSS Modules](https://vue-loader.vuejs.org/en/features/css-modules.html)——全部都在 `<style>` 标签内。

### 向上扩展

- Vue 和 React 都提供了强大的路由来应对大型应用。React 社区在状态管理方面非常有创新精神 (比如 Flux、Redux)，而这些状态管理模式甚至 [Redux 本身](https://yarnpkg.com/en/packages?q=redux vue&p=1)也可以非常容易的集成在 Vue 应用中。实际上，Vue 更进一步地采用了这种模式 ([Vuex](https://github.com/vuejs/vuex))，更加深入集成 Vue 的状态管理解决方案 Vuex 相信能为你带来更好的开发体验。

- 两者另一个重要差异是，Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。React 则是选择把这些问题交给社区维护，因此创建了一个更分散的生态系统。但相对的，React 的生态系统相比 Vue 更加繁荣。

- 最后，Vue 提供了 [Vue-cli 脚手架](https://github.com/vuejs/vue-cli)，能让你非常容易地构建项目，包含了 [Webpack](https://github.com/vuejs-templates/webpack)，[Browserify](https://github.com/vuejs-templates/browserify)，甚至 [no build system](https://github.com/vuejs-templates/simple)。React 在这方面也提供了 [create-react-app](https://github.com/facebookincubator/create-react-app)，但是现在还存在一些局限性：

  > - 它不允许在项目生成时进行任何配置，而 Vue 支持 [Yeoman](http://yeoman.io/)-like 定制。
  > - 它只提供一个构建单页面应用的单一模板，而 Vue 提供了各种用途的模板。
  > - 它不能用用户自建的模板构建项目，而自建模板对企业环境下预先建立协议是特别有用的。

- 而要注意的是这些限制是故意设计的，这有它的优势。例如，如果你的项目需求非常简单，你就不需要自定义生成过程。你能把它作为一个依赖来更新。如果阅读更多关于[不同的设计理念](https://github.com/facebookincubator/create-react-app#philosophy)。

### 向下扩展

- React 学习曲线陡峭，在你开始学 React 前，你需要知道 JSX 和 ES2015，因为许多示例用的是这些语法。你需要学习构建系统，虽然你在技术上可以用 Babel 来实时编译代码，但是这并不推荐用于生产环境。

- 就像 Vue 向上扩展好比 React 一样，Vue 向下扩展后就类似于 jQuery。你只要把如下标签放到页面就可以运行：

  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  ```

- 然后你就可以编写 Vue 代码并应用到生产中，你只要用 min 版 Vue 文件替换掉就不用担心其他的性能问题。

- 由于起步阶段不需学 JSX，ES2015 以及构建系统，所以开发者只需不到一天的时间阅读[指南](https://cn.vuejs.org/v2/guide/)就可以建立简单的应用程序。

### 总结

> - `性能方面`：React 和 Vue 都是非常快的，所以速度并不是在它们之中做选择的决定性因素
> - `优化方面`：React在不需要更新子组件需要，使用 `PureComponent` 和 `shouldComponentUpdate`，而 Vue 组件的依赖是在渲染过程中自动追踪的
> - `HTML方面`：React 使用 JSX，虽然 Vue 也可以使用 JSX，但是还是推荐使用默认模板
> - `CSS方面`：React 必须 使用插件才能实现模块化的css，如`style-component`。而 Vue 可以自选，如 `scoped`
> - `向上扩展`：React 的状态管理是 Redux，独立于 React。而 Vue 则参考Redux设计了自己的状态管理工具 Vuex。
> - `向下扩展`：React 学习较难，Vue较为简单。可以直接引入CDN包就可以编码。