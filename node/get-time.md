一共有5中方法（执行效率依次降低）

    Date.now();
    newDate().getTime();
    +newDate();
    process.uptime();
    process.hrtime();

**解释**
-
Date.now()、new Date().getTime() 和 +new Date() 是浏览器环境下一直都有的，自然不必多说。

process.uptime() 返回的是Node程序已运行的时间，单位秒。  
process.hrtime() 返回的是当前的高分辨率时间，格式为[秒,纳秒。它是相对于在过去的任意时间，该值与日期无关。优点是：可以获得一个非常精准的时间差，不会受到时钟飘逸的影响；缺点是：速度慢。

**结论**
-
要获取一个非常精确地时间间隔，用process.hrtime()；  
大量循环获取时间戳的时候，要考虑性能，用 Date.now()。

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


**what**
好了好了好了，不要喷我了，以上这段话就是抄的别人的，但素！  
我做了实验了啊，混蛋。

    Date.now(): 25.958ms
    process.uptime(): 28.748ms
    new Date().getTime(): 33.979ms
    + new Date(): 48.971ms
    process.hrtime(): 22.763ms

明明是process.hrtime()耗时最短啊！难道是姿势不对？我陷入了沉思。。。  
我决定加码到一千万次，玩死我的电脑。

    Date.now(): 2490.334ms
    process.uptime(): 2758.981ms
    new Date().getTime(): 3308.648ms
    + new Date(): 4929.147ms
    process.hrtime(): 2164.665ms
    
嗯，看来hrtime比较慢是扯犊子的一句话。