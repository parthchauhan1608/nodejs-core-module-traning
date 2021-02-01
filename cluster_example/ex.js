const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    const worker = cluster.fork();
    worker.send('hi there');
    worker.on('message', function(message) {
        console.log(message);
        setTimeout(()=>{
            worker.send('hi there');
        },1000);
      });
  
  } else if (cluster.isWorker) {
    process.on('message', (msg) => {
        console.log(msg);
        setTimeout(()=>{
            process.send('boooo');
        },1000);
    });
  }