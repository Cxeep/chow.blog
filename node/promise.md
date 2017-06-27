'use strict';

// process.on('unhandledRejection', (e, p) => {
// 	console.log(e.message)
// })

// process.on('rejectionHandled', p => {
// 	console.log('rejectionHandled')
// })

// process.on('uncaughtException', e => {
// 	console.log(e.message)
// })


// new Promise((res, rej) => {
// 	var e = new Error('b error');
// 	// throw e;
// 	rej(e)
// })
// .catch(e => {
// 	console.log('catch')
// })



// a;
// throw new Error('a error')


// new Promise(function(res, rej) {
//   setTimeout(function() {

//   	var e = new Error('oh, nah!');
//     throw e;
//     // return rej(e); // also won't work
//   }, 1000);
// }).catch(function(e) {
//   console.log(e.message); // doesn't happen
// });



// function timeout(duration) { // Thanks joews
//   return new Promise(function(resolve) {
//     setTimeout(resolve, duration);
//   });
// }

// timeout(1000).then(function() {
//   throw 'worky!';
//   // return Promise.reject('worky'); also works
// }).catch(function(e) {
//   console.log(e); // 'worky!'
// });



// new Promise((res, rej) => {
// 	console.log(1)
// 	res();
// })
// .then(() => {
// 	console.log(3)
// })

// console.log(2)
// // Promise.then是一种miscrotask


// Promise.resolve(1).then(t => {console.log(t)})
// process.nextTick(() => { console.log(4) })
// // Promise.then() 的权限比process.nextTick还低


// // 死循环递归
// function circleTest(){
// 	circleTest();
// }


// // Promise.then性能
// var start = process.hrtime();
// for(var i=0;i<1000000;i++){
// 	// console.log(1)
// 	var a = 1;
// }
// console.log('Test1:' + process.hrtime(start));


// var start = process.hrtime();
// for(var i=0;i<1000000;i++){
// 	Promise.resolve(1).then(t => {var a = 1})
// }
// console.log('Test2:' + process.hrtime(start));



// process.on('unhandledRejection', function(reason) {
//   console.log('unhandledRejection:', reason);
// });

// Promise
//   .resolve('resolve')
//   .then(function() {
//     return Promise.reject('reject');
//   })
//   .catch(function(e) {
//     console.log('catch:', e);
//   });