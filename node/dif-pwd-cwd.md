Node在bootstrap_node.js里，会初始化process，并且缓存NativeModules。  

process的初始化过程中会挂载很多有用的方法和属性。  
比如：process.env.PWD和process.cwd()。  

当然两者的区别很明显：

    process.env.PWD
    > "D:/xxx/xxx"
    
    process.cwd()
    > "D:\xxx\xxx"
    
一，PWD是指Node.js项目的启动时的目录。而，cwd获取的当前运行时的目录。

二，这么明显了，一个是url格式，一个是uri格式。
    