# 一、运动框架

## 1.1 定时器

### 1.1.1 settimeout()

- 只执行一次

```javascript
setTimeout(function () {
    console.log('哈哈');
},1000)    //在1秒钟以后输出'哈哈'
```



### 1.1.2 setInterval()

- 每间隔多少时间就执行一次函数

```javascript
setInterval(function () {
    console.log('哈哈');
},1000)       //每间隔1秒钟就输出一次输出'哈哈'
```

- 当然，函数也可是是函数名当然不能加括号，因为只有1秒以后函数才激活执行

```javascript
setInterval(daGou,1000);
function daGou() {
    console.log('哈哈');
}
```



### 1.1.3 清除定时器

> - clearInterval()
> - clearTimeout()

- 参数为定时器

```javascript
var timer = setInterval(daGou,1000);
function daGou() {
    console.log('哈哈');
}
clearInterval(timer);
```

- 在定时器内部也可以清除自己

```javascript
var timer = setInterval(function () {
    console.log('哈哈');
    clearInterval(timer)
},1000);      //一秒钟输出哈哈以后被清除定时器
```



## 1.2 简单运动模型

### 1.2.1 概念

- 运动的概念：把连续相关的画面，`连续播放`就是运动。

```javascript
setInterval(function () {
    nowleft += 10;
    oBox.style.left = nowleft + "px";
}, 20);
```

- 这个函数，就是每`20毫秒`调用一次。一秒调用`50次`，也就是我们说的`50帧`，50fps。`帧`：一秒钟运行的次数。
- 我们就有一个感觉，JavaScript描述动画，描述的是每一步的改变，并不是直接描述终点。这给我们的工作会带来不便，那我们后面封装运动框架就是利用终点，让他自己去算步长。

### 1.2.2  定时器的停止

- 当点击开始按钮的时候设置定时器

```javascript
var nowleft = 0;
var timer;
stratBtn.onclick = function () {
    timer = setInterval(function () {
        nowleft += 10;
        oBox.style.left = nowleft + "px";
    }, 20);
};
```

- 当点击停止按钮的时候清除定时器：

```javascript
pauseBtn.onclick = function () {
    clearInterval(timer);
}
```

- 在这里我们需要注意的有几点：
  - 信号量要在外面定义，不然的话，每次点击开始都会重新定义，也就会从起点开始
  - timer要设置为全局变量，不然下面清除不了

### 1.2.3  设表先关

- 我们的开始按钮是：

```javascript
startBtn.onclick = function(){
    //设置定时器
    timer = setInterval(function(){
        nowleft += 2;
        oDiv.style.left = nowleft + "px";
    }, 20);
}
```

- 这个按钮持续点击，盒子运动越来越快。这是因为每次点击，盒子身上就有更多的定时器在作用。解决办法，就是四个字的口诀“`设表先关`”。在设置定时器之前都先把之前的定时器给关掉

```javascript
startBtn.onclick = function(){
    //设表先关
    clearInterval(timer);
    //设置定时器
    timer = setInterval(function(){
        nowleft += 2;
        oDiv.style.left = nowleft + "px";
    }, 20);
}
```

 

### 1.2.4 拉终停表

- 这样写是错误的

```javascript
timer = setInterval(function () {
    if(nowleft < 600){
        nowleft += 13;
        oBox.style.left = nowleft + "px";
    }else{
        clearInterval(timer);
    }
})
```

- 初始值是100，所以盒子的运动轨迹就是，100、113、126……594、607停表。所以盒子停下来的位置，不是我们想要的600，而是607。所以解决办法，就是验收、拉回终点、停表：`“拉终停表”`

```javascript
timer = setInterval(function () {
    nowleft += 13;
    if(nowleft > 600) {
        nowleft = 600; //先拉回到我们指定的终点，再停止定时器
        clearInterval(timer);
    }
    oBox.style.left = nowleft + "px";
}, 20);
```

 

## 1.3  开始真正的运动框架

### 1.3.1 实现运动原理

- 我们现在想一个情况，一个盒子初始位置是：
  - left:100px;  
  - top:100px;

- 现在，我想用3000毫秒时间，让这个盒子运动到
  - left:700px;
  - top:250px;

- 也就是说变化量：
  - △left = 600px;
  - △top = 150px;

- 我们想一下，如果我们现在的动画的间隔是20毫秒，也就是说3000毫秒能执行150次函数。也就是说：
  - left的变化步长是           600px / 150 = 4px;
  - top的变化步长是      150px / 150 = 1px;

- 用代码实现就是：

```javascript
var count = 0;
var t1 = new Date();
var timer = setInterval(function () {
    nowLeft += 4;
    nowTop += 1;
    oBox.style.left = nowLeft + 'px';
    oBox.style.top = nowTop + 'px';

    count++;
    console.log(count);
    if(count === 150){
        clearInterval(timer);
        console.log( new Date() - t1); //计算出定时器在开始执行到清除的间隔时间
    }
},20)
```

- 我们可以看出，只有步长不一样的时候才能保证所有的属性同时到达终点。但是，我们发现上面的动画 步长写定值扩展性不好 牵一发而动全身。当我们想要2秒到达终点的时候我们又需要自己去算步长，动画不直观，所以我们迫切的需要一个牛逼的函数，直接告诉谁运动、终点是什么、总时间 就像如下：

```javascript
animate(oDiv,{"width":700,"height":250},3000);
```

- 写定值扩展性不好，那我们就可以用变量去替代，让他自己给我们算步长，我们已知：
  - `变化量` = 起点 - 终点
  - `次数 `= time/定时器时间间隔
  - `步长` = 变化量/次数 

- 说白了，我们需要得到三个JSON
  - `起点JSON`：startJSON   startJSON[k] = parseFloat(getStyle(obj,k)); 
  - `终点JSON`：targetJSON targetJSON[k] = parseFloat(myJSON[k]);
  - `步长JSON`：stepJSON   stepJSON[k] = (targetJSON[k] - startJSON[k]) / maxCount;

### 1.3.2 异步和回调函数

#### 1.3.2.1 同步

- 程序从上到下执行：

```javascript
console.log(1);
console.log(2);
console.log(3);
```

- 假如程序中有for循环，非常耗费时间，但是系统会用“同步”的方式运行：

```javascript
console.log(1);
console.log(2);
console.log(3);
for (var i = 0; i < 10000; i++) {
    console.log("★");
}
console.log(4);
```

- 以上代码，先执行完10000个五角星才会console出4  这就是同步，按照顺序把前一个执行完毕再执行下一个

#### 1.3.2.2 异步

- 在执行console的同时在执行定时器

```javascript
console.log(1);
console.log(2);
console.log(3);
setInterval(function(){
    console.log("★");
},1000);
console.log(4);
```

> JS中的异步，需要异步语句：`setInterval`、`setTimeout`、`Ajax`、`Node.js`……等等。

#### 1.3.2.3 回调函数

- 异步的事情做完了，我们想继续做什么事儿，那此时怎么办呢？`回调函数`： 异步的语句做完之后要做的事情

```javascript
var count = 0;
var timer = setInterval(function(){
    console.log("★");
    count++;
    if(count == 150){
        clearInterval(timer);
        callback();
    }
},20);
//回调函数
function callback(){
    alert("全部星星输出完毕");
}
```



#### 1.3.2.3 apply和call

- 我们试图在回调函数中，用this表示oDiv对象，这样感觉爽。

```javascript
animate(oDiv,{"left":600},2000,function(){
    this.style.backgroundColor = "red";
});
```

- 但是不行，回调函数中this不是oDiv。所以我们现在要想一个办法，让`callback`运行，并且`callback`里面的this是oDiv

`callback.call(obj)`或者`callback.apply(obj)` 执行callback函数，并且让callback函数中的this关键字指向obj

例子：

```javascript
var obj2 = {
    "name" : "树懒",
    "age" : 16,
    "sex" : "男"
}

function xianshixinxi(){
    alert(this.name);
}
xianshixinxi.call(obj2);
```

##### 1. call语句的含义：

> - xianshixinxi函数将被调用
> - 同时这个函数内部的this就是obj了

##### 2. apply、call对比:

- apply、call相同：让函数调用，并且给函数设置this指向那个对象

- apply、call区别：xianshixinxi这个函数，有参数。那么我们现在又想设置this是谁，又想把参数往里传，此时就有区别了：

  - fn.call(obj,参数1,参数2,参数3……);
  - fn.apply(obj,[参数1,参数2,参数3……]);
  - call需要你用逗号罗列所有参数，但是apply是把所有参数写在数组里面。即使只有一个参数，也必须写在数组里面。
  - 比如：

  ```javascript
  var sum = 0;
  function showInfo(a,b,c){
      sum = a + b + c;
      console.log(sum);
  }
  showInfo.call(obj,1,2,3);
  showInfo.apply(obj,[1,2,3]);
  ```

 

## 1.4 缓冲

### 1.4.1 缓冲的概念

- 一个盒子用3000毫秒时间，从100→700，不一定是匀速的。时间精确、移动的变化量也精确，但是不一定是匀速的。想象一下小时候升国旗，国歌55秒，旗杆10m。小孩子总能55秒准确的升到10m顶端，但是，你懂得，到底是匀速的、还是先快后慢、先慢后快呢？这就是缓冲，英语叫做 `tween`。缓冲的实现，非常简单，就是我们的数学家给我们提供了非常多的缓冲算法，都很好用：

```javascript
function linear(t , b , c , d){
     return c * t / d + b;
 }
 function easeIn(t,b,c,d){
     return c * ( t /= d) * t + b;
 }
 function easeOut(t,b,c,d){
     return -c *(t/=d)*(t-2) + b;
 }
```

- 他们的参数，都是`t、b、c、d`

> - 第一个参数t表示当前帧编号
> - 第二个参数b表示起始位置
> - 第三个参数c表示变化量
> - 第四个参数d表示总帧数
> - 函数的返回值，就是t这一帧，元素应该在的位置

- 函数的命名，需要会：
  - Quad二次的
  - Cubic三次的
  - Quart四次的
  - Quint五次的

- 将缓冲功能封装在我们的运动框架中，比如：

```javascript
aimate(oDiv,{"left":600},3000,"bounceEaseOut",function(){
 });
```

> 缓冲网址：http://www.cnblogs.com/bluedream2009/archive/2010/06/19/1760909.html

### 1.4.2 完善的框架

- obj   表示运动的对象
- myJson    表示运动属性目标值
- time  持续运动的时间

```javascript
function animate(obj,myJson,time,tweenString,callBack) {
    var startJson = {}; //起始位置
    var targetJson = {}; //目标值
    var deltaJson = {}; //变化量
    var maxCount = Math.floor(time/20);  //总帧数  向下向上取整都可以，因为最终会拉终停表
    var timer = null;  //定时器
    var count = 0;  //当前帧编号
    obj.isanimate = true;  //自定义属性  判断动画是否在进行

    /*函数重载*/
    if(arguments.length === 3){
        tweenString = "Linear";
    }else if(arguments.length === 4){
        switch(typeof arguments[3]){
            case "string" :
                break;
            case "function" :
                callBack = arguments[3];
                tweenString = "Linear";
                break;
        }
    }

    for (var k in myJson) {
        startJson[k] = parseFloat(getStyle(obj,k));  //获取所有属性初始值
        targetJson[k] = parseFloat(myJson[k]);  //获取所有属性目标值
        deltaJson[k] = targetJson[k] - startJson[k];  //变化量
    }
    timer = setInterval(function () {
        for (var k in myJson) {
            var number = Tween[tweenString](count,startJson[k],deltaJson[k],maxCount); //拿到了当前帧位置

            if(k === "opacity"){
            obj.style[k] = number;
            obj.style.filter = "alpha(opacity = "+number*100+")";
            }else{
                obj.style[k] = number + "px";
            }
        }
        count++;
        if(count === maxCount) {
            for( var k in myJson ){
                if(k === "opacity"){
                    obj.style[k] = targetJson[k];
                    obj.style.filter = "alpha(opacity = "+targetJson[k]*100+")";
                }else{
                    obj.style[k] = targetJson[k] + "px";
                }

            }
            clearInterval(timer);
            obj.isanimate = false;  //自定义属性  判断动画是否在进行
            //if(callBack)callBack();
            callBack && callBack.call(obj); //短路算法：callBack为真 抛出callBack() callBack假 什么都不做
        }

    },20);

    //获取实际样式
    function getStyle(obj,property) {
        return obj.currentStyle ? obj.currentStyle[property] : getComputedStyle(obj)[property];
    }

    //缓冲公式
    var Tween = {
        Linear: function(t, b, c, d) {
            return c * t / d + b;
        },
        //二次的
        QuadEaseIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        QuadEaseOut: function(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        QuadEaseInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
	//部分公式省略
}
```



 

# 二、DOM和BOM

## 1.1 DOM节点操作

- `DOM`：Document Object Model      `文档对象模型`

### 1.1.1   DOM树

- 我们都知道树是什么样子的，是由主干道分支，那在我们的`DOM`里面，DOM就是最大的主干，而他的下面有很多的标签，一层嵌套一层就形成了枝干和叶。比如：DOM下面是html标签，html标签下面有head和body标签。这就是DOM树。其中的每一个标签元素就称之为`节点`，当然，节点不都是元素。

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="box">
    <p></p>
</div>
</body>
</html>
```

### 1.1.2 原生JS中nodeType属性

- 任何的HTML元素，都有`nodeType`属性，值有`1~11`

```js
{
    ELEMENT_NODE: 1, // 元素节点
    ATTRIBUTE_NODE: 2, // 属性节点
    TEXT_NODE: 3, // 文本节点
    DATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8, // 注释节点
    DOCUMENT_NODE: 9, // 文档
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11, // 文档碎片
    NOTATION_NODE: 12,
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
}
```

- 比如：

```html
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

```html
<script>
    var oUl = document.querySelector('ul');
    var oLi = document.querySelectorAll('li');
    console.log(oUl.childNodes);
    console.log(oUl.childNodes[0].nodeType);
</script>
```

- 第一个会console出7个节点 第二个会console出第一个节点的类型值

### 1.1.3 childNodes

- 任何节点都有`childNodes`属性，是一个`类数组`对象，存放着所有自己的儿子。

```html
<div id="box"><p></p></div>
```

```javascript
box.childNodes[0].nodeType   //1
```

- 注意，这里有重大兼容性问题：
  - 高级浏览器认为box的大儿子是空格，文本节点。
  - IE6、7、8认为box的大儿子是p。

```html
<div id="box">
    <p></p>  <!--高级浏览器3		IE8及其以下1-->
</div>
```

- 面试题：

```html
<div id="box">
   <p></p>
   <p></p>
   <p></p>
   <p></p>
 </div>
```

```javascript
document.getElementById("box").childNodes.length;  //高级浏览器9，低级浏览器4
```

- 一般情况下我们都是操作元素节点，那怎么解决这个差异呢？`children只获取元素节点`：父级元素.children

### 1.1.4 parentNode

- parentNode: 每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment；

- `childNodes`儿子可以有很多 ，`parendNode`父亲只能有1个

```shell
DOM.parentNode
```

### 1.1.5 parentElement 

- 返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element元素，如果不是，则返回null；

### 1.1.6 previousSibling、nextSibling

- 上一个同胞兄弟，下一个同胞兄弟

- 需要注意的是，在这里浏览器兼容问题又出现了：

```javascript
ps[2].previousSibling   //低级浏览器就是BBB那个p，高级浏览器是空文本节点
```

- previousSibling ：节点的前一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
- nextSibling ：节点的后一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。

### 1.1.7 previousElementSibling 、nextElementSibling 

- previousElementSibling ：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。
- nextElementSibling ：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。

### 1.1.8  createElement()

- `createElement()`在document文档中添加一个元素节点
- `appendChild`是把新节点在父亲的所有儿子后添加，也就是说添加的节点就是父亲的最后一个儿子
- 创建一个li标签，用变量oLi来表示。创建出来的节点不是任何节点的儿子，也就是说没有在DOM树上

```javascript
var ul = document.getElementsByTagName("ul")[0];
var oLi = document.createElement("li");
oLi.innerHTML = "DDDD";    // 改变这个节点里面的内容
ul.appendChild(oLi); // 把新创建的节点，追加到DOM树上
```



### 1.1.9  createTextNode

- 创建文本节点

```js
var node = document.createTextNode("我是文本节点");
document.body.appendChild(node);
```



### 1.1.10 createDocumentFragment

- 描述：`DocumentFragments` 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。因为文档片段存在于**内存中**，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面[回流](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。
- 用法：`fragment` 是一个指向空[`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)对象的引用。

```js
var fragment = document.createDocumentFragment();
```

- 假设现有一题目，要求给ul添加10000个li，我们先用最简单的拼接字符串的方式来实现：

```html
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '';
    for(var i=0; i<10000; i++) 
    {
        str += '<li>第'+i+'个子节点</li>';
    }
    document.getElementById('ul').innerHTML = str;
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 44毫秒
})();
</script>
```

- 再换逐个append的方式，不用说，这种方式效率肯定低：

```html
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '', li;
    var ul = document.getElementById('ul');
    for(var i=0; i<10000; i++)
    {
        li = document.createElement('li');
        li.textContent = '第'+i+'个子节点';
        ul.appendChild(li);
    }
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 82毫秒
})();
</script>
```

- 最后再试试文档碎片的方法，可以预见的是，这种方式肯定比第二种好很多，但是应该没有第一种快：

```html
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '', li;
    var ul = document.getElementById('ul');
    var fragment = document.createDocumentFragment();
    for(var i=0; i<10000; i++)
    {
        li = document.createElement('li');
        li.textContent = '第'+i+'个子节点';
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 63毫秒
})();
</script>
```



### 1.1.11 appendChild

- 这个其实前面已经多次用到了，语法就是：

```js
parent.appendChild(child);
```

- 它会将child追加到parent的子节点的最后面。另外，如果被添加的节点是一个页面中存在的节点，则执行后这个节点将会添加到新的位置，其原本所在的位置将移除该节点，也就是说不会同时存在两个该节点在页面上，且其事件会保留。

### 1.1.12 insertBefore

- 将某个节点插入到另外一个节点的前面，语法：

```js
parentNode.insertBefore(newNode, refNode);
```

- 这个API个人觉得设置的非常不合理，因为插入节点只需要知道 `newNode和refNode` 就可以了，`parentNode`是多余的，所以`jQuery`封装的API就比较好：

```js
newNode.insertBefore(refNode); // 如 $("p").insertBefore("#foo");
```

- 如果想要每次都在第一位添加，那么：

```javascript
ul.insertBefore(oLi, lis[0]);
```

- lis这个变量是动态的，这次添加的li，下回就是 lis[0]
- 关于第二个参数：
  - refNode是必传的，如果不传该参数会报错；
  - 如果refNode是undefined或null，则insertBefore会将节点添加到末尾；

### 1.1.13. removeChild()

```shell
父亲.removeChild(儿子);
```

- 删除大锤

```javascript
var oDiv = document.querySelector('div');
var dachui = document.querySelector('#dachui');
oDiv.removeChild(dachui);
```

- 如果要自杀，也要找到爸爸

```javascript
dachui.parentNode.removeChild(dachui);
```



### 1.1.14.  replaceChild()

- 替换节点

```shell
父亲.replaceChild(新儿子, 老儿子);
```

```javascript
var oDiv = document.querySelector('div');
var dachui = document.querySelector('#dachui');
var span = document.querySelector('span');
oDiv.replaceChild(span,dachui)
```



### 1.1.15. cloneNode()

- 克隆节点，参数`true`表示`深复制`，节点里面的所有内容一同复制。

- 复制之后的节点是个孤儿节点，所以也需要使用`appendChild`、`inserBefore`、`replaceChild`来添加上DOM树

```shell
需要克隆的节点.cloneNode()
```

- 不要true参数的时候

```javascript
var oUl = document.querySelector('ul');
var oLi = document.querySelectorAll('li');
oUl.appendChild(oLi[0].cloneNode(true));
```

不会复制内容   加上true会把内容也复制。过程是，先将第一个li深度克隆，将这个节点克隆以后需要添加到oUl这个节点上。

## 1.2 BOM

BOM 浏览器对象模型：

- .onresize       窗口改变事件
- .onscroll 滚动事件
- .close() 关闭当前窗口
- .open(url) 打开新的页面
- .navigator.userAgent 浏览器的信息
- .location(.href .hash .search) 网页的链接信息

### 1.2.1 navigator.userAgent 浏览器的信息

- 查看浏览器信息

```javascript
console.log(window.navigator.userAgent); //Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
```

- 判断是不是IE浏览器

```javascript
navigator.userAgent.indexOf("MSIE") > -1
```



### 1.2.2 .onresize   窗口改变事件

当窗口改变的时候的产生的事件。比如，当窗口改变的时候我们输出窗口的宽高

```javascript
window.onresize = function (ev) {
    console.log("宽：" + document.documentElement.clientWidth +"高："+ document.documentElement.clientHeight);
}
```



### 1.2.3   .onscroll 滚动事件

#### 1. document.documentElement.onscroll          

- 兼容：IE浏览器

```javascript
document.documentElement.onscroll = function (ev) {
    console.log(111);
}
```



#### 2. document.body.onscroll

- 兼容：支持谷歌

```javascript
document.body.onscroll = function (ev) {
    console.log(222);
}
```



#### 3. 兼容写法：

```javascript
function onscroll(callBack) {
    navigator.userAgent.indexOf("MSIE") > -1 ? document.documentElement.onscroll = callBack : document.body.onscroll = callBack;
}
```



### 1.2.4 .location(.href .hash .search) 网页的链接信息

#### 1. .href

直接改变当前页面的地址：

> window.location.href = 'http://www.baidu.com';

#### 2. .search

从问号 (?) 开始的 URL（查询部分）

> window.location.search

#### 3. .hash 

`hash` 属性是一个可读可写的字符串，该字符串是 `URL 的锚部分`（从 # 号开始的部分）。

比如：

```javascript
<a href="#box">aaaaaa</a>
<div id="box"></div>
```

当锚点跳转时，网址为：`file:///C:/Users/Daniel/Desktop/test.html#box`

```javascript
document.onclick = function(){
    console.log(window.location.hash);
}
```

所以console出#box

# 三、offset

DOM已经提供给我们计算后的样式，但是还觉得不方便，所以DOM又提供给我们一些API：

- ele.offsetLeft
- ele.offsetTop
- ele.offsetWidth
- ele.offsetHeight
- ele.clientWidth
- ele.clientHeight

## 1.1  offsetLeft属性和offsetTop属性

### 1.1.1 offsetParent

就是自己祖先元素中，离自己最近的已经定位的元素，如果自己的祖先元素中，没有任何盒子进行了定位，那么`offsetParent`对象就是body。

### 1.1.2 offsetLeft

一个元素的`offsetLeft`值，就是这个元素`左边框外`，到自己的offsetParent对象的`左边框内`的距离



### 1.1.3 offsetTop

就不用说啦，一个元素的`offsetTop`值，就是这个元素`上边框外`，到自己的offsetParent对象的`上边框内`的距离

要注意的是：`只读`。只可以读取不能修改。要想修改只能用.style.css设置

### 1.1.4 offsetLeft 和 style.left 的区别

- style.left 返回的是字符串，如28px，offsetLeft返回的是数值28，如果需要对取得的值进行计算，
  还用offsetLeft比较方便。
- style.left是读写的，offsetLeft是只读的，所以要改变div的位置，只能修改style.left。



## 1.2 offsetWidth和offsetHeight

盒子的`总宽度`和`高度`，要获取内容宽就要用之前我们封装的`getStyle()`这一个函数

- 一个盒子的`offsetWidth`值就是自己的 `width`（左右）+ `padding`（左右）+ `border`的宽度
- 一个盒子的`offsetHeight`值就是自己的 `height` +（上下）+` padding`（上下）+` border`的宽度

## 1.3 clientWidth和clientHeight

`clientWidth`就是自己的`width+padding`的值。 也就是说，比offsetWidth`少了border`。

## 1.4 scrollHeight

获取元素`内容`实际高度，有没有隐藏都没关系

## 1.5 获取页面的宽和高

##### 兼容所有：

```javascript
document.documentElement.clientWidth
document.body.clientWidth
```

```javascript
document.documentElement.clientHeight
document.body.clientHeight
```

 

## 1.6 获取浏览器滚动高度

通常结合滚动事件（onscroll）实时获取浏览器滚动高度，前面我们也说过了滚动事件的兼容

### 1.6.1 滚动高度

兼容所有：

```javascript
document.documentElement.scrollTop
```

实时获取滚动高度：

```javascript
onscroll(function () {
    var a = document.documentElement.scrollTop;
    console.log(a);
});
function onscroll(callBack) {
    navigator.userAgent.indexOf("MSIE") > -1 ? document.documentElement.onscroll = callBack : document.body.onscroll = callBack;
}
```



# 四、event事件

## 1.1 event 事件对象

当事件触发的时候产生的对象，存储着和事件相关的信息，但是有相应的兼容性：

- chrome、firefox、IE9+等：事件函数的第一个形参就是事件对象

```javascript
document.onclick = function(e){
    alert( e );
};
```

- chrome、IE8以下：全局变量 event

```javascript
document.onclick = function(){
    alert( window.event );
};
```

- 兼容

```javascript
document.onclick = function(e){
    e = e || window.event;
};
```

那么，在event事件对象里面有哪些信息呢？我们一起来看一下

## 1.2 相对于窗口的位置

```javascript
e.clientX; //存储鼠标相对于窗口的水平坐标
e.clientY; //存储鼠标相对于窗口的垂直坐标
```

 

## 1.3 相对于文档的位置

主流浏览器：

```javascript
ev.pageX;    //存储鼠标相对于文档的水平坐标
ev.pageY;  //存储鼠标相对于文档的垂直坐标
```

IE及其以下不兼容。

 兼容写法：

```javascript
ev.clientY + document.documentElement.scrollTop || ev.pageY;
```

 

## 1.4  ev.button

- 0------按下左键
- 1------按下滚轮键
- 2------按下右键

```javascript
document.onmousedown = function (e) {
    e = e || window.event;
    alert(ev.button);
}
```



## 1.5  ev.keyCode键值

### 1.5.1   ev.keyCode键值

键盘上每个键都对应着一个数值

```javascript
document.onkeydown = function (ev) {
    ev = ev || window.event
    console.log(ev.keyCode)
}
```

## 1.6 oncontextmenu

返回false表示屏蔽右键菜单

```javascript
document.oncontextmenu = function () {
    return false;
}
```

 那么，有什么用呢？我们可以结合鼠标按键先屏蔽掉默认的右键菜单然后自己去定义

## 1.7 onselectstart

文本不能被选中

```javascript
document.onselectstart = function () {
    return false;
}
```

 也可以

```html
<html lang="en" onselectstart="return false">
```

 我们之前也讲过一个css3的属性：

```css
user-select: none;
```

 

## 1.8 表单事件

### 1.8.1 checked

在js里面，单选或者复选框里面的`checked`属性会被强制转换为布尔值

我们默认的不给`checked`写实际上就是给了`checked="checked"`

```javascript
var oInput = document.getElementById('input');
console.log(oInput.checked);  //true
```

等价

```javascript
oInput.checked = "checked";
console.log(oInput.checked);   //true
```

给的值会被强制转换为`Boolean`值，因此我们直接写布尔值效率要高很多

```javascript
oInput.checked = false;       //如果我们给他false就表示不选中
```



### 1.8.2 获取失去焦点

获取焦点

```javascript
oInput.onfocus = function () {
    console.log('获取到焦点了');
}
```

也可以用函数直接运行，当页面刷新的时候就处于获取焦点的状态

```javascript
oInput.focus();
```

失去焦点

```javascript
oInput.onblur = function () {
    console.log('失去焦点');
}
```

也可以用函数直接运行，当页面刷新的时候就处于获取焦点的状态

```javascript
oInput.blur()
```

 

### 1.8.3 操作下拉列表

```html
<select name="" id="">
    <option value="列表一">111</option>
    <option value="列表二">222</option>
    <option value="列表三">333</option>
</select>
```

```javascript
var sel = document.querySelector("select");
sel.onchange = function () {
    var value = this.options[this.selectedIndex].text; //获取option标签里面的内容
    console.log(value);
    console.log(this.value);  //获取value里面的值
}
```

其中：

- `this.selectedIndex` 是对应的`option`标签的索引值
- `.text`也可以表示为`.innerHTML`表示获取里面的内容



## 1.9 滚轮事件

### 1.9.1 滚轮事件兼容

- 谷歌和IE浏览器

```javascript
document.onmousewheel = function(){
    console.log(1);
};
```

- 火狐浏览器

```javascript
document.addEventListener('DOMMouseScroll',function () {
    console.log(1);
})
```

- 兼容：

```javascript
function mousewheel(obj , eFn) {
     document.onmousewheel===null ?obj.onmousewheel=eFn:obj.addEventListener('DOMMouseScroll',eFn)
 }
```

当是谷歌和IE的时候是支持`onmousewheel`的，但是这个时候没有绑定事件函数那么值就是`null`空对象，这个时候我们再将eFn赋值给他。

### 1.9.2 e.wheelDelta

在chrome和IE里，120 倍数，`负值`代表`向下滚轮`（贴近胸），`正值`代表`向上滚轮`（往上推）

- e.wheelDelta

在firefox里，3的倍数，负值代表向上滚轮（往上推），正值代表向下滚轮（贴近胸）

- e.detail

 兼容：

```javascript
var delta = e.wheelDelta/120 || -e.detail/3;
```

判断delta的正负就可以知道向上滚轮还是向下滚轮（向前正，向后负），除以他们的倍数是为了可以明确的知道滚了多少次了

 

## 2.0  ev.cancelBubble冒泡

```html
<div class="box1">
    <div class="box2">
        <div class="box3"></div>
    </div>
</div>
```

```javascript
oBox1.onclick = daGOu;
oBox2.onclick = daGOu;
oBox3.onclick = daGOu;
function daGOu() {
    alert(this.className);
}
```

当执行的时候我们会发现，点击box2的时候会执行box2的事件也会执行box1的事件，点击box3的时候，会执行box1,box2,box3的事件，我们可以看出，就好像从内到外冒泡一样的，那么我们怎么去解决呢？

##### 阻止冒泡

```javascript
ev.cancelBubble = true;   //浏览器都可以但是不符合W3C标准   (是一个属性)
ev.stopPropagation();     //适用于chrome fireFox 不支持IE 符合W3C标准    （是一个方法）
```

```javascript
oBox1.onclick = daGOu;
oBox2.onclick = daGOu;
oBox3.onclick = daGOu;
function daGOu(ev) {
    ev = ev || window.event;
    ev.cancelBubble = true;
    alert(this.className);
}
```

 

## 2.1 事件委托

- 有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

- 这里其实还有2层意思的：

  - 第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；

  - 第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。

- 事件委托是`利用事件的冒泡原理`来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，`委托它们父级代为执行事件`。

- `总结：` 事件委托是利用事件的冒泡原理，委托他们的父级代为执行事件。

- 下面我们来做一个案例，我们先给div里面的p添加点击事件，让点击的那个p背景变为粉色。

  ```html
  <button>点击添加</button>
  <div>
     <p></p>
     <p></p>
     <p></p>
  </div>
  ```

  ```js
  var aP = document.getElementsByTagName('p');
  var btn = document.querySelector('button');
  var oDiv = document.querySelector('div');
  
  for( var i=0; i<aP.length; i++ ){
     aP[i].onclick = function () {
        this.style.background = 'deeppink';
     }
  }
  ```

- 然后我们再点击按钮在div里面添加新的p

  ```js
  btn.onclick = function () {
     oDiv.appendChild(document.createElement('p'));
  }
  ```

- 这时候我们会发现，之前给p绑定的事件在新添加的p上面没办法实现。

- 这时候我们就需要使用到冒泡的原理，事件委托。在事件对象里面有`e.target`这个对象，这个对象就是你事件触发的直接对象

  ```js
  oDiv.onclick = function (e) {
     e = e || window.event;
     var ta = e.target ? e.target : e.srcElement; /* 兼容ie8及其以下 */
     ta.style.background = 'deeppink';
  }
  ```

- 以上代码，我们直接给div添加点击事件，在他的event事件对象里面的`target`属性为在div里面你直接触发事件的那个对象。

 

# 五、添加事件监听

## 1.1   添加事件

### 1.1.1 传统添加事件

在网站的开发和维护中，给一个对象绑定事件以后我们不方便再去改变他，那么如果我们还要想给他添加新事件的时候

如果我们用以前的添加事件的方式去添加

```javascript
oBox.onclick = function(){
    alert( 1 );
};

oBox.onclick = function(){
    alert( 2 );
};
```

这样子后面添加的事件会把前面的覆盖掉，为了避免不覆盖原来的，我们就要用到新的注册事件的方式。

### 1.1.2 添加事件监听

##### 1. 兼容主流浏览器写法

```javascript
obj.addEventListener（去掉on的事件名 ， 事件函数，布尔值【可以不写】 默认false）
```

```javascript
oBox.addEventListener('click' , function(){
    alert('1');
} , false);
oBox.addEventListener('click' , function(){
    alert('2');
} , false);
```



##### 2. 兼容IE8及以下写法

```javascript
oBox.attachEvent( 'onclick' , function(){
    alert( 1 );
} );
oBox.attachEvent( 'onclick' , function(){
    alert( 2 );
} );
```



##### 3. 兼容写法

```javascript
function addEvent( obj , eName , eFn ){
    document.addEventListener?obj.addEventListener(eName,eFn):obj.attachEvent('on'+eName , eFn);
};
```

```javascript
addEvent( oBox,'click' , function(){
    alert( 1 );
} );
addEvent( oBox,'click' , function(){
    alert( 2 );
} );
```

 

## 1.2 解绑事件

### 1.2.1 传统事件的解绑

```javascript
oBox.onclick = function(){
    alert(1);
};
oBox.onclick = null;
```

 

### 1.2.2 监听事件解绑

通过`addEventListener`解绑事件，参数1和参数2都必须相等，注意：是相等，不是相同，也就是对于函数而言，内存地址也要相同。也就是三个对应：

- 事件名对应
- 事件函数要对应
- 布尔值要对应

```javascript
oBox.addEventListener('click' , function(){
    alert('1');
} , false);
oBox.removeEventListener('click' , function(){
    alert('1');
});
```

但是，我们可以发现这样子是解绑不了的，因为函数是引用类型，不仅比较值，还要比较内存地址。所以，我们只能这样子

##### e8以上：

```javascript
oBox.addEventListener('click' , fn2);
oBox.removeEventListener('click' , fn2);
function fn2(){
    alert('2');
};
```

##### IE8以下：

```javascript
oBox.detachEvent('onclick' , fn2);
```

 

### 1.2.4 封装添加和解绑事件兼容：

```javascript
function addEvent(obj,eName,eFn) {
    if(obj.arr){
        obj.arr.push(eFn); //数组里面有值以后就把后面添加的函数push进去就行了
    }else{
        obj.arr = [eFn]; //自定义一个属性，将函数存进去
    }
    obj.addEventListener ? obj.addEventListener(eName,eFn) : obj.attachEvent('on'+eName,eFn);
}
function removeEvent(obj,eName,eFn) {
    if(eFn){
        for( var i=0; i<obj.arr.length; i++ ){
            if(obj.arr[i] + '' === eFn + ''){//将存起来的函数都和remove里面的函数换成字符串进行比较，如果相等，就解绑这一个函数
                obj.removeEventListener ? obj.removeEventListener(eName,obj.arr[i]) : obj.detachEvent('on'+eName,obj.arr[i])
            }
        }
    }else{
        for( var i=0; i<obj.arr.length; i++ ){
            obj.removeEventListener ? obj.removeEventListener(eName,obj.arr[i]) : obj.detachEvent('on'+eName,obj.arr[i]);
        }
    }
}
```

 



# 六、正则表达式

## 1.1 语法

> 正则表达式：规则，匹配字符串的规则
>
> / /           //只能为字符串
>
> new RegExp()    //可以为变量



## 1.2 测试方法

### 1.2.1 正则.test(字符串)   返回布尔值

> r为匹配规则字符串
>
> str为待匹配字符串

```javascript
var r=/Silence/;
var str = "666Silence";
console.log(r.test(str))
```



### 1.2.2 字符串.match(正则)   

匹配成功则将匹配到的内容放到`数组`并返回，失败返回`null`。注意：里面放到数组里面各项都是`string`类型

```javascript
var r = /bb/g;
var str = "bbyangbb";
console.log(str.match(r)); //[bb,bb]
```

我们的`macth`放入数组里面的都是string类型，那么如果我们想要转换成number类型怎么办呢？

```javascript
var r = /\w/g;
var str = "123";
var s = str.match(r);
console.log(s);  //["1","2","3"]
var array = [];
for(var i=0; i<s.length; i++){
    array[i] = parseInt(s[i]);
}
console.log(array); //[1,2,3]
```

 

### 1.2.3 标识符

我们在匹配数字的时候，如果不加全局匹配那么就是只匹配第一个符合条件的字符，所以我们需要用到标识符，紧跟在最后一个/的后面的字母 u

> g     全局匹配
>
> i   不区分大小写
>
> m   换行匹配
>
> img 一起用，没有先后顺序

```javascript
var r = /\d/g;
var str = '/123你好520';
var arr = str.match(r);
console.log(arr);
```



### 1.2.5 转义

将有意义的经过`\`转义为没有意义的字符

```javascript
var r = /\/Silence\//;
var str = '/Silence/老师';
console.log(r.test(str));
```

`转义字符`：`\`’结合某些特殊的字符有特殊的意义

> \s           匹配空格/缩进
>
> \S           匹配非空格
>
> 
>
> \d           匹配数字
>
> \D           匹配非数字
>
> 
>
> \w          匹配字符（数字，字母，下划线）
>
> \W          匹配非字符
>
> 
>
> \b           独立的单位 在起始位置 或者有空格隔开 或者 连词符（-）连接 或结束位置
>
> \B           非独立
>
> 
>
> .             代表任意字符
>
> ^            在字符集最前面表示除了，在正则最前面表示起始位置
>
> $            正则最后面表示结束位置

### 1.2.6 量词

`量词`：把前面的`匹配规则重复`

> a{x,y}    匹配a      x到y个都可以
>
> a{x,}      匹配a      至少有x个
>
> a{x}       匹配a      一定要x个

简写：

> {1，}     +     至少一个
>
> {0,1}     ？    没有或者有一个
>
> {0，}     *     有或没有都可以

 

### 1.2.7 字符集

`字符集`：可以是单独的`数字`，`字母`，`_`或者`数字，字母 的范围` 一个字符集永远是只会匹配一个字符，当然量词除外。     当括号里面有多个正则时表示或: `[0-9a-zA-Z]`

> [0-9]数字的范围
>
> [a-z]小写字母的范围
>
> [A-Z]大写字母的范围



### 1.2.8 子集

`子集`：“`（）`”和量词结合使用

```javascript
var r = /(abc)+/g;
var str = "abc,abcc,abcabcc"
console.log(str.match(r));  //["abc","abc","abcabc"]
```

子集使用match来进行匹配的时候会先匹配整个表达式匹配到的内容，然后会将子集里面匹配到的东西放在匹配到的内容数组后面

### 1.2.9 竖线的使用

字符集之外表示或，在子集里面也表示或。

```javascript
var r = /ab|cd/g;
var str = "abcd abccc";
console.log(str.match(r));  //["ab","cd","ab"]
```

 

## 1.3 正则表达式其他方法

### 1.3.1 字符串.search(正则)

查找第一次出现的位置

```javascript
var r = /小/;
var str = "啊小小";
console.log(str.search(r));  //1
```

 

### 1.3.2 字符.replace(正则,回调函数/字符串/数字)   

案例：替换脏话

```javascript
var s = '傻逼，你玩个毛线，垃圾';
var r = /傻逼|毛线|垃圾/g;
var str = s.replace(r,"***");

```

s为匹配的字符串，第一个参数为`匹配规则`，第二个参数为`替换的内容`。如果第二个参数是`回调函数`，回调函数的第一个参数是`正则匹配到的内容`，函数最终return的内容是`替换的内容`

```javascript
var r = /傻逼|日|锤子/g;
var str = prompt('请输入：');
var s = str.replace(r,function (daGou){
    var ss = "";
    for(var i=0; i<daGou.length; i++){
        ss += "*";
    }
    return ss;
});
console.log(s);
```

 

# 七、时间对象

### 1.1.1 创建时间对象

- 返回当日的日期和时间。

```javascript
var time = new Date();  //电脑当前的时间（电脑不准就不准，获取的是本地时间不是标准时间）
console.log(time);  //Fri Feb 23 2018 16:23:33 GMT+0800 (中国标准时间)0800指东八区
console.log(typeof time);   //object对象
console.log(time.toGMTString());	//时间对象转字符串
console.log(typeof time.toGMTString());  //string
console.log(new Date().toLocaleString()); // 2020/5/11 上午10:42:48
```



- 获取年、月、日、周、时、分、秒。

```javascript
var year = time.getFullYear(); //获取年，返回一个数字
var month = time.getMonth() + 1; //获取月，返回一个数字，从0开始计算，所以月份要+1
var dd = time.getDate(); //获取日，返回一个数字
var week = time.getDay(); //获取星期，返回一个数字  注意：星期日是0
var hour = time.getHours(); //获取时，返回一个数字
var minute = time.getMinutes(); //获取分，返回一个数字
var second = time.getSeconds(); //获取秒，返回一个数字
```

- 时间差：两个new Date()对象相加减结果是毫秒数。

```javascript
var a = new Date();
setTimeout(function () {
    var b = new Date();
    console.log(b - a);  //时间戳 结果是相差的毫秒数
},1000);
console.log(a.getTime()); //获取时间戳距离1970/1/1/00:00:00多少毫秒 类型为数字
```

- 创建时间戳

```javascript
var data = new Date(2019); //	注意：只有一个参数的时候是1970年的默认时间
var data = new Date(2018,2,23,20,20,20);  // 注意：月份是从0开始算的
```

注意：只有一个参数的时候是1970年的默认时间

 

### 1.1.3 案例：倒计时

```javascript
var oDiv = document.querySelector("div");
time();
setInterval(time,1000);
function time() {
    var now = new Date();
    var target = new Date(2018,2,1);  //注意是从0开始算的月份

    var value = target - now;

    var day = Math.floor(value/1000/60/60/24);
    var hours = Math.floor(value/1000/60/60) % 24;
    var minutes = Math.floor(value/1000/60) % 60;
    var seconds = Math.floor(value/1000) % 60;

    oDiv.innerHTML = "距离元宵节还有："+ day + "天"+hours+"时"+minutes+"分"+seconds+"秒";
}
```

 

### 1.1.4 案例：系统时间

```javascript
var oDiv = document.querySelector("div");
var arr = ["日","一","二","三","四","五","六"];

data();
function data() {
    var time = new Date();
    var year = time.getFullYear(); //获取年，返回一个数字
    var month = time.getMonth() + 1; //获取月，返回一个数字，从0开始计算，所以月份要+1
    var dd = time.getDate(); //获取日，返回一个数字
    var week = time.getDay(); //获取星期，返回一个数字  注意：星期日是0
    var hour = time.getHours(); //获取时，返回一个数字
    var minute = time.getMinutes(); //获取分，返回一个数字
    var second = time.getSeconds(); //获取秒，返回一个数字


    oDiv.innerHTML = "现在是"+year+"年"+month+"月"+dd+"日，星期"+arr[week]+"，"+change(hour)+"时"+change(minute)+"分"+change(second)+"秒";
    console.log(oDiv.innerHTML);
}
setInterval(data,1000);
function change(num) {
    return num < 10 ?  "0" + num :  num;
}
```

 

# 八、jsonp

- 一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准。

- 不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有”src”这个属性的标签都拥有跨域的能力，比如<\script>、<\img>、<\iframe>）。

- 是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理。

- 恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据。

- 这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

- 客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

- 为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

- 现在我们在jsonp.html页面定义一个函数，然后在远程remote.js中传入数据进行调用。

- html页面代码如下：

  ```html
  <script type="text/javascript">
      var localHandler = function(data){
          alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);
      };
      </script>
      <script type="text/javascript" src="http://remoteserver.com/remote.js"></script>
  </head>
  <body>
  </body>
  </html>
  ```

- remote.js文件代码如下：

  ```js
  localHandler({"result":"我是远程js带来的数据"});
  ```

- 运行之后查看结果，页面成功弹出提示窗口，显示本地函数被跨域的远程js调用成功，并且还接收到了远程js带来的数据。

- 下面我们编写一个完整的 jsonp请求，动态的创建script 标签：

  ```html
  <script type="text/javascript">
    // 得到航班信息查询结果后的回调函数
    var flightHandler = function(data){
      alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
    };
    // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
    var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
    // 创建script标签，设置其属性
    var script = document.createElement('script');
    script.setAttribute('src', url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script); 
  </script>
  ```

  

# 九、cookie

## 1.1 存储和获取

`cookie` 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。不同浏览器cookie的存储路径不同，所以`不同浏览器之间的cookie不能共用`，以`域名为单位存储`。静态的本地网页是不能存cookie的，只能是在服务器上。

##### 存储：

浏览器关闭以后就清除了。如果要存储多个cookie不能接在后面，必须定义多个。

```javascript
document.cookie = "name = Silence";
document.cookie = "age = 18";
```

##### 获取：

```javascript
alert(document.cookie)
```

 

## 1.2 设置清除时间

`cookie`存储是有时间限制的，默认临时存储。浏览器关闭以后就清除了。我们可以通过`expires`去设置

```javascript
var data = new Date().getTime() + 10000;
document.cookie = "name = Silence;expires=" + new Date(data).toGMTString();
document.cookie = "age = 18";
```

##### 要强调的是：

new Date()里面添加参数表示设置时间戳，有两种设置方法:

- new Date(2017,12,12);
- new Date(1254612454);

> PS: toGTMString()是时间戳特有的转换成字符串的方式

## 1.3 cookie简单案例

```javascript
var oL = document.getElementById('lastTime');
var oN = document.getElementById('nowTime');

var lastTime = document.cookie.match(/\blastTime=(.+)(;|$)/);  //将匹配到的cookie存在lasttime数组里面(注意：子集使用match来进行匹配的时候会先匹配整个表达式匹配到的内容，然后会将子集里面匹配到的东西放在匹配到的内容数组后面)，如果是第一次访问则没有cookie
console.log(document.cookie);
console.log(lastTime);
oL.innerHTML = lastTime ?  '您上次访问时间：' + lastTime[1]  :  "欢迎，您是第一次访问本站";

//获取每次进来的时间
var data = new Date(),
    YY = data.getFullYear(),
    MM = data.getMonth() + 1,
    DD = data.getDate(),
    hh = data.getHours(),
    mm = data.getMinutes(),
    ss = data.getSeconds();
//设置cookie 并设置有效期
document.cookie='lastTime='+YY+'-'+MM+'-'+DD+'-'+hh+":"+mm+":"+ss+';expires='+(new Date(data.getTime()+100000000000).toGMTString());

oN.innerHTML = '当前时间：' + YY+'-'+MM+'-'+DD + '-'+hh+":"+mm+":"+ss;

```



# 十丶面向对象（oop）

## 1.1 面向对象的基本概念

- JavaScript是一种基于对象的语言。但是，他又不是一种真正的面向对象编程语言，因为他的语法中没有class类。在JavaScript引擎里面内置了一些对象

```javascript
var a = new Array(); // 	简写	[]
var b = new Object(); // 简写	{}
var c = new Date();
var d = new XMLHttpRequest();
var e = new RegExp(); // 简写	/ /
```

 

### 1.1.1 面向对象的优点

- 开发时间短，效率高，所开发的程序更强壮。由于面向对象编程的可重用行，可以在程序中大量采用成熟的类库，从而缩短开发时间。
- 应用程序更易于维护、更新和升级。继承和封装使得应用程序的修改带来的影响更加局部化。

### 1.1.2 面向对象的基本特征

- 封装：也就是把客观事物封装成抽象类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。
- 继承：通过继承创建的新类称为“子类”或者“派生类”。继承的过程就是从一般到特殊的过程。
- 多态：对象的多功能，多方法。

## 1.2 new关键字 和 构造函数

- 现在我们先来做个小案例了解一下面向对象：我们要创建几个对象，属性有姓名，年龄，还有一个sayHello函数，用我们以前的写法：

```javascript
var a = {
    name : "Silence",
    age : 18,
    sayHello : function () {
        alert( "Hello!" );
    }
};
var b = {
    name : "阿末",
    age : 18,
    sayHello : function () {
        alert( "Hello!" );
    }
};
```

- 但是，如果我们要创建十个，百个呢？可能我们会使用封装！

```javascript
function CreateP(n , a){
    var obj = {
        name : n,
        age : a,
        sayHellow :function () {
            alert( "Hello!" );
        }
    };
    return obj
};
var a = CreateP("Silence" , 18),
    b = CreateP("阿末 , 20");
```

> 解析：我们在`CreateP`函数里面创建了一个对象，设置对应的属性方法，最后再返回这个函数，是可以达到封装效果的。 

 

### 1.2.1 new 对函数的影响

- 通过`new`来执行函数，对该函数的影响有：

#### 1.2.1.1 this指向

- 我们都知道，`this`指向触发事件的对象，当没有触发事件对象的时候指向`window`，而通过new执行函数以后，函数内部的this不再指向window，而是在函数内部自动创建一个`新对象`， this指向这个对象，且只有唯一的通过this才能访问到这个对象。

```javascript
function CreateP(){
    console.log(this); //this指向新的对象
};
var a = new CreateP();
```

#### 1.2.1.2  返回值

- 函数不再默认返回 `undefined`，而是默认返回刚刚新创建的对象。我们都知道，一个函数执行完毕以后，如果没有返回值，那么是`undefined`，但是，通过new执行的函数，默认反回新创建的这个对象

```javascript
function CreateP(){
    console.log(this); //this指向新的对象 返回新创建的这个对象
};

var a = new CreateP();
console.log(a); //值为新创建的这个对象
```



### 1.2.2 构造函数

- 那么，之前我们的那个例子就可以通过 new 去改写：

```javascript
function CreateP(n , a){
    var obj = {
        name : n,
        age : a,
        sayHellow :function () {
            alert( "Hello!" );
        }
    };
    return obj
};
var a = CreateP("Silence" , 18),
    b = CreateP("阿末 , 20");
```

- 以上等价于：

```json
function CreateP(n , a){
  var obj = { }
  obj.name : n,
  obj.age : a,
  obj.sayHellow :function () {
     alert( "Hello!" );
  };
  return obj
};
var a = CreateP("Silence" , 18),
		b = CreateP("阿末 , 20");
```

- 我们说通过 new 可以自动创建一个新对象，并且返回这个对象，所以我们可以省略这两步，也就等价于以下：

```javascript
function CreateP(n , a){
    this.name = n;
    this.age = a;
    this.sayHellow = function () {
        alert( "Hello!" );
    }
};
var a = new CreateP("Silence" , 18),
    b = new CreateP("阿末" , 20);
```

- 像这种，可以通过`new`执行去`实例化对象`，这种函数我们就称之为`构造函数`，如上面的CreateP函数。实际上js中大部分基本数据类型都是面向对象的方式创建的。比如之前学习的，数组，布尔值，字符串，数字等等。都有其对应的创建实例化对象的函数，那样的函数我们一般称之为构造函数。

> 构造函数：类似于一个对象的模板，包含了此类对象大部分共同的特征。

- 总结：

> - 默认在函数里面创建一个空对象
> - this指向这个空对象（也就是实例）
> - 并返回这个对象

## 1.3 prototype原型

```javascript
function CreateP(n , a){
    this.name = n;
    this.age = a;
    this.sayHellow = function () {
        alert( "Hello!" );
    }
};

var a = new CreateP("Silence" , 18),
    b = new CreateP("阿末" , 20);
```

- 我们通过`new`创建的这两个对象是不同内存地址的两个对象，它里面的name,age这种属性是不相同的，每创建一个对象就创建一个name,age是情理之中的，但是，他里面的两个引用（函数）值和功能是一样的，但是内存地址是不一样的，那如果我们创建了一百个对象，就开辟了100个内存，是不是很浪费呢？所以，我们只需要创建同一个函数，供所有创建的对象共用就行了，我们推出了原型：

### 1.3.1 原型

- 原型：`构造函数的一个属性`，每创建一个函数都会有一个`prototype`属性，这个属性是一个指针，指向一个对象（通过该构造函数创建实例对象的原型对象）。原型对象是包含特定类型的所有实例共享的属性和方法。

#### 1.3.1.1 原型中的this 和实例化对象的内存地址

- 原型方法里面的this也是指向这个新对象的，因此可以通过this访问到构造函数里面的属性

```javascript
function CreateP(n , a){
    this.name = n;
    this.age = a;
};
CreateP.prototype.sayHello = function () {
    alert( "Hello!" + this.name );
};
var a = new CreateP("Silence" , 18);
var b = new CreateP("阿末" , 20);
console.log(a.sayHello === b.sayHello);  //true

```

- 同时，我们也可以看到两对象虽然是完全不同的两对对象，但是指向的内存地址是一样的，这就大大节约了内存空间。

#### 1.3.1.2  在构造函数以内定义的成员属性是私有的，在外定义的原型是公有的。

```javascript
function CreateP(n, a) {
    this.name = n;
    this.age = a;
    this.say = function () {
        alert("Hello!");
    };
}
CreateP.prototype.sayHello = function () {
    alert("Hello!");
};
var a = new CreateP();
var b = new CreateP();
console.log(a.say === b.say); //false
console.log(a.sayHellow === b.sayHellow); //true
```



#### 1.3.1.4 函数的私有属性

- 函数的私有属性只对函数开放，实例化对象是访问不到的，this指向这个构造函数

```javascript
function CreateP(){};
CreateP.sayHellow = function () {
    alert( 'hello' );
};
var a = new CreateP("Silence" , 18);
a.sayHellow(); //报错：Uncaught TypeError: a.sayHellow is not a function

```

#### 1.3.1.5 总结：

> - 原型方法里面的`this`也是指向这个新对象的，原型对象的好处是，可以让所有实例对象共享它所包含的属性和方法。
> - 在创建构造函数的时候私有的写在构造函数内部，公共的写在构造函数的原型。
> - 构造函数第一个字母大写。

 

## 1.4 prototype原型链

### 1.4.1 原型链

```javascript
function CreateP(n , a){
    this.name = n;
}
CreateP.prototype.sayName = function () {
    alert( this.name );
};
var a = new CreateP("Silence" , 18);
console.log(a);

```

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/01-原型链.png)

- 首先，a和我们的`CreateP.ptototype`都是实例化对象，那我们的a是通过CreateP这个构造函数实例化的，而CreateP.prototype 是由顶层的Object实例化的。

- 这个时候在a实例化对象的下面有一个默认的`a.__proto__`属性，这个属性值为`CreateP.prototype`，也就是：

  ```js
  console.log( a.__proto__ === CreateP.prototype ); // true
  ```

  

- 同时`CreateP.prototype`也是对象，所以下面也有`CreateP.prototype.___proto__`属性，而值为`Object.prototype`

  ```js
  console.log( CreateT.prototype.__proto__ === Object.prototype ); //true
  ```

  

- 直到Object `__proto__`值为 null，已经到顶端了，也就是Object是所有原型的顶端

- 而下面由`__proto__`和`prototype`连接起来的就是`原型链`。

> `原型链`：一个实例化对象在寻找一个属性的时候，会先从自身属性找，其次到上一级原型链，直到Object，如果还找不到就返回`undefined`，这就称之为`原型链`。

### 1.4.2 原型链查找属性

- 自身属性：

```javascript
function CreateP(name){
    this.name = name;
}
var a = new CreateP("自身属性");
console.log(a.name);  // 自身属性


```

- 上级原型链：

```javascript
function CreateP(){
}
CreateP.prototype.name = "原型";
var a = new CreateP();
console.log(a.name);  // 原型

```

- Object原型链：

```javascript
function CreateT(){
}
var a = new CreateT();
console.log(a.name);  // undefined
```

 

## 1.5 对象的属性和方法

### 1.5.1 方法

#### 1.5.1.1  hasOwnProperty

- 判断这个属性是不是对象的私有属性，返回`Boolean`值，是返回 true，否返回 false。会遍历`私有属性`和`原型链上的所有属性`，如果我们只希望得到私有属性，那么请使用此属性过滤。语法：

> 对象.hasOwnProperty(属性)

例子：

```javascript
function CreateT(){
    this.name = "Silence";
    this.age = 18;
}
CreateT.prototype.length = "20cm";
var a = new CreateT();
for (var k in a) {
  if(a.hasOwnProperty(k)){
      console.log(a[k]); // Silence 18
     }
}
```

 

#### 1.5.1.2  isPrototypeOf

- 判断一个原型是不是某个对象的原型，语法：

> 原型.isPrototypeOf(对象)

例子：

```javascript
function CreateT(){ }
CreateT.prototype.length = "20cm";
var a = new CreateT();
console.log(CreateT.prototype.isPrototypeOf(a)); //true
console.log(Object.prototype.isPrototypeOf(CreateT.prototype)); //true
```

 

#### 1.5.1.3  defineProperty

- 添加一个属性

- 语法：

  > - `configurable`: 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
  > - `enumerable`: 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举(forin)属性中。默认为 false。
  > - `value`: 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
  > - `writable`: 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。

  ```js
  Object.defineProperty(obj,属性,{ 
  	enumerable: false,  	//是否可被枚举(forin)
  	writable: false,    	//是否可写（可以修改）
  	configurable: false,  //可删除性
  	value: "18"     	//本身的值。默认为undefined
  }
  ```

  ```js
  function obj(){ }
   obj.name = "Silence";    //可以通过对象点的方法添加属性
   /*也可以通过Object下面的一个方法去设定*/
   Object.defineProperty(obj,"age",{
       enumerable: false,  //是否可被枚举(forin)
       writable: false,    //是否可写（可以修改）
       configurable: false,    //可删除性
       value: "18"     //本身的值。默认为undefined
   });
   obj.age = 20;
   delete obj.name;    //删除属性  可删除性为false的不能删除
   console.log(obj.age); //18  因为writable设置为false即不可修改
  ```

  

- 删除属性：

  ```js
  delete obj.name;    //删除属性  可删除性为false的不能删除
  ```

  



#### 1.5.1.4 defineProperties

批量添加

```javascript
function Fn (){ }
obj.name = "Silence";    //可以通过对象点的方法添加属性
/*也可以通过Object下面的一个方法去设定*/
Object.defineProperties(Fn,{
    "age":{
        enumerable: false,  //是否可被枚举(forin)
        writable: false,    //是否可写（可以修改）
        configurable: false,    //可删除性
        value: "18"     //本身的值。默认为undefined
    },
    "length":{
        enumerable: false,  //是否可被枚举(forin)
        writable: false,    //是否可写（可以修改）
        configurable: false,    //可删除性
        value: "18"     //本身的值。默认为undefined
    },
});

```



#### 1.5.1.5  Object.getPrototypeOf(obj)

- 返回参数对象的原型

```javascript
function Person(name,sex,length) {}
Person.prototype.eat = function () {
    console.log( "你在吃饭");
};
var yang = new Person();
console.log(Object.getPrototypeOf(yang));  //返回参数对象的原型
```

- 实例化对象的原型其实就相当于实例化的`__proto__`属性。那么`__proto__`和`prototype`有什么区别呢？

```shell
__proto__是每个对象都有的一个属性，而prototype是函数才会有的属性，使用Object.getPrototypeOf()代替__proto__
```



#### 1.5.1.6. Object.create(obj)

- 简单的赋值以后两个对象的内存地址就是一样，而此方法复制一个新的对象如下：将yang这个对象复制给obj，但是是两个不同的对象。内存地址是不一样的。但是却属性和值一样。如：

```javascript
function Person(name) {
     this.name = name;
 }
 var yang = new Person("Silence");

var obj = Object.create(yang);
console.log(yang === obj); //false 说明是两个不一样的对象
console.log(obj.name);  //Silence

```

- 如果直接赋值:

```javascript
var obj = yang;
 console.log(yang === obj); //true 说明是两个对象指向同一个内存地址
 consol.log(obj.name);  //Silence
```

- 这个时候，相当于obj和yang是一个对象，如果改变obj的属性，yang的属性也会被改变

```javascript
var obj = yang;
obj.name = "哈哈";
console.log(obj.name);  //哈哈
console.log(yang.name);  //哈哈

```

 

## 1.6 继承

- 继承是指：让一个对象，继承另外一个对象的所有属性和方法，也是常见的需求。
- 继承有以下特点：
  - 子类继承父类
  - 子类拥有父类的所有功能
  - 子类可以进行扩展，并且扩展的东西不影响父类

```javascript
/*父类*/
function Parent(n){
    this.parenta = 20;
    this.parentb = [1,2,3];
    this.parentname = n;
}
Parent.prototype.parentPc = [10,20,30];
Parent.prototype.parentPd = function(){};

/* 子类   Child 继承 Parent */
function Child(n){
    Parent.apply(this,arguments); //继承实例的私有属性
    this.childv = 123; //扩展实例的私有属性
}
//继承原型
Child.prototype = Object.create(Parent.prototype);  //原型继承的实质其实就是原型链，Child的原型指向Parent的原型。
//扩展原型
Child.prototype.childPg = 15;
//Parent的实例
var p = new Parent("Silence");
//Child的实例
var c = new Child("阿末");
console.log(p);
console.log(c);

```

```javascript
c.y.push(4);  //在这里我们改变c的私有属性y，结果发现p的y是不会被影响的，说明继承私有属性成功，而且私有属性也在构造函数里面。
console.log(p.y); //[1,2,3]
console.log(c.y); //[1,2,3,4]

c.z[0] = 40; //在这里我们改变c的原型z属性，其实可以发现p的也被改变了，因为从自身找不到z这个属性，就通过原型链找到了父类的属性，所以改变的是父类的属性
console.log(p.z); //[40, 20, 30]
console.log(c.z); //[40, 20, 30]

/*而为什么要用Object.create(Parent.prototype)呢，因为这样不会让子类扩展的原型影响到父类*/
console.log(a.g);  //undefined
console.log(b.g);   //15

```

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/02-继承原型链.png)

## 1.7 链式调用

### 1.7.1 简单的链式调用

如下，map会返回一个数组，而reduce也可以继续操作这个数组

```javascript
var arr = [1,2,3,4];

var num = arr.map(function (item) {
    return item + 1;
});

var num1 = num.reduce(function (a,b) {
    return a + b;
},0);  //0表示初始值
console.log(num1);

```

那么，我们就可以实现一个简单的链式调用：

```javascript

```

 

### 1.7.2 jQuery链式调用小案例

```javascript
/*函数自执行，避免污染全局变量*/
 (function () {
     /*******************************/
     /************接口***************/
     /*******************************/
     /*接口：使共享构造函数所有属性和方法*/
     function $(select) {
         return new Fn(select);  //$()返回一个Fn实例化的对象
     }
     /*******************************/
     /************构造函数************/
     /*******************************/
     function Fn(select){
         /*私有属性*/
         this.eles = document.querySelectorAll(select);  //获取所有的元素
     }
     /*******************************/
     /************公共属性************/
     /*******************************/
     /*each遍历函数*/
     Fn.prototype.each = function (callBack){
         for( var i=0; i<this.eles.length; i++ ){
             callBack && callBack.call(this.eles[i],i,this.eles[i]); //第一个参数是指向的对象，第二个参数才是回调函数的第一个参数，索引。第三个参数是遍历的这个元素本身
         }
         return this
     };
     /*css样式*/
     Fn.prototype.css = function (myJSON){
         /*遍历传进来的json然后赋值给每一个元素*/
         this.each(function () {
             for (var k in myJSON) {
                 this.style[k] = myJSON[k];
             }
         });
         return this
     };
     Fn.prototype.html = function (str){
         this.each(function () {
             this.innerHTML = str;
         });
         return this
     };

     window.$ = $;  //暴露一个全局变量，使全局能够访问
 })();

$("li").css({"background":"deeppink","width":"200px"}).html("Silence老师好帅");
 $("li").each(function (index,arr) {
     console.log("遍历的这一项：" + this + "---索引值：" +index+ "---遍历的数组对象" + arr);
 });

```

其实，我们还可以创建一个函数，使通过json的形式添加新的原型

```javascript
/*函数自执行，避免污染全局变量*/
 (function () {
     /*******************************/
     /************接口***************/
     /*******************************/
     /*接口：使共享构造函数所有属性和方法*/
     function $(select) {
         return new Fn(select);  //$()返回一个Fn实例化的对象
     }
     /*******************************/
     /************构造函数************/
     /*******************************/
     function Fn(select){
         /*私有属性*/
         this.eles = document.querySelectorAll(select);  //获取所有的元素
     }

     /*******************************/
     /************添加原型函数************/
     /*******************************/
     function add(myJSON) {
         for (var k in myJSON) {
             Fn.prototype[k] = myJSON[k];
         }
     }

     add({
         "each" : function (callBack){
             for( var i=0; i<this.eles.length; i++ ){
                 callBack && callBack.call(this.eles[i],i,this.eles); //第一个参数是指向的对象，第二个参数才是回调函数的第一个参数
             }
             return this
         },
         "css": function (myJSON){
             /*遍历传进来的json然后赋值给每一个元素*/
             this.each(function () {
                 for (var k in myJSON) {
                     this.style[k] = myJSON[k];
                 }
             });
             return this
         },
         "html": function (str){
             this.each(function () {
                 this.innerHTML = str;
             });
             return this
         }
     });
     window.$ = $;  //暴露一个全局变量，使全局能够访问
 })();

$("li").css({"background":"deeppink","width":"200px"}).html("Silence老师好帅");
 $("li").each(function (index,arr) {
     console.log("遍历的这一项：" + this + "---索引值：" +index+ "---遍历的数组对象" + arr);
 });

```



 

## 1.8 包装对象

- 首先呢，我们现在复习一下JS的数据类型，JS数据类型被分为了两大门派，`基本类型`和`引用类型`。
  - 基本类型：Undefined,Null,Boolean,Number,String
  - 引用类型：Object,Function等。

- 我们都知道，引用类型有方法和属性，但是基本类型是木有的，但是你一定见过这样的代码

```javascript
var str = 'hello'; //string 基本类型
var s2 = str.charAt(0);
alert(s2); // h

```

- 毫无疑问上面的string是一个基本类型，但是它却能召唤出一个`charAt()`的方法，这是什么原因呢？

> 主要是因为在基本类型中，有三个比较特殊的存在就是：`String` ` Number` ` Boolean`，这三个基本类型都有自己对应的`包装对象`。并且随时等候召唤。包装对象呢，其实就是对象，有相应的属性和方法。至于这个过程是怎么发生呢，其实是在后台偷偷发生的。

- 我们平常写程序的过程，默认情况下：

```javascript
var str = 'hello'; //string 基本类型
var s2 = str.charAt(0); 
```

- 在执行到这一句的时候 后台会自动完成以下动作 ：

```javascript
var str = new String('hello'); // 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
var s2 = str.charAt(0); // 然后这个对象就可以调用包装对象下的方法，并且返回给s2.
console.log(s2);//h
```

- 当然，在默认的情况下，使用创建的临时对象以后就会被销毁

> 注意：这是一瞬间的动作 实际上我们没有改变字符串本身的值。就是做了下面的动作.这也是为什么每个字符串具有的方法并没有改变字符串本身的原因。

- 由此我们可以知道，引用类型和基本包装对象的区别在于：`生存期`，引用类型所创建的对象，在执行的期间一直在内存中，而基本包装对象只是存在了一瞬间。所以我们无法直接给基本类型添加方法：

```javascript
var str = 'hello';
str.number = 10; 
```

- 假设我们想给字符串添加一个属性number ，后台会有如下步骤：

```javascript
var str = new String('hello'); //  找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
str.number = 10; //  通过这个对象调用包装对象下的方法 但结果并没有被任何东西保存
str = null; //  这个对象又被销毁

```

```javascript
alert(str.number); //undefined  当执行到这一句的时候，因为基本类型本来没有属性，后台又会重新重复上面的步骤

```

```javascript
var str = new String('hello'); // 找到基本包装对象，然后又新开辟一个内存，创建一个值为hello对象
str.number = undefined   //  因为包装对象下面没有number这个属性，所以值为undefined
str =null; // 这个对象又被销毁

```

- 那么我们怎么才能给基本类型添加方法或者属性呢？答案是在基本包装对象的原型下面添加，每个对象都有原型。

```javascript
var str = 'hello';
String.prototype.last= function(){
    return this.charAt(this.length-1);
};
console.log(str.last()); //0 

```

- 执行到这一句，后台依然会偷偷的干这些事

```javascript
var str = new String('hello');// 找到基本包装对象，new一个和字符串值相同的对象
str.last();  // 通过这个对象找到了包装对象下的方法并调用
str =null; //  这个对象被销毁
```


