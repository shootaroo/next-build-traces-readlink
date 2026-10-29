const fsp = require('fs/promises');
const original = fsp.readlink;
const paths = new Set();
let calls = 0;
fsp.readlink = function (p, ...rest) {
  calls++;
  paths.add(String(p));
  return original.call(this, p, ...rest);
};
process.on('exit', () => {
  if (calls > 0) {
    console.error(`[readlink] pid=${process.pid} calls=${calls} uniquePaths=${paths.size}`);
  }
});
