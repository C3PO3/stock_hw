
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const app = require('./process_stock.js');
app.get('/process_stock.js', (req, res) => {
    // Handle form submission here
    const searchTerm = req.query.searchTerm;
    const searchType = req.query.searchType;

    // You can perform further processing here, like fetching data from an API
    console.log('WORKING HERE');

    res.send(`You searched for ${searchTerm} with type ${searchType}`);
    // res.sendFile(path.join(__dirname, 'process_stock.js'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
