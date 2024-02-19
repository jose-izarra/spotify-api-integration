const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    try {
        res.json({
            status: 200,
            message: "Product API is working"
        })
    } catch (e) {
        console.log(e);
        return res.status(500).send("Server error");
    }
});



module.exports = router;