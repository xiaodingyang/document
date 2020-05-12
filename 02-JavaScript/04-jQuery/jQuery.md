# jQuery

## 1.1 jQuery 简介

### 1.1.1 概念

- 官网：[www.jquery.com](http://www.jquery.com)

- 中文文档：<http://jquery.cuishifeng.cn/>

- jQuery是一个快速、简洁的`JavaScript`框架，是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨是“write Less，Do More”，即倡导`写更少的代码，做更多的事情`。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，`优化HTML文档操作`、`事件处理`、`动画设计`和`Ajax交互`。

- jQuery的核心特性可以总结为：具有独特的链式语法和短小清晰的多功能接口；具有高效灵活的css选择器，并且可对CSS选择器进行扩展；拥有便捷的插件扩展机制和丰富的插件。
- jQuery兼容各种主流浏览器，如IE 6.0+、FF 1.5+、Safari 2.0+、Opera 9.0+等。

 

### 1.1.2 版本介绍

- 1.x：兼容ie678,使用最为广泛的，官方只做BUG维护，功能不再新增。因此一般项目来说，使用1.x版本就可以了，最终版本：1.12.4 (2016年5月20日)

- 2.x：不兼容ie678，很少有人使用，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x，最终版本：2.2.4 (2016年5月20日)

- 3.x：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。目前该版本是官方主要更新维护的版本。

### 1.1.3 jQuery各版本引用

网址：http://www.bootcdn.cn/jquery/

 

## 1.2 JavaScript编程比较恶心的地方

- 恶心1：选择元素麻烦，全线兼容的方法只有getElementById()和getElementsByTagName()两个。其他的方法是不都兼容的。getElementsByClassName()通过类名选择元素，IE9开始兼容。queselector()兼容ie8以上

- 恶心2：样式操作麻烦，得到实际样式，需要我们封装getStyle()

- 恶心3：动画麻烦，需要我们自己封装animate();

- 恶心4：批量控制麻烦，大量出现的for循环语句；排他操作麻烦

- 恶心5：HTML节点操作麻烦

 

## 1.3 核心

### 1.3.1 jQuery([selector,[context]])

- `jQuery()`这个函数接收一个包含 CSS 选择器的字符串，然后用这个字符串去匹配一组元素。

- `jQuery` 的核心功能都是通过这个函数实现的。 jQuery中的一切都基于这个函数，或者说都是在以某种方式使用这个函数。这个函数最基本的用法就是向它传递一个表达式（通常由 CSS 选择器组成），然后根据这个表达式来查找所有匹配的元素。

- 默认情况下, 如果没有指定context参数，`$()`将在当前的 HTML document中查找 DOM 元素；如果指定了 context 参数，如一个 DOM 元素集或 jQuery 对象，那就会在这个 context 中查找。在jQuery 1.3.2以后，其返回的元素顺序等同于在context中出现的先后顺序。

- 参数是标签，还可以创建标签节点。

####  1.3.1.1 创建标签节点

在dom里面创建一个div新节点

```javascript
$("<div>哈哈</div>");
```

#### 1.3.1.2 参数为elementArray（一个用于封装成jQuery对象的DOM元素数组）

其中的a就是jQuery对象封装的元素组

```javascript
var a = $(".box p");
 $(a).css({background: "green"});
```

### 1.3.2 each()

`each()`表示遍历节点，也叫作迭代符合条件的节点。each()语句就好比派出一个侦察兵，挨家挨户去敲门，敲开门之后做什么事情，写在`function(){}`里面，这里面的 `$(this)` 表示敲开门的这家。`i表示当前的序号`,`n表示遍历的这个对象.`

```javascript
$("p").each(function (i,n) {
    console.log(i + "--" + n);
})
```

遍历数组：其中`arr是数组`，`i是序号`，`n是每项值`

```javascript

```

 

### 1.3.3 length属性

$()的元素页面上一共有几个，length属性返回的是该类数组的个数。

```javascript
console.log($(".box1 p").length);
```

 

### 1.3.4 selector属性

返回传给jQuery对象的选择器

```javascript

```

 

### 1.3.5 get(num)

取得其中一个匹配的元素。 num表示取得第几个匹配的元素。从0开始，`返回的是DOM对象`，类似的有`eq(index)`,不过eq(index)返回的是 `jQuery对象`。因此我们可以将jQuery对象转换成dom对象。

```javascript
$(".box p").get(0).style.background = "green";
```



### 1.3.6 index()

- 搜索匹配的元素，并返回相应元素的索引值，从0开始计数。

- 如果不给`index()`方法传递参数，那么返回值就是这个``jQuery``对象集合中第一个元素相对于其同辈元素的位置。`

- 如果参数是一组DOM元素或者jQuery对象，那么返回值就是传递的元素相对于原先集合的位置。

- 如果参数是一个选择器，那么返回值就是原先元素相对于选择器匹配元素中的位置。如果找不到匹配的元素，则返回-1。 

具体请参考示例。比如我们做一个以前的案例，点击某个盒子，弹出对应的序号

```javascript
$(".box p").click(function () {
    alert($(this).index());
});
```

再来一个，点击box1里面的p，让对应的box2里面的p变红：

```javascript
//事件监听要给box1中的所有p标签
$(".box1 p").click(function(){
    //有变化的是box2中对应的p
    $(".box2 p").eq($(this).index()).css("background-color","red");
});
```



## 1.3 选择器和迭代

`$`可以用`jQuery`来代替，$和jQuery是同一个函数，jQuery选择的元素，所有浏览器兼容！

### 1.3.1 $(“选择器”)

```javascript
$("#box ul li.haha span").css("background-color","red");
jQuery("#box ul li.haha span").css("background-color","red");
```

> 注意，选择出来的东西，是一个类数组对象，是jQuery自己的对象，这个jQuery对象后面不能跟着原生JS的语法

```javascript
$("#box").style.backgroundColor = "red";  //错误语法
```

所以，如果想把jQuery对象，转为原生JS对象，要加[0]就行了：

```javascript
$("#box")[0].style.backgroundColor = "red";
```

jQuery支持所有的css2.1选择器和部分css3选择器

> - $("p")
>
> - $(".box")   
>
> - $("#box")   
>
> - $("#box ul li")   
>
> - $("li.special")   
>
> - $("ol , ul")
>
> - $("*")  

### 1.3.2 :not(selector)

去除所有与给定选择器匹配的元素，以下表示排除被选中的input

```javascript
$("input:not(:checked)")
```



### 1.3.3 :animated

匹配所有正在执行动画效果的元素

```javascript
$("button").click(function () {
    $("p:not(:animated)").animate({left: 800},3000);
});
```

匹配所有没有动画的p动画，也可以搭配`is()`防止动画累积：

```javascript
$('p').is(":animated")
```



### 1.3.4 :focus

匹配当前获取焦点的元素。

### 1.3.5 :contains(text)

匹配包含给定文本的元素。使内容包含有1的p标签背景变绿

```javascript
$("p:contains('1')").css({background: "green"});
```



### 1.3.6 :empty

匹配所有不包含子元素或者文本的空元素

```html
<div class="box">
    <p>1</p>
    <p><a href=""></a></p>
    <p></p>
    <p>4</p>
</div>
```

只有第三个p颜色被改变……

```javascript
$("p:empty").css({background: "green"});
```

 

### 1.3.7 :has()

匹配含有选择器所匹配的元素的元素。匹配含有a标签的p标签

```javascript
$("p:has(a)").css({background: "green"});
```



### 1.3.8 :hidden

匹配所有不可见元素，或者type为hidden的元素

```html
<p style="display: none;">1</p>
<p>2</p>
```

```javascript
console.log($("p:hidden"));
```

结果

```html
<p style="display: none;">1</p>
```



### 1.3.9  表单

##### :input

匹配所有 input, textarea, select 和 button 元素

##### :text 

匹配所有的单行文本框

##### :password

匹配所有密码框

##### :radio

匹配所有单选按钮

##### :checkbox

匹配所有复选框

##### :submit

匹配所有提交按钮

##### :reset

匹配所有重置按钮

##### :button

匹配所有按钮

##### :checked

匹配所有选中的被选中元素(复选框、单选框等，select中的option)，对于select元素来说，获取选中推荐使用 :selected

##### :selected

匹配所有选中的option元素

```html
<select>
    <option value="1">Flowers</option>
    <option value="2" selected="selected">Gardens</option>
    <option value="3">Trees</option>
</select>
```



## 1.4筛选 

### $("p")

- 所有的p

###  $("p:first")

- 第一个p

### $("p:last")

- 最后一个p

###  $("p:eq(3)")

- 下标为3的p。特别的，eq可以单独提炼为方法，可以连续打点：

```javascript
$("p").eq(3).animate({"width":400},1000);
```

提炼出来的  好处是，可以用变量

```javascript
var a = 3;
$("p").eq(a).animate({"width":400},1000);
```



### $("p:lt(3)")

- 下标小于3的p

### $("p:gt(3)")

- 下标大于3的p

###  $("p:odd")

- 下标是奇数的p

###  $("p:even")

- 下标是偶数的p

###  hasClass()

- 检查当前的元素是否含有某个特定的类，如果有，则返回true。无返回false，这其实就是 `is("." + class)`。

```javascript
console.log($("p").hasClass(".box"));
```



### filter()

- 筛选出与指定表达式匹配的元素集合。这个方法用于缩小匹配的范围。用逗号分隔多个表达式

```javascript
$("p").filter(".cl:eq(0)").css({color:"red"})
```

以上表示选中第一个类名叫c1的p标签

### is()

- 根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。

```javascript
$(".box p").is(".c1");
```

以上表示box里面的p有没有类名是c1的 有则返回true

- 可以用来防止动画积累

```javascript
if ( $(".box p").is(":animated") ) return
```



### map()

- 原生js的map

```javascript
var arr = [1,2,3,4];
var arr1 = arr.map(function (items) {
    return items + 1; //给数组每一项加1
});
console.log(arr1); //[2,3,4,5]
```

- jQuery 里的 map()

将一组元素转换成其他数组（不论是否是元素数组），必须有一个回调函数参数，回调函数返回的值就会转换成数组。而原生js的map()只能操作数组对象而不能操作节点对象

你可以用这个函数来建立一个列表，不论是值、属性还是CSS样式，或者其他特别形式。这都可以用$.map()来方便的建立。

```html
<div class="box">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</div>
```

- 用map拿取到input表单里的value值：

```html
<form action="#">
     姓名：<input type="text"> <br><br>
     年龄：<input type="text"> <br><br>
     性别：<input type="text"> <br><br>
     身高：<input type="text"> <br><br>
     <button>提交</button>
 </form>
```

```javascript
$("button").click(function () {
    var arr = $("input").map(function () {
        return $(this).val();
    });
    console.log(arr);  
});
```

 

### has()

保留包含`特定后代的元素`，去掉那些不含有指定后代的元素。

- 给有ul的li加背景颜色

```html
<ul>
    <li></li>
    <li>
        <ul>
            <li></li>
            <li></li>
        </ul>
    </li>
    <li></li>
</ul>
```

```javascript
$("li").has("ul").css({background: "green"});
```



### not()

从匹配元素的集合中排除与指定表达式匹配的元素

```html
<div class="box">
    <p>1</p>
    <p class="c1">2</p>
    <p>3</p>
    <p>4</p>
</div>
```

- 给除了c1的p加上绿色背景颜色

```javascript
$(".box p").not(".c1").css({background: "green"});
```



### slice()

选取一个匹配的子集，strat开始选取子集的位置。第一个元素是0。如果是负数，则可以从集合的尾部开始选起。end 结束选取自己的位置，如果不指定，则就是本身的结尾。 包括start不包括end

```html
<div class="box">
    <p>0</p>
    <p>1</p>
    <p>2</p>
    <p>3</p>
</div>
```

- 给2,3加背景

```javascript
$(".box p").slice(2,4).css({background: "green"});
```



### children()

取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合。 参数表示筛选

```html
<div>
    <p>0</p>
</div>
<p>1</p>
<div>
    <span>2</span>
</div>
```

- 其中只有0变色

```javascript
$("div").children("p").css({background: "green"});
```



###  closest()

从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素。。

- 和parents主要区别：closest()从自己开始检测

	```html
	<div class="c1">
	    <div class="c1">
	        <div class="c1"></div>
	    </div>
	</div>
	```

	```javascript
	$("div").closest(".c1").css({background: "gold"});
	```

	以上代码，所有变色

	```javascript
	$("div").parents(".c1").css({background: "gold"});
	```

	以上代码，只有第一个和第二个变色

> 总的来说，就是parent不包含自己，而closet包含自己，从自己开始检测

### find()

搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法。 `必须传参数`

```html
<div class="box">
    <p></p>
    <a href="">1</a>
    <p></p>
    <p></p>
</div>
```

用一下表达式可以选中box的子代a标签 注意：`find是找子孙代` ，而不是单纯的亲儿子。

```javascript
$(".box").find("a").css({color: "green"});
```



### next()

取得一个包含匹配的元素集合中每一个元素`紧邻`的后面同辈元素的元素集合。

```html
<div class="box">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</div>
```

第2个变色

```javascript
$(".box p").eq(0).next().css({background: "green"});
```



### nextAll()

查找当前元素之后所有的同辈元素。可以用表达式过滤

```html
<div class="box">
    <p>1</p>
    <p>2</p>
    <a href=""></a>
    <p>3</p>
    <p>4</p>
</div>
```

如下代码，第一个p后的所有标签都会变色

```javascript
$(".box p").eq(0).nextAll().css({background: "green"});
```



### prev()

取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合。

以下表示第三个p的前一个兄弟元素变色

```javascript
$(".box p").eq(2).prev().css({background: "green"});
```



### prevAll()

查找当前元素之前所有的同辈元素

以下表示第三个p之前所有的同辈元素都变色

```javascript
$(".box p").eq(2).prevAll().css({background: "green"});
```



###  offsetParent()

返回第一个匹配元素用于定位的父节点。以下box已经定位

```html
<div class="box">
    <p>1</p>
    <p>2</p>
    <a href="">a</a>
    <p>3</p>
    <p>4</p>
</div>
```

以下返回box(前提是box是定位元素)

```javascript
console.log($(".box p").offsetParent());
```



### parent()

取得一个包含着所有匹配元素的`唯一父元素`的元素集合。

以下返回亲父亲box

```javascript
console.log($(".box p").parent());
```



### parents()

取得一个包含着所有匹配元素的祖先元素的元素集合（不包含根元素）。可以通过一个可选的表达式进行筛选。

以下返回box body

```javascript
console.log($(".box p").parents());
```



### siblings()

取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。就是其他的兄弟元素

```html
<div class="box">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</div>
```

第三个p的所有兄弟元素变绿 自己不变

```javascript
$(".box p").eq(2).siblings().css({background: "green"});
```



### add(expr|ele|html|obj[,con])

把与表达式匹配的元素添加到jQuery对象中。这个函数可以用于连接分别与两个表达式匹配的元素结果集。



## 1.5 css样式

### 1.5.1得到样式（得到计算后的样式）

读样式，可以读取计算后样式，写一个参数，是不是驼峰，无所谓，但是必须加引号：

```javascript
$(".box").css("background-color");
$(".box").css("backgroundColor");
```

通过`$()`函数选择出来的东西，都是jQuery对象，所有的jQuery对象，都可以继续打点调用css函数，css函数已经封装了计算后的样式。

```javascript
console.log($(".box1 p").css('background'));
```

但是，如果对象是一个集合，则只能拿到第一个box1里面的p的背景颜色，要想拿到所有的，就只有通过each遍历

```javascript
$(".box1 p").each(function (i) {
    console.log($(this).css('background'));
})
```

### 1.5.2 修改样式

所有的数值，不需要单位：

```javascript
$(".box1 p").css({
	"width":200,
	"height" : 200
});
```

特别的，还支持 `+=` 写法（原来基础上加20）：

```javascript
$(".box1 p").css({
	height : '+=100',
	width : '+=100'
});
```



### 1.5.3 offset

获取匹配元素在当前视口(浏览器窗口)的相对偏移。返回的对象包含两个整型属性：`top` 和 `left`，以像素计。此方法只对可见元素有效。

```javascript
console.log($(".box").offset().left); //返回 box 相对于浏览器窗口的left值
```

当传对应`json`参数的时候为设置

```javascript
$(".box").offset({left: 1000,top: 1000});
```



### 1.5.4 position()

获取匹配元素相对`定位父元素`的偏移。返回的对象包含两个整型属性：`top` 和 `left`。为精确计算结果，请在补白、边框和填充属性上使用像素单位。此方法只对可见元素有效。

- 返回相对于定位父元素的left

	```javascript
	console.log($(".box").position().left)
	```

- 如果box定位，则返回left和top值

	```javascript
	console.log($(".box").position())
	```


### 1.5.5  scrollTop()、scrollLeft()

- 检测滚动条滚动高度

	```javascript
	$(document).scroll(function () {
		console.log($(document).scrollTop());
	});
	```

- 设置滚动条的高度

	```javascript
	$(document).scrollTop(100)
	```

对应的还有scrollLeft()

### 1.5.6 height()、width()

- 获取元素的当前计算的高度和宽度(width)

	```javascript
	console.log($(".box").height());
	console.log($(".box").width());
	```

- 获取元素内部区域宽高（不包括border）`width+padding` 相当于原生js的`clientWidth`

	```javascript
	console.log($(".box").innerHeight());
	console.log($(".box").innerWidth());
	```

- 获取元素外部高度（包括补白和边框，补白就是padding）`width+padding+border`相当于原生js的`offsetWidth`

	```javascript
	console.log($(".box").outerWidth());
	console.log($(".box").outerWidth());
	```


## 1.6  属性

### 1.6.1 attr()、removeAttr()

获取或者修改 标签属性和自定义标签属性

- 获取标签和自定义属性值

	```javascript
	console.log($(".box").attr("class"));
	console.log($(".box").attr("dachui"));
	```

- 修改自定义或者标签属性值

	```javascript
	$(".box").attr({class: "box1"})
	```

- 删除自定义或者标签属性

	```javascript
	$(".box").removeAttr("dachui");
	$(".box").removeAttr("class");
	```


### 1.6.2 addClass()、removeClass()、toggleClass()

- 为每个匹配的元素添加指定的类名。

	```javascript
	$(".box").addClass("on");
	```

- 为每个匹配的元素删除指定的类名。

	```javascript
	$(".box").removeClass("on");
	```

- 如果存在（不存在）就删除（添加）一个类。

	```javascript
	$(".box").toggleClass("on");
	```


### 1.6.3  html()、text()

- 代替了原生js的`innerHTML`

	```javascript
	$(".box1 p").eq(2).html('小阳老师很帅！');
	```

- 获取匹配元素的文本内容，代替了原生js的innerText

	```javascript
	$(".box1 p").eq(2).text();
	```


### 1.6.4 val

获得匹配元素的当前值。在 jQuery 1.2 中,可以返回任意元素的值了。包括select。如果多选，将返回一个数组，其包含所选的值。

- 获取表单里面的值

	```javascript
	$("input").each(function (i) {
	    console.log($("input").eq(i).val()); 
	})
	```

- 设置表单里面的值

	```javascript
	$("input").eq(0).val("你好");
	$("input").eq(1).val("不好");
	```


## 1.7 文档处理

### 1.7.1 append()  appendTo() prepend()

- `append()`向每个匹配的元素内部追加内容。如果我们想要在文档中创建一个标签，可以直接用$去创建

	```javascript
	var oP = $("<p>哈哈</p>");
	```

	当我们想要添加到某个节点里面的时候，我们就需要用append去添加

	```javascript
	$(".box").append(oP);
	```

	当然我们也可以

	```javascript
	$(".box").append("<p>哈哈</p>");
	```

	前一种的好处就在于说我们可以给新添加的标签节点添加样式


- `appendTo()` 和append的区别就在于语法上面，appendTo被添加的对象在钱，添加的对象在后

	```javascript
	$("<p>哈哈</p>").appendTo(".box");
	```


- `prepend` 向每个匹配的元素内部前置内容。如果对象是一个类数组集合，那么会在里面每一个元素前置

	```javascript
	$(".box").prepend("<p>哈哈</p>");
	```

- `prependTo`和 `prepend`也是只有语法上的不同

	```javascript
	$("<p>哈哈</p>").prependTo(".box");
	```


### 1.7.2 after()

在`元素后插入`  注意的是不是内部插入，还要注意的是`只能是字符串`，不能是选择器

```javascript
$(".box").after("<p>哈哈</p>");
```

结果

```html
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
<p>哈哈</p>
```



### 1.7.3  before()

在匹配`元素之前插入`  要注意区分的是`prepend`是在元素内部前置 而before是在本身之前插入     还要注意的是只能是字符串，不能使选择器

```javascript
$(".box").before("<p></p>");
```

结果

```html
<p>哈哈</p>
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```



### 1.7.4 insertBefore() insertAfter()

- `insertBefore()` 把所有匹配的元素插入到另一个、指定的元素元素集合的后面。 和`before`的区别除了在于语法 还有`insertBefore可以插入一个集合`，也就是可以用选择器

	```javascript
	$("<p>哈哈</p>").insertBefore(".box");
	```

	也可以

	```javascript
	$("p").insertBefore(".box")
	```

- insertAfter() 在后面插入一个集合

### 1.7.5  wrap() wrapAll() wrapInner()

- `wrap`把所有匹配的元素用其他元素的结构化标记`单独包裹`起来

	```javascript
	$(".box p").wrap("<a href=''>哈哈</a>");
	```

	结果

	```html
	<div class="box">
	    <a href=""><p>1</p></a>
	    <a href=""><p>2</p></a>
	    <a href=""><p>3</p></a>
	    <a href=""><p>4</p></a>
	</div>
	```

- `wrapAll()`把所有匹配的元素用其他元素的结构化标记整体包裹起来

	```javascript
	$(".box p").wrapAll("<a href=''></a>")
	```

	结果

	```html
	<div class="box">
	    <a href="">
	    	<p>1</p>
	    	<p>2</p>
	    	<p>3</p>
	    	<p>4</p>
	    </a>
	</div>
	```

- `wrapInner()`将每一个匹配的元素的子内容(包括文本节点)用一个`HTML`结构包裹起来

	```javascript
	$(".box p").wrapInner("<a href=\"#\"></a>");
	```

	结果：

	```html
	<div class="box">
	    <p><a href="#">1</a></p>
	    <p><a href="#">2</a></p>
	    <p><a href="#">3</a></p>
	    <p><a href="#">4</a></p>
	</div>
	```


### 1.7.6 replaceWith()

将所有匹配的元素替换成指定的HTML或DOM元素。

```javascript
$(".box p").replaceWith("<a href=''></a>");
```

操作前

```html
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

操作后

```html
<div class="box">
    <a href=""></a>
    <a href=""></a>
    <a href=""></a>
    <a href=""></a>
</div>
```



### 1.7.7 replaceAll()

用匹配的元素替换掉所有 selector匹配到的元素。和replaceWith语法相反

```javascript
$("<p></p>").replaceAll(".box a");
```

操作前

```html
<div class="box">
    <a href=""></a>
    <a href=""></a>
    <a href=""></a>
    <a href=""></a>
</div>
```

操作后

```html
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```



### 1.7.8 empty()

删除匹配的元素集合中所有的子节点。 不传参数 删除所有

```javascript
$(".box").empty();
```

操作前

```html
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

操作后

```html
<div class="box"></div>
```



### 1.7.9 remove()

从DOM中删除所有匹配的元素。这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。但除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除。

```javascript
$(".box a").remove();
```

操作前

```html
<div class="box">
    <p></p>
    <p></p>
    <a href=""></a>
    <p></p>
    <p></p>
</div>
```

操作后

```html
<div class="box">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
```



### 1.7.10 detach()

从DOM中删除所有匹配的元素。这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。

```javascript
$(".box a").detach();
```



### 1.7.11 clone

克隆匹配的DOM元素并且选中这些克隆的副本。在想把DOM文档中元素的副本添加到其他位置时这个函数非常有用。

```javascript
$(".box").append($(".box p").eq(0).clone());
```

将box里面的第一个p克隆并添加到最后

操作前

```html
<div class="box">
    <p>1</p>
    <p></p>
    <p></p>
    <p></p>
</div>
```

操作后

```html
<div class="box">
    <p>1</p>
    <p></p>
    <p></p>
    <p></p>
	 <p>1</p>
</div>
```



## 1.8 事件

### 1.8.1 ready(fn)

- 当DOM载入就绪可以查询及操纵时绑定一个要执行的函数。这是事件模块中最重要的一个函数，因为它可以极大地提高web应用程序的响应速度。简单地说，这个方法纯粹是对向`window.load`事件注册事件的替代方法。通过使用这个方法，可以在DOM载入就绪能够读取并操纵时立即调用你所绑定的函数，而99.99%的JavaScript函数都需要在那一刻执行。

- 有一个参数－－对jQuery函数的引用－－会传递到这个ready事件处理函数中。可以给这个参数任意起一个名字，并因此可以不再担心命名冲突而放心地使用$别名。

- 请确保在 `<body>` 元素的`onload`事件中没有注册函数，否则不会触发`$(document).ready()`事件。

- 可以在同一个页面中无限次地使用`$(document).ready()`事件。其中注册的函数会按照（代码中的）先后顺序依次执行。

- 在DOM加载完成时运行的代码，可以这样写:

	```javascript
	$(document).ready(function(){
	  // 在这里写你的代码...
	});
	```


### 1.8.2 on(events,[selector],[data],fn)

在选择元素上绑定一个或多个事件的事件处理函数。

```javascript
$("p").on("click",function () {
   $(this).css({background: "green"});
});
```

也可以绑定多个

```javascript
$("p").on("click mouseenter",function () {
	$(this).css({background: "green"});
});
```

### 1.8.3 off()

在选择元素上移除一个或多个事件的事件处理函数。

```javascript
$("p").off("mouseenter");
```

也可以多个解绑

```javascript
$("p").off("mouseenter click");
```



### 1.8.4 one()

为每一个匹配元素的特定事件（像click）绑定一个`一次性`的事件处理函数。

```javascript
$("p").one("click",function () {

});
```



### 1.8.5 hover()

一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。这是一个自定义的方法，它为频繁使用的任务提供了一种“保持在其中”的状态。

和css中的hover是一样的效果，不过兼容性更好

### 1.8.6 blur() focus()

- 当元素失去焦点时触发 blur 事件。

- 当元素获得焦点时，触发 focus 事件。

### 1.8.7 change()

当元素的值发生改变时，会发生 `change` 事件。

- 如果是文本输入框 失去焦点算是元素值发生改变

```javascript
$("input").change(function () {
	console.log(111);
});
```

- 对于下拉列表而言是选择的内容发生改变时

```javascript
$("select").change(function () {
	console.log(111);
});
```

- 对于单选框而言是选择发生改变的时候

```javascript
$("input:radio").change(function () {
	console.log(111);
});
```

### 1.8.8 click() dblclick()

- `click()`点击事件

- `dblclick()` 双击事件

```javascript
$("p").dblclick(function () {
	$(this).css({background: "green"});
}); 
```



### 1.8.9 键盘事件

- `keydown`键盘按下事件

- `keypress` 事件，与 keydown 事件类似。当按钮被按下时，会发生该事件。它发生在当前获得焦点的元素上。 不过，与 keydown 事件不同，每插入一个字符，就会发生 keypress 事件

- `keyup` 键盘抬起事件

### 1.8.10 鼠标事件

- `mousedown`   当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。mousedown 与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。

- `mouseenter` 鼠标移入事件

- `mouseleave`鼠标移出事件

- `mousemove`当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。mousemove事件处理函数会被传递一个变量(事件对象)，其.clientX 和 .clientY 属性代表鼠标的坐标

- `mouseup`当在元素上放松鼠标按钮时，会发生 mouseup 事件。

与 click 事件不同，mouseup 事件仅需要放松按钮。当鼠标指针位于元素上方时，放松鼠标按钮就会触发该事件。

### 1.8.11 resize()

当调整浏览器窗口的大小时，发生 resize 事件。

### 1.8.12 scroll

当用户滚动指定的元素时，会发生 scroll 事件。scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。

```javascript
$(document).scroll(function () {
	console.log(111);
 });
```

###  1.8.13 select

当 textarea 或文本类型的 input 元素中的文本被选择时，会发生 select 事件。

###  1.8.14 submit

当提交表单时，会发生 submit 事件。该事件只适用于表单元素。

### 1.8.15 unload

在当用户离开页面时，会发生 unload 事件。具体来说，当发生以下情况时，会发出 unload 事件：

- 点击某个离开页面的链接

- 在地址栏中键入了新的 URL

- 使用前进或后退按钮

- 关闭浏览器

- 重新加载页面

## 1.9  效果

### 1.9.1 animate()

jQuery内部含有一个运动框架

```javascript
$(".box").animate({"left":900},4000,function(){
	alert("运动完成");
});
```

有没有缓冲呢，有，jQuery需要插件来完成。

> linear，swing，jswing，easeInQuad，easeOutQuad，easeInOutQuad，easeInCubic， easeOutCubic，easeInOutCubic，easeInQuart，easeOutQuart，easeInOutQuart， easeInQuint，easeOutQuint，easeInOutQuint，easeInSine，easeOutSine， easeInOutSine，easeInExpo，easeOutExpo，easeInOutExpo，easeInCirc， easeOutCirc，easeInOutCirc，easeInElastic，easeOutElastic，easeInOutElastic， easeInBack，easeOutBack，easeInOutBack，easeInBounce，easeOutBounce，easeInOutBounce.



```javascript
$("p").animate(
	{left : 600},
	{
    	easing: 'easeInBounce',
    	duration: 1000,
   	complete: function () {
        	$(this).css({background: 'deeppink'})
    	}
    }
});
```

jQuery默认不是匀速，是`easeInOut`，和我们封装的框架不一样，jQuery默认有一个处理机制，叫做`动画排队`。当一个元素接收到了两个animate命令之后，后面的animate会排队：

```javascript
$("p").animate({"left":1000},2000);
$("p").animate({"top":400},2000);
```

先2000毫秒横着跑，然后2000毫秒竖着跑。动画总时长4000。

如果想让元素斜着跑，就是同时变化left和top，就写在同一个JSON里面：

```javascript
$("p").animate({"left":1000,"top":400},2000);
```

不同的元素，不排队，是同时的。

### 1.9.2 内置show()、hide()、toggle()方法

- show()显示、hide()隐藏、toggle()切换

	```javascript
	$("div").show();                 //让一个本身是display:none;元素显示
	$("div").hide();                  //隐藏元素display:none;
	$("div").toggle();               //切换显示状态。自行带有判断，如果可见，就隐藏；否则显示。
	```

- 特别的，如果show()、hide()、toggle()里面有数值，将变为动画：

	```javascript
	$("div").show(1000);
	```

	此时display:none;的元素，将从左上角徐徐展开。

- 动画机理：这个display:none;的元素会变为显示的，然后瞬间将宽度、高度、opacity设为0，然后徐徐展开。甚至可以加回调函数

	```javas      
	$("button").click(function () {
	    $("p").toggle(1000,function () {
	       console.log('执行完毕');
	    })
	}) 
	```

### 1.9.3 slideDown()、slideUp()、slideToggle()方法

- slideDown :  下滑展开

- slideUp：  上滑收回

- slideToggle :  滑动切换  

 ```javascript
$("div").slideDown();
 ```

`slideDown()`的起点一定是`display:none`换句话说，只有display:none的元素，才能够调用slideDown()

- 动画机理：一个`display:none`的元素，瞬间显示，瞬间高度变为0，然后jQuery自己捕捉原有的height设置为动画的终点。

	等价于四条语句：

	```javascript
	$("div").show();     //瞬间显示
	var oldHeight = $("div").css("height");   //记忆住原有的高度
	$("div").css("height",0);    //瞬间变为0
	$("div").animate({"height" : oldHeight},1000);    //动画！终点是oldHeight
	```

- 相反的，`slideUp()`的终点就是`display:none`;同样的，slideDown、slideUp、slideToggle里面可以写动画时间、回调函数。

	```javascript
	$("button").eq(1).click(function () {
	   $("p").slideToggle(1000,function () {
	        console.log('上拉下拉完毕');
	    })
	})
	```


### 1.9.4 fadeIn()、fadeOut()、fadeTo()、fadeToggle()方法

- `fadeIn()`淡入

- `fadeOut()`淡出

- `fadeTo() `淡到那个数

- `fadeToggle()` 淡出入切换

fadeIn()的起点是display:none;换句话说，只有display:none的元素，才能执行fadeIn()

`动画机理`：一个display:none的元素，瞬间可见，然后瞬间变为opacity:0，往自己的opacity上变。如果没有设置opacity，就往1变。

```javascript
$("button").eq(2).click(function () {
    $("p").fadeToggle(1000,function () {
        console.log('fadeToggle完毕');
    })
})    
```

})

fadeTo有三个参数:

- 参数1：是动画的时间

- 参数2：是要变到的透明度
- 参数3：是回调函数。

fadeTo的起点不一定是display:none;

```javascript
$("button").eq(3).click(function () {
    $("p").fadeTo(1000,0.5,function () {
        console.log('fadeTo完毕');
    })
})
```

IE6、7、8兼容，不用关心filter这个东西了，jQuery已经帮你写了兼容。

### 1.5.5 stop()

> 公式：stop(是否清除队列，是否瞬间完成当前动画)

如果没有写true或者false，默认是false

```javascript
$(".box1 p").each(function (i) {
    $(this).mouseenter(function () {
        $(this).stop(true).animate({height: 300},500);
    });
    $(this).mouseleave(function () {
        $(this).stop(true).animate({height: 100},500);
    });
})
```

- 停止当前的animate动画，不清除队列，立即执行后面的animate动画：

	```javascript
	$("div").stop();     //等价于$(“div”).stop(false,false);
	```


- 停止当前的animate动画，清除队列，盒子留在了此时的位置（常用来防止动画积累）：

	```javascript
	$("div").stop(true);   //等价于$(“div”).stop(true,false);
	```


- 清除队列，瞬间完成当前的animate动画：

	```javascript
	$("div").stop(true,true);
	```


- 不清除队列，立即执行后面的动画，瞬间完成当前的animate动画：

	```javascript
	$("div").stop(false,true);
	```

 

## 2.0 Ajax



```javascript
$.ajax({
	type : 'get',
	url : 'data.txt',
	data : {
		"user" : "小阳",
		"pwd" : "123"
	},
	context : document,
	dataType : 'json',
	success :function (msg) {
		console.log( msg );
	}
});
```

- context      改变success里的回调函数

- dataType    将拿到的数据转换为json格式   注意：json格式的txt文件必须要特别严格，最后一个json后面不能多一个逗号，并且属性必须双引号

- succes    请求成功以后执行的操作，第一个参数为拿取到的数据

也可以单独的调用get和post函数

```javascript
$.get('data.txt', 'user=小阳&pwd=123', function (msg) {
	console.log(msg);
},'json');
```

- 第一个参数是url

- 第二个参数是传输的数据

- 第三个是回调函数，函数里面的第一个参数依旧是返回的数据

- 第四个参数是将json格式字符串转换为json格式

 

