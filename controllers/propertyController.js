const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        let imagePath = '';

        if (req.file) {
            imagePath = req.file.path;
        }

        const userId = req.userId;

        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }

        const property = new Property({
            title,
            description,
            price,
            location,
            image: imagePath,
            user: userId
        });

        await property.save();
        res.status(201).send(property);
    } catch (error) {
        console.error('Error creating a new property:', error);
        res.status(500).send({ message: 'Error creating a new property' });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.getPropertiesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const properties = await Property.find({ user: userId });
        res.json(properties);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).send('Property not found');
        }
        res.json(property);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(property);
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Property deleted' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};