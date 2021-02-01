## 1.1 前言

大家都知道js是单线程的脚本语言，在同一时间，只能做同一件事，为了协调事件、用户交互、脚本、UI渲染和网络处理等行为，防止主线程阻塞，Event Loop方案应运而生...

### 1.1.1 为什么js是单线程？

js作为主要运行在浏览器的脚本语言，js主要用途之一是操作DOM。

如果js同时有两个线程，同时对同一个dom进行操作，这时浏览器应该听哪个线程的，如何判断优先级？

为了避免这种问题，js必须是一门单线程语言，并且在未来这个特点也不会改变。

### 1.1.2 浏览器多线程

浏览器是多进程的，浏览器每一个 tab 标签都代表一个独立的进程，其中浏览器渲染进程（浏览器内核）属于浏览器多进程中的一种，主要负责页面渲染，脚本执行，事件处理等
其包含的线程有：GUI 渲染线程（负责渲染页面，解析 HTML，CSS 构成 DOM 树）、JS 引擎线程、事件触发线程、定时器触发线程、http 请求线程等主要线程

### 1.1.3 执行中的线程

因为js是单线程语言，当遇到异步任务(如ajax操作等)时，不可能一直等待异步完成，再继续往下执行，在这期间浏览器是空闲状态，显而易见这会导致巨大的资源浪费。

执行栈：当执行某个函数、用户点击一次鼠标，Ajax完成，一个图片加载完成等事件发生时，只要指定过回调函数，这些事件发生时就会进入执行栈队列中，等待主线程读取,遵循先进先出原则。

要明确的一点是，主线程跟执行栈是不同概念，主线程规定现在执行执行栈中的哪个事件。

**主线程循环**：即主线程会不停的从执行栈中读取事件，会执行完所有栈中的同步代码。

**任务队列**：当遇到一个异步事件后，并不会一直等待异步事件返回结果，而是会将这个事件挂在与执行栈不同的队列中，我们称之为任务队列(Task Queue)。

当主线程将执行栈中所有的代码执行完之后，主线程将会去查看任务队列是否有任务。如果有，那么主线程会依次执行那些任务队列中的回调函数。

![img](https://pic4.zhimg.com/80/v2-1337770fcc29d10325ee4eb127496fff_720w.jpg)





如下：

```js
let a = () => {
  setTimeout(() => {
    console.log('任务队列函数1')
  }, 0)
  for (let i = 0; i < 5000; i++) {
    console.log('a的for循环')
  }
  console.log('a事件执行完')
}
let b = () => {
  setTimeout(() => {
    console.log('任务队列函数2')
  }, 0)
  for (let i = 0; i < 5000; i++) {
    console.log('b的for循环')
  }
  console.log('b事件执行完')
}
let c = () => {
  setTimeout(() => {
    console.log('任务队列函数3')
  }, 0)
  for (let i = 0; i < 5000; i++) {
    console.log('c的for循环')
  }
  console.log('c事件执行完')
}
a();
b();
c();
// 当a、b、c函数都执行完成之后，三个setTimeout才会依次执行
```



## 1.3 宏任务与微任务



**异步任务**分为 宏任务（macrotask） 与 微任务 (microtask)，不同的API注册的任务会依次进入自身对应的队列中，然后等待 Event Loop 将它们依次压入执行栈中执行。

**宏任务(macrotask)：**当前调用栈中执行的代码成为宏任务。（主代码快，定时器等等）。 

> script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

**微任务(microtask)：**当前（此次事件循环中）宏任务执行完，在下一个宏任务开始之前需要执行的任务,可以理解为回调事件。（promise.then，proness.nextTick等等）。 3. 宏任务中的事件放在callback queue中，由事件触发线程维护；微任务的事件放在微任务队列中，由js引擎线程维护。

> Promise.then、 MutaionObserver、process.nextTick(Node.js环境）

先执行微任务，再执行宏任务。



## 1.4 事件循环

> - 所有**同步任务**都在主线程上执行，形成一个**执行栈**。
>- 主线程之外，还存在一个"任务队列"（task queue）。当遇到异步任务，首先挂起，只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
> - 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。那些对应的异步任务，先**微观任务**进入执行栈并开始执行，再**宏观任务**进入执行栈并开始执行。
>- 



## 1.5 面试题实践

示例一：

```js
console.log('开始111');
setTimeout(function() {
  console.log('setTimeout111');
});
Promise.resolve().then(function() {
  console.log('promise111');
}).then(function() {
  console.log('promise222');
});
console.log('开始222');
```

我们按照步骤来分析下：

1. 遇到同步任务，直接先打印 “开始111”。
2. 遇到异步 setTimeout ，先放到任务队列中等待执行。
3. 遇到了 Promise 的 then，放到等待队列中。
4. 遇到了 Promise 的 then，放到等待队列中。
5. 遇到同步任务，直接打印 “开始222”。
6. 同步执行完，返回任务队列中的代码，从上往下执行，发现有宏观任务 setTimeout 和微观任务 Promise 的 then，那么先执行微观任务，再执行宏观任务。

所以打印的顺序为： 开始111 、开始222 、 promise111 、 promise222 、 setTimeout111 。

> 注意：对于promise而言，只有then()才是异步，new Promise() 是同步

示例二：

```js
console.log('开始111');
setTimeout(function () {
  console.log('timeout111');
});
new Promise(resolve => {
  console.log('promise111');
  resolve();
  setTimeout(() => console.log('timeout222'));
}).then(function () {
  console.log('promise222')
})
console.log('开始222');
```

分析一下：

1. 遇到同步代码，先打印 “开始111” 。
2. 遇到setTimeout异步，放入队列，等待执行 。
3. 中途遇到Promise函数，函数直接执行，打印 “promise111”。
4. 遇到setTimeout ，属于异步，放入队列，等待执行。
5. 遇到Promise的then等待成功返回，异步，放入队列。
6. 遇到同步，打印 “开始222”。
7. 执行完，返回，将异步队列中的代码，按顺序执行。有一个微观任务，then后的，所以打印 “promise222”，再执行两个宏观任务 “timeout111” “timeout222”。

所以，打印的顺序为：开始111 、 promise111 、 开始222 、 promise222 、 timeout111 、 timeout222 .











