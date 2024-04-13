const Property = require('../models/Property');

// Function to create a new property
const createProperty = async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        let imagePath = '';

        if (req.file) {
            imagePath = req.file.path;
        }

        const property = new Property({
            title,
            description,
            price,
            location,
            image: imagePath
        });

        await property.save();
        res.status(201).send(property);
    } catch (error) {
        console.error('Error creating a new property:', error);
        res.status(400).send({ message: 'Error creating a new property' });
    }
};

// Function to get all properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find({});
        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Function to get a single property by ID
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).send({ message: 'Property not found!' });
        }
        res.status(200).send(property);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById
};
