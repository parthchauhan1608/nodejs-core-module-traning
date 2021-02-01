
//File System
// const fs = require("fs");
// let data = fs.readFileSync('text.txt');
// console.log(data.toString());
// setTimeout(()=>{
//     fs.readFile('text.txt',function(err,data){
//         if(err){
//             return console.log(err);
//         }
//         console.log(data.length);
//         console.log(data.toString());
//     });
// },2000);
// console.log('parth');


// var fs = require("fs");
// console.log("Going to open file!");
// fs.open('text.txt', 'r+', function(err, data) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log(data.toString());
//    console.log("File opened successfully!");     
// });


// const fs = require("fs");
// console.log("Going to get file info!");
// fs.stat('node_modules', function (err, stats) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log(stats);
//    console.log("Got file info successfully!");
//    console.log("isFile ?      " + stats.isFile());
//    console.log("isDirectory ? " + stats.isDirectory());  
//    console.log("isDirectory ? " + stats.isBlockDevice());    
//    console.log("isDirectory ? " + stats.isCharacterDevice());  
//    console.log("isDirectory ? " + stats.isSymbolicLink());  
//    console.log("isDirectory ? " + stats.isFIFO());  
//    console.log("isDirectory ? " + stats.isSocket());   
// });


// const fs = require("fs");
// console.log("Going to write into existing file");
// fs.writeFile('text.txt', 'Hi,i am Parth', function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("Data written successfully!");
//    console.log("Let's read newly written data");
//    fs.readFile('text.txt', function (err, data) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("read: " + data.toString());
//    });
// });


// const fs = require("fs");
// let buf = new Buffer(1024);

// console.log("Going to open an existing file");
// fs.open('text.txt', 'r+', function(err, data) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("File opened successfully!");
//    console.log("Going to read the file");
   
//    fs.read(data, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + " bytes read");
      
//       // Print only read bytes to avoid junk.
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//       fs.close(data, function(err) {
//         if (err) {
//            console.log(err);
//         } 
//         console.log("File closed successfully.");
//      });
//    });
// });


// const fs = require("fs");
// let buf = new Buffer(1024);
// console.log("Going to open an existing file");
// fs.open('text.txt', 'r+', function(err, fd) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("File opened successfully!");
//    console.log("Going to truncate the file after 10 bytes");
//    fs.ftruncate(fd, 10, function(err) {
//         if (err) {
//             console.log(err);
//         } 
//         console.log("File truncated successfully.");
//         fs.close(fd, function(err) {
//             if (err) {
//                console.log(err);
//             } 
//             console.log("File closed successfully.");
//         });
//     });
// });


// const fs = require("fs");
// console.log("Going to delete an existing file");
// fs.unlink('text.txt', function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("File deleted successfully!");
// });


// const fs = require("fs");
// console.log("Going to create directory /temp");
// fs.mkdir('temp',function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("Directory created successfully!");
// });


// const fs = require("fs");
// console.log("Going to read directory /temp");
// fs.readdir("temp",function(err, files) {
//    if (err) {
//       return console.error(err);
//    }
//    files.forEach( function (file) {
//       console.log( file );
//    });
// });


// const fs = require("fs");
// console.log("Going to delete directory /temp");
// fs.rmdir("temp",function(err) {
//    if (err) {
//       return console.error(err);
//    }
// });

//eventEmitter
// const events = require('events');

// const eventEmitter = new events.EventEmitter();

// let connectHandler = function connected(){
//     console.log('connection successfull');

//     eventEmitter.emit('data_received');
// }

// eventEmitter.on('connection',connectHandler);

// eventEmitter.on('data_received',()=>{
//     console.log('data received successfull');
// });

// eventEmitter.emit('connection');

// console.log('Ended');
// console.log(eventEmitter.on == eventEmitter.addListener);


//Buffer
// buf = new Buffer(30);
// len = buf.write("anflndsbgfjdsfbnv kndsfgnhljd");
// buf = new Buffer(26);
// for (var i = 0 ; i < 26 ; i++) {
//   buf[i] = i + 65;
// }
// var buffer1 = new Buffer('TutorialsPoint ');
// var buffer2 = new Buffer('Simply Easy Learning');
// var buffer3 = Buffer.concat([buffer1,buffer2]);

// console.log("Octets written : "+  buffer3.length);
// console.log(buffer3.toString());
// var buffer1 = new Buffer('ABC');
// var buffer2 = new Buffer('ABCD');
// // var result = buffer2.compare(buffer1);
// // console.log(result)
// // if(result < 0) {
// //    console.log(buffer1 +" comes before " + buffer2);
// // } else if(result === 0) {
// //    console.log(buffer1 +" is same as " + buffer2);
// // } else {
// //    console.log(buffer1 +" comes after " + buffer2);
// // }
// buffer2.copy(buffer1);
// console.log("buffer2 content: " + buffer2.toString());
// var x = Buffer('abcdef');
// console.log(Buffer);
// var y = x.slice(2,5);

// console.log(y.toString());
// console.log(x.toString());


//Streams
// const fs = require("fs");
// let data="";
// let readerStream = fs.createReadStream('text.txt');
// readerStream.setEncoding('UTF8');
// readerStream.on('data', function(chunk) {
//     data += chunk;
//  });
//  readerStream.on('end',function() {
//     console.log(data);
//  });
//  readerStream.on('error', function(err) {
//     console.log(err.stack);
//  });
//  console.log("Program Ended");


// const fs = require("fs");
// let data="Hello, parth i am Trusha";
// let writeStream = fs.WriteStream('text.txt');
// writeStream.write(data);
// writeStream.end();
// writeStream.on('finish', function() {
//     console.log("Write completed.");
//  });
//  writeStream.on('error', function(err) {
//     console.log(err.stack);
//  });

// const fs = require("fs");
// let readerStream = fs.createReadStream('main.js');
// let writerStream = fs.createWriteStream('text.txt');
// readerStream.pipe(writerStream);
// console.log("Program Ended");

// var fs = require("fs");
// var zlib = require('zlib');
// fs.createReadStream('text.txt')
//    .pipe(zlib.createGzip())
//    .pipe(fs.createWriteStream('text.txt.gz'));
// console.log("File Compressed.");


//Global Objects
// __dirname
// __filename
// Console
// Process
// Buffer
// setImmediate(callback[, arg][, ...])
// setInterval(callback, delay[, arg][, ...])
// setTimeout(callback, delay[, arg][, ...])
// clearImmediate(immediateObject)
// clearInterval(intervalObject)
// clearTimeout(timeoutObject)
// console.log(__dirname);
// console.log( __filename );
// console.log("Now Console Object");
// console.error(new Error("This is Error objrct in console"));
// console.warn("This is Warning");


//take input from command line
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
  
//   readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`)
//     readline.close()
//   })

  