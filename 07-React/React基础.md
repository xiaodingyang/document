一、React 开始

- `模块化`：是从 `代码` 的角度来进行分析的，把一些可复用的 `代码`，抽离为单个的模块，便于项目的维护和开发。

- `组件化`：是从 `UI界面` 的角度来进行分析的，把一些可复用的 UI 元素抽离为单独的组件，便于项目的维护和开发。

- `组件化的好处`：随着项目规模的增大，手里的组件越来越多，很方便就能把现有的组件拼接为一个完整的页面。

- `Vue 是如何实现组件化的`：template 结构、script 行为、style 样式

- `React 如何实现组件化`：大家注意，React 中有组件化的概念，但是并没有像 vue 这样的组件模板文件。React 中一切都是以 JS 来表现的，因此要学习 React，JS 要合格，ES6 要会用。



## 1.1 Create React App

- [Create React App](https://github.com/facebookincubator/create-react-app) 是一个用于**学习 React** 的舒适环境，也是用 React 创建**新的单页应用**的最佳方式。它会配置你的开发环境，以便使你能够使用最新的 JavaScript 特性，提供良好的开发体验，并为生产环境优化你的应用程序。你需要在你的机器上安装 Node >= 6 和 npm >= 5.2。要创建项目，请执行：

1. 全局安装

```powershell
npm i -g create-react-app
```

2. 创建项目

```powershell
npm init react-app my-app(项目文件名)
```

3. 运行

```\
npm start
```

4. 如何使用 create-react-app

- `npm run eject` 弹出配置文件，可以自定义配置 `webpack`
- 扩展 `package.json` 里的 `script `字段，扩展 `npm run` 命令

- Create React App 不会处理后端逻辑或操纵数据库；它只是创建一个前端构建流水线（build pipeline），所以你可以使用它来配合任何你想使用的后端。它在内部使用 [Babel](https://babeljs.io/) 和 [webpack](https://webpack.js.org/)，但你无需了解它们的任何细节。
- 当你准备好部署到生产环境时，执行 `npm run build` 会在 `build` 文件夹内生成你应用的优化版本。
- 除了使用 Create React APP 快速搭建项目以外，你也可以自己手动配置，如下：

## 1.2 创建基本的 webpack4.x 项目

### 1.2.1 全局安装 webpack

- 全局安装 `webpack`

  ```shell
  npm i webpack -g
  ```

  

- 全局安装 `webpack-cli`

  ```shell
  npm i webpack-cli -g
  ```

  

  > - 在安装webpack 之前一定要先安装 node，如果安装 webpack 失败建议先卸载 node，再删除本地
  > - ../AppData/Roaming/npm   
  > - ../AppData/Roming/npm-cache  这两个文件夹



### 1.2.2 项目中安装 webpack 和 webpack-cli

1. 运行 `npm init -y` 快速初始化项目

2. 在项目根目录创建 `src` 和 `dist` 两个目录，`src` 目录下面创建 `index.html` 和 `index.js`

3. 使用 `cnpm` 安装 webpack：

   - 运行 `cnpm i webpack -D` 和 `cnpm i webpack-cli -D`

   - 全局运行 `npm install -g cnpm --registry=https://registry.npm.taobao.org`



### 1.2.3 webpack.config.js 文件配置

#### 1.2.3.1 mode 配置

- mode 为环境配置，两个可选值:

  - `development` 为开发环境
  - `production` 为生产环境，生产环境打包后的文件被压缩，体积小。

  ```js
  module.exports = {
      mode: 'development' // development || production
  }
  ```

  

#### 1.2.3.2 约定大于配置

- webpack 4.x 中，有一个很大的特性，就是约定大于配置，约定默认的:
  - 打包入口路径是 `src` 下面的 `index.js`
  - 输出路径是 `dist` 下面的 `main.js`

#### 1.2.3.3 webpack-dev-server

- 将打包好的 js 放置在内存中

- 安装

```shell
npm i webpack-dev-server -D
```

- 在 `package.json` 中的 `scripts` 下面配置：

```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --open --port 3000 --hot"
}
```

- `webpack-dev-server`  将打包好的 `main.js` 托管到内存中，所以在根目录是看不见的
- `--open`: 自动打开浏览器
- `--port 3000`: 指定3000 端口号
- `--hot`: 热更新，每次改变代码就会重新打包  

#### 1.2.3.4 html-webpack-plugin

- 将打包好的 index.html 放置在内存中

- 安装

```shell
npm i  html-webpack-plugin -D
```

- 在 `webpack-config.js` 中的配置：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')  
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'), //源文件
  filename: 'index.html', //打包后的文件名
})

module.exports = {
    mode: 'development', // development || production
  plugins: [
      htmlPlugin //将 htmlPlugin 放置在插件中
    ]
}
```



# 二、React 核心概念

## 1.1 JSX 简介

- 考虑如下变量声明：

  ```js
  const element = <h1>Hello, world!</h1>;
  ```

- 这个有趣的标签语法既不是字符串也不是 HTML。它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。
- JSX 可以生成 React “元素”。

### 1.1.1 为什么使用 JSX？

- React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。
- React 并没有采用将*标记与逻辑进行分离到不同文件*这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现[*关注点分离*](https://en.wikipedia.org/wiki/Separation_of_concerns)。
- React [不强制要求](https://react.docschina.org/docs/react-without-jsx.html)使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。



### 1.1.2 在 JSX 中嵌入表达式

- 在下面的例子中，我们声明了一个名为 `name` 的变量，然后在 JSX 中使用它，并将它包裹在大括号中：

  ```jsx
  const name = 'Josh Perez';
  const element = <h1>Hello, {name}</h1>;
  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```

  

- 在 JSX 语法中，你可以在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)。例如，`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。



### 1.1.3 JSX 也是一个表达式

- 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

- 也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

  ```jsx
  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
  }
  ```

  

### 1.1.4 JSX 特定属性

- 你可以通过使用引号，来将属性值指定为字符串字面量：

  ```jsx
  const element = <div tabIndex="0"></div>;
  ```

  

- 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

  ```jsx
  const element = <img src={user.avatarUrl}></img>;
  ```

  

- 在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

  > 警告：因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
  >
  > 例如，JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)。



### 1.1.5 JSX 防止注入攻击

- 你可以安全地在 JSX 当中插入用户输入内容：

  ```jsx
  const title = response.potentiallyMaliciousInput;
  // 直接使用是安全的：
  const element = <h1>{title}</h1>;
  ```

  

- React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。



### 1.1.6 JSX 表示对象

- Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

  > - 参数1：要渲染的那个虚拟DOM元素
  > - 参数2：属性
  > - 参数3：子节点（包括其他虚拟DOM或者文本子节点）
  > - 参数n：其他子节点

- 以下两种示例代码完全等效：

  ```jsx
  const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );
  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
  );
  ```

  

- `React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

  ```jsx
  // 注意：这是简化过的结构
  const element = {
    type: 'h1',
    props: {
      className: 'greeting',
      children: 'Hello, world!'
    }
  };
  ```

  

- 这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。

## 1.2 元素渲染

### 1.2.1 将一个元素渲染为 DOM

- 假设你的 HTML 文件某处有一个 `<div>`：

  ```html
  <div id="root"></div>
  ```

  

- 我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

- 仅使用 React 构建的应用通常只有单一的根 DOM 节点。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

- 想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`：

  > - 参数1：要渲染的那个虚拟DOM元素
  > - 参数2：指定页面上一个容器，必须得是DOM对象

  ```jsx
  import React, {Component} from 'react';  //创建组件、虚拟DOM
  import ReactDom from 'react-dom'; // 把创建好的DOM和组件展示在页面
  
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(element, document.getElementById('root'));
  ```

  

- 页面上会展示出 “Hello, world”。



### 1.2.2 更新已渲染的元素

- React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

- 根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()`。

- 考虑一个计时器的例子：

  ```jsx
  function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }
  
  setInterval(tick, 1000);
  ```

  

- 这个例子会在 [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) 回调函数，每秒都调用 `ReactDOM.render()`。



### 1.2.3 React 只更新它需要更新的部分

- React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

![DOM inspector showing granular updates](https://react.docschina.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

- 尽管每一秒我们都会新建一个描述整个 UI 树的元素，React DOM 只会更新实际改变了的内容，也就是例子中的文本节点。

- 根据我们的经验，考虑 UI 在任意给定时刻的状态，而不是随时间变化的过程，能够消灭一整类的 bug。



#### 1.2.3.1 虚拟 DOM

- DOM 的本质：浏览器中的概念，用 js 对象来表示页面上的元素，并提供了操作 DOM 对象的 API 
- 什么是 React 中的虚拟 DOM：是框架中的概念，是程序员用 js 对象来模拟页面上的 DOM 和 DOM 嵌套
- 为什么要实现虚拟 DOM（虚拟DOM的目的）：为了实现页面中，DOM元素的高效更新
- DOM 树的概念，一个网页呈现的过程：
  - 浏览器请求服务器获取页面 HTML 代码
  - 浏览器解析 DOM 结构，并在浏览器内存中渲染出一颗 DOM 树
  - 浏览器把 DOM 树呈现到页面上

##### 1. 模拟 DOM 树

```html
<div id="box" data-index="0">
    我是box
	<p>
        我是p标签
    </p>
</div>
```

- 使用 js 模拟如下：

```js
var obj = {
    tagName: 'div',
    attrs: {
        id: "box",
        data-index: 0
    },
    childrens: [
        "我是box",
        {
            tagName: 'p',
            childrens: [
                "我是p标签"
            ]
        }
    ]
}
```

#### 1.2.3.2 Diff 算法

##### 1. tree diff 

- 新旧两颗 DOM 树，逐层对比的过程，就是 Tree Diff; 当整颗 DOM 逐层对比完毕，则所有需要被按需更新的元素，必然能够找到。

##### 2. component diff

- 在进行 Tree Diff 的时候，每层中组件级别的对比，叫做 Component Diff
- 如果对比前后组件的类型相同，则暂时认为此组件不用被更新。
- 如果对比前后组件类型不同，则需要移除就移除，创建新组件并追加到页面上

##### 3. element diff

- 在组件进行对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做 Element Diff

![1541831557734](F:\我的学习\My Study\07-React\assets\1541831557734.png)



## 1.3 组件 & Props

- 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 1.3.1 组件

#### 1.3.1.1 函数组件与 class 组件

- 定义一个组件最简单的方式是使用JavaScript函数，也称之为无状态组件，因为没有state状态：

  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- 该函数是一个有效的React组件，它接收一个单一的“props”对象并返回了一个React元素。我们之所以称这种类型的组件为`函数定义组件`，是因为从字面上来看，它就是一个JavaScript函数。

- 你也可以使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 来定义一个组件，称之为状态组件:

  ```jsx
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

- 上面两个组件在React中是相同的。

#### 1.3.1.2 渲染组件

- 在前面，我们遇到的React元素都只是DOM标签：

  ```jsx
  const element = <div />;
  ```

  

- 然而，React元素也可以是用户自定义的组件：

  ```jsx
  const element = <Welcome name="Sara" />;
  ```

  

- 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为“props”。例如,这段代码会在页面上渲染出”Hello,Sara”:

  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  const element = <Welcome name="Sara" />;
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
  ```

  

- 我们来回顾一下在这个例子中发生了什么：

  > - 我们对`<Welcome name="Sara" />`元素调用了`ReactDOM.render()`方法。
  > - React将`{name: 'Sara'}`作为props传入并调用`Welcome`组件。
  > - `Welcome`组件将`<h1>Hello, Sara</h1>`元素作为结果返回。
  > - React DOM将DOM更新为`<h1>Hello, Sara</h1>`。

> 警告: 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。



#### 1.3.1.3 组合组件

- 组件可以在它的输出中引用其它组件，这就可以让我们用同一组件来抽象出任意层次的细节。在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。

- 例如，我们可以创建一个`App`组件，用来多次渲染`Welcome`组件：

  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
   );
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  ```

  

> 警告: 组件的返回值只能有一个根元素。这也是我们要用一个`<div>`来包裹所有`<Welcome />`元素的原因。



### 1.3.2 props

#### 1.3.2.1 Props只读性

- React 非常灵活，但它也有一个严格的组件无论是使用[函数声明还是通过 class 声明](https://react.docschina.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props。来看下这个 `sum` 函数：

  ```js
  function sum(a, b) {
    return a + b;
  }
  ```

  

- 这样的函数被称为[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

- 相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

  ```js
  function withdraw(account, amount) {
    account.total -= amount;
  }
  ```

  

- React 非常灵活，但它也有一个严格的规则：所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

#### 1.3.2.2 用法

- 在组件标签上以属性方式传递给组件，在组件中使用 `this.props.属性` 获取值：

  ```jsx
  <IndexPage name="小阳" age={18}></IndexPage>
  ```

  

- 在组件中使用

  ```jsx
  class IndexPage extends Component {
    render () {
      return  (
        <div>
          <h1>姓名：{this.props.name}，年龄：{this.props.age}</h1>
        </div>
      ) 
    }
  }
  ```

  

#### 1.3.2.3 propTypes 

- 组件在接收props值得时候，我们可以进行类型限制

  ```jsx
  import propTypes from 'prop-types' //脚手架自带，不用自行安装
  class IndexPage extends Component {
    render () {
      return  (
        <div>
          <h1>姓名：{this.props.name}，年龄：{this.props.age}</h1>
        </div>
      ) 
    }
  }
  IndexPage.propTypes = {
       name: PropTypes.string,//检测字符串
       age: PropTypes.number,//检测数字
  }
  ```

  

- 如果没有传，则不会做PropTypes 校验，如果要求必传，则可以跟上 `isRequired`

  ```js
  optionalArray: PropTypes.array.isRequired,//检测数组类型且必传
  ```

  

- 如果想要多种类型，则可以使用 `arrayOf` 

  ```js
  optionalArray: PropTypes.arrayOf(PropTypes.number,PropTypes.string); //检测多种类型
  ```

  

- 所有的类型有：

  ```jsx
  Son.propTypes = {
       optionalArray: PropTypes.array,//检测数组类型
       optionalBool: PropTypes.bool,//检测布尔类型
       optionalFunc: PropTypes.func,//检测函数（Function类型）
       optionalNumber: PropTypes.number,//检测数字
       optionalObject: PropTypes.object,//检测对象
       optionalString: PropTypes.string,//检测字符串
       optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
  }
  ```

  

#### 1.3.2.4 defaultProps

- 在接收props时，我们还可以给 props 设置初始值，如果组件没有传入改props，我们将会使用初始值。使用 `defaultProps` 的前提是引入了 `propsTypes`

```js
IndexPage.defaultProps = {
    name: "哈哈",
    age: 18
}
```



## 1.4 state

- 在[元素渲染](https://react.docschina.org/docs/rendering-elements.html#rendering-an-element-into-the-dom)章节中，我们只了解了一种更新 UI 界面的方法。通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素：

  ```jsx
  function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
  }
  
  setInterval(tick, 1000);
  ```

- 在本章节中，我们将学习如何封装真正可复用的 `Clock` 组件。它将设置自己的计时器并每秒更新一次。

- 我们可以从封装时钟的外观开始：

  ```jsx
  function Clock(props) {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
  
  function tick() {
    ReactDOM.render(
      <Clock date={new Date()} />,
      document.getElementById('root')
    );
  }
  
  setInterval(tick, 1000);
  ```

  

- 然而，它忽略了一个关键的技术细节：`Clock` 组件需要设置一个计时器，并且需要每秒更新 UI。理想情况下，我们希望只编写一次代码，便可以让 `Clock` 组件自我更新：

  ```jsx
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  ```

  

- 我们需要在 `Clock` 组件中添加 “state” 来实现这个功能。State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

### 1.4.1 将函数组件转换成 class 组件

- 通过以下五步将 `Clock` 的函数组件转成 class 组件：

  > - 创建一个同名的 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，并且继承于 `React.Component`。
  >
  > - 添加一个空的 `render()` 方法。
  > - 将函数体移动到 `render()` 方法之中。
  > - 在 `render()` 方法中使用 `this.props` 替换 `props`。
  > - 删除剩余的空函数声明。

  ```jsx
  class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  ```

  

- 现在 `Clock` 组件被定义为 class，而不是函数。每次组件更新时 `render` 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<Clock />` ，就仅有一个 `Clock` 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。



### 1.4.2 向 class 组件中添加局部的 state

- 我们通过以下三步将 `date` 从 props 移动到 state 中：

  > - 把 `render()` 方法中的 `this.props.date` 替换成 `this.state.date`
  > - 添加一个 [class 构造函数](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)，然后在该函数中为 `this.state` 赋初值。将 `props` 传递到父类的构造函数中。Class 组件应该始终使用 `props` 参数来调用父类的构造函数。
  > - 移除 `<Clock />` 元素中的 `date` 属性

  ```jsx
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  ```

- 接下来，我们会设置 `Clock` 的计时器并每秒更新它。



### 1.4.3 将生命周期方法添加到 Class 中

- 在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。
- 当 `Clock` 组件第一次被渲染到 DOM 中的时候，就为其[设置一个计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)。这在 React 中被称为“挂载（mount）”。
- 同时，当 DOM 中 `Clock` 组件被删除的时候，应该[清除计时器](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)。这在 React 中被称为“卸载（umount）”。

- 我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法，这些方法叫做“生命周期方法”。

- `componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器，并接下把计时器的 ID 保存在 `this` 之中。

  ```js
  componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  ```

  

- 我们会在 `componentWillUnmount()` 生命周期方法中清除计时器：

  ```js
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  ```

  

- 最后，我们会实现一个叫 `tick()`　的方法，`Clock` 组件每秒都会调用它。

  ```js
  tick() {
    this.setState({
      date: new Date()
    });
  }
  ```

  

- 现在时钟每秒都会刷新。代码如下：

  ```jsx
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Clock />,
    document.getElementById('root')
  );
  ```

  

### 1.4.4 正确的使用 State

- 关于 `setState()` 你应该了解三件事：

#### 1.4.4.1 不要直接修改 State

- 例如，此代码不会重新渲染组件：

  ```js
  // Wrong
  this.state.comment = 'Hello';
  ```

  

- 而是应该使用 `setState()`:

  ```js
  // Correct
  this.setState({comment: 'Hello'});
  ```

  

- 构造函数是唯一可以给 `this.state` 赋值的地方：



#### 1.4.4.2 State 的更新可能是异步的

- 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

- 例如，此代码可能会无法更新计数器：

  ```js
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  ```

  

- 要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用`上一个 state` 作为第一个参数，将此`次更新被应用时的 props` 做为第二个参数：

  ```js
  // Correct
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  ```

  

#### 1.4.4.3 State 的更新会被合并

- 当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

- 例如，你的 state 包含几个独立的变量：

  ```js
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
  ```

  

- 然后你可以分别调用 `setState()` 来单独地更新它们：

  ```js
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });
  
    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
  ```

  

- 这里的合并是浅合并，所以 `this.setState({comments})` 完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments`。



### 1.4.5 数据是向下流动的

- 不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

- 这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

- 组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

  ```html
  <FormattedDate date={this.state.date} />
  ```

  

- `FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的：

  ```js
  function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
  }
  ```

  

- 这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

- 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。



### 1.4.6 实现数据的双向绑定

- 当组件的 state 和 props 发生改变的时候，render函数就会重新执行，页面则会重新渲染。
- 当父组件的render被执行时，他的子组件的render也将被执行，也就是说当父组件 state 和 props 发生改变时，他的子组件也会被重新渲染。 

- 默认情况下，在React中，如果页面上的表单元素绑定了state上的状态值。那么每当state上状态值变化，必然会自动把新的状态值自动同步到页面上。
- 如果 UI 页面上的文本框内容变化了，想要把最新的值同步回 state 中去。此时 React 没有这种自动同步的机制，需要手动的调整。
  - 在 React 中需要程序员手动监听文本框的 onChange 事件；
  - 在 onChange 事件中，拿到最新的文本框的值；
  - 程序员调用 `this.setState({})` 手动把最新的值同步到 state 中；

```jsx
<div className="App">
    <h2>{this.state.msg}</h2>
    <input type="text" value={this.state.msg} onChange={(e) => { this.change(e) }} ref="txt"/>
</div>
```

```js
change = (e) => {
    console.log(e.target);	// 通过 e.target 获取到触发事件的节点
    console.log(this.refs.txt.value);	//同 Vue 一样，可以通过 ref 获取到节点
}
```

- 然后再在事件函数里面通过 setState({}) 去改变 msg 的值

```js
change = (e) => {
    const newVal = this.refs.txt.value
    this.setState({
        msg: newVal
    })
}
```



## 1.5 constructor()、super()、super(props)

### 1.5.1 constructor()、super()

- 由于，React是依赖于es6的Class，就是es5对象的语法糖。里面的constructor相当于对对象的初始化。

- 只要存在constructor就要调用super()，但是，不是每个react组件都需要constructor，比如下面的代码是可以正常运行的：

  ```jsx
  class App extends React.Component {
    render() {
      return (
        <h1>{this.props.text}</h1>
      );
    }
  }
  ```

  

- 很多时候需要在constructor中访问this：

  ```js
  constructor() {
    console.log(this); // Syntax error: 'this' is not allowed before super()
  }
  ```

- 这是因为当没有调用super()时，this还没有被初始化，所以不能使用；那如果我不使用this呢?

  ```js
  constructor() {
    // Syntax error: missing super() call in constructor
  }
  ```

  

- es6会在语法层面强制你调用super()，所以得到的结论就是：`只要存在constructor就必须调用super()`



### 1.5.2 super(props)

- 当需要在 constructor 中访问 `this.props` 的情况下，就需要`super(props)`

- 从上面的代码可以看出，即使没有 constructor，依然可以在 render 中使用 this.props，这是因为 react 在初始化 class 后，会将 props 自动设置到 this 中，所以在任何地方都可以直接访问 this.props，除了一个地方：`constructor`

  ```js
  constructor(props) {
    super();
    console.log(this.props); // undefined
  }
  ```

  

- 所以当你需要在constructor中访问this.props时，才需要设置super(props)，

- 当然，可以直接使用props：

  ```js
  constructor(props){
    super()
    console.log('props',props)
  }
  ```



## 1.6 事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

- 例如，传统的 HTML：

  ```html
  <button onclick="activateLasers()"> Activate Lasers </button>
  ```

  

- 在 React 中略微不同：

  ```html
  <button onClick={activateLasers}> Activate Lasers </button>
  ```

  

- 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：

  ```html
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  ```

  

- 在 React 中，可能是这样的：

  ```jsx
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

  

- 在这里，`e` 是一个合成事件。React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/)来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。

- 使用 React 时，你一般不需要使用 `addEventListener` 为已创建的 DOM 元素添加监听器。React恰恰与之相反，你仅需要在该元素初始渲染的时候添加一个监听器。

- 当你使用 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。例如，下面的 `Toggle` 组件会渲染一个让用户切换开关状态的按钮：

  ```jsx
  class Toggle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: true};
    }
  
    // 使用箭头函数是为了函数中能拿到上下文的this
    handleClick = ()=> {
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      );
    }
  }
  
  ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
  );
  ```



- 在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

  ```html
  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
  <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
  ```

  

- 上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。

- 在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。



## 1.7 条件渲染



### 1.7.1 基本用法

- React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

- 观察这两个组件:

  ```js
  function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
  }
  ```

  

- 再创建一个 `Greeting` 组件，它会根据用户是否登录来决定显示上面的哪一个组件。

  ```js
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  
  ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
  );
  ```

  

- 这个示例根据 `isLoggedIn` 的值来渲染不同的问候语。



### 1.7.2 与运算符 &&

- 通过花括号包裹代码，你可以[在 JSX 中嵌入任何表达式](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染。

  ```jsx
  function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  
  const messages = ['React', 'Re: React', 'Re:Re: React'];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
  );
  ```

  

- 之所以能这样做，是因为在 JavaScript 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。因此，如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略并跳过它。



### 1.7.3 三目运算符

- 另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。

- 在下面这个示例中，我们用它来条件渲染一小段文本

  ```jsx
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
  }
  ```

  

- 同样的，它也可以用于较为复杂的表达式中，虽然看起来不是很直观：

  ```jsx
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>
        {isLoggedIn ? (
          <LogoutButton onClick={this.handleLogoutClick} />
        ) : (
          <LoginButton onClick={this.handleLoginClick} />
        )}
      </div>
    );
  }
  ```

  

- 就像在 JavaScript 中一样，你可以根据团队的习惯来选择可读性更高的代码风格。需要注意的是，如果条件变得过于复杂，那你应该考虑如何[提取组件](https://react.docschina.org/docs/components-and-props.html#extracting-components)。



### 1.7.4 阻止组件渲染

- 在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

- 下面的示例中，`<WarningBanner />` 会根据 prop 中 `warn` 的值来进行条件渲染。如果 `warn` 的值是 `false`，那么组件则不会渲染:

  ```jsx
  function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        Warning!
      </div>
    );
  }
  
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {showWarning: true};
      this.handleToggleClick = this.handleToggleClick.bind(this);
    }
  
    handleToggleClick() {
      this.setState(state => ({
        showWarning: !state.showWarning
      }));
    }
  
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
  ```

  

- 在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。



## 1.8 列表 & key



### 1.8.1 渲染多个组件

- 你可以通过使用 `{}` 在 JSX 内构建一个[元素集合](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。

- 下面，我们使用 Javascript 中的 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>` 标签，最后我们将得到的数组赋值给 `listItems`：

  ```jsx
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  ```

  

- 我们把整个 `listItems` 插入到 `<ul>` 元素中，然后渲染进 DOM

- 这段代码生成了一个 1 到 5 的项目符号列表。

  ```jsx
  ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
  );
  ```

  

### 1.8.2 基础列表组件

- 通常你需要在一个[组件](https://react.docschina.org/docs/components-and-props.html)中渲染列表。我们可以把前面的例子重构成一个组件，这个组件接收 `numbers` 数组作为参数并输出一个元素列表。

  ```jsx
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```

  

- 当我们运行这段代码，将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。我们将在下一节讨论这是为什么。让我们来给每个列表元素分配一个 `key` 属性来解决上面的那个警告：

  ```jsx
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }
  
  const numbers = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
  );
  ```



### 1.8.3 key

- key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

  ```jsx
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  ```

  

- 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据 id 来作为元素的 key：

  ```jsx
  const todoItems = todos.map((todo) =>
    <li key={todo.id}>
      {todo.text}
    </li>
  );
  ```

  

- 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

  ```jsx
  const todoItems = todos.map((todo, index) =>
    // Only do this if items have no stable IDs
    <li key={index}>
      {todo.text}
    </li>
  );
  ```

  

- 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) 这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。



## 1.9 CSS模块化

- 在 React 中，样式是全局的，容易造成污染。所以，需要使用 CSS 模块化。

#### 安装

```powershell
npm i style-loader --save
npm i css-loader --save
```

#### 配置

- 在 `webpack.config.js` 的 `module` 下的 `rules` 中配置：

```json
// css模块化
{
    test: /\.css$/,
    loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]'
},
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
},
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
},
{
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader?limit=10000',
},
{
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
}
```

#### 使用

- 在所用组件中导入 css 样式文件

```js
import app from './App.css';
```

```jsx
class App extends Component {
  render () {
    return (
      <div className="App">
        <div className={app.link}>哈哈</div>
      </div>
    );
  }
}
```

- 最后你会发现，本来是 link 的类变成了 `.App_link__O3gLv`，也就是通过loader给我们自动编码成为了唯一的类，这样就不会重复了。

### 1.4.8 styled-components

- 与css模块化类似，也是用来防止css冲突的方式

#### 安装

```powershell
npm i styled-components
```

#### 定义

```js
import styled from 'styled-components';

export const NavStyle = styled.div`
  background: green;
  .navbar-brand{
    padding: 0;
  }
  .navbar-brand img{
    width: 100px;
  }
`
```

- 如果需要添加属性，如下给a标签添加 href 属性

```js
export const LogoStyle = styled.a.attrs({
  href:'/'
})`
  display: block;
  width: 100px;
  height: 50px;
`
```



#### 使用

```jsx
import { NavStyle } from './style'
export default class navComponent extends Component {
  render () {
    return (
      <NavStyle></NavStyle>
    )
  }
}
```



## 2.0 组件的生命周期

- 生命周期的概念：每个组件的实例从创建到运行，直到销毁。在这个过程中会触发一系列的事件，这些事件就叫做组件的生命周期函数；

- React 组件生命周期分为三部分：

  ```js
  class App extends Component {
    constructor(props) {
      super()
      this.state = {
        msg: '这是一个消息...'
      }
      console.log('组件初始化...');
    }
    componentWillMount () {
      console.log("组件马上就要挂载了...");
    }
    componentDidMount () {
      console.log("组件已经挂载了...");
    }
    shouldComponentUpdate () {
      console.log("state状态改变后，判断是不是要更新组件...");
    }
    componentWillReceiveProps (nextProps) {
      console.log("Props改变后...");
    }
    componentWillUpdate () {
      console.log("马上就要更新组件了...");
    }
    componentDidUpdate () {
      console.log("组件更新完了...");
    }
    componentWillUnmount () {
      console.log("组件卸载了...");
    }
    render () {
      return (
        <div className="App"></div>
      )
    }
  }
  ```

  ![React 生命周期图解](https://upload-images.jianshu.io/upload_images/4118241-d979d05af0b7d4db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/488/format/webp)

### 2.0.1 组件创建阶段：

- 特点：一辈子只执行一次

  > - `componentWillMount`：在渲染前调用,在客户端也在服务端。
  >
  > - `render`：DOM 渲染。
  >
  > - `componentDidMount`：在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。



### 1.5.2 组件运行阶段：

- 按需根据 props 属性或 state 状态的改变，有选择性的执行 0 到多次。

> - `componentWillReceiveProps`：在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
> - `shoudComponentUpdate`：  react实现了一层虚拟dom，它用来映射浏览器的原生dom树。通过这一层虚拟的dom，可以让react避免直接操作dom，因为直接操作浏览器dom的速度要远低于操作javascript对象。每当组件的属性或者状态发生改变时，react会在内存中构造一个新的虚拟dom与原先老的进行对比，用来判断是否需要更新浏览器的dom树，这样就尽可能的优化了渲染dom的性能损耗。在此之上，react提供了组件生命周期函数，shouldComponentUpdate，组件在决定重新渲染（虚拟dom比对完毕生成最终的dom后）之前会调用该函数，该函数将是否重新渲染的权限交给了开发者，该函数默认直接返回true，表示默认直接出发dom更新。返回false则不更新。
> - `componentWillUpdate`：在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用
> - `render`：更新DOM。
> - `componentDidUpdate`：在组件完成更新后立即调用。在初始化时不会被调用。



### 1.5.3 组件销毁阶段

- 一辈子只执行一次

> - `componentWillUnmount`：在组件从 DOM 中移除之前立刻被调用。


