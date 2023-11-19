const express = require('express');
// configurations from mongo
const db = require('./config/connection');
// begins routes from routes folder, use this when creating and testing routes and testing with insomnia as starting place for url http://localhost:3001/ then go threw api etc...
const routes = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();

// tells express to read data from url example when data is sent as "params."
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  // if connection is successfull will see message in console.log below 
  app.listen(PORT, () => {
    console.log(`API server running on the port ${PORT}!`);
  });
});
