require('dotenv').config();

async function dockerStop() {
  const path = require('path');
  const compose = require('docker-compose');
  // const dockerode = require('dockerode');

  const kill = require('kill-port');
  await kill(parseInt(process.env.FRONT_PORT, 10) || 3000);
  await kill(parseInt(process.env.BACKEND_PORT, 10) || 3030);

  // const prod = process.env.NODE_ENV === 'production';
  const opts = {
    cwd: path.join(__dirname),
    log: true,
    config: 'docker-compose-dev.yml',
  };

  await compose.down(opts);
}

dockerStop().then(() => process.exit());
