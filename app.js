const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
const dbName = 'Stock';
const collectionName = 'PublicCompanies';

// MongoDB client
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');

    // Express middleware for parsing form data
    app.use(express.urlencoded({ extended: true }));

    // Serve index.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    // Process form submission
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

    // Start the server
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});




// const express = require('express');
// const app = express();
// const path = require('path');
// const { MongoClient } = require('mongodb');

// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/process_stock.js', (req, res) => {
//     // Handle form submission here
//     const searchTerm = req.query.searchTerm;
//     const searchType = req.query.searchType;

//     const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
//     const dbName = 'Stock';
//     const collectionName = 'PublicCompanies';
//     const client = new MongoClient(uri);

//     try {
//         client.connect();
        
//     } catch (error) {
//         console.error('Error inserting data:', error);
//     } finally {
//         client.close();
//     }

//     // You can perform further processing here, like fetching data from an API
//     console.log('WORKING HERE');

//     res.send(`You searched for ${searchTerm} with type ${searchType}`);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
