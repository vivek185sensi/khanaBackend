const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const Firm = require("../models/Firm");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const addProduct = async (req, res) => {
    const { productName, category, bestseller, price, description } = req.body
    try {
        const image = req.file ? req.file.filename : undefined;
        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if (!firm) {
            return res.status(404).json({ error: 'firm not found' })
        }

        const product = new Product({
            productName, category, bestseller, image, price, description,
            firm: firm._id
        })

        const savedProduct = await product.save()
        firm.product.push(savedProduct)
        await firm.save()
        res.status(200).json(savedProduct)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal sever error' })
    }
}

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: 'no firm found' })
        }
        const restaurent = firm.firmName
        const product = await Product.find({ firm: firmId })
        res.status(200).json({ restaurent, product })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal sever error' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId
        const checkProduct = await Product.findIdAndDelete(productId);
        if (!checkProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal sever error' })
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProduct }
