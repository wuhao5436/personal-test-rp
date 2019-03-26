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

> 数值的拓展
* 8进制严格用0o表示, 二进制用 0b 表示
* 要转换成十进制使用Number方法 Number('0b10')
* Number的方法  

方法名称 | 作用
--- | ---
Number.isFinite(15) | 判断是否有限
Number.isNaN(NaN) | 判断是否是NaN
Number.parseInt() | 取整，同全局parseInt
Number.parseFloat() | 取浮点数，同全局parseFloat
Number.isInteger() | 判断是否是整数
* Math 的方法 

方法名称| 作用
--- | --- 
Math.trunc() | 去掉小数部分返回整数部分，可以对字符串和Boolean值操作
Math.sign() | 这个方法用来判断一个数是正数还是负数，有5种返回值，+-1，+-0，NaN
2**2 | ** 表示指数运算表示2的2次方

> 函数的拓展
* ES6中指定函数默认值的好处，明确哪些参数是可以省略的
* 函数的默认值可以使用解构的方式  
```
  function foo ({x, y=5} = {}) {
      console.log(x,y)
  }
  foo() // undefined, 5
```
* 函数的length属性，函数的length属性指定的是没有给默认值的参数的个数。而且注意了，只计算给默认值的参数左边的未给默认值的参数的个数，不计算rest参数
* 默认参数可以指定函数，这种用来指定函数必传，抛出错误是极好的。
* rest 参数(...tempArray)只能是最后一个参数，否则报错
* 函数的name属性，在ES6之前name属性只能取到声明式取到的值（`function a () {}`），ES6之后可以取到函数表达式(`var a = () => {}`)的name值 `a.name === 'a'`
* 构造函数的name是anonymous
* 如果箭头函数指向的多余一条语句，使用大括号，并且需要使用return语句。
* 有趣的一个例子 

```
const numbers = (...nums) => nums;
numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]
```
* 箭头函数使用注意事项 
    * 箭头函数不可用作构造函数，本质原因是箭头函数没有自己的this，只能使用外层代码的this，
    * 不可用yield命令，箭头函数不能用作Generator函数
* 函数调用优化，“尾调用优化”，在函数的最后一步调用另一个函数，这样外层函数就可以释放内部变量和内存函数的调用位置等信息。这将大大的节省内存（这种优化仅限于pipeline形式的函数）
* 对于大量消耗资源的递归也是一样，Fibonacci数列的计算可以大大放大计算量
* 柯里化（currying）将多参数的函数转化成单参数的形式
* 纯粹的函数式变成没有循环操作命令，只能通过递归来实现，如果要使用递归，一定要使用尾部递归。
> 数组拓展
* ... 拓展运算符 
    * 任何定义了Iteration接口的对象都可以使用...拓展运算符，对于没有定义Iteration接口的类数组对象，可以使用Array.from转化为真正的数组
    * 拓展运算符可以养来复制数组`a2 = [...a1]`， ES5使用concat操作来复制
    * 合并数组`[...arr1, ...arr2]`
    * 解构赋值 (注意只能放在最后一位)`[first, ...rest] = [1,2,3,4,5]`
    * [...'hello'],可以正确识别4个字节的Unicode字符。所以这个可以用于编写判断字符串length的工具函数
* Array 拓展的方法 

方法 | 作用
--- | ---
Array.from | 1. 可以将类数组对象和可遍历对象转化成真正的数组 <br/> 2. 常见的类数组对象，Nodelist和函数的arguments对象<br/> 3. 该方法相对于拓展运算符，本质不一样，拓展运算符依赖于Symbol.iterator遍历接口，该方法本质是`[].slice.call(arr1)`<br/> 4 . 该方法接受第二个参数fn，将fn处理过的item，放入新数组： 例如`Array.from(arr1, x=>x*x)`<br/> 5 . 一个有趣的例子`Array.from({ length: 2 }, () => 'jack') // ['jack', 'jack']`
Array.of | 将一组值转化为数组，注意区别 Array.of(3) 和 Array(3) 的区别就可以了
Array.find | `arr.find((n)=>n<0>)` 用于找到第一个符合条件的数组成员，未找到返回undefined，感觉用处不大，优点是可以识别NaN
Array.findIndex | 同上，未找到返回-1，这两个函数接受第二个参数绑定回调函数的this；
fill | 给定值填充一个数组 `[1,2,3].fill(7) // [7,7,7]`, 第二第三个参数可以指定填充位置
entries(), keys(), values() | 不需要解释了，使用for...of 遍历，手动遍历要调用遍历对象的next方法
includes | 判断数组是否包含某个特定值，第二个参数表示检查起始位置`[1,2,3].includes(3,2)`, 返回Boolean值，可以判断NaN
flat() | 用于将嵌套的数组拉品`[1,2[3,[4,5]]].flat(2) // [1,2,3,4,5]` 参数表示要拉平的层数，默认为1层，可以使用Infinity 无限拉升
* **注意！ES5对于数组中空位的处理方式不同，但是ES6会统一将空位转换成undefined** ，所以尽量避免空位的出现，比如我们可以用fill方法填充。