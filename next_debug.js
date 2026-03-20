const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const LOG = path.join(__dirname, 'next_debug.log');
fs.writeFileSync(LOG, '[START] ' + Date.now() + '\n');

function log(m) { fs.appendFileSync(LOG, m); }

const child = spawn(process.execPath, [
  path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'),
  'dev', '--port', '3000'
], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe']
});

log('[SPAWNED] PID=' + child.pid + '\n');
child.stdout.on('data', d => log('[OUT] ' + d));
child.stderr.on('data', d => log('[ERR] ' + d));
child.on('error', e => log('[SPAWN-ERR] ' + e.message + '\n'));
child.on('close', (c,s) => log('[CLOSE] code=' + c + ' signal=' + s + '\n'));
setTimeout(() => { log('[T=55s]\n'); child.kill(); }, 55000);
