
// const express = require('express');
// const { MongoClient } = require('mongodb');
// const express = require('express');
// const app = express();


// const port = process.env.PORT || 3000;

// // MongoDB connection URI
// const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
// const dbName = 'Stock';
// const collectionName = 'PublicCompanies';

// // MongoDB client
// const client = new MongoClient(uri);

// console.log("AHHHHHHHHHHHH");

// async function startServer() {
//     try {
//         await client.connect();
//         console.log('Connected to MongoDB');

//         app.get('/process_stock', async (req, res) => {
//             try {
//                 const searchTerm = req.query.searchTerm;
//                 const searchType = req.query.searchType;

//                 const db = client.db(dbName);
//                 const collection = db.collection(collectionName);

//                 let query;
//                 if (searchType === 'ticker') {
//                     query = { ticker: searchTerm };
//                 } else if (searchType === 'company') {
//                     query = { company: searchTerm };
//                 } else {
//                     res.status(400).send('Invalid search type');
//                     return;
//                 }

//                 const result = await collection.find(query).toArray();

//                 console.log('Search Results:');
//                 console.log(result);

//                 res.send(result);
//             } catch (error) {
//                 console.error('Error processing request:', error);
//                 res.status(500).send('Internal Server Error');
//             }
//         });
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// startServer();

// module.exports = app;

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

// MongoDB client
const client = new MongoClient(uri);

console.log("AHHHHHHHHHHHH");

client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    app.get('/process', async (req, res) => {
        try {
            const searchTerm = req.query.searchTerm;
            const searchType = req.query.searchType;

            const db = client.db(dbName);
            const collection = db.collection(collectionName);

            let query;
            if (searchType === 'ticker') {
                query = { ticker: searchTerm };
            } else if (searchType === 'company') {
                query = { company: searchTerm };
            } else {
                res.status(400).send('Invalid search type');
                return;
            }

            const result = await collection.find(query).toArray();

            console.log('Search Results:');
            console.log(result);

            res.send(result);
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    // app.listen(port, () => {
    //     console.log(`Server running at http://localhost:${port}`);
    // });
});

module.exports = app;
