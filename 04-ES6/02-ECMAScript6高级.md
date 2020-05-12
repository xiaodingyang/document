

## 1.1 Symbol

### 1.1.1 概述

- ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因

- ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

- Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

  ```javascript
  let s = Symbol();
  
  typeof s // "symbol"
  ```

- 注意，`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。



- `Symbol`函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

  ```javascript
  let s1 = Symbol('foo');
  let s2 = Symbol('bar');
  
  s1 // Symbol(foo)
  s2 // Symbol(bar)
  
  s1.toString() // "Symbol(foo)"
  s2.toString() // "Symbol(bar)"
  ```



- 如果 Symbol 的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个 Symbol 值。

  ```javascript
  const obj = {
    toString() {
      return 'abc';
    }
  };
  const sym = Symbol(obj);
  sym // Symbol(abc)
  ```



- 注意，`Symbol`函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的`Symbol`函数的返回值是不相等的。

  ```javascript
  // 没有参数的情况
  let s1 = Symbol();
  let s2 = Symbol();
  
  s1 === s2 // false
  
  // 有参数的情况
  let s1 = Symbol('foo');
  let s2 = Symbol('foo');
  
  s1 === s2 // false
  ```



### 1.1.2 Symbol.prototype.description

- 创建 Symbol 的时候，可以添加一个描述。

  ```javascript
  const sym = Symbol('foo');
  ```

- 上面代码中，`sym`的描述就是字符串`foo`。但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。

  ```javascript
  const sym = Symbol('foo');
  
  String(sym) // "Symbol(foo)"
  sym.toString() // "Symbol(foo)"
  ```

- 上面的用法不是很方便。[ES2019](https://github.com/tc39/proposal-Symbol-description) 提供了一个实例属性`description`，直接返回 Symbol 的描述。

  ```javascript
  const sym = Symbol('foo');
  
  sym.description // "foo"
  ```



### 1.1.3 作为属性名的 Symbol

- 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

  ```javascript
  let mySymbol = Symbol();
  
  // 第一种写法
  let a = {};
  a[mySymbol] = 'Hello!';
  
  // 第二种写法
  let a = {
    [mySymbol]: 'Hello!'
  };
  
  // 第三种写法
  let a = {};
  Object.defineProperty(a, mySymbol, { value: 'Hello!' });
  
  // 以上写法都得到同样结果
  a[mySymbol] // "Hello!"
  ```

- 上面代码通过方括号结构和`Object.defineProperty`，将对象的属性名指定为一个 Symbol 
- 注意，Symbol 值作为对象属性名时，不能用点运算符。

- 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

  ```javascript
  let s = Symbol();
  
  let obj = {
    [s]: function (arg) { ... }
  };
  
  obj[s](123);
  ```



- Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

  ```javascript
  const COLOR_RED    = Symbol();
  const COLOR_GREEN  = Symbol();
  
  function getComplement(color) {
    switch (color) {
      case COLOR_RED:
        return COLOR_GREEN;
      case COLOR_GREEN:
        return COLOR_RED;
      default:
        throw new Error('Undefined color');
      }
  }
  ```



### 1.1.4 属性名的遍历

- Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有 Symbol 属性名。

  `Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

  ```javascript
  const obj = {};
  let a = Symbol('a');
  let b = Symbol('b');
  
  obj[a] = 'Hello';
  obj[b] = 'World';
  
  const objectSymbols = Object.getOwnPropertySymbols(obj) // [Symbol(a), Symbol(b)]
  ```



- 另一个新的 API，`Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

  ```javascript
  let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  
  Reflect.ownKeys(obj)
  //  ["enum", "nonEnum", Symbol(my_key)]
  ```



## 1.2 Set 和 Map 数据结构



### 1.2.1 Set

#### 1.2.1.1 基本用法

- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

- `Set`本身是一个构造函数，用来生成 Set 数据结构。

  ```javascript
  const s = new Set();
  
  [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
  
  for (let i of s) {
    console.log(i);
  }
  // 2 3 5 4
  ```

- 上面代码通过`add()`方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。



- `Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

  ```javascript
  // 例一
  const set = new Set([1, 2, 3, 4, 4]);
  [...set]
  // [1, 2, 3, 4]
  
  // 例二
  const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
  items.size // 5
  
  // 例三
  const set = new Set(document.querySelectorAll('div'));
  set.size // 56
  
  // 类似于
  const set = new Set();
  document
   .querySelectorAll('div')
   .forEach(div => set.add(div));
  set.size // 56
  ```

- 上面代码中，例一和例二都是`Set`函数接受数组作为参数，例三是接受类似数组的对象作为参数。



- 上面代码也展示了一种去除数组重复成员的方法。

  ```javascript
  // 去除数组的重复成员
  [...new Set(array)]
  ```



- 上面的方法也可以用于，去除字符串里面的重复字符。

  ```javascript
  [...new Set('ababbc')].join('')
  // "abc"
  ```



- 向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（`===`），主要的区别是`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。

  ```javascript
  let set = new Set();
  let a = NaN;
  let b = NaN;
  set.add(a);
  set.add(b);
  set // Set {NaN}
  ```

- 上面代码向 Set 实例添加了两个`NaN`，但是只能加入一个。这表明，在 Set 内部，两个`NaN`是相等。



- 另外，两个对象总是不相等的。

  ```javascript
  let set = new Set();
  
  set.add({});
  set.size // 1
  
  set.add({});
  set.size // 2
  ```



#### 1.2.1.2 Set 实例的属性和方法

- Set 结构的实例有以下属性：

  > `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
  >
  > `Set.prototype.size`：返回`Set`实例的成员总数。



- Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）:

  > `add(value)`：添加某个值，返回 Set 结构本身。
  >
  > `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
  >
  > `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
  >
  > `clear()`：清除所有成员，没有返回值。

  ```javascript
  s.add(1).add(2).add(2);
  // 注意2被加入了两次
  
  s.size // 2
  
  s.has(1) // true
  s.has(2) // true
  s.has(3) // false
  
  s.delete(2);
  s.has(2) // false
  ```



- `Array.from`方法可以将 Set 结构转为数组。这就提供了去除数组重复成员的另一种方法。

  ```javascript
  Array.from(new Set([1, 2, 3, 4, 5]));
  ```



#### 1.2.1.3 遍历操作

- Set 结构的实例有四个遍历方法，可以用于遍历成员。

  > `keys()`：返回键名的遍历器
  >
  > `values()`：返回键值的遍历器
  >
  > `entries()`：返回键值对的遍历器
  >
  > `forEach()`：使用回调函数遍历每个成员

- 需要特别指出的是，`Set`的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

##### 1. keys()，values()，entries()

- `keys`方法、`values`方法、`entries`方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。

  ```javascript
  let set = new Set(['red', 'green', 'blue']);
  
  for (let item of set.keys()) {
    console.log(item);
  }
  // red
  // green
  // blue
  
  for (let item of set.values()) {
    console.log(item);
  }
  // red
  // green
  // blue
  
  for (let item of set.entries()) {
    console.log(item);
  }
  // ["red", "red"]
  // ["green", "green"]
  // ["blue", "blue"]
  ```



- Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法。

  ```javascript
  Set.prototype[Symbol.iterator] === Set.prototype.values // true
  ```

- 这意味着，可以省略`values`方法，直接用`for...of`循环遍历 Set。

  ```javascript
  let set = new Set(['red', 'green', 'blue']);
  
  for (let x of set) {
    console.log(x);
  }
  // red
  // green
  // blue
  ```



##### 2. forEach()

- Set 结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值。

  ```javascript
  let set = new Set([1, 4, 9]);
  set.forEach((value, key) => console.log(key + ' : ' + value))
  // 1 : 1
  // 4 : 4
  // 9 : 9
  ```

- 上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数与数组的`forEach`一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。



##### 3. 遍历的应用

- 扩展运算符（`...`）内部使用`for...of`循环，所以也可以用于 Set 结构。

  ```js
  let set = new Set(['red', 'green', 'blue']);
  let arr = [...set];
  // ['red', 'green', 'blue']
  ```

  

- 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

  ```js
  let arr = [3, 5, 2, 2, 5, 5];
  let unique = [...new Set(arr)];
  // [3, 5, 2]
  ```

  

- 而且，数组的`map`和`filter`方法也可以间接用于 Set 了。

  ```js
  let set = new Set([1, 2, 3]);
  set = new Set([...set].map(x => x * 2));
  // 返回Set结构：{2, 4, 6}
  
  let set = new Set([1, 2, 3, 4, 5]);
  set = new Set([...set].filter(x => (x % 2) == 0));
  // 返回Set结构：{2, 4}
  ```

  

- 因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

  ```js
  let a = new Set([1, 2, 3]);
  let b = new Set([4, 3, 2]);
  
  // 并集
  let union = new Set([...a, ...b]);
  // Set {1, 2, 3, 4}
  
  // 交集
  let intersect = new Set([...a].filter(x => b.has(x)));
  // set {2, 3}
  
  // 差集
  let difference = new Set([...a].filter(x => !b.has(x)));
  // Set {1}
  ```

  

- 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用`Array.from`方法。

  ```js
  // 方法一
  let set = new Set([1, 2, 3]);
  set = new Set([...set].map(val => val * 2));
  // set的值是2, 4, 6
  
  // 方法二
  let set = new Set([1, 2, 3]);
  set = new Set(Array.from(set, val => val * 2));
  // set的值是2, 4, 6
  ```

- 上面代码提供了两种方法，直接在遍历操作中改变原来的 Set 结构。



### 1.2.2 Map

#### 1.2.2.1 含义和基本用法

- JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

  ```javascript
  const data = {};
  const element = document.getElementById('myDiv');
  
  data[element] = 'metadata';
  data['[object HTMLDivElement]'] // "metadata"
  ```

- 上面代码原意是将一个 DOM 节点作为对象`data`的键，但是由于对象只接受字符串作为键名，所以`element`被自动转为字符串`[object HTMLDivElement]`。



- 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

  ```javascript
  const m = new Map();
  const o = {p: 'Hello World'};
  
  m.set(o, 'content')
  m.get(o) // "content"
  
  m.has(o) // true
  m.delete(o) // true
  m.has(o) // false
  ```

- 上面代码使用 Map 结构的`set`方法，将对象`o`当作`m`的一个键，然后又使用`get`方法读取这个键，接着使用`delete`方法删除了这个键。



- 上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

  ```javascript
  const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  
  map.size // 2
  map.has('name') // true
  map.get('name') // "张三"
  map.has('title') // true
  map.get('title') // "Author"
  ```

- 上面代码在新建 Map 实例时，就指定了两个键`name`和`title`。



- `Map`构造函数接受数组作为参数，实际上执行的是下面的算法。

  ```javascript
  const items = [
    ['name', '张三'],
    ['title', 'Author']
  ];
  
  const map = new Map();
  
  items.forEach(
    ([key, value]) => map.set(key, value)
  );
  ```



- 如果对同一个键多次赋值，后面的值将覆盖前面的值。

  ```javascript
  const map = new Map();
  
  map
  .set(1, 'aaa')
  .set(1, 'bbb');
  
  map.get(1) // "bbb"
  ```



- 如果读取一个未知的键，则返回`undefined`。

  ```javascript
  new Map().get('asfddfsasadf') // undefined
  ```



- 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

  ```javascript
  const map = new Map();
  
  map.set(['a'], 555);
  map.get(['a']) // undefined
  ```



- 虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

  ```js
  map.set(NaN, 123);
  map.get(NaN) // 123
  ```

  

#### 1.2.2.2 属性和方法

##### 1. size 属性

- `size`属性返回 Map 结构的成员总数。

  ```javascript
  const map = new Map();
  map.set('foo', true);
  map.set('bar', false);
  
  map.size // 2
  ```



##### 2. set(key, value)

- `set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。

  ```javascript
  const m = new Map();
  
  m.set('edition', 6)        // 键是字符串
  m.set(262, 'standard')     // 键是数值
  m.set(undefined, 'nah')    // 键是 undefined
  ```



- `set`方法返回的是当前的`Map`对象，因此可以采用链式写法。

  ```javascript
  let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
  ```



##### 3. get(key)

- `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

  ```javascript
  const m = new Map();
  
  const hello = function() {console.log('hello');};
  m.set(hello, 'Hello ES6!') // 键是函数
  
  m.get(hello)  // Hello ES6!
  ```



##### 4. has(key)

- `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

  ```javascript
  const m = new Map();
  
  m.set('edition', 6);
  m.set(262, 'standard');
  m.set(undefined, 'nah');
  
  m.has('edition')     // true
  m.has('years')       // false
  m.has(262)           // true
  m.has(undefined)     // true
  ```



##### 5. delete(key)

- `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

  ```javascript
  const m = new Map();
  m.set(undefined, 'nah');
  m.has(undefined)     // true
  
  m.delete(undefined)
  m.has(undefined)       // false
  ```



##### 6. clear()

- `clear`方法清除所有成员，没有返回值。

  ```javascript
  let map = new Map();
  map.set('foo', true);
  map.set('bar', false);
  
  map.size // 2
  map.clear()
  map.size // 0
  ```



#### 1.2.2.3 遍历方法

- Map 结构原生提供三个遍历器生成函数和一个遍历方法。

  > `keys()`：返回键名的遍历器。
  >
  > `values()`：返回键值的遍历器。
  >
  > `entries()`：返回所有成员的遍历器。
  >
  > `forEach()`：遍历 Map 的所有成员。

  ```javascript
  const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
  ]);
  
  for (let key of map.keys()) {
    console.log(key);
  }
  // "F"
  // "T"
  
  for (let value of map.values()) {
    console.log(value);
  }
  // "no"
  // "yes"
  
  for (let item of map.entries()) {
    console.log(item[0], item[1]);
  }
  // "F" "no"
  // "T" "yes"
  
  // 或者
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"
  
  // 等同于使用map.entries()
  for (let [key, value] of map) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"
  ```

​	

- Map 结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）。

  ```javascript
  const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);
  
  [...map.keys()]
  // [1, 2, 3]
  
  [...map.values()]
  // ['one', 'two', 'three']
  
  [...map.entries()]
  // [[1,'one'], [2, 'two'], [3, 'three']]
  
  [...map]
  // [[1,'one'], [2, 'two'], [3, 'three']]
  ```



- 结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤（Map 本身没有`map`和`filter`方法）。

  ```javascript
  const map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
  
  const map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
  );
  // 产生 Map 结构 {1 => 'a', 2 => 'b'}
  
  const map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
      );
  // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
  ```



- 此外，Map 还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历。

  ```javascript
  map.forEach(function(value, key, map) {
    console.log("Key: %s, Value: %s", key, value);
  });
  ```



#### 1.2.2.4 与其他数据结构的互相转换

##### 1. Map 转为数组

- 前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

  ```javascript
  const myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
  [...myMap]
  // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
  ```



##### 2. 数组转为 Map

- 将数组传入 Map 构造函数，就可以转为 Map。

  ```javascript
  new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
  ])
  // Map {
  //   true => 7,
  //   Object {foo: 3} => ['abc']
  // }
  ```



##### 3. Map 转为对象

- 如果所有 Map 的键都是字符串，它可以无损地转为对象。

  ```javascript
  function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }
  
  const myMap = new Map()
    .set('yes', true)
    .set('no', false);
  strMapToObj(myMap)
  // { yes: true, no: false }
  ```

- 或者

  ```js
  function strMapToObj(strMap) {
    let obj = {};
    strMap.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  
  const myMap = new Map()
  .set('yes', true)
  .set('no', false);
  console.log(strMapToObj(myMap));
  ```

  

##### 4. 对象转为 Map

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```



##### 5. Map 转为 JSON

- Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

  ```javascript
  function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
  }
  
  let myMap = new Map().set('yes', true).set('no', false);
  strMapToJson(myMap) // '{"yes":true,"no":false}'
  ```

- 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

  ```javascript
  function mapToArrayJson(map) {
    return JSON.stringify([...map]);
  }
  
  let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
  mapToArrayJson(myMap) // '[[true,7],[{"foo":3},["abc"]]]'
  ```



##### 6. JSON 转为 Map

- JSON 转为 Map，正常情况下，所有键名都是字符串。

  ```javascript
  function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
  }
  
  jsonToStrMap('{"yes": true, "no": false}')
  // Map {'yes' => true, 'no' => false}
  ```

- 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

  ```javascript
  function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }
  
  jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
  // Map {true => 7, Object {foo: 3} => ['abc']}
  ```



## 1.3 Proxy



### 1.3.1 概述

- Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

- Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

  ```javascript
  var obj = new Proxy({}, {
    get: function (target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
  });
  ```

- 上面代码对一个空对象架设了一层拦截，重定义了属性的读取（`get`）和设置（`set`）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象`obj`，去读写它的属性，就会得到下面的结果。

  ```javascript
  obj.count = 1
  //  setting count!
  ++obj.count
  //  getting count!
  //  setting count!
  //  2
  ```

- 上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。

- ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

  ```javascript
  var proxy = new Proxy(target, handler);
  ```

- Proxy 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。



### 1.3.2 实例方法概述

- 下面是 Proxy 支持的拦截操作一览，一共 13 种。

  > - **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
  > - **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
  > - **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
  > - **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
  > - **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
  > - **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
  > - **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
  > - **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
  > - **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
  > - **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
  > - **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  > - **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
  > - **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。



### 1.3.3 get()

- `get`方法用于拦截某个属性的读取操作，可以接受三个参数，依次为`目标对象`、`属性名`和 `proxy 实例本身`（严格地说，是操作行为所针对的对象），其中最后一个参数可选。



- 下面是一个拦截读取操作的例子，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回`undefined`。

  ```javascript
  var person = {
    name: "张三"
  };
  
  var proxy = new Proxy(person, {
    get: function(target, property) {
      if (property in target) {
        return target[property];
      } else {
        throw new ReferenceError("Property \"" + property + "\" does not exist.");
      }
    }
  });
  
  proxy.name // "张三"
  proxy.age // 抛出一个错误
  ```



- `get`方法可以继承。拦截操作定义在`Prototype`对象上面，所以如果读取`obj`对象继承的属性时，拦截会生效。

  ```javascript
  let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
      console.log('GET ' + propertyKey);
      return target[propertyKey];
    }
  });
  
  let obj = Object.create(proto);
  obj.foo // "GET foo"
  ```



- 下面的例子使用`get`拦截，实现数组读取负数的索引。

  ```javascript
  function createArray(...elements) {
    let handler = {
      get(target, propKey, receiver) {
        let index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
  
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
  }
  
  let arr = createArray('a', 'b', 'c');
  arr[-1] // c
  ```

- 上面代码中，数组的位置参数是`-1`，就会输出数组的倒数第一个成员。



### 1.3.4 set()

- `set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

- 假定`Person`对象有一个`age`属性，该属性应该是一个不大于 200 的整数，那么可以使用`Proxy`保证`age`的属性值符合要求。

  ```javascript
  let validator = {
    set: function(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
  
      // 对于满足条件的 age 属性以及其他属性，直接保存
      obj[prop] = value;
    }
  };
  
  let person = new Proxy({}, validator);
  
  person.age = 100;
  
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错
  ```

- 上面代码中，由于设置了存值函数`set`，任何不符合要求的`age`属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。利用`set`方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。



### 1.3.5 apply()

- `apply`方法拦截函数的调用、`call`和`apply`操作。

- `apply`方法可以接受三个参数，分别是`目标对象`、目标对象的`上下文`对象（`this`）和目标对象的`参数数组`。

  ```javascript
  var handler = {
    apply (target, ctx, args) {
      return Reflect.apply(...arguments);
    }
  };
  ```



- 下面是一个例子。

  ```javascript
  var target = function () { return 'I am the target'; };
  var handler = {
    apply: function () {
      return 'I am the proxy';
    }
  };
  
  var p = new Proxy(target, handler);
  
  p()
  // "I am the proxy"
  ```

- 上面代码中，变量`p`是 Proxy 的实例，当它作为函数调用时（`p()`），就会被`apply`方法拦截，返回一个字符串。



- 下面是另外一个例子。

  ```js
  var twice = {
    apply (target, ctx, args) {
      return Reflect.apply(...arguments) * 2;
    }
  };
  function sum (left, right) {
    return left + right;
  };
  var proxy = new Proxy(sum, twice);
  proxy(1, 2) // 6
  proxy.call(null, 5, 6) // 22
  proxy.apply(null, [7, 8]) // 30
  ```

- 上面代码中，每当执行`proxy`函数（直接调用或`call`和`apply`调用），就会被`apply`方法拦截。





## 1.4 Reflect

### 1.4.1 概述

- `Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个。
  - 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

  - 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

    ```js
    // 老写法
    try {
      Object.defineProperty(target, property, attributes);
      // success
    } catch (e) {
      // failure
    }
    
    // 新写法
    if (Reflect.defineProperty(target, property, attributes)) {
      // success
    } else {
      // failure
    }
    ```

    

  - 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

    ```js
    // 老写法
    'assign' in Object // true
    
    // 新写法
    Reflect.has(Object, 'assign') // true
    ```

    

  - `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

    ```js
    Proxy(target, {
      set: function(target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
          console.log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
      }
    });
    ```

  - 上面代码中，`Proxy`方法拦截`target`对象的属性赋值行为。它采用`Reflect.set`方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

  - 下面是另一个例子。

    ```js
    var loggedObj = new Proxy(obj, {
      get(target, name) {
        console.log('get', target, name);
        return Reflect.get(target, name);
      },
      deleteProperty(target, name) {
        console.log('delete' + name);
        return Reflect.deleteProperty(target, name);
      },
      has(target, name) {
        console.log('has' + name);
        return Reflect.has(target, name);
      }
    });
    ```

  - 上面代码中，每一个`Proxy`对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的`Reflect`方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。
  
  - 有了`Reflect`对象以后，很多操作会更易读。
  
    ```js
    // 老写法
    Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
    
    // 新写法
    Reflect.apply(Math.floor, undefined, [1.75]) // 1
    ```
  
    

### 1.4.2 静态方法

- `Reflect`对象一共有 13 个静态方法。

  > - Reflect.apply(target, thisArg, args)
  > - Reflect.construct(target, args)
  > - Reflect.get(target, name, receiver)
  > - Reflect.set(target, name, value, receiver)
  > - Reflect.defineProperty(target, name, desc)
  > - Reflect.deleteProperty(target, name)
  > - Reflect.has(target, name)
  > - Reflect.ownKeys(target)
  > - Reflect.isExtensible(target)
  > - Reflect.preventExtensions(target)
  > - Reflect.getOwnPropertyDescriptor(target, name)
  > - Reflect.getPrototypeOf(target)
  > - Reflect.setPrototypeOf(target, prototype)

- 上面这些方法的作用，大部分与`Object`对象的同名方法的作用都是相同的，而且它与`Proxy`对象的方法是一一对应的。













## 1.5 Promise

### 1.5.1 Promise 含义

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

- 所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

- `Promise`对象有以下两个特点。

  > - 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
  > - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

- 注意，为了行文方便，本章后面的`resolved`统一只指`fulfilled`状态，不包含`rejected`状态。

- 有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

- `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

- 如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择。



### 1.5.2 基本用法

- ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。下面代码创造了一个`Promise`实例：

  ```js
  const promise = new Promise(function(resolve, reject) {
    // ... some code
  
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
  ```



#### 1.5.2.1 resolve 和 reject

- `Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

  > - `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
  > - `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。

  ```js
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
  ```



#### 1.5.2.2 Promise 执行顺序

- Promise 新建后就会立即执行。以下代码，Promise 新建后立即执行，所以首先输出的是`Promise`。

- `then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

  ```js
  let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
  });
  
  promise.then(function() {
    console.log('resolved.');
  });
  
  console.log('Hi!');
  
  // Promise
  // Hi!
  // resolved
  ```



#### 1.5.2.3 带参数的 resolve 和 reject

- 下面是一个用`Promise`对象实现的 Ajax 操作的例子。下面代码中，`getJSON`是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个`Promise`对象。需要注意的是，在`getJSON`内部，`resolve`函数和`reject`函数调用时，都带有参数。

  ```js
  const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
      const handler = function() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();
  
    });
  
    return promise;
  };
  
  getJSON("/posts.json").then(function(json) {
    console.log('Contents: ' + json);
  }, function(error) {
    console.error('出错了', error);
  });
  ```

  

- 如果调用`resolve`函数和`reject`函数时带有参数，那么它们的参数会被传递给回调函数。`reject`函数的参数通常是`Error`对象的实例，表示抛出的错误；`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样，`p1`和`p2`都是 Promise 的实例，但是`p2`的`resolve`方法将`p1`作为参数，即一个异步操作的结果是返回另一个异步操作。

  ```js
  const p1 = new Promise(function (resolve, reject) {
    // ...
  });
  
  const p2 = new Promise(function (resolve, reject) {
    // ...
    resolve(p1);
  })
  ```

- 注意，这时`p1`的状态就会传递给`p2`，也就是说，`p1`的状态决定了`p2`的状态。如果`p1`的状态是`pending`，那么`p2`的回调函数就会等待`p1`的状态改变；如果`p1`的状态已经是`resolved`或者`rejected`，那么`p2`的回调函数将会立刻执行。

  ```javascript
  const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
  })
  
  const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
  })
  
  p2
    .then(result => console.log(result))
    .catch(error => console.log(error))
  // Error: fail
  ```

- 上面代码中，`p1`是一个 Promise，3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 2 秒，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。



- 注意，调用`resolve`或`reject`并不会终结 Promise 的参数函数的执行。下面代码中，调用`resolve(1)`以后，后面的`console.log(2)`还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
  }).then(r => {
    console.log(r);
  });
  // 2
  // 1
  ```

  

- 一般来说，调用`resolve`或`reject`以后，Promise 的使命就完成了，后继操作应该放到`then`方法里面，而不应该直接写在`resolve`或`reject`的后面。所以，最好在它们前面加上`return`语句，这样就不会有意外。

  ```js
  new Promise((resolve, reject) => {
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
  })
  ```



### 1.5.3 Promise.prototype.then()

- Promise 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。

- `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。下面的代码使用`then`方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

  ```js
  getJSON("/posts.json").then(function(json) {
    return json.post;
  }).then(function(post) {
    // ...
  });
  ```

  

- 采用链式的`then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该`Promise`对象的状态发生变化，才会被调用。

- 下面代码中，第一个`then`方法指定的回调函数，返回的是另一个`Promise`对象。这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。如果变为`resolved`，就调用`funcA`，如果状态变为`rejected`，就调用`funcB`。

  ```js
  getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
  }).then(function funcA(comments) {
    console.log("resolved: ", comments);
  }, function funcB(err){
    console.log("rejected: ", err);
  });
  ```

  

### 1.5.4 Promise.prototype.catch()

- `Promise.prototype.catch`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

- 下面代码中，`getJSON`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch`方法指定的回调函数，处理这个错误。另外，`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获。

  ```js
  getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
  ```

  ```js
  p.then((val) => console.log('fulfilled:', val))
    .catch((err) => console.log('rejected', err));
  
  // 等同于
  p.then((val) => console.log('fulfilled:', val))
    .then(null, (err) => console.log("rejected:", err));
  ```

  

- 下面是一个例子。

  ```js
  const promise = new Promise(function(resolve, reject) {
    throw new Error('test');
  });
  promise.catch(function(error) {
    console.log(error);
  });
  // Error: test
  ```

- 上面代码中，`promise`抛出一个错误，就被`catch`方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。

  ```javascript
  // 写法一
  const promise = new Promise(function(resolve, reject) {
    try {
      throw new Error('test');
    } catch(e) {
      reject(e);
    }
  });
  promise.catch(function(error) {
    console.log(error);
  });
  
  // 写法二
  const promise = new Promise(function(resolve, reject) {
    reject(new Error('test'));
  });
  promise.catch(function(error) {
    console.log(error);
  });
  ```



- 比较上面两种写法，可以发现`reject`方法的作用，等同于抛出错误。如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。

- Promise 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

  ```javascript
  const promise = new Promise(function(resolve, reject) {
    resolve('ok');
    throw new Error('test');
  });
  promise
    .then(function(value) { console.log(value) })
    .catch(function(error) { console.log(error) });
  // ok
  ```



- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

- 下面代码中，一共有三个 Promise 对象：一个由`getJSON`产生，两个由`then`产生。它们之中任何一个抛出的错误，都会被最后一个`catch`捕获。

  ```js
  getJSON('/post/1.json').then(function(post) {
    return getJSON(post.commentURL);
  }).then(function(comments) {
    // some code
  }).catch(function(error) {
    // 处理前面三个Promise产生的错误
  });
  ```

  

- 一般来说，不要在`then`方法里面定义 Reject 状态的回调函数（即`then`的第二个参数），总是使用`catch`方法。

- 下面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch`方法，而不使用`then`方法的第二个参数。

  ```javascript
  // bad
  promise
    .then(function(data) {
      // success
    }, function(err) {
      // error
    });
  
  // good
  promise
    .then(function(data) { //cb
      // success
    })
    .catch(function(err) {
      // error
    });
  ```



### 1.5.5 Promise.all()

- `Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

- `Promise.all`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

  ```js
  const p = Promise.all([p1, p2, p3]);
  ```

  

- `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

  > - 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
  > - 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

- 下面是一个具体的例子。`promises`是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

  ```js
  // 生成一个Promise对象的数组
  const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return getJSON('/post/' + id + ".json");
  });
  
  Promise.all(promises).then(function (posts) {
    // ...
  }).catch(function(reason){
    // ...
  });
  ```

  

- 注意，如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

- 下面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。

  ```javascript
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // ["hello", Error: 报错了]
  ```



- 如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

  ```javascript
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // Error: 报错了
  ```



- 在之前我们讲到：只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。那么这样可能会阻塞其他项的执行，那么，其实我们可以分别捕获每一项的错误：

  ```js
  Promise.all([p1, p2].map(i=>i.catch(e => console.log(e))))
  .then(result => console.log(result))
  ```

  

### 1.5.6 Promise.resolve()

- 有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

- `Promise.resolve`等价于下面的写法。

  ```javascript
  Promise.resolve('foo')
  // 等价于
  new Promise(resolve => resolve('foo'))
  ```

- `Promise.resolve`方法的参数分成四种情况：

#### 1.5.6.1 参数是一个 Promise 实例

- 如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

#### 1.5.6.2 参数是一个 thenable 对象

- `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

  ```javascript
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };
  ```

- `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

  ```javascript
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };
  
  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });
  ```

#### 1.5.6.3 参数不是具有then方法的对象，或根本就不是对象

- 如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

- 下面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

  ```javascript
  const p = Promise.resolve('Hello');
  
  p.then(function (s){
    console.log(s)
  });
  // Hello
  ```



#### 1.5.6.4 不带有任何参数

- `Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

  ```javascript
  const p = Promise.resolve();
  
  p.then(function () {
    // ...
  });
  ```

- 上面代码的变量`p`就是一个 Promise 对象。需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

- 下面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

  ```javascript
  setTimeout(function () {
    console.log('three');
  }, 0);
  
  Promise.resolve().then(function () {
    console.log('two');
  });
  
  console.log('one');
  
  // one
  // two
  // three
  ```



### 1.5.7 Promise.reject()

- `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

- 下面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

  ```js
  const p = Promise.reject('出错了');
  // 等同于
  const p = new Promise((resolve, reject) => reject('出错了'))
  
  p.then(null, function (s) {
    console.log(s)
  });
  // 出错了
  ```

  

- 注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

- 下面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。

```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```



### 1.5.8 Promise.try()

- 实际开发中，经常遇到一种情况：不知道或者不想区分，函数`f`是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管`f`是否包含异步操作，都用`then`方法指定下一步流程，用`catch`方法处理`f`抛出的错误。一般就会采用下面的写法。

  ```js
  Promise.resolve().then(f)
  ```

  

- 上面的写法有一个缺点，就是如果`f`是同步函数，那么它会在本轮事件循环的末尾执行。

- 函数`f`是同步的，但是用 Promise 包装了以后，就变成异步执行了。

```javascript
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now
```



- 那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？



- 第一种写法是用`async`函数来写。

  ```js
  const f = () => console.log('now');
  (async () => f())();
  console.log('next');
  // now
  // next
  ```

- 上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的`async`函数，因此如果`f`是同步的，就会得到同步的结果；如果`f`是异步的，就可以用`then`指定下一步，就像下面的写法。

  ```js
  (async () => f())()
  .then(...)
  ```

  

- 需要注意的是，`async () => f()`会吃掉`f()`抛出的错误。所以，如果想捕获错误，要使用`promise.catch`方法。

  ```js
  (async () => f())()
  .then(...)
  .catch(...)
  ```

  

- 第二种写法是使用`new Promise()`。

- 使用立即执行的匿名函数，执行`new Promise()`。这种情况下，同步函数也是同步执行的。

  ```js
  const f = () => console.log('now');
  (
    () => new Promise(
      resolve => resolve(f())
    )
  )();
  console.log('next');
  // now
  // next
  ```

  

- 鉴于这是一个很常见的需求，所以现在有一个[提案](https://github.com/ljharb/proposal-promise-try)，提供`Promise.try`方法替代上面的写法。

  ```javascript
  const f = () => console.log('now');
  Promise.try(f);
  console.log('next');
  // now
  // next
  ```



- 由于`Promise.try`为所有操作提供了统一的处理机制，所以如果想用`then`方法管理流程，最好都用`Promise.try`包装一下。这样有[许多好处](http://cryto.net/~joepie91/blog/2016/05/11/what-is-promise-try-and-why-does-it-matter/)，其中一点就是可以更好地管理异常。

  ```js
  function getUsername(userId) {
    return database.users.get({id: userId})
    .then(function(user) {
      return user.name;
    });
  }
  ```

- 上面代码中，`database.users.get()`返回一个 Promise 对象，如果抛出异步错误，可以用`catch`方法捕获，就像下面这样写。

  ```js
  database.users.get({id: userId})
  .then(...)
  .catch(...)
  ```

- 但是`database.users.get()`可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用`try...catch`去捕获。

  ```js
  try {
    database.users.get({id: userId})
    .then(...)
    .catch(...)
  } catch (e) {
    // ...
  }
  ```



- 上面这样的写法就很笨拙了，这时就可以统一用`promise.catch()`捕获所有同步和异步的错误。

  ```js
  Promise.try(() => database.users.get({id: userId}))
    .then(...)
    .catch(...)
  ```

- 事实上，`Promise.try`就是模拟`try`代码块，就像`promise.catch`模拟的是`catch`代码块。



## 1.6 Iterator 和 for...of 循环

### 1.6.1 Iterator（遍历器）的概念

- JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

- 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

- Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。



- Iterator 的遍历过程是这样的:

  > - 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
  >
  > - 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
  >
  > - 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
  >
  > - 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

  ```javascript
  /* 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束 */
  
  var it = makeIterator(['a', 'b']);
  
  it.next() // { value: "a", done: false }
  it.next() // { value: "b", done: false }
  it.next() // { value: undefined, done: true }
  
  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
      }
    };
  }
  ```

- 上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。

- 指针对象的`next`方法，用来移动指针。开始时，指针指向数组的开始位置。然后，每次调用`next`方法，指针就会指向数组的下一个成员。第一次调用，指向`a`；第二次调用，指向`b`。

- `next`方法返回一个对象，表示当前数据成员的信息。这个对象具有`value`和`done`两个属性，`value`属性返回当前位置的成员，`done`属性是一个布尔值，表示遍历是否结束，即是否还有必要再一次调用`next`方法。

- 对于遍历器对象来说，`done: false`和`value: undefined`属性都是可以省略的，因此上面的`makeIterator`函数可以简写成下面的形式。

  ```javascript
  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++]} :
          {done: true};
      }
    };
  }
  ```



### 1.6.2 默认 Iterator 接口

- Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环（详见下文）
- 当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
- 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“`可遍历的`”（iterable）。

- ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

  ```javascript
  const obj = {
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value: 1,
            done: true
          };
        }
      };
    }
  };
  ```

- 上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。

- ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

- 原生具备 Iterator 接口的数据结构如下：

  > - Array
  > - Map
  > - Set
  > - String
  > - TypedArray
  > - 函数的 arguments 对象
  > - NodeList 对象



- 下面的例子是数组的`Symbol.iterator`属性：

  ```javascript
  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();
  
  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }
  ```



- 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。

- 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。





### 1.6.3 调用 Iterator 接口的场合

- 有一些场合会默认调用 Iterator 接口（即`Symbol.iterator`方法），除了下文会介绍的`for...of`循环，还有几个别的场合。

##### （1）解构赋值

- 对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。

  ```js
  let set = new Set().add('a').add('b').add('c');
  
  let [x,y] = set;
  // x='a'; y='b'
  
  let [first, ...rest] = set;
  // first='a'; rest=['b','c'];
  ```

  

##### （2）扩展运算符

- 扩展运算符（...）也会调用默认的 Iterator 接口。

  ```js
  // 例一
  var str = 'hello';
  [...str] //  ['h','e','l','l','o']
  
  // 例二
  let arr = ['b', 'c'];
  ['a', ...arr, 'd']
  // ['a', 'b', 'c', 'd']
  ```

- 上面代码的扩展运算符内部就调用 Iterator 接口。

- 实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

  ```js
  let arr = [...iterable];
  ```

  

##### （3）yield\*

- `yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

  ```js
  let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
  };
  
  var iterator = generator();
  
  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 2, done: false }
  iterator.next() // { value: 3, done: false }
  iterator.next() // { value: 4, done: false }
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }
  ```

  

##### （4）其他场合

- 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

  > - for...of
  > - Array.from()
  > - Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
  > - Promise.all()
  > - Promise.race()



### 1.6.4 字符串的 Iterator 接口

- 字符串是一个类似数组的对象，也原生具有 Iterator 接口。

  ```js
  var someString = "hi";
  typeof someString[Symbol.iterator]
  // "function"
  
  var iterator = someString[Symbol.iterator]();
  
  iterator.next()  // { value: "h", done: false }
  iterator.next()  // { value: "i", done: false }
  iterator.next()  // { value: undefined, done: true }
  ```

- 上面代码中，调用`Symbol.iterator`方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。



- 可以覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的。

  ```js
  var str = new String("hi");
  
  [...str] // ["h", "i"]
  
  str[Symbol.iterator] = function() {
    return {
      next: function() {
        if (this._first) {
          this._first = false;
          return { value: "bye", done: false };
        } else {
          return { done: true };
        }
      },
      _first: true
    };
  };
  
  [...str] // ["bye"]
  str // "hi"
  ```

- 上面代码中，字符串 str 的`Symbol.iterator`方法被修改了，所以扩展运算符（`...`）返回的值变成了`bye`，而字符串本身还是`hi`。





### 1.6.5 Iterator 接口与 Generator 函数

- `Symbol.iterator`方法的最简单实现，还是使用下一章要介绍的 Generator 函数。

  ```javascript
  let myIterable = {
    [Symbol.iterator]: function* () {
      yield 1;
      yield 2;
      yield 3;
    }
  }
  [...myIterable] // [1, 2, 3]
  
  // 或者采用下面的简洁写法
  
  let obj = {
    * [Symbol.iterator]() {
      yield 'hello';
      yield 'world';
    }
  };
  
  for (let x of obj) {
    console.log(x);
  }
  // "hello"
  // "world"
  ```

- 上面代码中，`Symbol.iterator`方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。

### 1.6.6 遍历器对象的 return()，throw()

- 遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是否部署是可选的。

- `return`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法。

  ```javascript
  function readLinesSync(file) {
    return {
      [Symbol.iterator]() {
        return {
          next() {
            return { done: false };
          },
          return() {
            file.close();
            return { done: true };
          }
        };
      },
    };
  }
  ```



- 上面代码中，函数`readLinesSync`接受一个文件对象作为参数，返回一个遍历器对象，其中除了`next`方法，还部署了`return`方法。下面的两种情况，都会触发执行`return`方法。

  ```javascript
  // 情况一
  for (let line of readLinesSync(fileName)) {
    console.log(line);
    break;
  }
  
  // 情况二
  for (let line of readLinesSync(fileName)) {
    console.log(line);
    throw new Error();
  }
  ```

- 上面代码中，情况一输出文件的第一行以后，就会执行`return`方法，关闭这个文件；情况二会在执行`return`方法关闭文件之后，再抛出错误。

- 注意，`return`方法必须返回一个对象，这是 Generator 规格决定的。



### 1.6.7 for...of 循环

- ES6 借鉴 C++、Java、C# 和 Python 语言，引入了`for...of`循环，作为遍历所有数据结构的统一的方法。
- 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
- `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。



#### 1.6.7.1 数组

- 数组原生具备`iterator`接口（即默认部署了`Symbol.iterator`属性），`for...of`循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。

  ```javascript
  const arr = ['red', 'green', 'blue'];
  
  for(let v of arr) {
    console.log(v); // red green blue
  }
  
  const obj = {};
  obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
  
  for(let v of obj) {
    console.log(v); // red green blue
  }
  ```

- 上面代码中，空对象`obj`部署了数组`arr`的`Symbol.iterator`属性，结果`obj`的`for...of`循环，产生了与`arr`完全一样的结果。



- JavaScript 原有的`for...in`循环，只能获得对象的键名，不能直接获取键值。ES6 提供`for...of`循环，允许遍历获得键值。

  ```javascript
  var arr = ['a', 'b', 'c', 'd'];
  
  for (let a in arr) {
    console.log(a); // 0 1 2 3
  }
  
  for (let a of arr) {
    console.log(a); // a b c d
  }
  ```

- 上面代码表明，`for...in`循环读取键名，`for...of`循环读取键值。如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法

  ```js
  var arr = ['a', 'b', 'c', 'd'];
  
  for (let a of Object.keys(arr)) {
    console.log(a); // 0 1 2 3
  }
  ```

  

- `for...of`循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟`for...in`循环也不一样。

  ```javascript
  let arr = [3, 5, 7];
  arr.foo = 'hello';
  
  for (let i in arr) {
    console.log(i); // "0", "1", "2", "foo"
  }
  
  for (let i of arr) {
    console.log(i); //  "3", "5", "7"
  }
  ```

- 上面代码中，`for...of`循环不会返回数组`arr`的`foo`属性。



#### 1.6.7.2 Set 和 Map 结构

- Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用`for...of`循环。

  ```js
  var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
  for (var e of engines) {
    console.log(e);
  }
  // Gecko Trident Webkit
  
  var es6 = new Map();
  es6.set("edition", 6);
  es6.set("committee", "TC39");
  es6.set("standard", "ECMA-262");
  for (var [name, value] of es6) {
    console.log(name + ": " + value); // edition: 6 committee: TC39 standard: ECMA-262
  }
  ```

- 上面代码演示了如何遍历 Set 结构和 Map 结构。值得注意的地方有两个。

- 首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。

- 其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

  ```javascript
  let map = new Map().set('a', 1).set('b', 2);
  for (let pair of map) {
    console.log(pair);
  }
  // ['a', 1]
  // ['b', 2]
  
  for (let [key, value] of map) {
    console.log(key + ' : ' + value);
  }
  // a : 1
  // b : 2
  ```



#### 1.6.7.3 类似数组的对象

- 类似数组的对象包括好几类。下面是`for...of`循环用于字符串、DOM NodeList 对象、`arguments`对象的例子。

  ```javascript
  // 字符串
  let str = "hello";
  
  for (let s of str) {
    console.log(s); // h e l l o
  }
  
  // DOM NodeList对象
  let paras = document.querySelectorAll("p");
  
  for (let p of paras) {
    p.classList.add("test");
  }
  
  // arguments对象
  function printArgs() {
    for (let x of arguments) {
      console.log(x);
    }
  }
  printArgs('a', 'b');
  // 'a'
  // 'b'
  ```



- 对于字符串来说，`for...of`循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。

  ```javascript
  for (let x of 'a\uD83D\uDC0A') {
    console.log(x);
  }
  // 'a'
  // '\uD83D\uDC0A'
  ```



- 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用`Array.from`方法将其转为数组。

  ```javascript
  let arrayLike = { length: 2, 0: 'a', 1: 'b' };
  
  // 报错
  for (let x of arrayLike) {
    console.log(x);
  }
  
  // 正确
  for (let x of Array.from(arrayLike)) {
    console.log(x);
  }
  ```



#### 1.6.7.4 与其他遍历语法的比较

- 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是`for`循环。

  ```js
  for (var index = 0; index < myArray.length; index++) {
    console.log(myArray[index]);
  }
  ```

  

- 这种写法比较麻烦，因此数组提供内置的`forEach`方法。

```javascript
myArray.forEach(function (value) {
  console.log(value);
});
```



- 这种写法的问题在于，无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效。



- `for...in`循环可以遍历数组的键名。

  ```js
  for (var index in myArray) {
    console.log(myArray[index]);
  }
  ```

- `for...in`循环有几个缺点：

  > - 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
  > - `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
  > - 某些情况下，`for...in`循环会以任意顺序遍历键名。

- 总之，`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。



- `for...of`循环相比上面几种做法，有一些显著的优点。

  ```js
  for (let value of myArray) {
    console.log(value);
  }
  ```

  > - 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
  > - 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
  > - 提供了遍历所有数据结构的统一操作接口。



- 下面是一个使用 break 语句，跳出`for...of`循环的例子。

  ```js
  for (var n of fibonacci) {
    if (n > 1000)
      break;
    console.log(n);
  }
  ```

- 上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用`break`语句跳出`for...of`循环。



