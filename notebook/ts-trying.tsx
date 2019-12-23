// 对象interface
interface Person {
    name: string,
    age: number,
    nickName?: string,
    readonly id: string, // 只读的约束在于第一次赋值的时候，而不是第一次给只读属性的时候
    readonly brithDay: string,
    readonly score: ReadonlyArray<number>,
    friend: (string | number)[],
    [propName: string]: any,  // 任意属性，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。
}

var p1: Person = {
    name: 'xiaoli',
    age: 18,
    id: '3562243',
    brithDay: '1995-01-21 11:30',
    score: [60, 60, 45],
    friend: ['lucy','lili', 202]
}



// 函数申明式和函数表达式的类型

// 申明式
function sum (a:number, b:number): number {
    return a+b;
}
// 表达式
let sum2 = function (a:number, b:number): number {
    return a+b;
}


// 以上两种的区别是？ sum2实际上只是对=右边的的匿名函数进行了类型定义, = 左边的sum2是通过赋值操作推论而来的。
// 改善

let sum3: (a:number, b:number) => number = function(a:number,b:number):number{
    return a+b
}

// **重要** 此处的=>不是箭头函数 ，是Typescript中函数的定义，左边是输入类型，右边是输出类型

sum ('1', 2);
sum (1);
sum (1, 2, 3);


// 函数interface
// 注意！可选参数必须放在最后面
// 如果设置了默认值那么可选参数就不限制在最后面了
interface Func {
    (name: string, age: number, score: Array<number> ,nickName?: string): boolean
}

let sayHello:Func = function ( name, age ,score, nickName='',  ) {
    console.log('I am '+ name+ 'I am my nickName is' + nickName, score.join('#'));
    return !!nickName;
}

let sayGoodBye:Func

sayGoodBye = function (name:string, age:number, score: number[] ) {
    console.log(`goodbye I got ${score.join(',')} I am ${name} , and ${age} years old`);
    return true
}


sayHello('小李', 18, [1,2,3], '小李飞刀')



//可索引类型 interface
interface StringSet {
    [index: number]: number,
    length?: number
}

let a1: StringSet = [1,2,3]

//类的interface 
//类的interface只检查实例属性，静态属性需要再定义一个静态属性的检查

interface PersonConstructor {
    new (name:string, age:number)
    typeName: string,
    logName():void 
}

interface PersonInterface {
    log(): void
}

const Person: PersonConstructor = class Person extends PersonInterface {
    name: string
    age: number
    static typeName = 'Person type'
    static logname() {
        console.log(123);
        return '123'
    }
    constructor (name:string,age:number) {
        super();
        this.name = name
        this.age = age
    }
    log() {
        console.log(this.name, this.age)
    }
};

//interface 继承

interface A {
    name: string
}
interface B  {
    age: number
}
interface C {
    gender: string
}
var aa: A = {
    name: 'xiaoli'
}

var bb: B = {
    age: 18
}

var cc: C = {
    gender: 'man',
}

interface D extends A,B,C {}

var dd : D = {
    name: 'Cylin',
    age: 18,
    gender: 'man',
}

// 混合类型的interface 

// 内置对象？ 内置对象
// 

// 类型断言
// 有的时候逻辑中需要通过点某种方法来确定数据是哪种类型的？然后调用相对应的方法，这种情况下需要用到断言
// 例如
// 报错示例1
function getLength1(key: string|number): number {
    return key.length
} 
// 报错示例2
function getLength2(key: string|number): number {
    if (key.length) {
        return key.length;
    } else {
        return key.toString().length
    }
} 
// 报错示例3  使用断言 

// function getLength3(key: string|number): number {
//     if ((<string>key).length) {
//         return (<string>key).length;
//     } else {
//         return key.toString().length
//     }
// }

// 使用断言 在tsx 中要使用as
function getLength4(key: string|number) {
    if ( (key as string).length ) {
        return (key as string).length
    } else {
        return key.toString().length
    }
}

// 错误示例4 使用断言 断言一个联合类型以外的类型
function getLength5(key: string|number) {
    if ( (key as boolean) === true ) {
        return (key as boolean) === true? 1: 0
    } else {
        return key.toString().length
    }
}

// ts 可以使用的内置对象
// ECMAScript 提供的内置对象 Boolean Error Date RegExp
// BOM DOM 提供的内置对象 Document HTMLElement Event NodeList

// 运算符
interface Walk {
    walking: boolean
}

interface Singing {
    singing: boolean
}

interface Active extends Walk, Boy {}
interface Boy {
    [props: string]: Walk & Singing
}



let jack : Active = {
    walking: true,
    singing: true,
}
let tom: Boy = {
    a: {walking:true},
    walking: {walking:true,singing:true},
}

// 字符串字面量类型，用来约束只能是某几个字符串中的一个
// type EventName = 'click' | 'touch' | 'scroll'
// 感觉和enum有点类似，二者的区别是什么？

// 元组(Tuple)
// 数组合并了相同类型的对象，而元组合并了不同类型的对象
let stuSty: [string, number] = ['jack', 61]
stuSty[1] = 22;
// 当添加越界元素的时候，必须是元组中的数据类型
stuSty.push('http://xcatliu.com/');
stuSty.push(true);

// 枚举值 使用 enum 来定义
enum EnglishNum { first, second, third }

EnglishNum[0] === "first"
EnglishNum['second'] === 1

// 常数枚举 const enum 定义的枚举值类型

const enum Direct { Up, Down }

var d1 = [ Direct.Up, Direct.Down ]
// 编译完成后
// var d1 =  [0,1]


// TypeScript 中的类
// 参考 https://ts.xcatliu.com/advanced/class
// 首先要搞清楚 ES6 的类实现的功能 ES7实现的功能 已经TypeScript实现的功能

// ES7 实现了 static 定义静态属性的，静态类型的方式 
// TypeScript的类增加了三种修饰符  public private protected
// TypeScript的类增加了抽象类的概念 abstract

// public 修饰的属性和方法是共有的，可以被任何地方访问到
// private 修饰的属性和方法是私有的，只能在这个类内部使用
// protected 修饰的属性和方法可以被自己和子类访问

// abstract 定义抽象类 抽象类是不可以被实例化的

abstract class A {
    public name;
    public constructor (name) {
        this.name = name
    }
    public abstract sayHi (); // 方法上的abstract 只有在类是抽象类的情况下及class是abstract的情况下才能使用
}

let a = new A ('Jack');

class XiaoA extends A {
    public sayHi () {
        console.log(this.name)
    }
}

let xiaoAEat =  new XiaoA('aaa')

// 类的类型
// 一句话“与接口类似”？？？？ 什么叫与接口类似？ 返回去看下
// 这里的接口是指 interface, 
// >>>
//      接口是一个非常灵活的概念？除了可以对类的一部分行为进行抽象以外？也常用于对【对象的形状】进行描述 
// >>>
class AInterface {
    name: string;
    constructor (name:string) {
        this.name = name
    }
    sayHi(): string {
        return 'i am' + this.name
    }
}

let a2 :AInterface = new AInterface('jack');
console.log(a2.sayHi()); // i am jack

// 类实现接口
// 实现(implements) 实现是面向对象中的一个概念！！！！ 不是我们普通话中说的“实现”这种普通意思
// 类 ： 一个类只能继承另一个类
// 不同的类之间想提取一些公共的方法，这样靠继承另一个类是不行的，那么需要把特性提取成接口（interface），这个时候用implements关键字来实现

interface Alarm {
    alert();
}
interface Run {
    running ();
}

class Door {}
class SafeDoor extends Door implements Alarm {
    alert(){
        console.log('dididi');
    };
}
class Car implements Alarm , Run{
    alert () {
        console.log('dududu');
    }
    running () {
        console.log('speed 120km/h');
    }
}

// 接口可以继承接口
interface AlarmLoudly extends Alarm {
    voiceAdd ();
}
// 接口继承类
class Point {
    public x: number
    public y: number
}

interface Point3d extends Point {
    z: number
}

let newPoint: Point3d = {x:1, y:1, z:1};

// 混合类型
// ??? 这里感受不到什么特别特殊的地方，就是感觉很复杂， 混合是指什么混合？ 难道是指interface中既有对象类型的规范？又有函数类型的规范？？

// 泛型：
// 泛型是指在定义函数，接口或类的时候， 不指定类型，二在使用的时候再指定类型的一种特性
// 示例：
function createArr (inner:any): any[] {
    return [inner]
}

createArr(1)  // 没有准确的定义返回值的类型
// 泛型写法：
function createArr1<T> (inner: T): T[] {
    return [inner]
}
// 先在函数名称后面定义<T>, 代表任意输入类型， 后面就可以使用T了
createArr1('apple');
createArr1(false);
// 在调用的时候可以指定具体的类型，也可以不指定，让类型推论自动推论出来
createArr1<number>('111');
createArr1<number>(222);

// 多个参数
function changePosition<T,U> ( arr: [T, U] ): [U, T] {
    return [arr[1], arr[0]]
}

// 泛型约束
interface HasLength {
    length: number
}

function showLength<T extends HasLength> (a: T): number {
    return a.length;
}

showLength('112')
showLength({length:1, 0: 123})
showLength({0: 123})

// 泛型接口
// 混合类型的接口定义也可以使用泛型这一概念，反正就是预定义一种类型（个人理解）

// 泛型类
class Sum <T>{
    init: T
    add: (a:T, b:T ) => T
}

var str1 = new Sum<string>();
str1.init = '1'
str1.init = 1

var num1 = new Sum<number>();
num1.init = '1';
num1.init = 1;
num1.add = (x,y)=> x+y

// 泛型参数的默认类型
class StringConcat <T=string> {
    init: T
    concat: (a:T, b:T ) => T
}

// 声明合并。
// 这个合并的概念：
// 这个合并和对象属性覆盖不同，可以看做是一种“或”的关系，
// 如果同一个字段声明了两种形式，如果这两种形式不相同那么会报错, 下面
interface employee{
    name: string;
    saySomeThing(a:string):string
}
interface employee {
    id: string
    saySomeThing(a:string):string
}
interface employee {
    age: number
    // id: number
}
let emp1: employee = {
    name: '张全蛋',
    id: '350065',
    age: 25,
    saySomeThing: (param) => {
        // return this.age
        // console.log(this.age)
        return '1'
    }
}
