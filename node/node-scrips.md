今天写node项目时，突然发现项目的启动文件, app.js里就一行代码：  

    require('xx/core')()
    
package.json的scripts下有个命令:  

    "start" : "node app.js"
    
突然间觉得这样子好多余，于是：

    "start" : "node --use-strict --eval \"require('gl/core')()\""
    
**注意点**
-
 1. 这边有个很深的坑，如果写`node --use-strict --eval
        'require(\"gl/core\")()'`,咋看这些没有错，而且npm start也不会报错。but，压根就不会执行。So，记得你的代码块用`""`包裹起来。

 2. 还有个很有意思的地方，path这种NativeModule在scripts里居然不需要require，就能直接调。。。
