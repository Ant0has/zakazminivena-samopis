const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const url = 'http://127.0.0.1:55310/';
const label = 'ru.zakazminivena.site-graph';
const domain = 'gui/' + process.getuid();
const plist = path.join(os.homedir(), 'Library', 'LaunchAgents', label + '.plist');

async function check() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return response.ok && (await response.text()).includes('Интерактивный граф страниц ZM');
  } catch {
    return false;
  }
}

(async () => {
  if (process.platform !== 'darwin') throw new Error('Open index.html directly; managed launcher requires macOS.');
  let registered = false;
  try {
    execFileSync('/bin/launchctl', ['print', domain + '/' + label], { stdio: 'ignore' });
    registered = true;
  } catch {}
  if (!registered) {
    if (!fs.existsSync(plist)) throw new Error('Local service is not installed. See OPEN.md or open index.html directly.');
    execFileSync('/bin/launchctl', ['bootstrap', domain, plist], { stdio: 'inherit' });
  } else if (!(await check())) {
    execFileSync('/bin/launchctl', ['kickstart', domain + '/' + label], { stdio: 'inherit' });
  }
  for (let attempt = 0; attempt < 20; attempt++) {
    if (await check()) {
      console.log('ZM graph is managed by macOS launchd: ' + url);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Graph service has not started; inspect launchctl print ' + domain + '/' + label);
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
