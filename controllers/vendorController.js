const Vendor = require('../models/Vendor')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv')
dotenv.config()
const secretKey = process.env.SECRET_KEY

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newVendor = new Vendor({
            username, email, password: hashedPassword
        })
        await newVendor.save()
        res.status(201).json({ message: 'user registered successfully' })
        console.log("registered")
    } catch (error) {
        console.log(error)
        res.status(500).json({ errror: 'registration Error' })
    }
}

const vendorLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const vendor = await Vendor.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid user credientials" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: '1h' })
        res.status(200).json({ success: 'Login successfull', token: token })
        console.log('vendor logged in', vendor)
    } catch (error) {
        res.status(500).json({ error: 'login Error' })
    }
}

const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm')
        res.json({ vendors })
    } catch (error) {
        console.log('all vendor error', error)
        res.status(500).json({ error: 'Internal server Error' })
    }
}

const getVendorById = async (req, res) => {
    try {
        console.log('req params',req.params)
        const vendorId = req.params.id
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if (!vendor) {
            return res.status(404).json({ error: "vendoer not found" })
        }
        res.status(200).json({ vendor })
    } catch (error) {
        console.log('vendor by ID error', error)
        res.status(500).json({ error: 'Internal server Error' })
    }
}


module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById }