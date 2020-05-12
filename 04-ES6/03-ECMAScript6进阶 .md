# 一、Generator 函数

## 1.1 简介

### 1.1.1 基本概念

- Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

- Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

- 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

- 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

  ```javascript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
  var hw = helloWorldGenerator();
  ```

  - 上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

- Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

- 下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

  ```javascript
  hw.next() // { value: 'hello', done: false }
  
  hw.next() // { value: 'world', done: false }
  
  hw.next() // { value: 'ending', done: true }
  
  hw.next() // { value: undefined, done: true }
  ```

- 第一次调用，Generator 函数开始执行，直到遇到第一个`yield`表达式为止。`next`方法返回一个对象，它的`value`属性就是当前`yield`表达式的值`hello`，`done`属性的值`false`，表示遍历还没有结束。

- 第二次调用，Generator 函数从上次`yield`表达式停下的地方，一直执行到下一个`yield`表达式。`next`方法返回的对象的`value`属性就是当前`yield`表达式的值`world`，`done`属性的值`false`，表示遍历还没有结束。

- 第三次调用，Generator 函数从上次`yield`表达式停下的地方，一直执行到`return`语句（如果没有`return`语句，就执行到函数结束）。`next`方法返回的对象的`value`属性，就是紧跟在`return`语句后面的表达式的值（如果没有`return`语句，则`value`属性的值为`undefined`），`done`属性的值`true`，表示遍历已经结束。

- 第四次调用，此时 Generator 函数已经运行完毕，`next`方法返回对象的`value`属性为`undefined`，`done`属性为`true`。以后再调用`next`方法，返回的都是这个值。

  > - 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。



- ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

  ```javascript
  function * foo(x, y) { ··· }
  function *foo(x, y) { ··· }
  function* foo(x, y) { ··· }
  function*foo(x, y) { ··· }
  ```

- 由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在`function`关键字后面。本书也采用这种写法。



### 1.1.2 yield 表达式

- 由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

- 遍历器对象的`next`方法的运行逻辑如下：

  > 1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
  >
  > 2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。
  >
  > 3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
  >
  > 4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。



- 需要注意的是，`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

  ```javascript
  function* gen() {
    yield 123 + 456;
  }
  console.log(gen().next()); // {value: 579, done: false}
  ```

  - 上面代码中，`yield`后面的表达式`123 + 456`，不会立即求值，只会在`next`方法将指针移到这一句时，才会求值。



- Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。



- Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

  ```javascript
  function* f() {
    console.log('执行了！')
  }
  
  var generator = f();
  
  setTimeout(function () {
    generator.next()
  }, 2000);
  ```

  - 上面代码中，函数`f`如果是普通函数，在为变量`generator`赋值时就会执行。但是，函数`f`是一个 Generator 函数，就变成只有调用`next`方法时，函数`f`才会执行。



- `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

  ```javascript
  function* demo() {
    console.log('Hello' + yield 123); // SyntaxError
  
    console.log('Hello' + (yield 123)); // OK
  }
  ```



- `yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

  ```javascript
  function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
  }
  ```



### 1.1.3 与 Iterator 接口的关系

- 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。

  ```javascript
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  
  [...myIterable] // [1, 2, 3]
  ```



- Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

  ```javascript
  function* gen(){
    // some code
  }
  
  var g = gen();
  
  g[Symbol.iterator]() === g // true
  ```



## 1.2 next 方法的参数

- `yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

  ```javascript
  function* f() {
    for(var i = 0; true; i++) {
      var reset = yield i; // 当传入 true时 值为 true
      if(reset) { i = -1; }
    }
  }
  
  var g = f();
  
  g.next() // { value: 0, done: false }
  g.next() // { value: 1, done: false }
  g.next(true) // { value: 0, done: false }
  ```

  - 上面代码先定义了一个可以无限运行的 Generator 函数`f`，如果`next`方法没有参数，每次运行到`yield`表达式，变量`reset`的值总是`undefined`。当`next`方法带一个参数`true`时，变量`reset`就被重置为这个参数（即`true`），因此`i`会等于`-1`，下一轮循环就会从`-1`开始递增。

- 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。



## 1.3 for...of 循环

- `for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。

  ```javascript
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  
  for (let v of foo()) {
    console.log(v);
  }
  // 1 2 3 4 5
  ```

- 上面代码使用`for...of`循环，依次显示 5 个`yield`表达式的值。这里需要注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`6`，不包括在`for...of`循环之中



- 除了`for...of`循环以外，扩展运算符（`...`）、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

  ```javascript
  function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
  }
  
  // 扩展运算符
  [...numbers()] // [1, 2]
  
  // Array.from 方法
  Array.from(numbers()) // [1, 2]
  
  // 解构赋值
  let [x, y] = numbers();
  x // 1
  y // 2
  
  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }
  // 1
  // 2
  ```



## 1.4 Generator.prototype.throw()

## 1.5 Generator.prototype.return()

## 1.6 next()、throw()、return() 的共同点

## 1.7 yield* 表达式

- 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。如果有多个 Generator 函数嵌套，写起来就非常麻烦。

  ```javascript
  function* foo() {
    yield 'a';
    yield 'b';
  }
  
  function* bar() {
    yield 'x';
    // 手动遍历 foo()
    for (let i of foo()) {
      console.log(i);
    }
    yield 'y';
  }
  
  for (let v of bar()){
    console.log(v);
  }
  // x a b y
  ```



- ES6 提供了`yield*`表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。

  ```javascript
  function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
  }
  
  // 等同于
  function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
  }
  
  // 等同于
  function* bar() {
    yield 'x';
    for (let v of foo()) {
      yield v;
    }
    yield 'y';
  }
  
  for (let v of bar()){
    console.log(v); // "x" "a" "b" "y"
  }
  ```



## 1.8 作为对象属性的 Generator 函数

## 1.9 Generator 函数的this

## 2.0 含义

## 2.1 应用





# 三、Class 的基本语法



## 1.1 简介

### 1.1.1 类的由来

- JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

  ```javascript
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
  };
  
  var p = new Point(1, 2);
  ```

- 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

- ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过`class`关键字，可以定义类。

- 基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样：

  ```javascript
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  ```

- 上面代码定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5 的构造函数`Point`，对应 ES6 的`Point`类的构造方法（constructor）。
- `Point`类除了构造方法，还定义了一个`toString`方法。即为定义在原型上的方法。

- 使用的时候，也是直接对类使用`new`命令，跟构造函数的用法完全一致。

  ```js
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  var b = new Bar('hello','world');
  b.toString() // "hello,world"
  ```



- 构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

  ```js
  class Point {
    constructor() {
      // ...
    }
  
    toString() {
      // ...
    }
  }
  
  // 等同于
  
  Point.prototype = {
    constructor() {},
    toString() {}
  };
  ```



- 在类的实例上面调用方法，其实就是调用原型上的方法。

  ```javascript
  class B {}
  let b = new B();
  
  b.constructor === B.prototype.constructor // true
  ```

- 上面代码中，`b`是`B`类的实例，它的`constructor`方法就是`B`类原型的`constructor`方法。



- 由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

  ```javascript
  class Point {
    constructor(){
      // ...
    }
  }
  
  Object.assign(Point.prototype, {
    toString(){},
    toValue(){}
  });
  ```



- `prototype`对象的`constructor`属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

  ```javascript
  Point.prototype.constructor === Point // true
  ```



- 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

  ```javascript
  class Point {
    constructor(x, y) {
      // ...
    }
  
    toString() {
      // ...
    }
  }
  
  Object.keys(Point.prototype) // []
  Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
  ```

- 上面代码中，`toString`方法是`Point`类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。

  ```javascript
  var Point = function (x, y) {
    // ...
  };
  
  Point.prototype.toString = function() {
    // ...
  };
  
  Object.keys(Point.prototype) // ["toString"]
  Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
  ```

- 上面代码采用 ES5 的写法，`toString`方法就是可枚举的。



### 1.1.2 constructor 方法

- `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。



- `constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

  ```javascript
  class Foo {
    constructor() {
      return Object.create(null);
    }
  }
  
  new Foo() instanceof Foo
  // false
  ```

- 上面代码中，`constructor`函数返回一个全新的对象，结果导致实例对象不是`Foo`类的实例。



### 1.1.3 类的实例

- 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

  ```javascript
  //定义类
  class Point {
  
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  
  }
  
  var point = new Point(2, 3);
  
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```

- 上面代码中，`x`和`y`都是实例对象`point`自身的属性（因为定义在`this`变量上），所以`hasOwnProperty`方法返回`true`，而`toString`是原型对象的属性（因为定义在`Point`类上），所以`hasOwnProperty`方法返回`false`。这些都与 ES5 的行为保持一致。



- 与 ES5 一样，类的所有实例共享一个原型对象。

  ```javascript
  var p1 = new Point(2,3);
  var p2 = new Point(3,2);
  
  p1.__proto__ === p2.__proto__ //true
  ```

- 上面代码中，`p1`和`p2`都是`Point`的实例，它们的原型都是`Point.prototype`，所以`__proto__`属性是相等的。



### 1.1.4 取值函数（getter）和存值函数（setter）

- 与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

  ```javascript
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
  
  let inst = new MyClass();
  
  inst.prop = 123; // setter: 123
  
  inst.prop // 'getter'
  ```

- 上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。



- 存值函数和取值函数是设置在属性的 Descriptor 对象上的。

  ```javascript
  class CustomHTMLElement {
    constructor(element) {
      this.element = element;
    }
  
    get html() {
      return this.element.innerHTML;
    }
  
    set html(value) {
      this.element.innerHTML = value;
    }
  }
  
  var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
  );
  
  "get" in descriptor  // true
  "set" in descriptor  // true
  ```

- 上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与 ES5 完全一致。



### 1.1.5 Class 表达式

- 与函数一样，类也可以使用表达式的形式定义。

  ```javascript
  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };
  ```

- 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用。

  ```javascript
  let inst = new MyClass();
  inst.getClassName() // Me
  Me.name // ReferenceError: Me is not defined
  ```

- 上面代码表示，`Me`只在 Class 内部有定义。如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式。

  ```javascript
  const MyClass = class { /* ... */ };
  ```

- 采用 Class 表达式，可以写出立即执行的 Class。

  ```javascript
  let person = new class {
    constructor(name) {
      this.name = name;
    }
  
    sayName() {
      console.log(this.name);
    }
  }('张三');
  
  person.sayName(); // "张三"
  ```

- 上面代码中，`person`是一个立即执行的类的实例。



### 1.1.6 注意点



#### 1.1.6.1 严格模式

- 类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。



#### 1.1.6.2 不存在提升

- 类不存在变量提升（hoist），这一点与 ES5 完全不同

  ```javascript
  new Foo(); // ReferenceError
  class Foo {}
  ```

- 上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。



#### 1.1.6.3 name 属性

- 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。

  ```javascript
  class Point {}
  Point.name // "Point"
  ```



#### 1.1.6.4 Generator 方法

- 如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。

  ```javascript
  class Foo {
    constructor(...args) {
      this.args = args;
    }
    * [Symbol.iterator]() {
      for (let arg of this.args) {
        yield arg;
      }
    }
  }
  
  for (let x of new Foo('hello', 'world')) {
    console.log(x);
  }
  // hello
  // world
  ```

- 上面代码中，`Foo`类的`Symbol.iterator`方法前有一个星号，表示该方法是一个 Generator 函数。`Symbol.iterator`方法返回一个`Foo`类的默认遍历器，`for...of`循环会自动调用这个遍历器。



#### 1.1.6.5 this 的指向

- 类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

  ```javascript
  class Logger {
    printName(name = 'there') {
      this.print(`Hello ${name}`);
    }
  
    print(text) {
      console.log(text);
    }
  }
  
  const logger = new Logger();
  const { printName } = logger;
  printName(); // TypeError: Cannot read property 'print' of undefined
  ```

  - 上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

- 一个比较简单的解决方法是，在构造方法中绑定`this`，这样就不会找不到`print`方法了。

  ```javascript
  class Logger {
    constructor() {
      this.printName = this.printName.bind(this);
    }
  
    // ...
  }
  ```

- 另一种解决方法是使用箭头函数。

  ```javascript
  class Obj {
    constructor() {
      this.getThis = () => this;
    }
  }
  
  const myObj = new Obj();
  myObj.getThis() === myObj // true
  ```

  - 箭头函数内部的`this`总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以`this`会总是指向实例对象。



## 1.2 静态方法

- 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

  ```javascript
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function
  ```

  - 上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

- 注意，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

  ```javascript
  class Foo {
    static bar() {
      this.baz();
    }
    static baz() {
      console.log('hello');
    }
    baz() {
      console.log('world');
    }
  }
  
  Foo.bar() // hello
  ```

  - 上面代码中，静态方法`bar`调用了`this.baz`，这里的`this`指的是`Foo`类，而不是`Foo`的实例，等同于调用`Foo.baz`。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。



- 父类的静态方法，可以被子类继承。

  ```javascript
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
  }
  
  Bar.classMethod() // 'hello'
  ```

  - 上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。



- 静态方法也是可以从`super`对象上调用的。注意：super 指向父类的this。

  ```javascript
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
    static classMethod() {
      return super.classMethod() + ', too';
    }
  }
  
  Bar.classMethod() // "hello, too"
  ```



## 1.3 实例属性的新写法

- 实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层。

  ```javascript
  class IncreasingCounter {
    constructor() {
      this._count = 0;
    }
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
  ```
  - 上面代码中，实例属性`this._count`定义在`constructor()`方法里面。另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。

  ```javascript
  class IncreasingCounter {
    _count = 0;
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
  ```
  - 上面代码中，实例属性`_count`与取值函数`value()`和`increment()`方法，处于同一个层级。这时，不需要在实例属性前面加上`this`。
  - 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。另外，写起来也比较简洁。



## 1.4 静态属性

- 静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

  ```javascript
  class Foo {
  }
  
  Foo.prop = 1;
  Foo.prop // 1
  ```

- 目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个[提案](https://github.com/tc39/proposal-class-fields)提供了类的静态属性，写法是在实例属性法的前面，加上`static`关键字。这个新写法大大方便了静态属性的表达。

  ```javascript
  class MyClass {
    static myStaticProp = 42;
  
    constructor() {
      console.log(MyClass.myStaticProp); // 42
    }
  }
  ```

## 1.5私有方法和私有属性



## 1.6 new.target 属性











































































































































