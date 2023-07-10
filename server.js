
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let players = require('./players.json');

// Add a player
app.post('/players', (req, res) => {
  const player = req.body;
  players.push(player);
  res.status(201).json(player);
});

// Update a player
app.put('/players/:id', (req, res) => {
  const playerId = req.params.id;
  const player = players.find((p) => p.id === playerId);

  if (player) {
    player.skills = req.body.skills;
    res.json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// List all players
app.get('/players', (req, res) => {
  res.json(players);
});

// Delete a player
app.delete('/players/:id', (req, res) => {
  const playerId = req.params.id;
  const index = players.findIndex((p) => p.id === playerId);

  if (index !== -1) {
    const deletedPlayer = players.splice(index, 1);
    res.status(204).json(deletedPlayer);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// Select the best players by position
app.get('/best-players/:position', (req, res) => {
  const position = req.params.position;
  const bestPlayers = players.filter((player) => player.position === position);

  if (bestPlayers.length > 0) {

    // Implement your logic to select the best players based on skills or any other criteria
    res.json(bestPlayers);
  } 
  else {
    res.status(404).json({ message: 'No players found for the given position' });
  }
}
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
