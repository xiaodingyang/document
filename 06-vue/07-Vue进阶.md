# 一、知识点

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
Vue.use(MyPlugin, { someOption: true }) // 注意：Vue.use 会自动阻止多次注册相同插件，届时只会注册一次该插件。
```

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
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
	
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
  
  Vue.prototype.$custom = "这是自定义属性" // 5. 添加自定义属性
}
```

#### 1.3.2.1  使用

- 参数 Vue 就是我们的 Vue 构造函数，可以在里面使用原型绑定属性，`options` 是我们传进去的参数。

```js
var obj = {
  install: function (Vue, options) {
    Vue.prototype.$custom = '自定义属性'
  }
}
Vue.use(obj,{a: 1})
```

#### 1.3.2.2 实例

- 我们通过以上的方式可以封装一个自己的获取 `localstorage` 的插件

**local.js 文件**

```js
let local = {
  set(key, value) {
    localStorage.setItem(key,JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(localStorage.getItem(key) || {})
  }
}
export default {
  install: function (Vue) {
    Vue.prototype.$local = local
  }
}
```

- 以上代码，我们可以在全局通过 `vm.$local` 或者 组件中通过 `this.$local` 获取到这个local对象并调用下面的方法。

**组件**

```js
import Vue from "vue";
import local from "./test/local";
Vue.use(local);

mounted () {
  this.$local.set('name', 'xiaoyang')
  let localData = this.$local.get('name')
  console.log(localData); // xiaoyang
}
```



## 1.4 混入

- 混入 (mixins) 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

```js
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin] //注意：必须是 mixins 这个属性，且值为混入对象且必须用 [] 包裹
})

var component = new Component() // => "hello from mixin!"
```

### 1.4.1 选项合并

- 当组件和混入对象含有同名选项时，这些选项将以恰当的方式混合。比如，数据对象在内部会进行递归合并，在和组件的数据发生冲突时以组件数据优先。

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
  mixins: [mixin], //注意：必须是 mixins 这个属性，且值为混入对象且必须用 [] 包裹
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

### 1.4.2 全局混入

- 也可以全局注册混入对象。注意使用！ 一旦使用全局混入对象，将会影响到 **所有** 之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
    data () {
        return {
            myOption: '混入属性'
        }
    }
    created: function () {
    var myOption = this.$options.myOption
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

> - 谨慎使用全局混入对象，因为会影响到每个单独创建的 Vue 实例 (包括第三方模板)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。也可以将其用作 [Plugins](https://cn.vuejs.org/v2/guide/plugins.html) 以避免产生重复应用。



##  1.5 vue-resource请求数据

- 除了 `vue-resource` 之外，还可以使用 `axios` 的第三方包实现实现数据的请求。

### 1.5.1 基本语法

- `url`表示请求/发送数据的地址
- `[body]`表示发送的数据
- `[config]`表示一些选项，具体看官方文档。
  - get(url, [options])
  - jsonp(url, [options])
  - post(url, [body], [options])

```js
this.$http.get(‘url’, [options]).then(successCallback,errorCallback)

this.$http.jsonp(‘url’, [options]).then(successCallback,errorCallback)

this.$http.post(‘url’, [body],  [options]).then(successCallback,errorCallback)
```

- 在此之前要先安装导入 `vue-resource` 的包。

```shell
npm i vue-resource
```

```js
import Vueresource from 'vue-resource'
Vue.use(Vueresource)
```



### 1.5.2 get 方式发送请求

当发起`get`请求之后， 通过` .then` 来设置成功的回调函数。通过 `result.body `拿到服务器返回的成功的数据。

```html
<input type="button" value="get请求" @click="getInfo">
```

```html
<script src="node_modules/vue/dist/vue.js"></script>
<script src="node_modules/vue-resource/dist/vue-resource.js"></script>
<script>
   var vm = new Vue({
      el: '#app',
      data: {

      },
      methods: {
         getInfo() {
            //  当发起get请求之后， 通过 .then 来设置成功的回调函数
            this.$http.get('https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/test').then(function (result) {
               // 通过 result.body 拿到服务器返回的成功的数据
               console.log(result.body)
            })
         }
      }
   })
</script>
```



### 1.5.3 post方式发送请求

手动发起的 `Post` 请求，默认没有表单格式（`application/x-wwww-form-urlencoded`），所以，有的服务器处理不了。通过 post 方法的第三个参数， { `emulateJSON: true` } 设置 提交的内容类型 为 普通表单数据格式。

`this.$http.post()` 中接收三个参数：

- 第一个参数： 要请求的URL地址
- 第二个参数： 要提交给服务器的数据 ，要以对象形式提交给服务器 `{ name: this.name }`
- 第三个参数： 是一个配置对象，要以哪种表单数据类型提交过去， `{ emulateJSON: true }`, 以普通表单格式，将数据提交给服务器 `application/x-www-form-urlencoded`

```html
<input type="button" value="post请求" @click="postInfo">
```

```html
<script src="node_modules/vue/dist/vue.js"></script>
<script src="node_modules/vue-resource/dist/vue-resource.js"></script>
<script>
   var vm = new Vue({
      el: '#app',
      data: {

      },
      methods: {
         postInfo() { // 发起 post 请求   application/x-wwww-form-urlencoded
            //  手动发起的 Post 请求，默认没有表单格式，所以，有的服务器处理不了 通过 post 方法的第三个参数， { emulateJSON: true } 设置 提交的内容类型 为 普通表单数据格式
            this.$http.post('https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/test1', {}, {emulateJSON: true})
            .then(result => {
               console.log(result.body)
            })
         }
      }
   })
</script>
```



### 1.5.4 jsonP方式发送请求

由于浏览器的`安全性`限制，不允许`AJAX`访问 `协议不同`、`域名不同`、`端口号不同`的 `数据接口`，浏览器认为这种访问不安全；可以通过动态创建script标签的形式，把script标签的src属性，指向数据接口的地址，因为`script标签不存在跨域`限制，这种数据获取方式，称作`JSONP`（注意：根据JSONP的实现原理，知晓，JSONP只支持Get请求）；

```
$ npm install jsonp
```

#### jsonp(url, opts, fn)

- `url` (`String`) url to fetch
- opts(Object), optional
  - `param` (`String`) name of the query string parameter to specify the callback (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. `0` to disable (defaults to `60000`)
  - `prefix` (`String`) prefix for the global callback functions that handle jsonp responses (defaults to `__jp`)
  - `name` (`String`) name of the global callback functions that handle jsonp responses (defaults to `prefix` + incremented counter)
- `fn` callback

具体实现过程：

- 先在客户端定义一个回调方法，预定义对数据的操作；
- 再把这个回调方法的名称，通过URL传参的形式，提交到服务器的数据接口；
- 服务器数据接口组织好要发送给客户端的数据，再拿着客户端传递过来的回调方法名称，拼接出一个调用这个方法的字符串，发送给客户端去解析执行；
- 客户端拿到服务器返回的字符串之后，当作Script脚本去解析执行，这样就能够拿到JSONP的数据了；

```html
<input type="button" value="jsonp请求" @click="jsonpInfo">
```

```js
jsonpInfo() { // 发起JSONP 请求
  this.$http.jsonp('http://vue.studyit.io/api/jsonp').then(result => {
    console.log(result.body)
  })
}
```



### 1.5.5 全局配置

#### 1. 全局配置数据接口的根域名

- 全域名

```shell
http://vue.studyit.io/api/getprodlist
```

- 根域名

```js
Vue.http.options.root = 'http://vue.studyit.io/';
```

- 如果我们通过全局配置了，请求的数据接口 根域名，则在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；

```js
this.$http.get('api/getprodlist').then(result => {
   // 注意： 通过 $http 获取到的数据，都在 result.body 中放着
   if (result.status === 0) {
      // 成功了
      console.log(result.body)
   } else {
      // 失败了
      alert('获取数据失败！')
   }
})
```

#### 2. 全局配置emulateJSON

- 全局配置以后就可以将post里面的第三个参数删掉

```js
Vue.http.options.emulateJSON = true;
```

 

## 1.6 axios

### 1.6.1 基本使用

#### 1.6.1.1 安装

```powershell
npm i axios
```

#### 1.6.1.2 导入

```js
import axios form 'axios'
```

#### 1.6.1.3 请求数据的方式

- 获取到的数据在 msg 下面的 data 里面，需要注意的是，我们需要在 create 钩子函数下发起请求。

- 其中 `then` 为成功后的回调函数

- `catch` 为失败后的回调函数

  ```js
  created () {
     axios({
        method: 'get',
        url: 'https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/test'
     }).then( (msg) => {
        console.log(msg.data)
     }).catch( (error) => {
        console.log(error)
     })
  }
  ```

- 或者以单独的方式进行发送请求

  ```js
  axios.get('https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/test')
    .then( (msg) => {
     console.log(msg.data)
  })
    .catch( (error) => {
     console.log(error)
  })
  ```

#### 1.6.1.4 发送数据的方式

```js
axios.get('https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/test', {
   params: {
      abc: 'xiaoyang',
      def: 'hahaha'
   }
})
```

### 1.6.2 vuex 中的 axios

#### 1.6.2.1 请求

- 注意：请求是在 `actions` 中进行，其中 `then` 为成功以后的回调函数，data为请求到的数据，catch为失败的回调函数。

- 请求成功以后，我们需要提交 `mutations` ，改变状态，将获取到的值传给 mutations 里面的函数

  ```js
  actions: {
    /* 执行异步操作，ajax请求 */
    getListAction ({commit}) {
      axios.get("https://easy-mock.com/mock/5b654dbd3f60797acbabc15a/xiaodingyang/title.json")
      .then( (data) => {
        commit("changeList",data.data)  /* 拿到数据后提交mutations改变状态 */
      }).catch( (error) => {
        console.log(error);
      })
    }
  }
  ```

- 在 state 里面定义一个 list ，同时 mutations 里面创建 changeList 函数，第二个参数为接收到的 axios 请求到的数据，将此数据赋值给 state.list 。此时，在其他组件就可以通过 `this.$store.state.list` 进行访问

  ```js
  state: {
    list: []
  }
  ```

  ```js
  mutations: {
    changeList (state,list) {
      state.list = list;
    }
  }
  ```

- 在要请求数据的组件的created生命周期钩子函数中使用 `dispatch` 触发

  ```js
  created () {
    this.$store.dispatch("getListAction")
  }
  ```



### 1.6.3 自定义请求实例

- 给请求统一配置规则

  ```js
  let HTTP = axios.create({
     baseURL: 'https://easy-mock.com/mock/5b654ce33f60797acbabc14e/example/',  /* 根地址 */
     timeout: 1000,    /* 超过这个时间就不会再请求 */
     responseType: 'json',   /* 返回数据的格式 */
     params: {
        book: '123'    /* 查询字符串 */
     },
     headers: {
        'custome-header': 'qingqiutou'   /* 请求头 */
     }
  })
  ```

- 此时，我们就可以使用HTTP 发起请求了

  ```js
  HTTP.get('test').then( (msg) => {
     console.log(msg.data)
  })
  ```

## 1.7 懒加载

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



## 1.8 深入响应式原理

- 当你把一个普通的 JavaScript 对象传给 Vue 实例的 `data` 选项，Vue 将遍历此对象所有的属性，并使用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些属性全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#%E5%AE%9A%E4%B9%89_getters_%E4%B8%8E_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器。
- 这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 [vue-devtools](https://github.com/vuejs/vue-devtools) 来获取更加友好的检查接口。
- 每个组件实例都有相应的 **watcher** 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 `setter` 被调用时，会通知 `watcher` 重新计算，从而致使它关联的组件得以更新。

![data](https://cn.vuejs.org/images/data.png)

### 1.8.1 Object.defineProperty()

- 该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 或 [`Object.keys`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)[ ](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys)方法）， 这些属性的值可以被改变，也可以被[删除](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改的。

![img](https://upload-images.jianshu.io/upload_images/5016475-c1ff7e988c760ebc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

```js
Object.defineProperty(obj, prop, desc)
```

> - obj： 需要定义属性的当前对象
> - prop：要定义或修改的属性的名称。
> - desc：将被定义或修改的属性描述符
> - 返回值：被传递给函数的对象

#### 1.8.1.1 属性的特性以及内部属性

- javacript 有三种类型的属性

  > - 命名数据属性：拥有一个确定的值的属性。这也是最常见的属性
  > - 命名访问器属性：通过`getter`和`setter`进行读取和赋值的属性
  > - 内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到，不过可以通过一些方法间接的读取和设置。比如，每个对象都有一个内部属性`[[Prototype]]`，你不能直接访问这个属性，但可以通过`Object.getPrototypeOf()`方法间接的读取到它的值。虽然内部属性通常用一个双括号包围的名称来表示，但实际上这并不是它们的名字，它们是一种抽象操作，是不可见的，根本没有上面两种属性有的那种字符串类型的属性

#### 1.8.1.2 属性描述符

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

#### 1.8.1.3 创建属性

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

#### 1.8.1.4  修改属性

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

#### 1.8.1.5 添加多个属性和默认值

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



#### 1.8.1.6 继承属性

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



### 1.8.2 检测变化的注意事项

- 受现代 JavaScript 的限制 (而且 `Object.observe` 也已经被废弃)，Vue **不能检测到对象属性的添加或删除**。由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：

```js
var vm = new Vue({
  data:{
    a:1
  }
})

vm.a = 2 // `vm.a` 是响应的
vm.b = 2 // `vm.b` 是非响应的
```

- Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。然而它可以使用 `Vue.set(object, key, value)` 方法将响应属性添加到嵌套的对象上：

```js
Vue.set(vm.someObject, 'b', 2)
```

- 您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```js
this.$set(this.someObject,'b',2)
```

- 有时你想向一个已有对象添加多个属性，例如使用 `Object.assign()` 或 `_.extend()` 方法来添加属性。但是，这样添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

- 总的来说：

```js
let vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
vm.someObject = Object.assign({}, vm.someObject, { a: 1, b: 2 })
Vue.set(vm.someObject, 'c', 2)
console.log(vm.someObject); // {a: 1, b: 2, c: 2}
```

### 1.8.3 异步更新队列（nextTick）

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

