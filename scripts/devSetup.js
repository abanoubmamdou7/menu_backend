import { existsSync } from 'fs';
import { join } from 'path';
import { spawn, spawnSync } from 'child_process';

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';
const cwd = process.cwd();
const prismaLocalCmd = join(
  cwd,
  'node_modules',
  '.bin',
  isWindows ? 'prisma.cmd' : 'prisma',
);

function runSync(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    cwd,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(join(cwd, 'node_modules'))) {
  console.log('node_modules not found. Installing dependencies...');
  runSync(npmCmd, ['install']);
}

console.log('Generating Prisma client...');
if (existsSync(prismaLocalCmd)) {
  runSync(prismaLocalCmd, ['generate']);
} else {
  runSync(npxCmd, ['prisma', 'generate']);
}

console.log('Starting development server...');
const devProcess = spawn(npmCmd, ['run', 'dev:run'], {
  stdio: 'inherit',
  cwd,
});

devProcess.on('close', (code) => {
  process.exit(code ?? 0);
});

devProcess.on('error', (error) => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});

