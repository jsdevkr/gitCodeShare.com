async function dockerStop() {
  const path = require('path');
  const compose = require('docker-compose');
  // const dockerode = require('dockerode');

  // const prod = process.env.NODE_ENV === 'production';
  const opts = {
    cwd: path.join(__dirname),
    log: true,
    config: 'docker-compose-dev.yml',
  };

  await compose.down(opts);
}

dockerStop().then(() => process.exit());
