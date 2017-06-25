    'use strict';
    
    /*
    * Node8是针对调试和打动一次优化版本。
    *
    * 所以aysnc_hook很有意思。方便记录日志，并且可以对原项目0侵入。
    */
    
    /*
    *
    * async_hooks是Node.js专门用来给坚听各种异步事件的api
    * currentId表示当前执行环境id
    * triggerId表示触发AsyncResource的id
    * asyncId表示AsyncResource的id
    */
    
    var asyncHooks = require('async_hooks');
    var fs = require('fs');
    
    asyncHooks.createHook({
      init(asyncId, type, triggerId, resource) {
        // const cId = asyncHooks.currentId();
        // fs.writeSync(1, `${type}(${asyncId}): trigger: ${triggerId} scope: ${cId} resource: ${resource}\n`);
      },
      before(asyncId) {
      	fs.writeSync(1, `before: ${asyncId}\n`);
      }
    }).enable();
    
    // require('net').createServer((conn) => {}).listen(8080);
    
    
    var AsyncResource = asyncHooks.AsyncResource;
    class Test extends AsyncResource{
    	constructor(){
    		super('Test');
    	}
    	test (){
    		this.emitBefore();
    		console.log(1);
    		console.log(2);
    		this.emitAfter();  // 不去emitAfter，会发生错误：Error: async hook stack has become corrupted (actual: 2, expected: 1)
    	}
    }
    
    new Test().test();

