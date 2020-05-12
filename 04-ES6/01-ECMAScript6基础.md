## 1.2 let 和const 命令

### 1.2.1 let命令

#### 1.2.1.1 基本用法

- ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

- 上面代码在代码块之中，分别用`let`和`var`声明了两个变量。然后在代码块之外调用这两个变量，结果`let`声明的变量报错，`var`声明的变量返回了正确的值。这表明，`let`声明的变量只在它所在的代码块有效。`for`循环的计数器，就很合适使用`let`命令。

```javascript
for (let i = 0; i < 10; i++) {
  // ...
}

console.log(i);	// ReferenceError: i is not defined
```

- 上面代码中，计数器`i`只在`for`循环体内有效，在循环体外引用就会报错。

- 下面的代码如果使用`var`，最后输出的是`10`。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

- 上面代码中，变量`i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量`i`。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的`i`指向的就是全局的`i`。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

- 如果使用`let`，声明的变量仅在块级作用域内有效，最后输出的是 6。

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

- 上面代码中，变量`i`是`let`声明的，当前的`i`只在本轮循环有效，所以每一次循环的`i`其实都是一个新的变量，所以最后输出的是`6`。你可能会问，如果每一轮循环的变量`i`都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量`i`时，就在上一轮循环的基础上进行计算。这样就可以完美解决es5的`闭包`问题。

- 另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

- 上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域。

#### 1.2.1.2 不存在变量提升

- `var`命令会发生”变量提升“现象，即变量可以在声明之前使用，值为`undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

- 为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

- 上面代码中，变量`foo`用`var`命令声明，会发生变量提升，即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。变量`bar`用`let`命令声明，不会发生变量提升。这表示在声明它之前，变量`bar`是不存在的，这时如果用到它，就会抛出一个错误。

#### 1.2.1.3 暂时性死区

- 只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

- 上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。

- ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

- 总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“`暂时性死区`”（temporal dead zone，简称 TDZ）。

#### 1.2.2.4 不允许重复声明

- `let`不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}
```

- 因此，不能再函数内部重新声明参数

```js
function func(arg) {
  let arg; // 报错
}
```



### 1.2.2 块级作用域

#### 1.2.2.1 为什么需要块级作用域

- ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
- 第一种场景，内层变量可能会覆盖外层变量。

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

- 上面代码的原意是，`if`代码块的外部使用外层的`tmp`变量，内部使用内层的`tmp`变量。但是，函数`f`执行后，输出结果为`undefined`，原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量。

- 第二种场景，用来计数的循环变量泄露为全局变量。

```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

- 上面代码中，变量`i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

#### 1.2.2.2 ES6 的块级作用域

- `let`实际上为 JavaScript 新增了块级作用域。

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

- 上面的函数有两个代码块，都声明了变量`n`，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用`var`定义变量`n`，最后输出的值才是 10。

- 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

### 1.2.3 const 命令

#### 1.2.3.1 基本用法

- `const`声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415;
PI = 3;	// TypeError: Assignment to constant variable.
```

- 上面代码表明改变常量的值会报错。`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。

- `const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```js
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

#### 1.2.3.2 本质

- `const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

```js
const foo = {};

foo.prop = 123;	// 为 foo 添加一个属性，可以成功

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

- 上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

- 下面是另一个例子。

```js
const a = [];
a.push('Hello'); // 可执行
a = ['Dave'];    // 报错
```

- 上面代码中，常量`a`是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给`a`，就会报错。
- 如果真的想将对象冻结，应该使用`Object.freeze`方法。

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

- 上面代码中，常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

## 1.3 解构赋值

### 1.3.1 数组解构赋值

#### 1.3.1.1 用法

- 以前，为变量赋值，只能直接指定值。

  ```javascript
  let a = 1;
  let b = 2;
  let c = 3;
  ```

- ES6 允许写成下面这样。相当于定义了三个变量并赋值。

- 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

  ```javascript
  let [a, b, c] = [1, 2, 3];
  console.log(a,b,c); // 1 2 3
  ```



- 下面是一些使用嵌套数组进行解构的例子。

- 如果解构不成功，变量的值就等于`undefined`。

- 不完全解构，也可以成功。

  ```javascript
  let [foo, [[bar], baz]] = [1, [[2], 3]];
  foo // 1
  bar // 2
  baz // 3
  
  let [ , , third] = ["foo", "bar", "baz"]; // 不完全解构
  third // "baz"
  
  let [x, , y] = [1, 2, 3]; // 不完全解构
  x // 1
  y // 3
  
  let [head, ...tail] = [1, 2, 3, 4];
  head // 1
  tail // [2, 3, 4]
  
  let [x, y, ...z] = ['a']; // 不完全解构
  x // "a"
  y // undefined
  z // []
  ```



- 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

  ```javascript
  // 报错
  let [foo] = 1;
  let [foo] = false;
  let [foo] = NaN;
  let [foo] = undefined;
  let [foo] = null;
  let [foo] = {};
  ```



- 对于 Set 结构，也可以使用数组的解构赋值。

- 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

  ```javascript
  let [x, y, z] = new Set(['a', 'b', 'c']);
  x // "a"
  ```



#### 1.3.1.2 默认值

- 解构赋值允许指定默认值。

  ```js
  let [foo = true] = []	// true
  
  let [x, y = 'b'] = ['a']; // x='a', y='b'
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  ```

  

- 注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效。

- 下面代码中，如果一个数组成员是`null`，默认值就不会生效，因为`null`不严格等于`undefined`。

  ```js
  let [x = 1] = [undefined];	// 1
  
  let [x = 1] = [null];	// null
  ```

  

- 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
  return 2
}
let [x = f()] = [1];
```

- 上面代码中，因为`x`能取到值，所以函数`f`根本不会执行。



- 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2	赋值覆盖了默认值
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

- 上面最后一个表达式之所以会报错，是因为`x`用`y`做默认值时，`y`还没有声明。



### 1.3.2 对象的解构赋值

#### 1.3.2.1 用法

- 解构不仅可以用于数组，还可以用于对象。

  ```js
  let { foo, bar } = { foo: "aaa", bar: "bbb" };
  foo // "aaa"
  bar // "bbb"
  ```

  

- 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

  ```js
  let { bar, foo } = { foo: "aaa", bar: "bbb" };
  foo // "aaa"
  bar // "bbb"
  
  let { baz } = { foo: "aaa", bar: "bbb" };
  baz // undefined
  ```

  

- 如果变量名与属性名不一致，必须写成下面这样。

  ```js
  let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
  baz // "aaa"
  ```

  

- 这实际上说明，对象的解构赋值是下面形式的简写

  ```js
  let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
  ```

  

- 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

  ```js
  let { foo: baz } = { foo: "aaa", bar: "bbb" };
  baz // "aaa"
  foo // error: foo is not defined
  ```

- 上面代码中，`foo`是匹配的模式，`baz`才是变量。真正被赋值的是变量`baz`，而不是模式`foo`。



- 同样的，默认值生效的条件是，对象的属性值严格等于`undefined`。

  ```js
  var {x = 3} = {x: undefined};
  x // 3
  
  var {x = 3} = {x: null};
  x // null
  ```



- 常用三个方法

  ```js
  let obj = {
      "name": "Silence",
      "sex": "男",
      "age": 18
  }
  console.log(Object.keys(obj)); //将对象属性解构为一个数组
  console.log(Object.values(obj)); //将对象值解构为一个数组
  console.log(Object.entries(obj)); //将对象每个属性和值解构为一个数组
  ```

  

- 对象属性必须为字符串，所以，如果使用变量必须要加中括号：

  ```js
  const name = '哈哈'
  let obj = {
      [name]: "Silence",
      "sex": "男",
      "age": 18
  }
  console.log(obj); // {哈哈: "Silence", sex: "男", age: 18}
  ```



#### 1.3.2.2 简写

- 省略写法

  ```js
  const name = 'Silence'
  let obj = {
      name
  }
  console.log(obj); // {name: "Silence"}
  ```

  

- 函数简写

  ```js
  // 等价于 fun: fun(){console.log('hello!')}
  let obj = {
      fun() {
          console.log('hello!');
      }
  }
  ```



#### 1.3.2.3 默认值

- 对象的解构也可以指定默认值

  ```javascript
  var {x = 3} = {};
  x // 3
  
  var {x, y = 5} = {x: 1};
  x // 1
  y // 5
  
  var {x: y = 3} = {};
  y // 3
  
  var {x: y = 3} = {x: 5};
  y // 5
  ```



- 默认值生效的条件是，对象的属性值严格等于`undefined`。

  ```JS
  var {x = 3} = {x: undefined};
  x // 3
  
  var {x = 3} = {x: null};
  x // null
  ```

- 上面代码中，属性`x`等于`null`，因为`null`与`undefined`不严格相等，所以是个有效的赋值，导致默认值`3`不会生效。



#### 1.3.2.4 注意点

- 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

  ```javascript
  // 错误的写法
  let x;
  {x} = {x: 1};
  // SyntaxError: syntax error
  ```

- 上面代码的写法会报错，因为 JavaScript 引擎会将`{x}`理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

  ```javascript
  // 正确的写法
  let x;
  ({x} = {x: 1});
  ```

- 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。



- 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。

  ```js
  let arr = [1, 2, 3];
  let {0 : first, [arr.length - 1] : last} = arr;
  first // 1
  last // 3
  ```

- 上面代码对数组进行对象解构。数组`arr`的`0`键对应的值是`1`，`[arr.length - 1]`就是`2`键，对应的值是`3`。方括号这种写法，属于“属性名表达式”。



### 1.3.3 字符串的解构赋值

- 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

  ```js
  const [a, b, c, d, e] = 'hello';
  a // "h"
  b // "e"
  c // "l"
  d // "l"
  e // "o"
  ```

  

- 类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

  ```js
  let {length : len} = 'hello';
  len // 5
  ```



### 1.3.4 数值和布尔值的解构赋值

- 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

  ```js
  let {toString: s} = 123;
  s === Number.prototype.toString // true
  
  let {toString: s} = true;
  s === Boolean.prototype.toString // true
  ```

- 上面代码中，数值和布尔值的包装对象都有`toString`属性，因此变量`s`都能取到值。

- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。

  ```js
  let { prop: x } = undefined; // TypeError
  let { prop: y } = null; // TypeError
  ```

  

### 1.3.5 函数参数的解构赋值

- 函数的参数也可以使用解构赋值。

  ```js
  function add([x, y]){
    return x + y;
  }
  
  add([1, 2]); // 3
  ```

- 上面代码中，函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量`x`和`y`。对于函数内部的代码来说，它们能感受到的参数就是`x`和`y`。



- 函数参数的解构也可以使用默认值。

  ```js
  function move({x = 0, y = 0} = {}) {
    return [x, y];
  }
  
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, 0]
  move({}); // [0, 0]
  move(); // [0, 0]
  ```

- 上面代码中，函数`move`的参数是一个对象，通过对这个对象进行解构，得到变量`x`和`y`的值。如果解构失败，`x`和`y`等于默认值。



### 1.3.6 用途

#### 1.3.6.1 交换变量的值

- 交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

  ```js
  let x = 1;
  let y = 2;
  
  const [x, y] = [y, x];
  ```

  

#### 1.3.6.2 从函数返回多个值

- 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

  ```js
  // 返回一个数组
  
  function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();
  
  // 返回一个对象
  
  function example() {
    return {
      foo: 1,
      bar: 2
    };
  }
  let { foo, bar } = example();
  ```

  

#### 1.3.6.3 函数参数定义

- 解构赋值可以方便地将一组参数与变量名对应起来。

  ```js
  // 参数是一组有次序的值
  function f([x, y, z]) { ... }
  f([1, 2, 3]);
  
  // 参数是一组无次序的值
  function f({x, y, z}) { ... }
  f({z: 3, y: 2, x: 1});
  ```

  

#### 1.3.6.4 提取json数据

- 解构赋值对提取 JSON 对象中的数据，尤其有用。

  ```js
  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  };
  let { id, status, data } = jsonData; //或者 let { id, status, data: number } = jsonData;
  
  
  console.log(id, status, data);
  // 42, "OK", [867, 5309]
  ```



## 1.4 数值的扩展

### 1.4.1 二进制 和 八进制表示法

- ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

  ```javascript
  0b111110111 === 503 // true
  0o767 === 503 // true
  ```

- 从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀`0`表示，ES6 进一步明确，要使用前缀`0o`表示。



- 如果要将`0b`和`0o`前缀的字符串数值转为十进制，要使用`Number`方法。

  ```js
  Number('0b111')  // 7
  Number('0o10')  // 8
  ```

  

### 1.4.2 Number.isFinite(), Number.isNaN() 

- ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。



- `Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。

- 注意，如果参数类型不是数值，`Number.isFinite`一律返回`false`。

  ```js
  Number.isFinite(15); // true
  Number.isFinite(0.8); // true
  Number.isFinite(NaN); // false
  Number.isFinite(Infinity); // false
  Number.isFinite(-Infinity); // false
  Number.isFinite('foo'); // false
  Number.isFinite('15'); // false
  Number.isFinite(true); // false
  ```

  

- `Number.isNaN()`用来检查一个值是否为`NaN`。

- 如果参数类型不是`NaN`，`Number.isNaN`一律返回`false`。

  ```javascript
  Number.isNaN(NaN) // true
  Number.isNaN(15) // false
  Number.isNaN('15') // false
  Number.isNaN(true) // false
  Number.isNaN(9/NaN) // true
  Number.isNaN('true' / 0) // true
  Number.isNaN('true' / 'true') // true
  ```



- 它们与传统的全局方法`isFinite()`和`isNaN()`的区别在于，传统方法先调用`Number()`将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，`Number.isFinite()`对于非数值一律返回`false`, `Number.isNaN()`只有对于`NaN`才返回`true`，非`NaN`一律返回`false`。

  ```js
  isFinite(25) // true
  isFinite("25") // true
  Number.isFinite(25) // true
  Number.isFinite("25") // false
  
  isNaN(NaN) // true
  isNaN("NaN") // true
  Number.isNaN(NaN) // true
  Number.isNaN("NaN") // false
  Number.isNaN(1) // false
  ```

  

### 1.4.3 Number.parseInt(), Number.parseFloat()

- ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。

  ```js
  // ES5的写法
  parseInt('12.34') // 12
  parseFloat('123.45#') // 123.45
  
  // ES6的写法
  Number.parseInt('12.34') // 12
  Number.parseFloat('123.45#') // 123.45
  ```

  

- 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

  ```js
  Number.parseInt === parseInt // true
  Number.parseFloat === parseFloat // true
  ```

  

### 1.4.4 Number.isInteger() 

- `Number.isInteger()`用来判断一个数值是否为整数。

- 注意：JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。

  ```javascript
  Number.isInteger(25) // true
  Number.isInteger(25.1) // false
  ```



- 如果参数不是数值，`Number.isInteger`返回`false`。

  ```js
  Number.isInteger() // false
  Number.isInteger(null) // false
  Number.isInteger('15') // false
  Number.isInteger(true) // false
  ```

  

### 1.4.5 Math 对象的扩展

#### 1.4.5.1 Math.trunc()

- `Math.trunc`方法用于去除一个数的小数部分，返回整数部分。

  ```js
  Math.trunc(4.1) // 4
  Math.trunc(4.9) // 4
  Math.trunc(-4.1) // -4
  Math.trunc(-4.9) // -4
  Math.trunc(-0.1234) // -0
  ```

  

- 对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值。

  ```javascript
  Math.trunc('123.456') // 123
  Math.trunc(true) //1
  Math.trunc(false) // 0
  Math.trunc(null) // 0
  ```



- 对于空值和无法截取整数的值，返回`NaN`。

  ```javascript
  Math.trunc(NaN);      // NaN
  Math.trunc('foo');    // NaN
  Math.trunc();         // NaN
  Math.trunc(undefined) // NaN
  ```



- 对于没有部署这个方法的环境，可以用下面的代码模拟。

  ```javascript
  Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
  ```



#### 1.4.5.2 Math.sign() 

- `Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。它会返回五种值:

  > - 参数为正数，返回`+1`；
  > - 参数为负数，返回`-1`；
  > - 参数为 0，返回`0`；
  > - 参数为-0，返回`-0`;
  > - 其他值，返回`NaN`。

  ```javascript
  Math.sign(-5) // -1
  Math.sign(5) // +1
  Math.sign(0) // +0
  Math.sign(-0) // -0
  Math.sign(NaN) // NaN
  ```

- 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回`NaN`。

  ```javascript
  Math.sign('')  // 0
  Math.sign(true)  // +1
  Math.sign(false)  // 0
  Math.sign(null)  // 0
  Math.sign('9')  // +1
  Math.sign('foo')  // NaN
  Math.sign()  // NaN
  Math.sign(undefined)  // NaN
  ```



- 对于没有部署这个方法的环境，可以用下面的代码模拟。

  ```javascript
  Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  };
  ```



## 1.5 函数扩展

### 1.5.1 函数参数的默认值

- ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```JS
function log(x, y = 'World') {
  console.log(x, y);
}
```



- 下面是另一个例子。

  ```javascript
  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  const p = new Point();
  p // { x: 0, y: 0 }
  ```



- 除了简洁，ES6 的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。



- 使用参数默认值时，函数不能有同名参数。

  ```javascript
  // 不报错
  function foo(x, x, y) {
    // ...
  }
  
  // 报错
  function foo(x, x, y = 1) {
    // ...
  }
  // SyntaxError: Duplicate parameter name not allowed in this context
  ```



- 另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

  ```js
  let x = 99;
  function foo(p = x + 1) {
    console.log(p);
  }
  
  foo() // 100
  
  x = 100;
  foo() // 101
  ```

- 上面代码中，参数`p`的默认值是`x + 1`。这时，每次调用函数`foo`，都会重新计算`x + 1`，而不是默认`p`等于 100。

##### 与解构赋值默认值结合使用

- 参数默认值可以与解构赋值的默认值，结合起来使用。

  ```js
  function foo({x, y = 5}) {
    console.log(x, y);
  }
  
  foo({}) // undefined 5
  foo({x: 1}) // 1 5
  foo({x: 1, y: 2}) // 1 2
  foo() // TypeError: Cannot read property 'x' of undefined
  ```

- 上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数`foo`的参数是一个对象时，变量`x`和`y`才会通过解构赋值生成。如果函数`foo`调用时没提供参数，变量`x`和`y`就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

  ```js
  function foo({x, y = 5} = {}) {
    console.log(x, y);
  }
  
  foo() // undefined 5
  ```



- 指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真。

  ```javascript
  (function (a) {}).length // 1
  (function (a = 5) {}).length // 0
  (function (a, b, c = 5) {}).length // 2
  ```



### 1.5.2 rest 参数

- ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

  ```javascript
  function add(...values) {
    let sum = 0;
  
    for (var val of values) {
      sum += val;
    }
  
    return sum;
  }
  
  add(2, 5, 3) // 10
  ```

- 上面代码的`add`函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。



- 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

  ```javascript
  // 报错
  function f(a, ...b, c) {
    // ...
  }
  ```



- 函数的`length`属性，不包括 rest 参数。

  ```js
  (function(a) {}).length  // 1
  (function(...a) {}).length  // 0
  (function(a, ...b) {}).length  // 1
  ```

  

### 1.5.3 name 属性

- 函数的`name`属性，返回该函数的函数名。

  ```javascript
  function foo() {}
  foo.name // "foo"
  ```

- 这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的`name`属性，会返回空字符串，而 ES6 的`name`属性会返回实际的函数名。

  ```javascript
  var f = function () {};
  
  // ES5
  f.name // ""
  
  // ES6
  f.name // "f"
  ```



- 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的`name`属性都返回这个具名函数原本的名字。

  ```javascript
  const bar = function baz() {};
  
  // ES5
  bar.name // "baz"
  
  // ES6
  bar.name // "baz"
  ```



- `Function`构造函数返回的函数实例，`name`属性的值为`anonymous`。

  ```javascript
  (new Function).name // "anonymous"
  ```

- `bind`返回的函数，`name`属性值会加上`bound`前缀。

  ```javascript
  function foo() {};
  foo.bind({}).name // "bound foo"
  
  (function(){}).bind({}).name // "bound "
  ```



### 1.5.4 箭头函数

- ES6 允许使用“箭头”（`=>`）定义函数。

  ```javascript
  var f = v => v;
  
  // 等同于
  var f = function (v) {
    return v;
  };
  ```

- 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

  ```javascript
  var f = () => 5;
  // 等同于
  var f = function () { return 5 };
  
  var sum = (num1, num2) => num1 + num2;
  // 等同于
  var sum = function(num1, num2) {
    return num1 + num2;
  };
  ```



- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。

  ```javascript
  var sum = (num1, num2) => { return num1 + num2; }
  ```

- 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

  ```javascript
  // 报错
  let getTempItem = id => { id: id, name: "Temp" };
  
  // 不报错
  let getTempItem = id => ({ id: id, name: "Temp" });
  ```



- 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。

  ```javascript
  let fn = () => void doesNotReturn();
  ```



- 箭头函数可以与变量解构结合使用。

  ```javascript
  const full = ({ first, last }) => first + ' ' + last;
  
  // 等同于
  function full(person) {
    return person.first + ' ' + person.last;
  }
  ```



- 箭头函数的一个用处是简化回调函数。

  ```javascript
  // 正常函数写法
  [1,2,3].map(function (x) {
    return x * x;
  });
  
  // 箭头函数写法
  [1,2,3].map(x => x * x);
  ```



- 箭头函数有几个使用注意点：

  > - 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
  > - 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
  > - 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  > - 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。



- `this`对象的指向是可变的，但是在箭头函数中，它是固定的，这种特性很有利于封装回调函数。

- 下面是一个例子，DOM 事件的回调函数封装在一个对象里面。

  ```js
  var handler = {
    id: '123456',
  
    init: function() {
      document.addEventListener('click',
        event => this.doSomething(event.type), false);
    },
  
    doSomething: function(type) {
      console.log('Handling ' + type  + ' for ' + this.id);
    }
  };
  ```

- 上面代码的`init`方法中，使用了箭头函数，这导致这个箭头函数里面的`this`，总是指向`handler`对象。否则，回调函数运行时，`this.doSomething`这一行会报错，因为此时`this`指向`document`对象。

- `this`指向的固定化，并不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。



### 1.5.5 尾调用优化

#### 1.5.5.1 什么是尾调用

- 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

  ```javascript
  function f(x){
    return g(x);
  }
  ```

- 上面代码中，函数`f`的最后一步是调用函数`g`，这就叫尾调用。

- 以下三种情况，都不属于尾调用。

  ```javascript
  // 情况一
  function f(x){
    let y = g(x);
    return y;
  }
  
  // 情况二
  function f(x){
    return g(x) + 1;
  }
  
  // 情况三
  function f(x){
    g(x);
  }
  ```

- 上面代码中，情况一是调用函数`g`之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。

  ```javascript
  function f(x){
    g(x);
    return undefined;
  }
  ```

- 尾调用不一定出现在函数尾部，只要是最后一步操作即可。

  ```javascript
  function f(x) {
    if (x > 0) {
      return m(x)
    }
    return n(x);
  }
  ```

- 上面代码中，函数`m`和`n`都属于尾调用，因为它们都是函数`f`的最后一步操作。

#### 1.5.5.2 尾调用优化

- 尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

- 我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

  ```js
  function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
  }
  f();
  
  // 等同于
  function f() {
    return g(3);
  }
  f();
  
  // 等同于
  g(3);
  ```

  

- 上面代码中，如果函数`g`不是尾调用，函数`f`就需要保存内部变量`m`和`n`的值、`g`的调用位置等信息。但由于调用`g`之后，函数`f`就结束了，所以执行到最后一步，完全可以删除`f(x)`的调用帧，只保留`g(3)`的调用帧。

- 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

- 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

  ```js
  function addOne(a){
    var one = 1;
    function inner(b){
      return b + one;
    }
    return inner(a);
  }
  ```

- 上面的函数不会进行尾调用优化，因为内层函数`inner`用到了外层函数`addOne`的内部变量`one`。

#### 1.5.5.3 尾递归

- 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

- 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

  ```js
  function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  }
  
  factorial(5) // 120
  ```

- 上面代码是一个阶乘函数，计算`n`的阶乘，最多需要保存`n`个调用记录，复杂度 O(n) 。

- 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

  ```js
  function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
  }
  
  factorial(5, 1) // 120
  ```

  

#### 1.5.5.4  递归函数的改写

- 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量`total`，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算`5`的阶乘，需要传入两个参数`5`和`1`？

- 解决办法是：通过一个正常形式的阶乘函数`factorial`，调用尾递归函数`tailFactorial`，看起来就正常多了。

  ```javascript
  function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
  }
  
  function factorial(n) {
    return tailFactorial(n, 1);
  }
  
  factorial(5) // 120
  ```



#### 1.5.5.5 严格模式

- ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

- 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
  - `func.arguments`：返回调用时函数的参数。
  - `func.caller`：返回调用当前函数的那个函数。

- 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

```javascript
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
```



## 1.6 数组的扩展

### 1.6.1 扩展运算符

#### 1.6.1.1 含义

- 扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

  ```js
  console.log(...[1, 2, 3])
  // 1 2 3
  
  console.log(1, ...[2, 3, 4], 5)
  // 1 2 3 4 5
  
  [...document.querySelectorAll('div')]
  // [<div>, <div>, <div>]
  ```

  

- 该运算符主要用于函数调用。

  ```js
  function add(x, y) {
    return x + y;
  }
  
  const numbers = [4, 38];
  add(...numbers) // 42
  ```

  

- 扩展运算符后面还可以放置表达式。

  ```js
  const arr = [
    ...(x > 0 ? ['a'] : []),
    'b',
  ];
  ```

  

- 注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

  ```js
  (...[1, 2]) // Uncaught SyntaxError: Unexpected number
  
  console.log((...[1, 2])) // Uncaught SyntaxError: Unexpected number
  
  console.log(...[1, 2]) // 1 2
  ```

  ##### 

#### 1.6.1.2 替代函数的 apply 方法

- 下面是扩展运算符取代`apply`方法的一个实际的例子，应用`Math.max`方法，简化求出一个数组最大元素的写法。

- 由于 JavaScript 不提供求数组最大元素的函数，所以只能套用`Math.max`函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用`Math.max`了。

  ```js
  // ES5 的写法
  Math.max.apply(null, [14, 3, 77])
  
  // ES6 的写法
  Math.max(...[14, 3, 77])
  
  // 等同于
  Math.max(14, 3, 77);
  ```

  

- 另一个例子是通过`push`函数，将一个数组添加到另一个数组的尾部。如果不使用扩展运算符直接push那数组的最后一项将是一个数组，只有通过扩展运算符展开才能将每一项都添加到数组中。

  ```js
  let arr1 = [0, 1, 2];
  let arr2 = [3, 4, 5];
  arr1.push(...arr2);
  ```

  

#### 1.6.1.3 应用

##### 1. 复制数组

- 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

- 扩展运算符提供了复制数组的简便写法。

  ```javascript
  const a1 = [1, 2];
  // 写法一
  const a2 = [...a1];
  // 写法二
  const [...a2] = a1;
  ```

- 上面的两种写法，`a2`都是`a1`的克隆。



##### 2. 合并数组

- 扩展运算符提供了数组合并的新写法。不过，这两种方法都是浅拷贝，使用的时候需要注意。

  ```javascript
  const arr1 = ['a', 'b'];
  const arr2 = ['c'];
  const arr3 = ['d', 'e'];
  
  // ES5 的合并数组
  arr1.concat(arr2, arr3);
  // [ 'a', 'b', 'c', 'd', 'e' ]
  
  // ES6 的合并数组
  [...arr1, ...arr2, ...arr3]
  // [ 'a', 'b', 'c', 'd', 'e' ]
  ```

- `a3`和`a4`是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了原数组的成员，会同步反映到新数组。

  ```javascript
  const a1 = [{ foo: 1 }];
  const a2 = [{ bar: 2 }];
  
  const a3 = a1.concat(a2);
  const a4 = [...a1, ...a2];
  
  a3[0] === a1[0] // true
  a4[0] === a1[0] // true
  ```



##### 3. 与解构赋值结合

- 扩展运算符可以与解构赋值结合起来，用于生成数组。

  ```javascript
  // ES5
  a = list[0], rest = list.slice(1)
  // ES6
  [a, ...rest] = list
  
  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]
  
  const [first, ...rest] = [];
  first // undefined
  rest  // []
  
  const [first, ...rest] = ["foo"];
  first  // "foo"
  rest   // []
  ```



- 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

  ```javascript
  const [...butLast, last] = [1, 2, 3, 4, 5];
  // 报错
  
  const [first, ...middle, last] = [1, 2, 3, 4, 5];
  // 报错
  ```



##### 4. 字符串

- 扩展运算符还可以将字符串转为真正的数组。

  ```javascript
  [...'hello'] // [ "h", "e", "l", "l", "o" ]
  ```



##### 5.实现了 Iterator 接口的对象

- 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

  ```javascript
  let nodeList = document.querySelectorAll('div');
  let array = [...nodeList];
  ```

- 上面代码中，`querySelectorAll`方法返回的是一个`NodeList`对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于`NodeList`对象实现了 Iterator 。



##### 6. Map 和 Set 结构，Generator 函数

- 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

  ```javascript
  let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);
  
  let arr = [...map.keys()]; // [1, 2, 3]
  ```



- Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

  ```javascript
  const go = function*(){
    yield 1;
    yield 2;
    yield 3;
  };
  
  [...go()] // [1, 2, 3]
  ```

- 上面代码中，变量`go`是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。



- 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

  ```javascript
  const obj = {a: 1, b: 2};
  let arr = [...obj]; // TypeError: Cannot spread non-iterable object
  ```



### 1.6.2 Array.from()

- `Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。



- 下面是一个类似数组的对象，`Array.from`将它转为真正的数组。

  ```javascript
  let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
  };
  
  // ES5的写法
  var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
  
  // ES6的写法
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  ```



- 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。

  ```javascript
  // NodeList对象
  let ps = document.querySelectorAll('p');
  Array.from(ps).filter(p => {
    return p.textContent.length > 100;
  });
  
  // arguments对象
  function foo() {
    var args = Array.from(arguments);
    // ...
  }
  ```



- 只要是部署了 Iterator 接口的数据结构，`Array.from`都能将其转为数组。

  ```javascript
  Array.from('hello')
  // ['h', 'e', 'l', 'l', 'o']
  
  let namesSet = new Set(['a', 'b'])
  Array.from(namesSet) // ['a', 'b']
  ```



- 值得提醒的是，扩展运算符（`...`）也可以将某些数据结构转为数组。

  ```javascript
  // arguments对象
  function foo() {
    const args = [...arguments];
  }
  
  // NodeList对象
  [...document.querySelectorAll('div')]
  ```

- 扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。

- `Array.from`方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。因此，任何有`length`属性的对象，都可以通过`Array.from`方法转为数组，而此时扩展运算符就无法转换。

  ```javascript
  Array.from({ length: 3 });
  // [ undefined, undefined, undefined ]
  ```



- `Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

  ```javascript
  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);
  
  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  ```



- 如果`map`函数里面用到了`this`关键字，还可以传入`Array.from`的第三个参数，用来绑定`this`。



### 1.6.3 Array.of()

- `Array.of`方法用于将一组值，转换为数组。

  ```javascript
  Array.of(3, 11, 8) // [3,11,8]
  Array.of(3) // [3]
  Array.of(3).length // 1
  ```

- 这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。

- `Array`方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

  ```javascript
  Array() // []
  Array(3) // [, , ,]
  Array(3, 11, 8) // [3, 11, 8]
  ```



### 1.6.4 数组实例的 find() 和 findIndex()

- 数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

- `find`方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

  ```javascript
  [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
  }) // 10
  ```



- 数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`

  ```javascript
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```



- 这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

  ```javascript
  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  ```



- 另外，这两个方法都可以发现`NaN`，弥补了数组的`indexOf`方法的不足。

- `indexOf`方法无法识别数组的`NaN`成员，但是`findIndex`方法可以借助`Object.is`方法做到。

  ```javascript
  [NaN].indexOf(NaN)
  // -1
  
  [NaN].findIndex(y => Object.is(NaN, y))
  // 0
  ```



### 1.6.5 数组实例的 fill()

- `fill`方法使用给定值，填充一个数组

- `fill`方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

  ```javascript
  ['a', 'b', 'c'].fill(7) // [7, 7, 7]
  new Array(3).fill(7) // [7, 7, 7]
  ```

- `fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

  ```javascript
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
  ```



> 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。



### 1.6.6 数组实例的 entries()，keys() 和 values()

- ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用`for...of`循环进行遍历，唯一的区别是：

- `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

  ```javascript
  for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  // 0
  // 1
  
  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'
  
  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  // 1 "b"
  ```



### 1.6.7 数组实例的 includes()

- `Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。ES2016 引入了该方法。

  ```javascript
  [1, 2, 3].includes(2)     // true
  [1, 2, 3].includes(4)     // false
  [1, 2, NaN].includes(NaN) // true
  ```



- 该方法的第二个参数表示搜索的起始位置，默认为`0`。

- 如果第二个参数为负数，则表示倒数的位置，如果`这时`它大于数组长度（比如第二个参数为`-4`，但数组长度为`3`），则会重置为从`0`开始。

- 如果起始位置等于数组长度，则为false。

  ```javascript
  [1, 2, 3].includes(3, 4);  // false 不会重置，只有负数会
  [1, 2, 3].includes(3, -4);  // true
  [1, 2, 3].includes(3, -1); // true
  ```

- 没有该方法之前，我们通常使用数组的`indexOf`方法，检查是否包含某个值。

  ```javascript
  if (arr.indexOf(el) !== -1) {
    // ...
  }
  ```

- `indexOf`方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于`-1`，表达起来不够直观。二是，它内部使用严格相等运算符（`===`）进行判断，这会导致对`NaN`的误判。

  ```javascript
  [NaN].includes(NaN) // true
  ```



### 1.6.8 数组的空位

- 数组的空位指，数组的某一个位置没有任何值。比如，`Array`构造函数返回的数组都是空位。

  ```javascript
  Array(3) // [, , ,]
  ```



- 注意，空位不是`undefined`，一个位置的值等于`undefined`，依然是有值的。空位是没有任何值



- ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

  > - `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。
  > - `map()`会跳过空位，但会保留这个值
  > - `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串



- ES6 则是明确将空位转为`undefined`。



- `Array.from`方法会将数组的空位，转为`undefined`，也就是说，这个方法不会忽略空位。

  ```javascript
  Array.from(['a',,'b'])
  // [ "a", undefined, "b" ]
  ```



- 扩展运算符（`...`）也会将空位转为`undefined`。

  ```javascript
  [...['a',,'b']]
  // [ "a", undefined, "b" ]
  ```



- `copyWithin()`会连空位一起拷贝。

  ```javascript
  [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
  ```



- `fill()`会将空位视为正常的数组位置。

  ```javascript
  new Array(3).fill('a') // ["a","a","a"]
  ```



- `for...of`循环也会遍历空位。

  ```javascript
  let arr = [, ,];
  for (let i of arr) {
    console.log(1);
  }
  // 1
  // 1
  ```



- `entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`。

  ```javascript
  // entries()
  [...[,'a'].entries()] // [[0,undefined], [1,"a"]]
  
  // keys()
  [...[,'a'].keys()] // [0,1]
  
  // values()
  [...[,'a'].values()] // [undefined,"a"]
  
  // find()
  [,'a'].find(x => true) // undefined
  
  // findIndex()
  [,'a'].findIndex(x => true) // 0
  ```



## 1.7 对象的扩展



### 1.7.1 属性的简介表示法

- ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

  ```javascript
  const foo = 'bar';
  const baz = {foo};
  baz // {foo: "bar"}
  
  // 等同于
  const baz = {foo: foo};
  ```



- 除了属性简写，方法也可以简写。

  ```javascript
  const o = {
    method() {
      return "Hello!";
    }
  };
  
  // 等同于
  
  const o = {
    method: function() {
      return "Hello!";
    }
  };
  ```



### 1.7.2 属性名表达式

- JavaScript 定义对象的属性，有两种方法。

  ```javascript
  // 方法一
  obj.foo = true;
  
  // 方法二
  obj['a' + 'bc'] = 123;
  ```



- 但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

  ```javascript
  var obj = {
    foo: true,
    abc: 123
  };
  ```

- ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

  ```javascript
  let propKey = 'foo';
  
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  ```



- 表达式还可以用于定义方法名。

  ```javascript
  let obj = {
    ['h' + 'ello']() {
      return 'hi';
    }
  };
  
  obj.hello() // hi
  ```



- 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`，这一点要特别小心。

  ```javascript
  const keyA = {a: 1};
  const keyB = {b: 2};
  
  const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
  };
  
  myObject // Object {[object Object]: "valueB"}
  ```

- `[keyA]`和`[keyB]`得到的都是`[object Object]`，所以`[keyB]`会把`[keyA]`覆盖掉，而`myObject`最后只有一个`[object Object]`属性。



### 1.7.3 super 关键字

- 我们知道，`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。

  ```javascript
  const proto = {
    foo: 'hello'
  };
  
  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };
  
  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
  ```

- 上面代码中，对象`obj.find()`方法之中，通过`super.foo`引用了原型对象`proto`的`foo`属性。



- 注意，`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

  ```javascript
  // 报错
  const obj = {
    foo: super.foo
  }
  
  // 报错
  const obj = {
    foo: () => super.foo
  }
  
  // 报错
  const obj = {
    foo: function () {
      return super.foo
    }
  }
  ```

- 第一种写法是`super`用在属性里面，第二种和第三种写法是`super`用在一个函数里面，然后赋值给`foo`属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。



### 1.7.4 对象的扩展运算符

#### 1.7.4.1 解构赋值

- 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

  ```javascript
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
  x // 1
  y // 2
  z // { a: 3, b: 4 }
  ```



- 解构赋值必须是最后一个参数，否则会报错。

  ```javascript
  let { ...x, y, z } = someObject; // 句法错误
  let { x, ...y, ...z } = someObject; // 句法错误
  ```



#### 1.7.4.2 扩展运算符

- 对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

  ```javascript
  let z = { a: 3, b: 4 };
  let n = { ...z };
  n // { a: 3, b: 4 }
  ```



- 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。

  ```javascript
  let foo = { ...['a', 'b', 'c'] };
  foo
  // {0: "a", 1: "b", 2: "c"}
  ```



- 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象。

  ```javascript
  {...'hello'}
  // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
  ```



- 对象的扩展运算符等同于使用`Object.assign()`方法。

  ```javascript
  let aClone = { ...a };
  // 等同于
  let aClone = Object.assign({}, a);
  ```



- 扩展运算符可以用于合并两个对象。

  ```javascript
  let ab = { ...a, ...b };
  // 等同于
  let ab = Object.assign({}, a, b);
  ```



- 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

  ```javascript
  let aWithOverrides = { ...a, x: 1, y: 2 };
  ```



- 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

  ```javascript
  const obj = {
    ...(x > 1 ? {a: 1} : {}),
    b: 2,
  };
  ```



- 扩展运算符的参数对象之中，如果有取值函数`get`，这个函数是会执行的。

  ```javascript
  // 并不会抛出错误，因为 x 属性只是被定义，但没执行
  let aWithXGetter = {
    ...a,
    get x() {
      throw new Error('not throw yet');
    }
  };
  
  // 会抛出错误，因为 x 属性被执行了
  let runtimeError = {
    ...a,
    ...{
      get x() {
        throw new Error('throw now');
      }
    }
  };
  ```

​	

## 1.8 对象新增的方法

### 1.8.1 Object.is()

- ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等

- ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

  ```javascript
  Object.is('foo', 'foo')
  // true
  Object.is({}, {})
  // false
  ```

- 不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。

  ```javascript
  +0 === -0 //true
  NaN === NaN // false
  
  Object.is(+0, -0) // false
  Object.is(NaN, NaN) // true
  ```



### 1.8.2 Object.assign()



















