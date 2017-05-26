今天写node项目时，突然发现项目的启动文件, app.js里就一行代码：  

    require('xx/core')()
    
package.json的scripts下有个命令:  

    "start" : "node app.js"
    
突然间觉得这样子好多余，于是：

    "start" : "node --use-strict --eval \"require('gl/core')()\""
    
**注意**
-
 1. 这边有个很深的坑，如果外面的双引号改成单引号，`node --use-strict --eval
        'require(\"gl/core\")()'`,咋看这些没有错，而且npm start也不会报错。but，压根就不会执行。So，记得用`""`。

 2. 还有个很有意思的地方，path这种Native_Module居然不需要require，就能直接调。。。


**不可思议**
-
然后，部署一下发生了不可思议的故事：docker容器自定义的环境变量，通过process.env.xxx原本是可以取到的。但是。。。这次居然取不到了。   
![不知所措][1]


  [1]: ../public/buzhisuocuo.jpg
  
再联系到之前不需要require('path')，就能调用。我只能联系到‘沙盒’两个字。我要看下源代码压压惊。。。