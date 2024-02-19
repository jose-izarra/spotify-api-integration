const express = require('express');
const app = express();
const product = require('./api/product');



app.use("/api/product", product);

const port = 8888;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});