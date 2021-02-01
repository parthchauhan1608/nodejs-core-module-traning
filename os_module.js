
import { totalmem, freemem, cpus, arch, endianness, networkInterfaces, homedir, hostname, loadavg, platform, release, tmpdir, type, uptime, userInfo } from 'os';

let start = new Date();
console.log(start);
let total = totalmem();
let free = freemem();
console.log(`Total memory: ${total}`);
console.log(`Free memory: ${free}`);
console.log("cpus()",cpus());
console.log("arch()",arch());
console.log("endianness()",endianness());
console.log("networkInterfaces()",networkInterfaces());
console.log("homedir()",homedir());
console.log("hostname()",hostname());
console.log("loadavg()",loadavg());
console.log("platform()",platform());
console.log("release()",release());
console.log("tmpdir()",tmpdir());
console.log("type()",type());
console.log("uptime()",uptime());
console.log("userInfo()",userInfo());

let end = new Date()-start;
console.log(new Date());
console.log(end);