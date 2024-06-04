const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

// Function to get the IP address
function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
}

const hostname = os.hostname();
const ipAddress = getIPAddress();

app.get('/api', (req, res) => {
  res.json({
    hostname: hostname,
    ipAddress: ipAddress
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
