const express = require('express');
const router = express.Router();
const multer = require('multer');
const propertyController = require('../controllers/propertyController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });


// Route to create a new property
router.post('/', upload.single('image'), propertyController.createProperty);

// Route to retrieve all properties
router.get('/', propertyController.getAllProperties);

// Route to retrieve a single property by its ID
router.get('/:id', propertyController.getPropertyById);

module.exports = router;

