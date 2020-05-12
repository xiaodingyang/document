# Less

## 1.1 基本使用

### 1.1.1 编译工具

- `less` 语法需要使用编译工具辅助编译为 `css` ，在这里我们可以使用 `koala` 工具，下载地址：http://koala-app.com/index-zh.html

- 下载安装好软件以后我们可以直接把项目拖进编译工具，他会自动打包编译。



### 1.1.2 基本语法

#### 1.1.2.1 注释

- 在 less 中，以下注释将不会呈现在css文件中

  ```less
  //我是注释，只会呈现在less文件中
  ```

- 在 less 中，以下注释既可以呈现在 less 中也会呈现在 css 中

  ```less
  /* 我是注释，既会呈现在 less 中 也会呈现在 css中 */
  ```


#### 1.1.2.2 父子嵌套

- 在 less 中父子嵌套非常简单

- 以下是 css 语法

  ```css
  .box ul {
    list-style: none;
  }
  .box li {
    width: 100px;
    height: 100px;
    background: deeppink;
    color: #fff;
  }
  ```

- 以下是 less 语法

  ```less
  .box{
    ul{
      list-style: none;
    }
    li{
      width: 100px;
      height: 100px;
      background: deeppink;
      color: #fff;
    }
  }
  ```


### 1.1.3 变量

- 在 `less` 中使用 `@` 定义变量名。

#### 1.1.3.1 基本使用

- 如下，我们都知道在一个网站中有几种主题色，我们可能不会很容易的记住这些颜色，那么我们就可以设置指定的变量去替代。

  ```less
  @bgc: green;
  li{
    width: 100px;
    height: 100px;
    background: @bgc;
  }
  ```

#### 1.1.3.2 作为选择器和属性的变量名 

- 也就是选择器和属性的名字相同的时候我们可以定义一个变量名

- 注意：定义变量方式为：`@变量`,作为选择器和属性时，使用变量的方式为：`@{变量}`

  ```less
  @bgc: green;
  @kuandu: width;
  .@{kuandu} {
    @{kuandu}: 100px;
    height: 100px;
    background: @bgc;
  }
  ```

#### 1.1.3.3 作为 `url` 的变量

- 很多时候我们的图片往往来自于一个文件夹，因此我们可以定义一个公共的变量

  ```less
  @url: '../images';
  li{
    width: 200px;
    height: 200px;
    background: url('@{url}/xiaoyang.jpg') no-repeat center/cover;
    color: #fff;
  }
  ```

  - 编译结果

  ```css
  li {
    width: 200px;
    height: 200px;
    background: url('../images/xiaoyang.jpg') no-repeat center / cover;
    color: #fff;
  }
  ```


#### 1.1.3.4 延迟加载 和 作用域

##### 1. 延迟加载

- 变量是延迟加载的，在使用前不一定要预先申明。以下两种情况均可正常加载样式：

  ```less
  @url: '../images';
  li{
    width: 200px;
    height: 200px;
    background: url('@{url}/xiaoyang.jpg') no-repeat center/cover;
    color: #fff;
  }
  ```

  ```less
  li{
    width: 200px;
    height: 200px;
    background: url('@{url}/xiaoyang.jpg') no-repeat center/cover;
    color: #fff;
  }
  @url: '../images';
  ```



##### 2.  作用域

- 在 less 中的作用域和 js 中的作用域是类似的

- 先从当前作用域找变量是否定义变量

- 如果定义了，后面的覆盖前面的

- 如果没有定义，往上级作用域找

- 注意：只能子作用域往父作用域找，不能父作用域往子作用域找

  ```less
  @a: 100px;
  .box{
    @a: 200px;
    li{
      @a: 300px;
      width: @a; //400px  同一个作用域后面的覆盖前面的
      @a: 400px; 
    }
    width: @a; //200px  父作用域不能往子作用域找
  }
  ```


## 1.2 混合

- 混合：混合就是一种将一系列的属性从一个规则引入到另一个规则集的方式。

### 1.2.1 普通混合

- 如下，当我们有些样式是公共的时候，在我们以前来做，应该是：

  ```css
  .font_lh{
    line-height: 30px;
  }
  h1{
    font-size: 25px;
  }
  h2{
    font-size: 15px;
  }
  ```

  ```html
  <h1 class="font_lh">我是h1标签</h1>
  <h2 class="font_lh">我是h2标签</h2>
  ```

- 在 less 中，我们可以使用混合：

  ```less
  .font_lh{
    line-height: 30px;
  }
  h1{
    font-size: 25px;
    .font_lh;
  }
  h2{
    font-size: 15px;
    .font_lh;
  }
  ```

  - 编译结果

  ```css
  .font_lh {
    line-height: 30px;
  }
  h1 {
    font-size: 25px;
    line-height: 30px;
  }
  h2 {
    font-size: 15px;
    line-height: 30px;
  }
  ```


### 1.2.2 混合不带输出

- 前面我们看到普通混合编译的结果还是会出现 font_ln 这个类，那如果我们只想要将这个集合里面的样式拿过来而不让他编译出类，我们就可以使用`混合不带输出` ，也就是在我们定义的那个类后面加个括号就可以了。

  ```less
  .font_lh(){
    line-height: 30px;
  }
  h1{
    font-size: 25px;
    .font_lh;
  }
  h2{
    font-size: 15px;
    .font_lh;
  }
  ```

  - 编译以后

  ```css
  h1 {
    font-size: 25px;
    line-height: 30px;
  }
  h2 {
    font-size: 15px;
    line-height: 30px;
  }
  ```


### 1.2.3 带选择器的混合

- 顾名思义，在混合中带有选择器，`&` 符号为父级选择器。

- 如果我们是带输出的混合

  ```less
  .font{
    &:hover{
      color: deeppink;
    }
  }
  h1{
    .font;
  }
  ```
  - 编译后的结果

  ```css
  .font:hover {
    color: deeppink;
  }
  h1:hover {
    color: deeppink;
  }
  ```


- 如果是不带输出的混合

  ```less
  .font(){
    &:hover{
      color: deeppink;
    }
  }
  h1{
    font-size: 25px;
    .font;
  }
  ```

  - 编译后的结果

  ```css
  h1:hover {
    color: deeppink;
  }
  ```

- 其实，我们从上面的代码可以更清晰的看出来输出和不输出的区别，所谓的输出其实就是真真实实的定义类这么个类，再在标签上给添加上这个类，而不输出是不会输出这个类，只是引用它的样式而已。

### 1.2.4 带参数的混合

#### 1.2.4.1 普通用法

- 带参数的混合，顾名思义就是带有参数的混合，我们在使用混合的时候，通常是需要添加公共的样式，但是不可避免的在公共的样式中有一些是不同的，那么我们就可以将这些不同的通过传参的形式给传进去。

  ```less
  .border(@color){
    border: 1px solid @color;
  }
  h1:hover{
    .border(green);
  }
  h2:hover{
    .border(purple);
  }
  ```

  - 编译结果

  ```css
  h1:hover {
    border: 1px solid #008000;
  }
  h2:hover {
    border: 1px solid #800080;
  }
  ```
  - 以上代码，我们带定义相同的border的时候只需要颜色不同，那么我们就可以将颜色作为参数的形式给传递进去。

#### 1.2.4.2 带默认值

- 同时，在带参数的时候，我们也可以传默认值。这时候，即使我们在使用的时候没有传参数也不会报错。

  ```less
  .border(@color: red) {
    border: 1px solid @color;
  }
  
  h1:hover {
    .border(green);
  }
  
  h2:hover {
    .border(purple);
  }
  
  h3:hover {
    .border();
  }
  ```

  - 以上代码，我们可以看到 h3 没有传值，那么他的默认值就是 red

#### 1.2.4.3 多个参数

- 一个组合可以带多个参数，参数之间可以用 `分号` 或者 `逗号` 或者 `空格` 分隔

- 用 `逗号`  和 `空格` 分隔只会传给一个变量

- 用 `分号` 分隔即分别传给多个变量

  ```less
  .on(@fontSize; @padding:xxx; @margin: 10px){
    font-size: @fontSize;
    padding: @padding;
    margin: @margin @margin @margin @margin;
  }
  .box{
    .on(10px; 10px 20px; 30px;)
  }
  ```

  - 编译结果

  ```css
  .box {
    font-size: 10px; 
    padding: 10px 20px;
    margin: 30px 30px 30px 30px;
  }
  ```

- 如果既有分号，又有括号

```css
.on(@fontSize; @padding:xxx; @margin: 10px){
  font-size: @fontSize;
  padding: @padding;
  margin: @margin @margin @margin @margin;
}
.box{
  .on(10px,20px,30px;)
}
```

- 编译结果	

```css
.box {
  font-si  ze: 10px,20px,30px;
  padding: xxx;
  margin: 10px 10px 10px 10px;
}
```



- 如果括号里面没有`分号`， 全是 `逗号` 那么就表示给每个参数赋值

  ```less
  .on(@fontSize; @padding:xxx; @margin: 10px){
    font-size: @fontSize;
    padding: @padding;
    margin: @margin @margin @margin @margin;
  }
  .box{
    .on(10px,20px,30px)
  }
  ```

  - 编译结果

  ```css
  .box {
    font-size: 10px;
    padding: 20px;
    margin: 30px 30px 30px 30px;
  }
  ```


#### 1.2.4.4 具有相同名称 和 参数数量的混合

- 定义多个具有相同名称 和 参数数量的混合是合法的，Less 会使用它可以应用的属性， 如果使用 回合的时候只带一个参数，比如 `mixin(green)` ，这个属性会导致所有的混合都会强制使用这个明确的参数。

  ```less
  .on(@fontSize;){
    font-size1: @fontSize;
  }
  .on(@fontSize;){
    font-size2: @fontSize;  
  }
  .box{
    .on(20px)
  }
  ```

  - 编译结果

  ```CSS
  .box {
    font-size1: 20px;
    font-size2: 20px;
  }
  ```


#### 1.2.4.5 命名参数

- 我们都知道，参数需要`一一对应`，那么如果我们不想一一对应的话，我们可以使用命名参数。

  ```less
  .on(@color;@margin;){
    color: @color;
    margin: @margin;
  }
  
  .box{
    .on( @margin: 20px, purple)
  }
  ```

  - 编译后

  ```css
  .box {
    color: #800080;
    margin: 20px;
  }
  ```

- 以上代码，第一个值使用了命名参数，第二个值没有设置命名参数，因此就从第一个参数开始一一对应了

#### 1.2.4.6 @arguments 参数列表

- 使用`@arguments` 会使参数一一对应，对号入座。

  ```less
  .border(@style;@color){
    border: 1px @arguments;
  }
  .box{
    .border(solid,green);
  }
  ```

  - 编译结果

  ```css
  .box {
    border: 1px solid #008000;
  }
  ```


#### 1.2.4.7 匹配模式

- 我们使用 `匹配模式` 可以选择性的使用自己想要的样式

  ```less
  .border(all,@b){
    border-radius: @b;
  }
  .border(b_lt,@b){
    border-top-left-radius: @b;
  }
  .border(b_rt,@b){
    border-top-right-radius: @b;
  }
  .border(b_lb,@b){
    border-bottom-right-radius: @b;
  }
  .border(b_rb,@b){
    border-bottom-left-radius: @b;
  }
  
  .box{
    .border(b_lt,5px);
    .border(b_rt,10px);
  }
  ```
  - 编译结果

  ```css
  .box {
    border-top-left-radius: 5px;
    border-top-right-radius: 10px;
  }
  ```

  - 以上代码，当我们想要使用所有的 border-radius 的时候，就是用 all，且四个方向我们都单独的列出来了，这样子大大的节约了我们的开发时间。

#### 1.2.4.8 混合的返回值

- 使用混合，最终返回一个变量，这个变量是通过处理的值，使用混合值以后可以再后面使用混合值返回的值

  ```less
  .average(@x, @y){
    @average: ( (@x + @y) / 2);
  }
  .box{
    .average(8px,8px);
    margin: @average;
  }
  ```

  - 编译结果

  ```css
  .box {
    margin: 8px;
  }
  ```


## 1.3 嵌套规则

- 什么是嵌套规则：它模仿了HTML结构，让我们的css代码更加明了清晰。

### 1.3.1 父子嵌套

- 以下是 css 语法

  ```css
  .box ul {
    list-style: none;
  }
  .box li {
    width: 100px;
    height: 100px;
    background: deeppink;
    color: #fff;
  }
  ```

- 以下是 less 语法

  ```less
  .box{
    ul{
      list-style: none;
    }
    li{
      width: 100px;
      height: 100px;
      background: deeppink;
      color: #fff;
    }
  }
  ```

### 1.3.2  & 选择器

- `&`  父元素选择器，可以进行嵌套

  ```less
  .box{
    width: 100px;
    height: 100px;
    &:hover{
      background: green;
    }
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 100px;
    height: 100px;
  }
  .box:hover {
    background: green;
  }
  ```


- 改变选择器的顺序，在选择器后面添加上 `&` 符号，会将此选择器提到所有父选择器前面去。

  ```less
  .box{
    width: 100px;
    height: 100px;
    background: yellow;
    div &{
      background: green;  //结果为选中 div 下面的 .box
    }
    div&{
      background: green;  //结果为选中叫 .box 的 div
    }
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 100px;
    height: 100px;
    background: yellow;
  }
  div .box {
    background: green;
  }
  div.box {
    background: green;
  }
  ```


- 结合 `&` 使用生成所有可能的选择器列表实例

  ```less
  p,span{
    & &{
      background: green;
    }
  }
  ```

  - 编译结果

  ```css
  p p,
  p span,
  span p,
  span span {
    background: green;
  }
  ```


## 1.4 运算

### 1.4.1 运算说明

- 任何数值，颜色和变量都可以进行运算。
- `less` 会自动为你推段数值单位，你不必每一个值都加上单位。
- 注意：运算符与值之间必须以空格分开，涉及优先级时以 `()` 进行优先级运算。

### 1.4.2 简单的运算

- 要注意的是，运算至少需要有一个值带单位

  ```less
  .box{
    width: 200 + 200px;
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 400px;
  }
  ```


- 涉及到优先级，使用 `()` 提升优先级。

  ```less
  .box{
    width: (200 + 200) * 2px;
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 800px;
  }
  ```


- 计算颜色的时候，先把十六进制的颜色转换为 `rgb` 然后再进行计算。

- 同时，要注意的是，不能以英文单词进行运算，因为英文单词不能被转为 `rgb` 模式。

- `rgb` 的值得范围是 `0-255`。因此，如果计算的值大于了 255 会按照255来取值。

- 必须是 rbg 或者 十六进制才能进行运算

  ```less
  .box{
    background: #000000 + 15; //(0,0,0) + 15 = (15,15,15) 再转换为十六进制
  }
  ```

  - 编译结果

  ```css
  .box {
    background: #0f0f0f;
  }
  ```


## 1.5 函数

- `Less` 提供了许多用于转化颜色，处理字符串和进行算术运算的函数。

### 1.5.1 rgb() 函数

- 最常见的就是 `rgb()` 颜色转换。

  ```less
  .box{
    background: rgb(255, 0, 0);
  }
  ```

  - 编译结果

  ```css
  .box {
    background: #ff0000;
  }
  ```


### 1.5.2 blue() 函数

- `blue()` 函数，可以提取十六进制的蓝色的值。

  ```less
  .box{
    width: blue(#153170);
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 112;
  }
  ```


## 1.6 命名空间

- 命名空间其实有点像我们学过的 `>` 亲儿子选择器

  ```less
  .a{
    .b{
      .c{
        color: red;
      }
    }
  }
  div{
    .a>.b;
  }
  ```

  - 编译结果

  ```css
  .a .b .c {
    color: red;
  }
  div .c {
    color: red;
  }
  ```

  - 以上代码：`.a>.b` 表示取 `.b` 之后的选择器，注意：`>` 只能使用在紧邻的选择器。也可以 `.a>.b>.c`

- 如果只想使用 .c 里面的样式

  ```less
  div{
    .a>.b>.c;
  }
  ```

  - 编译结果

  ```css
  div {
    color: red;
  }
  ```


- 简写，也可以去掉 `>` 符号，使用空格代替，有点类似css 的写法。

  ```less
  div{
    .a .b;
  }
  ```

  - 编译结果

  ```css
  div .c {
    color: red;
  }
  ```


## 1.7 @import 引入

- 也就是导入外部的 less 文件，当然也可以导入外部的 css 文件，但是要注意的是，css 文件中的类不能当做 less 语法 `混合` 使用。

### 1.7.1 普通使用

##### 外部的 main.less

- `main.less` 是外部的 less 文件

  ```less
  @color: green;
  ```


##### 外部的 index.css

- `index.css` 是外部的css文件

  ```css
  .color{
    background: yellowgreen;
  }
  ```


##### test.less 文件

- `test.less` 是导入 index 和 main 的文件，less 文件可以省略后缀名。

  ```less
  @import 'index.css';
  @import 'main';
  .box{
    color: @color;
  }
  ```

- 以上代码，我们可以看到，在 test 文件中引入了 `main.less` 文件，那么 main 中的变量就可以被 test 使用，但是要注意的是，index 中的 类不能被 test 使用 而是整体导入 test 中，以下是编译结果。

  ```css
  @import 'index.css';
  .box {
    color: #008000;
  }
  .color{
    background: yellowgreen;
  }
  ```

### 1.7.2 带参数

- 默认是 `once()` ，既可以使用又会加载。

#### 1.7.2.1 reference

- 如果没有使用 `reference` 那么会把引入的less文件输出在此文件中，如果使用了 `reference` 那么可以使用引入的 less 文件中的变量，类等等，但是不会输出里面的样式。

  ##### main.less 文件

  ```less
  @color: green;
  .box{
    colorless:deeppink;
  }
  ```

  ##### test 文件

  ```less
  @import 'index.css';
  @import (reference) 'main';
  .box{
    color: @color;
  }
  ```

  ##### 编译结果

  ```css
  @import 'index.css';
  .box {
    color: #008000;
  }
  ```


#### 1.7.2.2 inline

- 引用 less 文件，但不能进行操作

  ##### main.less 文件

  ```less
  @color: green;
  .box{
    color:deeppink;
  }
  ```

  ##### test 文件

  ```less
  @import 'index.css';
  @import (inline) 'main';
  .box{
    color: @color;
  }
  ```

  ##### 编译结果

  ```css
  @import 'index.css';
  .box {
    color: #008000;
  }
  ```



#### 1.7.2.3 multiple

- 允许引入多次相同文件名的文件，并会加载多次

  ##### main.less 文件

  ```less
  .box{
    color:deeppink;
  }
  ```

  ##### test.less 文件

  ```less
  @import (multiple) 'main';
  @import (multiple) 'main';
  @import (multiple) 'main';
  ```

  ##### test.css文件编译结果

  ```css
  .box {
    color: deeppink;
  }
  .box {
    color: deeppink;
  }
  .box {
    color: deeppink;
  }
  ```


#### 1.7.2.4 其他

> - less：将文件作为 Less 文件对象，无论什么扩展名（即使是css文件），作为 less 以后也就意味着可以使用里面的类
> - css：将文件作为 css 文件 对象，无论是什么扩展名(即使是less文件)

#### 1.7.2.5 关键字 !important

- 当我们在使用混合的时候，我们可以再后面给加上 `!important` 关键字。给说有混合的样式都加上 `!important` 提升权重。

  ```less
  .on(){
    width: 100px;
    height: 100px;
    backgorund: green;
  }
  .box{
    .on!important;
  }
  ```

  - 编译结果

  ```css
  .box {
    width: 100px !important;
    height: 100px !important;
    backgorund: green !important;
  }
  ```

## 1.8 条件表达式

- `when(判断)` 函数表示判断。

### 1.8.1 带条件的混合

- `lightness(color)` 表示颜色亮度的函数，参数为颜色。返回颜色亮度的百分比

```less
// 当传入的参数颜色亮度大于50%的时候，background为绿色
.mixin (@a) when (lightness(@a) >= 50%) {
  background: green;
}
// 当传入的参数颜色亮度小于50%的时候，background为红色
.mixin (@a) when (lightness(@a) < 50%) {
  background: red;
} 

.mixin (@a) {
  color: @a;
}

.class1 {
  .mixin(#ddd);
}
.class2 {
  .mixin(#555);
}
```

- 编译结果

```css
.class1 {
  background: green;
  color: #dddddd;
}
.class2 {
  background: red;
  color: #555555;
}
```

- 以上代码我们可以看到，#ddd的颜色亮度是小于50%的，所以执行 mixin 函数以后得到的背景颜色为绿色。
- 而 #555的颜色亮度是大于50%的，所以执行 mixin 函数以后得到的背景颜色为红色。

### 1.8.2 类型检查函数

- `iscolor()` 如果是颜色
- `isnumber()` 如果是数字 px 也行，后面有专门检查 px 的函数

```less
.mixin (@a) when (iscolor(@a)) {
  background: green;
}

.mixin (@a) when (isnumber(@a)) {
  width: @a;
} 

.class1 {
  .mixin(#ddd);
}
.class2 {
  .mixin(100px);
}
```

- 编译结果

```css
.class1 {
  background: green;
}
.class2 {
  width: 100px;
}
```



### 1.8.3 单位检查函数

- `ispixel()` 是否是 px
- `ispercentage()` 是否是 百分比
- `isem` 是否是 em
- `isunit(变量, '指定单位')` 判断一个值是否是指定单位的数值 

```less
.mixin (@a) when (ispixel(@a)) {
  width: @a;
}

.mixin (@a) when (isunit(@a, 'rem')) {
  height: @a;
} 

.class1 {
  .mixin(100px);
}
.class2 {
  .mixin(1rem);
}
```

- 编译结果

```css
.class1 {
  width: 100px;
}
.class2 {
  height: 1rem;
}
```

## 1.9 循环

- 在 less 中，混合可以调用他自身。这样，当一个混合递归调用自己，再结合 Guard 表达式 和 模式匹配 这两个特性，就可以写出循环结构。

```less
.loop(@counter) when (@counter > 0) {
  width: @counter*10px;
  .loop((@counter)-1);  // 注意，变量和数字进行运算的时候变量一定要用括号进行包裹，否则会认为一个整体为变量
}
div{
  .loop(5);
}
```

- 编译结果

```css
div {
  width: 50px;
  width: 40px;
  width: 30px;
  width: 20px;
  width: 10px;
}
```

- 以下例子用来生成 h1- h6 标签

```less
.loop(@counter) when (@counter > 0) {
  h@{counter}{
    width: @counter * 10px;
  }
  .loop((@counter)-1);
}
.loop(6);
```

- 编译结果

```css
h6 {
  width: 60px;
}
h5 {
  width: 50px;
}
h4 {
  width: 40px;
}
h3 {
  width: 30px;
}
h2 {
  width: 20px;
}
h1 {
  width: 10px;
}
```

## 2.0 合并属性

- 在需要合并的属性的 `:` 前面加上 `+` 就可以完成合并。合并以 `,` 分隔。



- `+` 分隔，合并后以 `,` 分隔属性。

```less
.mixin () {
  box-shadow+: 0 0 0 10px #000; 
}
.myclass {
  .mixin();
  box-shadow+: 0 0 0 10px red; 
}
```

- 编译结果

```css
.myclass {
  box-shadow: 0 0 0 10px #000, 0 0 0 10px red;
}
```



- `+_` 分隔，合格以后以 `空格`分隔属性

```less
.mixin () {
  background+_: url(); 
}
.myclass {
  .mixin();
  background+_: no-repeat;
}
```

- 编译结果

```css
.myclass {
  background: url() no-repeat;
}
```

## 2.1 函数库

### 2.1.1 字符串函数

#### 2.1.1.1 escape 函数

- 将输入字符串中的 url 特殊字符进行编码处理。

- 使用URL-encoding的方式编码字符串。
- 注意：如果参数不是字符串的话，函数行为是不可预知的。目前传入颜色值的话会返回`undefined`，其它的值会原样返回。写代码时不应该依赖这个特性，而且这个特性在未来有可能改变。

```less
div {
  a: escape('name=肖定阳');
}
```

- 编译结果

```css
div {
  a: name%3D%E8%82%96%E5%AE%9A%E9%98%B3;
}
```



#### 2.1.1.2 e 函数

- Css 转译，用 `~` 符号代替。用于避免编辑器编译，使浏览器编译。
- 它接受一个字符串作为参数，并原样返回内容（不含引号）。它可用于输出一些不合法的CSS语法，或者是使用LESS不能识别的属性。

```less
div {
  width: calc(~"800px-700px");
}
```

- 编译结果

```css
div {
  width: calc(800px-700px);
}
```



#### 2.1.1.3 repace 函数

- 字符串替换
- 第一个参数为需要替换的字符串
- 第二个参数和第三个参数分别是将 A 替换成 B

```less
div {
  content: replace("Hello,A", "A", "B");
}
```

- 编译结果

```css
div {
  content: "Hello,B";
}
```



### 2.1.2 长度相关函数

#### 2.1.2.1 length 函数

- 返回集合中的值得条数

```less
div {
  width: length(1 2 3);
}
```

- 编译结果

```css
div {
  width: 3;
}
```

#### 2.1.2.2 extract

- 返回集合中指定索引值

```less
@list: "A", "B", "C";
div {
  content: extract(@list, 1)
}
```

- 编译结果

```css
div {
  content: "A";
}
```



### 2.1.3 数学函数

```js
ceil() // 向上取整
floor() // 向下取整
percentage() // 将浮点数转换为百分比
round() // 取整和四舍五入
sqrt() // 计算一个数的平方根，原样保持单位
abs() // 计算数字的绝对值，原样保持单位
sin() // 正弦函数
asin() // 反弦函数
cos() // 余弦函数
acos // 反余弦函数
tan() // 正切函数
atan // 反正切函数
pi() // 返回 π
pow() // 乘方运算
mod() // 取余运算
min() // 最小值运算
max() // 最大值运算
```



### 2.1.4 类型函数

```js
isnumber() // 如果一个值是数字返回 true
isstring() // 如果一个值是字符串，返回 true
iscolor() // 如果一个值是颜色，返回true
iskeyword() // 如果一个值是关键字，返回 true
isurl() // 如果一个值是url地址，返回 true
ispixel() // 如果一个值是px单位，返回 true
isem() // 如果一个值是em单位，返回 true
ispercentage() // 如果一个值是百分比单位，返回 true
isunit() // 如果一个值是带指定单位的数字，返回 true
```



### 2.1.5 颜色定义函数

```js
rgb() // 通过十进制创建不透明的颜色对象，取值范围0~255
rgba() // 通过十进制创建带透明色的颜色，透明色取值范围0~1
argb() // 安卓使用的颜色，创建格式为 #AARRGGBB 的十六进制颜色，参数为一般使用的颜色，比如agb
hls() // 通过色相，饱和度，亮度 三种值创建不透明颜色对象，取值范围：  (H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360)  (S：Saturation(饱和度)。取值为：0.0% - 100.0%)  （L：Lightness(亮度)。取值为：0.0% - 100.0%）
hlsa() // 通过色相，饱和度，亮度 透明度 四种值创建透明颜色对象，取值范围：A：Alpha透明度。取值0~1之间。
hsv() // 通过色相，饱和度，色调 三种值 创建不透明的颜色对象，取值与 hls 相同
hsva() // 通过色相，饱和度，色调,透明度 四种值创建不透明的颜色对象，取值与 hlsa 相同
```



### 2.1.6 颜色值通道提取函数

```less
从HSL色彩空间中提取颜色对象的色相值：hue()

从HSL色彩空间中提取颜色对象的饱和度值：saturation()

从HSL色彩空间中提取颜色对象的亮度值:lightness()

从HSV色彩空间中提取颜色对象的色相值：hsvhue()

从HSV色彩空间中提取颜色对象的饱和度值:hsvsaturation()

从色彩空间中提取颜色对象的色调值：hsvvalue()

提取颜色对象的红色值：red()

提取颜色对象的绿色值：gree()

提取颜色对象的蓝色值：blue()

提取颜色对象的透明值：alpha()

计算颜色对象的luma的值（亮度的百分比表示方法）：lima()

计算没有伽玛校正的亮度值：luminance()
```



### 2.1.7 颜色值运算函数

```less
增加一定数值的颜色饱和度：saturate()

降低一定数值的颜色饱和度：desaturate()

增加一定数值的颜色亮度：lighten()

降低一定数值的颜色亮度：darken()

降低颜色的透明度（或增加不透明度），令其更不透明：fadein()

增加颜色的透明度（或降低不透明的），令其更透明：fadeout()

给颜色（包括不透明的颜色）设定一定数值的透明度：fade()

任意方向旋转颜色的色相角度（hue angle）:spin()

根据比例混合两种颜色，包括计算不透明度：mix()

完全移除颜色的饱和度，与desaturate(@colo,100%)函数效果相同：greyscale()

选着两种颜色相比较，得出那种颜色的对比度最大就倾向于对比度最大的颜色：contrast()
```



### 2.1.8 颜色混合函数

```less
增加一定数值的颜色饱和度：saturate()

降低一定数值的颜色饱和度：desaturate()

增加一定数值的颜色亮度：lighten()

降低一定数值的颜色亮度：darken()

降低颜色的透明度（或增加不透明度），令其更不透明：fadein()

增加颜色的透明度（或降低不透明的），令其更透明：fadeout()

给颜色（包括不透明的颜色）设定一定数值的透明度：fade()

任意方向旋转颜色的色相角度（hue angle）:spin()

根据比例混合两种颜色，包括计算不透明度：mix()

完全移除颜色的饱和度，与desaturate(@colo,100%)函数效果相同：greyscale()

选着两种颜色相比较，得出那种颜色的对比度最大就倾向于对比度最大的颜色：contrast()
```



### 2.1.9  其他函数

#### 2.1.9.1 color 函数

- 解析颜色，将代表颜色的字符串转换为颜色值。

```less
body{
  background: color("#f30");
}
```

- 编译结果

```css
body {
  background: #ff3300;
}
```

#### 2.1.9.2 convert 函数

- 将数字从一种类型转换为另一种类型：长度单位、时间单位、角度单位等都可以转换，但是要注意必须得兼容，也就是不能将长度单位转换为时间单位。
- 如下：

```less
body {
  width: convert(10cm,px);
  width: convert(10s,ms);
  width: convert(10deg,rad);
}
```

- 编译结果

```css
body {
  width: 377.95275591px;
  width: 10000ms;
  width: 0.17453293rad;
}
```



#### 2.1.9.3 data-uri 函数

- 将一个资源内嵌到样式文件，如果开启了 IECompat 选项，而且资源文件体积过大，或者是在浏览器中使用，则会使 url() 进行回退。如果没有指定 MIME，则 Node 会使用 MIME 包来界定正确的 MIME。
- 也就是，如果在应用背景图片的时候，需要将图片转为 `base64` 位的时候，就可以将 url 转换为 `data-uri()`。
- 注意：koala编译器不支持。



#### 2.1.9.4 default 函数

- 只能边界条件中使用，没有匹配到其他自定义函数（mixin）的时候返回 `true`，否则返回 `false`。

```less
.x(1){
  x: 1;
}
.x(2){
  x: 2;
}
.x(@x) when (default()){
  z: @x;
}

div{
  .x(1);
}
div{
  .x(3333);
}
```

- 编译结果

```css
div {
  x: 1;
}
div {
  z: 3333;
}
```

- 以上代码，执行 x 的时候，传入的参数如果既不是 1 也不是 2 那么就会调用 `default` 这一项。

#### 2.1.9.5 unit 函数

- 移除或者改变属性值得单位。

- 一个参数的时候，移除单位。
- 两个参数的时候，第一个参数为需要转换单位的值，第二个参数为需要转换为什么单位。

```less
div{
  width: unit(100px);
}
div{
  width: unit(100px,cm);
}
```

- 编译结果

```css
div {
  width: 100;
}
div {
  width: 100cm;
}
```

