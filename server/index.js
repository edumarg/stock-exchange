const express = require("express");
const search = require("./routes/search");
const history = require("./routes/history");

const app = express();
app.use("/search", search);

app.use("/search-history", history);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));