const { Router } = require('express')
const router = Router()
const adminData = require('../mocks/adminData');

router.get("/adminPortal", async (req, res) => {
    res.status(200).json(adminData);
})

module.exports = router;