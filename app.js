// const express = require('express');
// const mongoose = require('mongoose');
// const Product = require('./models/product');

// const app = express();
// app.use(express.json());

// app.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find(); // fetch all documents
//     res.json(products); // send JSON response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error fetching products' });
//   }
// });


// // Connect to DB and start server
// mongoose.connect('mongodb+srv://tabassumsiddiqui105:Lovely%4021@clustertsq.9aktv0i.mongodb.net/<TSQ>?retryWrites=true&w=majority&appName=ClusterTSQ', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('✅ MongoDB connected');
//   app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
// }).catch(err => console.error('❌ DB Error:', err));

const express = require('express');
const { connectToDb } = require('./db');

const app = express();
app.use(express.json());

// GET all users
app.get('/products', async (req, res) => {
  try {
    const db = await connectToDb();
    const users = await db.collection('Products').find().toArray();
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Products' });
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('Products').insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert user' });
  }
});

// DELETE a user by ID
const { ObjectId } = require('mongodb');
app.delete('/users/:id', async (req, res) => {
  try {
    const db = await connectToDb();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('API listening on http://localhost:3000');
});