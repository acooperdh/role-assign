// this file will contain all of the required
// functions in order to make database calls
// and assign user's their proper roles based on
// what their role in the DB / Memberstack
const { MongoClient } = require('mongodb');
const { databaseUri } = require('../config.json');
const { forex, crypto, stocks, futures, diamond } = require('../roles.json');
// connection url
const url = '';
const client = new MongoClient(databaseUri);

const dbName = 'SimplePicks';

async function getUserRole(user) {
  // connect to MongoDb client
  await client.connect();
  console.log;
}

async function connectToDb() {
  // connect to MongoDB client
  await client.connect();
  console.log('successfully connected to the server');
  const db = client.db(dbName);

  const collection = db.collection('Users');
  // console.log(collection)
  // now return a list of all users as a json object
  const getUsers = await collection.find({}).toArray();
  console.log('getUsers');
  console.log(getUsers.length);
  const diamondUsers = getUsers.filter((user) => {
    return user.discord_role === stocks;
  });
  console.log('Diamond Users:');
  console.log(diamondUsers);
  console.log();
  await client.close();

  // return
  return 'done';
}

connectToDb()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

module.exports = { connectToDb };
