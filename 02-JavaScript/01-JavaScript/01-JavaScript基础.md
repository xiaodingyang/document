## 1.1 js代码的书写

前端三层：

- 结构层     HTML           从语义的角度描述页面的结构
- 样式层     CSS               从审美的角度装饰页面
- 行为层     JavaScript    从交互的角度提升用户体验

 说白了，JavaScript用来制作web页面交互效果，提升用户体验

### 1.1.1 javascript标签

- 三种写法都是对的

```javascript
<script></script>
<script type="text/javascript"></script>
<script language="javascript"></script>
```

- JavaSript程序，要写在HTML页面中，运行页面的时候，这个页面上的JS也就一起运行了。也就是说，js的运行必须有`宿主环境`，最最常见的宿主环境，就是浏览器。

### 1.1.2 放置位置，执行顺序

- 可以`放置在页面中任何位置`，但是，我们通常放在body或者head结束之前（有利于性能优化），且要注意加载顺序，从上到下依次加载。

```javascript
<script src="index.js"></script>
<script></script>
```



### 1.1.3 window.onload

- 当js代码放在获取的元素之前的时候，这个时候由于代码是由上到下执行的，因此js找不到box,这个时候就会报错，这个时候我们可以用`window.onload = function(){}`将我们的代码包裹起来，这个代码的意思是：页面加载完成（标签、图片、框架…）后，执行代码。但是，`一个页面只能出现一次`。

```javascript
<script>
    window.onload = function(){
        document.getElementById("box").onclick = function(){
            alert( '这是我的第一段JavaScript代码~' );
        };
    };
</script>
<body>
<div id='box'></div>
</body>
```



### 1.1.4 将js代码放在标签内

- 神奇的是，我们还能将js的代码放在标签里面，但是，写法有所不同

```html
<div id='box' onclick='alert("这是我的第一段JavaScript代码~")'></div>
```

- 我们可以发现，少了function方法，好比我们有onclick这一个属性一样直接用等号加引号接上他的属性值。但是，这样子写代码没办法维护，也不利于优化，代码一多久杂乱无章，可读性差因此我们不会这样写js。

###  1.1.5 一些常用的方法

#### 1. console.log() 

- 控制台

```javascript
console.log("内容");
```

- 在控制台输出内容，`字符串`需要加引号（单双引号不区分，成对出现就好）

> 字符串：在JavaScript里面只要是用引号引起来的就是字符串（无论单还是双引号）

#### 2. alert() 弹窗

- 在窗口弹出你输入的内容

```javascript
alert("内容");
```

#### 3. prompt() 弹窗

- 会弹出一个可输入的文本框，执行此函数会返回输入的内容。

```javascript
var a = prompt("请输入用户名：");
```

- 以上代码，会把用户输入的值返回，存到a里面。在JavaScript里面“=”是赋值的意思，如 a = 3 的含义是将3赋值给a。

### 1.1.6 注释

- 给人看的东西，对读程序是一个提示作用。

#### 1. html的注释：

```shell
<!--我是注释-->
```

#### 2. CSS注释：

```shell
/*我是注释*/
```

#### 3. JavaScript注释

```
//单行注释
/*我是注释*/   多行注释
```



## 1.2 获取元素

- 我们想要用js操作元素，和我们的css一样，需要选择到这个元素，当然，我们的css是通过选择器，那么js是通过什么呢？

### 1.2.1 通过id方式获取

- 通过元素的id名获取元素，然后进行操作

```javascript
document.getElementById("id名");
```

- 先简单的说一下变量，`变量`（Variables），和高中代数学习的x、y、z很像，它们不是字母，而是蕴含值的符号。它和直接量不同，直接量5，就是数字5；直接量”你好”就是字符串“你好”。现在这个变量不一样了，你看见一个a，实际上它不是字母a，而是里面蕴含的不同的值。在JavaScript里面“=”是赋值的意思。

```javascript
var obj = document.getElementById(‘box’); 
obj.style.background = 'red'; 
```

- 以上代码，将选中的box盒子的背景变为红色。

> 兼容：兼容所有浏览器。

### 1.2.2 通过class类名获取元素

```javascript
document.getElementsByClassName("类名"); 
```

- 我们都知道class类名可以重复，因此，获取到的不像id一样只是一个可以直接拿来用，这里是一个`类数组`，我们要用就要选择到类数组中的某一个。因此我们需要加上下标(需要注意的是，数组下标是以0开头的)，并且我们可以发现`getElementsByClassName`中也加了个s,表示复数的意思。

```html
<div id="wrap">
    <div class="xiaoyang">Silence</div>
    <div class="xiaoyang">Silence</div>
    <div class="xiaoyang">Silence</div>
</div>
```

```javascript
var obj = document.getElementsByClassName('xiaoyang');  //获取到的是一个类数组
obj[1].style.background= 'red';    //选择到这个类数组中的下标为1的第二个元素
```

> 兼容：不兼容IE8以及以下。

### 1.2.3 通过标签名获取元素

- 通过元素的标签名获取元素，同样的同名的标签有很多，所以获取到的也是一个`类数组`

```javascript
document.getElementsByTagName("元素名");
```

- 在这里，我们要注意的是，无论你的标签有几个，永远都要以类数组的方式去使用

```html
<div id="wrap">
    <p>Silence</p>
</div>
```

```javascript
document.getElementsByTagName("p");
obj[0].style.background = 'red';
```

> 兼容性：兼容所有浏览器

### 1.2.4 通过选择器获取元素

- 通过选择器获取元素（支持所有css选择器和部分css3选择器）   

#### 1.2.4.1 querySelector()

- 获取单个节点，如果选择器是类名或者标签名等，只会获取到第一个。(如果你在后面加上下标就会报错)   

##### 错误写法：

```javascript
var oXiao= document.querySelector('#box .xiao');
oXiao[0].style.color = 'red';
```



##### 正确写法：

```javascript
var oXiao= document.querySelector('#box .xiao)';
oXiao.style.color = 'red';
```



> 兼容：IE8及以上

#### 1.2.4.2 querySelectorAll()

- 获取多个节点   `类数组`

```javascript
var aXiao = document.querySelectorAll('#box .xiao');
oXiao[0].style.color = 'red';
```

> 兼容：IE8及以上

### 1.2.5 JavaScript静态和动态获取方法

#### 1.2.5.1 静态获取方法

##### 1. 通过id获取

- 当我们通过id获取到一个节点以后，他的id改变以后不会影响这个节点，就好比我选择到这个人，无论他叫什么名字，长什么样子都没关系。如下：

```html
<p id='test'>Silence老师真的帅！</p>
```

- 如下，我先获取到test，再改变id，然后再通过我之前获取的节点改变颜色，可以改变吗？

```javascript
var oTest = document.getElementById('test');
oTest.style.color = 'red';
oTest.id = 'testt';
oTest.style.color = '#cc00ff';
```

- 很显然也是可以的。这就是我们的静态获取

##### 2. querySelector

```javascript
var oBox = document.querySelector("#box");
console.log(oBox.id);  //box
oBox.id = "daGou";
console.log(oBox.id);  //daGou
```

- 以上代码，当我们通过 `querySelector`获取到这个元素以后再去改变id，我们再使用之前的获取的元素去获取id，我们可以发现还是之前的那个标签。

##### 3. querySlectorAll

```html
<div id="box">
    <p></p>
    <p></p>
    <p></p>
</div>
```

```javascript
var aP = document.querySelectorAll("#box p");
console.log(aP.length);       //3
oBox.innerHTML += "<p>大家好！</p>";
console.log(aP.length);       //3
```

以上代码，我们通过 `querySelectorAll` 获取得到aP，然后获取到长度为3，然后我们在box里面添加p标签，我们再使用aP去获取长度，我们发现还是长度为3。

> 总结：所谓的静态获取就是，当我们获取到这个元素以后就只记住了这个元素当前的状态。无论这个元素发生什么改变，我们获取时的状态也不会发生改变。

### 1.2.6 动态获取方法

每当我们用到一次类数组的时候都会动态的获取一次

```html
<div id="box">
    <p class='xiao1'>p1</p>
    <p class='xiao1'>p2</p>
    <p class='xiao1'>p3</p>
</div>
```



#### 1.2.6.1 getElementsByclassName

```javascript
var aXiao1 = document.getElementsByClassName('xiao1');  //获取到xiao1类数组
console.log( aXiao1.length );  //先弹出长度 3
aXiao.innerHTML += "<p class='xiao1'>p4</p>";
console.log( aXiao1.length );  //4
```

以上代码，通过 `getElementsByclassName` 获取到`aXiao1`，此时的长度为3，我们给他的父级元素再加入一个p标签之后再去获取长度，我们可以发现变为4了。

#### 1.2.6.2 getElementsByTagName方法

```javascript
var aP = document.getElementsByTagName('p');
console.log(aP.length);       //3
oBox.innerHTML += "<p>哈哈</p>";
console.log(aP.length);       //4
```

以上代码同上。

> 总结：所谓的动态获取就是在每次需要使用到此元素变量的时候都会动态的重新去获取一次。

### 1.2.7 JavaScript获取的元素命名规范

> - s: 表示字符串String
> - b: 表示布尔Boolean
> - a: 表示数组Array
> - o: 表示对象Object
> - fn: 表示函数Function
> - re: 表示正则Regular Expression

##### 如下：

```javascript
var aPerson = [];      // Array数组
var oBtn = document.getElementById('btn');        //Object对象
var aBtn = document.getElementByClassName('btn'); //Object对象
var fnName = function () {};    // function函数
var sName = "w3cplus";        // string字符串
```



## 1.3 JavaScript事件

### 1.3.1 绑定事件

- 当我们获取到元素以后，我们可以操作元素了，我们来给他绑定一个点击事件,通常也叫做添加监听。

```javascript
document.getElementById("box").onclick = function () {
    alert("Silence老师好帅！Silence老师我爱你！");
};
```



### 1.3.2写js代码需要注意什么？

- 通过上面的一段简单的js代码，我们可以总结出一些js的代码规范：

> - 代码要缩进，缩进要对齐
> - js严格区分大小写
> - 语句字符都要半角符号
> - 每条完整语句后面要写分号，在框架中通常不会使用分号，具体的什么时候需要分号我们在后面再说。
> - JavaScript对空格和换行不敏感

### 1.3.3 事件

- JS里面有很多的事件，刚刚我们讲的onclick就是其中的左键点击事件。我们可以讲这些事件大致分为几类：`鼠标事件`、`键盘事件`、`表单事件`、`系统事件`。

#### 1.3.3.1 鼠标事件：

> - onclick          鼠标点击事件
> - onmouseover/onmouseout             鼠标被移入/移出  （冒泡）
> - onmouseenter/onmouseleave        鼠标移入/移出
> - ondblclick                    鼠标双击事件
> - onmousedown           鼠标按键按下事件
> - onmousemove           鼠标移动事件
> - onmouseup                某个鼠标抬起事件

#### 1.3.3.2 表单事件：

> - onblur                  元素失去焦点
> - onfocus               元素获得焦点
> - onchange            用户改变表单的内容
> - onreset                重置按钮被点击（要给form标签）
> - onsubmit             提交按钮被点击（要给form标签）

#### 1.3.3.3 键盘事件：

> - onkeydown          某个键盘的键被按下且放开
> - onkeypress          某个键盘的键被按下或按住
> - onkeyup               某个键盘的键被松开

#### 1.3.3.4 系统事件：

> - onload                  某个页面或图像被完成加载
> - onresize               窗口或框架被调整尺寸
> - onselect               文本被选定
> - onerror                当加载文档或图像时发生某个错误





## 1.4 标签属性

- 标签属性：通俗的说，就是写在我们标签里面的有等号的那种属性

### 1.4.1 读取标签属性

- 如下的img标签里面,的src alt id width ，就是标签属性。当然不是说就只有我们写的这些

```html
<img src="img/1.jpg" alt="" id="box"  width="200" >
```

- 在js里面，我们可以通过点的方式得到这些属性值，并且，可读可写

> - 可读：可以读取
> - 可写：可以改变

```javascript
var oBox = document.getElementById('box');
console.log(oBox.src);
console.log(oBox.alt);
oBox.alt = "哈哈";
console.log(oBox.alt);  //哈哈
```



### 1.4.2 自定义标签属性

- 在js中，只有合法的属性才能打点调用，如 `title`,`href`,`src` 等等，自定义标签属性就需要通过以下三个方法`定义`，`设置`，`删除`

#### 1.4.2.1 getAttribute() 获取自定义属性

```html
<div id="box" title='Silence' dachui='大锤'></div>
```

```javascript
console.log(oBox.dachui);    //undefined，为什么未定义呢？就是因为他不是合法的字符，不能打点调用
console.log(oBox.getAttribute("dachui"));   //获取自定义的属性
```

> 参数：想要获取的自定义属性名

#### 1.4.2.2 setAttribute() 设置自定义属性

- 将大锤改为王大锤（设置自定义的属性值）

```javascript
oBox.setAttribute("dachui","王大锤");
```

- 再次console dachui的时候就变成了王大锤

```javascript
console.log(oBox.getAttribute("dachui")); //王大锤
```

> 参数1：设置的自定义属性名
>
> 参数2：设置的属性值

#### 1.4.2.3 removeAttribute() 删除自定义属性

```javascript
oBox.removeAttribute("dachui"); //删除dachui属性
```

> 参数：想要移除的自定义属性名



## 1.5  其他

### 1.5.1 设置css样式的替代方法

- 这个时候，我们想做一个小案例，点击按钮，让盒子变换一些属性，再点击，回到之前的状态，这时候，我们可能会这样子写

```javascript
oBox.onclick = function(){
    this.style.background = "deeppink";
    this.style.cssFlaot = "right";
    this.style.styleFlaot = "right";
    this.style.border = "1px solid purple";
};
oBtn.onclick = function(){
    oBox.style.background = "orangered";
    oBox.style.cssFlaot = "left";
    oBox.style.styleFlaot = "left";
    oBox.style.border = "none";
};
```

- 这个时候会造成什么呢，代码太长太冗余，那么，这时候我们可以这样子，把css代码放在一个类里面，然后给元素添加删除类名

```css
<style>
    #box.on{
        background:deeppink;
        float:right;
        border:10px solid purple;
    }
</style>
```

```javascript
<script>
    oBox.onclick = function(){
        this.className = 'on';
    };
    oBtn.onclick = function(){
        oBox.className = '';
    };
</script>
```



### 1.5.2 cssText 拼接

- 我们想要给一个盒子设置样式

```javascript
oBox.style.width = '150px';
oBox.style.height = '150px';
oBox.style.background = '#cc00ff';
```

- 但是，太冗余了,这个时候我们有一个属性可以直接把所有的css样式写在一起，注意，这是改变的行内样式.

```javascript
oBox.style.cssText = "width:150px; height:150px; background:#c0f;"
```

- 但是，如果之前有行内样式，这时候就会被覆盖掉，那么我们怎么才能不被覆盖掉呢，我们就可以用到字符串的拼接

```javascript
oBox.style.cssText += 'width:150px; height:150px; background:#c0f;';
```



### 1.5.3 获取、修改元素内容

#### 1.5.3.1  innerHTML

- 我们又学习到一个新的属性：innerHTML 获取元素里面的内容或者添加内容

```javascript
var oBox = document.getElementById('box');
oBox.onmouseover = function(){
    oBox.innerHTML = '大家好，我是Silence';
};
```

- 当然也可以获取内容，这个时候我们可以获取里面的内容

```javascript
console.log(oBox).innerHTML);
```



#### 1.5.2.2 innerText

- 此外，还有一个 innerText 也可以添加内容

```javascript
oBox.onmouseover = function(){
    oBox.innerText = '<p>大家好，我是Silence。</p>';
};
oBox.onmouseover = function(){
    oBox.innerHTML = '<p>大家好，我是Silence。</p>';
};
```

> 总结：两者都是读取内容。但是，innerText不能解析标签，而innerHTML可以。并且，这两个属性都是可读可写的，也就是既可以修改也可以获取



### 1.5.4 this的简单认识

- this指向触发这个事件的对象，如果没有触发事件的对象，那就指向window

```javascript
oBox1.onmouseenter = function () {
    this.innerHTML = "我爱Silence老师！"; //在js里面=是赋值
};
oBox1.onmouseleave = function () {
    this.innerHTML = "Silence老师好帅！"; //在js里面=是赋值
};
```

 

### 1.5.5 操作行内样式

- 在js里面我们通常是操作行内样式，一下是那种方法：

```js
elem.style.color = 'red';
elem.style.setProperty('font-size', '16px');
elem.style.removeProperty('color');
```

- 如下：

```javascript
var oBox = document.getElementById('box');
oBox.onmouseenter = function(){
    this.style.backgroundColor = '#cc00ff';
};
oBox.onmouseleave = function(){
    this.style.backgroundColor = '#999';
};
```

> 注意：如果有“-”就要用驼峰命名（把减号去掉，减号后面的第一个字母大写，如backgroundColor）

### 1.5.6 flaot 浮动

- 这里的浮动就有一个兼容问题。首先，在js里面我们不能直接这样子写

```javascript
oBox.style.flaot = "right";
```

- 因为 `flaot` 是关键字，虽然在谷歌里面这样写也可以这样子写，但是，我们也不能这样子写，比如c++里面是代表浮点型，所以我们用其他的代替，还有我们的 `class` 也是保留字要用 `className`代替，那这个时候就有兼容问题了

##### 在谷歌里面

```javascript
oBox.style.cssFloat = 'right';
```

##### 在ie低版本里面

```javascript
oBox.style.styleFloat = 'right';
```

- 因此我们通常两个都要写上

```js
oBox.style.cssFloat = 'right';
oBox.style.styleFloat = 'right';
```

- 类名则为

```javascript
oBox.className = 'on';
```

 

# 三 、变量和字面量初步

## 1.1   变量的初步认识

- `变量`（Variables），和高中代数学习的x、y、z很像，它们不是字母，而是蕴含值的符号。

它和直接量不同，直接量5，就是数字5；直接量”你好”就是字符串“你好”。现在这个变量不一样了，你看见一个a，实际上它不是字母a，而是里面蕴含的不同的值。

### 1.1.1  定义变量

```html
<script type="text/javascript">
    //定义一个变量
    var a;
    //赋值
    a = 100;
    //输出变量a
    console.log(a);
</script>
```

- 我们使用var关键字来定义变量，所谓的关键字就是一些有特殊功能的小词语，关键字后面要有空格。var就是英语variables变量的缩写，表示定义一个变量。一旦你

```
var a
```

- 你的电脑内存中，就会开辟一个空间，来存储这个变量a。现在就可以给这个变量赋值，JS中给变量赋值用等号，等号右边的值赋给左边

```
a = 100
```

- 现在a变量的值就是100。所以我们输出

```
console.log(a)    //100
```



### 1.1.2  变量要先申明才能用

- 使用一个变量，必须先进行一个var，才能使用。var这个过程可以叫做声明(declaration)，也可以叫做定义(definition)。

现在我们直接运行语句：

```javascript
console.log(b);   //这个b没有被var过，所以要报错
```

- 因为b没有被定义，所以b现在不是一个变量，系统不认识这个b的。抛出引用错误。如果一个变量，仅仅被`var`了，但是没有被赋初值呢，此时这个变量的值就是默认为`undefined` （未定义）

```javascript
var a;
console.log(a);  //undefined 
```

- 变量也可以一边定义一边赋值

```javascript
var a = 10;
```

- 还可以同时定义多个变量

```javascript
var a = 10,
    b = 20;
```



### 1.1.3 变量的命名规则

- 变量的名称是标识符（identifiers），任何标识符的命名都需要遵守一定的规则：

- 在JavaScript语言中，一个标识符(identifier)可以由 `字母`、`下划线（_）`、`美元（$）` 符号、`数字（0-9）`组成，但`不能以数字开头`。也就是说，一个标识符必须由字母、下划线、美元符号开头，后续可以有字母、下划线、美元符号、数字。因为JavaScript语言是区分大小写的，所以A和a不是同一个变量。并且不能是JavaScript`保留字、关键字`。

 

## 1.2 字面量

- `字面量`：英语叫做 literals，有些书上叫做直接量。

- 我们先来学习数字的字面量，和字符串的字面量。剩余的字面量类型，我们日后遇见再介绍

### 1.2.1 数字的字面量

- 数字的字面量，就是这个数字自己，并不需要任何的符号来界定这个数字。
- JavaScript中，数字的字面量可以有三种进制：
  - 10进制：普通的数字就是十进制
  - 8进制：如果以 `0开头`、或者以`0o`开头、或者以`0O`开头的都是八进制，八进制只能用`0~7`来表示
  - 16进制：如果以`0x` 或`0X`开头的都是十六进制。

#### 1.2.1.1 八进制举例：

- 以0开头，或者 0o 就是八进制；显示的时候会以十进制显示  `036 = 3*8+6=30`

```javascript
console.log(036);    //30
console.log(044);    //36
console.log(010);    //8
console.log(0o36);   //30
console.log(0O36);   //30
```

> 注意，八进制只能出现0~7这8中字符，如果表示不合法，那么JS将自动的认为你输入错了，从而用十进制进行显示。但是，以0o开头、0O开头的数字，如果后面写错了，控制台报错。

```javascript
console.log(088);  //88    以0开头，按理说是八进制，但是后面的数字错了，所以以十进制显示
```



#### 1.2.1.2 16进制举例：

- 十六进制数：`0 1 2 3 4 5 6 7 8 9 a b c d e f`

```javascript
console.log(0xff);   //255
console.log(0x2b);   //43
console.log(0x11);   //17
```

- 小数的字面量也很简单，就是数学上的点。计算机世界中，小数称为“浮点数”，允许使用e来表示乘以10的几次幂：

```java
console.log(5.6e5);    	//560000
console.log(1e-4);    	//0.0001
console.log(.1e-3);  	//0.0001
```



## 1.3 变量类型

JS 中分为七种内置类型(加上symbol八种)，七种内置类型又分为两大类型：**基本类型**，**Function**和**对象**（Object）。

这个变量是什么类型，和赋的值有关系，而和定义的时候是没有关系的。定义的时候，都是用var关键字定义的，检测数据类型用`typeof`，`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型：

```javascript
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
```

`typeof` 对于对象，除了函数都会显示 `object`

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

对于 `null` 来说，虽然它是基本类型，但是会显示 `object`，这是一个存在很久了的 Bug

```js
typeof null // 'object'
```

### 1.3.1 基本类型

基础数据类型6种，其中 JS 的数字类型是浮点类型的，没有整型。并且浮点类型基于 IEEE 754标准实现，在使用中会遇到某些 [Bug](https://yuchengkai.cn/docs/frontend/##为什么-01--02--03)。`NaN` 也属于 `number` 类型，并且 `NaN` 不等于自身：

- number               数字类型（一般的数字 和 NaN）    
- string                   字符串类型
- undefined           undefined类型，变量未定义时的值，这个值自己是一种类型
- boolean              布尔类型，仅有两个值true 和 false，讲if语句时我们细说
- null                      空指针对象
- symbol

对于基本类型来说，如果使用字面量的方式，那么这个变量只是个字面量，只有在必要的时候才会转换为对应的类型

```js
let a = 111 // 这只是字面量，不是 number 类型
a.toString() // 使用时候才会转换为对象类型
```

#### 1.3.1.1 number 数字类型

```javascript
var a = -100;
```



#### 1.3.1.2 string 字符串

字符串是一个术语，就是人类说的语句、词。字符串的字面量，必须用双引号、单引号包裹起来。字符串被限定在同种引号之间；也即，必须是成对单引号或成对双引号。

```javascript
console.log("今天天气很好");
//或者
console.log('今天天气很好');
//但是绝对不能
console.log('今天天气很好");
```

无论什么类型，只要用引号引起来以后就是字符串，如果在字符串里面要使用引号，那么必须用转义符号"\"转义：

```javascript
console.log("老师说你像\"考拉\"一样漂亮");
```

> 注意：空字符串，也是字符串。

#### 1.3.1.3  undefined

`Undefined`类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined。

```javascript
var a;
console.log(a);   //undefined
```



#### 1.3.1.4 boolean 布尔值

只有两个值：false/true

```
var a = false; 
```



#### 1.3.1.5 null

Null类型是第二个只有一个值的数据类型，这个特殊的值是null。从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null时会返回object的原因。

```javascript
var car = null;
console.log(typeof car); // "object"
```

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值。这样一来，只要直接检测null值就可以知道相应的变量是否已经保存了一个对象的引用了。例如：

```javascript
if(car != null){
    //对car对象执行某些操作
}
```

实际上，undefined值是派生自null值的，因此ECMA-262规定对它们的相等性测试要返回true。

```javascript
console.log(undefined == null); //true
```

尽管null和undefined有这样的关系，但它们的用途完全不同。无论在什么情况下都没有必要把一个变量的值显式地设置为undefined，可是同样的规则对null却不适用。换句话说，只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。这样做不仅可以体现null作为空对象指针的惯例，而且也有助于进一步区分null和undefined。在一个节点元素没有添加事件的时候，他的事件就是null

```javascript
var oBox = document.getElementById('box');
console.log(oBox.onclick); //null
console.log(typeof oBox.onclick); //object
```

所以我们在绑定一个事件的时候想要解绑，就可以用null

```javascript
var oBox = document.getElementById('#box');
oBox.onclick = function (ev) {
    console.log("你好！");
};
oBox.onclick = null;
```



### 1.4.2    引用类型(两种)

#### 1.4.2.1 function 函数类型

```javascript
var a = function () {
    console.log("Silence老师！");
};
```



#### 1.4.2.2  object对象（元素节点  数组   JSON）

##### 1. 元素节点：

```javascript
var oBox = document.getElementById('box');
console.log(typeof oBox); //object
```



##### 2.   数组：

数组（数组里面可以放任意的数据类型，包括数组）

```javascript
var a = [1,2,3,'Silence','我爱你'];
```

可以通过下标的方式获取数组里面的内容，数组的下标从0开始

```javascript
console.log(a[2]);    //3
```

通过.length获取数组的长度

```javascript
console.log(a.length)   //5
```

类型：object

```javascript
var a = [1,2,3,4];
var b = [1,2,3,4];
console.log(typeof a); //object
console.log(a === b); //false
```



##### 3.   JSON：

JSON,里面放置键值对，由逗号隔开，最后一个可以不加逗号，`键值对`：由引号引起的`属性` `冒号` `值`构成

- 就属性而言：可以不用引号，但有些后台语言不认识没有冒号的JSON，因此我们统一要求加冒号
- 就值而言：可以是任意语句，但是一般传到后台的是字符串数据，在js自身去使用的话可以是任意类型

```json
var a = {
    "name" : 'Silence',
    "sex" : '男',
    "age" : 18,
    "fn" : function () { console.log("哈哈");}
};
console.log(a.name);   //调用里面的属性值
console.log(a.fn());
```

但是，和数组不一样的是，json里没有长度这个属性，除非你定义了

```javascript
console.log(shuaiGe.length);    //undefined
```

类型：object

```javascript
var a = {
    "name" : "Silence"
};
console.log(typeof a);     // object
```

> 总结：JavaScript里面数据类型：number    string  undefined Boolean null  function object 共7种。



- 





> 

# 四、运算符

`运算符`（Operators，也翻译为操作符），是发起运算的最简单形式。运算符的分类见仁见智，我们的课程对运算符进行如下分类：

- 数学运算符(Arithmetic operators)      
- 关系运算符(Comparison operators)
- 逻辑运算符(Logical operators)
- 赋值运算符(Assignment operators)

## 1.1   数学运算符

数学运算符的正统，是number和number的数学运算，结果是number。出于面试的考虑，有一些奇奇怪怪的数学运算：

```shell
+	 	-	 *	 / 	%	 ()
```



### 1.1.1 显示类型转换

#### 1.1.1.1 parseInt(string, radix)

- `parseInt`就是将一个`string`转为一个`整数`，不四舍五入，直接截取整数部分。如果这个string有乱七八糟的东西，那么就截取前面数字部分。如果两个数字之间有字符串，那么`只截取第一个数字`。

| 参数   | 描述                                                         |
| :----- | :----------------------------------------------------------- |
| string | 必需。要被解析的字符串。                                     |
| radix  | 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。 |



```javascript
var a = "123.12px123";
var b = parseInt(a);
console.log(typeof b); //number
console.log(b); //123
```

 

#### 1.1.1.2 parseFloat()

和 `parserInt`功能相同，但是 `parseFloat`会截取小数点。

```javascript
var a = "123.12px123";
var b = parseFloat(a);
console.log(typeof b); //number
console.log(b); //123.12
```

 

#### 1.1.1.3 toString()

将其他类型转换为string类型  

```javascript
var str4 = 100;
console.log(typeof str4.toString());   //string
```

`小诀窍`：将一个数字，与一个空字符串进行连字符运算，那么就是自动转为字符串了,不仅是数字适用，其他类型要转换成字符串也适用

```javascript
var a = 123;
var b = a + "";
console.log(b);    //123
console.log(typeof b);  //string
```



### 1.1.2 隐式转换

就是没有写`parseInt()`、`parseFloat()`自己帮你转格式

```javascript
console.log(3 * "8");   	//24
console.log("3" * "8");    //24
console.log("48" / "2");   //24
console.log("24" % 55);    //24

console.log(3 * null);  //0  隐式转换的时候null将被转为0
console.log(3 * false); //0  隐式转换的时候false将被转为0
console.log(3 * true);  //3  隐式转换的时候true将被转为1
```

> PS：不纯的字符串和undefined是不能帮你进行隐式转换的，结果都是NaN

```javascript
console.log(3 * "8天");     //NaN  数学运算中，不纯的字符串没法隐式转换
console.log(3 * undefined);    //NaN  数学运算中，undefined不能进行隐式转换
```

加号比较特殊，`加号两边都是数字类型`的时候，那么就是数学加法；两边`不都是数字`的时候，那么就是`字符串的拼接`，结果是`字符串`。

```javascript
var sum = 3 + 4;       //7
console.log("你" + "好");    //你好
var sum = "3" + "4";      //34
```

##### 总结：

- 无论哪种运算，只要出现了undefined参与运算，结果都是NaN。
- 数字类型的字符串、false、true、null都能进行隐式转换。
- 加号比较特殊，没办法隐式转换。

### 1.1.3 取余 %

两个值相除的余数

```javascript
var a = 13 % 5;
console.log(a);   //3
```

以上代码，13除以5 商 2 余3，   所以结果为3

## 1.2   关系运算符

```shell
>		大于
<		小于
>= 	大于等于
<=		小于等于
==		等于
!=		不等于
===	全等于
!==	不全等
```



### 1.1.1 正统的关系运算

关系运算符的正统，number和number进行数学运算，得到的答案boolean

```javascript
console.log(8 > 5);
console.log(7 < 4);
```

##### 1.   = 等号  赋值

```javascript
var a = 10; //将10赋值给a
```



##### 2.    == 等等    等于

就基础数据类型而言，等等比较值，全等比较数据类型和值：

```javascript
var a = 10;
var b = "10";
console.log( a == b );//true
console.log( a === b );//false
```



##### 3. === 全等         

就引用类型而言，等等和全等都是比较内存地址

```javascript
var a = function () {
    console.log("Silence老师！");
};
var b = function () {
    console.log("Silence老师！");
};
var c = b;
console.log(typeof a);  // function
console.log(a == b);  //false
console.log(a === b);  //false
console.log(c === b);  //true
```



### 1.2.2 不正统的关系运算符

#### 1.2.2.1 string 和 string     比较的就是字符编码顺序

字符编码顺序：

```shell
数字 < 大写字母 < 小写字母
```

```shell
"a" < "b" 			//true
"A" < "B" 			//true
"A" < "a" 			// true ，大写字母在字符集里面是在小写字母前面
"1" < "A"  			//true ，数字在字母前端
"blank" < "blue"  	//true   因为一位一位比，直到比出大小
"25678" < "111111111"   	//false  因为是string和string比，比的是字符编码顺序	所以一位一位的比
```



#### 1.2.2.2 关系运算符的隐式类型转换

与数字进行关系运算时，`纯数字字符串被转为数字`，`null转换为0`，`true转换转为1`， `false转换为0`  （隐式类型转换）, `null不能进行和0的相等判定`

```javascript
console.log(null < 0.00001);   //true
console.log(null > -0.0001);   //true
console.log(null == 0);        //false
console.log(false == 0);       //true
console.log(true == 1);        //true
```

NaN与任何值都不相等，包括NaN本身。

```javascript
console.log(NaN == NaN );   //false
console.log(NaN === NaN ); //false
console.log(NaN != NaN);   //true
console.log(NaN !== NaN);  //true
```

string 和 number比较，string会被隐式转换为number

```javascript
console.log( "234" < 235 ); //true
```

要注意的是，我们已经了解了一些不正统的运算，所以不要出洋相，不能连续使用关系运算符！！3 > 2 > 1	值是多少？

```javascript
解：原式=(3>2) >1  = true > 1  = false   (因为true会被当做1来与1进行比较)
```

也就是说，不能连续使用关系运算符！！因为一旦连续使用了，实际上还是从左至右计算，所以就有上一步的boolean参与了下一步的运算。

因此需要使用逻辑运算符:`1<2 && 2<3`

## 1.3 逻辑运算符

正统来说，参与逻辑运算的是boolean和boolean，得到的结果也是boolean

##### 逻辑运算符就三个：

- &&         逻辑与运算
- ||           逻辑或运算
- !              逻辑非运算

### 1.3.1 && 与运算符

> 都真才真 有假就假  	 “短路语法”：a&&b       a真抛出b              a假抛出a

 ```javascript
console.log(1 && 2);       //2
console.log(false && 2);      //false
 ```



### 1.3.2   || 或运算符

> 有真就真  都假才假  “短路语法”： a || b             a真抛出a              a假抛出b       

```javascript
console.log(1 || 2);       //1
console.log(false || 2);   //2
```

 

### 1.3.3   !   非运算符

取反

```javascript
console.log( !1 );     //false
console.log( !false );    //true
```



## 1.4 赋值运算符

赋值运算的参与者，一定是变量

> =            	赋值
>
> +=         	加等于
>
> -=         	减等于
>
> *=          	乘等于
>
> /=          	除等于
>
> %= 		模等于
>
> ++         	加加
>
> --            	减减

##### 1.   +=

```javascript
var a = 1;
a += 2;              //这行语句等价于a = a + 2;
console.log(a);      //3
```

 

##### 2.   /=

```javascript
var b = 6;
b /= 3;   	//等价于b = b / 3
console.log(b);  //2
```

 

##### 3.   %=

```javascript
var c = 100;
c %= 10;      	//等价于c = c % 10;
console.log(c);  //0
```

 

##### 4.   ++

```javascript
var e = 10;
e++;         	//等价于e=e+1
console.log(e);  //11
```

 

##### 5.   ++a与a++的区别

++可以与输出语句写在一起，++写在变量前和写在变量后不是一个意思，当没有参与算术运算的时候，两者是没有任何区别的

```javascript
var a = 10;
a++ ;  
console.log(a); //11
++a ;  
console.log(a); //12
```

一旦参与运算，在运算的时候是不会先加的，在运算后是会加上去的。

```javascript
var a = 10;
var x = a++ ;  // 先赋值 再加1
console.log(x); //10
var y = ++a ;  // 先加1 再赋值
console.log(y); //12
```

```javascript
var a = 8;
console.log(4 + a++);   //12  ， 先使用原来的a的值，就是4+8，输出12.然后a加1  a为9
console.log(a);     //9
```



##### 6.   运算符的计算顺序：

```shell
++ -- ！（贴身的）>  数学运算符 >  比较  >   逻辑  >   赋值
```

```javascript
var a = 3 < 6 && 7 < 14;    //true
原式 = true && true
    = true

var a = 1 + 2 < 3 + 3 && 3 + 4 < 2 * 7;
原式 = 3 < 6 && 7 < 14
    = 上一题
    = true

var a = false + true && 13;
原式 = 0 + 1 && 13
    = 1 && 13
    = 13

var a = 15;
false + a++ + true > 8 && 13 || 6
原式 = false + 15 + true > 8 && 13 || 6
    = 16 > 8 && 13 || 6
    = true && 13 || 6
    = 13 || 6
    = 13
```



## 1.5 Math对象方法

##### 1. Math.pow(x,y)      x的

y次幂

```
Math.pow(3,4)      //81
```



##### 2. Math.sqrt(x);  

 x的根号

```
Math.sqrt(81);      //9
```



##### 3. Math.floor()     

向下取整

```
Math.floor(3.14)   //3
```



##### 4. Math.ceil() 

向上取整

```
Math.ceil(3.14)     //4
```



##### 5. Math.max()      

取最大值     参数没有个数限制

```
Math.max(3,4)     // 4
```



##### 6. Math.min()

取最小值     参数没有个数限制

```
Math.min(3,4);  //3
```



##### 7. Math.random()           

随机数  [0,1) 之间，取得到0，取不到1

要取到[a,b]之间的随机整数，公式：`Math.floor(Math.random()*(b-a+1) + a)`,比如要取[2,4]之间的整数

```
Math.floor(Math.random()*(4-2+1) + 2);  
```



##### 8. Math.abs() 

取绝对值

```
Math.abs(-2)    // 2
```



##### 9. Math.round()

四舍五入

```
Math.round(3.14)   //3
```

 

# 五、判断、循环语句

## 1.1  判断语句 

### 1.1.1 if else语句

##### 1. if

表示满足条件执行，不满足条件就什么都不做

```shell
if(条件){
条件为真的时候执行的语句
}
```

如：

```javascript
if(1<2){
console.log("1小于2为真");
}
```

我们可以看出这个语句，首先会判断条件是否满足，满足则执行if里面的语句。我们可以看出在括号里面的条件都会强制性的被转换成Boolean值。那么，哪些可以强制转换为真，哪些为假呢？

> 在强制转换成布尔值时为假（false）：0     false      ' '      null        undefined     NaN(不是数字)

##### 2.  if else 语句

满足条件执行if里面的语句   其他情况执行else里面的语句

```shell
if(条件){
     条件为真的时候执行的语句
 }else{
     条件以外的情况执行的语句
 }
```

如：

```javascript
if( 1<2 ){
     console.log("1小于2为真");
 }else{
     console.log("1小于2为假")
 }
```



##### 3.   三目运算

`三目运算`：在if else语句中，如果真假语句都只有一条的情况下，我们可以改写为三目运算，如下：

```javascript
if(1<2){
    console.log("Silence老师很帅！");
}else{
    console.log("Silence老师不帅！");
}
```

写为三目运算：

```javascript
1<2 ? console.log("Silence老师很帅！") : console.log("Silence老师不帅！");
```

还可以这样：

```javascript
var a = "";
if(1<2){
    a = "Silence老师好帅！";
}else{
    a = "Silence老师不帅！";
}
```

改为三目：

```javascript
a = 1 < 2 ? "Silence老师好帅！" : "Silence老师不帅！";
console.log(a);

```

当条件为真或条件为假的语句只有一条的时候可以这样写

```shell
if(条件)条件为真的时候执行的语句
else 条件以外的情况执行的语句
```

如：

```javascript
if(2<1)console.log("Silence老师不帅！");
else console.log("Silence老师好帅！");
```



##### 4. if else if else 语句

```javascript
if (条件1){
     满足条件1执行的语句
 }else if ( 条件2 ){
     满足条件2执行的语句
 }else(其他情况){
     都不满足执行的语句
 };
```

判断会从第一个条件开始，依次向下执行判断

比如：

```javascript
var a = 2;
if(a<3){
    console.log("a小于3");
}else if(a === 3){
    console.log("a等于3");
}else{
    console.log("a小于3");
}
```



### 1.1.2 switch语句

`switch`语句和`if`没什么区别，能用if的就能用switch，能用switch的同样能用if，在switch里面注意的是一定要有`break`代表此段语句结束。

```javascript
switch( a ){
    case 'Silence':
        alert('帅哥！');
        break;
    case '下雨天':
        alert('美女！');
        break;
    case '赵四':
        alert('霹雳火！');
        break;
    case '萌':
        alert('萌！');
        break;
    default:
        alert('你到底是谁！');
        break;
}
```



## 1.2 循环语句

当我们重复的去做一件事情的时候，我们就可以通过for循环去帮我们实现

### 1.2.1 for循环

##### 语法：

```javascript
for ( 定义循环变量（1）; 判断条件（2） ; 变化量（4） ){
	一条或多条语句（3）
};
```



##### 执行顺序：

```javascript
1 -> 2(条件为真) -> 3 -> 4
1 -> 2(条件为假) 结束循环
```

当判断条件为真的时候停止执行for里面的语句

```javascript
for ( var i=0 ; i<4 ; i++ ) {
    alert( i );
};
```

当语句执行完毕以后，i的值为多少呢？

```javascript
for ( var i=0 ; i<4 ; i++ ) {
    alert( i );
};
alert( i + '：最后一次的i' );
```

i的值为定值，是刚好不满足条件的那个值

 

### 1.2.2 跳出循环

##### 1. break

立即跳出当前循环

```javascript
for (var i=0;i<10;i++ )
{
    if ( i === 5 )
    {
        break;
    }
    console.log(i);
}
```

输出：`0 1 2 3 4`

 

##### 2. continue

跳过本次循环

```javascript
for (var i=0;i<10;i++ ) {
    if ( i === 5 )
    {
        continue;
    }
    console.log(i);
}
```

输出：`0 1 2 3 4 6 7 8 9`

### 1.2.3 while

和for循环类似，while也是有判断语句

##### while:

```javascript
var a = 1;
while( a < 10 ){
    a++;
    console.log(a);
}
```

当a < 10的时候console出a

##### do while

```javascript
var a = 1;
do{
    a++;
    console.log(a);
}while( a < 10 )
```

`do while` 和`while`不同的是，先执行一遍再判断，也就是至少执行一遍

 

## 1.3   for in

### 1.3.1 点和[]操作

在js中，只有对象点属性或者方法，变量是不可以被点的并且，可以用点操作的几乎都可以用`[]`代替   在替代的时候`[]`里面不是变量就要加引号

```javascript
document.querySelector('div').style.cssText = 'height: 100px; width: 100px; background: deeppink;'
```

等价于

```javascript
document['querySelector']('div')['style']['cssText'] = 'height: 100px; width: 100px; background: deeppink;'
```

[]操作有什么好处呢： 可以为变量

```javascript
var a = 'name';
console.log(shuaiGe.a);        //没有a这个属性
console.log(shuaiGe[a]);    //变量a
```

 

### 1.3.2 for in

JSON里面我们想要拿到所有的属性和值不可能一个一个去点 并且我们怎么样我们只知道名字的情况下得到里面所有的属性和值呢？  因此我们需要像for循环一样的遍历语法 因此for in就应运而生了

其中` k代表属性`(和for循环一样k可以是任意变量)   shuaiGe代表你要`遍历的对象`

```javascript
var shuaiGe = {
    'name' : 'Silence',
    'age' : '18',
    'sex' : '男',
};
for (var k in shuaiGe) {
    console.log(k);           //获取到所有JSON的属性
    console.log(shuaiGe.k);        //k是变量因此我们不能直接点
    console.log(shuaiGe[k]);    //获取到所有的JSON的值
}
```

除了遍历JSON我们还可以遍历对象 比如`window`下面的，因为方法下面会有很多的属性或者方法

```javascript
for (var k in window) {
    console.log(k);
}
```

我们直接使用window下面的方法的时候可以省略window的  比如：`alert()`  其实是`window.alert()`   `document    window.document`

数组也是对象    我们来用`for in`遍历数组  我们可以发现数组的属性是下标

```javascript
var arr = ['大狗','二狗'];
for (var k in arr) {
    console.log(k);
}
```



## 1.4 获取实际样样式

我们通过js操作的都是行内样式。

```javascript
oDiv.style.cssText = 'height: 100px; width: 100px; background: deeppink;';  //js都是操作的行内样式
console.log(oDiv.style.height);    //通过点style获取的是行内样式
```

如果我们想获取当前生效的样式（比如，内部，外部样式）

```javascript
var a = getComputedStyle(oDiv).width;   //兼容IE9及以上
var b = oDiv.currentStyle.width;        //兼容IE8及以下
console.log(a);
console.log(b);
```

所以我们需要写一个方法封装起来

```javascript
function getStyle(obj,attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
```



# 六、函数

函数的作用：在出现大量程序相同的时候，可以封装为一个function，这样只需要调用一次就能执行很多语句，模块化编程，让复杂的逻辑变得简单。

## 1.1 函数的定义

通俗的说，函数就好像我们css的类名一样，我们书写类里面的样式的时候，就是`函数的定义`，给标签加上类名，可以多次使用它，这就叫做`函数调用`。

```javascript
//定义函数
 function fn(){
     alert("Silence老师我爱你，就像老鼠爱大米！")
 }
 //函数调用 在定义函数之前或者之后都可以，我们后面讲
 fn();
```

这个时候，我们的函数有名字了，那么，我们可以把它放到我们的事件后面

```javascript
oBox.onclick = fn;
//定义函数
function fn(){
    alert("Silence老师我爱你，就像老鼠爱大米！")
}
```

这个时候就是这么回事，事件触发的时候，我们后面的函数就会执行，但是要注意的是，事件后面的函数不要加括号，那样子他就自执行了，至于执行以后是什么东西。我们待会儿再讲。

## 1.2 函数的分类

### 1.2.1 有名函数

有名函数，顾名思义就是有名字的函数。

```javascript
function fn(){
    alert("Silence老师我爱你，就像老鼠爱大米！")
}
```

调用

```javascript
fn()
```



### 1.2.2 匿名函数

上面我们讲的定义函数和调用函数，那是有名函数，只有有名函数才可以调用，那么，在我们最开始的时候我们事件后面那一长串的函数又是什么呢？就是我们的`匿名函数`

```javascript
oBox.onclick = function () {
    alert("Silence老师我爱你，就像老鼠爱大米！");
};
```

我们可以看到，在function后面没有函数名，像这样的函数就叫做匿名函数，不能像有名函数一样单独存在，单独存在的匿名函数是没有任何意义的。只有`事件触发的时候我们的匿名函数才会执行`。

### 1.2.3 函数表达式

什么样的函数能加（）执行？

- 有名函数的函数名()   
- 函数表达式()

有没有办法将匿名函数变为函数表达式？

将匿名函数变为函数表达式 并加括号执行的几种办法：

最重要：

```javascript
(function () {
    console.log("Silence一号");
})();

var a = function () {
    console.log("Silence二号");
}();

+function () {
    console.log("Silence三号");
}();

-function () {
    console.log("Silence四号");
}();

!function () {
    console.log("Silence五号");
}();

~function () {
    console.log("Silence六号");
}();

(function () {
    console.log("Silence七号");
}());
```

 

## 1.3 函数参数

在函数里面是可以传变量的

### 1.3.1 参数定义

写在函数块里面的叫做`形参`(一定是变量)，`接收实参` 如：  

```shell
erGou(a,b) 等价于 erGou(var a, var b)
```

因此不需要单独的在定义a,b。写在函数执行括号里面的叫做`实参`（可能是直接量也可能是变量），`给形参传值`

```javascript
function erGou(a, b) {
    console.log(a + b);
}
erGou(10, 20);     //30 函数执行的时候将括号里面的实参对应赋值给函数里面的形参等价于a=10,b=20
erGou(5, 10);     //15
```

 

### 1.3.2 应用

```javascript
function daGou(a) {
    alert(a);
    a();
}
daGou( function () {console.log("哈哈");} );
```

以上语句相当于：

```javascript
var a = function () {console.log("哈哈");}
alert(a);
a();
```

现在函数赋值给a了，a就是一个函数表达式，那就直接a加括号执行就行了

大家记住，函数执行只有两种情况，`一是事件触发，二是函数名或函数表达式加括号执行`

### 1.3.3 参数对应问题

```javascript
function daGou(a,b) {
    console.log(a+b);
}
```



##### 1.   正常情况下

```javascript
daGou(1,2); //3
```



##### 2.   形参个数比实参个数少

不影响

```javascript
daGou(1,2,3);   //3
```



##### 3.   形参个数比实参个数多

```javascript
daGou(1);   //NaN
```

这个时候a = 1 ,b因为没有赋值，所以是`undefined`

那么，`1 + undefined = NaN`

##### 4.   arguments 不定参

我们先来做一个小案例求和

```javascript
function sum(x,y,z) {
    console.log(x+y+z);
}
sum(1,2,3);
```

如果说有十个，一百个求和呢？

当我们的实参和形参没有办法一一对应的时候，我们每一个函数都有一个`arguments`不定参（类数组），里面存放了我们所有的实参。这一个时候我们就把所有的用户传入的参数都给拿到并且求和了

```javascript
function sum1() {
    var n = 0;
    for( var i=0; i<arguments.length; i++ ){
        n += arguments[i];
    }
    console.log(n);
}
sum1(1,2,3,4,5,6,7,8,9);
```

 

### 1.3.4  return函数返回值

现在我们来考虑一个事情，当我们的函数执行完毕以后是什么东西？

```javascript
function daGou() {
    console.log("Silence老师");
}
var a = daGou();
console.log(a);  //undefined
```

由上面的例子我们可以看出来。首先 函数执行输出“Silence老师” 然后将函数执行完以后的数据赋值给a我们再输出a。这个时候会输出undefined    也就证明函数执行完毕以后返回undefined。那我们这里就有一个return   可以改变函数的返回值，return什么就返回什么？

```javascript
function daGou(a,b) {
    console.log( a + b );
    return a+b;
    console.log("哈哈");
}
var a = daGou(2,3);
console.log(a);
```

现在，我们给了`return`以后函数返回的值就是return的值，简单的说就是整个函数执行完以后整个函数相当于返回的值，且函数遇到return就不再执行之后的语句

在之前我就给大家讲过这样的一个例子

```javascript
function daGou() {
    console.log("Silence");
}
document.onclick = daGou();
```

这时候我们发现我们的点击事件失效，那这是为什么呢，就是因为我们刷新页面以后我们的`daGou`直接执行，执行完以后返回`undefined`    将一个undefined给点击事件很显然是不行的

那我们要怎样才可以实现呢？

```javascript
function daGou() {
    function erGou() {
        console.log("Silence");
    }
    return erGou;
}
document.onclick = daGou();
```

 

## 1.3.5 递归

> 递归:在函数里面调用自己本身

先来看看用js实现阶乘

```javascript
function factorial(x) {
    var  product = 1;
    for( var i=1; i<=x; i++ ){
        product *= i;
    }
    return product;
}
console.log(factorial(3));
```

有没有更简单一点的方法呢？ 

```javascript
function factorial(x) {
    return x === 1 ?  1 :  x*factorial(x-1);
}
var product = factorial(5);
console.log(product);
```

上面的语句的含义是：

```javascript
product =5*factorial(5-1)
product =5*4*factorial(4-1)
product =5*4*3*factorial(3-1)
product =5*4*3*2*factorial(2-1)
product =5*4*3*2*1
```

 

# 七、作用域、闭包

作用域：将js代码的解析分为很多个域，一个域解析完了再解析另一个域，script就是最大的一个域      函数执行也是一个域

## 1.1 作用域

### 1.1.1 Javascript的解析顺序

可以弹出'Silence'

```javascript
<script>
    var a = 'Silence';
</script>
<script>
    alert(a);
</script>
```

报错

```javascript
<script>
    alert(a);
</script>
<script>
    var a = 'Silence';
</script>
```

> 总结：两个不同的script标签先执行完前一个的全部代码   前一个定义了的变量后面的就可以使用

弹出undefined      但不报错

```html
<script>
    alert(a);
</script>
<script>
    var a = 'Silence';
</script>
```

> 总结：在同一个script标签里面  按从上往下的原理来说应该是报错，但是并没有，说明在同一个标签里面只用从上往下来描述执行顺序是不合理的

### 1.1.2 作用域里面的执行顺序

##### 1.作用域里面的执行顺序：

> 1. 定义：var a(定义变量名 不会找赋值)    函数定义（有名函数的定义）
> 2. 执行（除了定义都是执行 从上往下执行）

我们再来看看刚才的例子

```javascript
alert(a);
var a = 'Silence';
alert(a);
```

```javascript
//1. 定义：
var a;
//2. 执行：
alert(a);      //a已经var了   因此有a这个变量了但是没有赋值    所以弹出undefined
a = 'Silence';    //弹窗执行以后才给a赋值
alert(a)      //这个时候a已经赋值了因此就可以弹窗了
```

 

##### 2. 为什么函数可以在定义前面执行

```javascript
daGou();
function daGou() {
    console.log('Silence');
}
```

分析：

```javascript
//1. 定义：
function daGou() {
    console.log('Silence');
}
//2. 执行：
daGou();
```

 

### 1.1.3 新的作用域和作用域链

`新的作用域`：每遇到一个新的作用域就会开始新的`定义和执行步骤` 在新的作用域执行完毕以后`又会回到上级作用域`继续执行

`作用域链`：在执行时遇到变量会先在当前作用域寻找   如果没有找到则会向上一级作用域找     如果一直没有找到就是报错（注意：undefined是找到了，但是还没有赋值） 但是    作用域链`只能子作用域往父作用域找`   `不能父作用域往子作用域找`  

> 注意：script是一个大的作用域

我们来看看下面的一个例子：

```javascript
var dagou = '大狗';
function daGou() {
    console.log(dagou);
    var dagou = '二狗';
    console.log(dagou);
}
daGou();
```

以上代码

```javascript
//1.定义：
var dagou
function daGou() {
    console.log(dagou);
    var dagou = '二狗';
}
//2.执行：
dagou = '大狗';
daGou();    //==>新的作用域
//1.定义：
var dagou
//2. 执行：
console.log(dagou); //undefined
dagou = '二狗';
console.log(dagou); //二狗
```

 

### 1.1.4 注意

当函数名和变量重名时，以函数为准，当给a赋值以后又是以变量为准  因此我们要尽量避免变量和函数重名

```javascript
function a() {
    console(a);
}
var a;
console.log(a);
/*当函数名和变量重名时，以函数为准*/
function a() {
    console(a);
}
var a = 5;
console.log(a);
```



## 1.2 闭包

### 1.2.1 概念

任何的培训机构，任何的书，讲闭包，一定是下面的案例：

我们之前已经学习过，inner()这个函数不能在outer外面调用，因为outer外面没有inner的定义

```javascript
function outer(){
    var a = 3;
    function inner(){
        console.log(a);
    }
}
//在全局调用inner但是全局没有inner的定义，所以报错
inner();
```

但是我们现在就想在全局作用域下，运行outer内部的inner,此时我们必须想一些奇奇怪怪的方法。

有一个简单可行的办法，就是让outer自己return掉inner：

```javascript
function outer() {
    var a = 3;
    function inner() {
        console.log(a);
    }
    return inner;
}
var inn= outer();
inn();
```

以上代码，结果a为3。这就说明了：

> - 函数能够持久保存自己`定义时的所处环境`，并且即使在其他的环境被调用的时候，依然可以访问自己定义时所处环境的值
>
> - 一个函数可以把它自己`内部的语句`，和自己`声明时所处的作用域`一起封装成了一个`密闭环境`，我们称为`“闭包”`（Closures）。

> 总结：闭包 =  自己的语句+ 自己声明时所处的环境的作用域

### 1.2.2 闭包的性质

每次重新引用函数的时候，闭包是全新的，无论它在何处被调用，他总是能访问它定义时所处的作用域中的全部变量（这里说的全新是指赋值给新的函数的时候是全新的，并不是调用相同的函数是全新的）

```javascript
function outer() {
    var a = 3;
    function inner() {
        a++;
        console.log(a);
    }
    return inner;
}
var daGou = outer();
var erGou = outer();
daGou();      //4
daGou();      //5
daGou();      //6
erGou();      //4

```

最常用的闭包

```javascript
var aLi = document.querySelectorAll('li');
for( var i=0; i<5; i++ ){
    (function (m) {
        console.log(m);
        aLi[m].onclick = function () {
            alert(m);
        }
    })(i)
}
```

我们将i传入function，这时候点击事件就是一个闭包，记住了定义时所处的环境的变量，也就是每次都记住了m的值

- 闭包可以读取函数内部的局部变量；这些变量的值始终保存在内存中。
- 常见创建闭包方法：在一个函数内部创建另一个函数。

- 闭包的优缺点：

  > -  缺点：由于闭包携带包含它函数的作用域，因此比其他函数占用的内存更多。
  > - 优点：减少创建全局变量 减少传递给函数的参数量 封闭性







# 八、数组字符串相关操作

 

## 1.1 数组

### 1.1.1   数组的初步认识

- 数组里面的各项可以是任意的数据类型     
- 数组可读可写(可以得到值也可以修改值)       没有的项就是undefined

 ```javascript
var arr = [function () {},'Silence',13,null];       //数组各项可以是任意类型
arr.length = 8;
console.log(arr.length);             //获取数组长度
console.log(arr[8]);                 //undefined	没有的项就是undefined
arr[8] = '哈哈';
console.log(arr[8]);                 //哈哈
 ```



### 1.1.2  数组的一些方法属性

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [concat()](http://www.w3school.com.cn/jsref/jsref_concat_array.asp) | 连接两个或更多的数组，并返回结果。（没有push性能好，concat不会改变原数组，push改变原数组） |
| [join()](http://www.w3school.com.cn/jsref/jsref_join.asp)    | 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。 |
| [pop()](http://www.w3school.com.cn/jsref/jsref_pop.asp)      | 删除并返回数组的最后一个元素                                 |
| [push()](http://www.w3school.com.cn/jsref/jsref_push.asp)    | 向数组的末尾添加一个或更多元素，并返回新的长度。             |
| [reverse()](http://www.w3school.com.cn/jsref/jsref_reverse.asp) | 颠倒数组中元素的顺序。                                       |
| [shift()](http://www.w3school.com.cn/jsref/jsref_shift.asp)  | 删除并返回数组的第一个元素                                   |
| [slice()](http://www.w3school.com.cn/jsref/jsref_slice_array.asp) | 从某个已有的数组返回选定的元素                               |
| [sort()](http://www.w3school.com.cn/jsref/jsref_sort.asp)    | 对数组的元素进行排序。a > b 正序，a < b 反序。               |
| [splice()](http://www.w3school.com.cn/jsref/jsref_splice.asp) | 删除元素，并向数组添加新元素。                               |
| [toSource()](http://www.w3school.com.cn/jsref/jsref_tosource_array.asp) | 返回该对象的源代码。                                         |
| [toString()](http://www.w3school.com.cn/jsref/jsref_toString_array.asp) | 把数组转换为字符串，并返回结果。                             |
| [toLocaleString()](http://www.w3school.com.cn/jsref/jsref_toLocaleString_array.asp) | 把数组转换为本地数组，并返回结果。                           |
| [unshift()](http://www.w3school.com.cn/jsref/jsref_unshift.asp) | 向数组的开头添加一个或更多元素，并返回新的长度。             |
| [valueOf()](http://www.w3school.com.cn/jsref/jsref_valueof_array.asp) | 返回数组对象的原始值                                         |

以以下数组为例

```javascript
var arr = [function () {},'Silence',13,null];
```



##### 1.     length

获取数组的长度

```javascript
console.log(arr.length);       //4
```



##### 2.     push()

在数组末尾添加项目，可添加一个，也可以添加多个。

```javascript
var arr = [function () {},'Silence',13,null];
arr.push('Silence');
console.log(arr); // [function () {},'Silence',13,null, 'Silence']
```



##### 3.      pop()  

删除数组最后一项，能够返回被删除的那一项

```javascript
var arr = [function () {},'Silence',13,null];
var a = arr.pop();
console.log(arr);         //[function () {},'Silence',13]
console.log(a);           //null
```



##### 4.      unshift()          

在数组的第0项添加项目，可添加一个，也可添加多个

```javascript
var arr = [function () {},'Silence',13,null];
arr.unshift('Silence','阳帅');
console.log(arr);
```

 

##### 5.     shift() 

删除数组第0项，可以返回被删除的那一项

```javascript
var a = arr.shift();
console.log(a); //function(){}
console.log(arr); //["Silence", 13, null]
```

旋转木马轮播图的原理

```javascript
arr.unshift(arr.pop());     //删除最后一项，添加到第一项
arr.push(arr.shift());    //删除第一项，添加到最后一项
```



##### 6. concat()      合并两个数组    返回一个新的数组

```javascript
arr1.concat(arr2);         //注意，合并以后是形成一个新的数组，并没有改变原来的数组
```

concat和push的区别

- 在数组操作中，push()很常见，concat()却很少见，然而两者的用法很相似，可以理解为，push()是concat()的简化版，先看下面的例子：

```js
/*push()方法*/
var array=[1,2,3,4,5];

console.log(array);   //[1, 2, 3, 4, 5]

array.push(6);        //一个参数
console.log(array);   //[1, 2, 3, 4, 5, 6]

array.push(6,7);      //两个参数
console.log(array);   //[1, 2, 3, 4, 5, 6, 7]

array.push([6,7]);    //参数为数组
console.log(array);   //[1, 2, 3, 4, 5, 6, Array(2)]
```
```js
console.log(array);   //[1, 2, 3, 4, 5]

var array2=array.concat(6);    //一个参数
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6]

var array2=array.concat(6,7);    //两个参数
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6，7]

var array2=array.concat([6,7]);    //参数为数组
console.log(array);    //[1, 2, 3, 4, 5]
console.log(array2);   //[1, 2, 3, 4, 5, 6, 7]
```
- 通过代码可以看出一下几点差别：

  > - push()是在原数组的基础上修改的，执行push()方法后原数组的值也会变；concat()是先把原数组复制到一个新的数组，然后在新数组上进行操作，所以不会改变原数组的值。
  >
  > - 如果参数不是数组，不管参数个数有多少个，push()和concat()都会直接把参数添加到数组后；如果参数是一个数组，push()就会直接把数组添加到原数组后，而concat()会把数组里的值取出来添加到原数组后。

##### 7. slice()   截取数组

arr.slice(start,end)  返回一个新数组，包括start不包括end，取出了end-start项

```javascript
var arr1 = [function () {},'Silence',13,null];
var a = arr1.slice(1,3);
console.log(a);          //'Silence',13
```

 

##### 8. splice() 

多功能插入，删除，替换（数组被改变）不能用于字符串。

- 一个参数的时候：从多少项开始删除后面所有

```javascript
var arr1 = [function () {},'Silence',13,null];
arr1.splice(-2);       //从倒数第二项开始删除后面所有
console.log(arr1);

arr1.splice(1);        //从第一项开始删除后面所有
console.log(arr1);
```

- 两个参数的时候：第一个参数表示从多少项开始删除 第二个参数表示删除多少项

```javascript
var arr1 = [function () {},'Silence',13,null];
arr1.splice(1,1);
console.log(arr1);        //[ƒ, 13, null]
```

- 三个参数的时候：第三个参数为之前删除的项替换的项

```javascript
var arr1 = [function () {},'Silence',13,null];
arr1.splice(1,1,'喜洋洋');
console.log(arr1);        //[ƒ,'喜洋洋', 13, null]
```

 

##### 9.  reverse()

逆序，立即让数组倒置（数组被改变）

```javascript
var arr1 = [function () {},'Silence',13,null];
arr1.reverse();
console.log(arr1);       //[null, 13, "Silence", ƒ]
```

 

##### 10. sort() 

数组排序，默认是按照字符编码排序，sort里面有个参数，这个参数是一个函数

- 如果正序，a>b,return 1; a<b,return -1;   如果倒序，a>b; return -1; a<b return 1;

```javascript
var arr2 = [3,4,2,5,1,1];
arr2.sort(function (a,b) {
    // a > b 正序
  	// a < b 反序
});
console.log(arr2);
```



##### 11. map()

`map() `方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。`map() `方法按照原始数组元素顺序依次处理。

语法：

```javascript
array.map(function(currentValue,index,arr),thisValue)
```



| 参数                                | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| function(currentValue,   index,arr) | 必须。函数，数组中的每个元素都会执行这个函数。   `currentValue`  必须。当前元素的值                       `index`  可选。当期元素的索引值。 `arr`    可选。当期元素属于的数组对象 |
| thisValue                           | 可选。对象作为该执行回调时使用，传递给函数，用作` "this"` 的值。    如果省略了 `thisValue` ，"this" 的值为 `"undefined"` |

如下：给arr每一项都加1，其中items代表数组每一项值

```javascript
var arr = [1,2,3,4];
var arr1 = arr.map(function (items) {
    return items + 1; //给数组每一项加1
});
console.log(arr1); //[2,3,4,5]
```



> 注意：map() 不会改变原始数组。

##### 12. reduce()

reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。

语法：

- accumulator : 上一次调用回调返回的值，或者是提供的初始值（initialValue）
- currentValue : 数组中当前被处理的数组项
- currentIndex : 当前数组项在数组中的索引值
- array : 调用 reduce() 方法的数组
- initialValue 作为第一次调用 callback 函数的第一个参数。

```javascript
arr.reduce(function(previousValue, currentValue, index, array){
     return previousValue + currentValue;
 }, initialValue);
```

如下：

```javascript
var arr = [1,2,3,4];
var a = arr.reduce(function (accumulator,currentValue) {
    return accumulator+currentValue
},20);
console.log(a); //30
```

 

##### 13. join()

- 将数组转为字符串  参数为需要连接的字符

  ```
  var arr1 = [function () {},'Silence',13,null];
  var a = arr1.join('-');
  console.log(a);             //function () {}-Silence-13-
  console.log(typeof a);       //string
  ```

  

##### 14. forEach()方法

- 从头至尾遍历数组，为每个元素调用指定的函数。没有返回值，不改变原数组。不能使用break停止循环。

  ```js
  var a = [1,2,3,4,5];
  
  let sum = 0
  
  a.forEach(item => {
       sum += item;
  });
  console.log(sum); // 15
  ```

  

##### 15. filter()方法

- 创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

  ```js
  var a = [1,2,3,4,5];
  
  const newArr = a.filter(item => item>2);
  console.log(newArr); // 3 4 5
  ```

  > 注意：如果使用map()方法，返回的是[false, false, false, true, true]

- filter()会跳过稀疏数组中缺少的元素，他的返回数组总是稠密的。所以可以用一下方法来压缩稀疏数组的空缺。

  ```js
  var a = [1,2,,,5];
               
  var b = a.filter(function (value) {
      return true
  })
                
  console.log(b); //返回[1,2,5]
  ```

　　

##### 16. find() 方法

- find()方法为数组中的每个元素都调用一次函数执行，当数组中的元素在测试条件时返回true，find()返回符合条件的元素，之后的值不会再执行函数。如果没有符合条件的元素则返回undefined。

  ```js
  var a = [1,2,3,4,5];
  
  const newArr = a.find(item=>item>2)
  console.log(newArr); // 3 
  ```

- 同filter的区别在于find只返回查询到的第一个符合条件的数据就不在执行了，而filter会遍历所有的，返回所有符合条件的数据。

##### 17. every()和some()

- every()方法是只有数组中所以元素都满足某个条件才会返回true；some()方法是只要有满足条件的值，就返回true。

  ```js
  var a = [1,2,3,4,5];
  
  const bol1 = a.every(item => item>2);
  const bol2 = a.every(item => item>0);
  const bol3 = a.some(item => item>2);
  console.log(bol1,bol2,bol3); // false true true
  ```

  

##### 19. indexOf()和lastIndexOf()

- 这两个方法都是用来搜索整个数组中具有给定值的元素，返回找到的`第一个元素的索引`，如果没找到，则返回-1。
- 区别在于indexOf()从头至尾搜索，而后者则是反向搜索。



## 1.2 字符串的属性方法

##### 1. charAt()

返回在指定位置的字符

```javascript
var str = '我爱Silence老师！';
console.log(str.length);      //注意：一个空格也算是一个字符串
console.log(str[1]);          //兼容ie8以上
console.log(str.charAt(2));      //兼容所有浏览器
```

虽然用下标也可以，但是能兼容全部浏览器更好，因此我们会经常使用`charAt()`

##### 2. concat()     

字符串连接

```javascript
var str1 = '我爱Silence老师！';
var str2 = '就像老鼠爱大米！';
console.log(str1.concat(str2));       //字符串拼接 拼接以后str1在前str2在后
```

 

##### 3.  indexOf()

`检索字符串` 检索某个字符串`首次`出现的位置     如果没有检测到则返回`-1`

```javascript
var str1 = '我爱Silence老师！';
console.log(str1.indexOf('爱'));       //1
```

- 两个参数的时候   第一个参数表示要`检测的字符`   第二个参数表示从多少的`下标`开始检测

```javascript
var str3 = 'Silence老师很帅，Silence老师很骚，我爱Silence老师！';
console.log(str3.indexOf('Silence',2));     //如果检测到则返回第一个被检测的字符串的序列
```

现在我们来做一个小案例：输出str3里面所有'Silence'字符串的位置

```javascript
var str3 = 'Silence老师很帅，Silence老师很骚，我爱Silence老师！';
```

```javascript
for( var i=0; i<str3.length; i = a +1 ){          //这里要注意的是我们下一次加的长度要加上之前检索到的字符串的位置避免重复检索
    var a = str3.indexOf('Silence老师',i);    //将返回的字符串位置赋值给a
    if(a === -1){
        break;                 //如果a===-1说明没有找到字符串，那么直接结束循环
    }else{
        console.log(a);             //如果a不等于-1说明检索到字符串的位置，那么直接输出
    }
}
```

 

##### 4.  replace()

`替换` 将第一个目标字符替换为第二个参数的字符

```javascript
var str4 = "abcda";
var x = str4.replace("a","0");    //将第一个a替换成0
console.log(x);             // 0abcda
```

替换所有

```javascript
var str = '太阳，太阳，太阳'
var str2 = str.replace(/太阳/g, '月亮')
console.log(str2);
```



##### 5. split()

把字符串转为数组，从什么地方拆，就是参数，拆开的是字符串       如果想每一个字符串都拆开，那就传空字符串

```javascript
var str4 = '大锤 二锤';
var a = str4.split('  ');
console.log(a);   //["大锤", "二锤"]
```

 

##### 6. substr()

截取子串

第一个参数是`起始位置`，第二个参数是要截取的`字符串的长度`

```javascript
var str6 = 'abcde';
str6.substr(1,3)    //bcd  从下标为1的开始，截取3个长度的字符
```

 

##### 7. slice()

截取字符串

当起始位置为负数时，slice会按照`倒序`来数(但是要注意参数一定要是左边数到右边)  当为正数时，slice只能接受`第一个数比第二个数小`的数  取不到`最后一个数`

```javascript
var str6 = 'abcde';
str6.slice(1,3)    //bc  从下标为1的开始，截取到3，取不到弟3个
```

 

##### 8. substring()

截取字符串

当起始位置为负数时，`substring`会将负数转为0，substring会将两者较小的作为起始位置，取不到最后一个数

```javascript
var str7 = 'Silence老师我爱你！';
var c = str7.substring(4,7);
var d = str7.substring(-1,7);
console.log(c);     //我爱你
console.log(d);     //Silence老师我爱你
```


