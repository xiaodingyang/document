# Node.js

## 1.1    Node学前

### 1.1.1 了解Node

#### 1.1.1.1 Node.js是什么？

- `Node`不是一门语言，不是库，不是框架，是一个 JavaScript 运行时环境。简单的来说就是`Node`可以解析和执行JavaScript代码，以前只有浏览器可以执行 JavaScript 代码，也就是说现在的 JavaScript 可以完全脱离浏览器运行。

- `事件驱动`、`非阻塞IO模型`（异步）、`轻量`和`高效`

- `npm`是世界上最大的开源库生态系统，绝代多数 JavaScript 相关的包都放在了`npm`上，这样做的目的是为了让开发人员更方便的去下载使用。

  > 总结：Node.js 使用 ESMAScript 语法规范，外加 nodejs API，缺一不可，处理 http，处理文件等

#### 1.1.1.2. Node.js 中的 JavaScript

- 没有 `BOM`、`DOM`
- `EcmaScript` 基本的 JavaScript 语言部分
- 在 `Node` 中为 JavaScript 提供了一些服务器级别的` API` （例如： `文件读写`、`网络服务的构建`、`网络通信`、`http服务器`）

#### 1.1.1.3. Node.js构建与Chrome的V8引擎之上

- 代码只是具有特定格式的字符串而已，引擎可以认识他，可以帮你去解析和执行。
- `Google Chrome` 的 `V8` 引擎是目前供人的解析执行  JavaScript 代码最快的
- `Node.js` 作者把 `Google Chrome` 中的V8引擎移植了出来，开发了一个独立的JavaScript运行时环境。

#### 1.1.1.4. Node.js能做什么？

> web服务器后台	命令行工具：npm(node)      git(c语言)      hexo(node)

 

### 1.1.2. stream

- 



## 1.2 安装Node环境

### 1.2.1 查看Node版本号

``` shell
node --version
```



### 1.2.2 下载

[Node下载地址](http://nodejs.cn/download/)

### 1.2.3 安装

- 傻瓜式操作下一步，如果安装过后的再次安装会覆盖原有的版本。确认安装是否成功，打开命令行输入 。

```shell
node --version
```



## 1.3 Node基本操作

### 1.3.1 Node执行js脚本文件

##### 语法：

- 在cdm命令行，使用cd切换到文件当前目录。或者，在当前目录 `shfit + 右键`。然后，在此处窗口打开命令行

- `node 文件名`，按回车执行文件

```javascript
var far = "Hello Node.js";
console.log(far);
```

- 结果，在命令行窗口输出 "`Hello Node.js`"

##### 注意：

> - 不要将文件名命名为 `node.js`，最好不要使用中文命名。
>
> - 在 node 里面没有 `DOM` 和 `BOM`，因此，没有 `window` 和 `document`

 

### 1.3.2 文件读取

- 浏览器中的  JavaScript  是没有文件操作的能力的，但是 Node 中的 JavaScript 具有文件操作的能力，我们来看看node怎么读取其他文件

```javascript
var fs = require('fs')
```

- 以上代码，`fs` 是  `file-system`  的简写，就是 `文件系统` 的意思，在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块，在 fs 这个核心模块中，就提供了所有的文件操作相关的 API。

- 例如：`fs.readFile`  就是用来读取文件的：

> - 第1个参数：要读取的文件路径（和js和HTML中路径一样）
> - 第2个参数：一个回调函数，在回调函数中：`成功`（data数据，error null ），`失败`（data没有数据， error 错误对象）

```javascript
fs.readFile('./data/a.txt', function (error, data) {
  if (error) {
		console.log('读取文件失败了')
  } else {
    	console.log(data.toString())
  }
})
```

-  为什么我们要给 data 加上 `toString()` 呢？

> - 文件中存储的其实都是二进制数据 0 1，这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了，所以我们可以通过   `toString()`  方法把其转为我们能认识的字符。

 

### 1.3.3 writeFile写文件

##### 语法：

- `第1个参数`：文件路径
- `第2个参数`：文件内容
- 第3个参数： 写入文件的方式
- `第4个参数`：回调函数（参数： error     文件写入成功： error 是 null       文件写入失败： error 就是错误对象,，里面有相应的报错信息）

```js
fs.writeFile(url, content, opt, callBack)
```

```javascript
var fs = require("fs");
const opt = {
  flag: 'a' // a 是追加写入， 'w' 是覆盖
}
fs.writeFile("./data/test.txt", "我是写入的内容！", opt, function (error) {
   if(error){
      console.log(error);
   }
})
```



- 判断文件是否存在

  ```
  fs.exists(failName, (exist)=>{
  	console.log('exist', exist) // 布尔值
  })
  ```

### 1.3.4  Stream

- 客户端向服务端传递数据，可以一点一点的传，一点一点的接收

  ```js
  // 标准输入输出，pipe 就是管道 （符合水流管道的模型图）
  // process.stdin.pipe(process.stdout)
  process.stdin.pipe(process.stdout)
  ```

  ```js
  const http = require('http')
  const server = http.createServer((req,res)=>{
  	if(req.method === 'POST') req.pipe(res)
  })
  server.listen(8000)
  ```

- 操作文件

  ```js
  const fs = require('fs)
  const readSteam = fs.createReadStream(fileName1) // 读取文件的 stream 对象           
  const writeSteam = fs.createWriteStream(fileName2) // 写入文件的 stream  
  readStream.pipe(writeStream) // 通过 pipe 执行拷贝
  readStream.on('end', ()=>{
    console.log('拷贝完成') // 数据读取完成
  })
  ```

- 将文件读取的内容 res

  ```js
  const http = require('http')
  const server = http.createServer((req,res)=>{
  	if(req.method === 'GET'){
  		const stream = fs.createReadStream(fileName)
  		stream.pipe(res) // 将 res 作为 stream 的 dest
  	}
  })
  server.listen(8000)
  ```

- 





### 1.3.4 简单的http服务(搭建服务器)

服务器的执行过程：

- 提供服务：对数据的服务
- 发请求
- 接收请求
- 处理请求
- 给个反馈（发送响应）

#### 1. 加载 http 核心模块

```javascript
var http = require('http')
```

#### 2. http.createServer()

- 使用  `http.createServer()`  方法创建一个 Web 服务器， 返回一个 `Server` 实例。

```javascript
var server = http.createServer()
```

#### 3. 注册 request 请求事件

- 当客户端请求过来，就会自动触发服务器的 ` request` 请求事件，然后执行第二个参数：`回调处理函数`

```javascript
server.on('request', function () {
   console.log('收到客户端的请求了')
})
```

#### 4. 绑定端口号，启动服务器

```javascript
server.listen(3000, function () {
   console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```

### 1.3.5 http响应

#### 1. 加载 http 核心模块

```c++
var http = require('http')
```

#### 2. http.createServer() 

- 使用  `http.createServer()`  方法创建一个 Web 服务器 返回一个 `Server` 实例

```javascript
var server = http.createServer()
```

#### 3. 注册 request 请求事件

- 当客户端请求过来， 就会自动触发服务器的 request 请求事件， 然后执行第二个参数： 回调处理函数。request 请求事件处理函数， 需要接收两个参数：
	- `参数1`：request 请求对象，请求对象可以用来获取客户端的一些请求信息， 例如请求路径
	- `参数2`：response 响应对象，响应对象可以用来给客户端发送响应消息
	- `response.write` : 可以用来给客户端发送响应数据, write 可以使用多次， 但是最后一定要使用 `end` 来结束响应， 否则客户端会一直等待。因此，通常可以直接使用 end 来给客户端做出响应.。
	- `request.url`: 客户端请求的路径(端口号以后的路径，以"`/`"开头。)

```javascript
server.on('request', function (request, response) {
  // 当请求不同的路径的时候响应不同的结果
  if (request.url === "/" || request.url === "/index") {
      response.write('index')
  } else if (request.url === "/login"){
     response.write('login')
  } else if (request.url === "/register"){
     response.write('register')
  }else{
     response.write('404 Not Found')
  }
  response.end()
})
```



#### 4. 绑定端口号，启动服务器

```javascript
server.listen(3000, function () {
   console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```
- 响应内容（write或者end）只能是`二进制数据`或者`字符串`（不能是，数字，对象，数字，布尔值等等）。因此，需要使用`JSON.stringify()`转化为字符串格式。

```javascript
var products = [{
        name: '苹果 X',
        price: 8888
      }
]
res.end(JSON.stringify(products))
```



### 1.3.6 核心模块

- Node 为 JavaScript 提供了很多服务器级别的 API ，这些 API 绝大多数都被包装到一个具名的核心模块当中。列入文件操作的 `fs核心模块`，http服务构建的`http模块`，`path路径操作块`，`os操作系统信息模块`。我们在使用一个核心模块的时候就需要`require`，如：

```javascript
var http = require('http')
```

- require 是一个方法， 它的作用就是用来加载模块的， 在 Node 中， 模块有三种：
	- 具名的核心模块， 例如 fs、 http
	- 用户自己编写的文件模块
	- 第三方模块

#### 用户自定义文件模块

- 在 Node 中， 没有全局作用域， 只有`模块作用域`， 外部访问不到内部， 内部也访问不到外部。require 方法有两个作用：

	- 加载文件模块并执行里面的代码

	- 拿到被加载文件模块导出的`接口对象`， 在每个文件模块中都提供了一个对象： `exports`， exports 默认是一个空对象， 你要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中。

##### a文件：

```javascript
var bExports = require('./b')
console.log(bExports.add(10, 30))
```

##### b文件：

```javascript
exports.add = function (x, y) {
   return x + y
}
```

> 注意：在加载用户自己编写的文件模块的时候， 相对路径必须加 "`./`"，可以省略后缀名。

 

### 1.3.7 ip地址和端口号

> - ip地址用来定位计算机，端口号用来定位具体的应用程序
> - 一切需要互联网通信的软件都会占用一个端口号，端口号的范围从`0-65536`之间
> - 在计算器中有一些默认的端口号，最好不要去使用，例如http服务的 `80`，我们在开发过程中使用一些简单好记的就可以了，例如：`3000`,`5000`等没什么含义
> - 可以同时开启多个服务，但是一定要确保不同的服务占用不同的端口号

 

### 1.3.8 响应内容类型Content-type

#### 1.3.8.1 简单的 Content-type

- 在服务端默认发送的数据， 其实是 `utf8` 编码的内容, 但是浏览器不知道你是 `utf8` 编码的内容, 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析, 中文操作系统默认是 `gbk`, 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的，在 `http` 协议中， `Content - Type` 就是用来告知对方我给你发送的数据内容是什么类型:

```javascript
res.setHeader('Content-Type', 'text/plain; charset=utf-8') /* 普通文本（在页面中只会当做普通文本渲染） */
res.setHeader('Content-Type', 'text/html; charset=utf-8') /* html文本（在页面中标签会被渲染） */
```

```javascript
var http = require('http') 
var server = http.createServer()
server.on('request', function (req, res) {
   var url = req.url
   if (url === '/plain') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8') /* 普通文本（在页面中只会当做普通文本渲染） */
      res.end('hello 世界')
   } else if (url === '/html') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8') /* html文本（在页面中标签会被渲染） */
      res.end('<p>hello html <a href="">点我</a></p>')
   }
})
server.listen(3000, function () {
   console.log('Server is running...')
})
```

或者

```javascript
fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  
})
```



#### 1.3.8.2 发送文件数据以及Content-type内容类型

- 不同的资源对应的 Content-Type 是不一样的 具体的对照网址：`http://tool.oschina.net/commons`

- 图片不需要指定编码，一般只有字符数据才指定编码。

```javascript
var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
   var url = req.url
   if (url === '/') {
      /* 读取html文件响应客户端请求，渲染到页面 */
      fs.readFile('./resource/index.html', function (err, data) {
         if (err) {
            console.log(err);
         } else {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(data)
         }
      })
   } else if (url === '/baby') {
      // url：统一资源定位符 一个 url 最终其实是要对应到一个资源的
      fs.readFile('./resource/ab2.jpg', function (err, data) {
         if (err) {
            console.log(err);
         } else {
            // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
            res.setHeader('Content-Type', 'image/jpeg')
            res.end(data)
         }
      })
   }
})

server.listen(3000, function () {
   console.log('Server is running...')
})
```

 

### 1.3.9 初步实现Apache功能

```javascript
var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
   var url = req.url
   var wwwDir = 'F:/我的学习/01-前端/01-笔记/08-Node/01-day/www'  /* 将根路径分出来 */
   var fullPath = '/index.html'

   if (url !== '/') {
      fullPath = url /* 如果url不等于 / 那么就将请求的路径赋值给 fullPath */
   }
   /* 将拿到的 fullPath 中的文件读取出来 */
   fs.readFile(wwwDir + fullPath, function (error, data) {
      if (error) {
         res.setHeader('Content-Type', 'text/plain; charset=utf-8')
         return res.end(error.toString()) /* 注意：只能是二进制数据或字符串 */
      } else {
         res.end(data)
      }
   })

})
server.listen(3000, function () { 
   console.log('running...'); 
 })
```



### 1.3.10 模板引擎

- `art-template` 模板引擎不仅可以在浏览器使用，也可以在node中使用
- 模板引擎不关心你的字符串内容，只关心自己能认识的模板标记语法，例如` {{}}`
- `{{}}` 语法被称之为` mustache` 语法，八字胡语法。

#### 1.3.10.1 安装

- 使用npm在当前目录安装模板引擎

```shell
npm i art-template --save
```

- 该命令在哪执行就会把包下载在哪里。默认会下载到 `node_modules` 中，这个补录不能去修改，也不支持修改，根据相对路径导入`node_modules`中的 `template-web.js`：

```javascript
<script src="../node_modules/art-template/lib/template-web.js"></script>
```

#### 1.3.10.2 在浏览器中使用

```html
<!doctype html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width user-scalable=no initial-scale=1.0 maximum-scale=1. minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="">
      <script src=""></script>
      <title>在浏览器中使用art-template</title>
   </head>

   <body>
      <script src="../node_modules/art-template/lib/template-web.js"></script>
      <script type="text/template" id="tpl">
         <!DOCTYPE html>
         <html lang="en">
         <head>
            <meta charset="UTF-8">
            <title>Document</title>
         </head>
         <body>
            <p>大家好，我叫：{{ name }}</p>
            <p>我今年 {{ age }} 岁了</p>
            <h1>我来自 {{ province }}</h1>
            <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}
            </p>
         </body>
         </html>
      </script>
      <script>
         var ret = template('tpl', {
            name: 'Jack',
            age: 18,
            province: '北京市',
            hobbies: ['写代码', '唱歌', '打游戏']
         })
      </script>
   </body>
</html>
```



 

#### 1.3.10.3 在Node中使用模板引擎

- `art-template` 不仅可以在浏览器使用，也可以在 `node` 中使用，在需要使用的文件模块中加载 `art - template`，只需要使用 `require` 方法加载就可以了： `require('art-template')`, 参数中的 `art - template` 就是你下载的包的名字 (不用担心路径问题)

```javascript
var template = require('art-template')
```

##### 渲染：

- 参数1：从文件读取到的数据
- 参数2：给模板传的数据

```javascript
var ret = template.render(String,obj)
```

##### 在Node中使用：

```javascript
var fs = require('fs')

fs.readFile('./tpl.html', function (error, data) {
  if (error) {
    return console.log('读取文件失败了')
  }
  var ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })
})

```

> 注意：默认读取到的 data 是二进制数据, 而模板引擎的 render 方法需要接收的是字符串，所以我们在这里需要把 data 二进制数据转为 字符串 才可以给模板引擎使用 。

 ```html
<!DOCTYPE html>
<html lang="en">

   <head>
      <meta charset="UTF-8">
      <title>{{ title }}</title>
   </head>

   <body>
      <p>大家好，我叫：{{ name }}</p>
      <p>我今年 {{ age }} 岁了</p>
      <h1>我来自 {{ province }}</h1>
      <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
      <script>
         var foo = '{{ title }}'
      </script>
   </body>

</html>
 ```

以上代码，其中 `each` 表示遍历生成项目，hobbies 有多少项，就生成多少项， `$value` 是每一项的值。

#### 1.3.10.4 在Apache中使用

```javascript
var http = require('http')
var fs = require('fs')
var template = require('art-template')

var server = http.createServer()

var wwwDir = 'F:/我的学习/01-前端/01-笔记/08-Node/02-day/www'

server.on('request', function (req, res) {
   var url = req.url
   fs.readFile('./template-apache.html', function (err, data) {
      if (err) {
         return res.end('404 Not Found.')
      }
      /* 1. 读取目录，读取的目录名称放置在files里面 */
      fs.readdir(wwwDir, function (err, files) {
         if (err) {
            return res.end('Can not find www dir.')
         }
         /* 2. 使用模板引擎替换 */
         var htmlStr = template.render(data.toString(), {
            title: '在Apache中加入模板引擎',
            files: files
         })
         // 3. 发送解析替换过后的响应数据
         res.end(htmlStr)
      })
   })
})
server.listen(3000, function () {
   console.log('running...')
})
```



### 1.3.11 处理网站中的静态资源

浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，当在解析的过程中，如果发现：

- link
- script
- img
- iframe
- video
- audio

等带有 `src` 或者 `href(link)` 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。

```html
<link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
```

这时候我们需要统一处理：

- 如果请求路径是以  `/public/` 开头的，则我认为你要获取 `public `中的某个资源，所以我们就直接可以把请求路径当作文件路径来直接进行读取

 ```javascript
http.createServer(function (rep, res) {
   var url = rep.url
   if( url === '/'){
      fs.readFile('./views/index.html', function (error, data) {
         if (error) {
            res.end('404 Not Found!')
         }
         res.end(data)
      })
   }
   /* 统一处理：如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源，所以我们就直接可以把请求路径当作文件路径来直接进行读取 */
   else if (url.indexOf('/public/') === 0){
      fs.readFile( '.' + url, function (error, data) {
         if (error){
            return res.end('404 Not Found')
         }
         res.end(data)
      })
   }
})
.listen(3000, function () {
   console.log('running...');
   
})

 ```

这个时候我们就可以将 index.html 中请求的 bootstrap 加载到页面中

> 注意：在服务端中，文件中的路径就不要去写相对路径了。因为这个时候所有的资源都是通过 url 标识来获取的，我的服务器开放了` /public/` 目录, 所以这里的请求路径都写成：`/public/xxx`, / 在这里就是 `url 根路径`的意思。浏览器在真正发请求的时候会最终把 `http://127.0.0.1:3000` 拼上。不要再想文件路径了，把所有的路径都想象成 url 地址。

如下：

```html
<link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
```



### 1.3.12 处理表单get提交

在Node中有 `url.parse` 方法，可以将路径进行处理分割。

```javascript
var url = require('url')
/* true表示将query中的查询字符串转换为对象 */
var obj = url.parse('127.0.0.1:3000/pinglun?name=xiaoyang&message=大家好', true) 
console.log(obj)
```

console 出的值为：

```json
Url {
   protocol: '127.0.0.1:',
   slashes: null,
   auth: null,
   host: '3000',
   port: null,
   hostname: '3000',
   hash: null,
   search: '?name=xiaoyang&message=大家好',
   query: {
		name: 'xiaoyang',
		message: '大家好'
   },
   pathname: '/pinglun',
   path: '/pinglun?name=xiaoyang&message=大家好',
   href: '127.0.0.1:3000/pinglun?name=xiaoyang&message=大家好'
}
```

以上代码，我们可以发现，通过 get 提交上来的数据存在 `query`中 ，通过 `url.parse` 可以转换为对象。

### 1.3.13 表单提交重定向

通过服务器让客户端重定向

- 状态码  `statusCode` 设置为 `302` 临时重定向
- 在响应头  `setHeader` 中通过 `Location` 告诉用户重定向到哪

如果客户端发现收到服务器的相应状态码是 302 就会自动去响应头中找 location

```javascript
res.statusCode = 302
res.setHeader('Location', '/')
```

以上代码表示重定向到根路径

 

### 1.3.14 Node中时间格式化

##### 安装

```shell
npm install moment
```



##### 导入

```javascript
var moment = require("moment");  */\` *时间格式化* `/*
```



##### 时间格式化

```javascript
moment(new Date()).format('YYYY-MM-DD HH:mm:ss') 
```



### 1.3.15 Node模块系统

#### 1.3.15.1 Node的模块

使用Node编写应用程序主要就是在使用：

##### 1. EcmaScript语言

- 和浏览器不一样，Node中没有 `BOM`、`DOM`

##### 2. 核心模块

- 文件操作的`fs`
- http服务的`http`
- `url`路径操作模块
- `path`路径处理模块
- `os`操作系统信息

##### 3. 第三方模块

- art-template	
- 必须通过npm安装才可以使用

##### 4. 自定义模块

- 自己创建的文件

#### 1.4.5.2 CommonJS模块规范

##### 1. 模块化

- 文件作用域
- 通信规则（加载require，exports导出）

在Node中的JavaScript还有一个重要的概念，`模块系统`:

- 模块作用域
- 使用require方法来加载模块
- 使用exports接口对象来导出模块中的成员

##### 2. 加载require

语法：

```shell
var 自定义变量名称 = require(“模块”)
```

两个作用：

- 执行被加载模块中的代码
- 得到被加载中的 `exports` 导出的接口对象

##### 3. 导出exports

- Node中是模块作用域，默认文件中所有的成员只在当前文件模块有效。
- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员挂载到`exports`接口对象中就可以了

导出多个成员：

```javascript
exports.= 123
exports.b = 'hello'
```

导出单个成员（拿到的就是：函数、字符串）：

```javascript
module.exports = 'hello'
```

以下情况会覆盖：

```javascript
module.exports = 'hello'
module.exports = 'world'
```

最终我们可以通过`module.exports`导出多个

```javascript
module.exports = {
   str1: 'hello',
   str2: 'world'
}
```

 

### 1.3.16  require加载规则

#### 1.3.16.1 优先从缓存加载

##### main.js中:

```javascript
require('./a')
var fn = require('./b') 
console.log(fn)
```



##### a.js中：

```javascript
console.log('a.js 被加载了')
var fn = require('./b') 
console.log(fn)
```



##### b.js中：

```javascript
console.log('b.js 被加载了') 
module.exports = function () {
  console.log('hello bbb')
}
```

以上代码：由于 在 a 中已经加载过 b 了，所以这里不会重复加载，可以拿到其中的接口对象，但是不会重复执行里面的代码，这样做的目的是为了避免重复加载，提高模块加载效率。

#### 1.3.16.2 require方法加载规则

##### 1. 自定义模块

- `./` 当前目录，不可省略
- `../` 上一级目录，不可省略
- `.js` 后缀名可以省略

```javascript
require('./foo.js')
```



##### 2. 核心模块

核心模块的本质也是文件，核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了

```javascript
require('fs')
require('http')
```



##### 3.  第三方模块

- 凡是第三方模块都必须通过 `npm` 来下载

- 使用的时候就可以通过 `require('包名')` 的方式来进行加载才可以使用

-    不可能有任何一个第三方包和核心模块的名字是一样的。

- 加载原理顺序（拿art-template举例子）：

	- 先找到当前文件所处目录中的  `node_modules` 目录

	- `node_modules/art-template`

	- `node_modules/art-template/package.json`文件中的 `main` 属性

	- main 属性中就记录了 `art-template` 的入口模块，然后加载使用这个第三方包，实际上最终加载的还是文件。

		```json
		{
		  "name": "express-demo",
		  "version": "1.0.0",
		  "description": "",
		  "main": "main.js",
		  "scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1"
		  },
		  "keywords": [],
		  "author": "",
		  "license": "ISC",
		  "dependencies": {
		    "express": "^4.16.2"
		  }
		}
		```

		> 注意：如果 `package.json` 文件不存在或者 main 指定的入口模块是也没有，则 node 会自动找该目录下的 `index.js`, 也就是说 index.js 会作为一个默认备选项。

	- 如果以上所有任何一个条件都不成立，则会进入上一级目录中的 `node_modules` 目录查找，如果上一级还没有，则继续往上上一级查找，如果直到当前磁盘根目录还找不到，最后报错。

> 注意：我们一个项目有且只有一个 `node_modules`，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包，不会出现有多个 `node_modules`。

### 1.3.17 npm 和 package.json

> npm: node package manager

#### 1.3.17.1 package.json

我们建议每个项目都要有一个 `package.json` 文件（包描述文件，就像产品说明书一样），这个文件可以通过 `npm init` 的方式来自动初始化。

```shell
C:\Users\Daniel>`npm init`
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See npm help json for definitive documentation on these fields
and exactly what they do.

Use npm install <pkg> afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (daniel)	// 包名
version: (1.0.0) 0.0.1		//版本号
description: 这是一个测试package.json		//文件描述
entry point: (index.js)	//入口文件
test command:
git repository:
keywords:		//关键字
author: xiaodingyang
license: (ISC)	//协议
About to write to C:\Users\Daniel\package.json:

{
  "name": "daniel",
  "version": "0.0.1",
  "description": "这是一个测试package.json",
  "main": "index.js",
  "dependencies": {
    "express-generator": "^4.16.0",
    "webpack-dev-server": "^3.1.4",
    "vue-loader": "^15.2.4"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "xiaodingyang",
  "license": "ISC"
}


Is this OK? (yes) y

```

如果想要跳过这些设置，让他使用默认设置：

```shell
 npm init -y
```

对于我们现在来讲，最有用的是 `devDependencies` 选项，可以用来帮我们保存第三方包的依赖信息。如果你的`node_modules`删除了也不用担心，我们只需要 `npm install` 就会自把 `package.json`中的 `devDependencies` 中所有依赖项都下载回来。

- 建议每个项目的根目录下都有一个 `package.json` 文件
- 建议执行 `npm` `install` 的时候加上 `–-save` 这个选项，目的是用来保存依赖项信息，在4.0版本以后就不需要了。

#### 1.3.17.2 package.json和package-lock.json

- npm 5以前是不会有 `package-lock.json` 这个文件的。npm5以后才加入了这个文件。
- npm5以后安装包不再需要 `–-save` 参数，他会自动保存依赖信息
- 当你安装包的时候， npm都会生成或者更新 `package``-lock.json``
- `package-lock.json` 这个文件会保存`node_modules` 中所有包的信息 （版本、下载地址），这样重新 `npm install` 的时候速度就可以提升 .
-  从文件来看，有个 lock 锁的意思，意义是用来锁定版本的，如果依赖了1.1.1版本，如果从新 `npminstall` 其实会下载最新的版本，而不是1.1.1，所以他的作用就是锁定版本号，防止自动升级。

#### 1.3.17.3 npm 常用命令

##### 1. npm init

- npm init –y 可以跳过向导，快速生成

##### 2. npm install

- 一次性把 `dependencies` 选项中的依赖项全部安装
- 简写：npm i

##### 3. npm install 包名

- 只下载包
- 简写：npm i 包名

##### 4. npm install 包名 –-save

- 下载并保存依赖项（package.json）
- 简写：npm i 包名 -S

##### 5. npm uninstall 包名

- 只删除，如果有依赖项会依然保存
- 简写：npm un 包名

##### 6. npm uninstall 包名 –save

- 删除的同时也会把依赖信息也去除
- npm un 包名 -S

##### 7. mkdir 文件名字

- 创建文件夹

#### 1.3.17.4 淘宝镜像

npm存储包文件的服务器在国外，有时候会被墙，速度很慢，所以我们通常使用淘宝镜像，即淘宝开发团队在国内将npm做了个备份

```shell
npm install –global cnpm  //安装到全局，所以在任意目录都可以执行
```

接下来你安装包的时候把之前的 npm 替换成 `cnpm`, 举个例子：

```javascript
npm install jquery   // 这里还是走国外的npm服务器，速度比较慢
cnpm install jquery   // 使用cnpm就会通过淘宝的服务器来下载
```



## 1.4 express

### 1.4.1 express基本感知

#### 1.4.1.1 安装和使用步骤

##### 1. 安装

```shell
npm install express --save
```



##### 2. 使用步骤

1.    引包

```javascript
var express = require('express')
```



2.    建立你的服务程序也就是原来的 `http.createServer`

```javascript
var app = express()
```



3.    基本路由

- 当服务器收到 `get` 请求  `/`  的时候，执行回调函数

```javascript
app.get('/', function (req, res) { 
   res.send('hello express!') /* 响应的内容 */
 })
```



- 当服务器收到 `post` 请求` /`的时候，执行回调函数

```javascript
app.post('/', function (req, res) {
	res.send('您好，我是 Express!')  /* express自动处理好了请求头 */
 })
```



4.    设置端口，相当于 `server.listen`

```javascript
app.listen(3000, function () { 
   console.log('app is running at port 3000 ...')
}) 
```



#### 1.4.1.2 静态服务

公开指定目录

##### 1. 可以通过  /public/xx  的方式访问 public 里面的资源，第一个参数只是一个标识符，可以随意取别名。常用。

```javascript
app.use('/public/', express.static('./public/'))
```



##### 2. 不用写  ./public/login.html  直接写 login.html 就可以访问public下面的资源

```javascript
app.use(express.static('./public/')) 
```



##### 3. 直接可以访问 public 下面的文件

```javascript
app.use(express.static('public'))
```



##### 4. 通过 public/xx 的形式直接可以访问public下面的文件

```javascript
app.use('/public', express.static('public'))
```



> 注意：常用第一种方式更符合逻辑一点。

#### 1.4.1.3 nodemon自动重启

我们可以使用一个第三方命令行工具： `nodemon` 来帮助我们解决频繁修改代码重启服务器的问题。 `nodemon` 是一个基于`Node.js`开发的第三方命令行工具， 我们使用的时候需要独立安装：

```shell
npm install –global nodemon
```

安装完毕之后，使用：

```javascript
nodemon app.js
```

只要是通过 `nodemon.js` 启动的服务，则他会监视你的文件变化， 当文件发生变化的时候，自动帮你重启服务器。

 

### 1.4.2 在Express中使用 art-template 模板引擎

#### 1.4.2.1 安装：

`express-art-template` 是专门用来在 `Express` 中把 `art-template` 整合到 `Express` 中， `express-art-template` 依赖于 `art-template` 所以在这里需要安装 `art-template`

```shell
npm install –-save art-template
npm install –-save express-art-template
```



#### 1.4.2.2 配置

##### 配置使 art-template 模板引擎：

- 第一个参数表示，当渲染以 `.art` 结尾的文件的时候，使用 `art-template` 模板引擎，当然，也可以改为 `html`

 ```javascript
app.engine('art', require('express-art-template'))
 ```

```javascript
app.engine('html', require('express-art-template'))
```



#### 1.4.2.3 渲染

Express 为`response`相应对象提供了一个方法：`render` , `render`方法默认是不可以使用的，但是如果配置了模板引擎就可以使用：

```javascript
res.render('html模板名', {模板数据})
```

第一个参数不能写路径，默认会去项目中的`views`目录查找改模板文件，也就是说Express有一个约定：开发人员把所有的视图文件都放到`views`目录中

```javascript
app.get('/post', function (req, res) {
  res.render('post.html', {
    title: '我是标题'
  })
})
```

如果想要修改默认的views目录

```javascript
app.set('views', 重新设置的默认路径)
```

然后就可以在模板中使用模板引擎数据了

```javascript
var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16 22:43:18'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16 22:43:18'
  }
]

```

```javascript
app.get('/', function (req, res) {
  res.render('index.html', {
    comment: comments
  })
})
```

```html
<ul class="list-group">
  {{each comment}}
  <li class="list-group-item">
      {{ $value.name }}说：{{ $value.message }}
      <span class="pull-right">{{ $value.dateTime }}</span>
  </li>
  {{/each}}
</ul>

```

##### 重定向

```javascript
res.redirect('/')   /* express里面提供的api, redirect重定向 */
```

### 1.4.3 art-template语法

#### 1.4.3.1 导入其他htm

在一个HTML里面导入另外一个HTML，需要使用模板引擎里面的include语法

```js
{{include './header.html'}}
```

#### 1.4.3.2 继承

我们建立了

- 头部`header.html`文件
- 底部`footer.html`文件
- 主页`index.html`文件
- 继承`layout.html`文件。

##### layout.html文件

导入header和footer两个文件，`block`为默认的填坑区域。在继承layout的HTML文件中就可以使用相同的block进行填坑。如果index页面需要自己的head模块和js模块，就可以在layout中通过block去挖坑，在index里面就只需要去填坑就行了。

```js
{{include './header.html'}}	//此处为header头部公共部分
{{block 'content'}} <h2>默认内容</h2> {{/block}}		//此处为填坑默认区域
{{include './footer.html'}}	//此处为footer底部公共部分
```

```html
<!doctype html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width user-scalable=no initial-scale=1.0 maximum-scale=1. minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">

    {{block 'head'}}{{/block}}
    <title>Document</title>
  </head>

  <body>
    {{include './header.html'}}
    {{block 'content'}}
    <h2>默认内容</h2>
    {{/block}}
    {{include './footer.html'}}

    <script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
    <script src="/node_modules/jquery/dist/js/jquery.js"></script>
    {{block 'script'}}{{/block}}
  </body>

</html>
```



##### index.html文件

`index.htm`l继承`layout.html`文件内容，block部分为填坑部分。

```html
{{extend './layout.html'}}
{{block 'content'}} 
  <h2>填坑内容</h2> 
{{/block}}
```



```html
{{extend './layout.html'}}

{{block 'head'}} 
  <style>
    body{
      background: paleturquoise;
    }
  </style>
{{/block}}

{{block 'content'}} 
  <h2>填坑内容</h2> 
{{/block}}

{{block 'script'}} 

{{/block}}
```



### 1.4.3 Express中get方式请求数据

Express内置了一个API，可以直接通过 `req.query` 来获取

```shell
req.query
```



### 1.4.4 Express中post方式请求数据

在Express中没有内置的获取表单POST请求体的API，这里我们需要使用一个第三方包：`body-parser`

##### 1. 安装：

```shell
npm install body-parser
```



##### 2. 导包

```javascript
var bodyParser = require('body-parser') /* POST请求数据的方式 */
```



##### 3. 配置：

```javascript
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
```



##### 4. 使用：

```javascript
app.post('/pinglun', function (req, res) {
  console.log(req.body)
})
```

##### 5.json()

由于前端使用ajax进行接收我们响应的数据，且ajax必须接收字符串格式的json，因此，需要向ajax发送字符串格式的json。express 提供了一个响应方法json() 改方法接收一个对象作为参数，会自动帮你把对象格式的接送转为字符串格式的json

```js
res.status(200).json({
	success: true
})
```



### 1.4.5 Express路由模块

在node中有一个入口js文件，我们可以命名为 `app.js`，它的职责是：

- 创建服务，做一些服务相关配置，如：模板引擎，提供静态资源服务等等。
- 挂载路由
- 监听端口启动服务

而路由模块，我们可以命名为 `router.js`，他的职责是：

- 处理路由，根据不同的请求方法+请求路径设置具体的请求处理函数

#### 1.4.5.1 router.js模块

Express提供了一种更好的方法，专门用来包装路由的

```javascript
var express = require('express')	
var router = express.Router()
router.get('/students', function (req, res) {

})
router.post('/students', function (req, res) {

})
module.exports = router   //导出router
```



#### 1.4.5.2 app.js模块

- 导入router.js模块

```javascript
var router = require('./router')  /* 导入router.js模块 */
```

- 把路由容器挂载到app服务中

```javascript
app.use(router)          /* 把路由容器挂载到app服务中 */
```



### 1.4.6 封装获取文件数据

#### 1.4.6.1 db.js 

`db.js`中的数据为我们将要获取并渲染的文件。

```json
[
   {
      "id": 1,
      "name": "小阳",
      "sex": "男",
      "age": 18,
      "hobby": "play game"
   },
   {
      "id": 2,
      "name": "樱桃",
      "sex": "女",
      "age": 20,
      "hobby": "play game"
   }
]
```



#### 1.4.6.2 student.js

`student.js`为封装模块，职责：操作文件中的数据，只处理数据，不关心业务.

```javascript
var fs = require('fs')
var dbPath = './db.json'
/* 获取所有学生列表 return []*/
exports.find = function (callBack) {
    fs.readFile(dbPath, function (err, data) { 
        err ? callback(err) : callBack(null, JSON.parse(data))
     })
}
```

> 注意：在调用find读取db.json文件和获取数据这两者是异步的，必须要先读取文件以后才能获得数据，因此需要使用回调函数，当文件读取成功以后再将值传给回调函数。上层定义，下层调用。

#### 1.4.6.3 router.js模块

```javascript
/* 加载student模块 */
var Student = require('./student')

router.get('/', function (req, res) {
   Student.find(function (err, data) {   /* 此处的find函数是student文件导出的函数 */
      if (err) res.end('文件加载失败！')
      res.render('index.html', {
         student: data /* 将students数据通过模板引擎渲染到index.html */
      })
    })
})
```

#### 1.4.6.4  404处理

```js
// 只需要在自己的路由之后增加一个
app.use(function (req, res) {
  // 所有未处理的请求路径都会跑到这里
  // 404
})
```



## 1.5 MongoDB

### 1.5.1 关系型数据库和非关系型数据库

- 所有的关系型数据库都需要通过 sql 语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 数据表还支持约束（唯一的，主键，默认值，非空）

- 非关系型数据库非常灵活，有的非关系型数据库就是 key-value 对儿，但是 `MongoDB` 是长的最新关系型数据库的非关系型数据库

- MongoDB 不需要设计表结构，也就是说你可以任意的往里面存数据，没有结构性这么一说

### 1.5.2 安装

- 在官网下载好以后，傻瓜式安装，最后一步要将左下角的√去掉
- 配置bin目录的环境变量

### 1.5.3 开启和关闭数据库

##### 1. 开启数据库

```shell
mongod
```



> 注意：mongodb 默认使用执行 `mongod` 命令所处盘符根目录下的 `/data/db` 作为自己的存储目录，所以在第一次执行命令之前先手动创建一个 `/data/db` 目录

##### 2. 停止

```shell
Ctrl + C
```



##### 3. 连接

该命令默认链接本机的MongoDB 服务

```shell
mongo
```



##### 4. 退出

在链接状态输入exit 退出连接

```
exit
```



### 1.5.4 基本命令

##### 1. 查看显示所有数据库

```shell
show dbs
```



##### 2. 切换到指定数据库（如果没有回新建）

```shell
use 数据库名称
```



##### 3. 查看当前操作的数据库

```
db
```



##### 4. 插入数据

```javascript
db.students.insertOne({"name": "Jack"})
```



##### 5.  查看当前的集合

```javas
show collections
```

##### 6. 查询

查询 students  集合所有的数据

```javascript
db.students.find()
```



### 1.5.5 MongoDB 数据库的基本概念

-  可以有多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合中可以有多个文档（表记录）
- 文档结构很灵活，没有任何限制
- `MongoDB`非常灵活，不需要像MySQL一样先创建数据库、表、设计表结构。当你需要插入数据的时候，只需要指定往哪个数据库的那个集合操作就可以了，一切都由MongoDB帮你自动完成建库建表这件事儿。

### 1.5.6 Node中操作数据库起步（mongoose）

- 使用第三方`mongoose`来操作`MongoDB`数据库

- 第三方包：`mongoose` 基于 `MongoDB` 官方的 `mongodb` 包再一次做了封装。

#### 1.5.6.1 安装

```shell
npm i mongoose
```



#### 1.5.6.2 初始化 mongoose

```shell
var mongoose = require('mongoose');
```



### 1.5.7 官方指南

#### 1.5.7.1 设计Schema

##### 1.导包

```js
var mongoose = require('mongoose')
```



##### 2.拿取架构

```js
var Schema= mongoose.Schema /* 拿取架构 */
```



##### 3.连接数据库

- 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来

```js
//27017是MongoDB数据库默认端口号
const DB_URL = 'mongodb://localhost:27017' //本地的mongodb连接地址
mongoose.connect(DB_URL)
```

```js
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});
```



##### 4.设计文档结构（表结构）

字段名称就是表结构中的属性名称，约束的目的是为了保证数据的完整性，不要有脏数据

- 定义文档模型，`Schema` 和 `mode` 新建模型
- 类似于mysql的表，mongo 里有文档字段的概念
- 文档类型：
  - String, Number 等数据结构
  - 定 `create`, `remove`, `update` 分别用来增删改操作。
  - `Find` 和 `findOne` 用来查询数据

```js
var userSchem= new Schema({
	username: {
		type: String,
		required: true // 必须有 不能为空
  	},
  password: {
  		type: String,
		required: true
  },
  email: {
  		type: String
  }
})
```



##### 5.将文档结构发布为模型

- `mongoose.model` 方法就是用来将一个架构发布为 model

- `第一个参数`：传入一个`大写名词单数字符串`用来表示你的数据库名称,`mongoose` 会自动将大写名词的字符串生成 `小写复数` 的集合名称。例如这里的 User 最终会变为 users 集合名称

- `第二个参数`：架构 Schema

- `返回值`：模型构造函数

 ```js
var User = mongoose.model('User', userSchema)
 ```

- 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）。

- 如果在单个文件中就需要导出

```js
module.exports = mongoose.model('User', userSchem)
```



#### 1.5.7.2 增加

```js
var admin = new User({
  username: 'zs',
  password: '123456',
  email: 'admin@admin.com'
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

- 然后，在命令行执行文件就可以得到结果，或者

```js
User.create({
    user: 'imooc',
    age: 18
}, function (err, data) {
    if (!err) {
        console.log(data)
    } else {
        console.log(err)
    }
})
```





#### 1.5.7.3 查询

##### 1. 查询所有

```js
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```



##### 2. 按条件查询所有，以数组形式返回

```js
User.find({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```



##### 3.按条件查询单个，直接就是查询的那个对象

```js
User.findOne({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

##### 4. or

如果想要查询其中一种满足就可以了

```js
User.findOne({
   $or: [
      {
         email: body.email
      },
      {
         nickname: body.nickname
      }
   ]
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```



#### 1.5.7.4 删除

##### 1. 根据条件删除所有

```js
User.remove({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功')
    console.log(ret)
  }
})
```



##### 2.根据条件删除一个

```js
Model.findOneAndRemove(conditions, [options], [callBack])
```



##### 3.根据id删除一个

```js
Model.findByIdAndRemove(id, [options], [callBack])
```



#### 1.5.7.5 更新

##### 1.根据条件更新所有

- `Model.updata(conditions, doc, [options], callBack)`

```js
User.updateMany({ "user": "imooc" }, { "$set": { "age": 26 } }, function (err, data) {
    User.find({}, function (err, ret) {
        if (err) {
            console.log('查询失败')
        } else {
            console.log(ret)
        }
    })
})
```

- 以上例子，将user为 imooc 的数据的 age 改为了 26                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

##### 2.根据指定条件更新一个

```js
Model.findOneAndUpdata(conditions, [updata], [options], callBack)
```



##### 3.根据ID更新一个

```js
User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
```

#### 1.5.7.6 blueimp-md5 数据加密

##### 安装

```shell
npm i blueimp-md5
```

##### 导入

```js
/* 加密包 */
var md5 = require('blueimp-md5')
```

##### 加密

```js
  /* 对密码进行md5重复加密 */
  body.password = md5(md5(body.password))
```



### 1.5.8 mongoose中的then

mongoose都支持then，以用户登录注册为例，用户输入账号密码，先检测数据库是否存在，存在则提示用户用户名已经存在，不存在则注册

```js
User.findOne({
   username: '456'
}).then(function (user) {
   if (user) {
      console.log('用户已经存在。')
   } else {
      return new User({
         username: 'aaa',
         password: '123'
      }).save()
   }
}).then(function (ret) {
   //登录成功以后的操作
})
```







## 1.6 node操作MySQL数据库

##### 1.安装

```shell
npm i mysql
```



##### 2.导包

```js
var mysql = require('mysql');
```



##### 3.创建连接

```js
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'users' 
});
```



##### 4.连接数据库

```js
connection.connect();
```



##### 5.查询数据

```js
connection.query('SELECT * FROM `users`', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
```



##### 6.插入数据

在MySQL中有的项给NULL为默认值

```js
connection.query('INSERT INTO users VALUES(NULL, "admin", "123456"'), function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
```



##### 7.关闭连接

```shell
connection.end();
```



## 1.7 Promise

### 1.7.1 回调地狱

 ![1536134521729](C:\Users\Daniel\AppData\Local\Temp\1536134521729.png)

### 1.7.2 Promise语法

以按照a.txt，b.txt，c.txt文件的顺序加载为例。

- `Promise`容器一旦创建，就开始执行里面的代码。
- `Promise`不是异步，内部往往是一个异步任务。
- 其中`resolve`和`reject`是`then`的两个回调函数，reject和resolve里面传什么在then里面的函数就得到什么

```js
var p1 = new Promise(function (resolve, reject) {
   fs.readFile('./data/a.txt', 'utf8', function (err, data) {
      err ? reject(err) : resolve(data)
   })
})

var p2 = new Promise(function (resolve, reject) {
   fs.readFile('./data/b.txt', 'utf8', function (err, data) {
      err ? reject(err) : resolve(data)
   })
})

var p3 = new Promise(function (resolve, reject) {
   fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      err ? reject(err) : resolve(data)
   })
})
```

当 p1 读取成功的时候，当前函数中 return 的结果就可以在后面的 then 中 function 接收到，当你 return 123 后面就接收到 123， return 'hello' 后面就接收到 'hello'，没有 return 后面收到的就是 `undefined`，上面那些 return 的数据没什么卵用，真正有用的是：我们可以 return 一个 `Promise` 对象，得到的data结果就是上一个promise里面得到的结果data

```js
// 当 return 一个 Promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2的resolvep1
p1.then(function (data) {
	console.log(data)	/* d得到的是p1里面的结果 */
  	return p2
}, function (err) {
	console.log('读取文件失败了', err)
})
.then(function (data) {
	console.log(data)	/* d得到的是p2里面的结果 */
	return p3
})
.then(function (data) {
	console.log(data)	/* d得到的是p3里面的结果 */
	console.log('end')
})
```

 

### 1.7.3 封装readFile 版本的Promise



 ```js
var fs = require('fs')

function pReadFile(filePath) {
   return new Promise(function (resolve, reject) {
      fs.readFile(filePath, 'utf8', function (err, data) {
         err ? reject(err) : resolve(data)
      })
   })
}
pReadFile('./data/a.txt')
   .then(function (data) {
      return pReadFile('./data/b.txt')
   })
   .then(function (data) {
      return pReadFile('./data/c.txt')
   })
   .then(function (data) {
      console.log(data)
   })
 ```

### 1.7.4 jQuery的Promise

以下代码，表示先获取到data1再获取data2

```js
$.get("url1").then(function (data1) {
   console.log(data1)
   return $get.("url2")
}).then(function (data2) {
   console.log(data2)
})
```

## 1.8 Node 的Path模块

##### 导入：

```shell
var path = require('path')
```



#### path.basename

通过一个path路径获取到最终的文件的名字，可去掉后缀名

##### 语法：

```js
path.basename(path, [ext])		/* path为路径，ext为去掉文件的后缀名，可选 */
```

##### 例子：

```js
path.basename('./a/b/index.js')	/* index.js */
```

```js
path.basename('./a/b/index.js', '.js')	/* index */
```

#### path.dirname

获取目录

 ```js
path.dirname('./a/b/index.js')	/* a/b */
 ```



#### path.extname

获取文件扩展名

```js
path.dirname('./a/b/index.js')	/* .js */
```





#### path.isAbsolute

判断是否是绝对路径，是则返回true，否则返回false。

```js
path.isAbsolute('./a/b/index.js')	/* true */
```

#### path.join

将`多个路径`拼接为一个路径，当需要路径拼接的时候使用

```js
path.join('./a','b')		/* .a\\b */
```



#### path.parse

相当于以上path方法的集合。

```js
path.parse('./a/b/index.js')	
/* 结果 */
{
   root: './',	
   dir: './a/b',	//目录
   base: 'index.html',	//文件名，有扩展名
   ext: 'html',	//扩展名
   name: 'index'	//文件名，没有扩展名
}
```





1.9 

## 1.9 Node中的其他成员

在每个模块中除了`require`、`exports` 等模块相关API之外，还有两个特殊成员：

- `__dirname`： 可以 **动态** 用来获取当前文件模块所属目录的绝对路径
- `__filename`： 可以 **动态** 用来获取当前文件的绝对路径 (包含文件名)
- `__dirname`和`__filename`是不受执行node命令所属路径的影响

 下面，我们console一下这两个值来对比一下：

```js
f:\我的学习\01-前端\08-Node\demo\项目\项目一	//__dirname
f:\我的学习\01-前端\08-Node\demo\项目\项目一\app.js	//__filename
```

- `./` 表示相对于执行node命令所处的终端路径(也就是cmd的当前路径)。
- 在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于执行node命令所处的路径。所以为了解决这个问题，很简单，只需要把相对路径变为绝对路径就可以了。因此，我们可以使用`__dirname`或者`__filename` 获取到当前的文件路径
- 同时，我们就可以使用路径的拼接，在拼接过程中，为避免手动拼接带来的低级错误。所以，我们就可以使用`path.join`进行路径的拼接。
- 所以，为了尽量避免路径问题，以后在文件操作中使用的路径都统一转换为动态的绝对路径。

- 模块中的路径标识和文件操作中的相对路径标识不一致，模块中的路径标识就是相对于当前文件模块，不受执行node命令所处路径的影响。也就是无论在哪执行node文件，模块的路径都没有影响。



##  2.0 在express中使用express-session插件

 

##### 安装

```shell
npm i express-session
```

##### 配置

```js
var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',	//配置加密字符串，在原有的加密基础上拼接上额外的加密字符串，增加安全性，防止客户端默认伪造
  resave: false,
  saveUninitialized: true	//默认true，无论你是否使用session，都默分配一把钥匙。false只有有内容的时候才会分配
}))
```

##### 使用

```js
//添加session数据
req.session.foo = 'bar'
//获取session数据
req.session.foo
```



注册成功，使用session记录用户的登录状态

```js
new User(body).save(function (err, user) {
   if (err) {
      return res.status(500).json({
         err_code: 500,
         message: 'Internal error'
      })
   }
   /* 注册成功，使用session记录用户的登录状态 */
   req.session.user = user

   return res.status(200).json({
      err_code: 0,
      message: 'ok'
   })
})
```

> 注意：默认Session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会吧session数据永久化

 

## 2.1 中间件

- 中间件处理请求的，本质就是一个请求处理方法，我们把用户从请求到响应的整个过程分发到多个中间件中去处理。这样做的目的是提高代码灵活性，动态扩展的。

- 同一个请求所经过的中间件都是同一个请求对象和响应对象

- 当请求进来，会从第一个中间件开始进行匹配，如果匹配，则进来。

- 如果请求进入中间件之后，没有调用 next 则代码会停在当前中间件。如果调用了 next 则继续向后找到第一个匹配的中间件，如果不匹配，则继续判断匹配下一个中间件。

- 不关心请求路径和请求方法的中间件，也就是说任何请求都会进入这个中间件。

- 如果没有能匹配的中间件，则 Express 会默认输出：Cannot GET 路径

- 中间件本身是一个方法，该方法接收三个参数：

  - Request 请求对象
  - Response 响应对象
  - next     下一个中间件（当一个请求进入一个中间件之后，如果不调用 next 则会停留在当前中间件，所以 next 是一个方法，用来调用下一个中间件的，调用 next 方法也是要匹配的（不是调用紧挨着的那个））

  ```js
  app.get('/abc', function (req, res, next) {
     req.body = {}
  })
  app.get('/abc', function (req, res, next) {
     console.log(req.body)	//在上一个中间件定义的在下一个中间件可以使用（前提是请求是同一个中间件）
  })
  ```

### 2.1.1 应用程序级别的中间件



万能匹配（不关心任何请求路径和请求方法）：

```js
app.use(function (req, res, next) {
   console.log('中间件1')
   next()
})
```

只要是以`/a`开头的就会被匹配到：

```js
app.use('/a', function () {
   console.log('中间件2')
   next()
})
```

其中，`next`为后面的中间件是否继续匹配。

### 2.1.2 路由级别中间件

除了以上中间件之外，还有一种最常用的，严格匹配请求方法和请求路径的中间件。

##### 1. get:

```js
app.get('/register', function (req, res) {
  res.render('register.html')
})
```



##### 2. post:

```js
app.get('/register', function (req, res) {
  res.render('register.html')
})
```



##### 3. put:

```js
app.put('/register', function (req, res) {
  res.render('register.html')
})
```



##### 4. delete:

```js
app.delete('/register', function (req, res) {
  res.render('register.html')
})
```



### 2.1.3 错误处理中间件

用于错误统一处理。

```js
app.get('/', function (req, res, next) {
   fs.readFile('./a', function (err, data) {
      if (err) {	
        return next(err)	//当调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别中间件
      }
   })
})
```
当调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别中间件。所以，当发生错误的时候，我们可以调用next传递错误对象。然后被全局错误处理中间件匹配到并处理。
```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
   res.status(500).json({
      err_code: 500,
      message: err.message
   })
})
```

> 注意：四个参数一定要写全。否则参数会错位。





## 2.2 其他



### 2.2.1 服务端渲染和客户端渲染的区别

#### 什么是服务器端渲染和客户端渲染？

- 互联网早期，用户使用浏览器浏览的都是一些没有复杂逻辑的、简单的页面，这些页面都是在后端将html拼接好的然后将之返回给前端完整的html文件，浏览器拿到这个html文件之后就可以直接解析展示了，而这也就是所谓的**服务器端渲染**了。而随着前端页面的复杂性提高，前端就不仅仅是普通的页面展示了，而可能添加了更多功能性的组件，复杂性更大，另外，彼时**ajax的兴起**，使得业界就开始推崇**前后端分离**的开发模式，即后端不提供完整的html页面，而是提供一些api使得前端可以获取到json数据，然后前端拿到json数据之后再在前端进行html页面的拼接，然后展示在浏览器上，这就是所谓的**客户端渲染**了，这样前端就可以专注UI的开发，后端专注于逻辑的开发。

#### 两者本质的区别是什么？

- 客户端渲染和服务器端渲染的最重要的区别就是**究竟是谁来完成html文件的完整拼接，**如果是在服务器端完成的，然后返回给客户端，就是服务器端渲染，而如果是前端做了更多的工作完成了html的拼接，则就是客户端渲染。

#### 服务器端渲染的优缺点是怎样的？

##### 优点：

> 1. 前端耗时少。因为后端拼接完了html，浏览器只需要直接渲染出来
> 2. **有利于SEO。**因为在后端有完整的html页面，所以爬虫更容易爬取获得信息，更有利于seo。
> 3. **无需占用客户端资源**。即解析模板的工作完全交由后端来做，客户端只要解析标准的html页面即可，这样对于客户端的资源占用更少，尤其是移动端，也可以更省电。
> 4. **后端生成静态化文件**。即生成缓存片段，这样就可以减少数据库查询浪费的时间了，且对于数据变化不大的页面非常高效 。

##### 缺点：

> 1. 不利于前后端分离，开发效率低。**使用服务器端渲染，则无法进行分工合作，则对于前端复杂度高的项目，不利于项目高效开发。另外，如果是服务器端渲染，则**前端一般就是写一个静态html文件**，然后**后端再修改为模板**，这样是非常低效的，并且还常常需要前后端共同完成修改的动作； **或者是前端直接完成html模板，然后交由后端**。另外，如果后端改了模板，前端还需要根据改动的模板再调节css，这样使得前后端联调的时间增加。
> 2. **占用服务器端资源**。即服务器端完成html模板的解析，如果请求较多，会对服务器造成一定的访问压力。而如果使用前端渲染，就是把这些解析的压力分摊了前端，而这里确实完全交给了一个服务器。

 

#### 客户端渲染的优缺点是怎样的？

##### 优点：　　

> 1. 前后端分离**。前端专注于前端UI，后端专注于api开发，且前端有更多的选择性，而不需要遵循后端特定的模板。
> 2. **体验更好**。比如，我们将网站做成SPA或者部分内容做成SPA，这样，尤其是移动端，可以使体验更接近于原生app。

##### 缺点：

> 1. **前端响应较慢**。如果是客户端渲染，前端还要进行拼接字符串的过程，需要耗费额外的时间，不如服务器端渲染速度快。
> 2. **不利于SEO**。目前比如百度、谷歌的爬虫对于SPA都是不认的，只是记录了一个页面，所以SEO很差。因为服务器端可能没有保存完整的html，而是前端通过js进行dom的拼接，那么爬虫无法爬取信息。 除非搜索引擎的seo可以增加对于JavaScript的爬取能力，这才能保证seo。

 

#### 使用服务器端渲染还是客户端渲染？

- **不谈业务场景而盲目选择使用何种渲染方式都是耍流氓。**比如企业级网站，主要功能是**展示**而**没有复杂的交互**，并且需要**良好的SEO**，则这时我们就需要使用服务器端渲染；而类似后台管理页面，交互性比较强，不需要seo的考虑，那么就可以使用客户端渲染。
- 另外，具体使用何种渲染方法并不是绝对的，比如现在一些网站采用了**首屏服务器端渲染**，即对于用户最开始打开的那个页面采用的是服务器端渲染，这样就保证了渲染速度，而其他的页面采用客户端渲染，这样就完成了前后端分离。

 

#### 对于前后端分离，如果进行seo优化？

- 如果进行了前后端分离，那么前端就是通过js来修改dom使得html拼接完全，然后再显示，或者是使用SPA，这样，seo几乎没有。那么这种情况下如何做seo优化呢？
- 我们可以自行提交**sitemap**，**让蜘蛛主动去爬取**，但是遇到了sitemap中的url，达到指定页面之后只有元js怎么办呢？这是我们可以使用<noscript>标签来进行简单的优化，比如打印出当前页面信息的一些关键的信息点，但是正常用户并不需要这些，会造成额外的负担，且前端可以判断是否支持JavaScript，而后段不行，只好根据百度的spider做UA判断，使用phantomjs或者nginx代理，来对spider访问的页面进行特殊的处理，达到被收录的效果。但这种效果还是不好。。。
- 而目前的react和vue都提供了SSR，即服务器端渲染，这也就是提供seo不好的解决方式了。



#### 究竟如何理解前后端分离？

- 实际上，时至今日，前后端分离一定是必然或者趋势，因为早期在web1.0时代的网页就是简单的网页，而如今的网页越来越朝向app前进，而前后端分离就是实现app的必然的结果。所以，我们可以认为html、css、JavaScript组成了这个app，然后浏览器作为虚拟机来运行这些程序，即浏览器成为了app的运行环境，成了客户端，总的来说就是当前的前端越来越朝向桌面应用或者说是手机上的app发展了，而比如说电脑上的qq可以服务器端渲染吗？肯定不能！所以前后端分离也就成了必然。**而我们目前接触额前端工程化、编译（转译）、各种MVC/MVVM框架、依赖工具、npm、bable、webpack等等看似很新鲜、创新的东西实际上都是传动桌面开发所形成的概念，只是近年来前端发展较快而借鉴过来的，本质上就是开源社区东平西凑做出来的一个visual studio。**




