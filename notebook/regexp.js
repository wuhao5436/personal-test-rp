function StringRegTest (str, regex) {
   console.log(str.match(regex)[0]);
}
function ArrayRegTest (arr, regex) {
   for (var i = 0 ; i < arr.length ; i++ ) {
      console.log(`第${i}项匹配到的结果是 ${arr[i].match(regex)[0]}`);     
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

// console.log(b1);

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

// + * {n,} 这类元字符都是贪婪形的元字符，会无限制的匹配
// 例如 ： <b>aaa</b> bbbbb <b>cccc</b> 在使用<[bB]>.*<[bB]> 匹配的过程中会吧中间不在html标签中的bbbb也匹配进去
// 所以应对这种话需求的时候就要使用 非贪婪模式的 +? .? {n,}? 进行匹配 也称“惰性型”元字符
// 正确的匹配是 <[bB]>.*?</[bB]>

// 匹配边检
// /cat/ 会把 "cat scattered his fodd all over the room"  中的cat 和 scattered 中的cat 都匹配出来
// 应对的方式 是 /\bcat\b/ \b 是单词边界 可以吧单词独立匹配出来
// 正则实际上不懂什么是单词什么不是单词 他匹配的规则是 判断这个边界位置是不是能够构成单词的字符 \w 还是 \W
// \b b boundary
// 同样 \B 取反 明确不匹配单词

//(?m) 这个标识加入以后是为了多行匹配的过程中遇到换行符视为一个字符串分隔符，这样就可以把每一行都分割开匹配
// 需要注意的是有许多的正则表达式不支持(?m)

// 子表达式
// 字表达式用() 来定义
var d1 = ['http', 'https']
// ArrayRegTest(d1, /https?/); // 紧跟在s后面的? 会将带s的http和不带s的http都匹配出来
//  html 中经常使用到的nbsp:; 表示的意思是word no breaking sapce 就是这个单词中间不是空格，是不可拆分换行显示的
// 如果要使用正则把这个匹配出来 如果使用 /nbsp:;{2}/ 匹配两个nbsp是不可能匹配出来的 只能匹配出nbsp:;;;;这样的文本
// () 可以解决这个问题

// var d2 = ['nbsp:;', 'nbsp:;;', 'nbsp:;;;', 'nbsp:;nbsp:;', 'nbsp:;nbsp:;nbsp:;']
// ArrayRegTest(d2, /(nbsp:;){2,}/)

// var d3 = '127.16.8.7'
// var resd3 = StringRegTest(d3, /(\d{1,3}\.){3}\d{1,3}/)

// var d4 = ['1993-01-21', '2000-05-22', '2010-07-23', '20222222']
// ArrayRegTest(d4, /[19|20]\d{2}/);  // 这个是错误的，为什么这个是错误的
// ArrayRegTest(d4, /(19|20)\d{2}/);  // 这个是正确的，

// 正则表达式的阅读规则
// 包含复杂子表达式的正则表达式应该先内层后外层的规则进行阅读，而不是自左向右的阅读

// 回溯
// 怎么引出来的这个问题 
// 要求匹配html中所有的h1-6的标签 使用 /<[Hh][1-6]>.*?<\/[Hh][1-6]>/ 可能会匹配出<H1> ...... <H2> 的内容