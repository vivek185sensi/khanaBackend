const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]
    },
    bestseller: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm'
    }]
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product ;