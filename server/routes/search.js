const express = require("express");
const fetch = require("isomorphic-fetch");
const cors = require("cors");
const search = require("../mongoose.js");

const router = express.Router();
router.use(cors());

const URL = "https://financialmodelingprep.com/api/v3";
const API_KEY = `ed93f3e229380c530b7a0e7663f86b99`;

createListItem = function(image, symbol, name, changes) {
    const company = {
        image: image,
        symbol: symbol,
        name: name,
        changes: changes,
    };
    return company;
};

async function searchNasdaq(searchTerm) {
    const response = await fetch(
        `${URL}//search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
    );
    const companies = await response.json();
    return companies;
}

async function companyProfile(symbol) {
    const response = await fetch(`${URL}/profile/${symbol}?apikey=${API_KEY}`);
    const profile = await response.json();
    return profile;
}

async function searchNasdaqWithProfile(searchTerm) {
    const companies = await searchNasdaq(searchTerm);
    const mapedCompanies = await Promise.all(
        companies.map(async(company) => {
            company = await companyProfile(company.symbol);
            const { companyName, image, changes, symbol } = company[0];
            return createListItem(image, symbol, companyName, changes);
        })
    );
    return mapedCompanies;
}

//handling GET requests
router.get("/", (req, res) => {
    const searchQuery = req.query.query;
    search.sendSearchedSymbol(searchQuery);
    searchNasdaqWithProfile(searchQuery).then((mapedCompanies) => {
        res.send(mapedCompanies);
    });
});

module.exports = router;