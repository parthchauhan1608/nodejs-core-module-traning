
let start = new Date();
console.log(start);

import EventEmitter from 'events';
const myEmitter = new EventEmitter();


//listener
myEmitter.on('event', () => {
  console.log('Hey Parth you Call Event!!');
});
// event raise
myEmitter.emit('event');

//let pass argument to listener
myEmitter.on('event', (a, b)=> {
  console.log('your answer', a+b);
});
myEmitter.emit('event', 6,7);
console.log("array of events :",myEmitter.eventNames('event'));
console.log("before set max listener can default :",myEmitter.getMaxListeners());
myEmitter.setMaxListeners(20);
console.log("After set maxlistener is :",myEmitter.getMaxListeners());
console.log("listener on event count :",myEmitter.listenerCount('event'));
console.log("listeners array :",myEmitter.listeners('event'));

export function sum(...args) {
  // log('sum', args);
  return args.reduce((num, tot) => tot + num);
}

console.log( sum(1,2,3,4) );
let end = new Date()-start;
console.log(new Date());
console.log(end);

