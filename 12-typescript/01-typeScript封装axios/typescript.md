# typescript 基础

## 1.1 基础类型

typescript数据类型：布尔值、数字（number）、字符串、数组、元祖、枚举、any、void、null和undefined、never、object

### 1.1.1 基本类型

##### 1. 布尔值

- 包括 true 和 false 两种

```ts
let isDone: boolean = false
let isDone: boolean = true
```



##### 2. 数字

和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 `number`。 除了支持十进制和十六进制字面量，TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```



##### 3. 字符串

JavaScript程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 `string`表示文本数据类型。 和JavaScript一样，可以使用双引号（ `"`）或单引号（`'`）表示字符串。

```ts
let str: string = 'string'
```

同样的，可以使用模板字符串

```ts
let name: string = `Gene`;
let sentence: string = `Hello, my name is ${ name }.
```

##### 4. 数组

TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。

 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```ts
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```ts
let list: Array<number> = [1, 2, 3];
```



##### 4. 元祖 Tuple

元组类型允许表示一个`已知元素数量`和`类型`的数组，各元素的类型不必相同。但必须`一一对应`。 比如，你可以定义一对值分别为 `string`和`number`类型的元组。

```ts
let x: [string, number];

x = ['hello', 10]; // OK

x = [10, 'hello']; // Error
```



##### 5. 枚举

`enum`类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

默认情况下，从`0`开始为元素编号。 你也可以手动的指定成员的数值。 

```ts
enum Color {
  Red = 1,
  Green = 3,
  bule = 5
}
let colorName: string = Color[3]; // Green
let color: number = Color.Green; // 3
console.log(colorName, color);
```

编译以后：

```js
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["bule"] = 5] = "bule";
})(Color || (Color = {}));
var colorName = Color[3]; // Green
var color = Color.Green; // 3
console.log(colorName, color);
```

以上我们可以看出，枚举类型提供的一个便利是你可以由枚举的值得到它的名字。



##### 6. any

`any` 表示任意类型，跳过类型检查。

```tsx
let notSure:any = 4;
notSure = 'string';
notSure = false;
```

当类型为 `any` 的时候，将跳过类型检查。

在对现有代码进行改写的时候，`any`类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。 你可能认为 `Object`有相似的作用，就像它在其它语言中那样。 但是 `Object`类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法：

```ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```



##### 7. void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```
function User():void{
	
}
```

声明一个`void`类型的变量没有什么大用，因为你只能为它赋予`undefined`和`null`：

```ts
let user: void = undefined;
```



##### 8. undefined 和 null

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大，这两种类型都只能本身赋值

```js
let u:undefined = undefined
let n:null = null
```

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

然而，当你指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给`void`和它们各自。 这能避免 *很多*常见的问题。 也许在某处你想传入一个 `string`或`null`或`undefined`，你可以使用联合类型`string | null | undefined`。

```tsx
let num:number | null = 3; // 定义 num 类型为 number 或者 null
num = null
```



##### 9. never。

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使 `any`也不可以赋值给`never`。

通常用于函数中，当报错，无限循环等时，使用never。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```



##### 10. object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

使用`object`类型，就可以更好的表示像`Object.create`这样的API。例如：

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```



### 1.1.2 类型断言(强制转换)

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

```ts
let someValue:any = 'this is a stirng'
let strLength: number = (<string>someValue).length // 将any转换为 string
```

或者

```ts
let someValue:any = 'this is a stirng'
let strLength:number = (someValue as string).length
```

通常推荐以上第二种写法，在jsx中也只支持以上第二种语法。



## 1.2 接口

TypeScript的核心原则之一是对值所具有的*结构*进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 1.2.1 接口初探

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

`LabelledValue`接口就好比一个名字，用来描述`printLabel`的要求。 它代表了有一个 `label`属性且类型为`string`的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 `printLabel`的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

### 1.2.2 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

```ts
interface Square {
  color: string;
  area: number;
}

interface Config {
  color?: string;
  width?: number;
}

function createSquare(config: Config): Square {
  let newSquare = { color: "white", area: 100 };
  if (config.color) newSquare.color = config.color; // 如果传了颜色，就是用传的，如果没有传就是用默认的
  if (config.width) newSquare.area = config.width * config.width; // 如果传了width，就是用传的，如果没有传就是用默认的
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

console.log(mySquare); // { color: 'black', area: 100 }
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将 `createSquare`里的`color`属性名拼错，就会得到一个错误提示：

```ts
if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
```



### 1.2.3 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性:新赋值

```ts
interface Point {
  readonly x: number;
  y: number;
}
let p1: Point = { x: 10, y: 10 }
p1.y = 5 // 此处能赋值，因为x为可读可写
p1.x = 5 // 此处不能赋值，因为x为只读
```

只读范型，TypeScript具有`ReadonlyArray`类型，它与`Array`相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```ts
let arr: number[] = [1, 2, 3];
let other: ReadonlyArray<number> = arr;
other[0] = 2 // 只读，不能修改
let aa = other as number[] // 将类型修改回去就可以重新赋值了
```



### 1.2.4 额外属性检查

在接口 Config 中只有两个属性，如果我们多传了，则会报错。这也就是对额外属性的检查，那么我们可以使用属性签名的做法

```ts
interface Config {
  color?: string;
  width?: number;
  [propName: string]: any // 索引签名，新增的属性为任意类型
}

function createSquare(config: Config) {

}

let mySquare = createSquare({ colorrr: "black" }); // 这里我传其他属性则不会报错

```



### 1.2.5 函数类型

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean; // 表示函数有两个参数，返回布尔类型
}
```

这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。

```ts
let mySearch: SearchFunc = (src, sub) => {
  let result = src.search(sub);
  return result > -1;
};

console.log(mySearch("aaaaab", "b")); // true
```

search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

```ts
var str="Visit W3School!"
document.write(str.search(/W3School/)) // 6
```



### 1.2.6 可索引类型

数字索引签名

```ts
interface StringArray {
  [index: number]: string; // 定义可以通过数字类型的索引拿到字符串类型的值
}
let myArray: StringArray = ["aaa", "bbb"];
let myStr: string = myArray[0];
console.log(myStr); // 'aaa'
```

TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 `number`来索引时，JavaScript会将它转换成`string`然后再去索引对象。 也就是说用 `100`（一个`number`）去索引等同于使用`"100"`（一个`string`）去索引，因此两者需要保持一致。

```ts
interface StringArray {
  [x: number]: Dog; // 当数字索引签名和字符串索引签名同时使用时，数字返回值必须包含字符串
  [x: string]: Animal;
}

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}
```

只读的索引签名

```ts
interface StringArray {
  readonly [index: number]: string; // 只读
}
let myArray: StringArray = ["aaa", "bbb"];
myArray[2] = 'ccc'; // 报错，只读的
```



### 1.2.7 类类型

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

实现接口：

```ts
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

#### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， `ClockConstructor`为构造函数所用和`ClockInterface`为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```ts
/* 实例接口 */
interface ClockInterFace {
  tick();
}
/* 构造器接口 */
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterFace; // 构造器签名
}

function createClock(
  ctor: ClockConstructor, // 使用构造器类型接口
  hour: number,
  minute: number
): ClockInterFace {
  return new ctor(hour, minute);
}
// 使用实例类型接口
class DigitalClock implements ClockInterFace {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep");
  }
}
// 使用实例类型接口
class AnalogClock implements ClockInterFace {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 17);
```

因为`createClock`的第一个参数是`ClockConstructor`类型，在`createClock(AnalogClock, 7, 32)`里，会检查`AnalogClock`是否符合构造函数签名。

### 1.2.8 接口继承

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

单个继承

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
let square = {} as Square; // Square 继承 Shape 以后就拥有两个属性了
square.color = "blue";
square.sideLength = 10;
console.log(square); // { color: 'blue', sideLength: 10 }

```

多个继承使用`逗号`分隔

```ts
interface Shape {
  color: string;
}

interface Pen {
  penWidth: number;
}

interface Square extends Shape, Pen {
  sideLength: number;
}
```



### 1.2.9 混合类型

接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

```ts
interface Counter {
  (start: number): number; // 表示此接口是函数类型，返回number类型，有一个number类型参数
  interval: number; // 同时拥有interval属性
  reset(): void; // 拥有reset 函数，此函数无返回值
}
// 此函数返回值为 Counter 类型
function getCounter(): Counter {
  let counter = function(start: number) { return start; } as Counter;
  counter.interval = 123;
  counter.reset = function() {
    console.log("reset");
  };
  return counter;
}
let c = getCounter();
console.log(c(10)); // 10
console.log(c.interval); // 123
c.reset(); // reset
```



### 1.2.10 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 例：

```ts
class Control {
  private static: any;
}

interface SelectableControl extends Control {
  select();
}
// SelectableControl 继承  Control，如果要实现 SelectableControl 那么button 必须也要继承 Control
class Button extends Control implements SelectableControl {
  select() {}
}
```



## 1.3 类

传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从ECMAScript 2015，也就是ECMAScript 6开始，JavaScript程序员将能够使用基于类的面向对象的方式。 使用TypeScript，我们允许开发者现在就使用这些特性，并且编译后的JavaScript可以在所有主流浏览器和平台上运行，而不需要等到下个JavaScript版本。

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

我们声明一个 `Greeter`类。这个类有3个成员：一个叫做 `greeting`的属性，一个构造函数和一个 `greet`方法。

你会注意到，我们在引用任何一个类成员的时候都用了 `this`。 它表示我们访问的是类的成员。

最后一行，我们使用 `new`构造了 `Greeter`类的一个实例。 它会调用之前定义的构造函数，创建一个 `Greeter`类型的新对象，并执行构造函数初始化它。

### 1.3.1 继承

在TypeScript里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 这里， `Dog`是一个 *派生类*，它派生自 `Animal` *基类*，通过 `extends`关键字。 派生类通常被称作 *子类*，基类通常被称作 *超类*。

因为 `Dog`继承了 `Animal`的功能，因此我们可以创建一个 `Dog`的实例，它能够 `bark()`和 `move()`。

下面我们来看个更加复杂的例子。

```ts
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

这个例子展示了一些上面没有提到的特性。 这一次，我们使用 `extends`关键字创建了 `Animal`的两个子类： `Horse`和 `Snake`。

与前一个例子的不同点是，派生类包含了一个构造函数，它 *必须*调用 `super()`，它会执行基类的构造函数。 而且，在构造函数里访问 `this`的属性之前，我们 *一定*要调用 `super()`。 这个是TypeScript强制执行的一条重要规则。

这个例子演示了如何在子类里可以重写父类的方法。 `Snake`类和 `Horse`类都创建了 `move`方法，它们重写了从 `Animal`继承来的 `move`方法，使得 `move`方法根据不同的类而具有不同的功能。 注意，即使 `tom`被声明为 `Animal`类型，但因为它的值是 `Horse`，调用 `tom.move(34)`时，它会调用 `Horse`里重写的方法：

```text
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```



### 1.3.2 公共，私有与受保护的修饰符

#### 1.3.2.1 默认为 public

在TypeScript里，成员都默认为 `public`。你也可以明确的将一个成员标记成 `public`。 我们可以用下面的方式来重写上面的 `Animal`类：

```ts
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```



#### 1.3.2.2 private

当成员被标记成 `private`时，它就不能在声明它的类的外部访问。比如：

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 `private`或 `protected`成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 `private`成员，那么只有当另外一个类型中也存在这样一个 `private`成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected`成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

这个例子中有 `Animal`和 `Rhino`两个类， `Rhino`是 `Animal`类的子类。 还有一个 `Employee`类，其类型看上去与 `Animal`是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 `Animal`和 `Rhino`共享了来自 `Animal`里的私有成员定义 `private name: string`，因此它们是兼容的。 然而 `Employee`却不是这样。当把 `Employee`赋值给 `Animal`的时候，得到一个错误，说它们的类型不兼容。 尽管 `Employee`里也有一个私有成员 `name`，但它明显不是 `Animal`里面定义的那个。



#### 1.3.3.3 protected

`protected`修饰符与 `private`修饰符的行为很相似，但有一点不同， `protected`成员在派生类中仍然可以访问。例如：

```ts
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`; // 可以访问name
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 属性“name”受保护，只能在类“Person”及其子类中访问。不能在实例中访问
```

注意，我们不能在 `Person`类外使用 `name`，但是我们仍然可以通过 `Employee`类的实例方法(这里指的是实例中的方法，而不是实例，不能再实例中访问name)访问，因为 `Employee`是由 `Person`派生而来的。

构造函数也可以被标记成 `protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如，

```ts
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales"); // 继承了 Person 因此可以实例化
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```



```
总结：
	1. public 所有皆可访问
	2. private 只能在当前类中访问，子类中无法访问，但是可以继承（以上private章节例子有讲到两个实例要兼容私有属性必须是继承同一个类，说明私有属性是可以继承的，但是无法被访问）
	3. protected 在子类中可以访问，但是无法在实例中访问。如果添加给构造函数，本身无法实例化，子类可以实例化
```



### 1.3.3 readonly 修饰符

你可以使用 `readonly`关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```ts
class Octopus {
    readonly name: string;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

### 1.3.4 参数属性

在上面的例子中，我们必须在`Octopus`类里定义一个只读成员 `name`和一个参数为 `theName`的构造函数，并且立刻将 `theName`的值赋给 `name`，这种情况经常会遇到。 *参数属性*可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Octopus`类的修改版，使用了参数属性：

```ts
class Octopus {
    constructor(readonly name: string) {
    }
}
```

注意看我们是如何舍弃了 `theName`，仅在构造函数里使用 `readonly name: string`参数来创建和初始化 `name`成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。 使用 `private`限定一个参数属性会声明并初始化一个私有成员；对于 `public`和 `protected`来说也是一样。

```ts
class Octopus {
    constructor(readonly name: string, public age: number, protected sex: string) {
    // 以上我们声明了三种类型的是哪个变量，并且分别赋予构造函数传入的三个值
    }
}
```



### 1.3.5 存取器

TypeScript支持通过`getters/setters`来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

下面来看如何把一个简单的类改写成使用 `get`和 `set`。 首先，我们从一个没有使用存取器的例子开始。

```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

我们可以随意的设置 `fullName`，这是非常方便的，但是这也可能会带来麻烦。

下面这个版本里，我们先检查用户密码是否正确，然后再允许其修改员工信息。 我们把对 `fullName`的直接访问改成了可以检查密码的 `set`方法。 我们也加了一个 `get`方法，让上面的例子仍然可以工作。

```ts
let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith"; // 调用 set 函数
if (employee.fullName) {
  console.log(employee.fullName); // Bob Smith 调用get函数
}
```

首先，存取器要求你将编译器设置为输出ECMAScript 5或更高(运行tsc demo -t es5 编译)。 不支持降级到ECMAScript 3。 其次，只带有 `get`不带有 `set`的存取器自动被推断为 `readonly`。 这在从代码生成 `.d.ts`文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。



### 1.3.6 静态属性

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 `static`定义 `origin`，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 `origin`前面加上类名。 如同在实例属性上使用 `this.`前缀来访问属性一样，这里我们使用 `Grid.`来访问静态属性。

```ts
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

简单的说，静态属性只能通过 `类名.静态属性` 的方法访问



### 1.3.7 抽象类

抽象类做为其它子类的父类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节（如下的move方法，不是抽象方法，那么可以实现具体的功能）。 `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Animal {
    abstract makeSound(): void; // 只定义抽象方法，不写具体的功能
    move(): void {
        console.log('roaming the earch...');
    }
}
```

抽象类中的抽象方法不包含具体实现并且必须在子类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 `abstract`关键字并且可以包含访问修饰符。

```ts
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在 也就是说，抽象类的子类不能扩展，只能继承和实现抽象类中的方法

```



```text
总结：
	1. 抽象类允许创建一个对抽象类型的引用
	2. 抽象类不能创建一个抽象类的实例
	3. 抽象类允许对一个抽象子类进行实例化和赋值
	4. 抽象类的子类只能继承不能扩展，只能继承和实现抽象类中的方法
```



## 1.4 函数

### 1.4.1 函数类型

#### 1.4.1.1 为函数定义类型

让我们为函数添加类型：

```ts
function add(x: number, y: number): number { return x + y; }

let myAdd = function(x: number, y: number): number { return x + y; };
```

我们可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。

#### 1.4.1.2 书写完整函数类型

现在我们已经为函数指定了类型，下面让我们写出函数的完整类型。

```ts
let myAdd: (x: number, y: number) => number = function(x: number, y: number): number { return x + y; };
```

函数类型包含两部分：`参数类型`，`返回值类型`。 当写出完整函数类型的时候，这两部分都是需要的。 我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。 这个名字只是为了增加可读性。 我们也可以这么写：

```ts
let myAdd: (baseValue: number, increment: number) => number = function(x: number, y: number): number { return x + y; };
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

第二部分是返回值类型。 对于返回值，我们在函数和返回值类型之前使用( `=>`)符号，使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 `void`而不能留空。

函数的类型只是由参数类型和返回值组成的。 函数中使用的捕获变量不会体现在类型里。 实际上，这些变量是函数的隐藏状态并不是组成API的一部分。



#### 1.4.1.3 推断类型

尝试这个例子的时候，你会发现如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型：

```ts
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。



### 1.4.2 可选参数和默认参数

TypeScript里的每个函数参数都是必须的。 简短地说，传递给一个函数的参数个数必须与函数期望的参数个数一致。

```ts
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```

JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 在TypeScript里我们可以在参数名旁使用 `?`实现可选参数的功能。 比如，我们想让last name是可选的：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

可选参数必须跟在必须参数后面。 如果上例我们想让first name是可选的，那么就必须调整它们的位置，把first name放在后面。

在TypeScript里，我们也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined`时。 它们叫做有默认初始化值的参数。 让我们修改上例，把last name的默认值设置为`"Smith"`。

```ts
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```

在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型。

```ts
function buildName(firstName: string, lastName?: string) {
    // ...
}
```

和

```ts
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

共享同样的类型。与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面。 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 `undefined`值来获得默认值。 例如，我们重写最后一个例子，让 `firstName`是带默认值的参数：

```ts
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
```



```
总结：
	1. 可选参数使用 lastName?: string 的形式定义
  2. 可选参数必须放在最后
  3. 可选参数可以有默认值，且当传入参数为undefined时默认值生效。
  4. 当有默认值以后不需要放在最后
  5. 当有默认值以后可选参数类型与默认值类型共享，也就是不需要写类型。只需要 lastName = "Smith" 即可，等价于 lastName:string = "Smith"
```



### 1.4.3 剩余参数

必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。 有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 `arguments`来访问所有传入的参数。

在TypeScript里，你可以把所有参数收集到一个变量里：

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（ `...`）后面给定的名字，你可以在函数体内使用这个数组。

这个省略号也会在带有剩余参数的函数类型定义上使用到：

```ts
let buildNameFun: (fname: string, ...rest: string[]) => string = function(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}
```



### 1.4.4 this 

#### 1.4.4.1 this 和 箭头函数

JavaScript里，`this`的值在函数被调用的时候才会指定。 这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么。 但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候。

```js
let deck = {
    cards: ['aa', 'bb'],
    create: function () {
        console.log(this.cards)
    }
}
let cards = deck.create 
cards() // undefined
```

为什么呢？因为js中，this指向调用的对象，显然，最后调用cards的时候浏览器中为window，node中为空对象，因此没有cards这个属性，所以为 undefined。

如果想要拿到当前环境的this对象，可以使用箭头函数，箭头函数则保证了this始终指向上下文。

```js
let deck = {
    cards: ['aa', 'bb'],
    create: function () {
        return () => console.log(this.cards)
    }
}
let car = deck.create() 
car() // ['aa', 'bb']
```



#### 1.4.4.1 this 参数

typescript 提供一个显式的 `this`参数。 `this`参数是个假的参数，它出现在参数列表的最前面：

```ts
function f(this: Deck) {
    // 函数里面的this指向 Deck
}
```



### 1.4.5 泛型

在像C#和Java这样的语言中，可以使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

以下函数，传入值和返回值类型相同。

```ts
function identity<T>(arg:T):T{
	return arg
}
identity('myString')
```

以上，`T` 称之为 `泛型变量`。使传入参数类型始终和返回类型相同。

泛型变量使用：

```ts
function loogIdentity<T>(arg: T):T{
	console.log(arg.length)
  return arg
}
```

如上代码，打印 arg 长度，但是如果arg为一个数字，那么则报错。如果我的泛型变量 T 不想为任意类型值，那么：

```ts
function loogIdentity<T>(arg: T[]):T[]{
	console.log(arg.length)
  return arg
}
```

如上，给了 T 一个限制，必须是T类型的数组。那么再打印 arg 则不会再报错。

### 1.4.6 泛型接口

以下列子，定义一个泛型接口并去使用它，GenericIdentityFn 泛型接口有一个泛型函数，参数 arg 类型和函数返回类型相同。

```ts
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如： `Dictionary<string>`而不只是`Dictionary`）。 这样接口里的其它成员也能知道这个参数的类型了。

```ts
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity; 
```

以上代码，泛型变量 T 的类型为 number。

### 1.4.6 泛型类

实例部分可以使用 泛型类型，静态部分不能使用

```ts
class A<T> {
	value: T
}
let a = new A<number>()
a.value = 1 // 只能赋值为number类型
```

类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

### 1.4.7 泛型约束

在约束泛型变量的时候可以使用接口，让泛型去继承这个接口。

```ts
interface LegnthWise {
	length: number
}
function logLength<T extends LengthWise>(arg: T):T{
  constole.log(arg.length)
  return arg
}
// 需要传入符合约束类型的值，必须包含必须的属性
logLength({length: 10, value: 3});
```

这样子就约束泛型变量必须有length属性。

##### 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 `obj`上，因此我们需要在这两个类型之间使用约束。

```ts
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```



















