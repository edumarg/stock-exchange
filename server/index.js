const express = require("express");
const fetch = require("isomorphic-fetch");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

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

mongoose
    .connect("mongodb://localhost/search_history")
    .then(() => console.log("Conneted to MongoDB..."))
    .catch((err) => console.error("Connection error...", err));

const searchSchema = new mongoose.Schema({
    symbol: String,
    date: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", searchSchema);

async function sendSearchedSymbol(symbol) {
    const search = new Search({ symbol: symbol });
    search = await search.save();
}

//handling GET requests
app.get("/search", (req, res) => {
    const searchQuery = req.query.query;
    sendSearchedSymbol(searchQuery);
    searchNasdaqWithProfile(searchQuery).then((mapedCompanies) => {
        res.send(mapedCompanies);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));