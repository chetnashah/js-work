
// limit tasks with a given concurrency.
class TaskQueue {
  constructor(concurrency) {
      this.concurrency = concurrency;
      this.queue = [];
      this.running = 0;
  }
  pushTask(task) {
      this.queue.push(task);
      process.nextTick(this.next.bind(this));// why?
      return this; // probably for chaining?
  }
  next (){
      while(this.running < this.concurrency && this.queue.length){
          const task = this.queue.shift();
          task(() => {// cb when task is done
              this.running--;
              process.nextTick(this.next.bind(this)); // why?
          });
          this.running++;
      }
  }
}

const tk = new TaskQueue(1);
const task1 = (cb) => {
  console.log('task1 running');
  setTimeout(() => {
      cb()
  }, 1000);
}
const task2 = (cb) => {
  console.log('task2 running');
  setTimeout(() => {
      cb();
  }, 1500);
};
const task3 = (cb) => {
  console.log('task3 running');
  setTimeout(() => {
      cb()
  }, 1000);
}
const task4 = (cb) => {
  console.log('task4 running');
  setTimeout(() => {
      cb();
  }, 1500);
};

tk.pushTask(task1);
tk.pushTask(task2);
tk.pushTask(task3);
tk.pushTask(task4);