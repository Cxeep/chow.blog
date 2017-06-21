今天写node项目时，突然发现项目的启动文件, app.js里就一行代码：  

    require('xx/core')()
    
package.json的scripts下有个命令:  

    "start" : "node app.js"
    
突然间觉得这样子好多余，于是：

    "start" : "node --use-strict --eval \"require('gl/core')()\""
    

 1. 这边有个很深的坑，如果外面的双引号改成单引号，`node --use-strict --eval
        'require(\"gl/core\")()'`,咋看这些没有错，而且npm start也不会报错。but，压根就不会执行。So，记得用`""`。

 2. 还有个很有意思的地方，path这种Native_Module居然不需要require，就能直接调。。。


**不可思议**
-
然后，部署一下发生了不可思议的故事：docker容器自定义的环境变量，通过process.env.xxx原本是可以取到的。但是。。。这次居然取不到了。   
![不知所措][1]


  [1]: ../public/buzhisuocuo.jpg
  
只能猜测是node执行时不是同一个逻辑的问题。  

**node.js启动流程**
-
从node.js的启动流程来讲，当输入：`node xxx.js`  

 - node::Start
    -  Environment env(isolate_data, context)
    -  LoadEnvironment(&env)
        - Local<String> script_name = FIXED_ONE_BYTE_STRING(env->isolate(),"bootstrap_node.js");
        - ExecuteString(env, MainSource(env), script_name)
            - v8::Script::Compile
            - script.ToLocalChecked()->Run()

说明node.js的启动都是从bootstrap_node.js开始的。而在bootstrap_node.js文件里：

    startup: 初始化process -> 初始化timeout -> 初始化console -> 根据命令参数执行js代码。

所以，整个顺序就是：

    生成当前运行的堆栈等等 -> 加载入口文件bootstrap_node.js -> compile -> run -> bootstrap_node.js -> startup()

而startup里关于`-e`或`--eval`模式还是普通文件执行，确实有一次判断，具体代码的本质区别就在于：
`-e`或`--eval`模式下:

    run(() => {
      evalScript('[eval]');
    });
    
而普通模式：

    run(Module.runMain); -> Module._load(process.argv[1], null, true);


**不同之处**
-

所以这个不同之处就在`evalScript`方法里  

###Module的机制:  
    Module._load -> module.wrap -> new vm.script -> script.runInThisContent();
    
###evalScript:
evalScript很特殊，虽然都是调用runInThisContent，但是此处的context，也就是运行环境，跟上面是不一样的。这边使用module._compile方法，在一个被写死的沙盒环境下，执行并返回结果。   


**所以**
-
所以，可以理解为-e或者--eval模式是一个专门的模拟环境，并非正式生产环境。


