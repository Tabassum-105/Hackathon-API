const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://tabassumsiddiqui105:Lovely%4021@clustertsq.9aktv0i.mongodb.net/<TSQ>?retryWrites=true&w=majority&appName=ClusterTSQ';  // or your Atlas URI
const client = new MongoClient(uri);
const dbName = 'TSQ';

let db;

async function connectToDb() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

module.exports = { connectToDb };