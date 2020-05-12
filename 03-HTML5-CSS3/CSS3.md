# CSS3选择器

文档手册语法：

- []	表示可选项
- ||    表示或者
- |      表示多选一
- ？    表示0个或者1个
- \*      表示0个或多个
- {}     表示范围

> - padding: [<length> || <percentage>]
> - border: <line-width> | <line-style> | <color>
> - box-shadow: none || <shadow>[,shadow]*



## 1.1 选择器

### 1.1.1 属性选择器

#### E[attr]

查找指定的拥有attr属性的E标签。如查找拥有id属性的p标签

```css
p[id] {
   color: red;
}
```

```html
<p></p>
<p id=""></p>
```

#### E[attr=value]

查找指定的拥有attr属性且值为value的E标签。如查找拥有id属性且值为box的p标签

```css
p[id=box] {
   color: red;
}
```

```html
<p></p>
<p id="box"></p>
```

#### E[attr^=value]

查找指定的拥有attr属性且值以value开头的E标签。

```css
p[class^="test"]{ background: blue;}		//选中第一个p
```

```html
<p class="testt">1</p>
<p class="ttest">2</p>
<p class="ttestt">3</p>
```

#### E[attr$=value]

查找指定的拥有attr属性且值以value结束的E标签。

```css
p[class$="test"]{ background: deeppink;}	//选中第二个p
```

```html
<p class="testt">1</p>
<p class="ttest">2</p>
<p class="ttestt">3</p>
```

#### E[attr*=value]

查找指定的拥有attr属性且值包含value的E标签。

```css
p[class*="test"]{ background: yellow;}	//选中第二个和三个p
```

```html
<p class="testt">1</p>
<p class="ttest test">2</p>
<p class="ttestt">3</p>
```

### 1.1.2 伪类新增

#### A+B

选中A元素紧邻的B元素。例如，以下代码选中first紧邻的li元素

```css
.first+li{
	color: red;
}
```

```html
<ul>
   <li class="first"></li>
   <li></li>
   <li></li>
</ul>
```

#### A~B

获取A相邻的所有相邻元素B。例如，以下代码选中除了first外的所有li元素。

```css
.first~li{
	color: red;
}
```

```html
<ul>
   <li class="first"></li>
   <li></li>
   <li></li>
</ul>
```



#### p:first-of-type

选择p，p必须为他们各自父级元素所有为p的子元素的第一个p，如下，选中p1。

```css
p:nth-of-type(1){
  color: red;
}
```

```html
<div class="box">
  <div></div>
  <p>我是p1</p>
  <p>我是p2</p>
  <p>我是p3</p>
</div>
```
#### p:last-of-type

选择p，p必须为他们各自父级元素所有为p的子元素的最后一个p，如下，选中p3。

```css
p:last-of-type(1){
  color: red;
}
```

```html
<div class="box">
  <div></div>
  <p>我是p1</p>
  <p>我是p2</p>
  <p>我是p3</p>
  <div></div>
</div>
```

#### p:nth-of-type(n)

选择p，p必须为他们各自父级元素所有为p的子元素的序列，如下，选中p2。

```css
p:nth-of-type(2){
  color: red;
}
```

```html
<div class="box">
  <div></div>
  <p>我是p1</p>
  <p>我是p2</p>
  <p>我是p3</p>
  <div></div>
</div>
```

#### p:nth-last-of-type(n)

选择p，p必须为他们各自父级元素所有为p的子元素的倒数序列，如下，选中p3。

```css
p:nth-last-of-type(1){
  color: red;
}
```

```html
<div class="box">
  <div></div>
  <p>我是p1</p>
  <p>我是p2</p>
  <p>我是p3</p>
  <div></div>
</div>
```

#### p:only-child

选择p，p必须为他们各自父级元素唯一一个子元素。

```css
p:only-child{
  color: red;
}
```

```html
<div class="box">
  <p>我是唯一一个p</p>
</div>
```

#### p:last-child

选择p，p必须为他们各自父级元素的最后一个子元素。

```css
p:last-child{
  color: red;
}
```

```html
<div class="box">
   <div></div>
   <p></p>
</div>
```

#### p:nth-child(n)

选择p，p必须为他们各自父级元素的第n个子元素。例如，以下选中p1。

```css
p:nth-child(2){
  color: red;
}
```

```html
<div class="box">
   <div></div>
   <p>p1</p>
</div>
```

#### p:nth-last-child(n)

选择p，p必须为他们各自父级元素的倒数第n个子元素。例如，以下选中p1。

```css
p:nth-last-child(2){
  color: red;
}
```

```html
<div class="box">
   <div></div>
   <p>p1</p>
   <p>p2</p>
</div>
```

#### p:not(element)

选择p，p不能为element，element为类和id选择器。例如，以下选中p1。

```css
p:not(.c1){
  color: red;
}
```

```html
<div class="box">
   <p class="c1">1</p>
   <p>2</p>
   <p class="b1">3</p>
</div>

```

#### p:empty

选择没有内容的p。例如，以下选中第二个p

```css
p:empty{ background: blue; }
```

```html
<div class="box">
   <p>1</p>
   <p></p>
   <p>3</p>
</div>
```

#### p:target

选择当前被锚点激活的p。以下代码，当p锚点被激活时背景变为绿色。

```css
.box p:target{ background: green; }
```

```html
<div class="box">
   <a href="#tu">点我试试1</a>
   <p id="tu">1</p>
   <a href="#tuu">点我试试2</a>
   <p id="tuu">2</p>
</div>
```

#### p::selection

被用户选中p的文本时。以下，当用户选中文本是背景变为粉红色。

```css
p::selection{ background: deeppink; }
```

#### p::first-letter

选中p标签中文本的第一个字，可以用来设置首字下层

```css
p::first-letter{
  color: red;
  font-size: 30px;
  float: left; /* 文本环绕 */
}
```

#### p::first-line

选中p标签中文本的第一行字。设置了`first-letter`的首字不会被选中。

```css
p::first-line{
   text-decoration: underline;
}
```



#### input:disabled

选择不能被操作的input框

#### input:enabled

选择能被操作的input框

#### input:checked

选择被选中的input

## 1.2 背景属性







### 1.2.1 hsl 调色板

- H：Hue(色调)。取值为：0 – 360；(120绿，240蓝，360或0红)

- S：Saturation(饱和度)。取值为：0.0% - 100.0%；

- L：Lightness(亮度)。取值为：0.0% - 100.0%。默认50%

> hsl( 颜色(0~360), 饱和度(0~100%), 亮度(0~100%) )

```css
p{
   width: 100px;
   height: 100px;
   background: hsl(240,50%,50%)
}
```

- a透明度

> hsl( 颜色(0~360), 饱和度(0~100%), 亮度(0~100%), 透明度(0~1) )

```css
p{
   width: 100px;
   height: 100px;
   background: hsla(240,50%,50%, 0.5)
}
```

### 1.2.2 线性渐变 linear-gradient()

渐变方向：left、right、top、bottom可单独，也可两两组合，注意，没有center。默认为从上到下。

```css
p{ 
   background: -webkit-linear-gradient(left,deeppink,yellow,#153170);
}
```

使用百分比的时候表示：从10%以前都是粉红色的没有渐变，而10%-60%就会和黄色搭配产生渐变，60%以后就是黄色域蓝色搭配产生渐变。

```css
p{ 
   background: -webkit-linear-gradient(left,deeppink 10%,yellow 60%,#153170);
}
```

> 注意：产生的是图片，所以只能使用background

### 1.2.3 径向渐变 radial-gradient()

- at position(渐变方向)：right、left、top、bottom两两组合，可center，但必须单独使用。
- 可以使用px值
- 可以使用角度

```css
p{ 
	background: -webkit-radial-gradient(center,deeppink,yellow,#153170);
   background: -webkit-radial-gradient(50px 50px,deeppink,yellow,#153170);
   background: -webkit-radial-gradient(45deg,deeppink,yellow,#153170);
}

```
- shape(形状)：circle，产生正方形渐变色。ellipse，适配当前形状，如果是正方形容器，两者效果一样。

```css
p{ 
	background: -webkit-radial-gradient(circle,deeppink,yellow,#153170);
}
```

- 大小size: 
	- closest-side: 最近边
	- farthest-side: 最远的边
	- closest-corner: 最近角
	- farthest-corner: 最远角
	- 默认，最远角。

```css
p{ 
	background: -webkit-radial-gradient(circle closest-side,deeppink,yellow,#153170);
}
```



> 注意：产生的是图片，所以只能使用background

### 1.2.4 重复渐变

我们在想要做一个两种颜色重复的环形盒子的时候，我们或许可以这样达到效果：

```css
p{
   width: 100px;
   height: 100px;
   background: -webkit-radial-gradient(
     #fff 0%, #000 10%,
     #fff 10%, #000 20%,
     #fff 20%, #000 30%
	)
}
```

但是，我们可以发现，我们是在做重复的事情，那么，如果我们使用重复渐变的话只需要写一步，后面的让其重复执行就可以了。

```css
p{
   width: 100px;
   height: 100px;
   background: repeating-radial-gradient(#fff 0%, #000 10%);
}
```

当然，线性渐变也有重复渐变：

```
background: repeating-linear-gradient(#fff 0%, #000 10%);
```

### 1.2.5 background-repeat

`background-repeat: round`：将图片进行缩放之后进行平铺

`background-repeat: space`：将图片不会缩放，但是图片之间平铺的间距值是相等的

### 1.2.6 background-origin

- `background-origin`: content-box	从内容区域开始显示背景

- `background-origin`: padding-box	从padding区域开始显示背景

- `background-origin`: border-box	从border区域开始显示背景

### 1.2.7 background-clip

- `background-clip`: content-box	从内容区域开始裁剪背景

- `background-clip`: padding-box	从padding区域开始裁剪背景

- `background-clip`: border-box	从边框区域开始裁剪背景

## 1.3 边框图片

### 1.3.1 border-image-source

- 可以指定边框图片的路径，默认只是将完整的图片完整的填充到容器的四个角。

	```css
	border-image-source: url('images/1.png')
	```

### 1.3.2 border-image-slice

-  设置四个方向上的裁切距离。`fill`: 做内容的内部填充

	```css
	border-image-slice: 27 fill;
	```

	以上代码，设置每个裁切距离为27，且内容部分填充。

### 1.3.3 border-image-width

- 边框图片的宽度。如果没有设置这个属性，那么宽度默认就是元素的原始的边框宽度。边框图片的本质是背景，并不会影响元素内容的放置，内容只会被元素的border和padding影响。建议：一遍将值设置为原始的边框宽度。

```css
border-image-width: 27px;
```

### 1.3.4 border-image-repeat

- 边框背景的平铺方式

  - round: 将图片缩放自适应平铺
  - repeat: 直接平铺
  - 默认为stretch拉伸

  ```css
  border-image-repeat: repeat;
  border-image-repeat: round;
  ```


### 1.3.5 复合样式

- border-image: source slice/width repeat

```css
border-image: url('image/1.png') 27 fill/27px round;
```

### 1.3.6 案例

使用border-image常用的实例就是可以让qq和微信的聊天气泡不会随着内容的多少而变形

```
.box{
  width: 300px;
  border: 20px solid deeppink;
  color: green;
  margin: 100px auto;
  border-image: url("images/qipao.png") 114 fill/20px;
}
```

```html
<div class="box">
      永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。
     是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。
</div>
```






















## 1.4 文本属性

### 1.4.1 文本显示

#### 文本从左向右显示

两属性需要配合使用

```css
p{ 
   direction: rtl; 
   unicode-bidi:bidi-override;  
}
```

#### 多行文本超出显示

```
p{
	display: -webkit-box; /*继承block的属性*/
   -webkit-box-orient:vertical;   /*元素垂直显示*/
   -webkit-line-clamp:2;  /*设置文本显示的行数*/
   overflow: hidden; /*（不能使用padding）*/
}
```

### 1.4.2 text-shadow

值可多个

> text-shadow: [x轴偏移量	 y轴偏移	        模糊半径		颜色], [x轴偏移量	 y轴偏移	        模糊半径		颜色]...

几种字体阴影效果：

```css
ul li{
  width: 800px;
  height: 150px;
  background: #5d5d5d;
  font: bold 80px/150px '微软雅黑';
  color: #fff;
  text-align: center;
  margin: 20px auto;
}
```

```css
ul li:nth-child(1){ 
   text-shadow: -3px -3px 10px red;
}
```

```css
ul li:nth-child(2){ 
   text-shadow: 0 0 50px #fff;
}
```

```css
ul li:nth-child(3){ 
   text-shadow: 0 1px 0 #fff; 
   color: #000; 
}
```

```css
ul li:nth-child(4){ 
   text-shadow: -1px -1px 0 #eee,-2px -2px 0 #ddd,-3px -3px 0 #ccc,-4px -4px 0 #bbb; 
}
```

```css
ul li:nth-child(5){ 
   text-shadow: 0 0 8px deeppink; color: transparent; 
}
```

### 1.4.3 resize

resize盒子拖动，同时也可设置文本域防止拖动。

- `resize: none;` 	不可以拖动

- `resize: both;` 水平和垂直都可以拖动

- `resize: vertical;` 垂直可以拖动

- `resize: horizontal;` 水平可以拖动

> 注意：不可拖动比原来的宽高小，必须配合`overflow: auto;`使用

### 1.4.4 user-select

user-select 定义文本是否可被选中

- `text`    默认值，可被选中
- `none`    不可被选中 
- `all`        成标签域复制  给那个标签，点击这个标签就可以选中标签内所有的内容

### 1.4.5 column 列

- `column`：每列的最小宽度 列数
- `column-gap`： 列之间的间隔
- `column-rule`:  粗细   样式  颜色（列之间的边框）

```css
p{  
   columns: 100px 4;  
   column-gap: 50px;  
   column-rule: 5px solid deeppink;  
}
```

## 1.5 动画相关

### 1.5.1 transition过渡

- 通过过渡transition，我们可以在不使用Flash动画或JavaScript的情况下，当元素从一种样式变换为另一种样式是为元素添加效果，要实现这一点，必须规定两项内容：
	- 规定希望把效果添加到哪一个css属性上
	- 规定效果的长，过渡效果完成后默认会以相同的过渡效果还原

| 属性                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| transition-property        | 要过渡的属性名称（如width、height，all 所有属性）            |
| transition-duration        | 过渡效果持续时间                                             |
| transition-delay           | 延迟过渡时间（可选）                                         |
| transition-timing-function | 过渡效果运行曲线( `linear`匀速，`ease`：慢快慢，`ease-in`：匀加速，`ease-out`：匀减速) |

- 复合属性

	```css
	transition： color  2s   3s   linear;
	```

	如果想要加多个

	```css
	transition： color  2s   3s   linear,width  2s   3s   ease;
	```

- 为所有属性添加过渡效果
	- all 表示为所有属性添加过渡效果
	- 效率低下，他会去查询所有添加的样式，建议以后不要这样写
	- transition-timing-function: steps(n) : 可以让过渡效果分为指定的n次来完成，注意：不能和linear共用

```css
transition: all 2s steps(4)
```

以上代码，分四次过渡完成。

- 兼容

```css
transition: all 2s steps(4);
-webkit-transition: all 2s steps(4);
-moz-transition: all 2s steps(4);
-o-transition: all 2s steps(4);
```

### 1.5.2 transform

#### transform: translate()

`位移`

使用transform和translate实现元素的移动

- 移动是参照元素的左上角
- 执行完毕之后会恢复到原始状态

- 如果只有一个参数就代表x方向
- 如果有两个参数就代表 x/y 方向
- 也可以设置单独的方向

```css
transform: translate(100px);	/* x轴方向 */
transform: translate(100px, 200px);	/* x轴，y轴方向 */
transform: translateX(100px);	/* x轴方向 */
transform: translateY(100px);	/* Y轴方向 */
transform: translateZ(100px);	/* Z轴方向,需要3D环境 */
```
3d属性：

```css
transform: translate3d(x,y,z)
```



#### transform: scale()

`缩放`

- 大于1表示放大，小于1表示缩小 参照元素几何中心
- 一个值               既代表X轴，也代表Y轴
- 两个值               第一个代表X轴，第二个代表Y轴，逗号隔开
- 也可单独设置方向

```css
transform: scale(1.2);	/* 放大 */
transform: scale(0.8);	/* 缩小 */
transform: scale(0.8,1.2);	/* x轴缩小0.8倍，y轴放大1.2倍 */
transform: scaleX(1.2);	/* x轴方向放大1.2倍 */
transform: scaleY(1.2);	/* y轴方向放大1.2倍 */
transform: scaleZ(1.2);	/* Z轴方向放大1.2倍，需要3D环境 */
```
3d属性：

```css
transform: scale3d(x,y,z)
```



#### transform: rotate()

`旋转`

- 单位：
	- deg             角度（180°）
	- turn            圈

```css
transform： rotate(180deg);		/*（默认值，绕Z轴转）*/
transform： rotateX(180deg);	/*（绕X轴顺时针转）*/
transform： rotateY(180deg);	/*（绕Y轴逆时针转）*/
transform： rotateZ(180deg);	/*（绕Z轴顺时针转）*/
```
> 注意：旋转会使坐标系转动，如果给transform添加多个属性值的时候需要注意一下顺序

3d属性：

- x：代表x轴方向上的向量值
- y：代表y轴方向上的向量值
- z：代表z轴方向上的向量值

```css
transform: rotate3d(1,1,1,300deg)
```



#### tranform: skew()

`斜切`

- 如果角度为正，往当前轴的负方向斜切
- 如果角度为正，往当前轴的正方向斜切
- 两个值的时候，第一个值是x轴方向的斜切，第二个值是y轴方向的斜切

```css
transform: skew(45deg);
transform: skew(45deg,45deg);
```

#### transform-origin

变换的基点（即参考点），默认的基点：绝对中心点，该属性提供两个参数值:

- 如果设置两个，第一个为X轴，第二个为Y轴（两值以空格隔开）

- 如果设置一个，该值为X轴，第二个默认Y轴50%（给定值时）

百分比取值：

- 百分比指定坐标值，可以为负值

	```css
	transform-origin：50% 50%;
	```

px取值：

- 长度指定坐标值，可以为负值。

	```css
	transform-origin：50px 50px;
	```



#### transform复合

同时添加多个transform属性使用空格隔开

```css
transform：translate(100px) rotate(45deg)
```

### 1.5.3 井深

- `perspective`为一个元素设置三维透视的距离。仅作用于元素的后代，而不是其元素本身。当`perspective: none/0`时，相当于没有设置。比如你要建立一个小立方体，长宽高都是200px。如果你的perspective<100px，那就相当于在盒子里面看立方体，如果perspective值非常大就是站在非常远的地方看（立方体已经成为了小正方体了），意味着perspective属性制定了观察者与z=0平面的距离，使具有三维位置变换的元素产生。
- `perspective-origin` 属性规定了镜头在平面的位置。默认是放在元素的中心
- `transform-style` 使被转换的子元素保留其3D转换（需要设置在其父元素中）
	- `flat`，默认值。子元素将不保留其3D位置-平面方式
	- `preserve-3d`，子元素保留其3D位置-立体方式

### 1.5.4 animation动画

#### 创建动画

- animationName：自定义动画名称
- keyframes-selector：动画时长百分(关键帧)

```css
@-webkit-keyframes  animationName{  
     keyframes-selector{css-style}
}
```

```
@-webkit-keyframes move{
    0%{ left: 0; top: 0;} /*动画开始执行时的状态*/
    25%{ left: 300px; top: 0;} /*0-25%这个阶段动画状态*/
    50%{ left: 300px; top: 300px;}
    75%{ left: 0; top: 300px;}
    100%{ left: 0; top: 0;}
}
```

同时也可以使用`form...to`，只有开始和结束状态。

- from表示0%
- to 表示100%

```
@-webkit-keyframes play{
    from{left: 0; top:0;} 
    to{left: 500px; top:0;} 
}
```

#### 动画相关属性

```css
animation-name: move;  /*动画名称*/
animation-duration: 4s;	/*动画执行时间*/
animation-timing-function: linear;		/*动画运行曲线*/
animation-iteration-count: infinite;	/*播放次数 infinite无限循环*/
animation-direction: alternate;	/*是否应该轮流反向播放动画 alternate反向轮流*/
animation-play-state: running;	/*停止状态转换为运动状态*/
animation-play-state: paused;/*运动状态转换为停止状态*/
animation-fill-mode: forwords;	/* forwords保留动画结束时状态 */
animation-fill-mode: backwards;	/* backwards 不会保留结束时状态，回到初始状态。默认值为回到初始状态 */
animation-fill-mode: both;	/* 保留动画的结束时状态，在有延迟的情况下也会立刻进入到动画的初始状态 */
```

#### 复合属性

> animation动画属性：函数名 运动时间 运动曲线 播放次数 是否反向播放动画; 

```css
animation: move 4s linear infinite alternate; 
```

## 1.6 弹性盒子模型

### 1.6.1 弹性盒子模型概念

- 布局的传统解决方案，基于盒状模型，依赖 display属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。2009年，W3C提出了一种新的方案—-`Flex布局`，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。采用`Flex`布局的元素，称为`Flex容器`（flex container），简称”`容器`”。它的所有子元素自动成为容器成员，称为`Flex项目`（flex item），简称”`项目`”。

- 容-器默认存在两根轴：`水平的主轴`（main axis）和`垂直的交叉轴`（cross axis）。

- 主轴的开始位置（与边框的交叉点）叫做`main start`。结束位置叫做`main end`。交叉轴的开始位置叫做`cross start`。结束位置叫做`cross end`。

- 项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`。



### 1.6.2 容器属性(给父元素)

#### display: flex

- 声明弹性盒子模型，父级容器只要添加了这个属性，默认会使所有Flex项目在一行显示。

#### flex-direction

- 决定主轴的方向

- 取值：

> - row：从左到右排列（abc）。
>
> - row-reverse:   从左到右排列，但元素顺序与row相反（cba）
>
> - column:     主轴为垂直方向，起点在上沿。
>
> - column-reverse:   主轴为垂直方向，起点在下沿。



#### flex-wrap

- 该属性控制flex容器是单行或者多行
- 值：

> - nowrap： 不换行。该情况下flex子项可能会溢出容器（默认值）
>
> - wrap：flex容器为多行。该情况下flex子项溢出的部分会被放置到新行，换行。
>
> - wrap-reverse:   反转 wrap 排列。（注意：不是倒序）



#### flex-flow

- `flex-direction`和`flex-wrap`的复合简写形式，默认为`row nowrap`

```css
flex-flow: flex-direction flex-wrap
```

#### justify-content

- 定义了项目在主轴（通常是x轴）上的对其方式

##### 1. justify-content：flex-start;（左对齐）

##### 2. justify-content: flex-end；（右对齐）

##### 3. justify-content: center；（居中对齐


##### 4. justify-content: space-between；（两端对齐，项目之间间隔相等）

##### 5. justify-content: space-around；（每个项目两侧间隔相等)

##### 6. 最后一行不between

- 可以在所有项的后面添加隐藏的li元素，一行本来多少项就添加多少项隐藏元素

```html
<ul class="work">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
</ul>
```

```css
.work{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
}
```

- js动态添加

```html
<ul class="work">
    <li class="default" @click="add">点击创建项目</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
    <li style="height: 0px;visibility: hidden;">div.box</li>
</ul>
```

```js
let a = prompt("请输入项目名称：")
let li = $("<li>"+a+"</li>")
if(a) $(".default").after(li)
```

#### align-content

- 定义了多根主轴对齐方式(通常y轴)，如果项目只有一根轴线，则不起作用

##### 1、align-content: stretch（默认值，轴线占满整个交叉轴）

##### 2、align-content:  flex-star（与交叉轴上沿对齐）

##### 3、align-content: flex-end（与交叉轴下沿对齐）

##### 4、align-content: center（与交叉轴中部对齐）

##### 5、align-content: space-between（与交叉轴两端对齐，中间主轴宽度平均分配）

##### 6、align-content: space-around（交叉轴两侧间隔相等）



#### align-items

- 弹性盒子元素在单个交叉轴对齐方式（个体元素对其方式，可以设置上下居中对其）

##### 1、align-items：stretch;（默认值）                         

##### 2、align-items：flex-end;（交叉轴的终点对齐）

##### 3、align-items：flex-center;（交叉轴的中点对齐）

##### 4、align-items：baseline;（项目的第一行文字的基线对齐）

##### 5、align-items：flex-start;（交叉轴的起点对齐）



### 1.6.3 项目属性

#### flex-grow

- 定义项目放大比例，默认为0（即如果存在剩余空间，也不放大。 ）

```css
.flex {
  display: flex;
  width: 400px;
  line-height: 100px;
  box-shadow: 0 0 10px 0 #000;
}
```

##### 1、没有宽度，直接按照比例分配

- 最终结果： 100 100 200

```css
.box1 .flex li:nth-child(1){flex-grow:1;}
.box1 .flex li:nth-child(2){flex-grow:1;}
.box1 .flex li:nth-child(3){flex-grow:2;}
```



##### 2、有宽度，给的值不一样的时候

- 实际宽度： 100+100\*1/5=120    100+100\*1/5=120  100+100\*3/5=160

```css
.box2 .flex li:nth-child(1){ width: 100px; flex-grow: 1; }
.box2 .flex li:nth-child(2){ width: 100px; flex-grow:1;}
.box2 .flex li:nth-child(3){ width: 100px; flex-grow:3;}
```

#### flex-shrink

- flex-shrink:定义项目缩小比例，默认为1，即如果空间不足，该项目将缩小

```shell
容器宽度 = 400

项目宽度 = 500  超出 = 500-400 = 100

加权综合：盒子宽度*shrink值 = 100*1+200*1+200*3 = 900

收缩值：（盒子宽度*shrink/加权）= (100*1/900)*100 = 100/9

                                (200*1/900)*100 = 200/9

                                (200*3/900)*100 = 200/3

最终值：盒子宽度 - 收缩值 = 100-100/9 = 88

                        200-200/9 = 177
 
                        200-200/3 = 133
```

```css
.box3 .flex li:nth-child(1){ flex-shrink:1; width: 100px;}
.box3 .flex li:nth-child(2){ flex-shrink:1; width: 200px;}
.box3 .flex li:nth-child(3){ flex-shrink:3; width: 200px;}
```

#### flex-basis

- `flex-basis`实际上和width一样，只不过浏览器分配空间要根据这个值来算，没有这个值得时候默认为auto（以width或者内容撑开的宽度计算）

```css
.box4 .flex li:nth-child(1){ flex-basis: 150px;}
.box4 .flex li:nth-child(2){ flex-basis: 100px;}
.box4 .flex li:nth-child(3){ flex-basis: 50px;}
```



#### flex

> - flex： flex-grow，flex-shrink，flex-basis的复合属性
> - flex：0 1 auto；（默认,auto就相当于没有给basis就以自身宽度或者内容宽度计算）
> - 当父级宽度改变时，会自动的根据给定的比例进行伸缩计算

```css
.box5 .flex li:nth-child(1){ flex: 1 1 100px;}
.box5 .flex li:nth-child(2){ flex: 1 1 100px;}
.box5 .flex li:nth-child(3){ flex: 3 3 100px;}

.box6 .flex li:nth-child(1){ flex: 1 1 100px;}
.box6 .flex li:nth-child(2){ flex: 1 1 200px;}
.box6 .flex li:nth-child(3){ flex: 3 3 200px;}
```

#### align-self

- `align-self`和我们之前的容器属性类似，不过这一个对齐是给自己，而我们刚才的是给所有的项目属性，那这里我们也可以看出，容器属性是让全部的项目怎样做，而项目属性是让项目自己怎么做。`align-self`是自己在交叉轴的对齐方式，可覆盖容器属性`align-items`

```css
.box7 .flex{height: 200px; }
.box7 .flex li{ width: 100px;}
.box7 .flex li:nth-child(1){ align-self: stretch;}
.box7 .flex li:nth-child(2){ align-self: flex-start;}
.box7 .flex li:nth-child(3){ align-self: flex-end;}
.box7 .flex li:nth-child(4){ align-self: center;} 
.box7 .flex li:nth-child(5){ align-self: baseline; font-size: 30px;}
.box7 .flex li:nth-child(6){ align-self: baseline; font-size: 50px;}
```



#### order

- order排序，值越大越靠后，允许负值

```css
.box8 .flex li{width:100px; height: 100px; }
.box8 .flex li:nth-child(1){ order: -1;}
.box8 .flex li:nth-child(2){ order: 2;}
.box8 .flex li:nth-child(3){ order: 1;}
.box8 .flex li:nth-child(4){ order: 0;}
```



## 其他的CSS3属性

### web字体

开发人员可以为自己的网页指定特殊的字体，无需考虑用户电脑上是否安装了此字体，从此吧特殊字体处理成图片的时代便成为过去了。它的支持程度比较好，甚至IE低版本浏览器也能支持。

- 导入字体，其中font-family是对字体的命名，src是字体文件的路径

```css
@font-face {
    font-family: "xiaowei";
    src: url("../font/小微logo体.otf");
}
@font-face {
    font-family: "kuhei";
    src: url("../font/站酷酷黑.ttf");
}
```

### 多列布局

- `column-count`: 属性设置列的具体个数
- `column-width`: 属性控制列的宽度
- `column-gap`: 两列之间的缝隙间隔
- `column-rule`: 规定列之间的宽度，样式和颜色
- `column-span`: 规定元素应该横跨多少列，all为跨所有列

```css
p{  
   column-count: 4; 
   column-width: 100px;  
   column-gap: 50px;  
   column-rule: 5px solid deeppink;  
}
```



### box-shadow阴影

注意：值有顺序关系

> 边框阴影：box-shadow: h v blur spread color inset

- h：水平方向的偏移值
- v：垂直方向的偏移值
- blur：模糊度--可选，默认0
- spread：阴影半径--可选，默认0
- color：阴影颜色--可选，默认黑色
- inset：内阴影--可选，默认是外阴影

```
p{
  width: 100px;
  height: 100px;
  background: purple;
  margin: 100px auto;
  box-shadow: 10px 10px 10px 0 #000 inset;
}
```

值可写多个

```
p{
  width: 100px;
  height: 100px;
  background: purple;
  margin: 100px auto;
  box-shadow: 10px 10px 10px 0 #000 inset,-10px -10px 10px 0 #000 inset;
}
```

### 怪异盒子模型

#### box-sizing

- `content-box`：你设置的width属性仅仅是内容宽度，盒子的最终的宽高值在width的基础上再加上padding和border的宽度。默认值

- `border-box` ：你设置的width属性就是盒子最终的宽度，包含了border，padding和内容部分。如果添加了padding和border，那么内容区域就会减小。这就解决了我们平时给`padding`使我们盒子变大的弊端。

### border-radius 圆角

border-radius 属性是一个简写属性，用于设置四个 border-*-radius 属性。

- 设置一个值：四个角的圆角值都一样。如果元素是正方形，值为盒子半径时，盒子为一个正圆。

```css
border-radius: 10px;
```

- 设置两个值：第一个值控制 `左上/右下`，第二个值控制 `右上/左下`

```css
border-radius: 10px 20px;
```

- 设置三个值：第一个值控制 `左上`，第二分之控制 `右上/左下` 第三个值控制 `右下`

```css
border-radius: 10px 20px 30px;
```

- 设置四个值：分别代表`左上/右上/右下/左下`

```css
border-radius: 10px 20px 30px 40px;
```

- 添加`/`是用来设置当前不同方向（x/y轴）半径值。如下为一个宽200px，高100px的元素设置为椭圆。

```css
border-radius: 100px/50px;
```

- 四个角不容方向上的不同圆角值，如下，1和10搭配，2和20搭配，以此类推。
- border-radius: 水平(左上，右上，右下，左下)/垂直(左上，右上，右下，左下)

```css
border-radius: 1px 2px 3px 4px/10px 20px 30px 40px;
```

#### 某个角点不同方向圆角值

```css
border-top-left-radius: 100px 50px;		/* 左上角 */
border-top-right-radius: 100px 50px;	/* 右上角 */
border-bottom-left-radius: 100px 50px;	/* 左下角 */
border-bottom-right-radius: 100px 50px;/* 右下角 */
```




