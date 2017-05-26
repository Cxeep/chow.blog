**定时器**
-
Node.js的定时器（比如setTimeout）一个问题，就是会严重不准时。   

至于为什么不准时，是因为js的进程中，执行线程只有一个，那么回调（不管是定时器的回调还是io回调），都会阻塞当前的执行线程。所以，前一个回调没有走完，后一个回调必须等待。因此Node.js的定时器不准时是内核级的问题。  

说到回调的问题，了解下node.js内部关于异步的核心：**Event Loop**。   

**第一个阶段：** 
Node.js   
  ↓   
加载js文件   
  ↓   
c++
  ↓
if fs or network I/O                                 if timer
  ↓                                                     
调用lib接口   
  ↓
封装对应的监视器(每种事件都有对应的监视器）   
  ↓
保存到default_loop_struct

**第二个阶段：** Node.js中的main函数调用libuv中的**uv_run()**，进入'Event Loop'阶段



