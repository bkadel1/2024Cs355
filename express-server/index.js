const express = require('express');
const Datastore = require('nedb-promises');

const app = express();
const db = Datastore.create('hits.jsonl');

app.use(express.static('public'))

let hitCounter = 0;


db.findOne({ hits: { $exists: true } })
  .then(doc => {
    if (doc) {
      hitCounter = doc.hits;
    }
  })
  .catch(err => console.error('Error loading hit count:', err));


app.use((req, res, next) => {
  hitCounter++;
  db.update({ hits: { $exists: true } }, { hits: hitCounter }, { upsert: true })
    .catch(err => console.error('Error updating hit count:', err));
  next();
});


app.get('/hits', (req, res) => {
  res.send(String(hitCounter));
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

