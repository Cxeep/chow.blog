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
	process.nextTick(() => {console.log('emit fired');})
});

// 触发下事件
me.doStuff();