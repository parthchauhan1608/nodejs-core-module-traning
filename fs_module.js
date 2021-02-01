
const fs = require('fs');

//delete or remove
// fs.unlink('./t.txt', (err) => {
//   if (err) throw err;
//   console.log('successfully deleted /t.txt');
// });
// fs.unlinkSync('./t.txt');

//remane
// fs.rename('./t.txt', './f.txt', (err) => {
//     if (err) throw err;
//     console.log('renamed complete');
//   });

//stat
// fs.stat('./t.txt', (err, stats) => {
//     if (err) throw err;
//    console.log(stats);
//    console.log("Got file info successfully!");
//    console.log("isFile ?      " + stats.isFile());
//    console.log("isDirectory ? " + stats.isDirectory());  
//    console.log("isDirectory ? " + stats.isBlockDevice());    
//    console.log("isDirectory ? " + stats.isCharacterDevice());  
//    console.log("isDirectory ? " + stats.isSymbolicLink());  
//    console.log("isDirectory ? " + stats.isFIFO());  
//    console.log("isDirectory ? " + stats.isSocket());  
//   });

//reading file
// fs.readFile('t.txt', function (err, data) {
//     if (err) {
//        return console.error(err);
//     }
//     console.log(data.toString());
//  });
//  let data = fs.readFileSync('t.txt');
//  console.log(data.toString());

// let buf = new Buffer(1024);
// fs.open('t.txt', 'r+', function(err, fd) {
//    if (err) {
//       return console.error(err);
//    }
//    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + " bytes read");
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//       fs.close(fd, function(err) {
//         if (err) {
//            console.log(err);
//         } 
//      });
//    });
// });

// fs.open('t.txt', 'r+', function(err, fd) {
//     if (err) {
//        return console.error(err);
//     }
// fs.ftruncate(fd, 10, function(err) {
//     if (err) {
//        console.log(err);
//     }});
//     console.log("File opened successfully!");  
//     fs.close(fd, (err) => {
//         if (err) throw err;
//       });   
//  });

//file write
// fs.writeFile('t.txt', 'Hi, I am parth!','a', function(err) {
//     if (err) {
//        return console.error(err);
//     }
// });


//create directory
// fs.mkdir('./test',function(err) {
//     if (err) {
//        return console.error(err);
//     }
//  });

//read directory
// fs.readdir("./",function(err, files) {
//     if (err) {
//        return console.error(err);
//     }
//     files.forEach( function (file) {
//        console.log( file );
//     });
//  });

//remove directory
//  fs.rmdir("./test",function(err) {
//     if (err) {
//        return console.error(err);
//     }
// });

//check access
// const file = 'package.json';

// fs.access(file, fs.constants.F_OK, (err) => {
//   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
// });

// fs.access(file, fs.constants.R_OK, (err) => {
//   console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
// });

// fs.access(file, fs.constants.W_OK, (err) => {
//   console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
// });

// fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
//   if (err) {
//     console.error(
//       `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
//   } else {
//     console.log(`${file} exists, and it is writable`);
//   }
// });

//appending data 
// fs.appendFile('t.txt', 'data to append', (err,fd) => {
//     if (err) throw err;
//     console.log('The "data to append" was appended to file!');
// });


//you can change file permission
// fs.chmod('t.txt', 440, (err) => {
//   if (err) throw err;
//   console.log('The permissions for file "my_file.txt" have been changed!');
// });

//copyfile
// fs.copyFile('text.txt', 't.txt', (err) => {
//     if (err) throw err;
//     console.log('source.txt was copied to destination.txt');
//   });

