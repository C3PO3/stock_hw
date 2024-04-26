const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

// MongoDB connection URI
const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

async function processStockData(searchTerm, searchType) {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        let query;
        if (searchType === 'company') {
            query = { company: searchTerm };
        } else if (searchType === 'ticker') {
            query = { ticker: searchTerm };
        } else {
            throw new Error('Invalid search type');
        }

        const result = await collection.findOne(query);
        
        if (!result) {
            throw new Error('No matching record found');
        }

        // Extracting company name, ticker, and price
        const { company, ticker, price } = result;
        
        // Returning the extracted data
        return { company, ticker, price };
    } catch (error) {
        console.error('Error processing stock data:', error);
        throw error; // Rethrow the error for handling at a higher level
    } finally {
        await client.close();
    }
}

module.exports = { processStockData };

// async function processStockData(searchTerm, searchType) {
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         await collection.insertMany(data);
//         console.log('Data added successfully!');
//     } catch (error) {
//         console.error('Error inserting data:', error);
//     } finally {
//         await client.close();
//     }
// }




// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();

// // MongoDB connection URI
// const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
// const dbName = 'Stock';
// const collectionName = 'PublicCompanies';

// // MongoDB client
// const client = new MongoClient(uri);

// console.log("AHHHHHHHHHHHH");

// client.connect(err => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }
//     console.log('Connected to MongoDB');

//     app.get('/process', async (req, res) => {
//         try {
//             const searchTerm = req.query.searchTerm;
//             const searchType = req.query.searchType;

//             const db = client.db(dbName);
//             const collection = db.collection(collectionName);

//             let query;
//             if (searchType === 'ticker') {
//                 query = { ticker: searchTerm };
//             } else if (searchType === 'company') {
//                 query = { company: searchTerm };
//             } else {
//                 res.status(400).send('Invalid search type');
//                 return;
//             }

//             const result = await collection.find(query).toArray();

//             console.log('Search Results:');
//             console.log(result);

//             res.send(result);
//         } catch (error) {
//             console.error('Error processing request:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     });
// });

// module.exports = app;
