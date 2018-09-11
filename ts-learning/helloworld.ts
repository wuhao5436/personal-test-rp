function greeter(name) {
    console.log('hello ' + name);
}
var user = ['1', '2', 3];
var user1 = 'jack';
var user2 = 233;
var user3 = {age:48, trueName: 'jackMa', marry: true, children:['ma1','ma2', 007]};

greeter(user);
greeter(user1);
greeter(user2);
greeter(user3);

// 加入命令 tsc xxx.ts 可以对ts文件进行编译
// 使用编译器可以查看参数类型

// ts类的概念
class Student {
    fullName: string;
    constructor ( public firstName, public lastName, public separate ) {
        this.fullName = firstName + separate + lastName;
    }
    sayHello () {
        console.log('hello I am ' + this.fullName + ', I am saying Hello to everyone' );
    }
} 

var stu1 =  new Student('jack', 'ma', '-');
console.log(stu1.sayHello())
// interface 
interface ParamStandard  {
    firstName: string
    lastName: string
    separate: string
}

function greeting (person: ParamStandard ) {
    return "hello everyone I am " + person.firstName + person.separate + person.lastName;
}
var person1 = {
    firstName: 'liu',
    lastName: 'xiaomao',
    separate: '-'
}
document.body.innerHTML = greeting(person1);