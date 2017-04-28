
**what's this**
-
Node.js底层很多重要的类都继承`events`。  
因为Node.js的概念就是i/o无阻塞，所以关于i/o的api，都会是继承events。  
but，实际上events并不是天生异步的，或者说无阻塞的。  
比如以下的代码：  

    'use strict';
    
    var util = require('util');
    var EventEmitter = require('events');
    
    // 创建一个EventEmiter
    function MyEmitter() {
      EventEmitter.call(this);
    }
    util.inherits(MyEmitter, EventEmitter);
    
    MyEmitter.prototype.doStuff = function doStuff() {
      console.log('before')
      me.emit('fire')
      console.log('after')
    };
    
    // 实例化
    var me = new MyEmitter();
    me.on('fire', function() {
    	console.log('emit fired');
    });
    
    // 触发下事件
    me.doStuff();


其实按照js常规的表现你会认为结果是：

    before
    after
    emit fired
    [Finished in 0.2s]
    
但事实上这段代码的结果是：

    before
    emit fired
    after
    [Finished in 0.2s]
    
so，其实这种回调本身是会阻塞当前线程。  
but，为什么js会无阻塞呢？  

**process.nextTick**
-

因为在Node.js的Event loop机制里，所有的回调都会被封在process.nextTick这个方法里。  

so，我们一下代码改一下

    var me = new MyEmitter();
    me.on('fire', function() {
    	process.nextTick(() => {console.log('emit fired');})
    });

结果就会是：  

    before
    after
    emit fired
    [Finished in 0.2s]
这个样子似乎符合了我们的三观常识。  

然后这边会涉及到process.nextTick与setTimeout之类有关timer的延时方法的区别。  

    process.nextTick并不会被defer到事件队列，而是defer到函数结束时进行。

