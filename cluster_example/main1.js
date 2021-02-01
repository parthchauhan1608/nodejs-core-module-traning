const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

let workers = [];
if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}



function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);

    const worker = cluster.fork();
    workers.push(worker);

    worker.on('message', function(message) {
      console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    if (worker.exitedAfterDisconnect === true) {
      console.log('Oh, it was just voluntary – no need to worry');
    }
  });

  workers[0].kill();
  workers[1].disconnect();
  console.log(workers[1].isConnected());
  workers.forEach(function(worker) {
    console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
    worker.send({ msg: `Message from master ${process.pid}` });    
  }, this);
}

function childProcess() {
    console.log(`Worker ${process.pid} started`);
    
    process.on('message', function(message) {
      console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
    });
  
    console.log(`Worker ${process.pid} sends message to master...`);
    process.send({ msg: `Message from worker ${process.pid}` });
  
    console.log(`Worker ${process.pid} finished`);
  }

  // Class: Worker
    //  Event: 'disconnect'
    //  Event: 'error'
    //  Event: 'exit'
    //  Event: 'listening'
    //  Event: 'message'
    //  Event: 'online'
    //  worker.disconnect()
    //  worker.exitedAfterDisconnect
    //  worker.id
    //  worker.isConnected()
    //  worker.isDead()
    //  worker.kill([signal='SIGTERM'])
    //  worker.process
    //  worker.send(message[, sendHandle[, options]][, callback])
  // Event: 'disconnect'
  // Event: 'exit'
  // Event: 'fork'
  // Event: 'listening'
  // Event: 'message'
  // Event: 'online'
  // Event: 'setup'
  // cluster.disconnect([callback])
  // cluster.fork([env])
  // cluster.isMaster
  // cluster.isWorker
  // cluster.schedulingPolicy
  // cluster.settings
  // cluster.setupMaster([settings])
  // cluster.worker
  // cluster.workers