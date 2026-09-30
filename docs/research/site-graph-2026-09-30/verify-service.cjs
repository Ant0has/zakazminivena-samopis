const { execFileSync } = require('node:child_process');
const label = 'gui/' + process.getuid() + '/ru.zakazminivena.site-graph';
const root = 'http://127.0.0.1:55310';
const status = () => execFileSync('/bin/launchctl', ['print', label], { encoding: 'utf8' });
const pid = text => Number(text.match(/^\s*pid = (\d+)/m)?.[1]);

(async () => {
  const before = pid(status());
  if (!before) throw new Error('No running graph service');
  // Only this read-only graph server is interrupted; launchd must restart it.
  execFileSync('/bin/launchctl', ['kill', 'SIGTERM', label], { stdio: 'inherit' });
  for (let attempt = 0; attempt < 40; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 250));
    try {
      const after = pid(status());
      if (!after || before === after) continue;
      const response = await fetch(root, { signal: AbortSignal.timeout(1000) });
      if (!response.ok || !(await response.text()).includes('Интерактивный граф страниц ZM')) continue;
      const dataResponse = await fetch(root + '/graph.json', { signal: AbortSignal.timeout(1500) });
      const data = await dataResponse.json();
      if (!dataResponse.ok || data.pages.length !== 321 || data.gaps.length !== 12) throw new Error('Unexpected graph data');
      console.log(JSON.stringify({ before, after, restartedByMacOS: true, http: 200, pages: data.pages.length, gaps: data.gaps.length }));
      return;
    } catch {}
  }
  throw new Error('Automatic restart was not verified within the test window');
})().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
