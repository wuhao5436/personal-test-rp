# python
### 资料 
* 要学些什么 https://www.imooc.com/article/36516
### print
* print('aa', 'bb')  // aa bb
* print('aa', 'bb', sep='-', end='#') // aa-bb#

### 注释
* 单行注释 #
* 多行注释
```
'''
注释1
注释2
注释3
'''
"""
注释1
注释2
注释3
"""
```

### 换行
print('aaaaaaaaaaaaaa\
bbbbbbbb')

### 单引号和双引号混合使用
* print(""" """)或者print(('''      '''))

### 特殊字符处理
* print('\\n') 输出\n
* print('\\') 输出\
* 在字符串前面加上r或者R 那么不会转义字符串

### python的数学计算

运算符 | 举例 | 描述
--- | --- | ---
 \+ | 1+2 = 3
 \- | 2-1 =1
 \* | 2*2 =4
 \- | 6/2 =3
 \** | 2**3 = 8 | 乘方
 \% | 13%5 =3 | 取余
 \// | 20//6 | 取整
 round | round(5.9) -> 6 <br/>  round(5.9.1, 1) -> 5.9 | 取整，默认取到整数位，后面的参数可以设置取到第几位
 abs | abs(-1) -> 1 | 取绝对值
 \* | 以下的是属于math函数的 首先要import math
 math.ceil | match.ceil(2.00001) -> 3 | 向上取整
 math.floor | match.floor(2.9999999) -> 2 | 向下取整
 match.trunc | match.trunc(2.9883) -> 2 | 截取整数位
 math.pow | match.pow(3,2) -> 9 | 幂运算

## 字符串方法
* 字符串的拼接 'a'+'A'+'B'*3+'hello world'[6:7] -> aABBBw   'hello'[2:] -> llo
* String.strip([chars])
    * chars 如果没有值的情况下，默认剔除字符串首尾的 (\n \r \t '', 换行符，回车符，制表符， 空格)， 例如 '   aaa  \n '.strip() ->  aaa
    * 如果strip有参数，那么会先将参数拆解，然后剔除字符串首尾包含被拆解的字符。例如 '123ab112233c123'strip('12') -> ab112233c
    * lstrip, rstrip 代表只剔除左边的或者只剔除右边的。
* 判断字符串的开头结尾
    * String.startswith() 
    * String.endswith()
    * 'apple'.startswith('a') true 'apple'.endswith('b') false
* 返回字符串中字符的位置 
    * String.find()
    * String.index()
    * 'apple'.find('p') -> 1 ; 'apple'.find('m') -> -1
    * 'apple'.index('p') -> -1 ; 'apple'.index('m') -> 报错
* 替换
    * 'apple'.replace('a', 'aaaaaaaa') -> aaaaaaaapple
    * len('apple') -> 5
    *  String.count 'apple'.count('p') ->2
    *  String.upper 'aPPle'.upper() -> APPLE
    *  String.lower 'aPPle'.lower() -> apple
    *  String.center(n, '-')  如果小于或等于字符串的长度，那么不会被包裹，如果大于字符串的长度，先补充右边的，然后补充左边的。
        * 'apple'.center(4,'-') -> apple; 
        * 'apple'.center(5,'-') -> apple; 
        * 'apple'.center(6,'-') -> apple-; 
        * 'apple'.center(7,'-') -> -apple-; 
        * 'apple'.center(8,'-') -> -apple--; 