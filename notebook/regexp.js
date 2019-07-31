function ArrayRegTest (arr, regex) {
   for (var i = 0 ; i < arr.length ; i++ ) {
      console.log(`第${i}项匹配到的结果是 ${arr[i].match(regex)}`);     
   }
}


var a = 'hello I am Lili, I am a student'
 var a1 = a.match(/am/);
 var a2 = a.match(/am/g);
 var a3 = a.match(/i/gi);
//  console.log(a3);

var b = "the phrase 'regular expression' is often abbreviated as RegEx or regex I can call it Regex or REGEX, eegex is Error"
// [] 元字符定义一个字符集和和表示其中间的所有字符都是集合的组成部分
var b1 = b.match(/[Rr]eg[Ee]x/g);
var b2 = b.match(/[Rr]eg[Ee]x/ig);
var b3 = b.match(/[Rre]eg[Ee]x/ig);

console.log(b1);

// [0123456789][abcd...z][ABCD...Z] 由于经常被使用到
// 所以[0-9][a-z][A-Z]可以用来作为上诉的简写来使用
var c = [ 'a1', 'b2', 'cc', 'AZ', 'c7', '33' ]

// ArrayRegTest(c, /[a-z]/);
// ArrayRegTest(c, /[a-z][0-9]/);
// ArrayRegTest(c, /[a-zA-Z]/);
// ArrayRegTest(c, /[a-zA-Z0-9]/);

// 取非运算 [^]
// ArrayRegTest(c, /[0-9]/);
// ArrayRegTest(c, /[^0-9a-z]/); // 去除既不是数字且不是小写字母的字符串

// 元字符 是一些在正则表达式中有着特殊的含义的字符
// /\d/ /\D/ 相当于 [0-9] [^0-9]
// /\w/ //W/ 相当于 [a-zA-Z0-9] [^a-zA-Z0-9]