const mongoose = require('mongoose')


const firmSchema = mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg']
            }
        ]
    },
    area: { type: String, required: true },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinease', 'bakery']
            }
        ]
    },
    offer: {
        type: String
    }
    ,
    image: {
        tpe: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Firm = mongoose.model('Firm', firmSchema)
module.exports = Firm