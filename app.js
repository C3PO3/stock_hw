
const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require('mongodb');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/process_stock.js', (req, res) => {
    // Handle form submission here
    const searchTerm = req.query.searchTerm;
    const searchType = req.query.searchType;

    const uri = 'mongodb+srv://liagriffeon:zG2KLn57TAQ65IN6@stock.1k5sojy.mongodb.net';
    const dbName = 'Stock';
    const collectionName = 'PublicCompanies';
    const client = new MongoClient(uri);

    try {
        client.connect();
        
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        client.close();
    }

    // You can perform further processing here, like fetching data from an API
    console.log('WORKING HERE');

    res.send(`You searched for ${searchTerm} with type ${searchType}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
