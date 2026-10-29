const fs = require('fs');
const events = fs
  .readFileSync('.next/trace', 'utf8')
  .split('\n')
  .filter(Boolean)
  .flatMap((line) => JSON.parse(line));
for (const name of ['node-file-trace-build', 'collect-build-traces', 'next-build']) {
  const e = events.find((ev) => ev.name === name);
  if (e) console.log(`${name}: ${(e.duration / 1e6).toFixed(2)}s`);
}
