### 1.1.1 全局环境下

- 在全局环境下，`this` 始终指向全局对象（window）, 无论是否严格模式；

```js
// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true
```



### 1.1.2 上下文调用

#### 1.1.2.1 函数直接调用

- 普通函数内部的this分两种情况，严格模式和非严格模式。非严格模式下，this 默认指向全局对象window

```js
function f1(){
  return this;
}
f1() === window; // true
```

- 而严格模式下， this为undefined

```js
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}
f2() === undefined; // true
```



#### 1.1.2.2 对象中的 this

- 对象内部方法的this指向调用这些方法的对象

> - 函数的定义位置不影响其this指向，this指向只和调用函数的对象有关。
> - 多层嵌套的对象，内部方法的this指向被调用函数最近的对象（window也是对象，其内部对象调用方法的this指向内部对象， 而非window）。

```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
console.log(o.f());  //37	指向 o
var a = o.f;
console.log(a());  //undefined
```

```js
var o = {prop: 37};
function independent() {
  return this.prop;
}
o.f = independent;
console.log(o.f()); // logs 37 指向 o

o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // logs 42  指向 o.b
```

#### 1.1.2.3 原型链中 this

- 原型链中的方法的this仍然指向调用它的对象

```js
var o = {
  f : function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

- 以上代码，可以看出， 在p中没有属性f，当执行p.f()时，会查找p的原型链，找到 f 函数并执行，但这与函数内部this指向对象 p 没有任何关系，只需记住谁调用指向谁。

#### 1.1.2.4 构造函数中 this

- 构造函数中的this与被创建的新对象绑定。

> 注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this。

```js
function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37


function C2(){
  this.a = 37;
  return {a:38};
}

var b = new C2();
console.log(b.a); // logs 38  手动设置了返回值，因此，值为 38

function C2() {
    this.a = 37;
    return "aaa";
}

var b = new C2();
console.log(b.a); // logs 37  返回值不是对象，默认返回他his，因此，值为 37
```

#### 1.1.2.5 call & applay

- 当函数通过Function对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的this值可绑定到 call() & apply() 方法指定的第一个对象上， 如果第一个参数不是对象，JavaScript内部会尝试将其转换成对象然后指向它。

```js
function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

#### 1.1.2.6 bind

- 通过bind方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。

```js
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o = {a:37, f:f, g:g};
console.log(o.f(), o.g()); // 37, azerty

```

- 以上代码，`o.f()` 正常的this指向调用他的对象 o ，`o.g()` 值就为 `bind` 绑定的 a 属性了

#### 1.1.2.7 DOM事件处理函数

- 事件处理函数内部的 this 指向触发这个事件的对象

```js
var oBox = document.getElementById('box');
oBox.onclick = function () {
    console.log(this)   //oBox
}

```

#### 1.1.2.8 setTimeout & setInterval

- 对于延时函数内部的回调函数的this指向全局对象window（当然我们可以通过bind方法改变其内部函数的this指向）

```js
//默认情况下代码
function Person() {  
    this.age = 0;  
    setTimeout(function() {
        console.log(this);
    }, 3000);
}

var p = new Person();//3秒后返回 window 对象
==============================================
//通过bind绑定
function Person() {  
    this.age = 0;  
    setTimeout((function() {
        console.log(this);
    }).bind(this), 3000);
}

var p = new Person();//3秒后返回构造函数新生成的对象 Person{...}

```



#### 1.1.2.9 箭头函数中的 this

- 由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，
  - 所以 `call() / apply() / bind()` 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
  - 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）

```js
function Person() {  
    setInterval(() => {
        console.log(this)	//Person
    }, 3000);
}

var p = new Person();

```

- 以上 this 指向 Person

```js
let a = ()=> {
  console.log(this)
}
a()

```

- 以上代码 this 指向 window