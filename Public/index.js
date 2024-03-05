const express = require('express');
const Datastore = require('nedb-promises');
const path = require('path');

const app = express();
const db = Datastore.create({ filename: path.join(__dirname, 'hits.jsonl'), autoload: true });

let hitCounter = 0;

// Check if the database contains hits data
db.findOne({ hits: { $exists: true } })
  .then(doc => {
    if (doc) {
      hitCounter = doc.hits;
    }
  })
  .catch(err => console.error('Error loading hit count:', err));

// Middleware to increase hit counter and update database
app.use((req, res, next) => {
  hitCounter++;
  db.update({ hits: { $exists: true } }, { hits: hitCounter }, { upsert: true })
    .catch(err => console.error('Error updating hit count:', err));
  next();
});

// Route to get the number of hits
app.get('/hits', (req, res) => {
  res.send(String(hitCounter));
});

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});