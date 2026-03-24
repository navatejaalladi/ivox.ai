const express = require('express');
const path = require('path');

const app = express();

// THIS IS THE KEY: Railway provides PORT as an environment variable
const PORT = process.env.PORT || 3000;

console.log('Starting ivox.ai server...');
console.log('Environment PORT:', process.env.PORT);
console.log('Using PORT:', PORT);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', port: PORT });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// CRITICAL: Must bind to 0.0.0.0 and use Railway's PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server successfully running on http://0.0.0.0:${PORT}`);
});