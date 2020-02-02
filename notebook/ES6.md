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

## 字符串的拓展
* 在1个字符2个字节，对于（Unicode码）大于0xFFFF的字符，Javascript 需要4个字节来存储
* 对于文字的修改 for of 循环可以识别32位的 UTF-16 字符，**以后遍历字符串要用 for of 循环了**
* 'aaa'.codePointAt(0) > 0xFFFF来判断一个字符是由2个字节组成的还是4个字节组成的，相反操作是 String.fromCodePoint(0x20BB7)可以将码点返回对于的字符集。

## 数值的拓展
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
## 数组拓展
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

## 对象的拓展
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

## Symbol 介绍
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
## Promise
* 创建一个promise,
```
const promise = new Promise((resolve, reject)=> {})
```
* promise一旦发生不可逆转，promise有三种状态 pendding, resolved, rejected
* Promise.prototype.then 方法返回一个新的promise，注意不是原来的那个promise了
* “promise会吃掉错误”，是指promise内部的错误不会影响promise外部代码的运行
* Promise.prototype.finally() 不管怎么样都会执行
* Promise.all() `
    const p = Promise.all([p1,p2,p3])
` 只有全部resolved，才会调用p的resolved, 注意，如果子promise有自己的catch方法，all 的 promise 不会调用catch方法。
* Promise.race([p1,p2,p3]), 只要有一个子promise状态改变，那么外层的promise状态就会改变，可以用这个特点来组装一个超时报错的网络请求。
* Promise.resolve(参数) 可以将一个对象转化成Promise对象。如果参数是空或者是简单数据类型，直接返回一个resolved状态的Promise，如果是promise对象，原封不动返回，如果是thenable对象，会立即执行thenable方法中的then方法
* Promise.reject(参数)，大部分与Promise.resovle相同，但是抛出的错误是reject(参数)中的参数，原封不动的抛出
* Promise.try 可以兼容同步代码和异步代码执行

## Interator 和 for...of 循环
* 一种数据结构如果有了Interator接口，那么我们就称他为iterable
* ES6规定，默认的Iterator 接口都部署在 Symbol.iterator 属性上，执行这个函数就会返回一个遍历器
* for...of 循环可以break, continue return 等跳出循环。
* 如果一个数据有个interator接口那么它就可以被for...of 遍历
> Generator 函数的语法
* Generator 函数有事ES6 提供的一种异步解决方案，语法上可以理解成一个状态机，封装了很多内部状态
## Generator 函数的特征 
    * 在function关键字和函数名之间有个*号
    * 在函数内部使用yield表达式
    * generator 的返回值是一个遍历器对象
```
function* hello() { 
 yield 'hello';
 yield 'world';
 return 'ending';
}
```
* Generator 函数调用后不执行，而是返回一个指向内部状态的指针对象，也就是Interator对象，必须调用next方法分段执行
* `var hl = hello()` 
    * hl.next 执行到第一个yield停止执行， 返回一个对象`{value:'hello', done: false}`
    * next 执行完毕的时候会返回这个对象`{value:undefined, done: true}`
    * next 方法的参数表示上一个yield表达式返回的值
    * for...of 循环可以自动遍历Generator函数生成的Interator对象，不需要一直调用next方法
* Generator.prototype.throw 方法，可以在函数体外抛出错误，函数体内接收错误。throw方法只能在Generator对象开始next后执行，且执行时会顺带执行一条next
* 如果Generator对象内部的错误没有捕获，那么JS引擎将认为这个Generator已经运行结束了
* Generator.prototype.return() 可以返回给定的值，并且中介Generator函数
* 如果Generator函数内部有try...finally 代码块，那么return 将会推迟到finally中的代码执行完成再执行
* 如果想在一个Generator函数中调用另一个Generator函数，那么需要使用到yield表达式, 如果不使用yield表达式，那么执行到那一个next的时候返回的是一个Iterator对象
    ```
    function* foo() {
        yield 'a';
        yield 'b';
    }
    function* bar() {
        yield 'x';
        yield* foo();
        yield 'y';
    }
    // 上面的调用相当于
    function* bar() {
        yield 'x';
        yield 'a';
        yield 'b';
        yield 'y';
    }
    ```
    Generator作为对象的属性
    ```
    {
        * aa() {}, // 等同于
        aa: funciont* () {

        }
    }
    ```
## Generator 函数的异步应用
* Thunk 函数，在JavaScript语言中Thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为单参数的函数
* Thunk 函数适合用于Generator函数自动执行
* 工具库co用来适配Generator函数的自动执行
> async 函数
* async 函数的就是Generator函数的语法糖
* async 函数对Generator函数的改进提现在以下四点 
     * async 函数自带执行器，不需要next去求值
     * 更好的语意
     * 更好的适应性，await会自动把后面的值转化为Promise对象，这样就不需要像 yield 一样，限制后面只能是Thunk函数或者是Promise对象
     * 返回值是promise。只有当await命令后面所有的Promise对象执行完成才会改变状态，除非遇到return语句或者抛出错误

* 任何一个await语句有reject状态，整个async函数都会中断执行，如果不希望发生中断的话要在async中使用try catch 语句
* 如果不存在先后关系promise可以同时出发
```
let [foo,bar] = await Promise.all([getFoo(), getBar()])
```
* **注意** 普通的async函数返回的是一个Promise对象，而异步的Generator函数返回的是一个异步的Iterator对象,同样可以理解为async语法糖自带执行器，而Iterator对象需要自己编写执行器
## class 的基本语法
* class 类中的 constructor 方法，是构造方法， 其中的this代表实例对象，任何一个class类都有constructor方法，如果没有显示申明，那么就会默认声明。
* class 类本身是函数，本身就指向构造函数 
* 判断一个实例是不是某个类的实例，使用 foo instanceof Foo
* hasOwnProperty 检查属性是否在自身
* `foo.__proto__ === Object.getPrototypeof(foo)`
* 存值函数和取值函数是定义在对应属性的描述对象上的，和ES5一致
* 父类的静态方法可以被子类继承，静态方法是可以从super上调用的
* 实例的属性可以卸载class类的最顶层，这时候不需要用this绑定了
```
class IncreasingCounter {
  myCount = 1;
  constructor() {
    this._count = 0;
  }
}
```
* 静态属性，静态方法
```
 class Student () {
     static title = '省级教学试点'
     static saySchool () {
         console.log('我是明德中学的')
     }
 }
 Student.school = '明德中学'
```
* 私有属性和私有方法 可以加#aa ,那么#aa将变成私有
* new.target 返回new命令作用于的哪个构造函数，如果是不是直接new出来的，那么new.target会返回一个undefined。

## Class 的继承
* super的作用，调用父类的constructor，父类的构造函数
* 在子类的构造函数值，中有调用了super之后才能使用this关键字。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例
```
class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```
* Object.getPrototypeOf(),可以从子类获取父类
```
Object.getPrototypeof(ColorPoint) === Point
// true
```

* super 关键之 （多看几次）
    * super关键之当函数使用，**只能**在子类的constructor函数中调用
    * 作为对象使用时，在普通方法中调用指向父类原型对象，在静态方法中，指向父类， super.a 指向 父类.prototype.a 这个函数，

* 继承 
```
class A {}
class B extends A {}
B.__proto__=== A
B.prototype.__protp__ = A.prototype

```
    * 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
```
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```
```
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```
* 子类实例的`__proto__.Proto__`是父类实例的`__proto__`

## JS module 的加载
### script标签
* 默认HTML中的script标签是按照顺序同步加载，执行到script标签处js会等待script src 中的资源下载完成继续执行
* script 标签可以通过添加属性，执行异步加载
  * defer 表示dom渲染完成后执行，按照顺序
  * async 表示下载完成后执行，无法保证执行顺序
```
<script src='../aa/bb/cc.js'  defer > </script>
<script src='../aa/bb/cc.js'  async> </script>
```
* scrpit 标签中添加属性 type="module"  会认为是es6模块，效果类似与 defer

### commonJS 和 ES6 的加载区别

* commonJS 使用 require 导入 使用 module.exports 导出,  输出的是一个拷贝对象，对象在代码执行的时候生成。
* ES6  使用import 和 export 导入到处，输出的是一个引用，静态资源在解析的过程中就可以输出。
* ES6 输出的是一个引用，如果输出的是对象，可以修改对象的属性，但是不能重新赋值，被引用的变量是只读的。

### nodeJS 对 ES6 模块的加载

* nodeJS 默认使用commonJS 加载方式
* nodeJS 13.2 以后支持了 ES 6的加载方式, 但是文件名要以`.mjs`的后缀命名。如果不希望以`.mjs`结束，那么要在 `package.json`中规定 `type:"module"`
* 同理 如果想使用commonJS 规范，也可以以`.cjs`后缀结尾，或者规定`type:"commonjs"` (默认)

### 入口文件的规定
* main 执行入口
```javascript
{
    main : './src/index.js'
}
```
*  exports 字段的优先级要高于main字段
```javascript
// aa.js
{
  "exports": {
    "./submodule": "./src/submodule.js",
    ".":"./main.js"  // 兼容性写法
  }
}
```
* 引用的使用可以使用 `import  submodule from 'aa/submodule' ` 
* 如果没有在exports字段中指定别名那么就不能使用这种方式引用
* exports 字段只有新版本的node支持, `.`这个别名，可以为ES6和CommonJS指定不同的入口 (注意！有其他别名的时候不能这样做)
```javascript
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",    //requrie()
      "default": "./main.js"    // es6
    }
  }
}
```

###  commonJS 和 ES6 的相互加载

* ES6 加载commonJS ，`import a from 'a.js'`  必须整体加载 `a`
* commonJS 加载 ES6 
```javascript
(async () =>{
    await  import ('../b.js')
})()
```

### 加载原理
* commonJS 加载原理： 在代码运行的过程中生成一个单例对象，上面有exports属性，引用的时候就会在exports上面取值。


## 修饰器 @
* @修饰器对类的行为的改变是在编译阶段，而不是运行阶段。
* mixin 的实质是这样的
```
const Foo = {
  foo() { console.log('foo') }
};
class B () {

}
Object.assign(B.prototype, Foo)

```
* @装饰器可以用于类的方法，这时装饰器方法一共有三个参数 
```
 functions readonly (target, name, descriptor) {    
     //第一个是类的原型对象 Person.prototype
     //第二个要修饰的属性名称，
     //第三个是这个属性的描述对象，属性的描述对象可以被装饰器修改
 }
```
* 函数不可用装饰器，应为装饰器存在提升问题