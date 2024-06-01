const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const COMPANIES = ["AMZ", "SNP", "FLP", "MYN", "AZO"];
const CATEGORIES = [
    "Phone", "Computer", "TV", "Laptop", "Earphone", "Tablet",
    "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive",
    "Remote", "Speaker", "Headset", "PC"
];

const fetchProducts = async (company, category, minPrice, maxPrice, topN) => {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${company}:`, error.message);
        return [];
    }
};

app.get('/api/products/:company/:category', async (req, res) => {
    const { company, category } = req.params;
    const { minPrice, maxPrice, top } = req.query;

    if (!company || !category || !minPrice || !maxPrice || !top) {
        return res.status(400).json({ error: 'Please provide company, category, minPrice, maxPrice, and top parameters' });
    }

    if (!COMPANIES.includes(company.toUpperCase())) {
        return res.status(400).json({ error: 'Invalid company' });
    }

    if (!CATEGORIES.includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    const minPriceNum = parseFloat(minPrice);
    const maxPriceNum = parseFloat(maxPrice);
    const topNum = parseInt(top);

    try {
        const products = await fetchProducts(company.toUpperCase(), category, minPriceNum, maxPriceNum, topNum);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
