**五种取得精确时间的方法**
-
    Date.now();
    newDate().getTime();
    +newDate();
    process.uptime();
    process.hrtime();

**解释**
-
Date.now()、new Date().getTime() 和 +new Date() 是浏览器环境下一直都有的，自然不必多说。

process.uptime() 返回的是Node程序已运行的时间，单位秒。

process.hrtime() 返回的是当前的高分辨率时间，格式为[秒,纳秒]。  
它是相对于在过去的任意时间，该值与日期无关。  
优点是：可以获得一个非常精准的时间差，不会受到时钟飘逸的影响；

    note:  
    import point: process.hrtime()返回的是**tuple**结构！！！   
    tuple在python里表示元数组，不能二次赋值，只可读列表。


**结论**
-

监测性能的代码

    function getTimeDifference(method, time){
        var count = time ||'100000';
        console.time(method);
        while(count) {
            eval(method);
            count--;
        }
        console.timeEnd(method);
    }
    getTimeDifference('Date.now()');
    getTimeDifference('process.uptime()');
    getTimeDifference('new Date().getTime()');
    getTimeDifference('+ new Date()');
    getTimeDifference('process.hrtime()');


**结果**
-

    Date.now(): 2490.334ms
    process.uptime(): 2758.981ms
    new Date().getTime(): 3308.648ms
    + new Date(): 4929.147ms
    process.hrtime(): 2164.665ms
    
等等，hrtime耗时居然是最短的。。。
