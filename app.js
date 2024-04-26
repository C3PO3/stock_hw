const express = require('express');
const app = express();
const path = require('path');
const processStock = require('./process_stock');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/process_stock.js', (req, res) => {
    // Handle form submission here
    const searchTerm = req.query.searchTerm;
    const searchType = req.query.searchType;

    // Execute the processing logic from process_stock.js
    const result = processStock.processStockData(searchTerm, searchType);

    // Sending the result as response
    res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
