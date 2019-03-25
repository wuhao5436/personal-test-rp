# ES6 学习笔记
## let and const 
> const 
*  const的原理只是保持内存地址所保存的值不变，对于简单类型是有用的，但是对于复杂类型，const只保存其引用，使用Object.freeze({})方法保存其不变， 如果需要深层次锁定，需要自己写一个方法，循环遍历检查属性，全部使用freeze方法冻结；
> 函数声明语句和函数表达式
* function a () {} 是函数声明语句;
* var a  = function () {} 是函数表达式；
> 顶层变量和全局变量
* var 声明的变量属于顶层变量 也是全局变量
* let const 声明的变量开始区别顶层变量和全局变量 在全局声明的 let a = 1 , 只属于顶层变量而不属于全局变量 window.a === undefined

## 变量解构
* 具备 Iterator 接口的数据类型可以进行解构
* 解构使用的是匹配模式，只要等号两边的模式相同，左边的就会被解构成右边的, 解构不成功的将变成undefined
```
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    foo // 1
    bar // 2
    baz // 3
```
* 在使用解构时，如果使用到变量，那么这个变量一定要提前声明
```
    let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
* 对象结构的原理： 对象的结构是先找到同名属性，让后在付给对应的变量，真正被赋值的是value而不是key，如下：
```
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```
* 在对对象解析, 嵌套赋值的时候要注意区别‘模式’和‘变量’,例如下面所说的0 就是模式， first就是变量； *（个人感觉这种模式会引起混乱，不如分步骤解析）*；
```
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```
* 解构的规则是如果右边的不是对象或者数组，先把他转化成对象或者数组

* 解构语句的主要用途
    * 交换变量值 [x,y] = [y,x]
    * 一次性返回多个值
    * 函数参数的定义，包括有序的和无序的，及默认值设置
    * **提取JSON**
    * 等等

> 字符串的拓展
* 在1个字符2个字节，对于（Unicode码）大于0xFFFF的字符，Javascript 需要4个字节来存储
* 对于文字的修改 for of 循环可以识别32位的 UTF-16 字符，**以后遍历字符串要用 for of 循环了**
* 'aaa'.codePointAt(0) > 0xFFFF来判断一个字符是由2个字节组成的还是4个字节组成的，相反操作是 String.fromCodePoint(0x20BB7)可以将码点返回对于的字符集。

* 修改当前npm源地址（例如切换到taobao源） npm config set registry https://registry.npm.taobao.org
