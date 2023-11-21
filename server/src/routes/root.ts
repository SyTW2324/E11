const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (_: any, res: any) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;