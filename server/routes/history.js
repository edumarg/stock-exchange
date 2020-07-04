const express = require("express");
const cors = require("cors");
const search = require("../mongoose.js");

const router = express.Router();
router.use(cors());

//handling GET request to get history
router.get("/", async(req, res) => {
    const response = await search.getSearchHistory();
    res.send(response);
});

//handling GET request to get deleteID
router.get("/:id", async(req, res) => {
    const response = await search.delteId(req.params.id);
    res.send(response);
});

module.exports = router;