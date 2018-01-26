// Require Modules
const express = require('express');
const router = express.Router();

// GET "/": Display homepage
router.get('/', (req, res) => {
    res.send('Hello Cameron!')
});

module.exports = router;