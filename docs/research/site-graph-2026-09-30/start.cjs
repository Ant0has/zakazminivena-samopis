const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const url = 'http://127.0.0.1:55310/';
const logPath = path.join(os.tmpdir(), 'zm-site-graph-2026-09-30.log');

async function check() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    if (!response.ok) return false;
    return (await response.text()).includes('Интерактивный граф страниц ZM');
  } catch {
    return false;
  }
}

(async () => {
  if (await check()) {
    console.log('ZM graph already available: ' + url);
    return;
  }
  const log = fs.openSync(logPath, 'a');
  const child = spawn(process.execPath, [path.join(__dirname, 'serve.cjs')], {
    cwd: __dirname,
    detached: true,
    stdio: ['ignore', log, log],
  });
  child.on('error', error => {
    console.error(error.message);
    process.exitCode = 1;
  });
  child.unref();
  fs.closeSync(log);
  for (let attempt = 0; attempt < 12; attempt++) {
    if (await check()) {
      console.log('ZM graph started independently: ' + url);
      console.log('Process: ' + child.pid);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error('Graph did not start; inspect ' + logPath);
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
