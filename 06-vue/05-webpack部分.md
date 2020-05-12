# webpack

-  全局更新

   ```shell
   npm install npm -g
   ```


##### nrm的安装使用

-  `作用`：提供了一些最常用的`NPM`包镜像地址，能够让我们快速的切换安装包时候的服务器地址；

-  `什么是镜像`：原来包刚一开始是只存在于国外的NPM服务器，但是由于网络原因，经常访问不到，这时候，我们可以在国内，创建一个和官网完全一样的 NPM 服务器，只不过，数据都是从人家那里拿过来的，除此之外，使用方式完全一样；

   >  -  运行 npm i nrm -g 全局安装 nrm 包；
   >
   >  -  使用 nrm ls 查看当前所有可用的镜像源地址以及当前所使用的镜像源地址；
   >  -  使用 nrm use npm 或 m use taobao 切换不同的镜像源地址；

-  注意： nrm 只是单纯的提供了几个常用的 下载包的 URL地址，并能够让我们在 这几个 地址之间，很方便的进行切换，但是，我们每次装包的时候，使用的 装包工具，都是  `npm`

## 1.1 webpack的引入

-  在网页中会引用哪些常见的静态资源？

   >  -   JS：.js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）
   >  -  CSS：.css  .less   .sass.scssImages：.jpg   .png   .gif   .bmp   .svg字体文
   >  -  Fonts：.svg   .ttf   .eot   .woff   .woff2
   >  -  模板文件：.ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】

-  网页中引入的静态资源多了以后有什么问题？？？

   >  -  网页加载速度慢， 因为 我们要发起很多的二次请求；
   >
   >  -  要处理错综复杂的依赖关系

-  如何解决上述两个问题

   >  -  合并、压缩、精灵图、图片的Base64编码
   >  -  可以使用之前学过的requireJS、也可以使用webpack可以解决各个包之间的复杂依赖关系；

-  什么是webpack?

   >  -  webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；

-  如何完美实现上述的2种解决方案

   >  -  使用 Gulp， 是基于 task 任务的；
   >  -  使用 Webpack， 是基于整个项目进行构建的；
   >  -  借助于 webpack 这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
   >  -  根据官网(http://webpack.github.io/)的图片介绍 webpack 打包的过程

 ![1553474437938](F:\我的学习\My Study\06-vue\demo\assets\1553474437938.png)

## 1.2 webpack基本使用方式

-  webpack安装的两种方式：

   >  -  运行 npm i webpack -g 全局安装webpack，这样就能在全局使用webpack的命令
   >  -  在项目根目录中运行 npm i webpack --save-dev 安装到项目依赖中

 

### 1.2.1 初步使用webpack打包构建列表隔行变色案例

#### 1.2.1.1 创建项目基本的目录结构

-  其中，`dist`是项目做好以后的文件打包，`src`里面是需要静态引入的东西，`index.html`和 `main.js` 在src目录下。

####  1.2.1.2 初始化项目

-  将命令行目录使用cd切换到当前项目根目录，运行`npm init -y`初始化项目，使用npm管理项目中的依赖包

#### 1.2.1.3 安装jQuery

-  使用`npm i jquery -save`安装jquery类库

#### 1.2.1.4 导入jQuery

-  在main.js里面导入jQuery，再在index里面导入main.js，因为main.js是我们的入口文件。

   ```js
   //import *** from *** 	是ES6中导入模块的方式
   import $ from 'jquery'
   ```

-  但是由于 ES6的代码，太高级了，浏览器解析不了，所以，这一行执行会报错。因此，我们需要使用webpack处理一下。在命令行里面输入以下命令

   ```powershell
   npx webpack ./src/main.js --output-filename bundle.js --output-./dist . --mode development
   ```
   -  `./src/main.js` 表示要处理的文件的路径
   -  `--output-filename` 表示处理后的文件的名字
   -  `output-./dist`表示将处理好的`bundle.js`放置的路径。

#### 1.2.1.5 导入在 dist 文件中打包好的 bundle.js

-  这个时候就不再引用main.js而是引入bundle.js这个文件，但是，我们每次都要手动的去配置一遍才能刷新页面。所以我们可以配置webpack文件。

```html
<script src="../dist/bundle.js"></script> 
```



### 1.2.2 webpack最基本的配置文件的使用

-  在项目根目录下创建一个 `webpack.config.js` 文件。然后设置相应的配置

- 这个配置文件，起始就是一个 JS 文件，通过 Node 中的模块操作，向外暴露了一个 配置对象当以命令行形式运行 `webpack` 或 `webpack-dev-server` 的时候，工具会发现，我们并没有提供要打包的文件的`入口`和`出口`文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建。

   ```js
   const path = require('path')
   
   module.exports = {
       /*在配置文件中，需要手动指定 入口 和 出口 */
     
     	/* 输入文件相关的配置 */
       entry: path.join(__dirname, './src/main.js'),// 入口，表示要使用 webpack 打包哪个文件
   
       /* 输出文件相关的配置 */
       output: {
           path: path.join(__dirname, './dist'), // 指定打包好的文件，输出到哪个目录中去
           filename: 'bundle.js'   // 这是指定输出的文件的名称
       }
   }
   ```


- 这时候只需要在命令行输入`webpack`就可以自动配置打包文件。当我们在控制台，直接输入 `webpack` 命令执行的时候，`webpack` 做了以下几步：

   >  -  首先，webpack 发现，我们并没有通过命令的形式，给它指定入口和出口
   >  -  webpack 就会去项目的根目录中，查找一个叫做 `webpack.config.js` 的配置文件
   >  -  当找到配置文件后，webpack 会去解析执行这个 配置文件，当解析执行完配置文件后，就得到了 配置文件中导出的配置对象
   >  -  当 webpack 拿到配置对象后，就拿到了配置对象中，指定的 `入口`  和 `出口`，然后进行打包构建；


 

### 1.2.3 热更新

-  使用 `webpack-dev-server` 这个工具，来实现自动打包编译的功能。安装：

   ```js
   npm i webpack-dev-server -D  /* 安装webpack-dev-server */
   npm i cli	/* 安装cli */
   ```

   安装完毕后，这个 工具的用法， 和 webpack 命令的用法，完全一样

-  由于，我们是在项目中，本地安装的 webpack-dev-server ， 所以，无法把它当作脚本命令，在powershell 终端中直接运行；（只有那些 安装到全局-g 的工具，才能在 终端中正常执行）

-  注意：webpack-dev-server 这个工具，如果想要正常运行要求在本地项目中，必须安装 webpack
-  webpack-dev-server 帮我们打包生成的 bundle.js 文件，并没有存放到实际的物理磁盘上；而是，直接托管到了电脑的内存中，所以我们在项目根目录中，根本找不到这个打包好的bundle.js;

-  我们可以认为， webpack-dev-server 把打包好的文件，以一种虚拟的形式，托管到了咱们项目的根目录中，虽然我们看不到它，但是，可以认为， 和 dist  src  node_modules  平级，有一个看不见的文件，叫做 bundle.js。

### 1.2.4 实现自动打开浏览器、热更新和配置浏览器的默认端口号

#### 1.2.4.1 方式1

-  修改package.json的script节点如下：

   ```js
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
    }
   ```

-  dev里面的就是配置项，其中:

   >  -  webpack-dev-server 表示在运行的时候可以通过 npm run dev 运行 webpack-dev-server
   >  -  --open 表示运行完毕直接在浏览器打开
   >  -  --port 表示端口号的更改
   >  -  -- contentBase src  表示打开的根路径为src
   >  -  --hot 表示每次改变内容不会重新打包 bundle.js 而是局部更新

-  注意：热更新在JS中表现的不明显，可以从一会儿要讲到的CSS身上进行介绍说明！

#### 1.2.4.2 方式2

-  修改 `webpack.config.js` 文件，新增 `devServer` 节点如下：

   ```js
   devServer: { // 这是配置 dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
      //  --open --port 3000 --contentBase src --hot
      open: true, // 自动打开浏览器
      port: 3000, // 设置启动时候的运行端口
      contentBase: 'src', // 指定托管的根目录
      hot: true // 启用热更新 的 第1步
    }
   ```

-  在头部引入 `webpack` 模块：

   ```js
   // 启用热更新的 第2步
    const webpack = require('webpack')
   ```

-  在`plugins`节点下新增，这是配置 `dev-server` 命令参数的第二种形式，相对来说，这种方式麻烦一些

   ```js
   module.exports = {
       devServer: { 
           //  --open --port 3000 --contentBase src --hot
           open: true, // 自动打开浏览器
           port: 3000, // 设置启动时候的运行端口
           contentBase: 'src', // 指定托管的根目录
           hot: true // 启用热更新 的 第1步
       },
       plugins: [ // 配置插件的节点
           new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象，这是启用热更新的第 3 步
       ]
   }
   ```
- 安装好以后就可以输入 `npm run dev` 执行。

### 1.2.5 html-webpack-plugin

-   在上面我们可以在 `package.json` 里面配置启动页面，同时，我们也可以用`html-webpack-plugin`配置。使HTML加载在内存中。这样就不用再页面中引入 bundle.js 了

#### 1.2.5.1 使用 html-webpack-plugin 插件配置启动页面

-   由于使用 `--contentBase` 指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面。

##### 1. 运行安装到开发依赖

```powershell
npm i html-webpack-plugin --save-dev
```

##### 2. 修改 webpack.config.js 配置文件如下：

-   这个插件的两个作用：
    -   自动在内存中根据指定页面生成一个`内存的页面` 
    -   自动把打包好的 `bundle.js` 追加到页面中去

```js
// 导入处理路径的模块
var path = require('path');

// 导入自动生成HTMl文件的插件
var htmlWebpackPlugin = require('html-webpack-plugin');

//如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
module.exports = {
    plugins:[ //创建一个在内存中生成 HTML 页面的插件
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename:'index.html'//自动生成的HTML文件的名称
        })
    ]
}
```

##### 3. 修改 package.json 中 script  节点中的 dev 指令如下：

```js
"scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
 }
```

-   最后，我们就可以将 ndex.html 中 script 标签注释掉，因为 html-webpack-plugin 插件会自动把bundle.js 注入到 index.html 页面中！

 

### 1.2.6 loader配置处理css样式

-   webpack, 默认只能打包处理 JS 类型的文件，无法处理 其它的非 JS 类型的文件，如果要处理 非JS类型的文件，我们需要手动安装一些 合适 第三方 loader 加载器；
    -   如果想要打包处理 css 文件，需要安装 `npm i style-loader css-loader -D`
    -   打开 `webpack.config.js` 这个配置文件，在里面，新增一个配置节点，叫做 `module`, 它是一个对象；在 这个 module 对象身上，有个 `rules` 属性，这个 `rules` 属性是个数组；这个数组中存放了所有第三方文件的 匹配和 处理规则；
    -   `module`  这个节点，用于配置所有第三方模块加载器
    -   `rules` 所有第三方模块的匹配规则

-   首先通过es6引用

    ```js
    // 使用 import 语法，导入 CSS样式表
     import './css/index.css'
     import './css/index.less'
     import './css/index.scss'
    ```

    ##### 

#### 1. css-loader

-   安装

    ```powershell
    npm i style-loader css-loader -D
    ```


-   通过css-loader配置处理

    ```js
    module: {  
        rules: [ 
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //  配置处理 .css 文件的第三方loader 规则
        ]
    }
    ```

    ##### 

#### 2. less-loader

-   安装依赖插件

    ```powershell
    npm i less-loader –D
    npm i less -D
    ```

-   通过less-loader配置处理

    ```js
    module: {  
        rules: [ 
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理 .less 文件的第三方 loader 规则
        ]
    }
    ```


#### 3. sass-loader

-   安装依赖插件

    ```powershell
    npm i sass-loader –D
    npm I node-sass -D
    ```

-   通过sass-loader配置处理

    ```js
    module: { // 这个节点，用于配置 所有 第三方模块 加载器 
        rules: [ // 所有第三方模块的 匹配规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 .scss 文件的 第三方 loader 规则
        ]
    }
    ```

-   注意： webpack 处理第三方文件类型的过程：

    >   -   发现这个 要处理的文件不是JS文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
    >   -   如果能找到对应的规则， 就会调用 对应的 loader 处理 这种文件类型； 
    >   -   在调用 loader 的时候，是从后往前调用的；
    >   -    当最后的一个 loader 调用完毕，会把 处理的结果，直接交给 webpack 进行 打包合并，最终输出到  bundle.js 中去

 

#### 4. url-loader 的使用

-   默认情况下，webpack 无法处理 CSS 文件中的 url 地址，不管是图片还是字体库， 只要是 URL 地址，都处理不了

-   安装依赖插件

    ```powershell
    npm i url-loader file-loader –D
    ```

-   ##### 处理图片

    ```js
    { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
    ```

    -   `limit` 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为`base64`格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串

    -   `name=[hash:8]-[name].[ext]`    `name` 可以设置图片名字, `[hash:8]`表示使用`8位的hash值`，然后用"`-`"拼接上原来的 name 和 后缀名

-   ##### 处理字体文件

    ```js
    { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件的 loader
    ```


### 1.2.7 webpack中的babel的配置

-   在 `webpack` 中，默认只能处理 一部分 ES6 的新语法，一些更高级的 ES6 语法或者 ES7 语法，webpack 是处理不了的；这时候，就需要借助于第三方的 `loader`，来帮助 webpack 处理这些高级的语法，当第三方 loader 把高级语法转为低级的语法之后，会把结果交给 webpack 去打包到 `bundle.js` 中
-   通过 Babel ，可以帮我们将高级的语法转换为低级的语法：

#### 配置步骤：

1. 在 webpack 中，可以运行如下两套 命令，安装两套包，去安装 Babel 相关的loader功能：

   ```powershell
   第一套包： npm i babel-core babel-loader babel-plugin-transform-runtime -D
   第二套包： npm i babel-preset-env babel-preset-stage-0 -D
   ```


2. 打开 webpack 的配置文件，在 module 节点下的 rules 数组中，添加一个 新的 匹配规则：

   ```js
   { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }
   ```

-  注意： 在配置 babel 的 loader 规则的时候，必须 把 `node_modules`目录，通过 `exclude` 选项排除掉：原因有俩：
   -  如果不排除 `node_modules`， 则 `Babel` 会把 `node_modules` 中所有的第三方 JS 文件，都打包编译，这样会非常消耗CPU，同时打包速度非常慢；
   -  哪怕最终 Babel 把所有 `node_modules` 中的 JS 转换完毕了，但是项目也无法正常运行！

3. 在项目的根目录中，新建一个叫做 `.babelrc`  的 Babel 配置文件，这个配置文件，属于`JSON`格式，所以，在写 `.babelrc` 配置的时候，必须符合JSON语法规范： 不能写注释，字符串必须用双引号。在 `.babelrc` 写如下的配置：  大家可以把 `preset` 翻译成 【语法】 的意思，其中有我们装过的两套语法，`plugins` 是插件，是我们之前安装的插件。

   ```js
   {
      "presets": ["env", "stage-0"],
      "plugins": ["transform-runtime"]
    }
   ```

-  了解： 目前，我们安装的 `babel-preset-env`, 是比较新的ES语法， 之前我们安装的是 `babel-preset-es2015`现在，出了一个更新的 语法插件，叫做 `babel-preset-env` ，它包含了所有的 和 es 相关的语法

-  现在，我们就可以书写es6的某些语法了，比如：

```js
// class 关键字，是ES6中提供的新语法，是用来 实现 ES6 中面向对象编程的方式
 class Person {
   static info = { name: 'zs', age: 20 }
 }

// 访问 Person 类身上的  info 静态属性
console.log(Person.info)
```



### 1.2.8 使用vue实例的render方法渲染组件

-  app将会被login组件替换。

   ```html
   <div id="app">
     <p>444444</p>
   </div>
   ```

   ```js
   var login = {
     template: '<h1>这是登录组件</h1>'
   }
   // 创建 Vue 实例，得到 ViewModel
   var vm = new Vue({
     el: '#app',
     data: {},
     methods: {},
     render: function (createElements) { // createElements 是一个 方法，调用它，能够把 指定的 组件模板，渲染为 html 结构
       return createElements(login)
       // 注意：这里 return 的结果，会 替换页面中 el 指定的那个 容器
     }
   });
   ```

 

## 1.3 在webpack构建的项目中，使用 Vue 进行开发

### 1.3.1 script导入和Vue的区别

- 在 webpack 中， 使用 `import Vue from 'vue'` 导入的 Vue 构造函数功能不完整只提供了 `runtime-only` 的方式，并没有提供像网页中那样的使用方式；

   ```js
   import Vue from 'vue'
   ```

- 包的查找规则：

   >  -  找项目根目录中有没有 `node_modules` 的文件夹
   >  -  在 `node_modules` 中根据包名，找对应的 vue 文件夹
   >  -  在 vue 文件夹中，找 一个叫做 `package.json` 的包配置文件
   >  -  在 `package.json`文件中，查找 一个 main 属性【main属性指定了这个包在被加载时候，的入口文件】

- 我们通过这种方式查找到的vue的包并不是我们网页中的严格版。

##### 解决办法

-  第一种方法：手动的修改路径 

```js
import Vue from '../node_modules/vue/dist/vue.js'
```

-  第二种方式：在 `webpack.config.js` 文件中的 `module.exports` 中添加 `resolve` 属性然后再添加 `alias` 属性去修改Vue被导入时候的包的路径

```js
import Vue from 'vue'
```

```js
module.exports = {
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径 以vue结尾的导入包的路径
      "vue$": "vue/dist/vue.js"
    }
  }
}
```

### 1.3.2 Vue 中结合render渲染组件

- 在 webpack 中， 使用 `import Vue from 'vue'` 导入的 Vue 构造函数功能不完整只提供了 `runtime-only` 的方式，并没有提供像网页中那样的使用方式。同时，也不能像原来那样注册组件。因此，我们可以借助 `render` 渲染组件。主要步骤如下：

#### 1.3.2.1 构建 .vue 文件

-  在Vue中的组件我们可以单独的建一个后缀名为.vue的文件，文件包含三个部分。

   ```vue
   <template>
     <div>
   
     </div>
   </template>
   
   <script>
   export default {
     data () {
       return {
   
       }
     },
     components: {
   
     }
   }
   </script>
   
   <style>
   </style>
   ```


#### 1.3.2.2 配置相关loader

- 默认 webpack 无法打包  .vue  文件，需要安装相关的 loader：

  ```powershell
  npm i vue-loader vue-template-compiler -D
  ```

  在配置文件中，新增loader配置项

  ```js
  { test:/\.vue$/, use: 'vue-loader' }
  ```

#### 1.3.2.3 导入组件login

- 导入login组件

  ```js
  import login from './login.vue'
  ```


#### 1.3.2.4 注册组件

- 使用 render 函数注册组件。注意，以下是es6的简写

  ```js
  var vm = new Vue({
    el: '#app',
    data: {
      msg: '123'
    },
    /* render: function (createElements) {
      return createElements
    } */
    render: c => c(login)	// es6的简写
  })
  ```




#### 1.3.2.5 总结

##### 1. 安装vue的包

- 使用npm安装Vue包

  ```js
  npm i vue -S
  ```


##### 2. 配置loader

- 由于 在 webpack 中，推荐使用 ` .vue` 这个组件模板文件定义组件，所以，需要安装能解析这种文件的 `loader `

  ```powershell
  npm i vue-loader vue-template-complier -D
  ```

##### 3. 导入Vue模块

- 在 main.js 中，导入 vue 模块 

  ```js
   import Vue from 'vue'
  ```


##### 4. 创建Vue模板

- 定义一个 `.vue` 结尾的组件，其中组件有三部分组成： `template script style`


##### 5. 导入模板

- 导入 login 模板

  ```js
  import login from './login.vue'
  ```


##### 6. 创建Vue实例

- 创建 Vue 实例，并使用 render 进行渲染模板

  ```js
  var vm = new Vue({
    el: '#app',
    render: c => c(login)	// es6的简写
  })
  ```


### 1.3.3 default export 和 export

- 在 ES6中，也通过规范的形式，规定了 ES6 中如何 `导入` 和`导出` 模块。

- ES6中导入模块，使用  `import`  `模块名称`  `from`   `模块标识符`    import 表示路径。

- 在 ES6 中，使用 `export default` 和 `export` 向外暴露成员

#### 1.3.3.1 default export

> 1. export default 向外暴露的成员，可以使用任意的变量来接收
> 2. 在一个模块中，export default 只允许向外暴露1次
> 3. 在一个模块中，可以同时使用 export default 和 export 向外暴露成员



```js
var info = {
   name: 'zs',
   age: 20
 }
 export default info
```

```js
import m222 from './test.js'
console.log(m222)
```



#### 1.3.3.2 exports

> 1. 使用 `export` 向外暴露的成员，只能使用 `{}` 的形式来接收，这种形式，叫做 【`按需导出`】
> 2. export 可以向外暴露多个成员， 同时，如果某些成员，我们在 import 的时候，不需要，则可以 不在 {}  中定义
> 3. 使用 export 导出的成员，必须严格按照导出时候的名称，来使用  `{}`  按需接收；
> 4. 使用 export 导出的成员，如果就想换个名称来接收，可以使用 `as` 来起别名；



```js
export var title = '小星星'
export var content = '哈哈哈'
```

```js
import m222, {title , content} from './test.js'
console.log(title + ' --- ' + content)
```

```js
import m222, {title as title123, content} from './test.js'
console.log(title123 + ' --- ' + content)
```



### 1.3.4 webpack使用vue-router

####  1.3.4.1 安装 和 导入 路由

##### 1. 安装

```powershell
npm i vue-router
```

##### 2. 导入

```js
import Vue from 'vue'
 // 1. 导入 vue-router 包
 import VueRouter from 'vue-router'
 // 2. 手动安装 VueRouter 
 Vue.use(VueRouter)

 // 导入 app 组件
 import app from './App.vue'
// 导入 Account 组件
import account from './main/Account.vue'
import goodslist from './main/GoodsList.vue'
```



##### 3. 创建路由对象

```js
var router = new VueRouter({
  routes: [
    { path: '/account', component: account },
    { path: '/goodslist', component: goodslist }
  ]
})
```



##### 4. 将路由对象挂载到 vm 上

```js
var vm = new Vue({
  el: '#app',
  render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以不要把路由的 router-view 和 router-link 直接写到 el 所控制的元素中
  router // 4. 将路由对象挂载到 vm 上
})
```



### 1.3.5 组件中的style标签

- 普通的 style 标签只支持普通的样式，如果想要启用 scss 或 less ，需要为 style 元素，设置 lang 属性

  ```vue
  <template>
  	<div>
    </div>
  </template>
  
  <style lang="scss">
    body {
      div {
        font-style: italic;
      }
    }
  </style>
  ```

- 只要咱们的 `style` 标签， 是在 `.vue` 组件中定义的，那么推荐都为 style 开启 `scoped` 属性。scoped 表示样式只在此组件生效。

  ```vue
  
  ```
  <template>
  	<div>
    </div>
  </template>

  <script>
  </script>

  <style lang="scss" scoped>
  </style>
   ```
  
   ```


### 1.3.6 抽离路由模块

#### 1.3.6.1 router.js模块

```js
import VueRouter from 'vue-router'

// 导入 Account 组件
import account from './main/Account.vue'
import goodslist from './main/GoodsList.vue'

// 导入Account的两个子组件
import login from './subcom/login.vue'
import register from './subcom/register.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    // account  goodslist
    {
      path: '/account',
      component: account,
      children: [
        { path: 'login', component: login },
        { path: 'register', component: register }
      ]
    },
    { path: '/goodslist', component: goodslist }
  ]
})

// 把路由对象暴露出去
export default router
   ```



 

   ```