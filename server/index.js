const express = require("express");
const search = require("./routes/search");

const app = express();
app.use("/search", search);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));