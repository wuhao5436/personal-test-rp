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

> 对象的拓展
* 对象的每个属性都有一个描述对象，用来控制该属性的行为
```
let obj = {foo: 123}
Object.getOwnPropertyDescriptor(obj, 'foo')
//{
// value:123,
// writable: true,
// enumerable: true,
// configurable: true
//}
```
* 属性的遍历 
    * for...in 遍历自身和继承的可枚举属性
    * Object.keys 只遍历自身可枚举属性
    * Object.getOwnPropertyNames 遍历自身所有可枚举属性
    * Object.getOwnPropertySymbols 遍历自身所有Symbol属性键名
    * Reflect.ownKeys(obj) 遍历所有键名
* 遍历规则 数值 字符串 Symbol键
* **super关键字** 
    * this 总是指向函数所在的当前对象，儿super，指向对象的原型对象
* 解构 `const {x, y, ..other} = {x:3,y:4,z:5,p:6}` ;x == 3,y ==4, other == {z:5,p:6}
* 解构只是浅拷贝，而且解构不能复制原型上的方法
```
TODO: 调查一下Object.create()在干什么
get 和 set 研究一下
```
* 深拷贝方法
```
const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
)

const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
)

```
* 拓展运算符可以跟表达式，例如三元表达式

> 对象新增的方法 

方法 | 描述
--- | ---
Object.is | Object.is('aa','aa') //true, 判断两个值是否相等， 特性是 +0 != -0 , NaN = NaN ,(伪代码)
Object.assign | Object.assign不会拷贝不可枚举属性<br/>Object.assign有多种用法，详见阮老师的文章，概况如下<br/>1.为对象添加属性<br/>2.为对象添加方法<br/>3.克隆对象<br/>4.为属性指定默认值
Object.getOwnPropertyDescriptors() | 可以获取狗哥对象属性的描述对象descriptor,其中包括 value, writable, enumerable, configurable, get , set 等，
`__proto__` 属性| `var obj = Object.create(someOtherObj)` 指定obj 继承 someOtherObj, 非标准属性，只有在浏览器有部署
Object.setPrototypeOf() | 用来设置一个对象的原型 `Object.setPrototypeOf(object, prototype)`
Object.getPrototype | 读取一个对象的原型 `Object.getPrototype(obj)===objCreater.prototype // true`
Object.keys()<br/>Object.values()<br/> Object.entries() | 对象继承的，可遍历属性的XX
Object.fromEntries | Object.fromEntries 是 Object.entries 的逆操作，可用于map结构转化为对象。

> Symbol 介绍
* Symbol 是ES6引入的第七种数据类型，表示一种独一无二的数据类型
* Symbol 通过 Symbol 函数生成,Symbol值是原始类型的值，不是对象，不能用new来生成
```
let s = Symbol()
typeof s // symbol
```
* Symbol('aaa') 的参数只是当前Symbol值的一个描述，如果参数是对象类型，必须有toString 方法， s1.toString() // 'aaa' 可以看到当前Symbol的描述信息
* Symbol值不可参与运算
* Symbol作为key值时，不可用点操作符，哈哈，智障
* Symbol作为属性名时是公开属性，不是私有属性
* **牛逼用法：消除魔术字符串**
```
    var config = {
        trangle: Symbol()
    }
    using config.trangle xxxx
    // 忘记了看阮大爷的文档
```
* 可以遍历到Symbol值的属性或方法有 
    * Object.getOwnPropertySymbols
    * Object.keys()
    * JSON.stringify()
    * Reflect.ownKeys()
* 如果想创建同一个Symbol值，可以使用 Symbol.for('samekey'), 参数使用同样的描述字符串
* Symbol.keyfor 返回一个已经登记的Symbol类型的key，登记使用Symbol.for 登记

> Set 和 Map 数据结构
* ES6提供了新的数据结构Set，但是成员的值都是唯一的，没有重复的值
* Set可以接受一个具有interable接口的数据作为参数
```
    const a = new Set([1,2,3,3,3])
    a.size = 3
    for (let i of a) {
        console.log(i)
    }
    // 1,2,3
    [...new Set(arr|string)] // 可以用此方法来去重
```
* 在Set内部NaN是相等的，所以只会出现一个NaN
* Set结构操作 

方法 | 描述
--- | ---
add(value) | 添加值，返回Set结构本身
delete(value) | 删除某个值，返回一个布尔值表示是否删除成功
has(value) | 返回布尔值，判断是否包含
clear() | 清除所有成员
* Array.from 可以将Set结构转化为数组
* 关于Set结构的遍历，keys(), values(), entries() 由于Set结构没有键值所以遍历出的结果都是一样的。
* **666** Set结构很容易的实现并集，交集，和差集，而不用数组遍历那样麻烦。
* WeakSet
* WeakSet 的成员只能是对象，而且WeakSet 对象的成员不计入垃圾回收机制的，不可预测，可能随时会消失
* WeakSet 成员不可遍历
* Map 结构
* Map 结构的出现是为了解决key-value结构中，key只能是字符串的问题
* Map结构可以使用二维数组作为参数
```
const map = new Map([
    ['name','张三'],
    ['title', '张三的故事']
])

map.get('name') // 张三
// 或者
map.set(1,'aaaa')
map.get(1) // 'aaaa'
```
* 注意在使用复杂类型的数据作为key时，map对象比较的是指针是否相同，所以这里要小心出错 

方法 | 描述
---|---
size | 返回成员总数
set(key, value) | 设置Map结构，返回Map结构.所以可以使用链式写法
get(key) | 获取
has(key) | 查询
delete(key) | 删除，返回操作结果
clear(key) | 清除
keys(),values, entries(),forEach() | 遍历，forEach的第二个参数可以绑定this
* map 结构使用filter或者是map方法返回的还是map 结构
* WeakMap 只接受对象作为键名，null除外
* WeakMap 适用的场景是它的键所对应的对象可能会消失，WeakMap有助于防止内存泄漏
