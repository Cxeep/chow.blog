### 历史
---

一，第一次浏览器大战
----------

### JScript vs Javascript 

> 结果：
-> 成立 W3C 标准，背后的掌控权依然是 M$  
-> 不思进取，IE6 多年不更新，解散了 IE6 团队


二, 第二次浏览器大战
----------

原因：`html 日渐复杂 -> 解析复杂度 -> DTD 规则 -> xhtml (2004)`  

virtual dom


##### WHATWG （2004)  

> WHATWG成立的原因是W3C意图放弃HTML，而力图发展XML（可扩展标记记语言下的一个子集）技术。WHATWG邮件列表公布于2004-6-4 , 在Opera–Mozilla宣布加入后的2天 便否决了由万维网联盟（W3C）成员在W3C工作室的Web标准2007-7-10 , Mozilla Foundation, Apple, Opera Software 建议 W3C跟随WHATWG’的HTML5，将新的HTML（标准通用标记语言下的一个应用）命名为"HTML5".2007-4-7, 新的HTML工作组采纳了他们的建议。
    


三, 关于 ES4
[ ECMAScript 6 会重蹈 ECMAScript 4 的覆辙吗？][1]


四, 2008 年

v8 -> chrome -> 收割战场
Ryan Dahl -> node.js



五, Feature

为什么 Node.js 能处理大并发？

> 非阻塞 i/o


### 语言设计角度 

同步语言

第一: 阻塞 -> 大并发 -> 下一个访问不能响应 -> 多线程，多进程 -> 进程池 
第二: 每次 fd 返回的数据 -> 都会放在缓存区 -> 一直到 EOF -> 才会返回 (大量占用内存)


Note: timeout 机制: 为了解决大并发下，减少服务器压力。


Node.js :
第一: 文件 i/o -> 操作交给现成池 -> 完成结果交给 callback -> stream
第二: stream 机制内存消耗低



### 底层上的性能提升


Linux: 万物皆为文件

i/o 模型: 阻塞，非阻塞，异步[IOCP]，事件驱动，多路复用


![阻塞 i/o 模型][4]
![非阻塞 i/o 模型][5]




select 模型

    int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);
    

    伪码如下：


for (sk in readfds)
{
    sk_event.evt = sk.poll();
    sk_event.sk = sk;
    ret_event_for_process;
}


    socket wakeup callback 机制: 遍历自己监控的socket sk，挨个调用sk的poll逻辑以便检查该sk是否有可读事件，遍历完所有的sk后，如果没有任何一个sk可读，那么select会调用schedule_timeout进入schedule循环，使得process进入睡眠。如果在timeout时间内某个sk上有数据可读了，或者等待timeout了，则调用select的process会被唤醒，接下来select就是遍历监控的sk集合，挨个收集可读事件并返回给用户了
    
  
    epoll 模型  
    
    epoll引入了epoll_ctl系统调用，将高频调用的epoll_wait和低频的epoll_ctl隔离开。同时，epoll_ctl通过(EPOLL_CTL_ADD、EPOLL_CTL_MOD、EPOLL_CTL_DEL)三个操作来分散对需要监控的fds集合的修改，做到了有变化才变更，将select或poll高频、大块内存拷贝(集中处理)变成epoll_ctl的低频、小块内存的拷贝(分散处理)，避免了大量的内存拷贝。同时，对于高频epoll_wait的可读就绪的fd集合返回的拷贝问题，epoll通过内核与用户空间mmap(内存映射)同一块内存来解决。mmap将用户空间的一块地址和内核空间的一块地址同时映射到相同的一块物理内存地址（不管是用户空间还是内核空间都是虚拟地址，最终要通过地址映射映射到物理地址），使得这块物理内存对内核和对用户均可见，减少用户态和内核态之间的数据交换。
    
    




    区别：

    1，select 模式下, fd生成是阻塞的。epoll 是预先生成 fd。改变了结构，解决了 fds 数量限制问题。
    
    2，select 模式下，每次wakeup，都会重复准备 fds，epoll模式下，将ADD，DEL等低频操作分离，设计成事件驱动模式，减少了操作。
    
    3，fds 拷贝问题，内存共享。涉及用户空间和内核空间的问题，因为安全性问题，所以内核空间是无法被用户操作的。mmap(内存空间映射)。mmap将用户空间的一块地址和内核空间的一块地址同时映射到相同的一块物理内存地址。
    





### libuv

IOCP ／ libev [socket] + kqueue [timer] + 线程池 [file system]

移除了 libev




##### event loop

call stack

task queue

micro-task queue


[event-loop 模型][6]






  [1]: https://www.zhihu.com/question/24715618/answer/34794413
  [2]: https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501245426ad4b91f2b880464ba876a8e3043fc8ef000
  [4]: ../public/blocking-io.jpg
  [5]: ../public/no-blocking-io.jpg
  [6]: ../public/event-loop.png
