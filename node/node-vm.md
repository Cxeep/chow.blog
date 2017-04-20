**Amazing**
-

怎么把String转成代码？  

1，eval -- 下下策  
2, new Function -- 中策  
3，new vm.Script -- 方为上上策  

在node.js的module.js中就是利用vm：  

     -> 读取文件内容
     -> wrap头尾
     -> vm.runInThisContext(wrapper, options)
         -> new vm.Script() 
         -> script.runInThisContext()

eg:

    var vm = require('vm');
    var m = {e: 2}
    
    var script = new vm.Script('var e = 100');
    var context = new vm.createContext(m);
    
    script.runInContext(context);
    console.log(m)
    
结果：
    { e: 100 }
    [Finished in 0.1s]
    
简直Amazing.


