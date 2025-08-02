const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'frontend')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));

});

// Rough database database for demonstration
const users = [
  {
    id: 1,
    name: "Ramesh Kumar",
    referralCode: "Kumar2025",
    amountRaised: 1250,
    rewards: ["Bronze Badge", "Early Access Pass"]
  }
];

// API Endpoints
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  res.json(user || {
    name: "Guest User",
    referralCode: "guest2025",
    amountRaised: 0,
    rewards: []
  });
});

app.get('/api/leaderboard', (req, res) => {
  res.json([
    { name: "Ram kumar", amount: 3200 },
    { name: "ayush desai", amount: 1250 },
    { name: "pratik sing", amount: 800 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
