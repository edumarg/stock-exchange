const mongoose = require("mongoose");

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
    let search = new Search({ symbol: symbol });
    search = await search.save();
    return search;
}

async function getSearchHistory() {
    let history = await Search.find().sort({ date: -1 }).limit(10);
    console.log("inside", history);
    return history;
}

module.exports.sendSearchedSymbol = sendSearchedSymbol;
module.exports.getSearchHistory = getSearchHistory;