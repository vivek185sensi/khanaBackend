const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const addFirm = async (req, res) => {
    try {
        const { firmName, category, area, region, offer } = req.body
        const vendor = await Vendor.findById(req.vendorId)
        const image = req.file ? req.file.filename : undefined
        if (!vendor) {
            res.status(404).json({ message: "vendor not found" })
        }
        const firm = new Firm({
            firmName, category, area, region, offer, image, vendor: vendor._id
        })
        const savedFirm = await firm.save()
        vendor.firm.push(savedFirm)
        vendor.save();

        res.status(200).json({ message: 'Firm added successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Add firm failed' })
    }
}

const deleteFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId
        const checkFirm = await Firm.findIdAndDelete(firmId);
        if (!checkFirm) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.status(200).json({ message: 'Firm deleted successfully' })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal sever error' })
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirm }