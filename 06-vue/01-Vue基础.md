## 一、Vue初步

## 1.1 Vue简单认识

- Vue (读音 /vjuː/，类似于 `view`) 是一套用于构建用户界面的`渐进式框架`。与其它大型框架不同的是，Vue 被设计为可以`自底向上逐层`应用。Vfue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与`现代化的工具链`以及各种`支持类库`结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
- `vue.js`、`Angular.js`、`React.js`并称前端三大主流框架！
- Vue.js是一套构建用户界面的框架，只关注视图层，不仅易于上手，还便于第三方库或既有项目整合。（Vue有配套的第三方类库，可以整合起来做大型项目的开发）
- 前端的主要工作？主要负责`MVC`中的`V`这一层；主要工作就是和界面打交道，来制作前端页面效果；
- `兼容性`：Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性。但它支持所有兼容ECMAScript 5 的浏览器。

## 1.2 Vue 的 MVVM对应关系

### 1.2.1 创建一个Vue实例

- 每个 Vue 应用都是通过用 `Vue 函数`创建一个新的 `Vue 实例`开始的。
- 创建一个`Vue的实例` 当我们导入包之后，在浏览器的内存中，就多了一个 `Vue` `构造函数`。
- 一个 Vue 应用由一个通过 `new Vue` 创建的根 `Vue 实例`，以及可选的`嵌套的`、`可复用的组件`树组成。所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。

> - `el`:  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个HTMLElement 实例。在实例挂载之后，元素可以用 `vm.$el` 访问。表示，要控制页面上的哪个区域。这个区域就是MVVM中的 v (view层)
> - `data`: 这里的 data 就是 MVVM中的 M （`model层`），专门用来保存 每个页面的数据的 data 属性中，存放的是 el 中要用到的数据
> - `vm`: 实例化的Vue就是MVVM中的 `VM`（调度者） 层
> - `template`：一个字符串模板作为 Vue 实例的标识使用。模板将会 **替换** 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。
> - `render`：字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。（更多内容见Vue进阶）

 ```html
<div id="app">
    <p>{{ msg }}</p>
</div>

<script>
    var vm = new Vue({
        el: '#app', 
        data: {
            msg: '欢迎学习Vue' 
        }
    })
</script>
 ```

- 以上代码，虽然没有完全遵循 `MVVM 模型`，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。
- `msg` 通过 Vue 提供的指令，很方便的就能把数据渲染到页面上，程序员不再手动操作DOM元素了【前端的Vue之类的框架，不提倡我们去手动操作DOM元素了】



### 1.2.2  数据与方法

- 当一个 Vue 实例被创建时，它向 Vue 的`响应式系统`中加入了其 `data` 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
// 我们的数据对象
var data = { a: 1 }
// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
    data: data
})
```

- 我们可以通过`data.a`去获取绑定在data上的a属性，也可以直接通过vm实例获取到

```js
vm.a == data.a // => true
```

- 设置属性也会影响到原始数据

```js
vm.a = 2
data.a // => 2
```

- 反之亦然

```js
data.a = 3
vm.a // => 3
```

- 当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时 `data` 中存在的属性才是`响应式`的。也就是说如果你添加一个新的属性，不会触发任何视图的更新。

- 如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些`初始值`。比如：

```js
var vm = new Vue({
   data: {
      newTodoText: '',
      visitCount: 0,
      hideCompletedTodos: false,
      todos: [],
      error: null
	}
})
```



### 1.2.3 {{}} 插值表达式

- 在data里面的属性通过`{{}}`插值表达式可以直接渲染到页面中

```js
var vm = new Vue({
   el: '#app',
   data: {
      foo: 'bar'
   }
})
```

- 在data里面定义了的属性可以直接通过插值表达式渲染在页面。

```html
<div id="app">
   <p>{{ foo }}</p>
</div>
```

### 1.2.4 总结

- 到此为止，我们的MVVM就解析完毕：

> - M即为data
> - V为HTML页面
> - VM为Vue实例

## 1.3 基本指令

### 1.3.1 v-cloak

- 这个指令保持在元素上直到关联实例`结束编译`。使用 v-cloak 能够解决 插值表达式`闪烁`的问题，也就是当网络较差时，请求Vue就会变得很慢，这时候`{{ msg }}`就会显示在页面中，这肯定不是我们想看到的，那么我们就需要使用`v-cloak`让没有加载到Vue的元素先隐藏，当加载完毕以后再去掉`v-cloak`这个类。

```css
[v-cloak] {
   display: none; 
}
```

```html
<p v-cloak>{{ msg }}</p>
```



### 1.3.2 v-text

- 和`{{}}`没有太大区别，也是`渲染数据`所用。语法：

```html
<h4 v-text="msg">我是h4标签</h4>
```

- 那么和`{{}}`有什么区别呢？

> - 默认 v-text 是没有闪烁问题的
> - v-text会覆盖元素中原本的内容，但是插值表达式只会替换自己的这个占位符，不会把整个元素的内容清空

- 例如：

```html
<p>++++++++ {{ msg }} +++++++++</p>
<h4 v-text="msg">==================</h4>
```

- 结果：

```shell
++++++++ 123 +++++++++
123
```



### 1.3.3 v-html

- 现在，在data里面有`msg`属性，值里面有h1标签，如果我们使用插值表达式和`v-text`，都不能渲染里面的h1标签

```html
data: {
  msg: '<h1>哈哈，我是一个大大的H1， 我大，我骄傲</h1>',
}
```

- 那么，这个时候我们就使用`v-html`，就能够渲染出h1标签了。同时，也会覆盖标签里面的所有内容。

```html
<div v-html="msg"></div>
```

- 主要用于渲染`字符串类型的html`

> 你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。

### 1.3.4 v-bind

- `v-bind:` 是 Vue中，提供的用于`绑定属性`的指令。缩写：`：`，v-bind里面的内容会被当做`JavaScript`代码执行。如果v-bind里面的值不加引号，则会被当做data里面的变量。

```js
data: {
  mytitle: '这是一个自己定义的title'
}
```

- 以上，在data里面有`mytitle`属性，我们要让他绑定在以下的input按钮的title上。

```html
<input type="button" value="按钮" v-bind:title="mytitle + '123'">
```

> 注意： v-bind: 指令可以被简写为“`:要绑定的属性`”，v-bind 中，可以写合法的JS表达式。

 

### 1.3.5 v-on

- Vue 中提供了 `v-on`: `事件绑定机制`。可以绑定JavaScript中的任意事件。`v-on`可以简写为`@`。

- 在这里我们首先要学习一个Vue里的属性`methods`，在`methods`属性中定义了当前Vue实例所有可用的`方法`。

```js
methods: { 
  show: function () {
    alert('Hello')
  }
}
```

- 这个时候我们可以使用`v-on`在input里面绑定事件，show相当于是事件函数。

```html
<input type="button" value="按钮" v-on:click="show">
```

- 或者

```html
<input type="button" value="按钮" @click="show">
```

> 注意：时间绑定机制中，微元素指定处理函数的时候，如果加了小括号就可以传参了，这是和没有加括号的唯一区别。

#####  拿取event事件对象

```html
<input type="button" value="按钮" v-on:click="show">
```

```js
methods: {
    show(event) {
        console.log(event) // event事件对象
    }
}
```

如果函数既需要event又需要传参

```html
<input type="button" value="按钮" v-on:click="show($event, true)">
```

```js
methods: {
    show(event,data) {
        console.log(event,data) // event事件对象以及传入的参数
    }
}
```



### 1.3.6 v-if 和 v-show

#### 1.3.6.1 v-if 和 v-show

- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

- `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

- 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

- 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

```html
<div id="app">
  <input type="button" value="toggle" @click="flag=!flag">
  <h3 v-if="flag">这是用v-if控制的元素</h3>
  <h3 v-show="flag">这是用v-show控制的元素</h3>
</div>
```

```js
data: {
  flag: false
}
```



#### 1.3.6.2 v-else 和 v-else-if

```html
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else-if="type === 'C'"> C </div>
<div v-else> Not A/B/C </div>
```

#### 1.3.6.3 用 `key` 管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
<div @click="click">点击切换</div>
```

那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`` 不会被替换掉——仅仅是替换了它的 `placeholder`。

这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` attribute 即可：

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
<div @click="click">点击切换</div>
```

现在，每次切换时，输入框都将被重新渲染

> 注意，`` 元素仍然会被高效地复用，因为它们没有添加 `key` attribute。



### 1.3.7 v-model双向数据绑定

- 单向数据绑定：从`M`（数据）层，绑定到`V`（view）层。也就是通过代码`定义数据变量`能渲染到HTML页面。

- 双向数据绑定：从`M`（数据）层，绑定到`V`（view）层。也能从`V`层绑定到`M`层。也就是能通过代码定义数据变量能渲染到HTML页面，也能在页面修改数据同步到代码定义的数据变量。

- `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

  > - text 和 textarea 元素使用 `value` property 和 `input` 事件；
  > - checkbox 和 radio 使用 `checked` property 和 `change` 事件；
  > - select 字段将 `value` 作为 prop 并将 `change` 作为事件。

#### 1.3.7.1 示例

- v-bind 只能实现数据的单向绑定，从 `M` 自动绑定到 `V`， 无法实现数据的`双向绑定`。

```html
<input type="text" v-bind:value="msg"> 
```

- 使用  `v-model` 指令，可以实现 表单元素和 Model 中`双向数据绑定`。表单元素：input(radio, text, address, email....)   select    checkbox   textarea等等。

```html
<input type="text" v-model="msg">
```

> 注意： v-model 只能运用在表单元素中



#### 1.3.7.2 原理

- 首先双向绑定绑定属性value，这是由module层到 view 层，然后由 `onInput` 事件绑定监听input值得变化，当值发生改变的时候将 module 层的值改变为input变化的值，最后再通过 vue 的响应式属性将改变后的module 层的值给同步到 view 层，从而实现双向绑定。而属性的响应式又是由对象的 getters 和 setter 属性实现的。

```js
export default {
  data () {
    return {
      msg: ''
    }
  }
}
```

```html
<input type="text" v-model="msg"> 
```

- 等价于

```html
<input type="text" v-bind:value="msg" @input="msg=$event.target.value"> 
```

#### 1.3.7.3 修饰符

##### 1. lazy

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip)输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

##### 2. number

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符（此时type可以不用写）：

```html
<input v-model.number="age" type="number"> 
```

这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 `parseFloat()` 解析，则会返回原始的值。

##### 3.trim

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```html
<input v-model.trim="msg">
```

### 1.3.8 v-for指令

- 我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

#### 1.3.8.1 基本使用

- `参数一`：是每一项的值。
- `参数二`：索引。
- v-for 需要指定唯一的key，使区分不同的项。通常使用索引来进行区分。 

##### 1. 遍历数组

```html
<div id="app">
	<p v-for="(item,i) in list" :key="i">每一项：{{item}}</p>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    list: [1, 2, 3, 4, 5, 6]
  },
  methods: {}
});
```

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```html
<div v-for="item of items"></div>
```

##### 2. 遍历对象

- 在遍历对象身上的键值对的时候：
  - `参数一`：值
  - `参数二`：键值。
  - `参数三`：索引。

```html
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>		
```

```json
user = {
  id: 1,
  name: '托尼·屎大颗',
  gender: '男'
}
```

```html
<div id="app">
  <p v-for="(val, key, i) in user">值是： {{ val }} --- 键是： {{key}} -- 索引： {{i}}</p>
</div>
```

> 注意：当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。

##### 3. 迭代数字

- in 后面我们放过  `普通数组`，`对象数组`，`对象`， 还可以放`数字`。如果使用 v-for 迭代数字的话，前面的 `count` 值从 `1` 开始。

```html
<div id="app">
  <p v-for="count in 10">这是第 {{ count }} 次循环</p>
</div>
```



#### 1.3.8.2 v-for中key属性的使用

- `v-for` 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个 `key` 的特殊属性：

```html
<div v-for="item in items" :key="item.id">
  {{ item.text }}
</div>
```

> 注意：key 在使用的时候，必须使用 v-bind 属性绑定的形式，指定 key 的值。key 必须是唯一的。不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。

#### 1.3.8.3 `v-for` 与 `v-if` 一同使用

>  注意我们**不**推荐在同一元素上使用 `v-if` 和 `v-for`。更多细节可查阅[风格指南](https://cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起-必要)。

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，如下：

```html
<li v-for="todo in todos" v-if="!todo.isComplete"> {{ todo }} </li>
```

上面的代码将只渲染未完成的 todo。

而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 [`](https://cn.vuejs.org/v2/guide/conditional.html#在-lt-template-gt-中配合-v-if-条件渲染一整组)) 上。如：

```html
<ul v-if="todos.length">
  <li v-for="todo in todos"> {{ todo }} </li>
</ul>
```

###  1.3.9 v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```html
<span v-pre>{{ this will not be compiled }}</span>
```

### 1.3.10 v-once

- 只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

- 渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了**大量**静态内容。在这种情况下，你可以在根元素上添加 `v-once` 特性以确保这些内容只计算一次然后缓存起来，就像这样：

  ```html
  <!-- 单个元素 -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 有子元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- 组件 -->
  <my-component v-once :comment="msg"></my-component>
  <!-- `v-for` 指令-->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```



### 1.3.11 动态参数

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<a :[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 属性 `attributeName`，其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，`v-on:[eventName]` 将等价于 `v-on:focus`。

##### 对动态参数的值的约束

动态参数预期会求出一个字符串，异常情况下值为 `null`。这个特殊的 `null` 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

##### 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

```html
<template>
  <div id="test">
    <a :[attr]="'http://www.baidu.com'">百度</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: 'ef'
    };
  },
  computed: {
    attr() {
      return 'hr' + this.bar;
    }
  },
};
</script>

```

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```





## 1.4  事件处理

### 1.4.1 事件修饰符

- 先在这里列出以下我们会用到的函数。

```js
var vm = new Vue({
   el: '#app',
   data: {},
   methods: {
      div1Handler() {
         console.log('这是触发了 inner div 的点击事件')
      },
      btnHandler() {
         console.log('这是触发了 btn 按钮 的点击事件')
      },
      linkClick() {
         console.log('触发了连接的点击事件')
      },
      div2Handler() {
         console.log('这是触发了 outer div 的点击事件')
      }
   }
});
```



#### 1.1.4.1 .stop

- 使用  `.stop`  阻止冒泡。

```html
<div class="inner" @click="div1Handler">
  <input type="button" value="戳他" @click="btnHandler">
</div>
```

- 当我们点击btn按钮的时候，会发生冒泡机制，那么我们可以用`stop`去阻止冒泡

```html
<div class="inner" @click="div1Handler">
  <input type="button" value="戳他" @click.stop="btnHandler">
</div>
```

 

#### 1.1.4.2 . prevent

- 使用 `.prevent` 阻止默认行为。

```html
<a href="http://www.baidu.com" @click.prevent="linkClick">有问题，先去百度</a>
```

阻止a链接进行跳转，只会触发点击事件。

 

#### 1.1.4.3 .capture

- 使用  `.capture` 实现捕获触发事件的机制。捕获和冒泡相反，先触发外层事件，再触发内层事件

```html
<div class="inner" @click.capture="div1Handler">
  <input type="button" value="戳他" @click="btnHandler">
</div>
```

- 当点击btn的时候，先触发inner的事件，再触发btn的事件。

 

#### 1.1.4.4 .self

- 使用 `.self` 实现只有点击当前元素时候，才会触发事件处理函数。

```html
<div class="inner" @click.self="div1Handler">
  <input type="button" value="戳他" @click="btnHandler">
</div> 
```

 

#### 1.1.4.5 .once

- 使用 `.once` 只触发一次事件处理函数。

```html
<a href="http://www.baidu.com" @click.prevent.once="linkClick">有问题，先去百度</a> 
```

 

#### 1.1.4.6 .stop 和 .self 的区别

- `stop`只会阻止自己身上的冒泡行为，不会阻止其他的。比如，点击inner就会冒泡到outer上。

```html
<div class="outer" @click="div2Handler">
  <div class="inner" @click="div1Handler">
    <input type="button" value="戳他" @click.stop="btnHandler">
  </div>
</div>
```

- 同样的，`.self` 只会阻止自己身上冒泡行为的触发，并不会真正阻止 冒泡的行为。比如，以下点击btn，阻止了inner的冒泡，但是还是会冒泡到outer上，点击inner会冒泡到outer上，也就是只会在self以内的会有阻止冒泡效果。

```html
<div class="outer" @click="div2Handler">
  <div class="inner" @click.self="div1Handler">
    <input type="button" value="戳他" @click="btnHandler">
  </div>
</div>
```

- 修饰符可以串联

```html
<a v-on:click.stop.prevent="doThat"></a>
```

```html
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```



> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

### 1.4.2 按键修饰符

- 在监听键盘事件时，我们经常需要检查常见的键值。Vue 允许为 v-on 在监听键盘事件时添加`按键修饰符`：

```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

- 记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```html
<input @keyup.enter="submit">
```

全部的按键别名：

> - .enter
>
> - .tab
>
> - .delete (捕获“删除”和“退格”键)
>
> - .esc
>
> - .space
>
> - .up
>
> - .down
>
> - .left
>
> - .right

- 2.1.0 新增

> - .ctrl
>
> - .alt
>
> - .shift
>
> - .meta

可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：

```js
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```



## 1.5  class 与style绑定

### 1.5.1 class绑定

```css
.red {
   color: red;
}

.thin {
   font-weight: 200;
}

.italic {
   font-style: italic;
}

.active {
   letter-spacing: 0.5em;
}
```



#### 1.5.1.1 数组语法

- 直接传递一个数组。
- 注意： 这里的 class 需要使用  v-bind 做数据绑定，且数组里面的类名一定要使用字符串，不然会当做一个变量。添加什么类就有什么类。

```html
<h1 :class="['thin', 'italic']">这是一个很大很大的H1，大到你无法想象！！！</h1>
```

- 在数组中使用`三元表达式` 在data里面定义一个布尔值类型的`flag`变量 为`true`则显示`active`。

```html
<h1 :class="[ flag?'active':' ' ]">这是一个很大很大的H1，大到你无法想象！！！</h1> 
```



#### 1.5.1.2 对象语法

- 在数组中使用 对象来代替三元表达式，提高代码的可读性。同样的，在data里面定义一个布尔值类型的flag变量 为true则显示active。

```js
data: {
   flag: true
}
```

```html
<h1 :class="['thin', 'italic', {'active':flag} ]">这是一个很大很大的H1，大到你无法想象！！！</h1> 
```

- 在为 class 使用 v-bind 绑定对象的时候，对象的属性是类名，由于对象的属性可带引号，也可不带引号，所以这里我没写引号；  属性的值是一个标识符

```js
data: {
   classObj: { red: true, thin: true, italic: false, active: false }
}
```

```html
<h1 :class="classObj">这是一个很大很大的H1，大到你无法想象！！！</h1>
```



### 1.5.2 style 绑定

#### 1.5.2.1 对象语法

- style也是标签属性，所以也可以进行绑定。主要方式有以下三种：

```js
data: {
   styleObj1: { color: 'red', 'font-weight': 200 },
   styleObj2: { 'font-style': 'italic' }
 }
```

- `v-bind:style` 的对象语法十分直观看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名：

```html
<h1 :style="{ color: 'red', 'font-weight': 200 }">这是一个h1</h1> 
```

- 直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<h1 :style="styleObj1">这是一个h1</h1>
```



#### 1.5.2.2 数组语法

- `v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```html
<h1 :style="[ styleObj1, styleObj2 ]">这是一个h1</h1>
```

> 当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

#### 1.5.1.4 多重值

- 从 `2.3.0` 起你可以为 `style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display:['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

- 这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 `flexbox`，那么就只会渲染 `display: flex`。



# 二、 Vue组件

## 1.1 定义组件

- `组件`： 组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；

- `组件化`和`模块化`的不同：

  > - 模块化： 是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
  > - 组件化： 是从UI界面的角度进行划分的；前端的组件化，方便UI组件的重用；

- 总结：模块化从功能出发，组件化从 UI 角度。

- 组件是可复用的 Vue 实例，且带有一个名字。所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

### 1.1.1 定义组件的方式

#### 1.1.1.1 全局注册组件

- `参数1`：组件即将使用的标签名
- `参数2`：`组件模板对象` 或者` Vue.extend` 创建的组件，将此组件对象通过 `component` 方法注册到全局。

```js
Vue.component('组件的名称', 组件模板对象)
```

- `template 属性`: 指定了组件要展示的HTML结构，返回一个组件模板对象。其中 template 就是组件将来要展示的HTML内容。

```js
Vue.component('myCom1', Vue.extend({
  template: '<h3>这是使用 Vue.extend 创建的组件</h3>'
}))
```
- 或者

```js
Vue.component('mycom2', {
  template: '<div><h3>这是直接使用 Vue.component 创建出来的组件</h3><span>123</span></div>'
})
```

- 如果要使用组件，直接把组件的名称以 HTML 标签的形式引入到页面中即可。如果使用 `Vue.component` 定义全局组件的时候，组件名称使用了 驼峰命名，则在引用组件的时候，需要把大写的驼峰改为小写的字母。同时，两个单词之间使用 `- `连接；

```html
<my-com1></my-com1>
<my-com1></my-com1>
```

> 注意: 每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

#### 1.1.1.2 局部注册组件

- 定义实例内部私有组件的。login为组件名。

```html
<template>
  <div id="app"> <login /> </div>
</template>

<script>
let login = {
  data () {
    return {
      login: '登录组件',
    }
  },
  template: '<div>{{login}}</div>'
}
export default {
  name: 'App',
  data () {
    return {
      app: 'app组件',
    }
  },
  components:{
    login // 将login组件注册在app组件上 login 为 login: login 的简写
  }
}
</script>
```



#### 1.1.1.3 基础组件的自动化全局注册

可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)，它们会在各个组件中被频繁的用到。

如果你恰好使用了 webpack (或在内部使用了 webpack 的 [Vue CLI 3+](https://github.com/vuejs/vue-cli))，那么就可以使用 `require.context` 只全局注册这些非常通用的基础组件。这里有一份可以让你在应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

1. 将这些通用基础组件放置在同一个文件夹下：如 components/baseComponents/（这里我放了BaseText和BaseNumber两个vue组件）
2. 在应用入口文件中全局导入（如：main.js）

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst' //应用模块
import camelCase from 'lodash/camelCase' //转为驼峰命名
// 全局导入组件
const requireComponent = require.context(
    './components/baseComponents', // 其组件目录的相对路径
    false, // 是否查询其子目录
    /Base[A-Z]\w+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式，这里可以匹配的文件名为BaseXxxx.vue格式
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName) // 获取组件配置
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 剥去文件名开头的 `'./` 和结尾的扩展名
            fileName.split('/').pop().replace(/\.\w+$/, '')
        )
    )

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
})
```

3. 使用

```html
<template>
  <div>
    <BaseText></BaseText>
    <BaseNumber></BaseNumber>
  </div>
</template>
```



> 记住**全局注册的行为必须在根 Vue 实例 (通过 `new Vue`) 创建之前发生**。
>
> 结合后面我们学习要学习到的自定义组建的v-model，我们可以做出全局的自定义v-model

### 1.1.2 组件中的data

- Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。**对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**。因此推荐在创建实例之前，就声明所有的根级响应式属性。
- 实例创建之后，可以通过 `vm.$data` 访问原始数据对象。
- Vue 实例也代理了 data 对象上所有的属性，因此访问 `vm.a` 等价于访问 `vm.$data.a`。
- 以 `_` 或 `$` 开头的属性 **不会** 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。
- 当一个**组件**被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

```js
Vue.component('mycom1', {
  template: '<h1>这是全局组件 --- {{msg}}</h1>',
  data () {
    return {
      msg: '这是组件的中data定义的数据'
    }
  }
})
```



## 1.2 组件切换

### 1.2.1 v-if 切换

- 通过v-if进行切换，但是缺陷明显。只能切换两个组件。

```html
<div id="app">
  <a href="" @click.prevent="flag=true">登录</a>
  <a href="" @click.prevent="flag=false">注册</a>

  <login v-if="flag"></login>
  <register v-else="flag"></register>
</div>
```

```js
Vue.component('login', {
  template: '<h3>登录组件</h3>'
})

Vue.component('register', {
  template: '<h3>注册组件</h3>'
})
```

```js
data: {
  flag: false
}
```



### 1.2.2 component 动态组件

- Vue提供了 component ,来展示对应名称的组件。component 是一个占位符, `:is` 属性,可以用来指定要展示的组件的名称。

- 我们只需要给`is` 绑定一个变量，然后在点击`a`标签的时候改变这个变量的值就可以实现组件的切换了。

```html
<div id="app">
  <a href="" @click.prevent="comName='login'">登录</a>
  <a href="" @click.prevent="comName='register'">注册</a>
  <component :is="comName"></component>
</div>

<script>	
// 组件名称是 字符串
Vue.component('login', {
  template: '<h3>登录组件</h3>'
})

Vue.component('register', {
  template: '<h3>注册组件</h3>'
})

// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
  el: '#app',
  data: {
    comName: 'login' // 当前 component 中的 :is 绑定的组件的名称
  }
});
</script>
```



## 1.3 Props

### 1.3.1  Props 的使用

- Prop 是你可以在组件上注册的一些自定义属性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。
- 一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。
- 我们以 Vue 的实例的 data 为父组件，一个新子组件为例子。子组件中默认无法访问到父组件中的data上的数据和methods中的方法。

- 父组件可以在引用子组件的时候， 通过属性绑定（`v-bind:`） 的形式, 把 需要传递给 子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用。`parentmsg`为自定义属性

```html
<div id="app">
  <com1 :parentmsg="msg"></com1>
</div>
```

- 把父组件传递过来的 `parentmsg` 属性，先在 `props` 数组中定义一下，这样，才能使用这个数据。

```js
props: ['parentmsg']
```

- 父组件

```html
<template>
  <Test :parentmsg="show"></Test>
</template>

<script>
export default {
  name: '',
  props: [],
  data() {
    return {
      show: true
    };
  }
};
</script>
```

- 子组件

```html
<template>
  <div id="test">{{parentmsg}}</div>
</template>

<script>
export default {
  props: ['parentmsg'],
  name: 'test',
  data() {
    return {};
  }
};
</script>
```



> - 子组件中的 data 数据，并不是通过父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上；`data` 上的数据，都是`可读可写`的；
> - 组件中的所有 props 中的数据，都是`只读`的无法重新赋值。

### 1.3.2 单项数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

   ```js
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```

2. 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

   ```js
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

### 1.4.3 Prop 验证

props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。

你可以基于对象的语法使用以下选项：

> - `type`：可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告.
> - `default`：`any`
>   为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个`工厂函数`返回。
> - `required`：`Boolean`
>   定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
> - `validator`：`Function`
>   自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。

```json
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    propB: [String, Number],  // 多个可能的类型
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取 即使默认值为空数组或空对象
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```



### 1.4.4 监听子组件事件

- 父组件向子组件传方法的方式实现 `子组件向父组件传值`。父组件向子组件传递方法，使用的是事件绑定机制`v-on` , 当我们自定义了 一个 事件属性之后，那么，子组件就能够通过某些方式来调用传递进去的这个方法了。子组件调用这个方法并向父组件传递值，父组件就能拿到了。

- **父组件**

```html
<template>
  <Test @parentFunc="isShow"></Test>
</template>

<script>
import Test from './test';
export default {
  name: '',
  props: [],
  data() {
    return {
      show: false
    };
  },
  methods: {
    isShow(data) {
      this.show = data;
      console.log('show', this.show); // true
    }
  },
  components: { Test }
};
</script>
```

- **子组件**

- 当点击子组件的按钮的时候，如何拿到父组件传递过来的 `parentFunc`方法，并调用这个方。`emit` 英文原意： 是触发，调用、发射的意思。
  - `参数1`：绑定的函数名。
  - `参数2`：传给父组件方法的实参。

```html
<template>
  <div id="test" @click="$emit('parentFunc',show)">点我</div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      show: true
    };
  }
};
</script>
```

整个流程为：

>  1. 父组件通过 @ 绑定 parentFunc 事件向子组件传递 show函数。
> 2. 子组件通过点击触发 调用`emit`函数，并将子组件数据以参数形式传递给父组件
>  4. 父组件将拿到的数据复制到自己的 data 数据中。

## 1.4 自定义事件

### 1.4.1 自定义组件的 v-model

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```jsx
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用 `v-model` 的时候：

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的 `lovingVue` 的值将会传入这个名为 `checked` 的 prop。同时当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的 property 将会被更新。

> 注意你仍然需要在组件的 `props` 选项里声明 checked 这个 prop。



### 1.4.2 将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

在有的时候这是很有用的，不过在你尝试监听一个类似 `` 的非常特定的元素时，这并不是个好主意。比如上述 `` 组件可能做了如下重构，所以根元素实际上是一个 `label` 元素：

```html
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  >
</label>
```

这时，父级的 `.native` 监听器将静默失败。它不会产生任何报错，但是 `onFocus` 处理函数不会如你预期地被调用。

为了解决这个问题，Vue 提供了一个 `$listeners` property，它是一个对象，里面包含了作用在这个组件上的所有监听器。如以上`base-input`的 `focus` 监听器

有了这个 `$listeners` property，你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 `input` 你希望它也可以配合 `v-model` 工作的组件来说，为这些监听器创建一个类似下述 `inputListeners` 的计算属性通常是非常有用的：

```html
<template>
  <div>
    <label>
      {{ label }}
      <input v-bind="$attrs" v-on="inputListeners" />
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['label'],
  computed: {
    inputListeners: function() {
      var vm = this;
      // 将所有的对象合并为一个新对象
      return {
        ...this.$listeners, // 我们从父级添加所有的监听器 然后我们添加自定义监听器， 或覆写一些监听器的行为
        // 这里确保组件配合 `v-model` 的工作
        input(event) {
          vm.$emit('input', event.target.value);
        }
      };
    }
  }
};
</script>
```

使用的时候

```html
<template>
  <div>
    <Test @input="change" v-model="value" label="测试"></Test>
  </div>
</template>

<script>
import Test from './test';
export default {
  data() {
    return {
      value: '测试值'
    };
  },
  methods: {
      // 这里change就可以监听到子组件input的变化
    change(value) {
      console.log('value', value);
    }
  },
  components: { Test }
};
</script>
```

### 1.4.3 .sync 修饰符

先来完成一个小功能：通过父组件按钮将子组件显示出来，在子组当中增加一个按钮，通过该按钮来将自已隐藏起来！

```html
<template>
  <div>
    <button @click="isShow=true">点我显示子组件</button>
    <Test @hidden="(bool)=>isShow=bool" v-show="isShow"></Test>
  </div>
</template>

<script>
import Test from './test';
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {},
  components: { Test }
};
</script>
```

```html
<template>
  <div class="box">
    <button @click="$emit('hidden',false)">点我隐藏自己</button>
  </div>
</template>

<script>
export default {};
</script>
<style >
.box {
  height: 300px;
  background: green;
}
</style>
```

注意：

```html
<Test @hidden="(bool)=>isShow=bool" v-show="isShow"></Test>
<--等价于-->
<Test @update:isShow="(bool)=>isShow=bool" v-show="isShow"></Test>
<--等价于，使用.sync将组件绑定修改为-->
<Test :isShow.sync="isShow" v-show="isShow"></Test>
```

子组件修改为

```html
<button @click="$emit('update:isShow',false)">点我隐藏自己</button>
```

## 1.5 访问元素&组件

### 1.5.1 访问根实例

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` 属性进行访问。例如，在这个根实例中：

```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

```js
this.$root.foo // 获取根组件的数据
this.$root.foo = 2 // 写入根组件的数据
this.$root.bar // 访问根组件的计算属性
this.$root.baz() // 调用根组件的方法
```

> 对于 demo 或非常小型的有少量组件的应用来说这是很方便的。不过这个模式扩展到中大型应用来说就不然了。因此在绝大多数情况下，我们强烈推荐使用 [Vuex](https://github.com/vuejs/vuex) 来管理应用的状态。

### 1.5.2 访问父级组件实例

和 `$root` 类似，`$parent` property 可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。

但是很多时候你可能有很多个层级，那么你可能发现自己需要一些类似这样的 hack：

```js
var map = this.$parent || this.$parent.$parent
```

很快它就会失控。这也是我们针对需要向任意更深层级的组件提供上下文信息时推荐[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#依赖注入)的原因。

> 在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。

### 1.5.3 访问子组件实例或子元素

- `ref`获取`DOM`元素和组件的引用，同时获取子组件的方法和值。`ref`  是 英文单词 【`reference`】引用类型 。


```html
<base-input ref="usernameInput"></base-input>
```

- 现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```js
this.$refs.usernameInput
```

- 来访问这个 `base-input` 实例，以便不时之需。

- 通过ref还可以父组件调用子组件的方法，获取子组件的数据。

```html
<login ref="mylogin"></login>
```

- 子组件

```js
methods: {
    show() {
        console.log('调用了子组件的方法')
    }
}
```

- 父组件

```js
methods: {
    getElement() {
        this.$refs.mylogin.show()
    }
  },
```



### 1.5.4 依赖注入

在此之前，在我们描述[访问父级组件实例](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问父级组件实例)的时候，使用 `$parent`，不幸的是，使用 `$parent` property 无法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：`provide` 和 `inject`。

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法。

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的属性

```js
inject: ['getMap']
```

相比 `$parent` 来说，这个用法可以让我们在*任意*后代组件中访问 `getMap`，而不需要暴露整个实例。这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 `props` 一样。

> 然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的 property 是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟[使用 `$root`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问根实例)做这件事都是不够好的。如果你想要共享的这个 property 是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 [Vuex](https://github.com/vuejs/vuex) 这样真正的状态管理方案了。
>
> `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

- `provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property

- `inject` 选项应该是：

  > - 一个字符串数组，或一个对象，对象的 key 是本地的绑定名，value 是：
  >   - 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或一个对象，该对象的：
  >     - `from` property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
  >     - `default` property 是降级情况下使用的 value

> 提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

示例：

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```



# 四、Vue中的属性

## 1.1 methods 方法

- 在methods 中定义方法，处理一些复杂的逻辑

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```



## 1.2 computed 计算属性

- 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

- 在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。所以，对于任何复杂逻辑，你都应当使用**计算属性**。

**基础例子**

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // this 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

- 这里我们声明了一个计算属性 `reversedMessage`。我们提供的函数将用作属性 `vm.reversedMessage` 的 getter 函数：

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

- 你可以打开浏览器的控制台，自行修改例子中的 vm。`vm.reversedMessage` 的值始终取决于 `vm.message` 的值。你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 `vm.reversedMessage`依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

**计算属性的 setter**

- 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

- 现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

## 1.3 watch 侦听器

- 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 `$watch()`，遍历 watch 对象的每一个属性。
- 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。data数据如下：

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  }
})
```
##### 简单用法

监听data中的a属性，有两个参数，参数一为新改变的值，参数二为改变前的值

```js
var vm = new Vue({
    watch: {
        a(newVal, oldVal) {
            console.log('new: ',val, 'old: ',  oldVal) // 11 1
        }
    },
    created() {
        this.a = 11; // 改变a
    }
})
```
##### 函数方式

直接写一个监听处理函数，当每次监听到 b 值发生改变时，执行函数。也可以在所监听的数据后面直接加字符串形式的方法名：

```js
var vm = new Vue({
    watch: {
        b: 'someMethod',
    },
    created() {
        this.b = 22; // 改变b
    },
    methods: {
        // 同样的参数一为改变后的值，参数二为改变前的值
        dataChange(newVal, oldVal) {
            console.log('b被改变了！', newVal, oldVal); // b被改变了！
        }
    }
})
```

##### deep和 handler

当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。

```js
var vm = new Vue({
    watch: {
        e() {
            console.log('e.f.g', this.e.f.g); // created中执行了 this.e.f.g = 55 但是并没有触发e监听
        }
    },
    created() {
        this.e.f.g = 55;
    },
})
```

使用deep深入监听

```js
var vm = new Vue({
    watch: {
        e: {
            handler(val, oldVal) { 
                console.log('e.f.g', this.e.f.g); // 55
            },
            deep: true
        }
    },
    created() {
        this.e.f.g = 55;
    }
})
```

设置deep: true 则可以监听到e的变化，此时会给e的所有属性都加上这个监听器，当对象属性较多时，每个属性值的变化都会执行handler。如果只需要监听对象中的一个属性值，则可以做以下优化：使用字符串的形式监听对象属性：

```js
var vm = new Vue({
    watch: {
        'e.f.g'(val, oldVal) { 
            console.log('e.f.g', this.e.f.g); // 55
        }
    },
    created() {
        this.e.f.g = 55;
    }
})
```

##### immediate和handler

普通方式使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。

比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。

```js
var vm = new Vue({
    watch: {
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: function (val, oldVal) { 
                console.log('d', this.d); // 先打印4再打印44
            },
            immediate: true
        },
    },
    created() {
        this.d = 44;
    }
})
```

##### 回调数组

```js
var vm = new Vue({
    watch: {
        e: [ 'handle1', function handle2 (val, oldVal) { /* ... */ }, {
            handler: function handle3 (val, oldVal) { /* ... */ }, /* ... */
        }
           ],
    }
})
```



> 注意，**不应该使用箭头函数来定义 watcher 函数** 。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 undefined

## 1.4 三者区别

### 1.4.1 计算属性 VS 方法

- 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。只在相关依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。
- 相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。
- 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A** 。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。

### 1.4.2 计算属性 VS 侦听属性

- Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

- 上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

- 以上代码，如果我们使用监听属性，那么需要监听两个data属性的变化，而使用计算属性只需要一个表达式，当其中任何一个属性值变了都会重新给 fullName 赋值。

> 总结：
>
> - computed属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。而methods会重复调用该函数。
> - methods方法表示一个具体的操作，主要书写业务逻辑；
> - watch 主要监听一个对象，而computed可以监听整个表达式中属性的变化。因此注意不要造成滥用。



# 五、生命周期

> - `生命周期`：从Vue实例`创建`、`运行`、到`销毁`期间，总是伴随着各种各样的事件，这些事件，统称为`生命周期`！
> - `生命周期钩子`：每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。
> - 生命周期钩子 = 生命周期函数 = 生命周期事件

![1552569246936](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/1552569246936.png)



## 1.1 创建期间的生命周期函数

> - `beforeCreate`：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
> - `created`：实例已经在内存中创建OK，此时 `data` 和 `methods` 已经创建OK，此时还没有开始 编译模板（el以内的内容会被编译为模板）。最早可操作js和数据的地方
> - `beforeMount`：此时已经完成了模板的编译，但是还没有挂载到页面中。
> - `mounted`：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。可最早操作DOM节点的地方。只要执行完此函数，就表示整个Vue实例已经初始化完毕，此时，组件已经脱离创建阶段，进入到运行阶段。



## 1.2 运行期间的生命周期函数

> - `beforeUpdate`：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的`数据还是旧的`，因为此时还`没有开始重新渲染DOM节点`
> - `updated`：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据都已经完成了更新，界面已经被重新渲染好了！



## 1.3 销毁期间的生命周期函数

> - `beforeDestroy`：实例销毁之前调用。在这一步，实例仍然完全可用。
> - `destroyed`：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。



- 在beforeCreate和created钩子函数之间的生命周期 ：在这个生命周期之间，进行初始化事件，进行数据的观测

- beforeMount和mounted 钩子函数间的生命周期：此时是给vue实例对象添加$el成员，并且替换掉挂在的DOM元素。

- beforeUpdate钩子函数和updated钩子函数间的生命周期：当vue发现data中的数据发生了改变，会触发对应组件的重新渲染，先后调用beforeUpdate和updated钩子函数。在beforeUpdate可以监听到data的变化，但是view层没有被重新渲染，view层的数据没有变化。等到updated的时候，view层才被重新渲染，数据更新。

- beforeDestroy和destroyed钩子函数间的生命周期：beforeDestroy钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。

  destroyed钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 1.4 activated

- keep-alive 组件激活时调用。**该钩子在服务器端渲染期间不被调用。**



## 1.5 deactivated

- keep-alive 组件停用时调用。**该钩子在服务器端渲染期间不被调用。**



## 1.6 errorCaptured

- 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：

  > - 错误对象
  > - 发生错误的组件实例
  > - 一个包含错误来源信息的字符串。此钩子可以返回 `false`以阻止该错误继续向上传播。

- 你可以在此钩子中修改组件的状态。因此在模板或渲染函数中设置其它内容的短路条件非常重要，它可以防止当一个错误被捕获时该组件进入一个无限的渲染循环。

- 错误传播规则：

  > - 默认情况下，如果全局的 `config.errorHandler` 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。
  > - 如果一个组件的继承或父级从属链路中存在多个 `errorCaptured` 钩子，则它们将会被相同的错误逐个唤起。
  > - 如果此 `errorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `config.errorHandler`。
  > - 一个 `errorCaptured` 钩子能够返回 `false` 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 `errorCaptured` 钩子和全局的 `config.errorHandler`。



# 六、过渡&动画

- Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

> - 在 CSS 过渡和动画中自动应用 class
> - 可以配合使用第三方 CSS 动画库，如 Animate.css
> - 在过渡钩子函数中使用 JavaScript 直接操作 DOM
> - 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

## 1.1 单元素/组件的过渡

- Vue 提供了 `transition` 的封装组件，把需要被动画控制的元素，包裹起来。在下列情形中，可以给任何元素和组件添加`进入`/`离开`过渡。一个transition只能包裹一个元素。

> - 条件渲染 (使用 v-if)
> - 条件展示 (使用 v-show)
> - 动态组件
> - 组件根节点

- 这里是一个典型的例子：

```html
<div id="demo">
   <button v-on:click="show = !show">Toggle</button>
   <transition>
      <p v-if="show">hello</p>
   </transition>
</div>
```

```js
new Vue({
   el: '#demo',
   data: {
      show: true
   }
})
```

```css
<style>
.v-enter-active, .v-leave-active {
   transition: opacity .5s;
}
.v-enter, .v-leave-to{
   opacity: 0;
}
</style>
```

- 当插入或删除包含在 transition 组件中的元素时，Vue 将会做以下处理：

> - 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
> - 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
> - 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 nextTick 概念不同)



### 1.1.1 过渡类名

- 在进入/离开的过渡中，会有 6 个 class 切换。

> - `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入
> - `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。【入场动画的时间段】
> - `v-enter-to`: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。【这是一个时间点】 是动画离开之后，离开的终止状态，此时，元素 动画已经结束了
> - `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
> - `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。【离场动画的时间段】
> - `v-leave-to`: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

 ![Transition Diagram](https://cn.vuejs.org/images/transition.png)

-  对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。
- `v-enter-active` 和 `v-leave-active` 可以控制进入/离开过渡的不同的缓和曲线

### 1.1.2 CSS 过渡

#### 1.1.2.1 普通CSS 过渡

- 常用的过渡都是使用 CSS 过渡。

```html
<div id="example-1">
  <button @click="show = !show"> Toggle render </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>

<script>
  new Vue({
    el: '#example-1',
    data: {
      show: true
    }
  })
</script>
```

```css
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```



#### 1.1.2.2 CSS 动画

- CSS3 动画用法同 CSS3过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

```css
.bounce-enter-active {
   animation: bounce-in .5s;
}
.bounce-leave-active {
   animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
   0% {
      transform: scale(0);
   }
   50% {
      transform: scale(1.5);
   }
   100% {
      transform: scale(1);
   }
}
```

```html
<div id="app">
 <button @click="show = !show">Toggle show</button>
 <transition name="bounce">
  <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
 </transition>
</div>
```

```js
// 创建 Vue 实例，得到 ViewModel
var vm = new Vue({
   el: '#app',
   data: {
      show: true
   }
});
```



### 1.1.3 自定义过渡的类名

- 我们可以通过以下特性来自定义过渡类名：
  - `enter-class`
  - `enter-active-class`
  - `enter-to-class` (2.1.8+)
  - `leave-class`
  - `leave-active-class`
  - `leave-to-class` (2.1.8+)
- 他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show"> Toggle render </button>
  <transition
              name="custom-classes-transition"
              enter-active-class="animated tada"
              leave-active-class="animated bounceOutRight"
              >
    <p v-if="show">hello</p>
  </transition>
</div>

<script>
  new Vue({
    el: '#example-3',
    data: {
      show: true
    }
  })
</script>
```

在很多情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。然而也可以不这样设定——比如，我们可以拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果。

在这种情况下你可以用 `<transition>` 组件上的 `duration` 属性定制一个显性的过渡持续时间 (以毫秒计)：

```html
<transition :duration="1000">...</transition>
```

你也可以定制进入和移出的持续时间：

```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```



#### 1.1.3.1 使用 animate.css

- 结合自定义过渡类名和显性的过渡时间，我们可以使用 animate.css 这个插件完成动画过渡。

```html
<link rel="stylesheet" href="./lib/animate.css">
<!-- 入场 bounceIn    离场 bounceOut -->
```

```html
<input type="button" value="toggle" @click="flag=!flag">
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
  <h3 v-if="flag">这是一个H3</h3>
</transition>
```

- 也可以将基类放在动画元素身上

```html
<input type="button" value="toggle" @click="flag=!flag">
<transition enter-active-class="bounceIn" leave-active-class="bounceOut">
  <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition>
```

- 使用 : `duration="毫秒值"` 来统一设置 入场 和 离场 时候的动画时长

```html
<transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="200">
  <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition>
```

- 使用  : `duration="{ enter: 200, leave: 400 }`"  来分别设置 入场的时长 和 离场的时长

```html
<transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="{ enter: 200, leave: 400 }">
  <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition>
```

### 1.1.4 JavaScript 钩子

- 可以在属性中声明 JavaScript 钩子
- 参数1：`el`，表示 要执行动画的那个DOM元素，是个原生的 JS DOM对象，大家可以认为 ， `el` 是通过 `document.getElementById('')` 方式获取到的原生JS DOM对象。
- 参数2： `done`， 其实就是 `下一个动画声明周期函数`的引用

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
methods: {
  // -------- 进入中 -------- // 
  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // -------- 离开时 -------- //
  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

- 这些钩子函数可以结合 CSS `transitions/animations` 使用，也可以单独使用。

> 注意：
>
> - 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
> - 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

- 一个使用 Velocity.js 的简单例子：

```html
<!--
Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">
    Toggle
  </button>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
})
```

## 1.2 初始渲染的过渡

- 可以通过 `appear` 特性设置节点在初始渲染的过渡

```html
<transition appear>
  <!-- ... -->
</transition>
```

- 这里默认和进入/离开过渡一样，同样也可以自定义 CSS 类名。

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

- 自定义 JavaScript 钩子：

```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

## 1.3 多个元素的过渡

- 我们之后讨论[多个组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%A4%9A%E4%B8%AA%E7%BB%84%E4%BB%B6%E7%9A%84%E8%BF%87%E6%B8%A1)，对于原生标签可以使用 `v-if`/`v-else` 。最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

- 可以这样使用，但是有一点需要注意：

> - 当有**相同标签名**的元素切换时，需要通过 `key` 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。**

- 示例：

```html
<transition>
  <button v-if="isEditing" key="save"> Save </button>
  <button v-else key="edit"> Edit </button>
</transition>
```

- 在一些场景中，也可以通过给同一个元素的 `key` 特性设置不同的状态来代替 `v-if`和 `v-else`，上面的例子可以重写为：

```html
<transition>
  <button v-bind:key="isEditing">  {{ isEditing ? 'Save' : 'Edit' }} </button>
</transition>
```

- 使用多个 `v-if` 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡。例如：

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">  Edit </button>
  <button v-if="docState === 'edited'" key="edited"> Save </button>
  <button v-if="docState === 'editing'" key="editing"> Cancel </button>
</transition>
```

- 可以重写为：

```html
<transition>
  <button v-bind:key="docState"> {{ buttonMessage }} </button>
</transition>
// ...
<script>
  computed: {
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit'
        case 'edited': return 'Save'
        case 'editing': return 'Cancel'
      }
    }
  }
</script>
```

##### mode过渡模式

- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

```html
<transition name="fade" mode="out-in">
   <!-- ... the buttons ... -->
</transition>
```



## 1.4 多个组件的过渡

- 多个组件的过渡简单很多 - 我们不需要使用 `key` 特性。相反，我们只需要使用[动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)：

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
<script>
  new Vue({
    el: '#transition-components-demo',
    data: {
      view: 'v-a'
    },
    components: {
      'v-a': {
        template: '<div>Component A</div>'
      },
      'v-b': {
        template: '<div>Component B</div>'
      }
    }
  })
</script>
<style>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>
```



## 1.5 列表过渡

- 一个`transition`只能包裹一个元素。那么怎么同时渲染整个列表，比如使用 `v-for` ？在这种场景中，使用 `<transition-group>` 组件。在我们深入例子之前，先了解关于这个组件的几个特点：
  - 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 特性更换为其他元素。
  - 过渡模式不可用，因为我们不再相互切换特有的元素。
  - 内部元素 总是需要 提供唯一的 `key` 属性值。

### 1.5.1 列表进入

- 
- 我们以之前的一个添加商品列表为案例，当我们在表单输入添加的内容以后，点击添加的时候。会在页面中以动画的形式进入页面。同时我们点击某一项的时候也会动画的形式移除。

```css
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: 0.6s ease;
}
```

```html
<div id="app">
  <div>
    <label>
      Id: <input type="text" v-model="id">
    </label>
    <label>
      Name: <input type="text" v-model="name">
    </label>
    <input type="button" value="添加" @click="add">
  </div>
    <transition-group tag="ul">
      <li v-for="(item, i) in list" :key="item.id" @click="del(i)">
        {{item.id}} --- {{item.name}}
      </li>
    </transition-group>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    id: '',
    name: '',
    list: [
      { id: 1, name: '赵高' },
      { id: 2, name: '秦桧' },
      { id: 3, name: '严嵩' },
      { id: 4, name: '魏忠贤' }
    ]
  },
  methods: {
    add() {
      this.list.push({ id: this.id, name: this.name })
      this.id = this.name = ''
    },
    del(i) {
      this.list.splice(i, 1)
    }
  }
});
```

- 我们可以发现，当添加和移除元素的时候，周围的元素会瞬间移动到他们的新布局的位置，而不是平滑的过渡。这时候你就需要`v-move`去实现后续的列表过渡。

```css
/* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
.v-move {
  transition: all 0.6s ease;
}
.v-leave-active{
  position: absolute;
}
```

- 这个看起来很神奇，内部的实现，Vue 使用了一个叫 FLIP 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。

> PS：需要注意的是使用 FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中

 

### 1.5.2 keep-alive

- `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition>` 相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
- 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

**Props**

> - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
> - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
> - `max` - 数字。最多可以缓存多少组件实例。

#### 1.5.2.1 用法

- 主要用于保留组件状态或避免重新渲染。

```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

- 注意，`<keep-alive>` 是用在其一个直属的子组件被开关的情形。如果你在其中有 `v-for` 则不会工作。如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。

#### 1.5.2.2 include 和 exclude

- `include` 和 `exclude` 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

- 匹配首先检查组件自身的 `name` 选项，如果 `name` 选项不可用，则匹配它的局部注册名称 (父组件 `components` 选项的键值)。匿名组件不能被匹配。

#### 1.5.2.3 max

- 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

```html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

- `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。





# 七、Class 与 Style 绑定



## 1.1 绑定 HTML Class

### 1.1.1 对象语法

我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

```html
<div :class="{ active: isActive }"></div>
```

上面的语法表示 `active` 这个 class 存在与否将取决于数据属性 `isActive`是否为真。

你可以在对象中传入更多属性来动态切换多个 class。此外，`:class` 指令也可以与普通的 class 属性共存。当有如下模板:

```html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

当需要多种判断决定当前class是否需要时，我们也可以在这里绑定一个返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```html
<div :class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```



### 1.1.2 数组语法

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```html
<div :class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

如果你也想根据条件切换列表中的 class，可以用三元表达式：

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

这样写将始终添加 `errorClass`，但是只有在 `isActive` 是 true 时才添加 `activeClass`。

不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```



### 1.1.3 绑定内联样式

`v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```html
<--text-align使用短横线需要引号-->
<div :style="{ color: activeColor, fontSize: fontSize + 'px','text-align':textAlign }"></div>
```

```json
data: {
    activeColor: 'red',
    fontSize: 30,
    textAlign: 'center' 
}
```

编译完成后

```html
<div style="color: red; font-size: 30px; text-align: center;"></div>
```

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```html
<div :style="styleObject"></div>
```

```json
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

同样的，`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

### 1.1.4 多重值

从 2.3.0 起你可以为 `style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。

# 八、插槽

## 1.1 插槽内容

Vue 实现了一套内容分发的 API，将 slot 元素作为承载分发内容的出口。它允许你像这样合成组件：

```vue
<navigation-link url="/profile"> Your Profile </navigation-link>
```

然后你在的模板中可能会写为：

```vue
<a v-bind:href="url" class="nav-link" >
  <slot></slot>
</a>
```

当组件渲染的时候，slot 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML：

```vue
<navigation-link url="/profile">
  <!-- 添加一个 Font Awesome 图标 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

甚至其它的组件：

```vue
<navigation-link url="/profile">
  <!-- 添加一个图标的组件 -->
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>
```

如果组件内部没有包含 slot 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。



## 1.2 编译作用域

当你想在一个插槽中使用数据时，例如：

```vue
<navigation-link url="/profile"> Logged in as {{ user.name }} </navigation-link>
```

该插槽跟模板的其它地方一样可以访问相同的实例属性 (也就是相同的“作用域”)，而**不能**访问 `navigation-link` 的作用域。请记住：

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。



## 1.3 后备内容

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。例如在一个组件中：我们可能希望这个 `` 内绝大多数情况下都渲染文本“Submit”。为了将“Submit”作为后备内容，我们可以将它放在 `` 标签内：

```vue
<button type="submit">
  <slot>Submit</slot>
</button>
```

现在当我在一个父级组件中使用 ， 并且不提供任何插槽内容时：

```vue
<submit-button></submit-button>
```

后备内容“Submit”将会被渲染：

```vue
<button type="submit"> Submit </button>
```



## 1.4 具名插槽

有时我们需要多个插槽。例如对于一个带有如下模板的`base-layout`组件：

```vue
<div class="container">
  <header> <!-- 我们希望把页头放这里 --> </header>
  <main> <!-- 我们希望把主要内容放这里 --> </main>
  <footer> <!-- 我们希望把页脚放这里 --> </footer>
</div>
```

对于这样的情况，slot 元素有一个特殊的属性：`name`。这个属性可以用来定义额外的插槽，`base-layout`组件：

```vue
<div class="container">
  <header> <slot name="header"></slot> </header>
  <main> <slot></slot> </main>
  <footer> <slot name="footer"></slot> </footer>
</div>
```

一个不带 `name` 的 slot 出口会带有隐含的名字“default”。在向具名插槽提供内容的时候，我们可以在一个元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：

```vue
<base-layout>
    <template v-slot:header> <h1>Here might be a page title</h1> </template>
    <template> <p>And another one.</p> </template>
    <template v-slot:footer> <p>Here's some contact info</p> </template>
</base-layout>
```

现在 ` 元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带有 `v-slot` 的 ` 中的内容都会被视为默认插槽的内容。

```vue
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

> 注意 **`v-slot` 只能添加在template上** (只有[一种例外情况](https://cn.vuejs.org/v2/guide/components-slots.html#独占默认插槽的缩写语法))，这一点和已经废弃的 [`slot` attribute](https://cn.vuejs.org/v2/guide/components-slots.html#废弃了的语法) 不同。

## 1.5 作用域插槽

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 `current-user`组件：

```vue
<span> <slot>{{ user.lastName }}</slot> </span>
```

我们可能想换掉备用内容，用名而非姓来显示。如下：

```vue
<current-user> {{ user.firstName }} </current-user>
```

然而上述代码不会正常工作，因为只有 `current-user` 组件内部可以访问到 `user` 而我们提供的内容是在父级渲染的。为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` 作为 `slot` 元素的一个属性绑定上去：

```vue
<span>
  <slot :user="user"> {{ user.lastName }} </slot>
</span>
```

绑定在 `slot` 元素上的 `user`被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字：

```vue
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 `slotProps`，但你也可以使用任意你喜欢的名字。

### 1.5.1 独占默认插槽的缩写

在上述情况下，当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：

```html
<current-user v-slot:default="slotProps"> {{ slotProps.user.firstName }} </current-user>
```

这种写法还可以更简单。就像假定未指明的内容对应默认插槽一样，不带参数的 `v-slot` 被假定对应默认插槽：

```html
<current-user v-slot="slotProps"> {{ slotProps.user.firstName }} </current-user>
```

注意默认插槽的缩写语法**不能**和具名插槽混用，因为它会导致作用域不明确：

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</current-user>
```

只要出现多个插槽，请始终为*所有的*插槽使用完整的基于template的语法：

```html
<current-user>
  <template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template>
  <template v-slot:other="otherSlotProps"> ... </template>
</current-user>
```

### 1.5.2 结构插槽Prop

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：

```js
function (slotProps) {
  // 插槽内容
}
```

这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 ([单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)或[现代浏览器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#浏览器兼容))，你也可以使用 [ES2015 解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#解构对象)来传入具体的插槽 prop，如下：

```html
<current-user v-slot="{ user }"> {{ user.firstName }} </current-user>
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 `user` 重命名为 `person`：

```html
<current-user v-slot="{ user: person }"> {{ person.firstName }} </current-user>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

## 1.6 动态插槽名

[动态指令参数](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)也可以用在 `v-slot` 上，来定义动态的插槽名：

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 1.8 具名插槽的缩写

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

```vue
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

然而，和其它指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：

```vue
<!-- 这样会触发一个警告 -->
<current-user #="{ user }">
  {{ user.firstName }}
</current-user>
```

如果你希望使用缩写的话，你必须始终以明确插槽名取而代之：

```vue
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```



















