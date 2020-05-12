# 一、Python 基础

## 1.1 Python 初识

### 1.1.1 Python的设计目标

- 简单优雅的语言，像自然语言一样容易理解。
- Python是开源的，全世界程序员都在为之添砖加瓦。
- Python特别适合 `短平快` 的日常任务。



### 1.1.2 Python 的特点

- Python 是完全面向对象的语言
- Python 拥有强大的标准库，代码量极少
- Python拥有海量第三方模块



### 1.1.3 Python 解释器执行流程

py 源代码文件 ==> python 解释器 ==> cpu



### 1.1.4 print 函数

print 用于向控制台输出字符串，加 `\n` 换行。

```python
print('锄禾日当午', '\n汗滴禾下土')
```

![](https://xiaodingyang-1300707163.cos.ap-chengdu.myqcloud.com/Markdown/Snipaste_2019-12-06_10-36-32.png)

### 1.1.5 注释

python 两种注释方式

```python
单行注释：# 我是单行注释
块注释：""" 我是块注释 """
```





## 1.2 变量与字符串

### 1.2.1 变量

##### 1. 变量的作用：

- 成语的作用就是用来处理数据
- 编程语言中数据使用变量的形式保存
- 为变量设置 “值” 的过程，称为 `赋值`



##### 2. 定义变量

```python
name = "silence"  # 字符串
age = 18  # 数字
mar = False  # 布尔值(True, False)
```



##### 3. 变量命名

- 见名知意
- 只能包含 `字母`，`下划线`，`数字`，且不能以数字开头。
- 不能与 python 关键字重名。



##### 4. 给变量起个好名字

- 所有单词小写，多个单词之间使用`_`连接。
- 最好使用英文单词，不建议使用拼音。
- 长度不超过20个字符，过长可使用缩写。



### 1.2.2 变量数据类型

变量在赋值时会自动判断数据类型。python 最常用的有四种数据类型：

```python
name = "silence"  # str 字符串
age = 30  # int 整数
weight = 110.5  # float 浮点数
is_weekend = True  # bool 布尔型
is_weekend = False  # bool 布尔型
```

##### type 函数

- type 函数用于得到变量的数据类型。

- `语法`：变量 = type(变量名)。

- `输出`：str | int | float | bool

```python
name = "silence"  # str 字符串
age = 30  # int 整数
weight = 110.5  # float 浮点数
is_weekend_t = True  # bool 布尔型
is_weekend_f = False  # bool 布尔型

print(type(name), type(age), type(weight), type(is_weekend_f), type(is_weekend_t))  # <class 'str'> <class 'int'> <class 'float'> <class 'bool'> <class 'bool'>
```



### 1.2.3 基本运算符

基本运算符是指 python 中使用的基本数学计算符号。大部分运算符同 JavaScript，极少数不太一样，比如：

```python
num = 9 / 2  # 4.5 浮点数除法
num = 9 // 2  # 4 浮点数除法
num = 2 ** 4  # 16 N次方
```

### 1.2.4 input 函数

- 使用input函数将用户输入的字符串保存到变量(注意：保存的是字符串)

- `语法格式`：变量 = input("提示信息")

  ```python
  mobile = input("请输入您的手机号：")
  print("mobile", mobile)  # mobile 15680930388
  ```

##### 数字字符串相互转换

- 字符串 ==> 数字：int(str)，float(str)
- 数字 ==> 字符串：str(int)



## 1.3 条件语句

### 1.3.1 if else 判断语句

语法格式：

```python
if 判断条件:
	条件成立时执行语句块 # 执行语句通过缩进识别
else:
	条件不成立时执行语句块
```

```python
age = 18
if age < 18:
	print('语句')
	print('多个语句')
else:
	print('语句')
	print('多个语句')
	
```

判断条件规则：

- 判断条件必须是返回 `True` 或者 `False` 的表达式。







































































