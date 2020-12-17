

# 一、基础



- `后端路由`：对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；
- `前端路由`：对于单页面应用程序来说，主要通过`URL`中的`hash`(#号)来实现不同页面之间的切换，同时，`hash`有一个特点：`HTTP`请求中不会包含`hash`相关的内容；所以，单页面程序中的页面跳转主要用`hash`实现；在单页面应用程序中，这种通过`hash`改变来切换页面的方式，称作`前端路由`（区别于后端路由）；

## 1.1 创建路由

### 1.1.1 安装 vue-router 路由模块

```html
npm i vue-router
```

### 1.1.2 引入模块

```js
import Router from 'vue-router'
```

### 1.1.3 作为vue插件

```js
Vue.use(Router)
```

### 1.1.4 创建路由实例对象

- 创建一个路由对象， 当 导入 `vue-router` 包之后，在 window 全局对象中，就有了一个 `路由的构造函数`，叫做 `VueRouter`。

- 在 new 路由对象的时候，可以为构造函数，传递一个配置对象。配置对象中有一个routes属性

- routes ：这个配置对象中的 routes 表示 【路由匹配规则】 的意思

- 每个路由规则，都是一个对象，这个规则对象身上有必须的两个属性：
	> - `path`： 表示监听哪个路由链接地址； 
	> - `component`： 用 Vue.js + Vue Router 创建单页应用，是非常简单的。使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 Vue Router 添加进来，我们需要做的是，将组件 (components) 映射到路由 (routes)，然后告诉 Vue Router 在哪里渲染它们。
	
	```js
	// 组件的模板对象
	var login = {
	  template: '<h1>登录组件</h1>'
	}
	var register= {
	  template: '<h1>注册组件</h1>'
	}
	
	var router = new VueRouter({
	  routes: [
	    {
	        path: '/login',
	        component: login
	    },
	    {
	        path: '/register',
	        component: register
	    }
	]
	})
	```
	
	

### 1.1.5 注册到 vm 实例

- 将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件。

```js
var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  //router: router  将路由规则对象，注册到 vm 实例上，用来监听 URL 地址的变化，然后展示对应的组件
  router	//es6简写
})
```

**完整的代码**

- router.js

```js
import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: login
    }
  ]
});
```
- main.js

```js
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
  el: '#app',
  router, // 注入路由
  components: { App },
  template: '<App/>'
})
```

- 通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：

```js
// Home.vue
export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
```

- 留意一下 `this.$router` 和 `router` 使用起来完全一样。我们使用 `this.$router` 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/image-20200515112157419.png)

###  1.1.6 router-view

- `<router-view>` 组件是一个 functional 组件，渲染路径匹配到的视图组件。`<router-view>` 渲染的组件还可以内嵌自己的 `<router-view>`，根据嵌套路径，渲染嵌套组件。

- 其他属性 (非 router-view 使用的属性) 都直接传给渲染的组件， 很多时候，每个路由的数据都是包含在路由参数中。

- `<router-view />` 这是 vue-router 提供的元素，专门用来 当作`占位符`的，将来路由规则匹配到的组件就会展示到这个 router-view 中去。

  ```html
  <div id="app">
     <router-view></router-view>
  </div>
  ```

- 因为它也是个组件，所以可以配合 `<transition>` 和 `<keep-alive>` 使用。如果两个结合一起用，要确保在内层使用 `<keep-alive>`：

  ```html
  <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
  ```

- 这个时候就可以在地址栏手动的切换页面了。当然，我们也可以使用a标签进行切换，我们只需要在a标签的href里面使用#加path路径的方法就可以切换到相应组件。

  ```html
  <div id="app">
      <a href="#/login">登录</a>
      <a href="#/register">注册</a>
      <router-view></router-view>
  </div>
  ```

- 官方不推荐使用 a 标签，官方给我们提供了一个新的标签`router-link`

  ```html
  <router-link to="/login">登录</router-link>
  <router-link to="/register">注册</router-link>
  ```

## 1.2 router-link

- `<router-link>` 组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 `to` 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签，可以通过配置 `tag` 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。
- `<router-link>` 比起写死的 `<a href="...">` 会好一些，理由如下：
  
  > - 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
  > - 在 HTML5 history 模式下，`router-link` 会守卫点击事件，让浏览器不再重新加载页面。
  > - 当你在 HTML5 history 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写 (基路径) 了 

- `将激活 class 应用在外层元素`：有时候我们要让激活 class 应用在外层元素，而不是 `<a>` 标签本身，那么可以用 `<router-link>` 渲染外层元素，包裹着内层的原生 `<a>` 标签：

  ```html
  <router-link tag="li" to="/foo">
    <a>/foo</a>
  </router-link>
  ```

- 在这种情况下，`<a>` 将作为真实的链接 (它会获得正确的 `href` 的)，而 "激活时的 CSS 类名" 则设置到外层的 `<li>`。



### 1.2.1 to

- 类型: `string | Location`
- required
- 表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个`字符串`或者是`描述目标位置的对象`。

```html
<!-- 字符串 -->
<router-link to="home">Home</router-link>
<!-- 渲染结果 -->
<a href="home">Home</a>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link :to="'home'">Home</router-link>

<!-- 使用path -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>
```



### 1.2.2 replace

- 类型: `boolean`

- 默认值: `false`

- 设置 `replace` 属性的话，当点击时，会调用 `router.replace()` 而不是 `router.push()`，于是导航后不会留下 history 记录。

  ```html
  <router-link :to="{ path: '/abc'}" replace></router-link>
  ```



### 1.2.3 append

- 类型: `boolean`

- 默认值: `false`

- 设置 `append` 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`

  ```html
  <router-link :to="{ path: 'relative/path'}" append></router-link>
  ```

### 1.2.4 tag

- 类型: `string`

- 默认值: `"a"`

  有时候想要 `<router-link>` 渲染成某种标签，例如 `<li>`。 于是我们使用 `tag` prop 类指定何种标签，同样它还是会监听点击，触发导航。

  ```html
  <router-link to="/foo" tag="li">foo</router-link>
  <!-- 渲染结果 -->
  <li>foo</li>
  ```

### 1.2.5 exact

- 类型: `boolean`

- 默认值: `false`

- "是否激活" 默认类名的依据是 **inclusive match** (全包含匹配)。 举个例子，如果当前的路径是 `/a` 开头的，那么 `<router-link to="/a">` 也会被设置 CSS 类名。按照这个规则，每个路由都会激活`<router-link to="/">`！想要链接使用 "exact 匹配模式"，则使用 `exact` 属性.

- exact 精确匹配，通常用于防止在匹配根路径下面的路径的时候将根路径给匹配上了

  ```html
  <router-link to="/" tag="li" exact>
      <a href=""> </a>
  </router-link>
  <router-link to="/document" tag="li">
      <a href=""> </a>
  </router-link>
  ```



### 1.2.7 active-class

- 类型: `string`

- 默认值: `"router-link-active"`

- 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 `linkActiveClass` 来全局配置。通过激活类名可以设置导航激活时的样式

  ```css
  .router-link-active{
      background: hotpink;
      color: #fff;
  }
  ```

- 给单独的链接定义类名

  ```html
  <router-link  :to="{ path: '/login'}" active-class=”myclass”></router-link>
  ```

- 在路由中自定义类名

  ```js
  linkActiveClass: 'myactive'
  ```

  

### 1.2.8 exact-active-class

- 类型: `string`
- 默认值: `"router-link-exact-active"`
- 配置当链接被精确匹配的时候应该激活的 class。注意默认值也是可以通过路由构造函数选项 `linkExactActiveClass` 进行全局配置的。

### 1.2.9 event

- 类型: `string | Array<string>`
- 默认值: `'click'`
- 声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组。`event` 属性可以改变触发链接的方式，类似于事件。以下代码，当鼠标移动上去的时候触发链接进行跳转。

```html
<router-link to="/document" tag="li" event="mouseover"></router-link>
```



## 1.3 Router 构建选项

### 1.3.1 routes

- 类型: `Array<RouteConfig>`

- `RouteConfig` 的类型定义：

  ```js
  declare type RouteConfig = {
    path: string; // 路径
    component?: Component; // 路径匹配的组件
    name?: string; // 命名路由
    components?: { [name: string]: Component }; // 命名视图组件
    redirect?: string | Location | Function; // 重定向
    props?: boolean | Object | Function;
    alias?: string | Array<string>; // 别命名
    children?: Array<RouteConfig>; // 嵌套路由
      beforeEnter?: (to: Route, from: Route, next: Function) => void;
    meta?: any; 
  
    // 2.6.0+
    caseSensitive?: boolean; // 匹配规则是否大小写敏感？(默认值：false)
    pathToRegexpOptions?: Object; // 编译正则的选项
  }
  ```

### 1.3.2 mode

- 类型: `string`

- 默认值: `"hash" (浏览器环境) | "abstract" (Node.js 环境)`

- 可选值: `"hash" | "history" | "abstract"`

- 配置路由模式:
  - `hash`: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
  - `history`: 依赖 HTML5 History API 和服务器配置。查看 [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)。
  - `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。**如果发现没有浏览器的 API，路由会自动强制进入这个模式。**
  
- 路由默认的是 `hash ` 模式，有 `#` , 如果我们不想要 `#` 我们可以设置为 `history` 模式:

  ```js
  export default new Router({
      mode: 'history',
      routes: [
          {
              path: '/',
              name: 'Home',
              component: Home
          }
  
      ]
  })
  ```

  

### 1.3.3 base

- 类型: `string`
- 默认值: `"/"`
- 应用的基路径。例如，如果整个单页应用服务在 `/app/` 下，然后 `base` 就应该设为 `"/app/"`。

### 1.3.4 linkActiveClass

- 类型: `string`
- 默认值: `"router-link-active"`
- 全局配置 `<router-link>` 的默认“激活 class 类名”。

### 1.3.5 linkExactActiveClass

- 类型: `string`
- 默认值: `"router-link-exact-active"`
- 全局配置 `<router-link>` 精确激活的默认的 class。



### 1.3.6  scrollBehavior

- 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

  > 注意: 这个功能只在支持 history.pushState 的浏览器中可用。

- 当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

  ```js
  const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
    }
  })
  ```

- `scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate`导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。这个方法返回滚动位置的对象信息，长这样：

  ```js
  { x: number, y: number }
  { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
  ```

- 如果返回一个 falsy (译者注：falsy 不是 `false`，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值，或者是一个空对象，那么不会发生滚动。举例：

  ```js
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  ```

- 对于所有路由导航，简单地让页面滚动到顶部。返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

  ```js
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  ```

- 如果你要模拟“滚动到锚点”的行为：

  ```js
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
  ```

- 你也可以返回一个 Promise 来得出预期的位置描述：

  ```js
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
  ```

- 将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的。但是考虑到用例的多样性和复杂性，我们仅提供这个原始的接口，以支持不同用户场景的具体实现。





## 1.4 Router 实例属性

### 1.4.1 router.app

- 类型: `Vue instance`
- 配置了 `router` 的 Vue 根实例。

### 1.4.2 router.mode

- 类型: `string`
- 路由使用的[模式](https://router.vuejs.org/zh/api/#mode)。

### 1.4.3 router.currentRoute

- 类型: `Route`
- 当前路由对应的[路由信息对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)。



## 1.5 Router 实例方法

### 1.5.1 router.resolve

- 解析目标位置 (格式和 `<router-link>` 的 `to`  一样)。

- `current` 是当前默认的路由 (通常你不需要改变它)
- `append` 允许你在 `current` 路由上附加路径 (如同 [`router-link`](https://router.vuejs.org/zh/api/#router-link.md-props))

```js
const resolved: {
  location: Location;
  route: Route;
  href: string;
} = router.resolve(location, current?, append?)
```

### 1.5.2 router.addRoutes

- 动态添加更多的路由规则。参数必须是一个符合 `routes` 选项要求的数组。

```js
router.addRoutes(routes: Array<RouteConfig>)
```

### 1.5.3 router.onReady

- 该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。这可以有效确保服务端渲染时服务端和客户端输出的一致。
- 第二个参数 `errorCallback` 只在 2.4+ 支持。它会在初始化路由解析运行出错 (比如解析一个异步组件失败) 时被调用。

```js
router.onReady(callback, [errorCallback])
```

### 1.5.4 router.onError

- 注册一个回调，该回调会在路由导航过程中出错时被调用。注意被调用的错误必须是下列情形中的一种：
  - 错误在一个路由守卫函数中被同步抛出；
  - 错误在一个路由守卫函数中通过调用 `next(err)` 的方式异步捕获并处理；
  - 渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误。

```js
router.onError(callback)
```



## 1.6 路由传参方式

### 1.6.1 params 动态路由匹配

- 我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“`动态路径参数`”(dynamic segment) 来达到这个效果：
- 通过path路径后面传参，在标签解析的时候将值给传进去。

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

- 现在呢，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。
- 一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新 `User` 的模板，输出当前用户的 ID：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

- 你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

- 除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等。

####  `props` 将组件和路由解耦

- 取代与 $route 的耦合

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

- 通过 props 解耦

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }, // 如果 props 被设置为 true，route.params 将会被设置为组件属性

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

- 这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。

#### 响应路由参数变化

- 提醒一下，当使用路由参数时，例如从 `/user/1` 导航到 `/user/2`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。
- 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

- 或者使用  `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 1.6.2 捕获所有路由

常规参数只会匹配被 `/` 分隔的 URL 片段中的字符。如果想匹配**任意路径**，我们可以使用通配符 (`*`)：

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

当使用*通配符*路由时，请确保路由的顺序是正确的，也就是说含有*通配符*的路由应该放在最后。路由 `{ path: '*' }` 通常用于客户端 404 错误。如果你使用了*History 模式*，请确保[正确配置你的服务器](https://router.vuejs.org/zh/guide/essentials/history-mode.html)。

当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```



## 1.7 嵌套路由

- 实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。

- 三个组件模板对象。其中 `account` 是父组件模板对象，`login` 和 `register`都是子路由模板对象。

```js
// 组件的模板对象
var account = {
  template: '#tmpl'
}

var login = {
  template: '<h3>登录</h3>'
}

var register = {
  template: '<h3>注册</h3>'
}
```

- HTML布局，从最大的开始，在app里面有一个account链接，点击跳转到account组件。app里面的router-view也就是account组件的占位符。
- 在account组件里面有一个h标签和登录、注册两个链接，分别跳转到login和register组件，下面的router-view是这两个组件的占位符。

```html
<div id="app">
  <router-link to="/account">Account</router-link>
  <router-view></router-view>
</div>
```

```html
<template id="tmpl">
  <div>
    <h1>这是 Account 组件</h1>
    <router-link to="/account/login">登录</router-link>
    <router-link to="/account/register">注册</router-link>
    <router-view></router-view>
  </div>
</template>
```

- 在router路由里面，父级路由里面有一个`children`属性。在这个属性里面就可以`嵌套子路由`，但是要注意，一定不要加`/`，加`/`表示从根路径显示。

```js
var router = new VueRouter({
  routes: [
    {
      path: '/account',
      component: account,
      // 使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
      children: [
        { path: 'login', component: login },
        { path: 'register', component: register }
      ]
    }
  ]
})
```

- 当有子路由的时候就不用给父路由设置名字，只需要给默认子路由设置名字

```js
{ 
    path: '/about', component: about,
    children: [
        { path: '/', name: 'about', component: study},  /* 当有子路由的时候就不用给父路由设置名字，只需要给默认子路由设置名字 */
        {path: 'study', component: study, name:'study'},
        { path: 'work', component: work, name:'work'},
        { path: 'hobby', component: hobby, name:'hobby'}
    ]

}
```

- 以上路由嵌套我们可以看到，如果有多层嵌套就很麻烦，所以我们可以用命名路由，直接填写子路由的名字，他会自动的将路由拼接出来。

```jsx
<ul class="nav nav-tabs">
    <router-link :to="{name:'about'}" tag="li"  exact ><a>Study</a></router-link>
    <router-link :to="{name:'work'}"  tag="li" ><a>Work</a></router-link>
    <router-link :to="{name:'hobby'}" tag="li" ><a>Hobby</a></router-link>
</ul>
```

- 等同于

```html
<ul>
    <li ><a href="/about/">Study</a></li> 
    <li ><a href="/about/work">Work</a></li> 
    <li ><a  href="/about/hobby">Hobby</a></li>
</ul>
```



## 1.8 命名路由

- 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
}
```

- 要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

- 这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

- 这两种方式都会把路由导航到 `/user/123` 路径。



## 1.9 命名视图

- 有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

- 所谓的命名视图就是给 `router-view` 加`name`属性。在同级展示多个视图，而不是嵌套展示

```html
<div id="app">
  <router-view></router-view>
  <div class="container">
    <router-view name="left"></router-view>
    <router-view name="main"></router-view>
  </div>
</div>
```

```js
var header = {
  template: '<h1 class="header">Header头部区域</h1>'
}
var leftBox = {
  template: '<h1 class="left">Left侧边栏区域</h1>'
}
var mainBox = {
  template: '<h1 class="main">mainBox主体区域</h1>'
}
```

- 在routes里面的根路径的component要放置多个组件，所以要加s，然后给每个组件加上属性，属性值给组件的模板对象。`defaule` 则为没有添加name属性的路由。

```js
var router = new VueRouter({
  routes: [
    {
      path: '/', components: {
        'default': header,
        'left': leftBox,
        'main': mainBox
      }
    }
  ]
})
```

## 2.0 重定向和别名

### 2.0.1 redirect重定向

- 重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

- 重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

- 甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: to => {
            // 方法接收 目标路由 作为参数
            // return 重定向的 字符串路径/路径对象
            if(to.path === '/123') return '/home'
            else if(to.path === '/456') return '/document'
            else return '/about'
        }}
    ]
})
```



### 2.0.2 别名

“重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么“别名”又是什么呢？

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为` /b`，但是路由匹配则为 `/a`，就像用户访问` /a` 一样。

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。

> 匹配优先级：有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

## 2.0 编程式导航

- 除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

- 想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

  > - this.$route.back()              	回退一步
  > - this.$route.forward()                前进一步
  > - this.$route.go(n)                         指定前进回退步数，正数为前进，负数为后退
  > - this.$route.push()                     导航到不同url，向history栈添加一个新的记录
  > - this.$route.replace()                 导航到不同url，替换history栈中当前记录
  > - 注意：Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。

  ```js
  methods: {
    backHandle () {
      this.$route.back()	//后退一步
    },
    forwardHandle () {
      this.$route.forward()	//前进一步
    },
    
    /**
    这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
    **/
    goHandle () {
      this.$route.go(3)	//前进3步
      this.$route.go(-3)	//后退3步
      this.$route.go(0)	//当前导航栏刷新
      this.$route.go(300) //超出浏览器记录无效
    },
    
    /**
    push 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。
    **/
    pushHandle () {
      // 字符串
      router.push('home')
      // 对象
      router.push({ path: 'home' })
      // 命名的路由
      router.push({ name: 'user', params: { userId: '123' }}) // -> /user/123
      // 带查询参数 这里的 params 不生效
      router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private
    },
    
    /**
    router.replace 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
    **/
    replaceHandle(){
      <router-link :to="..." replace> // 声明式
       router.replace(...)	// 编程式
    }
    replaceHandle () {
      this.$route.replace()
    }
  }
  ```

  

# 二、进阶

## 1.1 导航守卫（路由钩子函数）

- 正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。
- 记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过[观察 `$route` 对象](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

- 执行钩子函数的 位置

  > - router 全局
  > - 单个路由中
  > - 组件中

- 钩子函数

  > - router 实例上：beforeEach、beforeResolve 、afterEach	(只要切换导航，钩子函数就会立即触发)
  > - 单个路由中：beforeEnter
  > - 组件内的钩子：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

### 1.1.1 全局守卫

#### 1. beforeEach

- 全局前置守卫

- 你可以使用 `router.beforeEach` 注册一个全局前置守卫，当一个导航`触发`时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

- 进入导航的时候执行，参数有三个：

  > **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
  >
  > **from: Route**: 当前导航正要离开的路由
  >
  > **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  >
  > - **next()**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  > - **next(false)**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  > - **next('/') 或者 next({ path: '/' })**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  > - **next(error)**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

  ```js
  import Vue from 'vue';
  import Router from 'vue-router';
  import Home from '@/container/home/home.component.vue';
  import Document from '@/container/document/document.component.vue';
  
  Vue.use(Router);
  
  let router = new Router({
      mode: 'history',
      routes: [
          {
              path: '/',
              name: 'index',
              alias: '/index',
              component: Home
          },
          {
              path: '/document',
              name: 'document',
              component: Document
          }
      ]
  })
  router.beforeEach((to, from, next) => {
      console.log("beforeEach");
      next();
  })
  export default router;
  ```

  > 注意：确保要调用 next 方法，否则钩子就不会被 resolved。

#### 2. beforeResolve

- 全局解析守卫

- 在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。



#### 3. afterEach

- 全局后置钩子

- 进入导航后，同样的有参数 to 和 from，但是就不存在next了

- 举个例子，我们可以使用这个方法去改变网站的标题，当前在此之前我们需要在meta元数据中添加title属性

  ```js
  router.afterEach((to, from) => {
      if(to.meta.title){
          window.document.title = to.meta.title
      }else{
          window.document.title = 'qita'
      }
  })
  ```

### 1.1.2 路由独享守卫

#### beforeEnter

- 你可以在路由配置上直接定义 `beforeEnter` 守卫，进入路由时执行，同样的有 to from next 三个参数。注意：没有afterEnter

  ```js
  const router = new VueRouter({
    routes: [
      {
        path: '/foo',
      component: Foo,
        beforeEnter: (to, from, next) => {
          // ...
        }
      }
    ]
  })
  ```

> 执行顺序：beforeEach( next() )-->beforeEnter( next() )-->afterEach

### 1.1.3  组件内的守卫

#### 1. beforeRouteEnter

- 进入组件时触发，注意：此时`vm`实例还没有创建，`this`为`undefined`，同样的也就拿不到 `data` 里面的数据。但是，在 `next `里面参数为一个回调函数，回调函数的参数为 vm 实例。

  ```js
  data (){
      return {
          test: '改变前'
      }
  }
  beforeRouteEnter(to, from, next){
      next(vm=>{
          vm.test = '改变了';
      })
  }
  ```

  

#### 2. beforeRouteUpdate

- 在当前路由改变，但是该组件被复用时调用（如动态路由），同样的接受三个参数。

  ```js
  beforeRouteUpdate(to, from, next){
  	next()
  }
  ```

  

#### 3. beforeRouteLeave

- 离开组件时触发，同样接受三个参数。

- 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

  ```js
  beforeRouteLeave (to, from , next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
  ```

  

> 注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。



#### 1.1.4 完整的导航解析流程

> ==> 导航被触发。
>
> ==> 在失活的组件里调用离开守卫 `beforeRouteLeave` 。
>
> ==> 调用全局的 `beforeEach` 守卫。
>
> ==> 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
>
> ==> 在路由配置里调用 `beforeEnter`。
>
> ==> 解析异步路由组件。
>
> ==> 在被激活的组件里调用 `beforeRouteEnter`。
>
> ==> 调用全局的 `beforeResolve` 守卫 (2.5+)。
>
> ==> 导航被确认。
>
> ==> 调用全局的 `afterEach` 钩子。
>
> ==> 触发 DOM 更新。
>
> ==> 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

钩子函数执行顺序：

> beforeEach --> beforeRouteUpdate（如果组件重用） --> beforeEnter --> beforeRouteEnter --> 
>
> beforeResolve --> afterEach --> beforeRouteLeave --> beforeEach

## 1.2 路由元信息 meta

- 定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

- 那么如何访问这个 `meta` 字段呢？
- 首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录
- 例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。
- 一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.meta` 属性。

- 

```js
router.beforeEach((to, from, next) => {
	console.log('meta',to.meta)
})
```

> 在组件中可以使用 `this.$route.meta`访问

## 1.3 过渡动效

`` 是基本的动态组件，所以我们可以用 `` 组件给它添加一些过渡效果：

```html
<transition>
  <router-view></router-view>
</transition>
```

[Transition 的所有功能](https://cn.vuejs.org/guide/transitions.html) 在这里同样适用。

### 1.3.1 单个路由的过渡

上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用 `transition` 并设置不同的 name。

```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```

### 1.3.2 基于路由的动态过渡

还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```js
// 接着在父组件内 watch $route 决定使用哪种过渡
watch: {
    '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
}
```



## 1.4 滚动行为

### 1.4.1 基本

- 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

  > 注意: 这个功能只在支持 history.pushState 的浏览器中可用

- 当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

  ```js
  const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
    }
  })
  ```

- `scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate`导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

- 这个方法返回滚动位置的对象信息，长这样：

  ```js
  { x: number, y: number }
  { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
  ```

- 如果返回一个 falsy (译者注：falsy 不是 `false`，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值，或者是一个空对象，那么不会发生滚动。

  ```js
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
  ```

- 对于所有路由导航，简单地让页面滚动到顶部。返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

  ```js
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  ```

- 如果你要模拟“滚动到锚点”的行为：

  ```js
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
  ```

- 我们还可以利用[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)更细颗粒度地控制滚动。查看完整例子请[移步这里](https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js)。

### 1.4.2 异步滚动

- 你也可以返回一个 Promise 来得出预期的位置描述：

  ```js
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  }
  ```

- 将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的。但是考虑到用例的多样性和复杂性，我们仅提供这个原始的接口，以支持不同用户场景的具体实现。



## 1.5 路由懒加载

### 1.5.1 基本

- 当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

- 结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载。

- 首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

  ```js
  const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
  ```

- 第二，在 Webpack 2 中，我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：

  ```js
  import('./Foo.vue') // 返回 Promise
  ```

  > 注意：如果您使用的是 Babel，你将需要添加 [`syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件，才能使 Babel 可以正确地解析语法。

- 结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

  ```js
  const Foo = () => import('./Foo.vue')
  ```

- 在路由配置中什么都不需要改变，只需要像往常一样使用 `Foo`：

  ```js
  const router = new VueRouter({
    routes: [
      { path: '/foo', component: Foo }
    ]
  })
  ```

- 最终结果：

  ```js
  import Vue from 'vue';
  import Router from 'vue-router';
  
  Vue.use(Router)
  const router = new Router({
      mode: 'history',
      routes: [
          { 
              path: '/', 
              name: 'home', 
              component: () => import("container/home/home") 			
          },
          {
              path: '/index/about',
              name: 'about',
              component: () => import("container/about/about")
          },
      ]
  })
  
  export default router
  ```
  
  

### 1.5.2 把组件按组分块

- 有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

- Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。


