const express = require("express");
const cors = require("cors");
const search = require("../mongoose.js");

const router = express.Router();
router.use(cors());

//handling GET requests
router.get("/", async(req, res) => {
    const response = await search.getSearchHistory();
    res.send(response);
});

module.exports = router;