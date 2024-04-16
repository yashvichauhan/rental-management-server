const express = require('express');
const router = express.Router();
const multer = require('multer');
const propertyController = require('../controllers/propertyController');
const authenticateToken = require('../middleware/authenticateToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', authenticateToken, upload.single('image'), propertyController.createProperty);
router.get('/', authenticateToken, propertyController.getAllProperties);
router.get('/user/:userId', authenticateToken, propertyController.getPropertiesByUser);
router.get('/:id', authenticateToken, propertyController.getPropertyById);
router.put('/:id', authenticateToken, propertyController.updateProperty);
router.delete('/:id', authenticateToken, propertyController.deleteProperty);

module.exports = router;

