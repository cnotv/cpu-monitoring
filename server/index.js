const express = require('express');
const os = require('os');

const app = express();
const port = 3002;

app.get('/api/cpu', (req, res) => {
  const cpus = os.cpus().length
  const loadAverage = os.loadavg()[0] / cpus

  res.status(200).json({
    average: loadAverage
  });
})

app.listen(port, 'localhost', () => {
  console.log(`Check CPU average at http://localhost:${port}/api/cpu`)
})