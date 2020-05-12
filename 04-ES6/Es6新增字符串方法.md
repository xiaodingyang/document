## 1.1 实例方法：includes(), startsWith(), endsWith()

- 传统上，JavaScript 只有`indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

  > **includes()**：返回布尔值，表示是否找到了参数字符串。
  >
  > **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
  >
  > **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

  ```JavaScript
  let s = 'Hello world!';
  
  s.startsWith('Hello') // true
  s.endsWith('!') // true
  s.includes('o') // true
  ```

- 这三个方法都支持第二个参数，表示开始搜索的位置（从1开始）。

  ```js
  let s = 'Hello world!';
  
  s.startsWith('world', 6) // true
  s.endsWith('Hello', 5) // true
  s.includes('Hello', 6) // false
  ```

- 上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。



## 1.2 实例方法：repeat()

- `repeat`方法返回一个新字符串，表示将原字符串重复`n`次。注意：n 不能为`负数` 或 `Infinity`

  ```js
  'x'.repeat(3) // "xxx"
  'hello'.repeat(2) // "hellohello"
  'na'.repeat(0) // ""
  ```

- 参数如果是小数，会被向下取整。如果参数是 0 到-1 之间的小数，则等同于 0。参数`NaN`等同于 0。

  ```js
  'na'.repeat(2.9) // "nana"
  'na'.repeat(-0.9) // ""
  'na'.repeat(NaN) // ""
  ```

- 如果`repeat`的参数是字符串，则会先转换成数字。

  ```javascript
  'na'.repeat('na') // "" 因为转为数字以后是 NaN
  'na'.repeat('3') // "nanana"
  ```



## 1.3 实例方法：trimStart()，trimEnd()

- [ES2019](https://github.com/tc39/proposal-string-left-right-trim) 对字符串实例新增了`trimStart()`和`trimEnd()`这两个方法。它们的行为与`trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

  ```js
  const s = '  abc  ';
  
  s.trim() // "abc"
  s.trimStart() // "abc  "
  s.trimEnd() // "  abc"
  ```

  

- 上面代码中，`trimStart()`只消除头部的空格，保留尾部的空格。`trimEnd()`也是类似行为。除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

- 浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。



