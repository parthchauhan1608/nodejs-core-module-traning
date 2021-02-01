const fs = require('fs');
const child_process = require('child_process');

// for(var i=0; i<3; i++) {
//    var workerProcess = child_process.exec('node child_ex.js '+i,function 
//       (error, stdout, stderr) {
      
//       if (error) {
//          console.log(error.stack);
//          console.log('Error code: '+error.code);
//          console.log('Signal received: '+error.signal);
//       }
//       console.log('stdout: ' + stdout);
//       console.log('stderr: ' + stderr);
//    });

//    workerProcess.on('exit', function (code) {
//       console.log('Child process exited with exit code '+code);
//    });
// }
 
// for(var i = 0; i<3; i++) {
//    var workerProcess = child_process.spawn('ls', ['-lh', './']);

//    workerProcess.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
//    });

//    workerProcess.stderr.on('data', function (data) {
//       console.log('stderr: ' + data);
//    });

//    workerProcess.on('close', function (code) {
//       console.log('child process exited with code ' + code);
//    });
// }

// for(var i=0; i<3; i++) {
//     var worker_process = child_process.fork("child_ex.js", [i]);	
 
//     worker_process.on('close', function (code) {
//        console.log('child process exited with code ' + code);
//     });
//  }

// child_process.execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//       throw error;
//     }
//     console.log(stdout);
//   });
// console.error(new Error('Whoops, something bad happened'));
// console.log(new Error('Whoops, something bad happened'));
// console.warn(new Error('Whoops, something bad happened'));
// console.debug("hey");
// console.error("hey ");
// console.log("hey ");
// console.warn("hey ");

