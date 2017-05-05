**Node.js优化的建议**
-

###一，max-inlined-source-size
Node.js有个很有意思的参数：`--max-inlined-source-size` 
这个参数是关于v8优化器：

    v8优化器将包含注释的主体长度小于600（默认）个字符的内联函数。
    v8 优化器会将那些函数体字符长度(包含注释)小于600个字符的函数，优化为内联函数。
    
所以：
 1. 如果要循环调用一个函数，尽量让函数字符不要超过600
 2. 可以通过修改默认的max-inlined-source-size的值来提高执行效率
 

###二，不要滥用let和const
let的实现方式导致了，let会比var效率低5%。特使是在for循环中，没有特殊需求，不要用let。

###三，timer的不同实现机制
在Node.js中，所有的timeout事件会被一个`有序链表`管理